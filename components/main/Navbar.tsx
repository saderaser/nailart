"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
  const router = useRouter();
  const { user, loading, signOut } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-transparent transition-all duration-300 ${
        scrolled ? "py-4" : "py-6"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
        {/* Left: Logo + Text */}
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 md:w-10 md:h-10">
            <Image
              src="/nailart.png"
              alt="NailArt AI Logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-xl md:text-2xl font-bold text-white tracking-tight">
            NailArt AI
          </span>
        </div>

        {/* Center: Features, Pricing, Contact */}
        <div className="hidden md:flex items-center gap-8">
          {["Features", "Pricing", "Contact"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-white/70 hover:text-white transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Right: Auth Button */}
        <div>
          {loading ? (
            <div className="w-24 h-10 rounded-full bg-white/10 animate-pulse" />
          ) : user ? (
            <div className="flex items-center gap-3">
              {user.user_metadata?.avatar_url && (
                <Image
                  src={user.user_metadata.avatar_url}
                  alt="Avatar"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              )}
              <button
                onClick={signOut}
                className="px-5 py-2.5 rounded-full text-sm font-bold text-white border border-white/25 backdrop-blur-md shadow-lg transition-all hover:bg-white/20 cursor-pointer"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,.18), rgba(255,255,255,.06))",
                }}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => router.push("/auth")}
              className="px-5 py-2.5 rounded-full text-sm font-bold text-white border border-white/25 backdrop-blur-md shadow-lg transition-all hover:bg-white/20 cursor-pointer"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,.18), rgba(255,255,255,.06))",
              }}
            >
              Get Started
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
