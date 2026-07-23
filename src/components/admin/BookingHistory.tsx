// import { useEffect, useMemo, useState } from "react";
// import toast from "react-hot-toast";
// import { Search, RefreshCcw } from "lucide-react";

// import { getAllBookings } from "../../services/api";
// import { Booking } from "../../types";

// export default function BookingHistory() {

//     const [loading, setLoading] = useState(true);

//     const [bookings, setBookings] = useState<Booking[]>([]);

//     const [search, setSearch] = useState("");

//     const loadBookings = async () => {

//         try {

//             setLoading(true);

//             const response = await getAllBookings();

//             setBookings(response.data.data);

//         } catch (err: any) {

//             toast.error(
//                 err?.response?.data?.message ??
//                 "Unable to load booking history."
//             );

//         } finally {

//             setLoading(false);

//         }

//     };

//     useEffect(() => {

//         loadBookings();

//     }, []);

//     const filteredBookings = useMemo(() => {

//         if (!search.trim()) return bookings;

//         const value = search.toLowerCase();

//         return bookings.filter((booking) =>
//             booking.employeeName.toLowerCase().includes(value) ||
//             booking.cabinName.toLowerCase().includes(value) ||
//             booking.purpose.toLowerCase().includes(value) ||
//             booking.status.toLowerCase().includes(value)
//         );

//     }, [search, bookings]);

//     const getStatusClass = (status: string) => {

//         switch (status) {

//             case "APPROVED":
//                 return "bg-green-100 text-green-700";

//             case "REJECTED":
//                 return "bg-red-100 text-red-700";

//             case "PENDING":
//                 return "bg-yellow-100 text-yellow-700";

//             case "CANCELLED":
//                 return "bg-slate-200 text-slate-700";

//             default:
//                 return "bg-slate-100 text-slate-700";
//         }

//     };

//     if (loading) {

//         return (

//             <div className="flex justify-center items-center h-[60vh]">

//                 <div className="text-xl font-semibold text-slate-500">

//                     Loading Booking History...

//                 </div>

//             </div>

//         );

//     }

//     return (

//         <div className="bg-white rounded-2xl border border-slate-200 shadow">

//             <div className="p-6 border-b flex justify-between items-center">

//                 <div>

//                     <h1 className="text-2xl font-bold">

//                         Booking History

//                     </h1>

//                     <p className="text-slate-500 mt-1">

//                         View all booking records.

//                     </p>

//                 </div>

//                 <button
//                     onClick={loadBookings}
//                     className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl"
//                 >

//                     <RefreshCcw size={18} />

//                     Refresh

//                 </button>

//             </div>

//             <div className="p-6">

//                 <div className="relative max-w-md">

//                     <Search
//                         size={18}
//                         className="absolute left-3 top-3.5 text-slate-400"
//                     />

//                     <input
//                         type="text"
//                         placeholder="Search bookings..."
//                         value={search}
//                         onChange={(e) =>
//                             setSearch(e.target.value)
//                         }
//                         className="w-full border border-slate-300 rounded-xl pl-10 pr-4 py-3"
//                     />

//                 </div>

//             </div>

//             <div className="overflow-x-auto">

//                 <table>

//                     <thead>

//                         <tr>

//                             <th>Employee</th>

//                             <th>Cabin</th>

//                             <th>Date</th>

//                             <th>Time</th>

//                             <th>Purpose</th>

//                             <th>Status</th>

//                         </tr>

//                     </thead>

//                     <tbody>
//                                                 {filteredBookings.length === 0 ? (

//                             <tr>

//                                 <td
//                                     colSpan={6}
//                                     className="text-center py-12 text-slate-500"
//                                 >

//                                     No Booking Records Found

//                                 </td>

//                             </tr>

//                         ) : (

//                             filteredBookings.map((booking) => (

//                                 <tr key={booking.id}>

//                                     <td className="font-semibold">

//                                         {booking.employeeName}

//                                     </td>

//                                     <td>

//                                         {booking.cabinName}

//                                     </td>

//                                     <td>

//                                         {booking.bookingDate}

//                                     </td>

//                                     <td>

//                                         {booking.startTime}
//                                         {" - "}
//                                         {booking.endTime}

//                                     </td>

//                                     <td>

//                                         {booking.purpose}

//                                     </td>

//                                     <td>

//                                         <span
//                                             className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(
//                                                 booking.status
//                                             )}`}
//                                         >

//                                             {booking.status}

//                                         </span>

//                                     </td>

//                                 </tr>

//                             ))

//                         )}

//                     </tbody>

//                 </table>

//             </div>
//                         <div className="border-t border-slate-200 px-6 py-4 flex justify-between items-center">

//                 <div className="text-sm text-slate-500">

//                     Total Records :
//                     <span className="font-semibold ml-2">

//                         {filteredBookings.length}

//                     </span>

//                 </div>

//                 <button
//                     onClick={loadBookings}
//                     className="bg-slate-800 hover:bg-slate-900 text-white px-5 py-2 rounded-lg transition"
//                 >

//                     Reload

