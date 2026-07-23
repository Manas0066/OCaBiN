// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import {
//   RefreshCcw,
//   Trash2,
// } from "lucide-react";

// import {
//   getMyBookings,
//   cancelBooking,
// } from "../../services/api";

// import { Booking } from "../../types";

// export default function MyBookings() {

//   const [loading, setLoading] =
//     useState(true);

//   const [bookings, setBookings] =
//     useState<Booking[]>([]);

//   const loadBookings = async () => {

//     try {

//       setLoading(true);

//       const response =
//         await getMyBookings();

//       setBookings(response.data.data);

//     } catch (err: any) {

//       toast.error(
//         err?.response?.data?.message ??
//         "Unable to load bookings."
//       );

//     } finally {

//       setLoading(false);

//     }

//   };

//   useEffect(() => {

//     loadBookings();

//   }, []);

//   const handleCancel = async (
//     bookingId: number
//   ) => {

//     if (
//       !window.confirm(
//         "Cancel this booking?"
//       )
//     ) {
//       return;
//     }

//     try {

//       await cancelBooking(
//         bookingId
//       );

//       toast.success(
//         "Booking Cancelled"
//       );

//       loadBookings();

//     } catch (err: any) {

//       toast.error(
//         err?.response?.data?.message ??
//         "Unable to cancel booking."
//       );

//     }

//   };

//   const getBadge = (
//     status: string
//   ) => {

//     switch (status) {

//       case "APPROVED":
//         return "bg-green-100 text-green-700";

//       case "PENDING":
//         return "bg-yellow-100 text-yellow-700";

//       case "REJECTED":
//         return "bg-red-100 text-red-700";

//       case "CANCELLED":
//         return "bg-slate-200 text-slate-700";

//       default:
//         return "bg-slate-100 text-slate-700";

//     }

//   };

//   if (loading) {

//     return (

//       <div className="flex justify-center items-center h-[60vh]">

//         <div className="text-lg font-semibold text-slate-500">

//           Loading Bookings...

//         </div>

//       </div>

//     );

//   }

//   return (

//     <div className="bg-white rounded-2xl shadow border border-slate-200">

//       <div className="p-6 border-b flex justify-between items-center">

//         <div>

//           <h1 className="text-2xl font-bold">

//             My Bookings

//           </h1>

//           <p className="text-slate-500 mt-1">

//             View and manage your bookings.

//           </p>

//         </div>

//         <button
//           onClick={loadBookings}
//           className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl flex items-center gap-2"
//         >

//           <RefreshCcw size={18} />

//           Refresh

//         </button>

//       </div>

//       <div className="overflow-x-auto">

//         <table>

//           <thead>

//             <tr>

//               <th>Cabin</th>

//               <th>Date</th>

//               <th>Time</th>

//               <th>Purpose</th>

//               <th>Status</th>

//               <th>Action</th>

//             </tr>

//           </thead>

//           <tbody>
//                       {bookings.length === 0 ? (

//             <tr>

//               <td
//                 colSpan={6}
//                 className="text-center py-12 text-slate-500"
//               >

//                 You don't have any bookings.

//               </td>

//             </tr>

//           ) : (

//             bookings.map((booking) => (

//               <tr key={booking.id}>

//                 <td className="font-semibold">

//                   {booking.cabinName}

//                 </td>

//                 <td>

//                   {booking.bookingDate}

//                 </td>

//                 <td>

//                   {booking.startTime}
//                   {" - "}
//                   {booking.endTime}

//                 </td>

//                 <td>

//                   {booking.purpose}

//                 </td>

//                 <td>

//                   <span
//                     className={`px-3 py-1 rounded-full text-xs font-semibold ${getBadge(
//                       booking.status
//                     )}`}
//                   >

//                     {booking.status}

//                   </span>

//                 </td>

//                 <td>

//                   {booking.status === "PENDING" ? (

//                     <button
//                       onClick={() =>
//                         handleCancel(booking.id)
//                       }
//                       className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
//                     >

//                       <Trash2 size={16} />

//                       Cancel

//                     </button>

//                   ) : (

//                     <span className="text-slate-400 text-sm">

//                       —

//                     </span>

//                   )}

//                 </td>

//               </tr>

//             ))

//           )}

//           </tbody>

//         </table>

//       </div>
//             <div className="border-t border-slate-200 px-6 py-4 flex justify-between items-center">

//         <div className="text-sm text-slate-500">

//           Total Bookings :
//           <span className="font-semibold ml-2">

