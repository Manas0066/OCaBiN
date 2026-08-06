// import { useState } from "react";
// import {
//   LayoutDashboard,
//   Building2,
//   CalendarDays,
//   ClipboardList,
//   Users,
//   LogOut,
//   Menu,
//   ChevronRight,
//   ShieldCheck,
// } from "lucide-react";

// import {
//   NavLink,
//   Outlet,
//   useLocation,
//   useNavigate,
// } from "react-router-dom";

// export default function AdminLayout() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const user = JSON.parse(localStorage.getItem("user") || "{}");

//   const initials =
//     user?.name
//       ?.split(" ")
//       .map((word: string) => word[0])
//       .join("")
//       .substring(0, 2)
//       .toUpperCase() || "AU";

//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [isCollapsed, setIsCollapsed] = useState(false);

//   const menuItems = [
//     {
//       path: "/admin/dashboard",
//       label: "Overview",
//       icon: LayoutDashboard,
//     },
//     {
//       path: "/admin/cabins",
//       label: "Cabins",
//       icon: Building2,
//     },
//     {
//       path: "/admin/pending",
//       label: "Requests",
//       icon: CalendarDays,
//     },
//     {
//       path: "/admin/users",
//       label: "Users",
//       icon: Users,
//     },
//     {
//       path: "/admin/history",
//       label: "Logs",
//       icon: ClipboardList,
//     },
//   ];

//   const titles: Record<string, string> = {
//     "/admin/dashboard": "Dashboard",
//     "/admin/cabins": "Cabin Management",
//     "/admin/pending": "Booking Requests",
//     "/admin/users": "User Management",
//     "/admin/history": "Booking History",
//   };

//   const currentTitle =
//     titles[location.pathname] ?? "Dashboard";

//   return (
//     <div className="min-h-screen bg-[#f8fafc] premium-bg-pattern flex overflow-hidden relative w-full text-slate-800">
//       {/* Dynamic ambient background glows */}
//       <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none z-0" />
//       <div className="absolute bottom-0 left-1/3 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[150px] pointer-events-none z-0" />

//       {/* Mobile Drawer Overlay */}
//       {sidebarOpen && (
//         <div
//           onClick={() => setSidebarOpen(false)}
//           className="fixed inset-0 bg-slate-900/10 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
//         />
//       )}

//       {/* Floating rounded expandable navigation - White Glassmorphism */}
//       <aside
//         className={`
//           fixed inset-y-0 left-0 z-50
//           lg:relative lg:inset-auto
//           transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
//           flex flex-col
//           ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
//           ${isCollapsed ? "lg:w-24" : "lg:w-72"}
//           w-72
//           lg:my-4 lg:ml-4 lg:rounded-[24px]
//           bg-white/80 backdrop-blur-xl border border-slate-200/50
//           shadow-[0_8px_30px_rgba(0,0,0,0.02)]
//           overflow-hidden z-40
//         `}
//       >
//         <div className="flex flex-col h-full p-4 justify-between">
//           <div className="space-y-8">
//             {/* Header: Brand & Collapse Toggle */}
//             <div className={`flex items-center justify-between px-2 ${isCollapsed ? "lg:justify-center lg:px-0" : ""}`}>
//               <div className="flex items-center gap-3">
//                 <div className="h-10 w-10 bg-emerald-500 text-white rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/15 flex-shrink-0 transition-transform duration-300 hover:scale-105">
//                   <ShieldCheck className="text-white h-5.5 w-5.5" />
//                 </div>
//                 <span
//                   className={`text-lg font-black tracking-tighter text-slate-900 transition-all duration-300 whitespace-nowrap overflow-hidden ${
//                     isCollapsed ? "lg:max-w-0 lg:opacity-0" : "max-w-xs opacity-100"
//                   }`}
//                 >
//                   OCaBiN
//                 </span>
//               </div>

//               <button
//                 onClick={() => setIsCollapsed(!isCollapsed)}
//                 className="hidden lg:flex items-center justify-center p-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-all hover:scale-105 active:scale-95"
//                 title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
//               >
//                 <Menu size={16} className={`transition-transform duration-300 ${isCollapsed ? "rotate-90" : ""}`} />
//               </button>
//             </div>

//             {/* Navigation Menus */}
//             <nav className="space-y-1.5">
//               {menuItems.map((item) => {
//                 const active = location.pathname === item.path;

