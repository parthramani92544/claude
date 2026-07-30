import React, { useState } from 'react';
import { Shield, Lock, User, CheckCircle2, KeyRound } from 'lucide-react';
import { AdminRole, AdminUser } from '../types';
import { INITIAL_ADMIN_USERS } from '../data';

interface LoginScreenProps {
  onLoginSuccess: (user: AdminUser) => void;
  addToast: (type: 'success' | 'error' | 'info' | 'warning', title: string, message: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess, addToast }) => {
  const [username, setUsername] = useState('superadmin');
  const [password, setPassword] = useState('password123');
  const [selectedRole, setSelectedRole] = useState<AdminRole>('SuperAdmin');
  const [rememberMe, setRememberMe] = useState(true);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const matchedUser = INITIAL_ADMIN_USERS.find(
      (u) => u.username.toLowerCase() === username.toLowerCase().trim() || u.role === selectedRole
    );

    if (matchedUser) {
      const activeSessionUser: AdminUser = {
        ...matchedUser,
        role: selectedRole,
        lastLogin: new Date().toLocaleString(),
      };
      addToast('success', 'Authentication Successful', `Welcome back, ${activeSessionUser.name} (${activeSessionUser.role})`);
      onLoginSuccess(activeSessionUser);
    } else {
      addToast('error', 'Login Failed', 'Invalid username or password credentials.');
    }
  };

  const fillQuickDemo = (role: AdminRole) => {
    const matched = INITIAL_ADMIN_USERS.find((u) => u.role === role);
    if (matched) {
      setUsername(matched.username);
      setPassword('password123');
      setSelectedRole(role);
      addToast('info', 'Credentials Auto-filled', `Selected demo profile: ${matched.name} (${role})`);
    }
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-900/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-900/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-3xl p-8 shadow-2xl backdrop-blur-xl relative z-10 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-gradient-to-tr from-indigo-600 to-indigo-500 rounded-2xl mx-auto flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
            <Shield className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight uppercase font-mono">
            Admin Web Portal
          </h1>
          <p className="text-xs text-slate-400 font-medium">Gyan Vatika Central Management System</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5 font-mono">
              Role Authorization
            </label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as AdminRole)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 font-semibold"
            >
              <option value="SuperAdmin">SuperAdmin / Trustee (Full Access)</option>
              <option value="Admin">Admin / Office Staff (Operational Write)</option>
              <option value="Guruji">Guruji / Teacher (Class & Gatha Review)</option>
              <option value="Auditor">View-Only / Auditor (Read-Only)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5 font-mono">
              Username
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                placeholder="Enter username"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5 font-mono">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-slate-400 select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded bg-slate-950 border-slate-800 text-indigo-600 focus:ring-0"
              />
              <span>Remember session</span>
            </label>
            <span className="text-indigo-400 hover:underline cursor-pointer">Forgot password?</span>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <KeyRound className="w-4 h-4" />
            <span>Authenticate & Access Portal</span>
          </button>
        </form>

        {/* Quick Demo Selector */}
        <div className="pt-4 border-t border-slate-800/80 space-y-2">
          <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center font-mono">
            Quick Role Demo Switcher
          </span>
          <div className="grid grid-cols-2 gap-2">
            {[
              { role: 'SuperAdmin' as AdminRole, label: 'SuperAdmin' },
              { role: 'Admin' as AdminRole, label: 'Office Admin' },
              { role: 'Guruji' as AdminRole, label: 'Guruji' },
              { role: 'Auditor' as AdminRole, label: 'Auditor' },
            ].map((item) => (
              <button
                key={item.role}
                onClick={() => fillQuickDemo(item.role)}
                className={`px-3 py-1.5 rounded-lg border text-[11px] font-bold transition-all text-left flex items-center justify-between cursor-pointer ${
                  selectedRole === item.role
                    ? 'bg-indigo-950/60 border-indigo-500 text-indigo-200'
                    : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                {selectedRole === item.role && <CheckCircle2 className="w-3 h-3 text-indigo-400" />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
