"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import * as PopoverPrimitive from "@radix-ui/react-popover";

export default function DashboardNavbar() {
  const { user, signOut } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-5 py-4 flex items-center justify-between pointer-events-none">
      {/* Left: Floating Logo */}
      <Link
        href="/dashboard"
        className="pointer-events-auto flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border border-white/10 backdrop-blur-xl shadow-lg shadow-black/20 transition-all hover:border-white/20 hover:shadow-xl hover:shadow-black/30"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02))",
        }}
      >
        <div className="relative w-7 h-7">
          <Image
            src="/nailart.png"
            alt="NailArt AI Logo"
            fill
            className="object-contain"
          />
        </div>
        <span className="text-sm font-bold text-white tracking-tight">
          NailArt AI
        </span>
      </Link>

      {/* Right: Floating Profile Popover */}
      <PopoverPrimitive.Root>
        <PopoverPrimitive.Trigger asChild>
          <button
            className="pointer-events-auto flex items-center justify-center w-11 h-11 rounded-2xl border border-white/10 backdrop-blur-xl shadow-lg shadow-black/20 transition-all hover:border-white/20 hover:shadow-xl hover:shadow-black/30 cursor-pointer overflow-hidden"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02))",
            }}
          >
            {user?.user_metadata?.avatar_url ? (
              <Image
                src={user.user_metadata.avatar_url}
                alt="Profile"
                width={44}
                height={44}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white/60 text-sm font-bold">
                {user?.email?.charAt(0).toUpperCase() || "?"}
              </div>
            )}
          </button>
        </PopoverPrimitive.Trigger>

        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            side="bottom"
            align="end"
            sideOffset={8}
            className="z-50 w-56 rounded-2xl border border-white/10 backdrop-blur-xl shadow-2xl shadow-black/40 p-2 animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
            style={{
              background:
                "linear-gradient(180deg, rgba(30,30,30,0.95), rgba(20,20,20,0.98))",
            }}
          >
            {/* User info */}
            <div className="flex items-center gap-3 px-3 py-2.5">
              {user?.user_metadata?.avatar_url ? (
                <Image
                  src={user.user_metadata.avatar_url}
                  alt="Profile"
                  width={36}
                  height={36}
                  className="rounded-full"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/60 text-sm font-bold">
                  {user?.email?.charAt(0).toUpperCase() || "?"}
                </div>
              )}
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-medium text-white truncate">
                  {user?.user_metadata?.full_name || "User"}
                </span>
                <span className="text-xs text-white/40 truncate">
                  {user?.email}
                </span>
              </div>
            </div>

            <div className="h-px bg-white/5 mx-2 my-1" />

            {/* Sign out */}
            <button
              onClick={signOut}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Sign out
            </button>
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>
    </nav>
  );
}
