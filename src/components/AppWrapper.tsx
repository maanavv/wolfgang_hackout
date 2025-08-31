import React, { useState } from 'react';
import { LoginPage } from './LoginPage';
import App from '../App';
// Import everything from the central data file
import { initialAdminData, Administrator, UserRole } from '../data';

export function AppWrapper() {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [administrators, setAdministrators] = useState<Administrator[]>(initialAdminData);

  const handleLogin = (role: 'admin' | 'guest') => {
    setUserRole(role);
  };

  const handleAdministratorsChange = (newAdminList: Administrator[]) => {
    setAdministrators(newAdminList);
  };

  if (!userRole) {
    return (
      <LoginPage 
        onLogin={handleLogin} 
        adminEmails={administrators.map(admin => admin.email)} 
      />
    );
  }

  return (
    <App 
      userRole={userRole} 
      administrators={administrators}
      onAdministratorsChange={handleAdministratorsChange}
    />
  );
}