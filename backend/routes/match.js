const express = require('express');
const router = express.Router();
const db = require('../db/database');
const { spawn } = require('child_process');
const path = require('path');

/**
 * Helper to run NLP extraction programmatically
 */
const runNLPExtraction = (candidateId, filepath) => {
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(__dirname, "../python/extract_resume.py");
    const pythonExe =
      process.env.NODE_ENV === "production"
        ? "python3"
        : path.join(__dirname, "../venv/Scripts/python.exe");

    const pythonProcess = spawn(pythonExe, [scriptPath, filepath]);
    let output = "";
    let errorOutput = "";

    pythonProcess.stdout.on("data", (data) => {
      output += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      errorOutput += data.toString();
    });

    pythonProcess.on("close", (code) => {
      if (code !== 0) {
        return reject(new Error(errorOutput || "NLP extraction process exited with non-zero code"));
      }
      try {
        const result = JSON.parse(output);
        db.prepare(`
          UPDATE candidates
          SET name = ?, skills = ?
          WHERE id = ?
        `).run(
          result.name,
          JSON.stringify(result.skills),
          candidateId
        );
        resolve(result.skills);
      } catch (e) {
        reject(new Error("Failed to parse NLP output: " + e.message));
      }
    });
  });
};

/**
 * POST /api/match
 * Body: { candidateId, jobSkills: string[] }
 * Calculates match score, automatically trigger extraction if skills are missing/empty.
 * Returns clear JSON errors for invalid/corrupt document IDs.
 */
router.post('/match', async (req, res) => {
  try {
    const { candidateId, jobSkills } = req.body;

    if (!candidateId) {
      return res.status(400).json({ error: 'candidateId is required.' });
    }

    const id = parseInt(candidateId, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid candidateId — must be a number.' });
    }

    const candidate = db
      .prepare('SELECT id, name, filepath, skills, match_score FROM candidates WHERE id = ?')
      .get(id);

    if (!candidate) {
      return res.status(404).json({ error: `Candidate with id ${id} not found.` });
    }

    if (!Array.isArray(jobSkills) || jobSkills.length === 0) {
      return res.status(400).json({ error: 'jobSkills must be a non-empty array of strings.' });
    }

    let candidateSkills = [];
    try {
      candidateSkills = candidate.skills ? JSON.parse(candidate.skills) : [];
    } catch {
      candidateSkills = [];
    }

    // Auto-trigger extraction if skills are missing or empty
    if (!candidateSkills || candidateSkills.length === 0) {
      try {
        candidateSkills = await runNLPExtraction(candidate.id, candidate.filepath);
      } catch (extractErr) {
        return res.status(500).json({
          error: 'NLP extraction failed during matching process.',
          detail: extractErr.message
        });
      }
    }

    // Calculate match score
    const normalise = (s) => s.toLowerCase().trim();
    const jdSet = new Set(jobSkills.map(normalise));
    const matched = candidateSkills.filter((s) => jdSet.has(normalise(s)));
    const score = jdSet.size > 0 ? Math.round((matched.length / jdSet.size) * 100) : 0;

    // Persist score
    db.prepare('UPDATE candidates SET match_score = ? WHERE id = ?').run(score, id);

    // Fetch updated candidate info
    const updatedCandidate = db
      .prepare('SELECT id, name, filepath AS filename, match_score, skills, created_at FROM candidates WHERE id = ?')
      .get(id);
    if (updatedCandidate && updatedCandidate.skills) {
      updatedCandidate.skills = JSON.parse(updatedCandidate.skills);
    }

    return res.status(200).json({
      success: true,
      candidateId: id,
      matchScore: score,
      matchedSkills: matched,
      totalJobSkills: jobSkills.length,
      candidate: updatedCandidate
    });
  } catch (err) {
    console.error('Match error:', err);
    return res.status(500).json({ error: 'Failed to calculate match score.', detail: err.message });
  }
});

module.exports = router;