import { useState } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Users,
  Building2,
} from "lucide-react";

import { Cabin } from "../../types";

const API_BASE_URL = "http://localhost:8080";

interface Props {
  open: boolean;
  cabin: Cabin | null;
  onClose: () => void;
  onBookNow: (cabin: Cabin) => void;
}

export default function CabinDetailsModal({
  open,
  cabin,
  onClose,
  onBookNow,
}: Props) {
  const [currentImage, setCurrentImage] = useState(0);

  if (!open || !cabin) return null;

  const images = cabin.images ?? [];

  const nextImage = () => {
    if (images.length === 0) return;

    setCurrentImage((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const previousImage = () => {
    if (images.length === 0) return;

    setCurrentImage((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-6">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[92vh] overflow-y-auto">

        {/* Header */}

        <div className="flex justify-between items-center border-b p-6">

          <div>

            <h2 className="text-3xl font-bold">

              {cabin.cabinName}

            </h2>

            <p className="text-slate-500 mt-1">

              View Cabin Details

            </p>

          </div>

          <button
            onClick={() => {
              setCurrentImage(0);
              onClose();
            }}
            className="hover:bg-slate-100 rounded-xl p-2"
          >
            <X size={24} />
          </button>

        </div>

        <div className="grid lg:grid-cols-2 gap-8 p-8">

          {/* LEFT */}

          <div>

            <div className="relative h-[420px] rounded-3xl overflow-hidden bg-slate-100">

              {images.length > 0 ? (
                <img
                  src={`${API_BASE_URL}${images[currentImage].imageUrl}`}
                  alt={cabin.cabinName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex justify-center items-center text-slate-400">
                  <Building2 size={70} />
                </div>
              )}

              {images.length > 1 && (
                <>
                  <button
                    onClick={previousImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-3 hover:bg-slate-100"
                  >
                    <ChevronLeft />
                  </button>

                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-3 hover:bg-slate-100"
                  >
                    <ChevronRight />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}

            {images.length > 1 && (
              <div className="flex gap-3 mt-5 overflow-x-auto pb-2">

                {images.map((image, index) => (

                  <img
                    key={image.id}
                    src={`${API_BASE_URL}${image.imageUrl}`}
                    onClick={() => setCurrentImage(index)}
                    className={`w-24 h-20 rounded-xl cursor-pointer object-cover border-4 transition

                    ${
                      currentImage === index
                        ? "border-indigo-600"
                        : "border-transparent"
                    }`}
                  />

                ))}

              </div>
            )}

          </div>

          {/* RIGHT */}

          <div className="space-y-7">

            <div>

              <h3 className="text-xl font-bold mb-4">

                Cabin Information

              </h3>

              <div className="space-y-4">

                <div className="flex items-center gap-3">

                  <MapPin className="text-indigo-600" />

                  <span>{cabin.location}</span>

                </div>

                <div className="flex items-center gap-3">

                  <Users className="text-indigo-600" />

                  <span>

                    Capacity : {cabin.capacity} People

                  </span>

                </div>

                <div>

                  <span className="font-semibold">

                    Floor

                  </span>

                  <p className="text-slate-600 mt-1">

                    {cabin.floor}

                  </p>

                </div>

                <div>

                  <span className="font-semibold">

                    Status

                  </span>

                  <div className="mt-2">

                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold

                      ${
                        cabin.status === "AVAILABLE"
                          ? "bg-green-100 text-green-700"
                          : cabin.status === "MAINTENANCE"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {cabin.status}
                    </span>

                  </div>

                </div>

              </div>

            </div>

            <div>

              <h3 className="text-xl font-bold mb-4">

                Amenities

              </h3>

              <div className="flex flex-wrap gap-3">

                {cabin.amenities.length > 0 ? (

                  cabin.amenities.map((amenity) => (

                    <span
                      key={amenity}
                      className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full font-medium"
                    >
                      {amenity}
                    </span>

                  ))

                ) : (

                  <span className="text-slate-500">

                    No amenities available

                  </span>

                )}

              </div>

            </div>

            <button
              disabled={
                cabin.status !== "AVAILABLE"
              }
              onClick={() => onBookNow(cabin)}
              className={`w-full mt-10 py-4 rounded-2xl text-white text-lg font-semibold transition

              ${
                cabin.status === "AVAILABLE"
                  ? "bg-indigo-600 hover:bg-indigo-700"
                  : "bg-slate-300 cursor-not-allowed"
              }`}
            >

              Book This Cabin

            </button>

          </div>

        </div>

      </div>

    </div>
  );
}