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

const getInitialUsers = () => {
  const stored = localStorage.getItem('pharmacare_users');
  if (stored) {
    try {
      const parsedStored = JSON.parse(stored);
      if (Array.isArray(parsedStored)) {
        // Merge VALID_USERS with stored users to ensure defaults always exist
        const merged = [...VALID_USERS];
        parsedStored.forEach(u => {
          if (u && u.email && !merged.some(m => m.email.toLowerCase() === u.email.toLowerCase())) {
            merged.push(u);
          }
        });
        return merged;
      }
    } catch (e) {
      console.error("Failed to parse pharmacare_users from localStorage", e);
    }
  }
  return VALID_USERS;
};

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(getInitialUsers);

  const [user, setUser] = useState(() => {
    const initialUsers = getInitialUsers();
    const stored = localStorage.getItem('pharmacare_user');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.email) {
          const isValidUser = initialUsers.some(u =>
            u.email.toLowerCase() === parsed.email.toLowerCase() &&
            u.role === parsed.role
          );
          return isValidUser ? parsed : null;
        }
      } catch (e) {
        console.error("Failed to parse pharmacare_user from localStorage", e);
        return null;
      }
    }
    return null;
  });

  const login = async (email, password) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const trimmedEmail = email.trim().toLowerCase();
    const foundUser = users.find(u =>
      u.email.toLowerCase() === trimmedEmail &&
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