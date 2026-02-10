import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Activity } from 'lucide-react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('Admin');
  const [email, setEmail] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(role, email || "user@mednex.com");
    const path = `/${role.toLowerCase()}`;
    navigate(path);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-100 text-center">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-blue-600 p-3 rounded-xl mb-3 text-white">
            <Activity size={32} />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900">MedNex</h2>
          <p className="text-slate-500 text-sm">Enterprise Hospital Management</p>
        </div>

        <h3 className="text-xl font-bold mb-6 text-slate-800">
          {isLogin ? 'Sign In' : 'Create New Account'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {!isLogin && (
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Full Name</label>
              <input type="text" placeholder="Shreeharini" className="w-full p-3 border rounded-lg bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none" required />
            </div>
          )}
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Email Address</label>
            <input 
              type="email" 
              placeholder="name@hospital.com" 
              className="w-full p-3 border rounded-lg bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Password</label>
            <input type="password" placeholder="••••••••" className="w-full p-3 border rounded-lg bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none" required />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Select Role</label>
            <select 
              className="w-full p-3 border rounded-lg bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option>Admin</option>
              <option>Doctor</option>
              <option>Patient</option>
              <option>Receptionist</option>
            </select>
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition transform active:scale-95">
            {isLogin ? 'Access System' : 'Register as ' + role}
          </button>
        </form>

        <button onClick={() => setIsLogin(!isLogin)} className="mt-6 text-sm text-blue-600 font-semibold hover:underline">
          {isLogin ? "New user? Create an account" : "Existing user? Sign in here"}
        </button>
      </div>
    </div>
  );
};

export default Login;