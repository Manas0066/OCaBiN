import React from "react";
import {
  MapPin,
  Users,
  Building2,
  ChevronRight,
  Wifi,
  Monitor,
  Coffee,
  Activity,
  Eye,
} from "lucide-react";
import { Cabin } from "../types";

const API_BASE_URL = "http://localhost:8080";

interface CabinCardProps {
  cabin: Cabin;
  onEdit?: (cabin: Cabin) => void;
  onBookNow?: (cabin: Cabin) => void;
  onViewDetails?: (cabin: Cabin) => void;
  userRole: "ADMIN" | "EMPLOYEE";
}

export default function CabinCard({
  cabin,
  onBookNow,
  onViewDetails,
  userRole,
}: CabinCardProps) {
  const getAmenityIcon = (name: string) => {
    const n = name.toLowerCase();

    if (n.includes("wifi")) return <Wifi size={12} />;

    if (n.includes("monitor") || n.includes("tv"))
      return <Monitor size={12} />;

    if (n.includes("coffee")) return <Coffee size={12} />;

    return null;
  };

  return (
    <div className="premium-card overflow-hidden group">

      <div
        className={`h-1.5 w-full ${
          cabin.status === "AVAILABLE"
            ? "bg-emerald-500"
            : "bg-slate-300"
        }`}
      />

      <div className="p-6">

        {/* Cover Image */}

        <div
          className="relative h-52 rounded-2xl overflow-hidden bg-slate-100 cursor-pointer"
          onClick={() => onViewDetails?.(cabin)}
        >
          {cabin.images && cabin.images.length > 0 ? (
            <img
              src={`${API_BASE_URL}${cabin.images[0].imageUrl}`}
              alt={cabin.cabinName}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
          ) : (
            <div className="w-full h-full flex justify-center items-center text-slate-400">
              <Building2 size={60} />
            </div>
          )}

          {cabin.images.length > 1 && (
            <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
              +{cabin.images.length - 1} Photos
            </div>
          )}
        </div>

        {/* Status */}

        <div className="flex justify-between items-center mt-5">

          <h3 className="text-xl font-black text-slate-800">
            {cabin.cabinName}
          </h3>

          <span
            className={`text-[10px] font-black px-3 py-1 rounded-full uppercase

            ${
              cabin.status === "AVAILABLE"
                ? "bg-emerald-100 text-emerald-700"
                : "bg-slate-100 text-slate-500"
            }`}
          >
            {cabin.status}
          </span>

        </div>

        <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase mt-2 mb-5">
          <MapPin size={12} />
          {cabin.location} • Floor {cabin.floor}
        </div>

        {/* Stats */}

        <div className="grid grid-cols-2 gap-4 mb-6">

          <div className="bg-slate-50 rounded-2xl border border-slate-100 p-3">

            <div className="flex items-center gap-2 text-slate-400 mb-2">
              <Users size={12} />
              <span className="text-[10px] uppercase">
                Capacity
              </span>
            </div>

            <p className="font-black">
              {cabin.capacity} Seats
            </p>

          </div>

          <div className="bg-slate-50 rounded-2xl border border-slate-100 p-3">

            <div className="flex items-center gap-2 text-slate-400 mb-2">
              <Activity size={12} />
              <span className="text-[10px] uppercase">
                Amenities
              </span>
            </div>

            <div className="flex gap-2">

              {cabin.amenities.slice(0, 3).map((item, index) => (
                <div key={index}>
                  {getAmenityIcon(item) ?? (
                    <div className="w-2 h-2 rounded-full bg-slate-300" />
                  )}
                </div>
              ))}

              {cabin.amenities.length > 3 && (
                <span className="text-xs text-slate-400">
                  +{cabin.amenities.length - 3}
                </span>
              )}

            </div>

          </div>

        </div>

        {/* Buttons */}

        {userRole === "EMPLOYEE" ? (

          <div className="space-y-3">

            <button
              onClick={() => onViewDetails?.(cabin)}
              className="w-full py-3 rounded-2xl border border-slate-200 font-semibold hover:bg-slate-50 flex justify-center items-center gap-2"
            >
              <Eye size={18} />

              View Details

            </button>

            <button
              disabled={cabin.status !== "AVAILABLE"}
              onClick={() => onBookNow?.(cabin)}
              className={`w-full py-4 rounded-2xl font-black uppercase tracking-wider flex justify-center items-center gap-2 transition

              ${
                cabin.status === "AVAILABLE"
                  ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                  : "bg-slate-100 text-slate-400 cursor-not-allowed"
              }`}
            >

              Reserve Now

              <ChevronRight size={16} />

            </button>

          </div>

        ) : (

          <button className="w-full py-3 rounded-2xl border border-slate-200 font-semibold">
            Manage Cabin
          </button>

        )}

      </div>

    </div>
  );
}