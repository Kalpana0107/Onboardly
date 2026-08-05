const Candidate = require('../models/Candidate');
const { extractSkills } = require('./extractController'); // Import your skill extraction logic

exports.calculateMatch = async (req, res) => {
  try {
    const { candidateId, jobDescription } = req.body;
    let candidate = await Candidate.findById(candidateId);

    if (!candidate) {
      return res.status(404).json({ error: "Candidate not found" });
    }

    // ONE-STEP FIX: If skills haven't been extracted yet, extract them automatically right now!
    if (!candidate.extractedSkills || candidate.extractedSkills.length === 0) {
      const skills = await extractSkills(candidate.resumePath); // Automatically calls spaCy / extraction
      candidate.extractedSkills = skills;
      await candidate.save();
    }

    // Now proceed with match calculation without throwing a 400 error
    const score = computeMatchScore(candidate.extractedSkills, jobDescription);
    candidate.matchScore = score;
    await candidate.save();

    return res.status(200).json({ success: true, matchScore: score, candidate });
  } catch (error) {
    return res.status(500).json({ error: "Failed to calculate match score", details: error.message });
  }
};