import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  RefreshCcw,
  ArrowUpRight,
  MapPin,
  Calendar,
  Clock,
  Layout
} from "lucide-react";

import { getCabins, getMyBookings } from "../../services/api";
import { Cabin, Booking } from "../../types";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [cabins, setCabins] = useState<Cabin[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const [cabinRes, bookingRes] = await Promise.all([
        getCabins(),
        getMyBookings(),
      ]);
      setCabins(cabinRes.data.data);
      setBookings(bookingRes.data.data);
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? "Unable to load dashboard.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <div className="h-10 w-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-400 font-bold tracking-widest uppercase text-[10px]">Preparing your workspace...</p>
      </div>
    );
  }

  const availableCount = cabins.filter(c => c.active && c.status === "AVAILABLE").length;
  const pendingCount = bookings.filter(b => b.status === "PENDING").length;
  const approvedCount = bookings.filter(b => b.status === "APPROVED").length;

  const stats = [
    { label: "Available Now", val: availableCount, icon: Building2, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Total Bookings", val: bookings.length, icon: CalendarDays, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Pending Review", val: pendingCount, icon: Clock3, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Approved", val: approvedCount, icon: CheckCircle2, color: "text-indigo-600", bg: "bg-indigo-50" },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <p className="text-emerald-500 font-bold text-xs uppercase tracking-widest mb-2">Employee Portal</p>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Personal Dashboard</h1>
        </div>
        <button
          onClick={loadDashboard}
          className="flex items-center gap-2 px-6 py-3.5 bg-white border border-slate-200 rounded-2xl text-slate-600 font-bold text-sm hover:bg-slate-50 transition-all active:scale-95 shadow-sm"
        >
          <RefreshCcw size={18} />
          Refresh Data
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="premium-card p-6">
            <div className="flex justify-between items-start mb-4">
              <div className={`h-12 w-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                <stat.icon size={24} />
              </div>
              <ArrowUpRight className="text-slate-300" size={18} />
            </div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
            <h3 className="text-3xl font-black text-slate-900 mt-1">{stat.val}</h3>
          </div>
        ))}
      </div>

      {/* Available Cabins Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-xl font-black text-slate-900">Available Cabins</h2>
          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase">Instant Booking</span>
        </div>
        <div className="overflow-x-auto">
          <table className="modern-table">
            <thead>
              <tr>
                <th>Cabin Name</th>
                <th>Specifications</th>
                <th>Location</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {cabins.length === 0 ? (
                <tr><td colSpan={4} className="text-center py-10 text-slate-400 font-bold italic bg-white rounded-3xl">No cabins available</td></tr>
              ) : (
                cabins.slice(0, 5).map((cabin) => (
                  <tr key={cabin.id} className="group">
                    <td>
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-colors">
                          <Layout size={20} />
                        </div>
                        <span className="font-black text-slate-900">{cabin.cabinName}</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col gap-0.5">
                        <div className="text-xs font-bold text-slate-700">Capacity: {cabin.capacity}</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Floor {cabin.floor}</div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                        <MapPin size={12} className="text-slate-300" />
                        {cabin.location}
                      </div>
                    </td>
                    <td>
                      <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tight border ${
                        cabin.status === "AVAILABLE" ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-rose-50 text-rose-700 border-rose-100"
                      }`}>
                        {cabin.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* My Recent Bookings Table */}
      <div className="space-y-4">
        <h2 className="text-xl font-black text-slate-900 px-2">My Recent Bookings</h2>
        <div className="overflow-x-auto">
          <table className="modern-table">
            <thead>
              <tr>
                <th>Resource</th>
                <th>Scheduled For</th>
                <th>Meeting Purpose</th>
                <th className="text-right">Approval Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr><td colSpan={4} className="text-center py-10 text-slate-400 font-bold italic bg-white rounded-3xl">No bookings found</td></tr>
              ) : (
                bookings.slice(0, 5).map((booking) => (
                  <tr key={booking.id}>
                    <td>
                      <span className="font-black text-slate-900">{booking.cabinName}</span>
                    </td>
                    <td>
                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                          <Calendar size={12} className="text-slate-400" /> {booking.bookingDate}
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase">
                          <Clock size={10} /> {booking.startTime} - {booking.endTime}
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="text-xs font-medium text-slate-500 truncate max-w-[200px] italic">"{booking.purpose}"</p>
                    </td>
                    <td className="text-right">
                      <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tight border ${
                        booking.status === "APPROVED" ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                        booking.status === "PENDING" ? "bg-amber-50 text-amber-700 border-amber-100" :
                        "bg-rose-50 text-rose-700 border-rose-100"
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Summary Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 rounded-[32px] p-8 text-white shadow-xl shadow-slate-900/10">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Cabin Availability</p>
          <h4 className="text-4xl font-black mb-4">{availableCount}</h4>
          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 transition-all duration-1000" style={{ width: `${(availableCount/cabins.length)*100}%` }}></div>
          </div>
          <p className="text-[10px] font-bold text-slate-500 mt-3 uppercase tracking-tighter">Ready for immediate booking</p>
        </div>

        <div className="bg-emerald-500 rounded-[32px] p-8 text-white shadow-xl shadow-emerald-500/20">
          <p className="text-xs font-bold text-emerald-100 uppercase tracking-widest mb-1">Approval Rate</p>
          <h4 className="text-4xl font-black mb-4">
            {bookings.length > 0 ? Math.round((approvedCount / bookings.length) * 100) : 0}%
          </h4>
          <p className="text-[10px] font-bold text-emerald-100 mt-3 uppercase tracking-tighter opacity-80">Based on your recent requests</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-[32px] p-8 flex flex-col justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Bookings</p>
            <h4 className="text-4xl font-black text-slate-900">{bookings.length}</h4>
          </div>
          <button onClick={loadDashboard} className="w-full mt-4 py-3 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all">
            Reload Metrics
          </button>
        </div>
      </div>
    </div>
  );
}