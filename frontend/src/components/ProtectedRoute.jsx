import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Redirect to login if user is not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect if user doesn't have the required role
    if (user.role === 'Admin') {
      return <Navigate to="/" replace />; // Admin dashboard
    } else if (user.role === 'Staff') {
      return <Navigate to="/staff/dashboard" replace />; // Staff dashboard
    } else {
      return <Navigate to="/patient" replace />; // Patient dashboard
    }
  }

  return children;
}
