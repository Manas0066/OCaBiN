import { useState } from 'react';
import { X, Server, Database, Globe, Play, CheckCircle } from 'lucide-react';
import { getApiMode, setApiMode, getApiUrl, setApiUrl, resetMockData } from '../api';

interface SettingsModalProps {
  onClose: () => void;
  onRefreshData?: () => void;
}

export default function SettingsModal({ onClose, onRefreshData }: SettingsModalProps) {
  const [mode, setMode] = useState<'demo' | 'live'>(getApiMode());
  const [apiUrl, setApiUrlState] = useState<string>(getApiUrl());
  const [showSavedToast, setShowSavedToast] = useState(false);

  const handleSave = () => {
    setApiMode(mode);
    setApiUrl(apiUrl);
    setShowSavedToast(true);
    setTimeout(() => {
      setShowSavedToast(false);
      onClose();
      if (onRefreshData) onRefreshData();
    }, 1200);
  };

  const handleReset = () => {
    if (confirm('Reset mock database? This restores all 6 cabins and 5 default bookings inside local storage.')) {
      resetMockData();
      if (onRefreshData) onRefreshData();
      alert('Mock database reset!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-100 dark:border-slate-800 transition-all p-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center space-x-2.5">
            <Server className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />
            <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
              System Configuration
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="mt-5 space-y-6">
          {/* Active Mode */}
          <div>
            <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Data Connection Mode
            </label>
            <div className="grid grid-cols-2 gap-3 mt-2">
              <button
                type="button"
                onClick={() => setMode('demo')}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border text-center transition-all ${
                  mode === 'demo'
                    ? 'border-emerald-500 dark:border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-100 shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400'
                }`}
              >
                <Database className="h-6 w-6 mb-2 text-emerald-500" />
                <span className="text-xs font-bold">Demo Sandbox</span>
                <span className="text-[10px] text-slate-400 mt-1">Full state stored locally</span>
              </button>

              <button
                type="button"
                onClick={() => setMode('live')}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border text-center transition-all ${
                  mode === 'live'
                    ? 'border-indigo-500 dark:border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/20 text-indigo-900 dark:text-indigo-100 shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400'
                }`}
              >
                <Globe className="h-6 w-6 mb-2 text-indigo-500" />
                <span className="text-xs font-bold">Live API Server</span>
                <span className="text-[10px] text-slate-400 mt-1">Connects to your local Spring Boot app</span>
              </button>
            </div>
          </div>

          {/* Live Server URL (Conditional) */}
          {mode === 'live' && (
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/80 space-y-3">
              <div>
                <label htmlFor="apiUrl" className="block text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Spring Boot Backend URL (leave blank to use the dev proxy)
                </label>
                <input
                  id="apiUrl"
                  type="text"
                  value={apiUrl}
                  onChange={(e) => setApiUrlState(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm text-slate-800 dark:text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  placeholder="Blank = /api via Vite proxy (localhost:8080)"
                />
              </div>
              <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                💡 Leave this blank while developing locally — <code className="font-mono bg-slate-150 dark:bg-slate-900 px-1 rounded">vite.config.ts</code> already proxies <code className="font-mono bg-slate-150 dark:bg-slate-900 px-1 rounded">/api</code> to <code className="font-mono bg-slate-150 dark:bg-slate-900 px-1 rounded">http://localhost:8080</code>, so no CORS setup is needed. Only fill this in if your backend is deployed elsewhere.
              </p>
            </div>
          )}

          {/* Quick Guide for OCaBiN APIs */}
          <div>
            <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Consumed Endpoints Reference
            </label>
            <div className="mt-2 text-[11px] font-mono text-slate-600 dark:text-slate-400 max-h-36 overflow-y-auto space-y-1.5 p-3 rounded-lg border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/20">
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1">
                <span className="text-emerald-600 dark:text-emerald-400">POST /api/auth/login</span>
                <span className="text-slate-400">User Login</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1">
                <span className="text-emerald-600 dark:text-emerald-400">POST /api/auth/register</span>
                <span className="text-slate-400">Register</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1">
                <span className="text-indigo-600 dark:text-indigo-400">GET /api/cabins</span>
                <span className="text-slate-400">Cabins List</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1">
                <span className="text-indigo-600 dark:text-indigo-400">POST /api/cabins</span>
                <span className="text-slate-400">Create (Admin)</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1">
                <span className="text-amber-600 dark:text-amber-400">POST /api/bookings</span>
                <span className="text-slate-400">Book (Employee)</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-1">
                <span className="text-amber-600 dark:text-amber-400">PUT /api/bookings/:id/approve</span>
                <span className="text-slate-400">Approve (Mgr/Admin)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-600 dark:text-purple-400">GET /api/dashboard/stats</span>
                <span className="text-slate-400">Stats Summary</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-4">
          <button
            onClick={handleReset}
            className="px-3 py-1.5 text-xs text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 font-medium rounded-lg transition-colors"
          >
            Reset Local DB
          </button>
          
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center space-x-1.5 px-4 py-2 text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 rounded-lg shadow-md transition-colors"
            >
              <CheckCircle className="h-3.5 w-3.5" />
              <span>Apply Changes</span>
            </button>
          </div>
        </div>

        {/* Saved Confirmation Toast */}
        {showSavedToast && (
          <div className="absolute inset-0 bg-white/95 dark:bg-slate-900/95 flex flex-col items-center justify-center z-50">
            <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-500 flex items-center justify-center animate-bounce">
              <CheckCircle className="h-6 w-6" />
            </div>
            <p className="mt-2 text-sm font-bold text-slate-800 dark:text-slate-100">
              Settings Saved!
            </p>
            <p className="text-xs text-slate-500">
              Re-initiating connection...
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
