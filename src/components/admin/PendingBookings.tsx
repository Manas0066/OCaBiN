// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import {
//   Check,
//   X,
//   RefreshCcw,
// } from "lucide-react";

// import {
//   getPendingBookings,
//   approveBooking,
//   rejectBooking,
// } from "../../services/api";

// import { Booking } from "../../types";

// export default function PendingBookings() {

//   const [loading, setLoading] = useState(true);

//   const [bookings, setBookings] = useState<Booking[]>([]);

//   const loadBookings = async () => {

//     try {

//       setLoading(true);

//       const response =
//         await getPendingBookings();

//       setBookings(response.data.data);

//     } catch (err: any) {

//       toast.error(
//         err?.response?.data?.message ??
//         "Unable to load pending bookings."
//       );

//     } finally {

//       setLoading(false);

//     }

//   };

//   useEffect(() => {

//     loadBookings();

//   }, []);

//   const handleApprove = async (
//     bookingId: number
//   ) => {

//     try {

//       await approveBooking(bookingId);

//       toast.success(
//         "Booking Approved"
//       );

//       loadBookings();

//     } catch (err: any) {

//       toast.error(
//         err?.response?.data?.message ??
//         "Unable to approve booking."
//       );

//     }

//   };

//   const handleReject = async (
//     bookingId: number
//   ) => {

//     try {

//       await rejectBooking(bookingId);

//       toast.success(
//         "Booking Rejected"
//       );

//       loadBookings();

//     } catch (err: any) {

//       toast.error(
//         err?.response?.data?.message ??
//         "Unable to reject booking."
//       );

//     }

//   };

//   if (loading) {

//     return (

//       <div className="flex justify-center items-center h-[60vh]">

//         <div className="text-lg font-semibold text-slate-500">

//           Loading Pending Bookings...

//         </div>

//       </div>

//     );

//   }

//   return (

//     <div className="bg-white rounded-2xl shadow border border-slate-200">

//       <div className="p-6 border-b flex justify-between items-center">

//         <div>

//           <h1 className="text-2xl font-bold">

//             Pending Booking Requests

//           </h1>

//           <p className="text-slate-500 mt-1">

//             Approve or reject booking requests.

//           </p>

//         </div>

//         <button
//           onClick={loadBookings}
//           className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl"
//         >

//           <RefreshCcw size={18} />

//           Refresh

//         </button>

//       </div>

//       <div className="overflow-x-auto">

//         <table>

//           <thead>

//             <tr>

//               <th>Employee</th>

//               <th>Cabin</th>

//               <th>Date</th>

//               <th>Time</th>

//               <th>Purpose</th>

//               <th>Status</th>

//               <th>Actions</th>

//             </tr>

//           </thead>

//           <tbody>
//                       {bookings.length === 0 ? (

//             <tr>

//               <td
//                 colSpan={7}
//                 className="text-center py-12 text-slate-500"
//               >

//                 No Pending Booking Requests

//               </td>

//             </tr>

//           ) : (

//             bookings.map((booking) => (

//               <tr key={booking.id}>

//                 <td className="font-semibold">

//                   {booking.employeeName}

//                 </td>

//                 <td>

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

//                   <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-semibold">

//                     {booking.status}

//                   </span>

//                 </td>

//                 <td>

//                   <div className="flex gap-2">

//                     <button
//                       onClick={() =>
//                         handleApprove(booking.id)
//                       }
//                       className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg"
//                     >

//                       <Check size={16} />

//                       Approve

//                     </button>

//                     <button
//                       onClick={() =>
//                         handleReject(booking.id)
//                       }
//                       className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg"
//                     >

//                       <X size={16} />

//                       Reject

//                     </button>

//                   </div>

//                 </td>

//               </tr>

//             ))

//           )}

//           </tbody>

//         </table>

//       </div>
//             <div className="border-t border-slate-200 px-6 py-4 flex justify-between items-center">

//         <p className="text-sm text-slate-500">

//           Total Pending Requests :
//           <span className="font-semibold ml-2">

//             {bookings.length}

//           </span>

//         </p>