//                 return (
//                   <NavLink
//                     key={item.path}
//                     to={item.path}
//                     onClick={() => setSidebarOpen(false)}
//                     className={`
//                       relative w-full flex items-center
//                       px-3.5 py-3 rounded-xl transition-all duration-300 group
//                       ${
//                         active
//                           ? "bg-slate-100 text-slate-900 shadow-sm border border-slate-200/50"
//                           : "text-slate-500 hover:bg-emerald-50 hover:text-emerald-600"
//                       }
//                       ${isCollapsed ? "lg:justify-center" : "justify-between"}
//                     `}
//                   >
//                     <div className="flex items-center gap-3">
//                       <item.icon
//                         size={18}
//                         className={`
//                           transition-all duration-300 group-hover:scale-110
//                           ${active ? "text-slate-900" : "text-slate-500 group-hover:text-emerald-600"}
//                         `}
//                       />
//                       <span
//                         className={`
//                           font-bold text-xs whitespace-nowrap transition-all duration-300 ease-in-out
//                           ${isCollapsed ? "lg:max-w-0 lg:opacity-0 lg:ml-0" : "max-w-xs opacity-100 ml-0"}
//                         `}
//                       >
//                         {item.label}
//                       </span>
//                     </div>

//                     {active && !isCollapsed && (
//                       <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-emerald-500 rounded-r-full" />
//                     )}
//                     {active && isCollapsed && (
//                       <span className="absolute left-1/2 -translate-x-1/2 bottom-1.5 w-1 h-1 bg-emerald-500 rounded-full" />
//                     )}
//                   </NavLink>
//                 );
//               })}
//             </nav>
//           </div>

//           {/* Footer: User Details & Logout */}
//           <div className="pt-4 border-t border-slate-100">
//             <button
//               onClick={() => {
//                 navigate("/login", { replace: true });
//                 localStorage.clear();
//               }}
//               className={`
//                 w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-rose-500 font-bold text-xs hover:bg-rose-50/60 transition-all duration-200 group
//                 ${isCollapsed ? "lg:justify-center" : ""}
//               `}
//               title="Logout Session"
//             >
//               <LogOut size={18} className="transition-transform duration-300 group-hover:translate-x-0.5" />
//               <span
//                 className={`whitespace-nowrap transition-all duration-300 ${
//                   isCollapsed ? "lg:max-w-0 lg:opacity-0" : "max-w-xs opacity-100"
//                 }`}
//               >
//                 Logout Session
//               </span>
//             </button>
//           </div>
//         </div>
//       </aside>

//       {/* Main View Container */}
//       <div className="flex-1 flex flex-col h-screen overflow-hidden z-10">
//         <header className="h-20 flex-shrink-0 flex items-center justify-between px-8 bg-transparent">
//           <button
//             className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-xl transition-colors"
//             onClick={() => setSidebarOpen(true)}
//           >
//             <Menu size={24} />
//           </button>

//           <div className="hidden md:block">
//             <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.25em]">
//               OCaBiN Admin
//             </p>
//             <h1 className="text-2xl font-black text-slate-900">
//               {currentTitle}
//             </h1>
//           </div>

//           <div className="flex items-center gap-4">
//             <div className="text-right hidden sm:block">
//               <p className="text-sm font-black text-slate-800 leading-none">
//                 {user.name}
//               </p>
//               <p className="text-[10px] font-bold text-emerald-500 uppercase mt-1">
//                 {user.role}
//               </p>
//             </div>

//             <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg flex items-center justify-center font-black transition-transform duration-300 hover:scale-105">
//               {initials}
//             </div>
//           </div>
//         </header>

