import { useState } from "react";
import toast from "react-hot-toast";
import { X } from "lucide-react";

import { createBooking } from "../../services/api";
import { Cabin } from "../../types";

interface Props {
  open: boolean;
  cabin: Cabin;
  onClose: () => void;
  onSuccess: () => void;
}

export default function BookingModal({
  open,
  cabin,
  onClose,
  onSuccess,
}: Props) {

  const today = new Date()
    .toISOString()
    .split("T")[0];

  const [bookingDate, setBookingDate] =
    useState(today);

  const [startTime, setStartTime] =
    useState("09:00");

  const [endTime, setEndTime] =
    useState("10:00");

  const [purpose, setPurpose] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  if (!open) return null;

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    if (!purpose.trim()) {

      toast.error(
        "Purpose is required."
      );

      return;

    }

    if (startTime >= endTime) {

      toast.error(
        "End time must be after start time."
      );

      return;

    }

    try {

      setLoading(true);

      await createBooking({

        cabinId: cabin.id,

        bookingDate,

        startTime,

        endTime,

        purpose,

      });

      toast.success(
        "Booking Request Submitted"
      );

      setPurpose("");

      setStartTime("09:00");

      setEndTime("10:00");

      setBookingDate(today);

      onSuccess();

    } catch (err: any) {

      toast.error(

        err?.response?.data?.message ??

        "Unable to create booking."

      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">

        <div className="flex justify-between items-center border-b px-6 py-5">

          <div>

            <h2 className="text-2xl font-bold">

              Book Cabin

            </h2>

            <p className="text-slate-500 mt-1">

              {cabin.cabinName}

            </p>

          </div>

          <button
            onClick={onClose}
          >

            <X />

          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-5"
        >
                      <div>

            <label className="block text-sm font-medium mb-2">

              Booking Date

            </label>

            <input
              type="date"
              value={bookingDate}
              min={today}
              onChange={(e) =>
                setBookingDate(e.target.value)
              }
              className="w-full border border-slate-300 rounded-xl px-4 py-3"
            />

          </div>

          <div className="grid grid-cols-2 gap-5">

            <div>

              <label className="block text-sm font-medium mb-2">

                Start Time

              </label>

              <input
                type="time"
                value={startTime}
                onChange={(e) =>
                  setStartTime(e.target.value)
                }
                className="w-full border border-slate-300 rounded-xl px-4 py-3"
              />

            </div>

            <div>

              <label className="block text-sm font-medium mb-2">

                End Time

              </label>

              <input
                type="time"
                value={endTime}
                onChange={(e) =>
                  setEndTime(e.target.value)
                }
                className="w-full border border-slate-300 rounded-xl px-4 py-3"
              />

            </div>

          </div>

          <div>

            <label className="block text-sm font-medium mb-2">

              Purpose

            </label>

            <textarea
              rows={4}
              value={purpose}
              onChange={(e) =>
                setPurpose(e.target.value)
              }
              placeholder="Enter meeting purpose..."
              className="w-full border border-slate-300 rounded-xl px-4 py-3 resize-none"
            />

          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">

            <h3 className="font-semibold text-slate-700">

              Cabin Details

            </h3>

            <div className="grid grid-cols-2 gap-3 mt-4 text-sm">

              <div>

                <span className="text-slate-500">

                  Floor

                </span>

                <p className="font-semibold">

                  {cabin.floor}

                </p>

              </div>

              <div>

                <span className="text-slate-500">

                  Capacity

                </span>

                <p className="font-semibold">

                  {cabin.capacity}

                </p>

              </div>

              <div className="col-span-2">

                <span className="text-slate-500">

                  Location

                </span>

                <p className="font-semibold">

                  {cabin.location}

                </p>

              </div>

            </div>

          </div>
                    <div>

            <label className="block text-sm font-medium mb-2">

              Amenities

            </label>

            <div className="flex flex-wrap gap-2">

              {cabin.amenities.length > 0 ? (

                cabin.amenities.map((item) => (

                  <span
                    key={item}
                    className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium"
                  >

                    {item}

                  </span>

                ))

              ) : (

                <span className="text-slate-500">

                  No amenities available

                </span>

              )}

            </div>

          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-6 py-3 rounded-xl border border-slate-300 hover:bg-slate-100 transition"
            >

              Cancel

            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-semibold transition"
            >

              {loading
                ? "Submitting..."
                : "Submit Booking"}

            </button>

          </div>
                  </form>

      </div>

    </div>

  );

}