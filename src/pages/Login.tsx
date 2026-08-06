// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import {
//   Eye,
//   EyeOff,
//   LogIn,
//   ArrowLeft,
//   Building2,
//   CalendarCheck,
//   ShieldCheck,
//   Clock3,
// } from "lucide-react";
// import { motion } from "framer-motion";

// import { login } from "../services/api";

// export default function Login() {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const handleSubmit = async (
//     e: React.FormEvent<HTMLFormElement>
//   ) => {
//     e.preventDefault();

//     if (!email || !password) {
//       toast.error("Please enter email and password.");
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await login({
//         email,
//         password,
//       });

//       const data = response.data.data;

//       if (data.passwordChangeRequired) {
//         sessionStorage.setItem(
//           "changePasswordEmail",
//           email
//         );

//         toast.success(
//           "Please change your temporary password."
//         );

//         navigate("/change-password", {
//           replace: true,
//         });

//         return;
//       }

//       localStorage.setItem("token", data.token);

//       localStorage.setItem(
//         "user",
//         JSON.stringify(data.user)
//       );

//       toast.success("Login Successful");

//       if (data.user.role === "ADMIN") {
//         navigate("/admin/dashboard", {
//           replace: true,
//         });
//       } else {
//         navigate("/employee/dashboard", {
//           replace: true,
//         });
//       }
//     } catch (error: any) {
//       toast.error(
//         error?.response?.data?.message ??
//           "Invalid Credentials"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="relative min-h-screen overflow-hidden bg-[#090D16] text-white">

//       {/* Background */}

//       <div className="absolute inset-0 -z-10">

//         <div
//           className="absolute inset-0 opacity-15"
//           style={{
//             backgroundImage:
//               "radial-gradient(circle, rgba(255,255,255,.18) 1px, transparent 1px)",
//             backgroundSize: "28px 28px",
//           }}
//         />

//         <div className="absolute left-0 top-0 h-[450px] w-[450px] rounded-full bg-emerald-500/20 blur-[140px]" />

//         <div className="absolute right-0 bottom-0 h-[450px] w-[450px] rounded-full bg-cyan-500/15 blur-[160px]" />
//       </div>

//       {/* Top Bar */}

//       <header className="flex items-center justify-between px-8 py-6">

//         <Link
//           to="/"
//           className="flex items-center gap-2 text-slate-300 hover:text-white transition"
//         >
//           <ArrowLeft size={18} />
//           Back to Home
//         </Link>

//         <div className="flex items-center gap-3">

//           <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500">
//             <Building2 size={22} />
//           </div>

//           <div>
//             <h2 className="text-xl font-bold">
//               OCaBIN
//             </h2>

//             <p className="text-xs text-slate-400">
//               Cabin Booking Platform
//             </p>
//           </div>

//         </div>

//       </header>

//       <div className="mx-auto flex min-h-[calc(100vh-90px)] max-w-7xl items-center px-6">

//         {/* Left Panel */}

//         <motion.div
//           initial={{ opacity: 0, x: -40 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: .7 }}
//           className="hidden flex-1 lg:block"
//         >

//           <h1 className="text-6xl font-extrabold leading-tight">
//             Welcome
//             <br />
//             Back.
//           </h1>

//           <p className="mt-6 max-w-lg text-lg leading-8 text-slate-400">
//             Access your workspace, manage cabin bookings,
//             and collaborate efficiently with real-time
//             availability and secure scheduling.
//           </p>

//           <div className="mt-12 grid gap-6">

//             <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
//               <CalendarCheck className="text-emerald-400" size={28} />

//               <div>
//                 <h3 className="font-semibold">
//                   Smart Booking
//                 </h3>

//                 <p className="text-sm text-slate-400">
//                   Reserve cabins in seconds.
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
//               <Clock3 className="text-cyan-400" size={28} />

//               <div>
//                 <h3 className="font-semibold">
//                   Live Availability
//                 </h3>

//                 <p className="text-sm text-slate-400">
//                   Always know what's available.
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
//               <ShieldCheck className="text-emerald-400" size={28} />

//               <div>
//                 <h3 className="font-semibold">
//                   Secure Access
//                 </h3>

//                 <p className="text-sm text-slate-400">
//                   JWT Authentication with role-based security.
//                 </p>
//               </div>
//             </div>

//           </div>

//         </motion.div>
//                 {/* Right Panel */}

//         <motion.div
//           initial={{ opacity: 0, x: 40 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.7 }}
//           className="flex flex-1 items-center justify-center"
//         >
//           <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl shadow-2xl">

//             <div className="mb-8 text-center">

//               <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500">
//                 <Building2 size={30} />
//               </div>

//               <h2 className="text-4xl font-bold">
//                 Sign In
//               </h2>

//               <p className="mt-3 text-slate-400">
//                 Sign in to continue to OCaBIN
//               </p>

//             </div>

//             <form
//               onSubmit={handleSubmit}
//               className="space-y-6"
//             >

//               <div>

//                 <label className="mb-2 block text-sm font-medium text-slate-300">
//                   Email Address
//                 </label>

//                 <input
//                   type="email"
//                   placeholder="Enter your email"
//                   value={email}
//                   onChange={(e) =>
//                     setEmail(e.target.value)
//                   }
//                   className="w-full rounded-2xl border border-white/10 bg-[#111425] px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30"
//                 />

//               </div>

//               <div>

//                 <label className="mb-2 block text-sm font-medium text-slate-300">
//                   Password
//                 </label>

//                 <div className="relative">

//                   <input
//                     type={
//                       showPassword
//                         ? "text"
//                         : "password"
//                     }
//                     placeholder="Enter password"
//                     value={password}
//                     onChange={(e) =>
//                       setPassword(e.target.value)
//                     }
//                     className="w-full rounded-2xl border border-white/10 bg-[#111425] px-4 py-3 pr-14 text-white placeholder:text-slate-500 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30"
//                   />

//                   <button
//                     type="button"
//                     onClick={() =>
//                       setShowPassword(
//                         !showPassword
//                       )
//                     }
//                     className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition"
//                   >
//                     {showPassword ? (
//                       <EyeOff size={20} />
//                     ) : (
//                       <Eye size={20} />
//                     )}
//                   </button>

//                 </div>

//               </div>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 py-3 font-semibold text-white transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
//               >
//                 <LogIn size={18} />

//                 {loading
//                   ? "Signing In..."
//                   : "Sign In"}
//               </button>

//               <div className="pt-4 text-center text-sm text-slate-400">
//                 Access is invitation-only.
//                 <br />
//                 Contact your administrator if you need an account.
//               </div>

//             </form>

//           </div>

//         </motion.div>

//       </div>
//           </div>
//   );
// }
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Eye,
  EyeOff,
  LogIn,
  ArrowLeft,
  Building2,
  CalendarCheck,
  ShieldCheck,
  Clock3,
} from "lucide-react";
import { motion } from "framer-motion";

import { login } from "../services/api";
import DotField from "../components/DotField";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await login({
        email,
        password,
      });

      const data = response.data.data;

      if (data.passwordChangeRequired) {
        sessionStorage.setItem(
          "changePasswordEmail",
          email
        );

        toast.success(
          "Please change your temporary password."
        );

        navigate("/change-password", {
          replace: true,
        });

        return;
      }

      localStorage.setItem("token", data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      toast.success("Login Successful");

      if (data.user.role === "ADMIN") {
        navigate("/admin/dashboard", {
          replace: true,
        });
      } else {
        navigate("/employee/dashboard", {
          replace: true,
        });
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          "Invalid Credentials"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f8fafc] text-slate-800">

      {/* Interactive Dot Field Animation Background Layer */}
      <div className="absolute inset-0 -z-10">
        <DotField
          dotRadius={1.5}
          dotSpacing={18}
          bulgeStrength={65}
          glowRadius={180}
          sparkle={false}
          waveAmplitude={1}
          cursorRadius={400}
          cursorForce={0.08}
          bulgeOnly
          gradientFrom="rgba(16, 185, 129, 0.16)" /* Soft emerald dots */
          gradientTo="rgba(20, 184, 166, 0.12)"    /* Soft teal dots */
          glowColor="rgba(16, 185, 129, 0.05)"     /* Gentle emerald cursor tracker */
        />
        
        {/* Soft background ambient light glows */}
        <div className="absolute left-1/4 top-1/4 h-[450px] w-[450px] rounded-full bg-emerald-500/5 blur-[140px]" />
        <div className="absolute right-1/4 bottom-1/4 h-[450px] w-[450px] rounded-full bg-cyan-500/5 blur-[160px]" />
      </div>

      {/* Top Bar Navigation */}
      <header className="flex items-center justify-between px-8 py-6 relative z-10">
        <Link
          to="/"
          className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 font-bold text-sm transition-colors duration-200"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/10">
            <Building2 size={22} />
          </div>

          <div>
            <h2 className="text-xl font-black text-slate-900">
              OCaBiN
            </h2>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">
              Cabin Booking Platform
            </p>
          </div>
        </div>
      </header>

      {/* Page Content Panel Container */}
      <div className="mx-auto flex min-h-[calc(100vh-90px)] max-w-7xl items-center px-6 relative z-10">

        {/* Left Welcome Panel (Hidden on Mobile) */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .7 }}
          className="hidden flex-1 lg:block pr-12"
        >
          <h1 className="text-6xl font-black leading-tight tracking-tight text-slate-900">
            Welcome
            <br />
            Back.
          </h1>

          <p className="mt-6 max-w-lg text-md leading-relaxed text-slate-600 font-medium">
            Access your workspace, manage cabin bookings,
            and collaborate efficiently with real-time
            availability and secure scheduling.
          </p>

          <div className="mt-12 grid gap-5 max-w-lg">
            {/* Spec Card 1 */}
            <div className="flex items-center gap-4 rounded-2xl border border-slate-200/50 bg-white/75 p-5 backdrop-blur-xl shadow-sm hover:border-emerald-500/30 transition-all duration-300">
              <CalendarCheck className="text-emerald-500" size={28} />
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm">
                  Smart Booking
                </h3>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wide mt-0.5">
                  Reserve cabins in seconds.
                </p>
              </div>
            </div>

            {/* Spec Card 2 */}
            <div className="flex items-center gap-4 rounded-2xl border border-slate-200/50 bg-white/75 p-5 backdrop-blur-xl shadow-sm hover:border-emerald-500/30 transition-all duration-300">
              <Clock3 className="text-emerald-600" size={28} />
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm">
                  Live Availability
                </h3>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wide mt-0.5">
                  Always know what's available.
                </p>
              </div>
            </div>

            {/* Spec Card 3 */}
            <div className="flex items-center gap-4 rounded-2xl border border-slate-200/50 bg-white/75 p-5 backdrop-blur-xl shadow-sm hover:border-emerald-500/30 transition-all duration-300">
              <ShieldCheck className="text-emerald-500" size={28} />
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm">
                  Secure Access
                </h3>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wide mt-0.5">
                  JWT Authentication with role security.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Panel - Form Card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-1 items-center justify-center w-full"
        >
          <div className="w-full max-w-md rounded-[32px] border border-slate-200/50 bg-white/80 p-8 backdrop-blur-xl shadow-2xl hover:border-emerald-500/10 duration-300">

            <div className="mb-8 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/15">
                <Building2 size={30} />
              </div>
              <h2 className="text-3xl font-black tracking-tight text-slate-900">
                Sign In
              </h2>
              <p className="mt-2 text-xs font-bold text-slate-500 uppercase tracking-wide">
                Sign in to continue to OCaBIN
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Address */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-550 uppercase tracking-widest ml-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-[#f8fafc] focus:bg-white px-4 py-3.5 text-slate-800 placeholder:text-slate-400 outline-none transition duration-300 focus:border-emerald-500 font-bold text-sm"
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-550 uppercase tracking-widest ml-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-[#f8fafc] focus:bg-white px-4 py-3.5 pr-14 text-slate-800 placeholder:text-slate-400 outline-none transition duration-300 focus:border-emerald-500 font-bold text-sm"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-800 transition"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Submit Action Button */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 py-3.5 font-black text-xs uppercase tracking-widest text-white shadow-xl shadow-emerald-500/10 transition-all duration-300 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <LogIn size={16} />
                )}
                {loading ? "Signing In..." : "Sign In"}
              </button>

              {/* Info text */}
              <div className="pt-4 text-center text-xs text-slate-500 leading-relaxed font-semibold">
                Access is invitation-only.
                <br />
                Contact your administrator if you need an account.
              </div>
            </form>
          </div>
        </motion.div>

      </div>
    </div>
  );
}