/**
 * ragController.js — Retrieves company policies, feeds them into Gemini context,
 * and returns generated answers with source citations.
 */
const { GoogleGenAI } = require('@google/genai');
const ragEngine = require('../utils/ragEngine');

const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

const queryPolicy = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'Question is required.' });
    }

    if (!ai) {
      return res.status(500).json({
        error: 'Gemini AI service is not configured. Please supply a GEMINI_API_KEY environment variable.'
      });
    }

    // 1. Retrieve matching context chunks
    const chunks = ragEngine.retrieveChunks(question, 2);
    const contextText = chunks.map(c => `[Document: ${c.document}]\n${c.text}`).join('\n\n');

    // 2. Build Gemini prompt with context instructions
    const prompt = 
      `You are an HR Policy Q&A assistant. Answer the user's question using only the company policy context below.\n\n` +
      `Context:\n${contextText || 'No context found.'}\n\n` +
      `Question: ${question}\n\n` +
      `Instructions:\n` +
      `- Synthesize a direct, helpful answer.\n` +
      `- Mention which documents contain the answer, but keep it readable.\n` +
      `- If the provided context doesn't contain information to answer the question, state politely that you cannot find this in company documents.\n`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt
    });

    const answer = response.text || 'No answer generated.';
    const sources = chunks.filter(c => c.score > 0).map(c => c.document);

    return res.status(200).json({
      answer,
      sources: [...new Set(sources)] // return unique sources
    });
  } catch (err) {
    console.error('RAG query error:', err);
    return res.status(500).json({
      error: 'Failed to process company policy query.',
      detail: err.message
    });
  }
};

module.exports = { queryPolicy };
