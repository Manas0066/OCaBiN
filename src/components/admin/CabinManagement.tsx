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
//   Plus
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
//       className="h-28 w-full rounded-xl object-cover border"
//     />
//   );
// }

// export default function CabinManagement() {
//   const [loading, setLoading] = useState(true);
//   const [cabins, setCabins] = useState<Cabin[]>([]);
//   const [selectedCabin, setSelectedCabin] = useState<Cabin | null>(null);
//   const [cabinImages, setCabinImages] = useState<{ id: number; imageUrl: string }[]>([]);
  
//   // Create Modal States
//   const [createOpen, setCreateOpen] = useState(false);
//   const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
//   const [createForm, setCreateForm] = useState({
//     cabinName: "",
//     floor: 1,
//     capacity: 1,
//     location: "",
//     amenitiesText: "",
//   });

//   // Edit Modal States
//   const [open, setOpen] = useState(false);
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

//   const loadCabins = async () => {
//     try {
//       setLoading(true);
//       const response = await getCabins();
//       setCabins(response.data.data);
//     } catch (err: any) {
//       toast.error(err?.response?.data?.message ?? "Unable to load cabins.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadCabins();
//   }, []);

//   // --- Create Logic ---
//   const handleCreate = async () => {
//     try {
//       const response = await createCabin({
//         cabinName: createForm.cabinName,
//         floor: createForm.floor,
//         capacity: createForm.capacity,
//         location: createForm.location,
//         amenities: createForm.amenitiesText
//           .split(",")
//           .map((item) => item.trim())
//           .filter(Boolean),
//       });

//       const cabinId = response.data.data.id;

//       if (selectedFiles.length > 0) {
//         await uploadCabinImages(cabinId, selectedFiles);
//       }

//       toast.success("Cabin Created Successfully");
//       setCreateOpen(false);

//       setCreateForm({
//         cabinName: "",
//         floor: 1,
//         capacity: 1,
//         location: "",
//         amenitiesText: "",
//       });
//       setSelectedFiles([]);
//       await loadCabins();
//     } catch (err: any) {
//       toast.error(err?.response?.data?.message ?? "Unable to create cabin.");
//     }
//   };

//   // --- Edit Logic ---
//   const handleEdit = async (cabin: Cabin) => {
//     setSelectedCabin(cabin);
//     setAmenitiesText(cabin.amenities.join(", "));
//     setSelectedFiles([]); // Reset previously selected file uploads
//     setForm({
//       cabinName: cabin.cabinName,
//       floor: cabin.floor,
//       capacity: cabin.capacity,
//       location: cabin.location,
//       amenities: cabin.amenities,
//       status: cabin.status,
//       active: cabin.active,
//     });
//     setOpen(true);
//     try {
//       const response = await getCabinImages(cabin.id);
//       setCabinImages(response.data.data);
//     } catch (error) {
//       toast.error("Unable to load cabin images.");
//     }
//   };

//   const handleUpdate = async () => {
//     if (!selectedCabin) return;
//     const finalAmenities = amenitiesText.split(",").map((i) => i.trim()).filter(Boolean);
    
//     try {
//       // Update details
//       await updateCabin(selectedCabin.id, { ...form, amenities: finalAmenities });
      
//       // Upload any new images added during edit
//       if (selectedFiles.length > 0) {
//         await uploadCabinImages(selectedCabin.id, selectedFiles);
//       }

//       toast.success("Cabin Updated Successfully");
//       setOpen(false);
//       setSelectedFiles([]);
//       await loadCabins();
//     } catch (err: any) {
//       toast.error(err?.response?.data?.message ?? "Update failed.");
//     }
//   };

//   const handleDeleteImage = async (imageId: number) => {
//     if (!selectedCabin) return;
//     try {
//       await deleteCabinImage(imageId);
//       toast.success("Image deleted successfully");
      
//       // Refresh local images view list
//       const response = await getCabinImages(selectedCabin.id);
//       setCabinImages(response.data.data);
      
