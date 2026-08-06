// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import {
//   Edit,
//   RefreshCcw,
//   Save,
//   X,
//   MapPin,
//   Users,
//   Layers,
//   Settings2,
//   CheckCircle2,
//   AlertCircle,
//   Plus,
//   Trash2,
//   Upload,
//   Calendar,
//   Building2,
//   ChevronRight
// } from "lucide-react";

// import {
//   getCabins,
//   updateCabin,
//   createCabin,
//   uploadCabinImages,
//   getCabinImages,
//   deleteCabinImage,
// } from "../../services/api";

// import { Cabin, UpdateCabinRequest } from "../../types";
// import CabinAvailabilityModal from "../employee/CabinAvailabilityModal";

// const API_BASE_URL = "http://localhost:8080";

// // Helper component to manage object URLs and prevent memory leaks
// function ImagePreview({ file }: { file: File }) {
//   const [previewUrl, setPreviewUrl] = useState<string>("");

//   useEffect(() => {
//     const url = URL.createObjectURL(file);
//     setPreviewUrl(url);

//     // Revoke the URL when the file changes or the component unmounts
//     return () => {
//       URL.revokeObjectURL(url);
//     };
//   }, [file]);

//   if (!previewUrl) return null;

//   return (
//     <img
//       src={previewUrl}
//       alt="Preview"
//       className="h-full w-full object-cover rounded-xl"
//     />
//   );
// }

// export default function CabinManagement() {
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [cabins, setCabins] = useState<Cabin[]>([]);
//   const [selectedCabin, setSelectedCabin] = useState<Cabin | null>(null);
//   const [cabinImages, setCabinImages] = useState<{ id: number; imageUrl: string }[]>([]);
//   const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  
//   // State to track if detail panel is in "Create New" draft state
//   const [isCreatingNew, setIsCreatingNew] = useState(false);
//   const [openAvailabilityModal, setOpenAvailabilityModal] = useState(false);

//   // Detail Panel Fields
//   const [amenitiesText, setAmenitiesText] = useState("");
//   const [form, setForm] = useState<UpdateCabinRequest>({
//     cabinName: "",
//     floor: 1,
//     capacity: 1,
//     location: "",
//     amenities: [],
//     status: "AVAILABLE",
//     active: true,
//   });

//   const loadCabins = async (selectFirstId?: number | null) => {
//     try {
//       setLoading(true);
//       const response = await getCabins();
//       const cabinsList = response.data.data;
//       setCabins(cabinsList);

//       // Auto select first cabin or previously updated cabin
//       if (cabinsList.length > 0) {
//         if (selectFirstId) {
//           const match = cabinsList.find((c: Cabin) => c.id === selectFirstId);
//           if (match) handleSelectCabin(match);
//         } else {
//           handleSelectCabin(cabinsList[0]);
//         }
//       }
//     } catch (err: any) {
//       toast.error(err?.response?.data?.message ?? "Unable to load cabins.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadCabins();
//   }, []);

//   const handleSelectCabin = async (cabin: Cabin) => {
//     setIsCreatingNew(false);
//     setSelectedCabin(cabin);
//     setAmenitiesText(cabin.amenities.join(", "));
//     setSelectedFiles([]);
//     setForm({
//       cabinName: cabin.cabinName,
//       floor: cabin.floor,
//       capacity: cabin.capacity,
//       location: cabin.location,
//       amenities: cabin.amenities,
//       status: cabin.status,
//       active: cabin.active,
//     });
//     try {
//       const response = await getCabinImages(cabin.id);
//       setCabinImages(response.data.data);
//     } catch (error) {
//       setCabinImages([]);
//     }
//   };

//   const handleStartCreate = () => {
//     setIsCreatingNew(true);
//     setSelectedCabin(null);
//     setCabinImages([]);
//     setSelectedFiles([]);
//     setAmenitiesText("");
//     setForm({
//       cabinName: "",
//       floor: 1,
//       capacity: 1,
//       location: "",
//       amenities: [],
//       status: "AVAILABLE",
//       active: true,
//     });
//   };

//   const validateForm = (name: string, location: string) => {
//     if (!name.trim()) {
//       toast.error("Cabin Name is required.");
//       return false;
//     }
//     if (!location.trim()) {
//       toast.error("Location / Zone is required.");
//       return false;
//     }
//     return true;
//   };

//   // --- Create logic trigger ---
//   const handleCreate = async () => {
//     if (!validateForm(form.cabinName, form.location)) return;

