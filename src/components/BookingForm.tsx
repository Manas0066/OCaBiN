import React, { useState, useEffect } from 'react';
import { Calendar, Clock, AlertTriangle, CheckSquare, Sparkles, Building2 } from 'lucide-react';
import { Cabin, Booking } from '../types';

interface BookingFormProps {
  availableCabins: Cabin[];
  preselectedCabin: Cabin | null;
  onSubmit: (data: {
    cabinId: number;
    bookingDate: string;
    startTime: string;
    endTime: string;
    purpose: string;
  }) => Promise<void>;
  loading: boolean;
  existingBookings: Booking[];
}

export default function BookingForm({
  availableCabins,
  preselectedCabin,
  onSubmit,
  loading,
  existingBookings,
}: BookingFormProps) {
  const [cabinId, setCabinId] = useState<number>(0);
  const [bookingDate, setBookingDate] = useState<string>(
    new Date().toISOString().split('T')[0] // today's date
  );
  const [startTime, setStartTime] = useState<string>('09:00');
  const [endTime, setEndTime] = useState<string>('10:00');
  const [purpose, setPurpose] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  // Sync pre-selected cabin from parent clicks
  useEffect(() => {
    if (preselectedCabin) {
      setCabinId(preselectedCabin.id);
    } else if (availableCabins.length > 0) {
      setCabinId(availableCabins[0].id);
    }
  }, [preselectedCabin, availableCabins]);

  // Sync cabin list default selection
  useEffect(() => {
    if (!cabinId && availableCabins.length > 0) {
      setCabinId(availableCabins[0].id);
    }
  }, [availableCabins, cabinId]);

  // Local helper: check if times are invalid
  const validateForm = () => {
    if (startTime >= endTime) {
      return 'Start time must be strictly before end time.';
    }
    if (!purpose.trim()) {
      return 'Please specify the meeting purpose.';
    }
    if (purpose.trim().length < 5) {
      return 'Purpose must be at least 5 characters.';
    }

    // Overlap checks
    const selectedCabin = availableCabins.find(c => c.id === cabinId);
    if (selectedCabin) {
      const hasConflict = existingBookings.some(b => 
        b.cabinName === selectedCabin.cabinName &&
        b.bookingDate === bookingDate &&
        b.status !== 'CANCELLED' && b.status !== 'REJECTED' &&
        ((startTime >= b.startTime && startTime < b.endTime) ||
         (endTime > b.startTime && endTime <= b.endTime) ||
         (startTime <= b.startTime && endTime >= b.endTime))
      );

      if (hasConflict) {
        return `Conflict: This cabin is already booked on ${bookingDate} between ${startTime} and ${endTime}. Check another timeslot!`;
      }
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const validationErr = validateForm();
    if (validationErr) {
      setError(validationErr);
      return;
    }

    try {
      await onSubmit({
        cabinId,
        bookingDate,
        startTime,
        endTime,
        purpose,
      });
      setSuccess(true);
      setPurpose('');
      // Trigger temporary success notification
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || 'An error occurred while creating booking.');
    }
  };

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 shadow-sm relative overflow-hidden">
      
      {/* Decorative gradient corner */}
      <div className="absolute right-0 top-0 h-16 w-16 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-bl-full pointer-events-none" />

      <div className="flex items-center space-x-2.5 mb-4">
        <div className="h-9 w-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 flex items-center justify-center">
          <Calendar className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-display font-bold text-slate-900 dark:text-white text-base">
            Reserve a Cabin
          </h3>
          <p className="text-xs text-slate-400">Book instant or scheduled work sessions</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 mt-3">
        {/* Cabin Dropdown */}
        <div>
          <label htmlFor="cabinSelect" className="block text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
            Select Cabin
          </label>
          <div className="relative">
            <select
              id="cabinSelect"
              value={cabinId}
              onChange={(e) => setCabinId(Number(e.target.value))}
              className="w-full text-sm font-medium rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3.5 py-2.5 text-slate-850 dark:text-slate-100 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors"
            >
              {availableCabins.length === 0 ? (
                <option value={0}>No Available Cabins</option>
              ) : (
                availableCabins.map((cabin) => (
                  <option key={cabin.id} value={cabin.id}>
                    🏢 {cabin.cabinName} (Floor {cabin.floor} • Seats {cabin.capacity})
                  </option>
                ))
              )}
            </select>
          </div>
        </div>

        {/* Date & Times Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {/* Date */}
          <div>
            <label htmlFor="bookingDate" className="block text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
              Booking Date
            </label>
            <input
              id="bookingDate"
              type="date"
              value={bookingDate}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setBookingDate(e.target.value)}
              className="w-full text-xs font-medium rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2.5 text-slate-800 dark:text-slate-100 focus:border-emerald-500 focus:outline-none"
              required
            />
          </div>

          {/* Start Time */}
          <div>
            <label htmlFor="startTime" className="block text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
              Start Time
            </label>
            <div className="relative">
              <input
                id="startTime"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full text-xs font-medium rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2.5 text-slate-800 dark:text-slate-100 focus:border-emerald-500 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* End Time */}
          <div>
            <label htmlFor="endTime" className="block text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
              End Time
            </label>
            <div className="relative">
              <input
                id="endTime"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full text-xs font-medium rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2.5 text-slate-800 dark:text-slate-100 focus:border-emerald-500 focus:outline-none"
                required
              />
            </div>
          </div>
        </div>

        {/* Purpose */}
        <div>
          <label htmlFor="purpose" className="block text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
            Meeting Purpose
          </label>
          <input
            id="purpose"
            type="text"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            placeholder="e.g., Sprint Planning, Frontend Demo"
            className="w-full text-xs font-medium rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3.5 py-2.5 text-slate-800 dark:text-slate-100 focus:border-emerald-500 focus:outline-none placeholder:text-slate-400"
            required
          />
        </div>

        {/* Error / Success feedback blocks */}
        {error && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 text-xs text-rose-600 dark:text-rose-400 flex items-start space-x-2">
            <AlertTriangle className="h-4.5 w-4.5 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 text-xs text-emerald-600 dark:text-emerald-400 flex items-start space-x-2">
            <CheckSquare className="h-4.5 w-4.5 flex-shrink-0 mt-0.5" />
            <span className="font-bold">Booking Request Submitted Successfully! Awaiting manager approval.</span>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading || availableCabins.length === 0}
          className="w-full flex items-center justify-center space-x-1.5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span>Processing...</span>
          ) : (
            <>
              <Sparkles className="h-3.5 w-3.5" />
              <span>Submit Booking Request</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
