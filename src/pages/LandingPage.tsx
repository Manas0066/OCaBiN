// import { motion } from "framer-motion";
// import {
//   ArrowRight,
//   CalendarCheck,
//   Clock3,
//   ShieldCheck,
//   Building2,
//   CheckCircle2,
// } from "lucide-react";
// import { Link } from "react-router-dom";

// const features = [
//   {
//     icon: CalendarCheck,
//     title: "Smart Booking",
//     description:
//       "Reserve cabins effortlessly with an intuitive booking experience.",
//   },
//   {
//     icon: Clock3,
//     title: "Real-Time Availability",
//     description:
//       "Instantly know which cabins are available and avoid scheduling conflicts.",
//   },
//   {
//     icon: ShieldCheck,
//     title: "Secure Access",
//     description:
//       "JWT authentication with role-based access for administrators and employees.",
//   },
// ];

// export default function LandingPage() {
//   return (
//     <div className="min-h-screen bg-[#090D16] text-white overflow-x-hidden">
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

//         <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-emerald-500/20 blur-[140px]" />

//         <div className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[150px]" />
//       </div>

//       {/* Navbar */}
//       <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/10">
//         <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
//           <div className="flex items-center gap-3">
//             <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500">
//               <Building2 size={22} />
//             </div>

//             <div>
//               <h1 className="text-2xl font-bold">OCaBIN</h1>
//               <p className="text-xs text-slate-400">
//                 Cabin Booking Platform
//               </p>
//             </div>
//           </div>

//           <nav className="hidden md:flex items-center gap-10 text-slate-300">
//             <a href="#features" className="hover:text-white transition">
//               Features
//             </a>

//             <a href="#preview" className="hover:text-white transition">
//               Preview
//             </a>
//           </nav>

//           <Link
//             to="/login"
//             className="rounded-xl bg-emerald-500 px-5 py-3 font-semibold transition hover:bg-emerald-400"
//           >
//             Login
//           </Link>
//         </div>
//       </header>

//       {/* Hero */}
//       <section className="mx-auto flex max-w-7xl flex-col items-center gap-16 px-6 py-20 lg:flex-row">
//         {/* Left */}
//         <motion.div
//           initial={{ opacity: 0, x: -40 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: .7 }}
//           className="flex-1"
//         >
//           <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400">
//             Smart Office Management
//           </span>

//           <h1 className="mt-8 text-5xl font-extrabold leading-tight lg:text-7xl">
//             Book Smarter.
//             <br />
//             Meet Better.
//           </h1>

//           <p className="mt-8 max-w-xl text-lg leading-8 text-slate-400">
//             OCaBIN helps organizations manage meeting cabins with
//             real-time availability, conflict-free scheduling,
//             secure authentication, and a seamless booking experience.
//           </p>

//           <div className="mt-10 flex flex-wrap gap-5">
//             <Link
//               to="/login"
//               className="flex items-center gap-2 rounded-2xl bg-emerald-500 px-8 py-4 font-semibold transition hover:bg-emerald-400"
//             >
//               Get Started
//               <ArrowRight size={18} />
//             </Link>

//             <a
//               href="#features"
//               className="rounded-2xl border border-white/10 px-8 py-4 transition hover:border-emerald-500"
//             >
//               View Features
//             </a>
//           </div>

//           <div className="mt-12 flex flex-wrap gap-6 text-sm text-slate-400">
//             <div className="flex items-center gap-2">
//               <CheckCircle2 className="text-emerald-400" size={18} />
//               Conflict-Free Booking
//             </div>

//             <div className="flex items-center gap-2">
//               <CheckCircle2 className="text-emerald-400" size={18} />
//               Real-Time Availability
//             </div>

//             <div className="flex items-center gap-2">
//               <CheckCircle2 className="text-emerald-400" size={18} />
//               Secure Access
//             </div>
//           </div>
//         </motion.div>

//         {/* Right */}
//         <motion.div
//           id="preview"
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: .8 }}
//           className="flex-1"
//         >
//           <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-2xl">
//             <div className="mb-6 flex items-center justify-between">
//               <h2 className="text-xl font-semibold">
//                 Dashboard Preview
//               </h2>

//               <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-sm text-emerald-400">
//                 Live
//               </span>
//             </div>

//             <div className="space-y-5">
//               <div className="rounded-2xl bg-[#111425] p-5">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="font-semibold">Cabin A</p>
//                     <p className="text-sm text-slate-400">
//                       Floor 2
//                     </p>
//                   </div>

//                   <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-sm text-emerald-400">
//                     Available
//                   </span>
//                 </div>
//               </div>

//               <div className="rounded-2xl bg-[#111425] p-5">
//                 <h3 className="mb-4 font-semibold">
//                   Today's Schedule
//                 </h3>

