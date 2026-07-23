// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import {
//   Building2,
//   CalendarDays,
//   CheckCircle2,
//   Clock3,
//   RefreshCcw,
// } from "lucide-react";

// import {
//   getDashboardStats,
//   getPendingBookings,
//   getCabins,
// } from "../../services/api";

// import { DashboardStats, Booking, Cabin } from "../../types";

// export default function Dashboard() {
//   const [loading, setLoading] = useState(true);

//   const [stats, setStats] = useState<DashboardStats>({
//     totalCabins: 0,
//     availableCabins: 0,
//     pendingBookings: 0,
//     approvedBookings: 0,
//     todayBookings: 0,
//   });

//   const [cabins, setCabins] = useState<Cabin[]>([]);
//   const [pendingBookings, setPendingBookings] = useState<Booking[]>([]);

//   const loadDashboard = async () => {
//     try {
//       setLoading(true);

//       const [dashboardRes, cabinRes, pendingRes] =
//         await Promise.all([
//           getDashboardStats(),
//           getCabins(),
//           getPendingBookings(),
//         ]);

//       setStats(dashboardRes.data.data);
//       setCabins(cabinRes.data.data);
//       setPendingBookings(pendingRes.data.data);
//     } catch (err: any) {
//       toast.error(
//         err?.response?.data?.message ??
//           "Unable to load dashboard."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadDashboard();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-[70vh]">
//         <div className="text-xl font-semibold text-slate-600">
//           Loading Dashboard...
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-8">

//       <div className="flex justify-between items-center">

//         <div>

//           <h1 className="text-3xl font-bold text-slate-800">
//             Dashboard
//           </h1>

//           <p className="text-slate-500 mt-1">
//             Welcome back, Administrator.
//           </p>

//         </div>

//         <button
//           onClick={loadDashboard}
//           className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl"
//         >
//           <RefreshCcw size={18} />
//           Refresh
//         </button>

//       </div>

//       {/* Dashboard Cards */}

//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5">

//         <div className="bg-white rounded-2xl shadow border border-slate-200 p-5">

//           <div className="flex justify-between">

//             <div>

//               <p className="text-slate-500 text-sm">
//                 Total Cabins
//               </p>

//               <h2 className="text-3xl font-bold mt-2">
//                 {stats.totalCabins}
//               </h2>

//             </div>

//             <Building2
//               size={34}
//               className="text-indigo-600"
//             />

//           </div>

//         </div>

//         <div className="bg-white rounded-2xl shadow border border-slate-200 p-5">

//           <div className="flex justify-between">

//             <div>

//               <p className="text-slate-500 text-sm">
//                 Available
//               </p>

//               <h2 className="text-3xl font-bold mt-2 text-green-600">
//                 {stats.availableCabins}
//               </h2>

//             </div>

//             <CheckCircle2
//               size={34}
//               className="text-green-600"
//             />

//           </div>

//         </div>
//                 <div className="bg-white rounded-2xl shadow border border-slate-200 p-5">

//           <div className="flex justify-between">

//             <div>

//               <p className="text-slate-500 text-sm">
//                 Pending Approvals
//               </p>

//               <h2 className="text-3xl font-bold mt-2 text-amber-600">
//                 {stats.pendingBookings}
//               </h2>

//             </div>

//             <Clock3
//               size={34}
//               className="text-amber-600"
//             />

//           </div>

//         </div>

//         <div className="bg-white rounded-2xl shadow border border-slate-200 p-5">

//           <div className="flex justify-between">

//             <div>

//               <p className="text-slate-500 text-sm">
//                 Approved
//               </p>

//               <h2 className="text-3xl font-bold mt-2 text-blue-600">
//                 {stats.approvedBookings}
//               </h2>

//             </div>

//             <CalendarDays
//               size={34}
//               className="text-blue-600"
//             />

//           </div>

//         </div>

//         <div className="bg-white rounded-2xl shadow border border-slate-200 p-5">

//           <div className="flex justify-between">

//             <div>

//               <p className="text-slate-500 text-sm">
//                 Today's Bookings
//               </p>

//               <h2 className="text-3xl font-bold mt-2 text-purple-600">
//                 {stats.todayBookings}
//               </h2>

//             </div>

//             <CalendarDays
//               size={34}
//               className="text-purple-600"
//             />

//           </div>

//         </div>

//       </div>

//       {/* Cabin Overview */}

//       <div className="bg-white rounded-2xl border border-slate-200 shadow">

//         <div className="p-6 border-b">

//           <h2 className="text-xl font-semibold">
//             Cabin Overview
//           </h2>

//         </div>

//         <div className="overflow-x-auto">

//           <table>

//             <thead>

//               <tr>

//                 <th>Cabin</th>

//                 <th>Floor</th>

//                 <th>Capacity</th>

//                 <th>Status</th>

//                 <th>Location</th>

//               </tr>

//             </thead>

//             <tbody>

//               {cabins.map((cabin) => (