//       // Refresh parent cabins list to update the thumbnail if needed
//       await loadCabins();
//     } catch (err: any) {
//       toast.error(err?.response?.data?.message ?? "Failed to delete image.");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
//         <div className="h-10 w-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
//         <p className="text-slate-400 font-bold uppercase text-[10px]">Syncing Assets...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
//       {/* Top Header Section */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
//         <div>
//           <p className="text-emerald-500 font-bold text-xs uppercase tracking-widest mb-2">Resource Management</p>
//           <h1 className="text-3xl font-black text-slate-900 tracking-tight">Cabin Inventory</h1>
//         </div>
        
//         <div className="flex gap-3 w-full md:w-auto">
//           <button
//             onClick={() => {
//               setCreateOpen(true);
//               setSelectedFiles([]);
//             }}
//             className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-500 text-white rounded-2xl font-black text-sm shadow-xl shadow-emerald-500/20 hover:bg-emerald-600 transition-all active:scale-95"
//           >
//             <Plus size={18} />
//             Create Cabin
//           </button>
//           <button
//             onClick={loadCabins}
//             className="flex items-center justify-center gap-2 px-6 py-3.5 bg-white border border-slate-200 rounded-2xl text-slate-600 font-bold text-sm hover:bg-slate-50 transition-all active:scale-95"
//           >
//             <RefreshCcw size={18} />
//             Refresh
//           </button>
//         </div>
//       </div>

//       {/* Main Table */}
//       <div className="overflow-x-auto pb-4">
//         <table className="modern-table">
//           <thead>
//             <tr>
//               <th>Cabin Details</th>
//               <th>Specifications</th>
//               <th>Status</th>
//               <th>Visibility</th>
//               <th className="text-right">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {cabins.map((cabin) => (
//               <tr key={cabin.id} className="group">
//                 <td className="min-w-[200px]">
//                   <div className="flex items-center gap-4">
//                     <div className="h-14 w-14 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
//                       {cabin.images && cabin.images.length > 0 ? (
//                         <img
//                           src={`http://localhost:8080${cabin.images[0].imageUrl}`}
//                           alt={cabin.cabinName}
//                           className="w-full h-full object-cover"
//                         />
//                       ) : (
//                         <div className="h-full w-full flex items-center justify-center text-slate-400">
//                           <Layers size={20} />
//                         </div>
//                       )}
//                     </div>
//                     <div>
//                       <div className="font-black text-slate-900">{cabin.cabinName}</div>
//                       <div className="text-[10px] text-slate-400 font-bold uppercase mt-0.5 tracking-tight">
//                          <MapPin size={10} className="inline mr-1" />{cabin.location}
//                       </div>
//                     </div>
//                   </div>
//                 </td>
//                 <td>
//                   <div className="flex flex-col gap-1">
//                     <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
//                       <Users size={12} className="text-slate-400" /> {cabin.capacity} Seats
//                     </div>
//                     <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Floor {cabin.floor}</div>
//                   </div>
//                 </td>
//                 <td>
//                   <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tight border ${
//                     cabin.status === "AVAILABLE" ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-amber-50 text-amber-700 border-amber-100"
//                   }`}>
//                     {cabin.status}
//                   </span>
//                 </td>
//                 <td>
//                   <div className="flex items-center gap-2">
//                     {cabin.active ? <CheckCircle2 size={16} className="text-emerald-500" /> : <AlertCircle size={16} className="text-slate-300" />}
//                     <span className={`text-[10px] font-bold uppercase ${cabin.active ? "text-slate-700" : "text-slate-400"}`}>
//                       {cabin.active ? "Public" : "Hidden"}
//                     </span>
//                   </div>
//                 </td>
//                 <td className="text-right">
//                   <button
//                     onClick={() => handleEdit(cabin)}
//                     className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-xl font-bold text-xs hover:bg-slate-800 transition-all active:scale-95"
//                   >
//                     <Edit size={14} /> Edit
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* --- CREATE MODAL --- */}
//       {createOpen && (
//         <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
//           <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
//             <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
//               <div className="flex items-center gap-3">
//                 <div className="h-10 w-10 bg-emerald-500 rounded-2xl flex items-center justify-center text-white">
//                   <Plus size={20} />
//                 </div>
//                 <div>
//                   <h2 className="text-xl font-black text-slate-900 tracking-tight">New Resource</h2>
//                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Register a new cabin</p>
//                 </div>
//               </div>
//               <button onClick={() => setCreateOpen(false)} className="text-slate-400 hover:text-slate-900"><X size={24} /></button>
//             </div>

