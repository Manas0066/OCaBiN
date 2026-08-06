import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  X,
  Clock3,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import {
  getCabinAvailability,
} from "../../services/api";

import {
  BookingAvailabilityResponse,
} from "../../types";

interface Props {
  open: boolean;
  cabinId: number | null;
  onClose: () => void;
}

export default function CabinAvailabilityModal({
  open,
  cabinId,
  onClose,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [availability, setAvailability] =
    useState<BookingAvailabilityResponse | null>(
      null
    );

  useEffect(() => {
    if (!open || cabinId == null) return;

    loadAvailability();
  }, [open, cabinId]);

  const loadAvailability = async () => {
    try {
      setLoading(true);

      const response =
        await getCabinAvailability(cabinId!);

      setAvailability(response.data.data);
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message ??
          "Unable to load schedule."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-3xl shadow-xl w-full max-w-2xl">

        <div className="flex justify-between items-center border-b px-6 py-5">

          <div>

            <h2 className="text-2xl font-bold">
              Today's Schedule
            </h2>

            <p className="text-slate-500 mt-1">
              {availability?.cabinName}
            </p>

          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100"
          >
            <X size={22} />
          </button>

        </div>

        {loading ? (

          <div className="py-20 text-center">

            Loading...

          </div>

        ) : availability ? (

          <div className="p-6">

            {/* Current Status */}

            <div
              className={`rounded-2xl p-5 mb-6 border

              ${
                availability.currentlyOccupied
                  ? "bg-red-50 border-red-200"
                  : "bg-emerald-50 border-emerald-200"
              }`}
            >

              <div className="flex items-center gap-3">

                {availability.currentlyOccupied ? (
                  <XCircle
                    className="text-red-600"
                    size={28}
                  />
                ) : (
                  <CheckCircle2
                    className="text-emerald-600"
                    size={28}
                  />
                )}

                <div>

                  <h3 className="font-bold text-lg">

                    {availability.currentlyOccupied
                      ? "Currently Occupied"
                      : "Currently Available"}

                  </h3>

                  {availability.currentlyOccupied &&
                    availability.occupiedUntil && (

                      <p className="text-red-600 mt-1">

                        Busy until{" "}
                        {availability.occupiedUntil}

                      </p>

                    )}

                </div>

              </div>

            </div>

            {/* Timeline */}

            <div className="space-y-3">

              {availability.todaySchedule.map(
                (slot, index) => (

                  <div
                    key={index}
                    className={`flex justify-between items-center rounded-xl border p-4

                    ${
                      slot.slotType === "BOOKED"
                        ? "bg-red-50 border-red-100"
                        : "bg-emerald-50 border-emerald-100"
                    }`}
                  >

                    <div className="flex items-center gap-3">

                      <Clock3 size={18} />

                      <span className="font-semibold">

                        {slot.startTime} - {slot.endTime}

                      </span>

                    </div>

                    <span
                      className={`font-bold

                      ${
                        slot.slotType === "BOOKED"
                          ? "text-red-600"
                          : "text-emerald-600"
                      }`}
                    >

                      {slot.slotType}

                    </span>

                  </div>

                )
              )}

            </div>

          </div>

        ) : null}

      </div>

    </div>
  );
}