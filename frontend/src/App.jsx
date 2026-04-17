import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import Resources from './pages/Resources';
import Alerts from './pages/Alerts';

export default function App() {
  return (
    <div className="min-h-screen bg-dark-950">
      <Navbar />

      {/* Main content — offset for sidebar on large screens, for top-bar on mobile */}
      <main className="lg:ml-[260px] pt-20 lg:pt-6 px-4 sm:px-6 lg:px-8 pb-12 max-w-[1400px]">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/alerts" element={<Alerts />} />
        </Routes>
      </main>
    </div>
  );
}
