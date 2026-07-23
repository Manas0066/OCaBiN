import React, { useState } from 'react';
import { Layers, Mail, Lock, User as UserIcon, ShieldAlert, Sparkles, Building2, CreditCard } from 'lucide-react';
import { api, getApiMode } from '../api';
import { User } from '../types';

interface AuthScreensProps {
  onLoginSuccess: (user: User) => void;
  apiMode: 'demo' | 'live';
}

export default function AuthScreens({ onLoginSuccess, apiMode }: AuthScreensProps) {
  const [isRegister, setIsRegister] = useState(false);
  
  // Login states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Register states
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regEmpId, setRegEmpId] = useState('');
  const [regDept, setRegDept] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const response = await api.auth.login(loginEmail, loginPassword);
      onLoginSuccess(response.user);
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const user = await api.auth.register({
        name: regName,
        email: regEmail,
        password: regPassword,
        employeeId: regEmpId,
        department: regDept,
      });
      // Automatically log them in after registration
      const loginResp = await api.auth.login(regEmail, regPassword);
      onLoginSuccess(loginResp.user);
    } catch (err: any) {
      setError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  // Quick mock login helper (only in Demo Mode)
  const handleQuickLogin = async (email: string) => {
    setError(null);
    setLoading(true);
    try {
      const response = await api.auth.login(email);
      onLoginSuccess(response.user);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4">
      
      {/* Branding Header */}
      <div className="flex items-center space-x-3 mb-8">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/10">
          <Layers className="h-6 w-6" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-extrabold tracking-tight bg-gradient-to-r from-slate-950 via-emerald-600 to-teal-500 dark:from-white dark:via-emerald-400 dark:to-teal-300 bg-clip-text text-transparent">
            OCaBiN Office Management
          </h1>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
            Smart Room Reservation Platform
          </p>
        </div>
      </div>

      {/* Main card */}
      <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 sm:p-8 shadow-xl relative overflow-hidden transition-all">
        
        {/* Background ambient light */}
        <div className="absolute top-0 right-0 h-24 w-24 bg-emerald-500/5 dark:bg-emerald-500/15 rounded-full blur-2xl pointer-events-none" />

        {/* Switch tabs */}
        <div className="flex border-b border-slate-100 dark:border-slate-800 pb-4 mb-6">
          <button
            onClick={() => { setIsRegister(false); setError(null); }}
            className={`flex-1 text-center py-2 text-sm font-bold transition-all ${!isRegister ? 'text-emerald-500 dark:text-emerald-400 border-b-2 border-emerald-500' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600'}`}
          >
            Log In
          </button>
          <button
            onClick={() => { setIsRegister(true); setError(null); }}
            className={`flex-1 text-center py-2 text-sm font-bold transition-all ${isRegister ? 'text-emerald-500 dark:text-emerald-400 border-b-2 border-emerald-500' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600'}`}
          >
            Create Account
          </button>
        </div>

        {error && (
          <div className="p-3 mb-4 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 text-xs text-rose-600 dark:text-rose-400 flex items-start space-x-2">
            <ShieldAlert className="h-4.5 w-4.5 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* FORMS */}
        {!isRegister ? (
          /* LOGIN FORM */
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="loginEmail" className="block text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
                Corporate Email
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <Mail className="h-4 w-4" />
                </span>
                <input
                  id="loginEmail"
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full text-xs font-medium rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 py-3 pl-10 pr-4 text-slate-800 dark:text-slate-100 focus:border-emerald-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="loginPassword" className="block text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <Lock className="h-4 w-4" />
                </span>
                <input
                  id="loginPassword"
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full text-xs font-medium rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 py-3 pl-10 pr-4 text-slate-800 dark:text-slate-100 focus:border-emerald-500 focus:outline-none"
                  required={apiMode === 'live'}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center space-x-1 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Sign In'}
            </button>
          </form>
        ) : (
          /* REGISTER FORM */
          <form onSubmit={handleRegister} className="space-y-3.5">
            <div>
              <label htmlFor="regName" className="block text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <UserIcon className="h-4 w-4" />
                </span>
                <input
                  id="regName"
                  type="text"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="Alex Mercer"
                  className="w-full text-xs font-medium rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 py-2.5 pl-9 pr-4 text-slate-800 dark:text-slate-100 focus:border-emerald-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="regEmpId" className="block text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
                  Employee ID
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                    <CreditCard className="h-4 w-4" />
                  </span>
                  <input
                    id="regEmpId"
                    type="text"
                    value={regEmpId}
                    onChange={(e) => setRegEmpId(e.target.value)}
                    placeholder="EMP102"
                    className="w-full text-xs font-medium rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 py-2.5 pl-9 pr-4 text-slate-800 dark:text-slate-100 focus:border-emerald-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="regDept" className="block text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
                  Department
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                    <Building2 className="h-4 w-4" />
                  </span>
                  <input
                    id="regDept"
                    type="text"
                    value={regDept}
                    onChange={(e) => setRegDept(e.target.value)}
                    placeholder="Engineering"
                    className="w-full text-xs font-medium rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 py-2.5 pl-9 pr-4 text-slate-800 dark:text-slate-100 focus:border-emerald-500 focus:outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="regEmail" className="block text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
                Corporate Email
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <Mail className="h-4 w-4" />
                </span>
                <input
                  id="regEmail"
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full text-xs font-medium rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 py-2.5 pl-9 pr-4 text-slate-800 dark:text-slate-100 focus:border-emerald-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="regPassword" className="block text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <Lock className="h-4 w-4" />
                </span>
                <input
                  id="regPassword"
                  type="password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="•••••••• (min 6 chars)"
                  className="w-full text-xs font-medium rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 py-2.5 pl-9 pr-4 text-slate-800 dark:text-slate-100 focus:border-emerald-500 focus:outline-none"
                  minLength={6}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center space-x-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer disabled:opacity-50 mt-1"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
        )}

        {/* Demo Quick Logins (Extremely useful for review!) */}
        {apiMode === 'demo' && (
          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800/80">
            <div className="flex items-center space-x-1 px-1 mb-2 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              <Sparkles className="h-3 w-3 text-emerald-500" />
              <span>Sandbox Quick Logins</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin('admin@company.com')}
                className="py-1.5 px-2 text-[10px] font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 dark:text-purple-300 dark:bg-purple-950/40 dark:hover:bg-purple-950/60 rounded-lg transition-colors text-center truncate"
              >
                👑 Sarah (Admin)
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('manager@company.com')}
                className="py-1.5 px-2 text-[10px] font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 dark:text-blue-300 dark:bg-blue-950/40 dark:hover:bg-blue-950/60 rounded-lg transition-colors text-center truncate"
              >
                💼 David (Manager)
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('employee@company.com')}
                className="py-1.5 px-2 text-[10px] font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 dark:text-emerald-300 dark:bg-emerald-950/40 dark:hover:bg-emerald-950/60 rounded-lg transition-colors text-center truncate"
              >
                👤 Alex (Employee)
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