//     try {
//       setSubmitting(true);
//       const amenitiesArr = amenitiesText
//         .split(",")
//         .map((item) => item.trim())
//         .filter(Boolean);

//       const response = await createCabin({
//         cabinName: form.cabinName,
//         floor: form.floor,
//         capacity: form.capacity,
//         location: form.location,
//         amenities: amenitiesArr,
//       });

//       const cabinId = response.data.data.id;

//       if (selectedFiles.length > 0) {
//         await uploadCabinImages(cabinId, selectedFiles);
//       }

//       toast.success("Cabin Created Successfully");
//       setSelectedFiles([]);
//       await loadCabins(cabinId);
//     } catch (err: any) {
//       toast.error(err?.response?.data?.message ?? "Unable to create cabin.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // --- Update logic trigger ---
//   const handleUpdate = async () => {
//     if (!selectedCabin) return;
//     if (!validateForm(form.cabinName, form.location)) return;

//     const finalAmenities = amenitiesText.split(",").map((i) => i.trim()).filter(Boolean);
    
//     try {
//       setSubmitting(true);
//       await updateCabin(selectedCabin.id, { ...form, amenities: finalAmenities });
      
//       if (selectedFiles.length > 0) {
//         await uploadCabinImages(selectedCabin.id, selectedFiles);
//       }

//       toast.success("Cabin Updated Successfully");
//       setSelectedFiles([]);
//       await loadCabins(selectedCabin.id);
//     } catch (err: any) {
//       toast.error(err?.response?.data?.message ?? "Update failed.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleDeleteImage = async (imageId: number) => {
//     if (!selectedCabin) return;
//     try {
//       await deleteCabinImage(imageId);
//       toast.success("Image deleted successfully");
      
//       const response = await getCabinImages(selectedCabin.id);
//       setCabinImages(response.data.data);
//     } catch (err: any) {
//       toast.error(err?.response?.data?.message ?? "Failed to delete image.");
//     }
//   };

//   if (loading && cabins.length === 0) {
//     return (
//       <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
//         <div className="h-10 w-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
//         <p className="text-slate-400 font-bold uppercase text-[10px]">Syncing Assets...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in duration-500">
      
//       {/* LEFT COLUMN: Cabins Selector Master List */}
//       <div className="lg:col-span-4 space-y-6">
//         <div className="flex items-center justify-between">
//           <div>
//             <p className="text-emerald-500 font-bold text-xs uppercase tracking-widest mb-1.5">Resource Management</p>
//             <h1 className="text-3xl font-black text-white tracking-tight">Cabin Inventory</h1>
//           </div>
//           <button
//             onClick={handleStartCreate}
//             className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold text-[10px] uppercase tracking-wider transition-all shadow-md shadow-emerald-500/10 active:scale-95 flex-shrink-0"
//             title="Register New Cabin"
//           >
//             <Plus size={14} /> New
//           </button>
//         </div>
//         <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
//           Manage all cabins, their details, availability and status.
//         </p>

//         {/* Scrollable list card stack */}
//         <div className="space-y-3 max-h-[68vh] overflow-y-auto pr-1">
//           {cabins.map((cabin) => {
//             const isSelected = selectedCabin?.id === cabin.id;
//             return (
//               <div
//                 key={cabin.id}
//                 onClick={() => handleSelectCabin(cabin)}
//                 className={`p-4 rounded-[20px] border cursor-pointer flex items-center justify-between transition-all duration-300 group ${
//                   isSelected
//                     ? "bg-[#111425] border-emerald-500/40 shadow-lg shadow-emerald-500/5"
//                     : "bg-[#111425]/40 border-slate-800/60 hover:bg-[#111425]/85 hover:border-slate-700"
//                 }`}
//               >
//                 <div className="flex items-center gap-3.5 min-w-0">
//                   <div className="h-12 w-12 rounded-xl overflow-hidden bg-slate-950 flex-shrink-0 border border-slate-800">
//                     {cabin.images && cabin.images.length > 0 ? (
//                       <img
//                         src={`${API_BASE_URL}${cabin.images[0].imageUrl}`}
//                         alt={cabin.cabinName}
//                         className="w-full h-full object-cover"
//                       />
//                     ) : (
//                       <div className="h-full w-full flex items-center justify-center text-slate-500">
//                         <Building2 size={18} />
//                       </div>
//                     )}
//                   </div>
//                   <div className="min-w-0">
//                     <div className="font-bold text-white text-sm truncate">{cabin.cabinName}</div>
//                     <div className="text-[10px] text-slate-500 font-bold uppercase mt-0.5 tracking-tight">Floor {cabin.floor}</div>
//                   </div>
//                 </div>

