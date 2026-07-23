import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { Building, ClipboardList, CheckCircle2, AlertCircle, Sparkles, Clock, XCircle } from 'lucide-react';
import { DashboardStats, Booking } from '../types';

interface DashboardSummaryProps {
  stats: DashboardStats;
  recentBookings: Booking[];
  todayBookings: Booking[];
  onActionRefresh?: () => void;
  userRole: 'ADMIN' | 'MANAGER' | 'EMPLOYEE';
}

export default function DashboardSummary({
  stats,
  recentBookings,
  todayBookings,
  userRole,
}: DashboardSummaryProps) {
  // Data for Booking Status Pie Chart
  const bookingData = [
    { name: 'Pending', value: stats.pendingBookings, color: '#f59e0b' },
    { name: 'Approved', value: stats.approvedBookings, color: '#10b981' },
    { name: 'Rejected', value: stats.rejectedBookings, color: '#f43f5e' },
  ].filter(item => item.value > 0);

  // Fallback if no bookings exist
  const finalBookingData = bookingData.length > 0 ? bookingData : [
    { name: 'No Bookings', value: 1, color: '#94a3b8' }
  ];

  // Data for Cabins Utilization Bar Chart
  const cabinData = [
    { name: 'Available', count: stats.availableCabins, color: '#10b981' },
    { name: 'Inactive/Disabled', count: stats.inactiveCabins, color: '#64748b' },
    { name: 'Total', count: stats.totalCabins, color: '#3b82f6' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Dynamic Headline banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 p-6 sm:p-8 text-white shadow-lg">
        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="absolute left-1/3 bottom-0 h-32 w-32 rounded-full bg-teal-500/10 blur-2xl" />
        <div className="relative z-10 max-w-lg">
          <div className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/20 text-xs font-semibold mb-3">
            <Sparkles className="h-3 w-3" />
            <span>OCaBiN Analytics Dashboard</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">
            Manage meetings, book cabins, foster collaboration.
          </h2>
          <p className="mt-2 text-sm text-slate-300 leading-relaxed">
            Role Authorized: <span className="font-mono text-emerald-300 font-bold uppercase tracking-wider">{userRole}</span>. View room schedules, approve pending bookings, or find active cabins instantly.
          </p>
        </div>
      </div>

      {/* Grid of Key Stats Indicators */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 shadow-sm hover:shadow-md transition-all flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
              Active Cabins
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1 block">
              {stats.availableCabins}
            </span>
            <span className="text-[10px] text-emerald-500 font-semibold mt-1 block">
              out of {stats.totalCabins} total
            </span>
          </div>
          <div className="h-10 sm:h-12 w-10 sm:w-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-500 dark:text-emerald-400 flex items-center justify-center">
            <Building className="h-5 sm:h-6 w-5 sm:w-6" />
          </div>
        </div>

        {/* Card 2 */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 shadow-sm hover:shadow-md transition-all flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
              Pending Approvals
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1 block">
              {stats.pendingBookings}
            </span>
            <span className="text-[10px] text-amber-500 font-semibold mt-1 block">
              Action Required
            </span>
          </div>
          <div className="h-10 sm:h-12 w-10 sm:w-12 rounded-xl bg-amber-50 dark:bg-amber-950/30 text-amber-500 dark:text-amber-400 flex items-center justify-center">
            <Clock className="h-5 sm:h-6 w-5 sm:w-6" />
          </div>
        </div>

        {/* Card 3 */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 shadow-sm hover:shadow-md transition-all flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
              Approved Slots
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1 block">
              {stats.approvedBookings}
            </span>
            <span className="text-[10px] text-emerald-500 font-semibold mt-1 block">
              Ready for Use
            </span>
          </div>
          <div className="h-10 sm:h-12 w-10 sm:w-12 rounded-xl bg-teal-50 dark:bg-teal-950/30 text-teal-500 dark:text-teal-400 flex items-center justify-center">
            <CheckCircle2 className="h-5 sm:h-6 w-5 sm:w-6" />
          </div>
        </div>

        {/* Card 4 */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 shadow-sm hover:shadow-md transition-all flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
              Rejected Bookings
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1 block">
              {stats.rejectedBookings}
            </span>
            <span className="text-[10px] text-rose-500 font-semibold mt-1 block">
              Declined Requests
            </span>
          </div>
          <div className="h-10 sm:h-12 w-10 sm:w-12 rounded-xl bg-rose-50 dark:bg-rose-950/30 text-rose-500 dark:text-rose-400 flex items-center justify-center">
            <XCircle className="h-5 sm:h-6 w-5 sm:w-6" />
          </div>
        </div>
      </div>

      {/* Visual Analytics Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Cabins Status Bar Chart */}
        <div className="md:col-span-7 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 shadow-sm flex flex-col">
          <h3 className="font-display font-bold text-slate-900 dark:text-white text-sm mb-4">
            Cabins Status Breakdown
          </h3>
          <div className="h-60 w-full flex-grow">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cabinData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{ fill: 'rgba(148, 163, 184, 0.1)' }}
                  contentStyle={{ 
                    borderRadius: '8px', 
                    border: 'none', 
                    fontSize: '11px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    color: '#fff'
                  }} 
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {cabinData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bookings Status Pie Chart */}
        <div className="md:col-span-5 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 shadow-sm flex flex-col">
          <h3 className="font-display font-bold text-slate-900 dark:text-white text-sm mb-4">
            Booking Requests Status
          </h3>
          <div className="h-44 w-full relative flex-grow flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={finalBookingData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {finalBookingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: '8px',
                    border: 'none',
                    fontSize: '11px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    color: '#fff'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Text overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-2">
              <span className="text-xl font-black text-slate-800 dark:text-slate-100">
                {stats.pendingBookings + stats.approvedBookings + stats.rejectedBookings}
              </span>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                Total Requests
              </span>
            </div>
          </div>
          
          {/* Legend */}
          <div className="mt-2 grid grid-cols-3 gap-2">
            {finalBookingData.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center text-center p-1.5 rounded-lg bg-slate-50 dark:bg-slate-850 border border-slate-100/50 dark:border-slate-800/50">
                <div className="flex items-center space-x-1">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400">{item.name}</span>
                </div>
                <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200 mt-0.5">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bookings Lists - Today and Recent */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Today's Meetings */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-3">
            <h3 className="font-display font-extrabold text-slate-900 dark:text-white text-sm">
              Today's Schedule
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 font-bold uppercase tracking-wide">
              Active Today
            </span>
          </div>

          {todayBookings.length === 0 ? (
            <div className="py-8 text-center text-slate-400 dark:text-slate-500">
              <ClipboardList className="h-8 w-8 mx-auto stroke-1 mb-2 text-slate-300 dark:text-slate-700" />
              <p className="text-xs">No meetings scheduled for today.</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {todayBookings.map((booking) => (
                <div key={booking.id} className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 flex items-start space-x-2.5">
                  <div className="flex-shrink-0 h-8 w-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex flex-col items-center justify-center font-mono text-[9px] font-bold">
                    <span>{booking.startTime.split(':')[0]}</span>
                    <span className="border-t border-emerald-200 dark:border-emerald-800 w-4 text-center mt-0.5 pt-0.5">{booking.endTime.split(':')[0]}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
                      {booking.cabinName}
                    </p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                      By: {booking.employeeName} • {booking.purpose}
                    </p>
                  </div>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                    booking.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                    booking.status === 'PENDING' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' :
                    'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
                  }`}>
                    {booking.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent booking Requests */}
        <div className="lg:col-span-7 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-3">
            <h3 className="font-display font-extrabold text-slate-900 dark:text-white text-sm">
              Recent Logged Requests
            </h3>
            <span className="text-[10px] text-slate-400 font-semibold">Latest 5 Entries</span>
          </div>

          {recentBookings.length === 0 ? (
            <div className="py-8 text-center text-slate-400 dark:text-slate-500">
              <ClipboardList className="h-8 w-8 mx-auto stroke-1 mb-2 text-slate-300 dark:text-slate-700" />
              <p className="text-xs">No booking history logged.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                    <th className="pb-2">Cabin</th>
                    <th className="pb-2">Date & Time</th>
                    <th className="pb-2">User</th>
                    <th className="pb-2 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                  {recentBookings.map((booking) => (
                    <tr key={booking.id} className="text-slate-700 dark:text-slate-300">
                      <td className="py-3 font-bold text-slate-900 dark:text-slate-100">{booking.cabinName}</td>
                      <td className="py-3">
                        <div className="font-medium">{booking.bookingDate}</div>
                        <div className="text-[10px] text-slate-400 dark:text-slate-500">{booking.startTime} - {booking.endTime}</div>
                      </td>
                      <td className="py-3 font-medium">{booking.employeeName}</td>
                      <td className="py-3 text-right">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[9px] font-bold ${
                          booking.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300' :
                          booking.status === 'PENDING' ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300' :
                          booking.status === 'REJECTED' ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300' :
                          'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
