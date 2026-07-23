import { useState } from "react";
import {
  LayoutDashboard,
  Building2,
  CalendarDays,
  ClipboardList,
  Users,
  LogOut,
  Menu,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const initials =
    user?.name
      ?.split(" ")
      .map((word: string) => word[0])
      .join("")
      .substring(0, 2)
      .toUpperCase() || "AU";

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    {
      path: "/admin/dashboard",
      label: "Overview",
      icon: LayoutDashboard,
    },
    {
      path: "/admin/cabins",
      label: "Cabins",
      icon: Building2,
    },
    {
      path: "/admin/pending",
      label: "Requests",
      icon: CalendarDays,
    },
    {
      path: "/admin/users",
      label: "Users",
      icon: Users,
    },
    {
      path: "/admin/history",
      label: "Logs",
      icon: ClipboardList,
    },
  ];

  const titles: Record<string, string> = {
    "/admin/dashboard": "Dashboard",
    "/admin/cabins": "Cabin Management",
    "/admin/pending": "Booking Requests",
    "/admin/users": "User Management",
    "/admin/history": "Booking History",
  };

  const currentTitle =
    titles[location.pathname] ?? "Dashboard";

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex overflow-hidden">
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      <aside
        className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-72 glass transition-all duration-500 transform
        ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }
      `}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center gap-3 mb-12 px-2">
            <div className="h-11 w-11 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <ShieldCheck className="text-white h-6 w-6" />
            </div>

            <span className="text-2xl font-black tracking-tighter text-slate-900">
              OCaBiN
            </span>
          </div>

          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => {
              const active =
                location.pathname === item.path;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() =>
                    setSidebarOpen(false)
                  }
                  className={`
                    w-full flex items-center justify-between
                    px-4 py-3.5 rounded-2xl transition-all
                    duration-200 group

                    ${
                      active
                        ? "bg-slate-900 text-white shadow-xl shadow-slate-900/20"
                        : "text-slate-500 hover:bg-white hover:text-slate-900 hover:shadow-sm"
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <item.icon
                      size={20}
                      className={
                        active
                          ? "text-emerald-400"
                          : "group-hover:text-emerald-500"
                      }
                    />

                    <span className="font-bold text-sm">
                      {item.label}
                    </span>
                  </div>

                  {active && (
                    <ChevronRight
                      size={14}
                      className="text-slate-500"
                    />
                  )}
                </NavLink>
              );
            })}
          </nav>

          <div className="pt-6 border-t border-slate-100">
            <button
              onClick={() => {
                localStorage.clear();
                navigate("/login", {
                  replace: true,
                });
              }}
              className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-rose-500 font-bold text-sm hover:bg-rose-50 transition-colors"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="sticky top-0 z-30 h-20 flex items-center justify-between px-8 bg-white/80 backdrop-blur-xl border-b border-slate-200/60">
          <button
            className="lg:hidden p-2 text-slate-600"
            onClick={() =>
              setSidebarOpen(true)
            }
          >
            <Menu size={24} />
          </button>

          <div className="hidden md:block">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.25em]">
              OCaBiN Admin
            </p>

            <h1 className="text-2xl font-black text-slate-900">
              {currentTitle}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-black text-slate-900 leading-none">
                {user.name}
              </p>

              <p className="text-[10px] font-bold text-emerald-500 uppercase mt-1">
                {user.role}
              </p>
            </div>

            <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg flex items-center justify-center font-black">
              {initials}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}