//                 {/* Status Indicator */}
//                 <span className="inline-flex items-center text-[9px] font-black uppercase tracking-wider">
//                   <span className={`h-1.5 w-1.5 rounded-full mr-1.5 ${
//                     cabin.status === "AVAILABLE" ? "bg-emerald-400 animate-pulse" :
//                     cabin.status === "OCCUPIED" ? "bg-rose-500" : "bg-amber-400"
//                   }`} />
//                   <span className={
//                     cabin.status === "AVAILABLE" ? "text-emerald-400" :
//                     cabin.status === "OCCUPIED" ? "text-rose-500" : "text-amber-400"
//                   }>
//                     {cabin.status}
//                   </span>
//                 </span>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* RIGHT COLUMN: Active Details Form / Editor */}
//       <div className="lg:col-span-8">
//         <div className="bg-[#111425]/60 backdrop-blur-md border border-slate-800/80 rounded-[32px] p-8 space-y-6 shadow-xl relative overflow-hidden">
          
//           {/* Header Row */}
//           <div className="flex items-center justify-between pb-5 border-b border-slate-850">
//             <div>
//               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
//                 {isCreatingNew ? "Configuration Panel" : `Cabin Settings • ID: CMS-0${selectedCabin?.id}`}
//               </p>
//               <h2 className="text-xl font-black text-white tracking-tight mt-1">
//                 {isCreatingNew ? "Add New Cabin Resource" : "Edit Cabin Configuration"}
//               </h2>
//             </div>
            
//             <div className="flex items-center gap-2">
//               {!isCreatingNew && selectedCabin && (
//                 <button
//                   onClick={() => setOpenAvailabilityModal(true)}
//                   className="inline-flex items-center gap-1.5 px-4 py-2 border border-emerald-500/20 bg-[#161a30]/35 hover:bg-[#161a30]/85 hover:border-emerald-500/35 text-emerald-400 font-bold text-xs rounded-xl active:scale-95 transition-all shadow-sm"
//                 >
//                   <Calendar size={13} />
//                   Today's Schedule
//                 </button>
//               )}
//               <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-400 font-bold text-[10px] uppercase">
//                 <Edit size={10} /> Direct Editing
//               </span>
//             </div>
//           </div>

//           {/* Form Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//             <div className="space-y-1.5">
//               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Cabin Name *</label>
//               <div className="relative">
//                 <Building2 size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
//                 <input
//                   type="text"
//                   value={form.cabinName}
//                   onChange={(e) => setForm({ ...form, cabinName: e.target.value })}
//                   placeholder="e.g. Executive Suite"
//                   className="w-full bg-[#151a2e] border border-slate-800 focus:border-emerald-500 rounded-2xl pl-12 pr-5 py-3.5 transition-all outline-none font-bold text-white text-sm placeholder:text-slate-600"
//                 />
//               </div>
//             </div>

//             <div className="space-y-1.5">
//               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Location / Zone *</label>
//               <div className="relative">
//                 <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
//                 <input
//                   type="text"
//                   value={form.location}
//                   onChange={(e) => setForm({ ...form, location: e.target.value })}
//                   placeholder="e.g. North Wing"
//                   className="w-full bg-[#151a2e] border border-slate-800 focus:border-emerald-500 rounded-2xl pl-12 pr-5 py-3.5 transition-all outline-none font-bold text-white text-sm placeholder:text-slate-600"
//                 />
//               </div>
//             </div>

//             <div className="space-y-1.5">
//               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Floor Number</label>
//               <div className="relative">
//                 <Layers size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
//                 <input
//                   type="number"
//                   value={form.floor === 0 ? "" : form.floor}
//                   onChange={(e) => setForm({ ...form, floor: e.target.value === "" ? 0 : Number(e.target.value) })}
//                   className="w-full bg-[#151a2e] border border-slate-800 focus:border-emerald-500 rounded-2xl pl-12 pr-5 py-3.5 outline-none font-bold text-white text-sm"
//                 />
//               </div>
//             </div>

