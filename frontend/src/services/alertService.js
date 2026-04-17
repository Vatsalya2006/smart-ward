import API from './api';

/**
 * Fetch active alerts.
 * GET /alerts
 */
export const getAlerts = async () => {
  const response = await API.get('/alerts');
  return response.data;
};
