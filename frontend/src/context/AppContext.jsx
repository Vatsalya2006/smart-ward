import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { getPatients } from '../services/patientService';
import { getResources } from '../services/resourceService';
import { getAlerts } from '../services/alertService';
import { getAIAnalysis } from '../services/aiService';
import { getSocket, disconnectSocket } from '../socket/socket';

const AppContext = createContext(null);

const POLL_INTERVAL = 3000; // 3 seconds

// ---------- Demo / fallback data ----------
const DEMO_PATIENTS = [
  { _id: '1', name: 'Aarav Sharma', age: 45, heart_rate: 112, oxygen_level: 88, condition: 'Critical', ward: 'ICU', admitted: '2026-04-15T08:30:00Z' },
  { _id: '2', name: 'Priya Patel', age: 32, heart_rate: 78, oxygen_level: 97, condition: 'Normal', ward: 'General', admitted: '2026-04-16T10:15:00Z' },
  { _id: '3', name: 'Rahul Verma', age: 58, heart_rate: 95, oxygen_level: 92, condition: 'Warning', ward: 'ICU', admitted: '2026-04-14T14:00:00Z' },
  { _id: '4', name: 'Meera Nair', age: 27, heart_rate: 72, oxygen_level: 99, condition: 'Normal', ward: 'General', admitted: '2026-04-17T06:45:00Z' },
  { _id: '5', name: 'Vikram Singh', age: 63, heart_rate: 105, oxygen_level: 90, condition: 'Critical', ward: 'ICU', admitted: '2026-04-13T22:10:00Z' },
  { _id: '6', name: 'Anjali Gupta', age: 41, heart_rate: 82, oxygen_level: 96, condition: 'Normal', ward: 'General', admitted: '2026-04-16T18:30:00Z' },
  { _id: '7', name: 'Rohan Joshi', age: 55, heart_rate: 98, oxygen_level: 91, condition: 'Warning', ward: 'Cardiology', admitted: '2026-04-15T11:20:00Z' },
  { _id: '8', name: 'Sneha Reddy', age: 36, heart_rate: 70, oxygen_level: 98, condition: 'Normal', ward: 'General', admitted: '2026-04-17T09:00:00Z' },
];

const DEMO_RESOURCES = {
  total_beds: 120,
  occupied_beds: 87,
  available_beds: 33,
  icu_total: 20,
  icu_occupied: 16,
  ventilators_total: 15,
  ventilators_in_use: 9,
  oxygen_cylinders: 48,
  nurses_on_duty: 34,
  doctors_on_duty: 12,
};

const DEMO_ALERTS = [
  { _id: 'a1', message: 'Patient Aarav Sharma — Heart rate critically elevated (112 bpm)', severity: 'critical', timestamp: '2026-04-17T07:02:00Z', patient_id: '1' },
  { _id: 'a2', message: 'ICU Bed occupancy above 80% threshold', severity: 'warning', timestamp: '2026-04-17T06:45:00Z' },
  { _id: 'a3', message: 'Patient Vikram Singh — Oxygen level dropped to 90%', severity: 'critical', timestamp: '2026-04-17T06:30:00Z', patient_id: '5' },
  { _id: 'a4', message: 'Ventilator #7 maintenance scheduled in 2 hours', severity: 'warning', timestamp: '2026-04-17T06:15:00Z' },
  { _id: 'a5', message: 'Patient Rahul Verma — Vitals trending towards normal', severity: 'normal', timestamp: '2026-04-17T06:00:00Z', patient_id: '3' },
  { _id: 'a6', message: 'Nursing shift change completed — all stations staffed', severity: 'normal', timestamp: '2026-04-17T05:30:00Z' },
];

const DEMO_AI = [
  { recommendation: 'Increase monitoring frequency for ICU patients with SpO₂ < 92%', reason: 'Two ICU patients currently show oxygen levels below the safe threshold. Continuous pulse-oximetry and 15-min nursing checks are recommended.' },
  { recommendation: 'Prepare additional ICU bed capacity', reason: 'ICU occupancy is at 80%. Historical patterns suggest a 15% chance of surge in the next 12 hours.' },
  { recommendation: 'Review Aarav Sharma medication — consider beta-blocker adjustment', reason: 'Sustained tachycardia (112 bpm) over 4 hours despite current treatment. Cardiology consult advised.' },
];

export function AppProvider({ children }) {
  const [patients, setPatients] = useState([]);
  const [resources, setResources] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [aiInsights, setAiInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [lastUpdated, setLastUpdated] = useState(null);

  const intervalRef = useRef(null);

  // ---------- Fetch all data ----------
  const fetchAll = useCallback(async (showLoading = false) => {
    if (showLoading) setLoading(true);

    const newErrors = {};

    // Patients
    try {
      const data = await getPatients();
      setPatients(Array.isArray(data) ? data : data?.patients || DEMO_PATIENTS);
    } catch {
      newErrors.patients = true;
      setPatients((prev) => (prev.length ? prev : DEMO_PATIENTS));
    }

    // Resources
    try {
      const data = await getResources();
      setResources(data || DEMO_RESOURCES);
    } catch {
      newErrors.resources = true;
      setResources((prev) => prev || DEMO_RESOURCES);
    }

    // Alerts
    try {
      const data = await getAlerts();
      setAlerts(Array.isArray(data) ? data : data?.alerts || DEMO_ALERTS);
    } catch {
      newErrors.alerts = true;
      setAlerts((prev) => (prev.length ? prev : DEMO_ALERTS));
    }

    // AI
    try {
      const data = await getAIAnalysis();
      setAiInsights(Array.isArray(data) ? data : data?.recommendations || DEMO_AI);
    } catch {
      newErrors.ai = true;
      setAiInsights((prev) => (prev.length ? prev : DEMO_AI));
    }

    setErrors(newErrors);
    setLoading(false);
    setLastUpdated(new Date());
  }, []);

  // ---------- Initial fetch + polling ----------
  useEffect(() => {
    fetchAll(true);

    intervalRef.current = setInterval(() => {
      fetchAll(false);
    }, POLL_INTERVAL);

    // Socket.io real-time (best-effort)
    try {
      const socket = getSocket();
      socket.on('patient_update', (data) => {
        if (data) setPatients((prev) => {
          const idx = prev.findIndex((p) => p._id === data._id);
          if (idx >= 0) {
            const copy = [...prev];
            copy[idx] = { ...copy[idx], ...data };
            return copy;
          }
          return prev;
        });
      });
      socket.on('alert_new', (data) => {
        if (data) setAlerts((prev) => [data, ...prev]);
      });
      socket.on('resource_update', (data) => {
        if (data) setResources((prev) => ({ ...prev, ...data }));
      });
    } catch {
      // Socket not available — polling is our fallback
    }

    return () => {
      clearInterval(intervalRef.current);
      disconnectSocket();
    };
  }, [fetchAll]);

  const value = {
    patients,
    resources,
    alerts,
    aiInsights,
    loading,
    errors,
    lastUpdated,
    refresh: () => fetchAll(false),
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within <AppProvider>');
  return ctx;
};

export default AppContext;