//             {/* Added: max-height and scrolling to keep fields on screen */}
//             <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[65vh] overflow-y-auto">
//               <div className="space-y-1.5">
//                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Cabin Name</label>
//                 <input
//                   placeholder="e.g. Executive Suite"
//                   value={createForm.cabinName}
//                   onChange={(e)=>setCreateForm({...createForm, cabinName:e.target.value})}
//                   className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl px-5 py-3.5 transition-all outline-none font-bold text-slate-700"
//                 />
//               </div>

//               <div className="space-y-1.5">
//                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Location / Zone</label>
//                 <input
//                   placeholder="e.g. North Wing"
//                   value={createForm.location}
//                   onChange={(e)=>setCreateForm({...createForm, location:e.target.value})}
//                   className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl px-5 py-3.5 transition-all outline-none font-bold text-slate-700"
//                 />
//               </div>

//               <div className="space-y-1.5">
//                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Floor Number</label>
//                 <input
//                   type="number"
//                   value={createForm.floor === 0 ? "" : createForm.floor}
//                   onChange={(e)=>setCreateForm({...createForm, floor: e.target.value === "" ? 0 : Number(e.target.value)})}
//                   className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl px-5 py-3.5 transition-all outline-none font-bold text-slate-700"
//                 />
//               </div>

//               <div className="space-y-1.5">
//                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Total Capacity</label>
//                 <input
//                   type="number"
//                   value={createForm.capacity === 0 ? "" : createForm.capacity}
//                   onChange={(e)=>setCreateForm({...createForm, capacity: e.target.value === "" ? 0 : Number(e.target.value)})}
//                   className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl px-5 py-3.5 transition-all outline-none font-bold text-slate-700"
//                 />
//               </div>

//               <div className="md:col-span-2 space-y-1.5">
//                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Amenities (Comma separated)</label>
//                 <input
//                   placeholder="WiFi, Projector, Whiteboard..."
//                   value={createForm.amenitiesText}
//                   onChange={(e)=>setCreateForm({...createForm, amenitiesText:e.target.value})}
//                   className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl px-5 py-3.5 transition-all outline-none font-bold text-slate-700"
//                 />
//               </div>
              
//               <div className="md:col-span-2 space-y-2">
//                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
//                   Cabin Images
//                 </label>
//                 <input
//                   type="file"
//                   multiple
//                   accept="image/*"
//                   onChange={(e) => {
//                     if (!e.target.files) return;
//                     setSelectedFiles(Array.from(e.target.files));
//                   }}
//                   className="w-full bg-slate-50 rounded-2xl px-4 py-3 text-sm text-slate-500"
//                 />
//               </div>

//               {selectedFiles.length > 0 && (
//                 <div className="md:col-span-2 grid grid-cols-3 gap-4 mt-2">
//                   {selectedFiles.map((file, index) => (
//                     <ImagePreview key={index} file={file} />
//                   ))}
//                 </div>
//               )}
//             </div>

//             <div className="p-8 bg-slate-50/50 flex justify-end gap-3">
//               <button onClick={() => setCreateOpen(false)} className="px-6 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-widest text-slate-500">Discard</button>
//               <button
//                 onClick={handleCreate}
//                 className="px-8 py-3.5 bg-emerald-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-500/20 hover:bg-emerald-600 transition-all flex items-center gap-2"
//               >
//                 <Save size={16} /> Create Resource
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
      
