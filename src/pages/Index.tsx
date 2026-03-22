import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import smartceuLogo from "@/assets/smartceu-logo.png";

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260210_031346_d87182fb-b0af-4273-84d1-c6fd17d6bf0f.mp4";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/catalog", hasDropdown: true },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact us", href: "#contact" },
];

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="absolute top-0 left-0 right-0 z-20 px-6 lg:px-[120px] py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={smartceuLogo}
              alt="SmartCEU"
              className="h-20 w-auto object-contain -my-4"
            />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8 ml-12">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="font-manrope font-medium text-sm text-white hover:opacity-80 transition-opacity flex items-center gap-1"
              >
                {link.label}
                {link.hasDropdown && <ChevronDown className="w-3.5 h-3.5" />}
              </Link>
            ))}
          </div>

          {/* Desktop action buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/profile"
              className="font-manrope font-semibold text-sm text-[#171717] bg-white border border-[#d4d4d4] rounded-lg px-5 py-2.5 hover:bg-white/90 transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/catalog"
              className="font-manrope font-semibold text-sm text-[#fafafa] bg-[#7b39fc] rounded-lg px-5 py-2.5 hover:bg-[#6a2de6] transition-colors shadow-md"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-7 h-7" />
          </button>
        </div>
      </nav>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center gap-8"
          >
            <button
              className="absolute top-5 right-6 text-white"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X className="w-7 h-7" />
            </button>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className="font-manrope font-semibold text-2xl text-white hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-3 mt-4 w-64">
              <Link
                to="/profile"
                onClick={() => setMobileOpen(false)}
                className="font-manrope font-semibold text-sm text-center text-[#171717] bg-white rounded-lg px-5 py-3"
              >
                Sign In
              </Link>
              <Link
                to="/catalog"
                onClick={() => setMobileOpen(false)}
                className="font-manrope font-semibold text-sm text-center text-white bg-[#7b39fc] rounded-lg px-5 py-3"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function Index() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover min-h-screen"
      >
        <source src={VIDEO_URL} type="video/mp4" />
      </video>

      {/* Navbar */}
      <Navbar />

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center text-center mt-32 md:mt-44 px-6">
        {/* Tagline pill */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 h-[38px] px-4 rounded-[10px] border backdrop-blur-md mb-8"
          style={{
            background: "rgba(85, 80, 110, 0.4)",
            borderColor: "rgba(164, 132, 215, 0.5)",
          }}
        >
          <span className="bg-[#7b39fc] text-white font-cabin font-medium text-xs px-2.5 py-0.5 rounded-[6px]">
            New
          </span>
          <span className="font-cabin font-medium text-sm text-white">
            Say Hello to SmartCEU v3.2
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-white text-5xl md:text-7xl lg:text-[96px] leading-[1.1] max-w-5xl mb-6"
        >
          Book your perfect stay instantly{" "}
          <em className="mr-1">and</em> hassle-free
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-body font-normal text-lg text-white/70 max-w-[662px] mb-10"
        >
          Discover handpicked hotels, resorts, and stays across your favorite
          destinations. Enjoy exclusive deals, fast booking, and 24/7 support.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            to="/catalog"
            className="font-cabin font-medium text-base text-white bg-[#7b39fc] hover:bg-[#6a2de6] rounded-[10px] px-8 py-3.5 transition-colors shadow-lg"
          >
            Book a Free Demo
          </Link>
          <Link
            to="/dashboard"
            className="font-cabin font-medium text-base text-[#f6f7f9] bg-[#2b2344] hover:bg-[#3a3058] rounded-[10px] px-8 py-3.5 transition-colors"
          >
            Get Started Now
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
