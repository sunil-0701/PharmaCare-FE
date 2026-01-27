import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(undefined);

const VALID_USERS = [
  {
    email: "admin@pharmacare.com",
    password: "1234",
    role: "admin",
    name: "Admin",
    id: "1"
  },
  {
    email: "pharmacist@pharmacare.com",
    password: "1234",
    role: "pharmacist",
    name: "Pharmacist",
    id: "2"
  },
  {
    email: "inventory@pharmacare.com",
    password: "1234",
    role: "inventory",
    name: "Inventory Manager",
    id: "3"
  },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('pharmacare_user');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
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
    await new Promise(resolve => setTimeout(resolve, 500));
    const foundUser = VALID_USERS.find(user =>
      user.email.toLowerCase() === email.toLowerCase() &&
      user.password === password
    );

    if (!foundUser) {
      throw new Error("Invalid email or password");
    }

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
      validUsers: VALID_USERS
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