//             {bookings.length}

//           </span>

//         </div>

//         <button
//           onClick={loadBookings}
//           className="bg-slate-800 hover:bg-slate-900 text-white px-5 py-2 rounded-lg transition"
//         >

//           Reload

//         </button>

//       </div>

//     </div>

//   );

// }
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  RefreshCcw,
  Trash2,
  Calendar,
  Clock,
  MapPin,
  CalendarCheck,
  AlertCircle,
  ChevronRight
} from "lucide-react";

import { getMyBookings, cancelBooking } from "../../services/api";
import { Booking } from "../../types";

export default function MyBookings() {
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);

  const loadBookings = async () => {
    try {
      setLoading(true);
      const response = await getMyBookings();
      setBookings(response.data.data);
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? "Unable to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleCancel = async (bookingId: number) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      await cancelBooking(bookingId);
      toast.success("Booking Cancelled");
      loadBookings();
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? "Unable to cancel booking.");
    }
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "PENDING":
        return "bg-amber-50 text-amber-700 border-amber-100";
      case "REJECTED":
        return "bg-rose-50 text-rose-700 border-rose-100";
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
        <p className="text-slate-400 font-bold tracking-widest uppercase text-[10px]">Syncing your schedule...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <p className="text-emerald-500 font-bold text-xs uppercase tracking-widest mb-2">Reservations</p>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">My Bookings</h1>
        </div>
        <button
          onClick={loadBookings}
          className="flex items-center gap-2 px-6 py-3.5 bg-white border border-slate-200 rounded-2xl text-slate-600 font-bold text-sm hover:bg-slate-50 transition-all active:scale-95 shadow-sm"
        >
          <RefreshCcw size={18} />
          Update List
        </button>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto pb-4">
        <table className="modern-table">
          <thead>
            <tr>
              <th>Cabin / Resource</th>
              <th>Schedule</th>
              <th>Purpose</th>
              <th>Current Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-24 bg-white rounded-[32px] border border-dashed border-slate-200">
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="h-14 w-14 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center">
                      <CalendarCheck size={28} />
                    </div>
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">You have no active bookings</p>
                  </div>
                </td>
              </tr>
            ) : (
              bookings.map((booking) => (
                <tr key={booking.id} className="group">
                  <td>
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-colors">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <div className="font-black text-slate-900">{booking.cabinName}</div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter mt-0.5">Corporate Cabin</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                        <Calendar size={12} className="text-slate-400" /> {booking.bookingDate}
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                        <Clock size={10} /> {booking.startTime} - {booking.endTime}
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="text-xs font-medium text-slate-500 max-w-[200px] truncate italic" title={booking.purpose}>
                      "{booking.purpose}"
                    </p>
                  </td>
                  <td>
                    <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tight border ${getStatusStyles(booking.status)}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="text-right">
                    {booking.status === "PENDING" ? (
                      <button
                        onClick={() => handleCancel(booking.id)}
                        className="inline-flex items-center gap-2 bg-white border border-rose-100 text-rose-500 px-4 py-2 rounded-xl font-bold text-xs hover:bg-rose-50 transition-all active:scale-95"
                      >
                        <Trash2 size={14} />
                        Cancel
                      </button>
                    ) : (
                      <div className="flex justify-end pr-4 text-slate-200">
                        <ChevronRight size={18} />
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Summary Widget */}
      {bookings.length > 0 && (
        <div className="p-8 bg-slate-900 rounded-[32px] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-slate-900/10">
          <div className="flex items-center gap-5">
            <div className="h-14 w-14 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <CalendarCheck size={28} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Schedule Summary</p>
              <h4 className="text-2xl font-black">{bookings.length} Total Reservations</h4>
            </div>
          </div>
          
          <div className="flex gap-4 w-full md:w-auto">
             <div className="px-6 py-3 bg-white/5 rounded-2xl border border-white/10 flex flex-col items-center justify-center min-w-[120px]">
                <p className="text-[10px] font-bold text-slate-500 uppercase">Confirmed</p>
                <p className="text-xl font-black text-emerald-400">
                  {bookings.filter(b => b.status === "APPROVED").length}
                </p>
             </div>
             <div className="px-6 py-3 bg-white/5 rounded-2xl border border-white/10 flex flex-col items-center justify-center min-w-[120px]">
                <p className="text-[10px] font-bold text-slate-500 uppercase">Awaiting</p>
                <p className="text-xl font-black text-amber-400">
                  {bookings.filter(b => b.status === "PENDING").length}
                </p>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}