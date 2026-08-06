// import { useState } from "react";
// import {
//   Home,
//   Building2,
//   CalendarCheck,
//   LogOut,
//   Menu,
//   ChevronRight,
//   User,
// } from "lucide-react";

// import {
//   NavLink,
//   Outlet,
//   useLocation,
//   useNavigate,
// } from "react-router-dom";

// export default function EmployeeLayout() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [isCollapsed, setIsCollapsed] = useState(false);

//   const menuItems = [
//     {
//       path: "/employee/dashboard",
//       label: "Overview",
//       icon: Home,
//     },
//     {
//       path: "/employee/cabins",
//       label: "Book a Cabin",
//       icon: Building2,
//     },
//     {
//       path: "/employee/bookings",
//       label: "My Schedule",
//       icon: CalendarCheck,
//     },
//   ];

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login", { replace: true });
//   };
  
//   const user = JSON.parse(localStorage.getItem("user") || "{}");
//   const userName = user.fullName || user.name || "User";
//   const userRole = user.role || "EMPLOYEE";

//   return (
//     <div className="min-h-screen bg-[#090d16] premium-bg-pattern flex overflow-hidden relative w-full text-slate-100">
//       {/* Ambient background lights */}
//       <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none z-0" />
//       <div className="absolute bottom-0 left-1/3 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[150px] pointer-events-none z-0" />

//       {/* Mobile Sidebar Overlay */}
//       {sidebarOpen && (
//         <div 
//           className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* Floating rounded retractable sidebar */}
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
//           bg-[#111425]/85 backdrop-blur-xl border border-slate-800/80
//           shadow-[0_8px_30px_rgba(0,0,0,0.35)]
//           overflow-hidden z-40
//         `}
//       >
//         <div className="flex flex-col h-full p-4 justify-between">
//           <div className="space-y-8">
//             {/* Header branding & toggle */}
//             <div className={`flex items-center justify-between px-2 ${isCollapsed ? "lg:justify-center lg:px-0" : ""}`}>
//               <div className="flex items-center gap-3">
//                 <div className="h-10 w-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/15 flex-shrink-0 transition-transform duration-300 hover:scale-105">
//                   <Building2 className="text-white h-5 w-5" />
//                 </div>
//                 <span className={`text-xl font-black tracking-tight text-white transition-all duration-300 whitespace-nowrap overflow-hidden ${isCollapsed ? "lg:max-w-0 lg:opacity-0" : "max-w-xs opacity-100"}`}>
//                   OCaBiN
//                 </span>
//               </div>

//               {/* Desktop toggle button */}
//               <button
//                 onClick={() => setIsCollapsed(!isCollapsed)}
//                 className="hidden lg:flex items-center justify-center p-1.5 rounded-lg border border-slate-850 bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-white transition-all hover:scale-105 active:scale-95"
//                 title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
//               >
//                 <Menu size={16} className={`transition-transform duration-300 ${isCollapsed ? "rotate-90" : ""}`} />
//               </button>
//             </div>

//             {/* Navigation links */}
//             <nav className="space-y-1.5">
//               {menuItems.map((item) => {
//                 const active = location.pathname === item.path;
//                 return (
//                   <NavLink
//                     key={item.path}
//                     to={item.path}
//                     onClick={() => setSidebarOpen(false)}
//                     className={`
//                       relative w-full flex items-center px-3.5 py-3 rounded-xl transition-all duration-300 group
//                       ${active 
//                         ? "bg-slate-100 text-slate-900 shadow-lg shadow-white/5" 
//                         : "text-slate-400 hover:bg-slate-900/40 hover:text-white"}
//                       ${isCollapsed ? "lg:justify-center" : "justify-between"}
//                     `}
//                   >
//                     <div className="flex items-center gap-4">
//                       <item.icon size={18} className={`transition-all duration-300 group-hover:scale-110 ${active ? "text-slate-900" : "text-slate-455 group-hover:text-white"}`} />
//                       <span className={`font-bold text-xs whitespace-nowrap transition-all duration-300 ease-in-out ${isCollapsed ? "lg:max-w-0 lg:opacity-0 lg:ml-0" : "max-w-xs opacity-100 ml-0"}`}>{item.label}</span>
//                     </div>

