"use server";
import { auth, signOut } from "@/auth";
import React from "react";
import ClientNavbar from "../client/navbar";

const Navbar = async () => {
  const session = await auth();
  const plan = session?.user.plan.name;

  return <ClientNavbar session={session} plan={plan} />;
};

export default Navbar;

// "use server";

// import { auth, signOut } from "@/auth";
// import Link from "next/link";
// import { FaBars } from "react-icons/fa";

// const Navbar = async () => {
//   const session = await auth();
//   const plan = session?.user.plan.name;

//   if (!session?.user) {
//     return (
//       <div className="select-none absolute left-0 top-0 right-0 h-16 p-5 bg-[#A79277] flex justify-between place-items-center space-x-5">
//         <div className="justify-start place-items-center flex">
//           <Link
//             href="/"
//             className="cursor-pointer font-bold text-[#F6F5F2] hover:text-[#37322b] text-3xl"
//           >
//             PasteWords<span className="text-lg">.com</span>
//           </Link>
//         </div>
//         <div className="space-x-5 justify-end place-items-center hidden md:flex">
//           <Link
//             href="/about"
//             className="cursor-pointer font-semibold text-[#F6F5F2] hover:text-[#37322b] text-lg"
//           >
//             About
//           </Link>
//           <Link
//             href="/pricing"
//             className="cursor-pointer font-semibold text-[#F6F5F2] hover:text-[#37322b] text-lg"
//           >
//             Pricing
//           </Link>
//           <Link
//             href="/auth/login"
//             className="cursor-pointer font-semibold text-[#F6F5F2] hover:text-[#37322b] text-lg"
//           >
//             Log in
//           </Link>
//           <Link
//             href="/auth/signup"
//             className="cursor-pointer bg-[#FFF2E1] hover:bg-[#37322b] hover:text-[#FFF2E1] text-[#A79277] p-1 rounded-sm font-semibold   w-24 text-center text-lg text-nowrap"
//           >
//             Sign Up
//           </Link>
//         </div>
//         <div className="md:hidden flex items-center">
//           <button>
//             <FaBars className="text-[#F6F5F2] text-3xl" />
//           </button>
//         </div>
//         {true && (
//           <div className="fixed top-0 left-0 w-3/4 h-full bg-[#A79277] z-50 p-5">
//             <div className="flex justify-between mb-5">
//               <Link
//                 href="/"
//                 className="cursor-pointer font-bold text-[#F6F5F2] hover:text-[#37322b] text-3xl"
//               >
//                 PasteWords<span className="text-lg">.com</span>
//               </Link>
//               <button className="text-[#F6F5F2] text-3xl">&times;</button>
//             </div>
//             <nav className="flex flex-col space-y-5">
//               <Link
//                 href="/about"
//                 className="cursor-pointer font-semibold text-[#F6F5F2] hover:text-[#37322b] text-lg"
//               >
//                 About
//               </Link>
//               <Link
//                 href="/pricing"
//                 className="cursor-pointer font-semibold text-[#F6F5F2] hover:text-[#37322b] text-lg"
//               >
//                 Pricing
//               </Link>
//               <Link
//                 href="/auth/login"
//                 className="cursor-pointer font-semibold text-[#F6F5F2] hover:text-[#37322b] text-lg"
//               >
//                 Log in
//               </Link>
//               <Link
//                 href="/auth/signup"
//                 className="cursor-pointer bg-[#FFF2E1] hover:bg-[#37322b] hover:text-[#FFF2E1] text-[#A79277] p-1 rounded-sm font-semibold w-full text-center text-lg text-nowrap"
//               >
//                 Sign Up
//               </Link>
//             </nav>
//           </div>
//         )}
//       </div>
//     );
//   } else {
//     return (
//       <div className="select-none absolute left-0 top-0 right-0 h-16 p-5 bg-[#A79277] flex justify-between place-items-center space-x-5">
//         <div className="justify-start place-items-center flex">
//           <h2 className="cursor-pointer font-bold text-[#F6F5F2] hover:text-[#37322b] text-3xl">
//             PasteWords<span className="text-lg">.com</span>
//           </h2>
//         </div>
//         <div className="space-x-5 justify-end place-items-center hidden md:flex">
//           <form
//             action={async () => {
//               "use server";
//               await signOut({ redirectTo: "/" });
//             }}
//           >
//             <button
//               type="submit"
//               className="cursor-pointer font-semibold text-[#F6F5F2] hover:text-[#37322b] text-lg"
//             >
//               Sign out
//             </button>
//           </form>
//           <div className="cursor-pointer bg-[#FFF2E1] hover:bg-[#37322b] hover:text-[#FFF2E1] text-[#A79277] p-1 px-3 rounded-sm font-semibold text-center text-lg text-nowrap">
//             My {plan ? plan : ""} Account
//           </div>
//         </div>
//         <div className="md:hidden flex items-center">
//           <button>
//             <FaBars className="text-[#F6F5F2] text-3xl" />
//           </button>
//         </div>
//         {true && (
//           <div className="fixed top-0 left-0 w-3/4 h-full bg-[#A79277] z-50 p-5">
//             <div className="flex justify-between mb-5">
//               <h2 className="cursor-pointer font-bold text-[#F6F5F2] hover:text-[#37322b] text-3xl">
//                 PasteWords<span className="text-lg">.com</span>
//               </h2>
//               <button className="text-[#F6F5F2] text-3xl">&times;</button>
//             </div>
//             <nav className="flex flex-col space-y-5">
//               <form
//                 action={async () => {
//                   "use server";
//                   await signOut({ redirectTo: "/" });
//                 }}
//               >
//                 <button
//                   type="submit"
//                   className="cursor-pointer font-semibold text-[#F6F5F2] hover:text-[#37322b] text-lg"
//                 >
//                   Sign out
//                 </button>
//               </form>
//               <div className="cursor-pointer bg-[#FFF2E1] hover:bg-[#37322b] hover:text-[#FFF2E1] text-[#A79277] p-1 px-3 rounded-sm font-semibold text-center text-lg text-nowrap">
//                 My {plan ? plan : ""} Account
//               </div>
//             </nav>
//           </div>
//         )}
//       </div>
//     );
//   }
// };

// export default Navbar;