//             <div className="space-y-1.5">
//               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Total Capacity</label>
//               <div className="relative">
//                 <Users size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
//                 <input
//                   type="number"
//                   value={form.capacity === 0 ? "" : form.capacity}
//                   onChange={(e) => setForm({ ...form, capacity: e.target.value === "" ? 0 : Number(e.target.value) })}
//                   className="w-full bg-[#151a2e] border border-slate-800 focus:border-emerald-500 rounded-2xl pl-12 pr-5 py-3.5 outline-none font-bold text-white text-sm"
//                 />
//               </div>
//             </div>

//             <div className="md:col-span-2 space-y-1.5">
//               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Amenities (Comma separated)</label>
//               <input
//                 type="text"
//                 value={amenitiesText}
//                 onChange={(e) => setAmenitiesText(e.target.value)}
//                 placeholder="WiFi, Projector, Whiteboard, AC..."
//                 className="w-full bg-[#151a2e] border border-slate-800 focus:border-emerald-500 rounded-2xl px-5 py-3.5 outline-none font-bold text-white text-sm placeholder:text-slate-650"
//               />
//             </div>

//             {!isCreatingNew && (
//               <>
//                 <div className="space-y-1.5">
//                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Operational Status</label>
//                   <select
//                     value={form.status}
//                     onChange={(e) => setForm({ ...form, status: e.target.value as any })}
//                     className="w-full bg-[#151a2e] border border-slate-800 focus:border-emerald-500 rounded-2xl px-5 py-3.5 outline-none font-bold text-white text-sm"
//                   >
//                     <option value="AVAILABLE">AVAILABLE</option>
//                     <option value="OCCUPIED">OCCUPIED</option>
//                     <option value="MAINTENANCE">MAINTENANCE</option>
//                   </select>
//                 </div>

//                 <div className="space-y-1.5">
//                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Visibility</label>
//                   <select
//                     value={form.active ? "true" : "false"}
//                     onChange={(e) => setForm({ ...form, active: e.target.value === "true" })}
//                     className="w-full bg-[#151a2e] border border-slate-800 focus:border-emerald-500 rounded-2xl px-5 py-3.5 outline-none font-bold text-white text-sm"
//                   >
//                     <option value="true">Active (Public)</option>
//                     <option value="false">Inactive (Hidden)</option>
//                   </select>
//                 </div>
//               </>
//             )}

//             {/* Images Grid list Row */}
//             <div className="md:col-span-2 space-y-2 pt-2 border-t border-slate-850">
//               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
//                 Cabin Images
//               </label>
              
//               <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//                 {/* Existing Backend uploaded Images */}
//                 {cabinImages.map((image) => (
//                   <div key={image.id} className="relative group/img overflow-hidden rounded-xl border border-slate-800 h-24 bg-slate-950 shadow-sm">
//                     <img
//                       src={`${API_BASE_URL}${image.imageUrl}`}
//                       alt="Cabin"
//                       className="h-full w-full object-cover transition-transform duration-300 group-hover/img:scale-105"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => handleDeleteImage(image.id)}
//                       className="absolute top-1.5 right-1.5 p-1 bg-rose-500 text-white rounded-lg opacity-0 group-hover/img:opacity-100 transition-opacity hover:bg-rose-600 shadow-md"
//                       title="Delete Image"
//                     >
//                       <Trash2 size={12} />
//                     </button>
//                   </div>
//                 ))}

//                 {/* Selected File uploads previews */}
//                 {selectedFiles.map((file, idx) => (
//                   <div key={idx} className="relative overflow-hidden rounded-xl border border-slate-800 h-24 bg-slate-950 shadow-sm">
//                     <ImagePreview file={file} />
//                     <button
//                       type="button"
//                       onClick={() => setSelectedFiles(prev => prev.filter((_, i) => i !== idx))}
//                       className="absolute top-1.5 right-1.5 p-1 bg-rose-500 text-white rounded-lg shadow-md hover:bg-rose-600 transition-colors"
//                       title="Cancel Upload"
//                     >
//                       <X size={12} />
//                     </button>
//                   </div>
//                 ))}

//                 {/* Upload Image box label */}
//                 <label className="flex flex-col items-center justify-center h-24 border border-dashed border-slate-800 hover:border-emerald-500 rounded-xl cursor-pointer bg-[#151a2e] hover:bg-[#1a2139] transition-all group shadow-sm">
//                   <div className="flex flex-col items-center justify-center text-center p-2">
//                     <Upload size={18} className="text-slate-500 group-hover:text-emerald-400 transition-colors mb-1" />
//                     <p className="text-[10px] font-black text-slate-300 leading-none">Upload</p>
//                     <p className="text-[9px] font-black text-slate-400 uppercase mt-0.5 tracking-tight">Image</p>
//                   </div>
//                   <input
//                     type="file"
//                     multiple
//                     accept="image/*"
//                     onChange={(e) => {
//                       if (!e.target.files) return;
//                       setSelectedFiles(prev => [...prev, ...Array.from(e.target.files!)]);
//                     }}
//                     className="hidden"
//                   />
//                 </label>
//               </div>
//             </div>
//           </div>

