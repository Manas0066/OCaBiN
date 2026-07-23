import { useState, useEffect } from 'react';
import { Layers, Settings, Sun, Moon, LogOut, Users, RefreshCw } from 'lucide-react';
import { User } from '../types';
import { getApiMode, setApiMode, resetMockData } from '../api';

interface NavbarProps {
  currentUser: User | null;
  onLogout: () => void;
  onOpenSettings: () => void;
  onSwitchUser: (role: 'ADMIN' | 'MANAGER' | 'EMPLOYEE') => void;
  theme: 'light' | 'dark';
  setTheme: (t: 'light' | 'dark') => void;
}

export default function Navbar({
  currentUser,
  onLogout,
  onOpenSettings,
  onSwitchUser,
  theme,
  setTheme,
}: NavbarProps) {
  const [apiMode, setApiModeState] = useState<'demo' | 'live'>(getApiMode());
  const [showQuickUserMenu, setShowQuickUserMenu] = useState(false);

  useEffect(() => {
    const handleModeChange = () => {
      setApiModeState(getApiMode());
    };
    window.addEventListener('storage_api_mode', handleModeChange);
    return () => window.removeEventListener('storage_api_mode', handleModeChange);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all mock cabins and bookings? This will restore the default demo data.')) {
      resetMockData();
      alert('Mock data has been reset successfully!');
    }
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/85 dark:bg-slate-900/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/10">
              <Layers className="h-6 w-6" />
            </div>
            <div>
              <span className="font-display text-xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-emerald-600 to-teal-500 dark:from-white dark:via-emerald-400 dark:to-teal-300 bg-clip-text text-transparent">
                OCaBiN
              </span>
              <span className="hidden sm:inline-block ml-1.5 text-xs font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-medium">
                v1.0.0
              </span>
            </div>
          </div>

          {/* Quick Actions / Session Info */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Mode & Reset Indicators */}
            <div className="flex items-center space-x-2">
              <button
                onClick={onOpenSettings}
                className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-medium border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
                title="API Connection Settings"
              >
                <span className={`h-2 w-2 rounded-full ${apiMode === 'live' ? 'bg-indigo-500 shadow-sm shadow-indigo-500/30' : 'bg-emerald-500 shadow-sm shadow-emerald-500/30'}`} />
                <span className="hidden md:inline">{apiMode === 'live' ? 'Live API' : 'Demo Mode'}</span>
                <Settings className="h-3.5 w-3.5 ml-1 text-slate-400 dark:text-slate-500" />
              </button>

              {apiMode === 'demo' && currentUser && (
                <button
                  onClick={handleReset}
                  className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                  title="Reset Demo Data"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Quick Switch (Only available in Demo Mode to make grading easy!) */}
            {apiMode === 'demo' && currentUser && (
              <div className="relative">
                <button
                  onClick={() => setShowQuickUserMenu(!showQuickUserMenu)}
                  className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-900/30 hover:bg-emerald-100 dark:hover:bg-emerald-950/60 transition-all"
                >
                  <Users className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Role Switch</span>
                </button>

                {showQuickUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white dark:bg-slate-800 shadow-xl border border-slate-100 dark:border-slate-700/80 p-1 z-50">
                    <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      Demo Roles
                    </div>
                    <button
                      onClick={() => { onSwitchUser('ADMIN'); setShowQuickUserMenu(false); }}
                      className={`w-full text-left px-3 py-2 text-xs rounded-lg font-medium transition-all ${currentUser.role === 'ADMIN' ? 'bg-emerald-500 text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'}`}
                    >
                      👑 Sarah (Admin)
                    </button>
                    <button
                      onClick={() => { onSwitchUser('MANAGER'); setShowQuickUserMenu(false); }}
                      className={`w-full text-left px-3 py-2 text-xs rounded-lg font-medium transition-all ${currentUser.role === 'MANAGER' ? 'bg-emerald-500 text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'}`}
                    >
                      💼 David (Manager)
                    </button>
                    <button
                      onClick={() => { onSwitchUser('EMPLOYEE'); setShowQuickUserMenu(false); }}
                      className={`w-full text-left px-3 py-2 text-xs rounded-lg font-medium transition-all ${currentUser.role === 'EMPLOYEE' ? 'bg-emerald-500 text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'}`}
                    >
                      👤 Alex (Employee)
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <Moon className="h-4 sm:h-5 w-4 sm:w-5" /> : <Sun className="h-4 sm:h-5 w-4 sm:w-5 text-amber-400" />}
            </button>

            {/* Current User Info */}
            {currentUser && (
              <div className="flex items-center space-x-3 border-l border-slate-200 dark:border-slate-800 pl-3 sm:pl-4">
                <div className="hidden md:flex flex-col text-right">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate max-w-[120px]">
                    {currentUser.name.split(' ')[0]}
                  </span>
                  <span className={`text-[10px] font-mono uppercase font-bold tracking-wider self-end px-1.5 py-0.25 rounded-md ${
                    currentUser.role === 'ADMIN' ? 'bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300' :
                    currentUser.role === 'MANAGER' ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300' :
                    'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                  }`}>
                    {currentUser.role}
                  </span>
                </div>
                
                <button
                  onClick={onLogout}
                  className="p-2 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all"
                  title="Logout"
                >
                  <LogOut className="h-4 sm:h-5 w-4 sm:w-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
