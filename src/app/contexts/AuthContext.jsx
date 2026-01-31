import React, { createContext, useContext, useState } from 'react';
import { toast } from 'sonner';

const AuthContext = createContext(undefined);

const VALID_USERS = [
  {
    email: "admin@pharmacare.com",
    password: "123456",
    role: "admin",
    name: "Admin",
    id: "1"
  },
  {
    email: "pharmacist@pharmacare.com",
    password: "123456",
    role: "pharmacist",
    name: "Pharmacist",
    id: "2"
  },
  {
    email: "inventory@pharmacare.com",
    password: "123456",
    role: "inventory",
    name: "Inventory Manager",
    id: "3"
  },
];

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => {
    const stored = localStorage.getItem('pharmacare_users');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return VALID_USERS;
      }
    }
    return VALID_USERS;
  });

  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('pharmacare_user');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const isValidUser = users.some(u =>
          u.email === parsed.email &&
          u.role === parsed.role
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
    const foundUser = users.find(u =>
      u.email.toLowerCase() === email.toLowerCase() &&
      u.password === password
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

  const registerStaff = (staffData) => {
    const newId = String(users.length + 1);
    const newUser = {
      ...staffData,
      id: newId,
      status: "Active",
      joinDate: new Date().toISOString().split('T')[0]
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('pharmacare_users', JSON.stringify(updatedUsers));
    toast.success("Staff member registered successfully");
    return newUser;
  };

  const deleteStaff = (id) => {
    const updatedUsers = users.filter(u => u.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem('pharmacare_users', JSON.stringify(updatedUsers));
  };

  const updateStaffStatus = (id, newStatus) => {
    const updatedUsers = users.map(u =>
      u.id === id ? { ...u, status: newStatus } : u
    );
    setUsers(updatedUsers);
    localStorage.setItem('pharmacare_users', JSON.stringify(updatedUsers));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('pharmacare_user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      users,
      login,
      logout,
      registerStaff,
      deleteStaff,
      updateStaffStatus,
      isAuthenticated: !!user
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