//       {/* --- EDIT MODAL --- */}
//       {open && (
//         <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
//           <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
//             <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
//               <div className="flex items-center gap-3">
//                 <div className="h-10 w-10 bg-slate-900 rounded-2xl flex items-center justify-center text-emerald-400">
//                   <Settings2 size={20} />
//                 </div>
//                 <div>
//                   <h2 className="text-xl font-black text-slate-900 tracking-tight">Modify Resource</h2>
//                   <p className="text-xs text-slate-400 font-bold uppercase mt-0.5 tracking-widest">ID: CMS-0{selectedCabin?.id}</p>
//                 </div>
//               </div>
//               <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-slate-900"><X size={24} /></button>
//             </div>

//             {/* Main grid with height restriction and scrolling */}
//             <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[65vh] overflow-y-auto">
//               <div className="space-y-1.5">
//                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Cabin Name</label>
//                 <input
//                   type="text"
//                   value={form.cabinName}
//                   onChange={(e) => setForm({ ...form, cabinName: e.target.value })}
//                   className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl px-5 py-3.5 transition-all outline-none font-bold text-slate-700"
//                 />
//               </div>

//               <div className="space-y-1.5">
//                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Location</label>
//                 <input
//                   type="text"
//                   value={form.location}
//                   onChange={(e) => setForm({ ...form, location: e.target.value })}
//                   className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl px-5 py-3.5 transition-all outline-none font-bold text-slate-700"
//                 />
//               </div>

//               <div className="space-y-1.5">
//                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Floor Number</label>
//                 <input
//                   type="number"
//                   value={form.floor === 0 ? "" : form.floor}
//                   onChange={(e) => setForm({ ...form, floor: e.target.value === "" ? 0 : Number(e.target.value) })}
//                   className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl px-5 py-3.5 outline-none font-bold text-slate-700"
//                 />
//               </div>

//               <div className="space-y-1.5">
//                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Total Capacity</label>
//                 <input
//                   type="number"
//                   value={form.capacity === 0 ? "" : form.capacity}
//                   onChange={(e) => setForm({ ...form, capacity: e.target.value === "" ? 0 : Number(e.target.value) })}
//                   className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl px-5 py-3.5 outline-none font-bold text-slate-700"
//                 />
//               </div>

//               <div className="md:col-span-2 space-y-1.5">
//                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Amenities (Comma separated)</label>
//                 <input
//                   type="text"
//                   value={amenitiesText}
//                   onChange={(e) => setAmenitiesText(e.target.value)}
//                   className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl px-5 py-3.5 outline-none font-bold text-slate-700"
//                 />
//               </div>

//               <div className="space-y-1.5">
//                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Status</label>
//                 <select
//                   value={form.status}
//                   onChange={(e) => setForm({ ...form, status: e.target.value as any })}
//                   className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl px-5 py-3.5 outline-none font-bold text-slate-700"
//                 >
//                   <option value="AVAILABLE">AVAILABLE</option>
//                   <option value="OCCUPIED">OCCUPIED</option>
//                   <option value="MAINTENANCE">MAINTENANCE</option>
//                 </select>
//               </div>

//               <div className="space-y-1.5">
//                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Visibility</label>
//                 <select
//                   value={form.active ? "true" : "false"}
//                   onChange={(e) => setForm({ ...form, active: e.target.value === "true" })}
//                   className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl px-5 py-3.5 outline-none font-bold text-slate-700"
//                 >
//                   <option value="true">Active</option>
//                   <option value="false">Inactive</option>
//                 </select>
//               </div>

