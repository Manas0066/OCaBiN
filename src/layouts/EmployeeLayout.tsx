// import { useState } from "react";
// import {
//   Home,
//   Building2,
//   CalendarCheck,
//   LogOut,
//   Menu,
//   X,
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

//   const menuItems = [
//     {
//       path: "/employee/dashboard",
//       label: "Dashboard",
//       icon: Home,
//     },
//     {
//       path: "/employee/cabins",
//       label: "Available Cabins",
//       icon: Building2,
//     },
//     {
//       path: "/employee/bookings",
//       label: "My Bookings",
//       icon: CalendarCheck,
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-slate-100 flex">
//       {/* Sidebar */}

//       <aside
//         className={`
//         fixed lg:static
//         z-40
//         h-screen
//         w-72
//         bg-indigo-700
//         text-white
//         transition-all

//         ${
//           sidebarOpen
//             ? "left-0"
//             : "-left-72 lg:left-0"
//         }
//       `}
//       >
//         <div className="flex items-center justify-between p-6 border-b border-indigo-600">
//           <div>
//             <h2 className="text-2xl font-bold">
//               Cabin CMS
//             </h2>

//             <p className="text-indigo-200 text-sm mt-1">
//               Employee Portal
//             </p>
//           </div>

//           <button
//             className="lg:hidden"
//             onClick={() =>
//               setSidebarOpen(false)
//             }
//           >
//             <X />
//           </button>
//         </div>

//         <nav className="mt-6 px-3 space-y-2">
//           {menuItems.map((item) => {
//             const active =
//               location.pathname === item.path;

//             return (
//               <NavLink
//                 key={item.path}
//                 to={item.path}
//                 onClick={() =>
//                   setSidebarOpen(false)
//                 }
//                 className={`
//                   w-full flex items-center gap-3 px-4 py-3 rounded-xl transition

//                   ${
//                     active
//                       ? "bg-white text-indigo-700"
//                       : "hover:bg-indigo-600"
//                   }
//                 `}
//               >
//                 <item.icon size={20} />

//                 {item.label}
//               </NavLink>
//             );
//           })}
//         </nav>

//         <div className="absolute bottom-5 w-full px-4">
//           <button
//             onClick={() => {
//               localStorage.clear();
//               navigate("/login", {
//                 replace: true,
//               });
//             }}
//             className="w-full bg-red-500 hover:bg-red-600 py-3 rounded-xl flex items-center justify-center gap-2"
//           >
//             <LogOut size={18} />

//             Logout
//           </button>
//         </div>
//       </aside>

//       {/* Main */}

//       <div className="flex-1">
//         <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6">
//           <button
//             className="lg:hidden"
//             onClick={() =>
//               setSidebarOpen(true)
//             }
//           >
//             <Menu />
//           </button>

//           <h1 className="text-2xl font-bold text-slate-700">
//             Cabin Management System
//           </h1>

//           <div className="text-slate-500 font-medium">
//             Employee
//           </div>
//         </header>

//         <main className="p-6">
//           <Outlet />
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
  X,
  ChevronRight,
  User
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
const userRole = user.role || "";

  return (
    <div className="min-h-screen bg-[#f8fafc] flex font-sans antialiased">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50 
          w-72 bg-white border-r border-slate-200/60 
          transition-transform duration-300 ease-in-out transform
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Logo Section - Aligned with Header Height */}
          <div className="h-20 flex items-center px-8 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20 flex-shrink-0">
                <Building2 className="text-white h-5 w-5" />
              </div>
              <span className="text-xl font-black tracking-tight text-slate-900">OCaBiN</span>
            </div>
          </div>

          {/* Navigation - With proper vertical padding */}
          <nav className="flex-1 overflow-y-auto py-8 px-4 space-y-1.5">
            {menuItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-200 group
                    ${active 
                      ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20" 
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}
                  `}
                >
                  <div className="flex items-center gap-4">
                    <item.icon size={20} className={active ? "text-emerald-400" : "group-hover:text-emerald-500"} />
                    <span className="font-bold text-sm leading-none">{item.label}</span>
                  </div>
                  {active && <ChevronRight size={14} className="text-slate-500" />}
                </NavLink>
              );
            })}
          </nav>

          {/* User & Logout Section */}
          <div className="p-4 mt-auto border-t border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-3 px-4 py-4 mb-2">
              <div className="h-10 w-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 shadow-sm flex-shrink-0">
                <User size={20} />
              </div>
              <div className="min-w-0">
  <p className="text-sm font-bold text-slate-900 truncate">
    {userName}
  </p>

  <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
    {userRole}
  </p>
</div>
            </div>
            
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-rose-500 font-bold text-sm hover:bg-rose-50 transition-colors"
            >
              <LogOut size={18} />
              <span>Logout Session</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header - Perfect horizontal and vertical alignment */}
        <header className="h-20 flex-shrink-0 bg-white border-b border-slate-200/60 flex items-center justify-between px-8 z-30">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-xl transition-colors" 
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            
            <div className="flex flex-col">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">
                Employee Portal
              </h2>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></span>
                <span className="text-sm font-black text-slate-800">System Live</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
             <div className="hidden sm:flex flex-col text-right mr-2">
                <span className="text-xs font-black text-slate-900 leading-none">OCaBiN v1.0</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Production</span>
             </div>
             <div className="h-10 w-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-sm border-2 border-white shadow-md">
                {userName.charAt(0).toUpperCase()}
             </div>
          </div>
        </header>

        {/* Page Content - Centered with max-width and internal padding */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-screen-2xl mx-auto p-6 lg:p-10">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}