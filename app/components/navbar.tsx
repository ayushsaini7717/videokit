"use client";

import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

const Navbar=()=>{
    const router=useRouter();
    const {data: session,status}=useSession();
    const [menuOpen, setMenuOpen] = useState(false);

    return <div className="w-full border-b border-gray-300 px-4 py-3 flex items-center justify-between relative">
    <div className="flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play h-8 w-8 text-purple-600">
        <polygon points="6 3 20 12 6 21 6 3" />
      </svg>
      <h1 onClick={()=>router.push("/")} className="cursor-default font-bold text-xl sm:text-2xl">VideoKit</h1>
    </div>

    <div className="hidden sm:flex gap-2 items-center">
      {status === "authenticated" ? (
        <button
          className="py-2 px-4 bg-black text-white font-medium cursor-pointer rounded hover:bg-black/90 transition text-sm"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      ) : (
        <>
          <button
            onClick={() => router.push("/login")}
            className="font-medium hover:bg-gray-100 py-2 px-4 cursor-pointer rounded transition text-sm"
          >
            Login
          </button>
          <button
            onClick={() => router.push("/register")}
            className="py-2 px-4 bg-black text-white font-medium cursor-pointer rounded hover:bg-black/90 transition text-sm"
          >
            Signup
          </button>
        </>
      )}
    </div>

    <button
      className="sm:hidden p-2 rounded hover:bg-gray-100 transition"
      onClick={() => setMenuOpen(!menuOpen)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-gray-700"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        {menuOpen ? (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        )}
      </svg>
    </button>

    {menuOpen && (
      <div className="absolute top-full right-4 mt-2 bg-white border border-gray-200 rounded shadow-md z-50 flex flex-col gap-2 p-3 sm:hidden min-w-[150px]">
        {status === "authenticated" ? (
          <button
            className="py-2 px-4 bg-black text-white font-medium rounded hover:bg-black/90 text-sm text-left"
            onClick={() => {
              signOut();
              setMenuOpen(false);
            }}
          >
            Sign out
          </button>
        ) : (
          <>
            <button
              onClick={() => {
                router.push("/login");
                setMenuOpen(false);
              }}
              className="font-medium hover:bg-gray-100 py-2 px-4 rounded text-sm text-left"
            >
              Login
            </button>
            <button
              onClick={() => {
                router.push("/register");
                setMenuOpen(false);
              }}
              className="py-2 px-4 bg-black text-white font-medium rounded hover:bg-black/90 text-sm text-left"
            >
              Signup
            </button>
          </>
        )}
      </div>
    )}
  </div>
  
}
export default Navbar;