//                     {/* Active indicators */}
//                     {active && !isCollapsed && (
//                       <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-emerald-500 rounded-r-full" />
//                     )}
//                     {active && isCollapsed && (
//                       <span className="absolute left-1/2 -translate-x-1/2 bottom-1.5 w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
//                     )}
//                   </NavLink>
//                 );
//               })}
//             </nav>
//           </div>

//           {/* User profile details & Sign out */}
//           <div className="pt-4 border-t border-slate-800 bg-slate-900/10 rounded-xl">
//             <div className={`flex items-center gap-3 px-2 py-3 mb-2 rounded-xl bg-slate-950/20 ${isCollapsed ? "lg:justify-center lg:px-0" : ""}`}>
//               <div className="h-9 w-9 rounded-full bg-slate-900 border border-slate-850 flex items-center justify-center text-slate-400 shadow-sm flex-shrink-0">
//                 <User size={16} />
//               </div>
//               <div className={`min-w-0 transition-all duration-300 overflow-hidden ${isCollapsed ? "lg:max-w-0 lg:opacity-0" : "max-w-xs opacity-100"}`}>
//                 <p className="text-xs font-bold text-slate-100 truncate">{userName}</p>
//                 <p className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest">{userRole}</p>
//               </div>
//             </div>
            
//             <button
//               onClick={handleLogout}
//               className={`
//                 w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-rose-400 font-bold text-xs hover:bg-rose-950/20 transition-all duration-200 group
//                 ${isCollapsed ? "lg:justify-center" : ""}
//               `}
//               title="Logout Session"
//             >
//               <LogOut size={18} className="transition-transform duration-300 group-hover:translate-x-0.5" />
//               <span className={`whitespace-nowrap transition-all duration-300 ${isCollapsed ? "lg:max-w-0 lg:opacity-0" : "max-w-xs opacity-100"}`}>
//                 Logout Session
//               </span>
//             </button>
//           </div>
//         </div>
//       </aside>

//       {/* Main Content Area */}
//       <div className="flex-1 flex flex-col h-screen overflow-hidden z-10">
//         {/* FIXED: Removed color backgrounds and border boundaries */}
//         <header className="h-20 flex-shrink-0 flex items-center justify-between px-8 bg-transparent">
//           <div className="flex items-center gap-4">
//             <button 
//               className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-xl transition-colors" 
//               onClick={() => setSidebarOpen(true)}
//             >
//               <Menu size={24} />
//             </button>
            
//             <div className="flex flex-col">
//               <h2 className="text-xs font-bold text-slate-550 uppercase tracking-widest leading-none mb-1">
//                 Employee Portal
//               </h2>
//               <div className="flex items-center gap-2">
//                 <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></span>
//                 <span className="text-xs font-black text-slate-100">System Live</span>
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center gap-3">
//              <div className="hidden sm:flex flex-col text-right mr-2">
//                 <span className="text-xs font-black text-slate-100 leading-none">OCaBiN v1.0</span>
//                 <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Production</span>
//              </div>
//              <div className="h-10 w-10 rounded-2xl bg-slate-950 text-white flex items-center justify-center font-black text-sm border-2 border-slate-800 shadow-md">
//                 {userName.charAt(0).toUpperCase()}
//              </div>
//           </div>
//         </header>

//         {/* Page Content */}
//         <main className="flex-1 overflow-y-auto">
//           <div className="max-w-screen-2xl mx-auto p-6 lg:p-10 animate-fade-in-up">
//             <Outlet />
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import {
  Home,
  Building2,
  CalendarCheck,
  LogOut,
  Menu,
  ChevronRight,
  User,
} from "lucide-react";

import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

