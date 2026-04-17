import API from './api';

/**
 * Request AI analysis / recommendations.
 * POST /ai/analyze
 */
export const getAIAnalysis = async (data = {}) => {
  const response = await API.post('/ai/analyze', data);
  return response.data;
};
