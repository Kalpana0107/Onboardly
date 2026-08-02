const express = require("express");
const router = express.Router();
const db = require("../db/database");

const extractKeywords = (text) => {
    const stopWords = new Set([
        "the", "and", "is", "are", "be", "will", "we"
        , "you", "to", "a", "an", "in", "of", "for",
        "with", "that", "this"
    ]);

    return text
        .toLowerCase()
        .replace(/[^a-z0-9\s]+/g, " ")
        .split(/\s+/)
        .filter(word => word.length > 2 && !stopWords.has(word));

};
router.post('/match', async (req, res) => {
  const { candidateId, jobDescription } = req.body;
  
  // Better error messages
  if (!candidateId) {
    return res.status(400).json({ 
      error: 'candidateId is required. Upload a resume first.' 
    });
  }
  if (!jobDescription || !jobDescription.trim()) {
    return res.status(400).json({ 
      error: 'jobDescription is required.' 
    });
  }

  try {
    const candidate = db
        .prepare("SELECT * FROM candidates WHERE id = ?")
        .get(candidateId);

    if (!candidate || !candidate.skills) {
        return res.status(400).json({
            error: "Extract skills first (run Day 3 step)"
        });
    }
    const resumeSkills = JSON.parse(candidate.skills);

    const jobKeywords = extractKeywords(jobDescription);

    const matchedSkills = resumeSkills.filter(skill =>
        jobKeywords.includes(skill.toLowerCase())
    );
    const { candidateId, jobDescription } = req.body;

    // Validate inputs
    if (!candidateId) {
        return res.status(400).json({
            error: 'candidateId is required. Upload a resume first.'
        });
    }
    if (!jobDescription || !jobDescription.trim()) {
        return res.status(400).json({
            error: 'jobDescription is required.'
        });
    }

    try {
        const candidate = db
            .prepare("SELECT * FROM candidates WHERE id = ?")
            .get(candidateId);

        if (!candidate || !candidate.skills) {
            return res.status(400).json({
                error: "Extract skills first (run Day 3 step)"
            });
        }
        const resumeSkills = JSON.parse(candidate.skills);

        const jobKeywords = extractKeywords(jobDescription);

        const matchedSkills = resumeSkills.filter(skill =>
            jobKeywords.includes(skill.toLowerCase())
        );

        const matchScore =
            resumeSkills.length > 0
                ? Math.round(matchedSkills.length / resumeSkills.length * 100)
                : 0;

        db.prepare("UPDATE candidates SET match_score = ? WHERE id = ?")
            .run(matchScore, candidateId);

        res.json({
            candidateId,
            matchedSkills,
            score: matchScore
        });
    } catch (error) {
        console.error('Match error:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;