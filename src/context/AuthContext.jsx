import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores { name, role, tenantId }

  const login = (role, email) => {
    // Simulating JWT claim storage mentioned in company docs
    const userData = { 
      name: "Shreeharini", 
      role, 
      tenantId: "HOSP-AUTO-01",
      email 
    };
    setUser(userData);
    localStorage.setItem('token', 'simulated-jwt-token');
  };

  const logout = () => {
    setUser(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);