//           {/* Form Actions footer bar */}
//           <div className="pt-6 border-t border-slate-850 flex justify-end items-center gap-3 bg-[#111425]/10">
//             <button 
//               onClick={() => {
//                 if (isCreatingNew) {
//                   if (cabins.length > 0) handleSelectCabin(cabins[0]);
//                 } else {
//                   if (selectedCabin) handleSelectCabin(selectedCabin);
//                 }
//               }} 
//               disabled={submitting}
//               className="px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-widest text-slate-400 hover:text-white transition-all disabled:opacity-50"
//             >
//               Discard Changes
//             </button>
            
//             <button
//               onClick={isCreatingNew ? handleCreate : handleUpdate}
//               disabled={submitting}
//               className="px-7 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-500/10 transition-all flex items-center gap-2 disabled:bg-emerald-400 disabled:shadow-none"
//             >
//               {submitting ? (
//                 <div className="h-3 w-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//               ) : (
//                 <Save size={14} />
//               )}
//               {submitting ? "Processing..." : isCreatingNew ? "Create Cabin" : "Update Cabin"}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Linked Today's Schedule Modal Overlay */}
//       {selectedCabin && (
//         <CabinAvailabilityModal
//           open={openAvailabilityModal}
//           cabinId={selectedCabin.id}
//           onClose={() => setOpenAvailabilityModal(false)}
//         />
//       )}
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Edit,
  RefreshCcw,
  Save,
  X,
  MapPin,
  Users,
  Layers,
  Settings2,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Upload,
  Calendar,
  Building2,
  ChevronRight
} from "lucide-react";

import {
  getCabins,
  updateCabin,
  createCabin,
  uploadCabinImages,
  getCabinImages,
  deleteCabinImage,
} from "../../services/api";

import { Cabin, UpdateCabinRequest } from "../../types";
import CabinAvailabilityModal from "../employee/CabinAvailabilityModal";

const API_BASE_URL = "http://localhost:8080";

// Helper component to manage object URLs and prevent memory leaks
function ImagePreview({ file }: { file: File }) {
  const [previewUrl, setPreviewUrl] = useState<string>("");

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    // Revoke the URL when the file changes or the component unmounts
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  if (!previewUrl) return null;

  return (
    <img
      src={previewUrl}
      alt="Preview"
      className="h-full w-full object-cover rounded-xl"
    />
  );
}

