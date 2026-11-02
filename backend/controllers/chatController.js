/**
 * chatController.js using @google/genai SDK (v2 API structure).
 * Strict system prompt for friendly HR onboarding assistant.
 */
const { GoogleGenAI } = require('@google/genai');

const apiKey = process.env.GEMINI_API_KEY;
// Initialize with standard parameters if API key is present
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

const chat = async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required.' });
    }

    if (!ai) {
      return res.status(500).json({
        error: 'Gemini AI service is not configured. Please supply a GEMINI_API_KEY environment variable.'
      });
    }

    // Prepare system instructions and formatted chat contents
    const systemInstruction = 
      "You are a friendly, welcoming, and helpful HR onboarding assistant for Onboardly. " +
      "Your goal is to guide new hires through their onboarding, answer questions about their role, tools, " +
      "system setup, and checklist. Be supportive, concise, and professional. " +
      "Answer onboarding-specific questions only. Avoid inventing or hallucinating company policies " +
      "that you do not know. If unsure about a policy, politely redirect them to ask HR directly.";

    // Convert history format to the format required by the GoogleGenAI SDK (role: 'user' | 'model', parts: [{text: ...}])
    const contents = [];
    if (Array.isArray(history)) {
      history.forEach((msg) => {
        // Map roles 'user' and 'assistant'/'bot' to 'user' and 'model'
        const role = msg.role === 'user' ? 'user' : 'model';
        contents.push({
          role,
          parts: [{ text: msg.content || msg.text || '' }]
        });
      });
    }

    // Append the current message
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    // Request response using the recommended gemini-2.5-flash model
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents,
      config: {
        systemInstruction
      }
    });

    const replyText = response.text || "I'm sorry, I couldn't generate a reply.";

    return res.status(200).json({
      reply: replyText
    });
  } catch (err) {
    console.error('Chat AI generation failed:', err);
    return res.status(500).json({
      error: 'Failed to generate response from AI onboarding assistant.',
      detail: err.message
    });
  }
};

module.exports = { chat };