//                 <div className="space-y-3">
//                   <div className="h-3 rounded-full bg-emerald-500 w-2/3" />

//                   <div className="h-3 rounded-full bg-slate-700 w-1/3" />

//                   <div className="h-3 rounded-full bg-emerald-500 w-4/5" />

//                   <div className="h-3 rounded-full bg-slate-700 w-2/5" />
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div className="rounded-2xl bg-[#111425] p-5">
//                   <p className="text-3xl font-bold">24</p>
//                   <p className="text-sm text-slate-400">
//                     Today's Bookings
//                   </p>
//                 </div>

//                 <div className="rounded-2xl bg-[#111425] p-5">
//                   <p className="text-3xl font-bold text-emerald-400">
//                     8
//                   </p>
//                   <p className="text-sm text-slate-400">
//                     Available Cabins
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </section>

//       {/* Features */}
//       <section
//         id="features"
//         className="mx-auto max-w-7xl px-6 py-20"
//       >
//         <div className="text-center">
//           <h2 className="text-4xl font-bold">
//             Everything You Need
//           </h2>

//           <p className="mt-4 text-slate-400">
//             Designed to simplify cabin management for modern workplaces.
//           </p>
//         </div>

//         <div className="mt-16 grid gap-8 md:grid-cols-3">
//           {features.map((feature) => {
//             const Icon = feature.icon;

//             return (
//               <motion.div
//                 whileHover={{
//                   y: -8,
//                 }}
//                 key={feature.title}
//                 className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition"
//               >
//                 <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/20">
//                   <Icon
//                     className="text-emerald-400"
//                     size={28}
//                   />
//                 </div>

//                 <h3 className="text-xl font-semibold">
//                   {feature.title}
//                 </h3>

//                 <p className="mt-4 leading-7 text-slate-400">
//                   {feature.description}
//                 </p>
//               </motion.div>
//             );
//           })}
//         </div>
//       </section>

//       {/* CTA */}
//       <section className="mx-auto max-w-7xl px-6 pb-20">
//         <div className="rounded-[32px] border border-white/10 bg-gradient-to-r from-emerald-500/20 to-cyan-500/10 p-12 text-center backdrop-blur-xl">
//           <h2 className="text-4xl font-bold">
//             Ready to Get Started?
//           </h2>

//           <p className="mt-4 text-slate-300">
//             Sign in and manage your cabins with OCaBIN.
//           </p>

//           <Link
//             to="/login"
//             className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-emerald-500 px-8 py-4 font-semibold transition hover:bg-emerald-400"
//           >
//             Login
//             <ArrowRight size={18} />
//           </Link>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="border-t border-white/10 py-8 text-center text-slate-500">
//         © {new Date().getFullYear()} OCaBIN • Cabin Management System
//       </footer>
//     </div>
//   );
// }
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarCheck,
  Clock3,
  ShieldCheck,
  Building2,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";
import DotField from "../components/DotField";

