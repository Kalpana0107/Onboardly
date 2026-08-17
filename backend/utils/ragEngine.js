/**
 * ragEngine.js — Lightweight local in-memory text search RAG.
 * Performs keyword overlap matching to retrieve top policy snippets.
 */
const mockPolicies = require('../docs/company_policies/mockPolicies');

const retrieveChunks = (query, limit = 2) => {
  const normalizedQuery = query.toLowerCase();
  
  // Calculate keyword overlap score
  const scored = mockPolicies.map(policy => {
    const words = normalizedQuery.split(/\W+/).filter(w => w.length > 2);
    let score = 0;
    
    words.forEach(word => {
      if (policy.text.toLowerCase().includes(word)) {
        score += 1;
      }
    });

    return {
      ...policy,
      score
    };
  });

  // Sort descending by score and filter out chunks with zero relevance if we have some match
  const filtered = scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return filtered;
};

module.exports = { retrieveChunks };