//                 <tr key={cabin.id}>

//                   <td className="font-semibold">

//                     {cabin.cabinName}

//                   </td>

//                   <td>

//                     {cabin.floor}

//                   </td>

//                   <td>

//                     {cabin.capacity}

//                   </td>

//                   <td>

//                     <span
//                       className={`px-3 py-1 rounded-full text-xs font-semibold

//                       ${
//                         cabin.status === "AVAILABLE"
//                           ? "bg-green-100 text-green-700"
//                           : cabin.status === "OCCUPIED"
//                           ? "bg-red-100 text-red-700"
//                           : "bg-yellow-100 text-yellow-700"
//                       }
//                     `}
//                     >

//                       {cabin.status}

//                     </span>

//                   </td>

//                   <td>

//                     {cabin.location}

//                   </td>

//                 </tr>

//               ))}

//             </tbody>

//           </table>

//         </div>

//       </div>
//             {/* Pending Booking Requests */}

//       <div className="bg-white rounded-2xl border border-slate-200 shadow">

//         <div className="p-6 border-b flex justify-between items-center">

//           <div>

//             <h2 className="text-xl font-semibold">
//               Pending Booking Requests
//             </h2>

//             <p className="text-sm text-slate-500 mt-1">
//               Requests awaiting administrator approval.
//             </p>

//           </div>

//           <span className="bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-semibold">

//             {pendingBookings.length} Pending

//           </span>

//         </div>

//         <div className="overflow-x-auto">

//           <table>

//             <thead>

//               <tr>

//                 <th>Employee</th>

//                 <th>Cabin</th>

//                 <th>Date</th>

//                 <th>Time</th>

//                 <th>Purpose</th>

//                 <th>Status</th>

//               </tr>

//             </thead>

//             <tbody>

//               {pendingBookings.length === 0 ? (

//                 <tr>

//                   <td
//                     colSpan={6}
//                     className="text-center py-10 text-slate-500"
//                   >

//                     No Pending Booking Requests

//                   </td>

//                 </tr>

//               ) : (

//                 pendingBookings.map((booking) => (

//                   <tr key={booking.id}>

//                     <td className="font-medium">

//                       {booking.employeeName}

//                     </td>

//                     <td>

//                       {booking.cabinName}

//                     </td>

//                     <td>

//                       {booking.bookingDate}

//                     </td>

//                     <td>

//                       {booking.startTime}
//                       {" - "}
//                       {booking.endTime}

//                     </td>

//                     <td>

//                       {booking.purpose}

//                     </td>

//                     <td>

//                       <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">

//                         {booking.status}

//                       </span>

//                     </td>

//                   </tr>

//                 ))

//               )}

//             </tbody>

//           </table>

//         </div>

//       </div>
//           {/* Quick Summary */}

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

//         <div className="bg-indigo-600 rounded-2xl text-white p-6">

//           <h3 className="text-lg font-semibold">
//             Total Pending Requests
//           </h3>

//           <p className="text-5xl font-bold mt-4">
//             {pendingBookings.length}
//           </p>

//           <p className="mt-3 text-indigo-100">
//             Waiting for approval.
//           </p>

//         </div>

//         <div className="bg-green-600 rounded-2xl text-white p-6">

//           <h3 className="text-lg font-semibold">
//             Active Cabins
//           </h3>

//           <p className="text-5xl font-bold mt-4">
//             {
//               cabins.filter(
//                 (cabin) =>
//                   cabin.active &&
//                   cabin.status === "AVAILABLE"
//               ).length
//             }
//           </p>

//           <p className="mt-3 text-green-100">
//             Ready for booking.
//           </p>

//         </div>

//         <div className="bg-slate-800 rounded-2xl text-white p-6">

//           <h3 className="text-lg font-semibold">
//             Total Records
//           </h3>

//           <p className="text-5xl font-bold mt-4">
//             {cabins.length}
//           </p>

//           <p className="mt-3 text-slate-300">
//             Cabins in the system.
//           </p>

//         </div>

//       </div>

//     </div>
//   );
// }
// Inside Dashboard.tsx return...

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { 
  Building2, 
  CalendarDays, 
  CheckCircle2, 
  Clock3, 
  RefreshCcw, 
  TrendingUp, 
  Activity,
  ArrowUpRight,
  ChevronRight
} from "lucide-react";