//                 </button>

//             </div>

//         </div>

//     );

// }
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { 
  Search, 
  RefreshCcw, 
  History, 
  Calendar, 
  Clock, 
  Building2, 
  User, 
  Filter,
  ArrowRight
} from "lucide-react";

import { getAllBookings } from "../../services/api";
import { Booking } from "../../types";

export default function BookingHistory() {
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [search, setSearch] = useState("");

  const loadBookings = async () => {
    try {
      setLoading(true);
      const response = await getAllBookings();
      setBookings(response.data.data);
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? "Unable to load history.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const filteredBookings = useMemo(() => {
    if (!search.trim()) return bookings;
    const value = search.toLowerCase();
    return bookings.filter((booking) =>
      booking.employeeName.toLowerCase().includes(value) ||
      booking.cabinName.toLowerCase().includes(value) ||
      booking.purpose.toLowerCase().includes(value) ||
      booking.status.toLowerCase().includes(value)
    );
  }, [search, bookings]);

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "REJECTED":
        return "bg-rose-50 text-rose-700 border-rose-100";
      case "PENDING":
        return "bg-amber-50 text-amber-700 border-amber-100";
      case "CANCELLED":
        return "bg-slate-100 text-slate-500 border-slate-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-100";
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <div className="h-10 w-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-400 font-bold tracking-widest uppercase text-[10px]">Accessing Archives...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header & Search */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div>
          <p className="text-indigo-500 font-bold text-xs uppercase tracking-widest mb-2">Audit Logs</p>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Booking History</h1>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
          <div className="relative w-full sm:w-80 group">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
            <input
              type="text"
              placeholder="Search by staff, cabin, or status..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-3.5 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm"
            />
          </div>
          <button
            onClick={loadBookings}
            className="flex items-center gap-2 px-6 py-3.5 bg-white border border-slate-200 rounded-2xl text-slate-600 font-bold text-sm hover:bg-slate-50 transition-all active:scale-95 shadow-sm whitespace-nowrap"
          >
            <RefreshCcw size={18} />
            Reload
          </button>
        </div>
      </div>

      {/* Table Area */}
      <div className="overflow-x-auto pb-4">
        <table className="modern-table">
          <thead>
            <tr>
              <th>Employee Info</th>
              <th>Cabin / Resource</th>
              <th>Schedule</th>
              <th>Purpose</th>
              <th className="text-right">Final Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-24 bg-white rounded-[32px] border border-dashed border-slate-200">
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="h-14 w-14 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center">
                      <History size={28} />
                    </div>
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No records matching your search</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredBookings.map((booking) => (
                <tr key={booking.id} className="group">
                  <td>
                    <div className="flex items-center gap-4">
                      <div className="h-11 w-11 rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center font-black text-sm uppercase group-hover:bg-slate-900 group-hover:text-emerald-400 transition-all">
                        {booking.employeeName.charAt(0)}
                      </div>
                      <div>
                        <div className="font-black text-slate-900">{booking.employeeName}</div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">ID: EMP-0{booking.id}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2.5 font-bold text-slate-700 text-xs">
                      <Building2 size={14} className="text-slate-300" />
                      {booking.cabinName}
                    </div>
                  </td>
                  <td>
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                        <Calendar size={12} className="text-slate-400" /> {booking.bookingDate}
                      </div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tight ml-4">
                         {booking.startTime} - {booking.endTime}
                      </div>
                    </div>
                  </td>
                  <td className="max-w-[220px]">
                    <p className="text-xs font-medium text-slate-500 truncate" title={booking.purpose}>
                      {booking.purpose}
                    </p>
                  </td>
                  <td className="text-right">
                    <span className={`inline-block text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tight border ${getStatusStyles(booking.status)}`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Stats Widget */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 rounded-[32px] p-6 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
              <History size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Logs</p>
              <h4 className="text-2xl font-black text-slate-900">{filteredBookings.length}</h4>
            </div>
          </div>
          <ArrowRight className="text-slate-200" size={20} />
        </div>

        <div className="bg-emerald-500 rounded-[32px] p-6 text-white shadow-xl shadow-emerald-500/20 flex flex-col justify-between min-h-[140px]">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-white/20 rounded-xl">
              <Filter size={18} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest bg-emerald-600 px-2 py-1 rounded-lg">Active Filter</span>
          </div>
          <div>
            <h4 className="text-lg font-black">Filtered View</h4>
            <p className="text-xs text-emerald-100 font-medium">Showing results for "{search || 'All Records'}"</p>
          </div>
        </div>

        <div className="bg-slate-900 rounded-[32px] p-6 text-white flex items-center gap-4 shadow-xl shadow-slate-900/10">
          <div className="h-12 w-12 bg-white/10 text-emerald-400 rounded-2xl flex items-center justify-center font-black">
            %
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Completion Rate</p>
            <h4 className="text-2xl font-black">94.2%</h4>
            <p className="text-[9px] font-bold text-emerald-400 uppercase mt-0.5">+2.1% from last month</p>
          </div>
        </div>
      </div>
    </div>
  );
}