import API from './api';

/**
 * Fetch hospital resource stats.
 * GET /resources
 */
export const getResources = async () => {
  const response = await API.get('/resources');
  return response.data;
};