import { getDashboardStats, getPendingBookings, getCabins } from "../../services/api";
import { DashboardStats, Booking, Cabin } from "../../types";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [cabins, setCabins] = useState<Cabin[]>([]);
  const [pending, setPending] = useState<Booking[]>([]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [s, c, p] = await Promise.all([
        getDashboardStats(),
        getCabins(),
        getPendingBookings()
      ]);
      setStats(s.data.data);
      setCabins(c.data.data);
      setPending(p.data.data);
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? "Unable to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    loadData(); 
  }, []);

  if (loading || !stats) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <div className="h-12 w-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-400 font-bold animate-pulse">Analyzing System Data...</p>
      </div>
    );
  }

  const cards = [
    { 
      label: "Active Cabins", 
      value: stats.availableCabins, 
      icon: Building2, 
      color: "text-emerald-600", 
      bg: "bg-emerald-50", 
      trend: `${stats.totalCabins} Total` 
    },
    { 
      label: "Pending Tasks", 
      value: stats.pendingBookings, 
      icon: Clock3, 
      color: "text-amber-600", 
      bg: "bg-amber-50", 
      trend: "Requires attention" 
    },
    { 
      label: "Approved Slots", 
      value: stats.approvedBookings, 
      icon: CheckCircle2, 
      color: "text-blue-600", 
      bg: "bg-blue-50", 
      trend: "Next 24 hours" 
    },
    { 
      label: "System Health", 
      value: "98%", 
      icon: Activity, 
      color: "text-purple-600", 
      bg: "bg-purple-50", 
      trend: "All systems go" 
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <p className="text-emerald-500 font-bold text-xs uppercase tracking-widest mb-2">Operational Intelligence</p>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Management Overview</h2>
        </div>
        <button 
          onClick={loadData} 
          className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-2xl text-slate-600 font-bold text-sm hover:bg-slate-50 transition-all active:scale-95 shadow-sm"
        >
          <RefreshCcw size={18} />
          Refresh Metrics
        </button>
      </div>

      {/* Stat Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <div key={i} className="premium-card p-6">
            <div className="flex justify-between items-start mb-4">
              {/* FIXED: Using card.bg and card.color here */}
              <div className={`h-12 w-12 rounded-2xl ${card.bg} ${card.color} flex items-center justify-center`}>
                <card.icon size={24} />
              </div>
              <ArrowUpRight className="text-slate-300" size={18} />
            </div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{card.label}</p>
            <h3 className="text-3xl font-black text-slate-900 mt-1">{card.value}</h3>
            <div className="mt-4 flex items-center gap-2">
              <TrendingUp size={14} className="text-emerald-500" />
              <span className="text-[10px] font-bold text-slate-400 uppercase">{card.trend}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cabin Table Area */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-lg font-black text-slate-900">Cabin Inventory</h3>
            <button className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors">View All Resources</button>
          </div>
          <div className="overflow-x-auto">
            <table className="modern-table">
              <thead>
                <tr>
                  <th>Resource Name</th>
                  <th>Location</th>
                  <th>Capacity</th>
                  <th>Current Status</th>
                </tr>
              </thead>
              <tbody>
                {cabins.slice(0, 6).map(c => (
                  <tr key={c.id}>
                    <td>
                      <div className="font-bold text-slate-900">{c.cabinName}</div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-tighter">ID: CMS-00{c.id}</div>
                    </td>
                    <td>
                      <span className="font-bold text-slate-600 text-xs uppercase tracking-wide">Floor {c.floor}</span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-slate-300"></span>
                        <span className="text-xs font-bold text-slate-700">{c.capacity} PAX</span>
                      </div>
                    </td>
                    <td>
                      <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tight border ${
                        c.status === 'AVAILABLE' 
                          ? 'text-emerald-600 bg-emerald-50 border-emerald-100' 
                          : 'text-amber-600 bg-amber-50 border-amber-100'
                      }`}>
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pending Requests Sidebar */}
        <div className="space-y-4">
          <h3 className="text-lg font-black text-slate-900 px-2">Pending Actions</h3>
          <div className="space-y-3">
            {pending.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-[32px] border border-dashed border-slate-200 flex flex-col items-center justify-center">
                <div className="h-12 w-12 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mb-3">
                  <CheckCircle2 size={24} />
                </div>
                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest leading-relaxed">
                  Clear Workspace<br />No Pending Tasks
                </p>
              </div>
            ) : (
              pending.slice(0, 4).map(p => (
                <div key={p.id} className="p-4 bg-white border border-slate-200 rounded-[24px] flex items-center gap-4 hover:border-emerald-200 transition-colors group">
                  <div className="h-11 w-11 rounded-2xl bg-slate-900 text-emerald-400 flex items-center justify-center font-black text-sm shadow-lg shadow-slate-900/10 uppercase">
                    {p.employeeName.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-black text-slate-900 truncate">{p.employeeName}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter mt-0.5">
                      {p.cabinName} • {p.bookingDate}
                    </p>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-all">
                    <ChevronRight size={16} />
                  </div>
                </div>
              ))
            )}
          </div>
          
          {/* Decorative Card */}
          <div className="mt-6 p-6 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-[32px] text-white shadow-xl shadow-emerald-500/20">
            <h4 className="font-black text-sm uppercase tracking-widest mb-1">Weekly Report</h4>
            <p className="text-xs text-emerald-50 font-medium leading-relaxed opacity-80">System usage is up 12% from last week.</p>
            <button className="mt-4 w-full py-3 bg-white/20 backdrop-blur-md rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-white/30 transition-all">
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}