export default function EmployeeLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    {
      path: "/employee/dashboard",
      label: "Overview",
      icon: Home,
    },
    {
      path: "/employee/cabins",
      label: "Book a Cabin",
      icon: Building2,
    },
    {
      path: "/employee/bookings",
      label: "My Schedule",
      icon: CalendarCheck,
    },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };
  
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userName = user.fullName || user.name || "User";
  const userRole = user.role || "EMPLOYEE";

  return (
    <div className="min-h-screen bg-[#f8fafc] premium-bg-pattern flex overflow-hidden relative w-full text-slate-800">
      {/* Ambient background lights */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-1/3 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[150px] pointer-events-none z-0" />

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/10 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Floating rounded retractable sidebar - White Glassmorphism */}
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
            {/* Header branding & toggle */}
            <div className={`flex items-center justify-between px-2 ${isCollapsed ? "lg:justify-center lg:px-0" : ""}`}>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/15 flex-shrink-0 transition-transform duration-300 hover:scale-105">
                  <Building2 className="text-white h-5 w-5" />
                </div>
                <span className={`text-xl font-black tracking-tight text-slate-900 transition-all duration-300 whitespace-nowrap overflow-hidden ${isCollapsed ? "lg:max-w-0 lg:opacity-0" : "max-w-xs opacity-100"}`}>
                  OCaBiN
                </span>
              </div>

              {/* Desktop toggle button */}
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="hidden lg:flex items-center justify-center p-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-all hover:scale-105 active:scale-95"
                title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
              >
                <Menu size={16} className={`transition-transform duration-300 ${isCollapsed ? "rotate-90" : ""}`} />
              </button>
            </div>

            {/* Navigation links */}
            <nav className="space-y-1.5">
              {menuItems.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`
                      relative w-full flex items-center px-3.5 py-3 rounded-xl transition-all duration-300 group
                      ${active 
                        ? "bg-slate-100 text-slate-900 shadow-sm border border-slate-200/50" 
                        : "text-slate-500 hover:bg-emerald-50 hover:text-emerald-600"}
                      ${isCollapsed ? "lg:justify-center" : "justify-between"}
                    `}
                  >
                    <div className="flex items-center gap-4">
                      <item.icon size={18} className={`transition-all duration-300 group-hover:scale-110 ${active ? "text-slate-900" : "text-slate-500 group-hover:text-emerald-600"}`} />
                      <span className={`font-bold text-xs whitespace-nowrap transition-all duration-300 ease-in-out ${isCollapsed ? "lg:max-w-0 lg:opacity-0 lg:ml-0" : "max-w-xs opacity-100 ml-0"}`}>{item.label}</span>
                    </div>

                    {/* Active indicators */}
                    {active && !isCollapsed && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-emerald-500 rounded-r-full" />
                    )}
                    {active && isCollapsed && (
                      <span className="absolute left-1/2 -translate-x-1/2 bottom-1.5 w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>

          {/* User profile details & Sign out */}
          <div className="pt-4 border-t border-slate-100 bg-slate-50/40 rounded-xl">
            <div className={`flex items-center gap-3 px-2 py-3 mb-2 rounded-xl bg-slate-50/80 border border-slate-100/50 ${isCollapsed ? "lg:justify-center lg:px-0" : ""}`}>
              <div className="h-9 w-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 shadow-sm flex-shrink-0">
                <User size={16} />
              </div>
              <div className={`min-w-0 transition-all duration-300 overflow-hidden ${isCollapsed ? "lg:max-w-0 lg:opacity-0" : "max-w-xs opacity-100"}`}>
                <p className="text-xs font-bold text-slate-900 truncate">{userName}</p>
                <p className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest">{userRole}</p>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className={`
                w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-rose-500 font-bold text-xs hover:bg-rose-50/60 transition-all duration-200 group
                ${isCollapsed ? "lg:justify-center" : ""}
              `}
              title="Logout Session"
            >
              <LogOut size={18} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              <span className={`whitespace-nowrap transition-all duration-300 ${isCollapsed ? "lg:max-w-0 lg:opacity-0" : "max-w-xs opacity-100"}`}>
                Logout Session
              </span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden z-10">
        <header className="h-20 flex-shrink-0 flex items-center justify-between px-8 bg-transparent">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-xl transition-colors" 
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            
            <div className="flex flex-col">
              <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">
                Employee Portal
              </h2>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></span>
                <span className="text-xs font-black text-slate-900">System Live</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
             <div className="hidden sm:flex flex-col text-right mr-2">
                <span className="text-xs font-black text-slate-900 leading-none">OCaBiN v1.0</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Production</span>
             </div>
             <div className="h-10 w-10 rounded-2xl bg-white text-slate-900 flex items-center justify-center font-black text-sm border-2 border-slate-200 shadow-md">
                {userName.charAt(0).toUpperCase()}
             </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-screen-2xl mx-auto p-6 lg:p-10 animate-fade-in-up">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}