//         {/* Page Content Viewport wrapper */}
//         <main className="flex-1 overflow-y-auto p-8">
//           <div className="max-w-7xl mx-auto animate-fade-in-up">
//             <Outlet />
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }
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
  const [isCollapsed, setIsCollapsed] = useState(false);

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
    <div className="min-h-screen bg-[#f8fafc] premium-bg-pattern flex overflow-hidden relative w-full text-slate-800">
      {/* Dynamic ambient background glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-1/3 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[150px] pointer-events-none z-0" />

      {/* Mobile Drawer Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-slate-900/10 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
        />
      )}

      {/* Floating rounded expandable navigation - White Glassmorphism */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          lg:relative lg:inset-auto
          transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
          flex flex-col
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          ${isCollapsed ? "lg:w-24" : "lg:w-72"}
          w-72
          lg:my-4 lg:ml-4 lg:rounded-[24px]
          bg-white/80 backdrop-blur-xl border border-slate-200/50
          shadow-[0_8px_30px_rgba(0,0,0,0.02)]
          overflow-hidden z-40
        `}
      >
        <div className="flex flex-col h-full p-4 justify-between">
          <div className="space-y-8">
            {/* Header: Brand & Collapse Toggle */}
            <div className={`flex items-center justify-between px-2 ${isCollapsed ? "lg:justify-center lg:px-0" : ""}`}>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-emerald-500 text-white rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/15 flex-shrink-0 transition-transform duration-300 hover:scale-105">
                  <ShieldCheck className="text-white h-5.5 w-5.5" />
                </div>
                <span
                  className={`text-lg font-black tracking-tighter text-slate-900 transition-all duration-300 whitespace-nowrap overflow-hidden ${
                    isCollapsed ? "lg:max-w-0 lg:opacity-0" : "max-w-xs opacity-100"
                  }`}
                >
                  OCaBiN
                </span>
              </div>

              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="hidden lg:flex items-center justify-center p-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-all hover:scale-105 active:scale-95"
                title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
              >
                <Menu size={16} className={`transition-transform duration-300 ${isCollapsed ? "rotate-90" : ""}`} />
              </button>
            </div>

            {/* Navigation Menus */}
            <nav className="space-y-1.5">
              {menuItems.map((item) => {
                const active = location.pathname === item.path;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`
                      relative w-full flex items-center
                      px-3.5 py-3 rounded-xl transition-all duration-300 group
                      ${
                        active
                          ? "bg-slate-100 text-slate-900 shadow-sm border border-slate-200/50"
                          : "text-slate-500 hover:bg-emerald-50 hover:text-emerald-600"
                      }
                      ${isCollapsed ? "lg:justify-center" : "justify-between"}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon
                        size={18}
                        className={`
                          transition-all duration-300 group-hover:scale-110
                          ${active ? "text-slate-900" : "text-slate-500 group-hover:text-emerald-600"}
                        `}
                      />
                      <span
                        className={`
                          font-bold text-xs whitespace-nowrap transition-all duration-300 ease-in-out
                          ${isCollapsed ? "lg:max-w-0 lg:opacity-0 lg:ml-0" : "max-w-xs opacity-100 ml-0"}
                        `}
                      >
                        {item.label}
                      </span>
                    </div>

                    {active && !isCollapsed && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-emerald-500 rounded-r-full" />
                    )}
                    {active && isCollapsed && (
                      <span className="absolute left-1/2 -translate-x-1/2 bottom-1.5 w-1 h-1 bg-emerald-500 rounded-full" />
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>

          {/* Footer: User Details & Logout */}
          <div className="pt-4 border-t border-slate-100">
            <button
              onClick={() => {
                navigate("/login", { replace: true });
                localStorage.clear();
              }}
              className={`
                w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-rose-500 font-bold text-xs hover:bg-rose-50/60 transition-all duration-200 group
                ${isCollapsed ? "lg:justify-center" : ""}
              `}
              title="Logout Session"
            >
              <LogOut size={18} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              <span
                className={`whitespace-nowrap transition-all duration-300 ${
                  isCollapsed ? "lg:max-w-0 lg:opacity-0" : "max-w-xs opacity-100"
                }`}
              >
                Logout Session
              </span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main View Container */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden z-10">
        <header className="h-20 flex-shrink-0 flex items-center justify-between px-8 bg-transparent">
          <button
            className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-xl transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>

          <div className="hidden md:block">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.25em]">
              OCaBiN Admin
            </p>
            <h1 className="text-2xl font-black text-slate-900">
              {currentTitle}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-black text-slate-800 leading-none">
                {user.name}
              </p>
              <p className="text-[10px] font-bold text-emerald-500 uppercase mt-1">
                {user.role}
              </p>
            </div>

            <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg flex items-center justify-center font-black transition-transform duration-300 hover:scale-105">
              {initials}
            </div>
          </div>
        </header>

        {/* Page Content Viewport wrapper */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto animate-fade-in-up">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}