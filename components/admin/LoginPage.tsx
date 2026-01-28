import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const LoginPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      navigate('/dashboard');
    } else {
      setError('Invalid password. Try "admin".');
    }
  };

  return (
    <div className="min-h-screen bg-fas-black flex items-center justify-center p-4">
      <div className="bg-white p-8 md:p-12 w-full max-w-md border-2 border-white shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)]">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black uppercase tracking-tighter mb-2">MAM Admin</h1>
          <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">Secure Access</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-50 border-2 border-black p-3 font-mono focus:outline-none focus:border-fas-red transition-colors"
              placeholder="••••••••"
            />
          </div>
          
          {error && (
            <div className="text-fas-red text-xs font-bold uppercase tracking-widest bg-red-50 p-2 border border-red-100">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-black text-white font-black uppercase py-4 tracking-widest hover:bg-fas-red transition-colors"
          >
            Enter Dashboard
          </button>
        </form>
        
        <div className="mt-6 text-center">
            <a href="/" className="text-gray-400 text-xs font-bold uppercase tracking-widest hover:text-black">← Back to Site</a>
        </div>
      </div>
    </div>
  );
};