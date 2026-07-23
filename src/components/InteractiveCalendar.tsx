import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, HelpCircle } from 'lucide-react';
import { Cabin, Booking } from '../types';

interface InteractiveCalendarProps {
  cabins: Cabin[];
  bookings: Booking[];
}

export default function InteractiveCalendar({ cabins, bookings }: InteractiveCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0] // today's date
  );

  // Time slots from 9:00 to 18:00
  const hours = [
    { label: '9 AM', time: '09:00' },
    { label: '10 AM', time: '10:00' },
    { label: '11 AM', time: '11:00' },
    { label: '12 PM', time: '12:00' },
    { label: '1 PM', time: '13:00' },
    { label: '2 PM', time: '14:00' },
    { label: '3 PM', time: '15:00' },
    { label: '4 PM', time: '16:00' },
    { label: '5 PM', time: '17:00' },
    { label: '6 PM', time: '18:00' },
  ];

  // Move date forward or backward
  const shiftDate = (days: number) => {
    const current = new Date(selectedDate);
    current.setDate(current.getDate() + days);
    setSelectedDate(current.toISOString().split('T')[0]);
  };

  // Helper to find booking overlap for a specific hour/slot
  const getBookingForSlot = (cabinName: string, hourStr: string) => {
    return bookings.find(b => {
      if (b.cabinName !== cabinName) return false;
      if (b.bookingDate !== selectedDate) return false;
      if (b.status === 'CANCELLED' || b.status === 'REJECTED') return false;

      // Check if slot falls within start and end time
      const slotTime = parseInt(hourStr.split(':')[0], 10);
      const startHour = parseInt(b.startTime.split(':')[0], 10);
      const endHour = parseInt(b.endTime.split(':')[0], 10);
      
      return slotTime >= startHour && slotTime < endHour;
    });
  };

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 shadow-sm">
      
      {/* Calendar header controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-4 gap-3">
        <div>
          <h3 className="font-display font-extrabold text-slate-900 dark:text-white text-base">
            Cabins Occupancy Grid
          </h3>
          <p className="text-xs text-slate-400">Real-time room availability matrix</p>
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <button
            onClick={() => shiftDate(-1)}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="relative flex-grow sm:flex-grow-0">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 text-slate-800 dark:text-slate-100 focus:outline-none flex items-center justify-center w-full"
            />
          </div>

          <button
            onClick={() => shiftDate(1)}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Grid Matrix Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-100 dark:border-slate-800/60">
        <table className="w-full border-collapse text-left text-xs min-w-[700px]">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-slate-950/30 text-slate-400 dark:text-slate-500 font-bold border-b border-slate-100 dark:border-slate-800">
              <th className="p-3 w-48 font-display text-xs font-bold">Cabin / Space</th>
              {hours.map((h, i) => (
                <th key={i} className="p-3 text-center font-mono text-[10px] uppercase border-l border-slate-100/50 dark:border-slate-800/30">
                  {h.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {cabins.filter(c => c.active).map((cabin) => (
              <tr key={cabin.id} className="hover:bg-slate-50/20 dark:hover:bg-slate-900/10">
                <td className="p-3 font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 sticky left-0 z-10 shadow-sm">
                  <div className="truncate font-display font-bold text-xs">{cabin.cabinName}</div>
                  <div className="text-[9px] text-slate-400 font-medium">Cap: {cabin.capacity} • Fl {cabin.floor}</div>
                </td>
                
                {hours.map((h, i) => {
                  const booking = getBookingForSlot(cabin.cabinName, h.time);
                  
                  return (
                    <td
                      key={i}
                      className="p-1 border-l border-slate-100/50 dark:border-slate-800/30 text-center h-12 w-16 min-w-[64px]"
                    >
                      {booking ? (
                        <div
                          className={`h-full rounded-lg p-1 text-[9px] font-medium leading-tight flex flex-col justify-center overflow-hidden border ${
                            booking.status === 'APPROVED'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-900/30'
                              : 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-900/30'
                          }`}
                          title={`${booking.purpose} - Scheduled by ${booking.employeeName} (${booking.startTime} - ${booking.endTime})`}
                        >
                          <span className="font-bold truncate block">{booking.employeeName.split(' ')[0]}</span>
                          <span className="opacity-75 truncate block mt-0.5">{booking.purpose}</span>
                        </div>
                      ) : (
                        <div className="h-full w-full rounded-lg bg-slate-50/30 dark:bg-slate-950/10 border border-dashed border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-300 dark:text-slate-700">
                          -
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Grid Legend */}
      <div className="flex items-center space-x-4 mt-3 text-[10px] font-semibold text-slate-400">
        <div className="flex items-center space-x-1">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span>Approved Booking</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="h-2 w-2 rounded-full bg-amber-500" />
          <span>Awaiting Approval (Pending)</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="h-2.5 w-2.5 rounded bg-slate-50 border border-slate-100 dark:bg-slate-950 dark:border-slate-800 text-center text-slate-300">-</span>
          <span>Available Slot</span>
        </div>
      </div>

    </div>
  );
}
