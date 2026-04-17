import API from './api';

/**
 * Fetch all patients from the backend.
 * GET /patients
 */
export const getPatients = async () => {
  const response = await API.get('/patients');
  return response.data;
};
