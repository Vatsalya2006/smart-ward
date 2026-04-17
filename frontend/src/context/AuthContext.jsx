import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for mocked session on mount
    const storedUser = localStorage.getItem('mockUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password, role) => {
    // Mock user login
    const mockUsers = {
      Admin: { id: 'A-101', name: 'Dr. Admin' },
      Patient: { id: 'P-505', name: 'John Doe' },
      Staff: { id: 'S-201', name: 'Nurse Sarah' },
    };
    const userData = mockUsers[role] || mockUsers.Admin;
    const mockUser = {
      id: userData.id,
      name: userData.name,
      email,
      role, // 'Admin', 'Patient', or 'Staff'
    };
    setUser(mockUser);
    localStorage.setItem('mockUser', JSON.stringify(mockUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mockUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