//               {/* Fixed Layout: Relocated Current Images block into the grid context */}
//               <div className="md:col-span-2 space-y-2 pt-2 border-t border-slate-100">
//                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
//                   Current Images
//                 </label>
//                 {cabinImages.length === 0 ? (
//                   <p className="text-xs text-slate-400 italic ml-1">No images uploaded.</p>
//                 ) : (
//                   <div className="grid grid-cols-3 gap-4">
//                     {cabinImages.map((image) => (
//                       <div key={image.id} className="relative group/img overflow-hidden rounded-xl border border-slate-100">
//                         <img
//                           src={`http://localhost:8080${image.imageUrl}`}
//                           alt="Cabin"
//                           className="h-28 w-full object-cover"
//                         />
//                         {/* Hover Overlay Delete Button */}
//                         <button
//                           type="button"
//                           onClick={() => handleDeleteImage(image.id)}
//                           className="absolute top-2 right-2 p-1.5 bg-rose-500 text-white rounded-lg opacity-0 group-hover/img:opacity-100 transition-opacity hover:bg-rose-600 duration-150 shadow-md"
//                           title="Delete image"
//                         >
//                           <X size={14} />
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* Added: Upload New Images field context in Edit Modal */}
//               <div className="md:col-span-2 space-y-2 pt-2 border-t border-slate-100">
//                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
//                   Upload New Images
//                 </label>
//                 <input
//                   type="file"
//                   multiple
//                   accept="image/*"
//                   onChange={(e) => {
//                     if (!e.target.files) return;
//                     setSelectedFiles(Array.from(e.target.files));
//                   }}
//                   className="w-full bg-slate-50 rounded-2xl px-4 py-3 text-sm text-slate-500"
//                 />
//                 {selectedFiles.length > 0 && (
//                   <div className="grid grid-cols-3 gap-4 mt-2">
//                     {selectedFiles.map((file, index) => (
//                       <ImagePreview key={index} file={file} />
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Clean Footer Area */}
//             <div className="p-8 bg-slate-50/50 flex justify-end gap-3 border-t border-slate-100">
//               <button 
//                 onClick={() => setOpen(false)} 
//                 className="px-6 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-widest text-slate-500 hover:bg-slate-100 transition-all"
//               >
//                 Discard
//               </button>
//               <button
//                 onClick={handleUpdate}
//                 className="px-8 py-3.5 bg-emerald-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-500/20 hover:bg-emerald-600 transition-all flex items-center gap-2"
//               >
//                 <Save size={16} /> Save Changes
//               </button>
//             </div>
//           </div>
//         </div>
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
  Image as ImageIcon
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
    <div className="relative group border border-slate-100 rounded-xl overflow-hidden shadow-sm">
      <img
        src={previewUrl}
        alt="Preview"
        className="h-28 w-full object-cover"
      />
    </div>
  );
}