//         <button
//           onClick={loadBookings}
//           className="bg-slate-800 hover:bg-slate-900 text-white px-5 py-2 rounded-lg"
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
  Check,
  X,
  RefreshCcw,
  Calendar,
  Clock,
  User,
  MapPin,
  MessageSquare,
  AlertCircle
} from "lucide-react";

import {
  getPendingBookings,
  approveBooking,
  rejectBooking,
} from "../../services/api";

import { Booking } from "../../types";

export default function PendingBookings() {
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);

  const loadBookings = async () => {
    try {
      setLoading(true);
      const response = await getPendingBookings();
      setBookings(response.data.data);
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? "Unable to load requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleApprove = async (bookingId: number) => {
    try {
      await approveBooking(bookingId);
      toast.success("Booking Approved Successfully");
      loadBookings();
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? "Approval failed.");
    }
  };

  const handleReject = async (bookingId: number) => {
    try {
      await rejectBooking(bookingId);
      toast.success("Booking Request Rejected");
      loadBookings();
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? "Rejection failed.");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <div className="h-10 w-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-400 font-bold tracking-widest uppercase text-[10px]">Fetching Requests...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <p className="text-amber-500 font-bold text-xs uppercase tracking-widest mb-2">Action Required</p>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Booking Requests</h1>
        </div>
        <button
          onClick={loadBookings}
          className="flex items-center gap-2 px-6 py-3.5 bg-white border border-slate-200 rounded-2xl text-slate-600 font-bold text-sm hover:bg-slate-50 transition-all active:scale-95 shadow-sm"
        >
          <RefreshCcw size={18} />
          Refresh Queue
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto pb-4">
        <table className="modern-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Resource / Zone</th>
              <th>Schedule</th>
              <th>Purpose</th>
              <th className="text-right">Decisions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-24 bg-white rounded-[32px] border border-dashed border-slate-200">
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="h-14 w-14 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center">
                      <AlertCircle size={28} />
                    </div>
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No pending requests at this time</p>
                  </div>
                </td>
              </tr>
            ) : (
              bookings.map((booking) => (
                <tr key={booking.id} className="group">
                  <td>
                    <div className="flex items-center gap-4">
                      <div className="h-11 w-11 rounded-2xl bg-slate-900 text-emerald-400 flex items-center justify-center font-black text-sm shadow-lg shadow-slate-900/10 uppercase">
                        {booking.employeeName.charAt(0)}
                      </div>
                      <div>
                        <div className="font-black text-slate-900">{booking.employeeName}</div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Corporate Staff</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                        <MapPin size={12} className="text-emerald-500" /> {booking.cabinName}
                      </div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Priority Zone</div>
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
                    <div className="max-w-[200px] bg-slate-50 border border-slate-100 p-2.5 rounded-xl">
                      <div className="flex items-start gap-2">
                        <MessageSquare size={12} className="text-slate-300 mt-0.5" />
                        <p className="text-[11px] font-medium text-slate-600 leading-relaxed italic line-clamp-2">
                          "{booking.purpose}"
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleApprove(booking.id)}
                        className="h-10 w-10 flex items-center justify-center bg-emerald-500 text-white rounded-xl shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-all active:scale-90"
                        title="Approve Request"
                      >
                        <Check size={18} />
                      </button>
                      <button
                        onClick={() => handleReject(booking.id)}
                        className="h-10 w-10 flex items-center justify-center bg-white border border-rose-100 text-rose-500 rounded-xl hover:bg-rose-50 transition-all active:scale-90"
                        title="Reject Request"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Summary Widget */}
      {bookings.length > 0 && (
        <div className="p-6 bg-slate-900 rounded-[32px] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-slate-900/10">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center">
              <User size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Queue Status</p>
              <h4 className="text-xl font-black">{bookings.length} Requests Awaiting</h4>
            </div>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <div className="px-6 py-2 border border-white/10 rounded-2xl text-center flex-1 md:flex-none">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Avg Wait</p>
              <p className="text-lg font-black italic">~12m</p>
            </div>
            <button 
              onClick={loadBookings}
              className="px-8 py-3 bg-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-400 transition-all"
            >
              Process All
            </button>
          </div>
        </div>
      )}
    </div>
  );
}