const features = [
  {
    icon: CalendarCheck,
    title: "Smart Booking",
    description:
      "Reserve cabins effortlessly with an intuitive booking experience.",
  },
  {
    icon: Clock3,
    title: "Real-Time Availability",
    description:
      "Instantly know which cabins are available and avoid scheduling conflicts.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Access",
    description:
      "JWT authentication with role-based access for administrators and employees.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 overflow-x-hidden relative">
      
      {/* Interactive Dot Field Animation Background */}
      <div className="absolute inset-0 -z-10">
        <DotField
          dotRadius={1.5}
          dotSpacing={18}
          bulgeStrength={65}
          glowRadius={220}
          sparkle={false}
          waveAmplitude={1.5} /* Adds a very soft organic fluid wave to the dots */
          cursorRadius={450}
          cursorForce={0.1}
          bulgeOnly
          gradientFrom="rgba(16, 185, 129, 0.16)"
          gradientTo="rgba(20, 184, 166, 0.12)"
          glowColor="rgba(16, 185, 129, 0.05)"
        />
        
        {/* Layout background ambient lighting */}
        <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-emerald-500/5 blur-[140px]" />
        <div className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-cyan-500/5 blur-[150px]" />
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-slate-200/50 bg-white/60">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500 text-white">
              <Building2 size={22} />
            </div>

            <div>
              <h1 className="text-2xl font-black text-slate-900 leading-none">OCaBiN</h1>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">
                Cabin Booking Platform
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-10 text-slate-600 font-bold text-sm">
            <a href="#features" className="hover:text-emerald-600 transition">
              Features
            </a>
            <a href="#preview" className="hover:text-emerald-600 transition">
              Preview
            </a>
          </nav>

          <Link
            to="/login"
            className="rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-white transition hover:bg-emerald-600 shadow-md shadow-emerald-500/10"
          >
            Login
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto flex max-w-7xl flex-col items-center gap-16 px-6 py-20 lg:flex-row">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex-1"
        >
          <span className="rounded-full border border-emerald-500/20 bg-emerald-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-emerald-600">
            Smart Office Management
          </span>

          <h1 className="mt-8 text-5xl font-extrabold leading-tight lg:text-7xl text-slate-900 tracking-tight">
            Book Smarter.
            <br />
            Meet Better.
          </h1>

          <p className="mt-8 max-w-xl text-md leading-relaxed text-slate-600 font-medium">
            OCaBiN helps organizations manage meeting cabins with
            real-time availability, conflict-free scheduling,
            secure authentication, and a seamless booking experience.
          </p>

          <div className="mt-10 flex flex-wrap gap-5">
            <Link
              to="/login"
              className="flex items-center gap-2 rounded-2xl bg-emerald-500 px-8 py-4 font-semibold text-white transition hover:bg-emerald-600 shadow-lg shadow-emerald-500/15"
            >
              Get Started
              <ArrowRight size={18} />
            </Link>

            <a
              href="#features"
              className="rounded-2xl border border-slate-200 bg-white/80 px-8 py-4 font-bold text-sm text-slate-700 hover:border-emerald-500/40 hover:bg-white transition"
            >
              View Features
            </a>
          </div>

          <div className="mt-12 flex flex-wrap gap-6 text-xs text-slate-500 font-bold uppercase tracking-wide">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="text-emerald-500" size={18} />
              Conflict-Free Booking
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle2 className="text-emerald-500" size={18} />
              Real-Time Availability
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle2 className="text-emerald-500" size={18} />
              Secure Access
            </div>
          </div>
        </motion.div>

        {/* Right */}
        <motion.div
          id="preview"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 w-full"
        >
          <div className="rounded-3xl border border-slate-200/50 bg-white/70 p-6 backdrop-blur-xl shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-black text-slate-900">
                Dashboard Preview
              </h2>

              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600 border border-emerald-100/50">
                Live
              </span>
            </div>

            <div className="space-y-5">
              <div className="rounded-2xl bg-[#f8fafc] border border-slate-100 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-extrabold text-slate-900 text-sm">Cabin A</p>
                    <p className="text-xs font-bold text-slate-500 uppercase mt-0.5">
                      Floor 2
                    </p>
                  </div>

                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
                    Available
                  </span>
                </div>
              </div>

              <div className="rounded-2xl bg-[#f8fafc] border border-slate-100 p-5">
                <h3 className="mb-4 font-black text-slate-900 text-sm">
                  Today's Schedule
                </h3>

                <div className="space-y-3">
                  <div className="h-3 rounded-full bg-emerald-500 w-2/3 shadow-sm shadow-emerald-500/10" />
                  <div className="h-3 rounded-full bg-slate-200 w-1/3" />
                  <div className="h-3 rounded-full bg-emerald-500 w-4/5 shadow-sm shadow-emerald-500/10" />
                  <div className="h-3 rounded-full bg-slate-200 w-2/5" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-[#f8fafc] border border-slate-100 p-5">
                  <p className="text-3xl font-black text-slate-900">24</p>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mt-1">
                    Today's Bookings
                  </p>
                </div>

                <div className="rounded-2xl bg-[#f8fafc] border border-slate-100 p-5">
                  <p className="text-3xl font-black text-emerald-600">8</p>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mt-1">
                    Available Cabins
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="mx-auto max-w-7xl px-6 py-20"
      >
        <div className="text-center max-w-lg mx-auto">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">
            Everything You Need
          </h2>
          <p className="mt-4 text-slate-500 font-medium">
            Designed to simplify cabin management for modern workplaces.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <motion.div
                whileHover={{
                  y: -8,
                }}
                key={feature.title}
                className="rounded-3xl border border-slate-200 bg-white/70 p-8 backdrop-blur-xl transition hover:border-emerald-500/30"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 border border-emerald-100/50">
                  <Icon
                    className="text-emerald-600"
                    size={28}
                  />
                </div>

                <h3 className="text-lg font-black text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-relaxed text-sm font-medium text-slate-500">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-[32px] border border-slate-200/60 bg-gradient-to-r from-emerald-500/10 to-teal-500/5 p-12 text-center backdrop-blur-xl">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">
            Ready to Get Started?
          </h2>

          <p className="mt-4 text-slate-600 font-medium">
            Sign in and manage your cabins with OCaBiN.
          </p>

          <Link
            to="/login"
            className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-emerald-500 px-8 py-4 font-semibold text-white transition hover:bg-emerald-600 shadow-lg shadow-emerald-500/10"
          >
            Login
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-8 text-center text-slate-500 font-bold text-xs uppercase tracking-wider">
        © {new Date().getFullYear()} OCaBiN • Cabin Management System
      </footer>
    </div>
  );
}