import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(undefined);

// Define valid users with their credentials
const VALID_USERS = [
  { 
    email: "admin@pharmacare.com", 
    password: "Admin", 
    role: "admin",
    name: "Admin User",
    id: "1"
  },
  { 
    email: "pharmacist@pharmacare.com", 
    password: "Pharmacist", 
    role: "pharmacist",
    name: "John Pharmacist",
    id: "2"
  },
  { 
    email: "inventory@pharmacare.com", 
    password: "Inventory Manager", 
    role: "inventory",
    name: "Jane Manager",
    id: "3"
  },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Initialize from localStorage if available
    const stored = localStorage.getItem('pharmacare_user');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Check if the stored user is still valid (exists in VALID_USERS)
        const isValidUser = VALID_USERS.some(validUser => 
          validUser.email === parsed.email && 
          validUser.role === parsed.role
        );
        return isValidUser ? parsed : null;
      } catch {
        return null;
      }
    }
    return null;
  });

  const login = async (email, password) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Validate credentials
    const foundUser = VALID_USERS.find(user => 
      user.email.toLowerCase() === email.toLowerCase() && 
      user.password === password
    );
    
    if (!foundUser) {
      throw new Error("Invalid email or password");
    }
    
    // Create user object (without password)
    const userData = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      role: foundUser.role,
    };
    
    setUser(userData);
    localStorage.setItem('pharmacare_user', JSON.stringify(userData));
    return userData;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('pharmacare_user');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated: !!user,
      validUsers: VALID_USERS // Optional: expose for demo display
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}