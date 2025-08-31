import React, { useState } from 'react';

interface LoginPageProps {
  onLogin: (role: 'admin' | 'guest') => void;
  adminEmails: string[];
}

export function LoginPage({ onLogin, adminEmails }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const isValidUser = adminEmails.includes(email.trim());
    const isValidPassword = password === 'DAIICT HACKOUT';

    if (isValidUser && isValidPassword) {
      setError('');
      onLogin('admin');
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-xl">
        <div className="flex flex-col items-center">
          
          {/* UPDATED: Increased width from w-56 to w-64 and adjusted margin */}
          <img 
            src="https://i.postimg.cc/tT58VXH5/Logo.png" 
            alt="CoastGuard Login" 
            className="w-64 mb-8" 
          />
          
        </div>

        <form className="mt-6 space-y-6" onSubmit={handleAdminLogin}>
          <div>
            <label htmlFor="email" className="sr-only">Email address</label>
            <input id="email" name="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500" placeholder="Administrator Email" />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input id="password" name="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500" placeholder="Password" />
          </div>

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
            Login as Administrator
          </button>
        </form>
        
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300"></div></div>
          <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">OR</span></div>
        </div>

        <button onClick={() => onLogin('guest')} className="w-full flex justify-center py-3 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          Continue as Guest (View-Only)
        </button>
      </div>
    </div>
  );
}