export default function CabinManagement() {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [cabins, setCabins] = useState<Cabin[]>([]);
  const [selectedCabin, setSelectedCabin] = useState<Cabin | null>(null);
  const [cabinImages, setCabinImages] = useState<{ id: number; imageUrl: string }[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  
  // State to track if detail panel is in "Create New" draft state
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [openAvailabilityModal, setOpenAvailabilityModal] = useState(false);

  // Detail Panel Fields
  const [amenitiesText, setAmenitiesText] = useState("");
  const [form, setForm] = useState<UpdateCabinRequest>({
    cabinName: "",
    floor: 1,
    capacity: 1,
    location: "",
    amenities: [],
    status: "AVAILABLE",
    active: true,
  });

  const loadCabins = async (selectFirstId?: number | null) => {
    try {
      setLoading(true);
      const response = await getCabins();
      const cabinsList = response.data.data;
      setCabins(cabinsList);

      // Auto select first cabin or previously updated cabin
      if (cabinsList.length > 0) {
        if (selectFirstId) {
          const match = cabinsList.find((c: Cabin) => c.id === selectFirstId);
          if (match) handleSelectCabin(match);
        } else {
          handleSelectCabin(cabinsList[0]);
        }
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? "Unable to load cabins.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCabins();
  }, []);

  const handleSelectCabin = async (cabin: Cabin) => {
    setIsCreatingNew(false);
    setSelectedCabin(cabin);
    setAmenitiesText(cabin.amenities.join(", "));
    setSelectedFiles([]);
    setForm({
      cabinName: cabin.cabinName,
      floor: cabin.floor,
      capacity: cabin.capacity,
      location: cabin.location,
      amenities: cabin.amenities,
      status: cabin.status,
      active: cabin.active,
    });
    try {
      const response = await getCabinImages(cabin.id);
      setCabinImages(response.data.data);
    } catch (error) {
      setCabinImages([]);
    }
  };

  const handleStartCreate = () => {
    setIsCreatingNew(true);
    setSelectedCabin(null);
    setCabinImages([]);
    setSelectedFiles([]);
    setAmenitiesText("");
    setForm({
      cabinName: "",
      floor: 1,
      capacity: 1,
      location: "",
      amenities: [],
      status: "AVAILABLE",
      active: true,
    });
  };

  const validateForm = (name: string, location: string) => {
    if (!name.trim()) {
      toast.error("Cabin Name is required.");
      return false;
    }
    if (!location.trim()) {
      toast.error("Location / Zone is required.");
      return false;
    }
    return true;
  };

  // --- Create logic trigger ---
  const handleCreate = async () => {
    if (!validateForm(form.cabinName, form.location)) return;

    try {
      setSubmitting(true);
      const amenitiesArr = amenitiesText
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      const response = await createCabin({
        cabinName: form.cabinName,
        floor: form.floor,
        capacity: form.capacity,
        location: form.location,
        amenities: amenitiesArr,
      });

      const cabinId = response.data.data.id;

      if (selectedFiles.length > 0) {
        await uploadCabinImages(cabinId, selectedFiles);
      }

      toast.success("Cabin Created Successfully");
      setSelectedFiles([]);
      await loadCabins(cabinId);
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? "Unable to create cabin.");
    } finally {
      setSubmitting(false);
    }
  };

  // --- Update logic trigger ---
  const handleUpdate = async () => {
    if (!selectedCabin) return;
    if (!validateForm(form.cabinName, form.location)) return;

    const finalAmenities = amenitiesText.split(",").map((i) => i.trim()).filter(Boolean);
    
    try {
      setSubmitting(true);
      await updateCabin(selectedCabin.id, { ...form, amenities: finalAmenities });
      
      if (selectedFiles.length > 0) {
        await uploadCabinImages(selectedCabin.id, selectedFiles);
      }

      toast.success("Cabin Updated Successfully");
      setSelectedFiles([]);
      await loadCabins(selectedCabin.id);
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? "Update failed.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteImage = async (imageId: number) => {
    if (!selectedCabin) return;
    try {
      await deleteCabinImage(imageId);
      toast.success("Image deleted successfully");
      
      const response = await getCabinImages(selectedCabin.id);
      setCabinImages(response.data.data);
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? "Failed to delete image.");
    }
  };

  if (loading && cabins.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <div className="h-10 w-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-400 font-bold uppercase text-[10px]">Syncing Assets...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in duration-500 text-slate-800">
      
      {/* LEFT COLUMN: Cabins Selector Master List */}
      <div className="lg:col-span-4 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-emerald-500 font-bold text-xs uppercase tracking-widest mb-1.5">Resource Management</p>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Cabin Inventory</h1>
          </div>
          <button
            onClick={handleStartCreate}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold text-[10px] uppercase tracking-wider transition-all shadow-md shadow-emerald-500/10 active:scale-95 flex-shrink-0"
            title="Register New Cabin"
          >
            <Plus size={14} /> New
          </button>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
          Manage all cabins, their details, availability and status.
        </p>

        {/* Scrollable list card stack */}
        <div className="space-y-3 max-h-[68vh] overflow-y-auto pr-1">
          {cabins.map((cabin) => {
            const isSelected = selectedCabin?.id === cabin.id;
            return (
              <div
                key={cabin.id}
                onClick={() => handleSelectCabin(cabin)}
                className={`p-4 rounded-[20px] border cursor-pointer flex items-center justify-between transition-all duration-300 group ${
                  isSelected
                    ? "bg-[#f1f5f9] border-emerald-500/40 shadow-md shadow-emerald-500/5"
                    : "bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="h-12 w-12 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
                    {cabin.images && cabin.images.length > 0 ? (
                      <img
                        src={`${API_BASE_URL}${cabin.images[0].imageUrl}`}
                        alt={cabin.cabinName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-slate-400">
                        <Building2 size={18} />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-slate-900 text-sm truncate">{cabin.cabinName}</div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase mt-0.5 tracking-tight">Floor {cabin.floor}</div>
                  </div>
                </div>

                {/* Status Indicator */}
                <span className="inline-flex items-center text-[9px] font-black uppercase tracking-wider">
                  <span className={`h-1.5 w-1.5 rounded-full mr-1.5 ${
                    cabin.status === "AVAILABLE" ? "bg-emerald-500 animate-pulse" :
                    cabin.status === "OCCUPIED" ? "bg-rose-500" : "bg-amber-400"
                  }`} />
                  <span className={
                    cabin.status === "AVAILABLE" ? "text-emerald-600" :
                    cabin.status === "OCCUPIED" ? "text-rose-500" : "text-amber-500"
                  }>
                    {cabin.status}
                  </span>
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* RIGHT COLUMN: Active Details Form / Editor */}
      <div className="lg:col-span-8">
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200/50 rounded-[32px] p-8 space-y-6 shadow-xl relative overflow-hidden">
          
          {/* Header Row */}
          <div className="flex items-center justify-between pb-5 border-b border-slate-200">
            <div>
              <p className="text-[10px] font-black text-slate-455 uppercase tracking-widest">
                {isCreatingNew ? "Configuration Panel" : `Cabin Settings • ID: CMS-0${selectedCabin?.id}`}
              </p>
              <h2 className="text-xl font-black text-slate-900 tracking-tight mt-1">
                {isCreatingNew ? "Add New Cabin Resource" : "Edit Cabin Configuration"}
              </h2>
            </div>
            
            <div className="flex items-center gap-2">
              {!isCreatingNew && selectedCabin && (
                <button
                  onClick={() => setOpenAvailabilityModal(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 border border-emerald-500/20 bg-slate-50 hover:bg-slate-100 hover:border-emerald-500/35 text-emerald-600 font-bold text-xs rounded-xl active:scale-95 transition-all shadow-sm"
                >
                  <Calendar size={13} />
                  Today's Schedule
                </button>
              )}
              <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-xl text-slate-650 font-bold text-[10px] uppercase">
                <Edit size={10} /> Direct Editing
              </span>
            </div>
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Cabin Name *</label>
              <div className="relative">
                <Building2 size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={form.cabinName}
                  onChange={(e) => setForm({ ...form, cabinName: e.target.value })}
                  placeholder="e.g. Executive Suite"
                  className="w-full bg-[#f8fafc] border border-slate-200 focus:border-emerald-500 focus:bg-white rounded-2xl pl-12 pr-5 py-3.5 transition-all outline-none font-bold text-slate-800 text-sm placeholder:text-slate-400"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Location / Zone *</label>
              <div className="relative">
                <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  placeholder="e.g. North Wing"
                  className="w-full bg-[#f8fafc] border border-slate-200 focus:border-emerald-500 focus:bg-white rounded-2xl pl-12 pr-5 py-3.5 transition-all outline-none font-bold text-slate-800 text-sm placeholder:text-slate-400"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Floor Number</label>
              <div className="relative">
                <Layers size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="number"
                  value={form.floor === 0 ? "" : form.floor}
                  onChange={(e) => setForm({ ...form, floor: e.target.value === "" ? 0 : Number(e.target.value) })}
                  className="w-full bg-[#f8fafc] border border-slate-200 focus:border-emerald-500 focus:bg-white rounded-2xl pl-12 pr-5 py-3.5 outline-none font-bold text-slate-800 text-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Total Capacity</label>
              <div className="relative">
                <Users size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="number"
                  value={form.capacity === 0 ? "" : form.capacity}
                  onChange={(e) => setForm({ ...form, capacity: e.target.value === "" ? 0 : Number(e.target.value) })}
                  className="w-full bg-[#f8fafc] border border-slate-200 focus:border-emerald-500 focus:bg-white rounded-2xl pl-12 pr-5 py-3.5 outline-none font-bold text-slate-800 text-sm"
                />
              </div>
            </div>

            <div className="md:col-span-2 space-y-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Amenities (Comma separated)</label>
              <input
                type="text"
                value={amenitiesText}
                onChange={(e) => setAmenitiesText(e.target.value)}
                placeholder="WiFi, Projector, Whiteboard, AC..."
                className="w-full bg-[#f8fafc] border border-slate-200 focus:border-emerald-500 focus:bg-white rounded-2xl px-5 py-3.5 outline-none font-bold text-slate-800 text-sm placeholder:text-slate-400"
              />
            </div>

            {!isCreatingNew && (
              <>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Operational Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value as any })}
                    className="w-full bg-[#f8fafc] border border-slate-200 focus:border-emerald-500 rounded-2xl px-5 py-3.5 outline-none font-bold text-slate-800 text-sm"
                  >
                    <option value="AVAILABLE">AVAILABLE</option>
                    <option value="OCCUPIED">OCCUPIED</option>
                    <option value="MAINTENANCE">MAINTENANCE</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Visibility</label>
                  <select
                    value={form.active ? "true" : "false"}
                    onChange={(e) => setForm({ ...form, active: e.target.value === "true" })}
                    className="w-full bg-[#f8fafc] border border-slate-200 focus:border-emerald-500 rounded-2xl px-5 py-3.5 outline-none font-bold text-slate-800 text-sm"
                  >
                    <option value="true">Active (Public)</option>
                    <option value="false">Inactive (Hidden)</option>
                  </select>
                </div>
              </>
            )}

            {/* Images Grid list Row */}
            <div className="md:col-span-2 space-y-2 pt-2 border-t border-slate-205">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
                Cabin Images
              </label>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {/* Existing Backend uploaded Images */}
                {cabinImages.map((image) => (
                  <div key={image.id} className="relative group/img overflow-hidden rounded-xl border border-slate-200 h-24 bg-slate-50 shadow-sm">
                    <img
                      src={`${API_BASE_URL}${image.imageUrl}`}
                      alt="Cabin"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover/img:scale-105"
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteImage(image.id)}
                      className="absolute top-1.5 right-1.5 p-1 bg-rose-500 text-white rounded-lg opacity-0 group-hover/img:opacity-100 transition-opacity hover:bg-rose-600 shadow-md"
                      title="Delete Image"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}

                {/* Selected File uploads previews */}
                {selectedFiles.map((file, idx) => (
                  <div key={idx} className="relative overflow-hidden rounded-xl border border-slate-200 h-24 bg-slate-50 shadow-sm">
                    <ImagePreview file={file} />
                    <button
                      type="button"
                      onClick={() => setSelectedFiles(prev => prev.filter((_, i) => i !== idx))}
                      className="absolute top-1.5 right-1.5 p-1 bg-rose-500 text-white rounded-lg shadow-md hover:bg-rose-600 transition-colors"
                      title="Cancel Upload"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}

                {/* Upload Image box label */}
                <label className="flex flex-col items-center justify-center h-24 border border-dashed border-slate-200 hover:border-emerald-500 rounded-xl cursor-pointer bg-slate-50/40 hover:bg-emerald-50/10 transition-all group shadow-sm">
                  <div className="flex flex-col items-center justify-center text-center p-2">
                    <Upload size={18} className="text-slate-400 group-hover:text-emerald-500 transition-colors mb-1" />
                    <p className="text-[10px] font-black text-slate-600 leading-none">Upload</p>
                    <p className="text-[9px] font-black text-slate-500 uppercase mt-0.5 tracking-tight">Image</p>
                  </div>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => {
                      if (!e.target.files) return;
                      setSelectedFiles(prev => [...prev, ...Array.from(e.target.files!)]);
                    }}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Form Actions footer bar */}
          <div className="pt-6 border-t border-slate-200 flex justify-end items-center gap-3 bg-slate-50/10">
            <button 
              onClick={() => {
                if (isCreatingNew) {
                  if (cabins.length > 0) handleSelectCabin(cabins[0]);
                } else {
                  if (selectedCabin) handleSelectCabin(selectedCabin);
                }
              }} 
              disabled={submitting}
              className="px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-widest text-slate-500 hover:text-slate-800 transition-all disabled:opacity-50"
            >
              Discard Changes
            </button>
            
            <button
              onClick={isCreatingNew ? handleCreate : handleUpdate}
              disabled={submitting}
              className="px-7 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-500/10 transition-all flex items-center gap-2 disabled:bg-emerald-400 disabled:shadow-none"
            >
              {submitting ? (
                <div className="h-3 w-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Save size={14} />
              )}
              {submitting ? "Processing..." : isCreatingNew ? "Create Cabin" : "Update Cabin"}
            </button>
          </div>
        </div>
      </div>

      {/* Linked Today's Schedule Modal Overlay */}
      {selectedCabin && (
        <CabinAvailabilityModal
          open={openAvailabilityModal}
          cabinId={selectedCabin.id}
          onClose={() => setOpenAvailabilityModal(false)}
        />
      )}
    </div>
  );
}