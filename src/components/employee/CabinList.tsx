import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Search, RefreshCcw } from "lucide-react";

import { getCabins } from "../../services/api";
import { Cabin } from "../../types";

import CabinCard from "../CabinCard";
import BookingModal from "./BookingModal";
import CabinDetailsModal from "./CabinDetailsModal";

import CabinAvailabilityModal from "./CabinAvailabilityModal";

export default function CabinList() {
  const [loading, setLoading] = useState(true);

  const [cabins, setCabins] = useState<Cabin[]>([]);

  const [search, setSearch] = useState("");

  const [selectedCabin, setSelectedCabin] =
    useState<Cabin | null>(null);

  const [openBookingModal, setOpenBookingModal] =
    useState(false);

  const [selectedDetailCabin, setSelectedDetailCabin] =
    useState<Cabin | null>(null);

  const [openDetailsModal, setOpenDetailsModal] =
    useState(false);

  const [availabilityCabinId, setAvailabilityCabinId] =
  useState<number | null>(null);

  const [openAvailabilityModal, setOpenAvailabilityModal] =
  useState(false);  

  const loadCabins = async () => {
    try {
      setLoading(true);

      const response = await getCabins();

      setCabins(response.data.data);
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message ??
          "Unable to load cabins."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCabins();
  }, []);

  const filteredCabins = useMemo(() => {
    if (!search.trim()) return cabins;

    const value = search.toLowerCase();

    return cabins.filter(
      (cabin) =>
        cabin.cabinName
          .toLowerCase()
          .includes(value) ||
        cabin.location
          .toLowerCase()
          .includes(value)
    );
  }, [cabins, search]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="text-xl font-semibold text-slate-500">
          Loading Cabins...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold">
            Available Cabins
          </h1>

          <p className="text-slate-500 mt-1">
            Book a cabin for your meeting.
          </p>

        </div>

        <button
          onClick={loadCabins}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl flex items-center gap-2"
        >
          <RefreshCcw size={18} />

          Refresh

        </button>

      </div>

      {/* Search */}

      <div className="relative max-w-md">

        <Search
          className="absolute left-4 top-4 text-slate-400"
          size={18}
        />

        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search cabin..."
          className="w-full border border-slate-300 rounded-xl pl-11 pr-4 py-3"
        />

      </div>

      {/* Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {filteredCabins.length === 0 ? (

          <div className="col-span-full bg-white rounded-2xl shadow border border-slate-200 py-16 text-center">

            <h2 className="text-2xl font-semibold">

              No Cabins Found

            </h2>

            <p className="text-slate-500 mt-2">

              Try another search.

            </p>

          </div>

        ) : (

          filteredCabins.map((cabin) => (

            <CabinCard
              key={cabin.id}
              cabin={cabin}
              userRole="EMPLOYEE"

              onViewDetails={(cabin) => {

                setSelectedDetailCabin(cabin);

                setOpenDetailsModal(true);

              }}

              onViewAvailability={(cabin) => {
                 setAvailabilityCabinId(cabin.id);
                 setOpenAvailabilityModal(true);
              }}

              onBookNow={(cabin) => {

                setSelectedCabin(cabin);

                setOpenBookingModal(true);

              }}
            />

          ))

        )}

      </div>

      {/* Details Modal */}

      <CabinDetailsModal
        open={openDetailsModal}
        cabin={selectedDetailCabin}
        onClose={() => {

          setOpenDetailsModal(false);

          setSelectedDetailCabin(null);

        }}
        onBookNow={(cabin) => {

          setOpenDetailsModal(false);

          setSelectedCabin(cabin);

          setOpenBookingModal(true);

        }}
      />

      <CabinAvailabilityModal
    open={openAvailabilityModal}
    cabinId={availabilityCabinId}
    onClose={() => {
        setOpenAvailabilityModal(false);
        setAvailabilityCabinId(null);
    }}
/>
      {/* Booking Modal */}

      {selectedCabin && (


        <BookingModal
          open={openBookingModal}
          cabin={selectedCabin}
          onClose={() => {

            setOpenBookingModal(false);

            setSelectedCabin(null);

          }}
          onSuccess={() => {

            setOpenBookingModal(false);

            setSelectedCabin(null);

            toast.success(
              "Booking Request Submitted Successfully"
            );

            loadCabins();

          }}
        />

      )}

    </div>
  );
}