export default function CabinManagement() {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [cabins, setCabins] = useState<Cabin[]>([]);
  const [selectedCabin, setSelectedCabin] = useState<Cabin | null>(null);
  const [cabinImages, setCabinImages] = useState<{ id: number; imageUrl: string }[]>([]);
  
  // Create Modal States
  const [createOpen, setCreateOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [createForm, setCreateForm] = useState({
    cabinName: "",
    floor: 1,
    capacity: 1,
    location: "",
    amenitiesText: "",
  });

  // Edit Modal States
  const [open, setOpen] = useState(false);
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

  const loadCabins = async () => {
    try {
      setLoading(true);
      const response = await getCabins();
      setCabins(response.data.data);
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? "Unable to load cabins.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCabins();
  }, []);

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

  // --- Create Logic ---
  const handleCreate = async () => {
    if (!validateForm(createForm.cabinName, createForm.location)) return;

    try {
      setSubmitting(true);
      const response = await createCabin({
        cabinName: createForm.cabinName,
        floor: createForm.floor,
        capacity: createForm.capacity,
        location: createForm.location,
        amenities: createForm.amenitiesText
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      });

      const cabinId = response.data.data.id;

      if (selectedFiles.length > 0) {
        await uploadCabinImages(cabinId, selectedFiles);
      }

      toast.success("Cabin Created Successfully");
      setCreateOpen(false);

      setCreateForm({
        cabinName: "",
        floor: 1,
        capacity: 1,
        location: "",
        amenitiesText: "",
      });
      setSelectedFiles([]);
      await loadCabins();
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? "Unable to create cabin.");
    } finally {
      setSubmitting(false);
    }
  };

  // --- Edit Logic ---
  const handleEdit = async (cabin: Cabin) => {
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
    setOpen(true);
    try {
      const response = await getCabinImages(cabin.id);
      setCabinImages(response.data.data);
    } catch (error) {
      toast.error("Unable to load cabin images.");
    }
  };

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
      setOpen(false);
      setSelectedFiles([]);
      await loadCabins();
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
      await loadCabins();
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? "Failed to delete image.");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <div className="h-10 w-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-400 font-bold uppercase text-[10px]">Syncing Assets...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <p className="text-emerald-500 font-bold text-xs uppercase tracking-widest mb-2">Resource Management</p>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Cabin Inventory</h1>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <button
            onClick={() => {
              setCreateOpen(true);
              setSelectedFiles([]);
            }}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-500 text-white rounded-2xl font-black text-sm shadow-xl shadow-emerald-500/20 hover:bg-emerald-600 transition-all active:scale-95"
          >
            <Plus size={18} />
            Create Cabin
          </button>
          <button
            onClick={loadCabins}
            className="flex items-center justify-center gap-2 px-6 py-3.5 bg-white border border-slate-200 rounded-2xl text-slate-600 font-bold text-sm hover:bg-slate-50 transition-all active:scale-95"
          >
            <RefreshCcw size={18} />
            Refresh
          </button>
        </div>
      </div>

      {/* Main Table / Empty State conditional display */}
      {cabins.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-slate-50 border border-dashed border-slate-200 rounded-[32px] text-center space-y-4">
          <div className="h-16 w-16 bg-white rounded-2xl flex items-center justify-center shadow-sm text-slate-400">
            <Layers size={32} />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900">No Cabins Found</h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto mt-1">Get started by creating your first cabin resource to manage capacity, configurations, and assets.</p>
          </div>
          <button
            onClick={() => setCreateOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-2xl font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/10 hover:bg-emerald-600 transition-all"
          >
            <Plus size={16} /> Create Cabin
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto pb-4">
          <table className="modern-table">
            <thead>
              <tr>
                <th>Cabin Details</th>
                <th>Specifications</th>
                <th>Status</th>
                <th>Visibility</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cabins.map((cabin) => (
                <tr key={cabin.id} className="group">
                  <td className="min-w-[200px]">
                    <div className="flex items-center gap-4">
                      <div className="h-14 w-14 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                        {cabin.images && cabin.images.length > 0 ? (
                          <img
                            src={`${API_BASE_URL}${cabin.images[0].imageUrl}`}
                            alt={cabin.cabinName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-slate-400">
                            <Layers size={20} />
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="font-black text-slate-900">{cabin.cabinName}</div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase mt-0.5 tracking-tight">
                           <MapPin size={10} className="inline mr-1" />{cabin.location}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                        <Users size={12} className="text-slate-400" /> {cabin.capacity} Seats
                      </div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Floor {cabin.floor}</div>
                    </div>
                  </td>
                  <td>
                    <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tight border ${
                      cabin.status === "AVAILABLE" ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-amber-50 text-amber-700 border-amber-100"
                    }`}>
                      {cabin.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      {cabin.active ? <CheckCircle2 size={16} className="text-emerald-500" /> : <AlertCircle size={16} className="text-slate-300" />}
                      <span className={`text-[10px] font-bold uppercase ${cabin.active ? "text-slate-700" : "text-slate-400"}`}>
                        {cabin.active ? "Public" : "Hidden"}
                      </span>
                    </div>
                  </td>
                  <td className="text-right">
                    <button
                      onClick={() => handleEdit(cabin)}
                      className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-xl font-bold text-xs hover:bg-slate-800 transition-all active:scale-95"
                    >
                      <Edit size={14} /> Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* --- CREATE MODAL --- */}
      {createOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-emerald-500 rounded-2xl flex items-center justify-center text-white">
                  <Plus size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">New Resource</h2>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Register a new cabin</p>
                </div>
              </div>
              <button onClick={() => setCreateOpen(false)} className="text-slate-400 hover:text-slate-900"><X size={24} /></button>
            </div>

            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[65vh] overflow-y-auto">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Cabin Name *</label>
                <input
                  placeholder="e.g. Executive Suite"
                  value={createForm.cabinName}
                  onChange={(e)=>setCreateForm({...createForm, cabinName:e.target.value})}
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl px-5 py-3.5 transition-all outline-none font-bold text-slate-700"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Location / Zone *</label>
                <input
                  placeholder="e.g. North Wing"
                  value={createForm.location}
                  onChange={(e)=>setCreateForm({...createForm, location:e.target.value})}
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl px-5 py-3.5 transition-all outline-none font-bold text-slate-700"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Floor Number</label>
                <input
                  type="number"
                  value={createForm.floor === 0 ? "" : createForm.floor}
                  onChange={(e)=>setCreateForm({...createForm, floor: e.target.value === "" ? 0 : Number(e.target.value)})}
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl px-5 py-3.5 transition-all outline-none font-bold text-slate-700"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Total Capacity</label>
                <input
                  type="number"
                  value={createForm.capacity === 0 ? "" : createForm.capacity}
                  onChange={(e)=>setCreateForm({...createForm, capacity: e.target.value === "" ? 0 : Number(e.target.value)})}
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl px-5 py-3.5 transition-all outline-none font-bold text-slate-700"
                />
              </div>

              <div className="md:col-span-2 space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Amenities (Comma separated)</label>
                <input
                  placeholder="WiFi, Projector, Whiteboard..."
                  value={createForm.amenitiesText}
                  onChange={(e)=>setCreateForm({...createForm, amenitiesText:e.target.value})}
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl px-5 py-3.5 transition-all outline-none font-bold text-slate-700"
                />
              </div>
              
              {/* Refined: Custom File upload label */}
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Cabin Images
                </label>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-200 hover:border-emerald-400 rounded-2xl cursor-pointer bg-slate-50 hover:bg-emerald-50/20 transition-all group">
                  <div className="flex flex-col items-center justify-center pt-4 pb-4">
                    <Upload size={22} className="text-slate-400 group-hover:text-emerald-500 transition-colors mb-2" />
                    <p className="text-xs font-bold text-slate-600">Select files to upload</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Supports PNG, JPG, JPEG</p>
                  </div>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => {
                      if (!e.target.files) return;
                      setSelectedFiles(Array.from(e.target.files));
                    }}
                    className="hidden"
                  />
                </label>
              </div>

              {selectedFiles.length > 0 && (
                <div className="md:col-span-2 grid grid-cols-3 gap-4 mt-2">
                  {selectedFiles.map((file, index) => (
                    <ImagePreview key={index} file={file} />
                  ))}
                </div>
              )}
            </div>

            <div className="p-8 bg-slate-50/50 flex justify-end gap-3">
              <button 
                onClick={() => setCreateOpen(false)} 
                disabled={submitting}
                className="px-6 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-widest text-slate-500 disabled:opacity-50"
              >
                Discard
              </button>
              <button
                onClick={handleCreate}
                disabled={submitting}
                className="px-8 py-3.5 bg-emerald-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-500/20 hover:bg-emerald-600 transition-all flex items-center gap-2 disabled:bg-emerald-400 disabled:shadow-none"
              >
                {submitting ? (
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Save size={16} />
                )}
                {submitting ? "Creating..." : "Create Resource"}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* --- EDIT MODAL --- */}
      {open && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-slate-900 rounded-2xl flex items-center justify-center text-emerald-400">
                  <Settings2 size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">Modify Resource</h2>
                  <p className="text-xs text-slate-400 font-bold uppercase mt-0.5 tracking-widest">ID: CMS-0{selectedCabin?.id}</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-slate-900"><X size={24} /></button>
            </div>

            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[65vh] overflow-y-auto">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Cabin Name *</label>
                <input
                  type="text"
                  value={form.cabinName}
                  onChange={(e) => setForm({ ...form, cabinName: e.target.value })}
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl px-5 py-3.5 transition-all outline-none font-bold text-slate-700"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Location *</label>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl px-5 py-3.5 transition-all outline-none font-bold text-slate-700"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Floor Number</label>
                <input
                  type="number"
                  value={form.floor === 0 ? "" : form.floor}
                  onChange={(e) => setForm({ ...form, floor: e.target.value === "" ? 0 : Number(e.target.value) })}
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl px-5 py-3.5 outline-none font-bold text-slate-700"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Total Capacity</label>
                <input
                  type="number"
                  value={form.capacity === 0 ? "" : form.capacity}
                  onChange={(e) => setForm({ ...form, capacity: e.target.value === "" ? 0 : Number(e.target.value) })}
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl px-5 py-3.5 outline-none font-bold text-slate-700"
                />
              </div>

              <div className="md:col-span-2 space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Amenities (Comma separated)</label>
                <input
                  type="text"
                  value={amenitiesText}
                  onChange={(e) => setAmenitiesText(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl px-5 py-3.5 outline-none font-bold text-slate-700"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value as any })}
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl px-5 py-3.5 outline-none font-bold text-slate-700 text-sm"
                >
                  <option value="AVAILABLE">AVAILABLE</option>
                  <option value="OCCUPIED">OCCUPIED</option>
                  <option value="MAINTENANCE">MAINTENANCE</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Visibility</label>
                <select
                  value={form.active ? "true" : "false"}
                  onChange={(e) => setForm({ ...form, active: e.target.value === "true" })}
                  className="w-full bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl px-5 py-3.5 outline-none font-bold text-slate-700 text-sm"
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>

              <div className="md:col-span-2 space-y-2 pt-2 border-t border-slate-100">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1.5">
                  <ImageIcon size={12} className="text-slate-400" /> Current Images
                </label>
                {cabinImages.length === 0 ? (
                  <p className="text-xs text-slate-400 italic ml-1">No images uploaded.</p>
                ) : (
                  <div className="grid grid-cols-3 gap-4">
                    {cabinImages.map((image) => (
                      <div key={image.id} className="relative group/img overflow-hidden rounded-xl border border-slate-100">
                        <img
                          src={`${API_BASE_URL}${image.imageUrl}`}
                          alt="Cabin"
                          className="h-28 w-full object-cover"
                        />
                        {/* Improved Action: Trash Icon button overlay */}
                        <button
                          type="button"
                          onClick={() => handleDeleteImage(image.id)}
                          className="absolute top-2 right-2 p-1.5 bg-rose-500 text-white rounded-lg opacity-0 group-hover/img:opacity-100 transition-opacity hover:bg-rose-600 duration-150 shadow-md"
                          title="Delete image"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="md:col-span-2 space-y-2 pt-2 border-t border-slate-100">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  Upload New Images
                </label>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-200 hover:border-emerald-400 rounded-2xl cursor-pointer bg-slate-50 hover:bg-emerald-50/20 transition-all group">
                  <div className="flex flex-col items-center justify-center pt-4 pb-4">
                    <Upload size={22} className="text-slate-400 group-hover:text-emerald-500 transition-colors mb-2" />
                    <p className="text-xs font-bold text-slate-600">Select files to upload</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Supports PNG, JPG, JPEG</p>
                  </div>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => {
                      if (!e.target.files) return;
                      setSelectedFiles(Array.from(e.target.files));
                    }}
                    className="hidden"
                  />
                </label>
                {selectedFiles.length > 0 && (
                  <div className="grid grid-cols-3 gap-4 mt-2">
                    {selectedFiles.map((file, index) => (
                      <ImagePreview key={index} file={file} />
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="p-8 bg-slate-50/50 flex justify-end gap-3 border-t border-slate-100">
              <button 
                onClick={() => setOpen(false)} 
                disabled={submitting}
                className="px-6 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-widest text-slate-500 hover:bg-slate-100 transition-all disabled:opacity-50"
              >
                Discard
              </button>
              <button
                onClick={handleUpdate}
                disabled={submitting}
                className="px-8 py-3.5 bg-emerald-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-500/20 hover:bg-emerald-600 transition-all flex items-center gap-2 disabled:bg-emerald-400 disabled:shadow-none"
              >
                {submitting ? (
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Save size={16} />
                )}
                {submitting ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}