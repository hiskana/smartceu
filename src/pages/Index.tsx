import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, X, ArrowRight, Play, Sparkles, CreditCard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import smartceuLogo from "@/assets/smartceu-logo.png";

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260210_031346_d87182fb-b0af-4273-84d1-c6fd17d6bf0f.mp4";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Catalog", href: "/catalog", hasDropdown: true },
  { label: "Progress", href: "/dashboard" },
  { label: "Profile", href: "/profile" },
];

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="absolute top-0 left-0 right-0 z-20 px-6 lg:px-[120px] py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={smartceuLogo} alt="SmartCEU" className="h-20 w-auto object-contain -my-4" />
          </Link>

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

          <button className="md:hidden text-white" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <Menu className="w-7 h-7" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center gap-8"
          >
            <button className="absolute top-5 right-6 text-white" onClick={() => setMobileOpen(false)} aria-label="Close menu">
              <X className="w-7 h-7" />
            </button>
            {navLinks.map((link) => (
              <Link key={link.label} to={link.href} onClick={() => setMobileOpen(false)} className="font-manrope font-semibold text-2xl text-white hover:text-primary transition-colors">
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-3 mt-4 w-64">
              <Link to="/profile" onClick={() => setMobileOpen(false)} className="font-manrope font-semibold text-sm text-center text-[#171717] bg-white rounded-lg px-5 py-3">
                Sign In
              </Link>
              <Link to="/catalog" onClick={() => setMobileOpen(false)} className="font-manrope font-semibold text-sm text-center text-white bg-[#7b39fc] rounded-lg px-5 py-3">
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
    <div className="min-h-screen">
      {/* Hero — Video background */}
      <section className="relative min-h-screen overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover min-h-screen">
          <source src={VIDEO_URL} type="video/mp4" />
        </video>

        <Navbar />

        <div className="relative z-10 flex flex-col items-center text-center mt-32 md:mt-44 px-6">
          {/* Tagline pill */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 h-[38px] px-4 rounded-[10px] border backdrop-blur-md mb-8"
            style={{ background: "rgba(85, 80, 110, 0.4)", borderColor: "rgba(164, 132, 215, 0.5)" }}
          >
            <span className="bg-[#7b39fc] text-white font-cabin font-medium text-xs px-2.5 py-0.5 rounded-[6px]">New</span>
            <span className="font-cabin font-medium text-sm text-white">Continuing Education, Reimagined</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-white text-5xl md:text-7xl lg:text-[96px] leading-[1.1] max-w-5xl mb-6"
          >
            Modern CE
            <br />
            Made <em>Easy.</em>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-body font-normal text-lg text-white/70 max-w-[662px] mb-10"
          >
            Short-form video courses designed for busy nurses. No PDFs. No tedious tests.
            Just fast, engaging continuing education — completed in minutes.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link to="/catalog" className="font-cabin font-medium text-base text-white bg-[#7b39fc] hover:bg-[#6a2de6] rounded-[10px] px-8 py-3.5 transition-colors shadow-lg inline-flex items-center gap-2 justify-center">
              Browse Courses <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/dashboard" className="font-cabin font-medium text-base text-[#f6f7f9] bg-[#2b2344] hover:bg-[#3a3058] rounded-[10px] px-8 py-3.5 transition-colors inline-flex items-center gap-2 justify-center">
              <Play className="w-4 h-4" /> View Progress
            </Link>
          </motion.div>

          {/* Floating device frame */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-20 max-w-3xl w-full mx-auto"
          >
            <div className="device-frame bg-card p-1">
              <div className="rounded-[20px] overflow-hidden bg-background">
                <div className="h-8 bg-secondary flex items-center gap-2 px-4">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-destructive/60" />
                    <div className="w-3 h-3 rounded-full bg-accent/60" />
                    <div className="w-3 h-3 rounded-full bg-primary/30" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="bg-muted rounded-md px-4 py-1">
                      <span className="text-[10px] text-muted-foreground font-mono">smartceu.app</span>
                    </div>
                  </div>
                </div>
                <div className="p-8 md:p-12 text-left">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-bold tracking-tight text-foreground">SmartCEU Dashboard</p>
                      <p className="text-[11px] text-muted-foreground">3 of 30 CEU hours completed</p>
                    </div>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden mb-4">
                    <div className="h-full bg-primary rounded-full" style={{ width: '10%' }} />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {['🧠 Implicit Bias', '📦 30-Hr Bundle', '🔥 Burnout'].map((label, i) => (
                      <div key={i} className="bg-muted rounded-xl p-3 text-center">
                        <p className="text-xs font-semibold text-foreground">{label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Value props — Light studio section */}
      <section className="section-light">
        <div className="container py-24 md:py-40">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="section-marker block mb-4">The Paradigm</span>
            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-foreground leading-[1.1]">
              The Eternal Challenge,
              <br />
              <span className="text-primary">Solved.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Play, number: "9", unit: "min", title: "Short-Form Video", description: "Sub-9 minute visual modules. Learn on breaks, during commutes, or between shifts." },
              { icon: Sparkles, number: "0", unit: "tests", title: "No Tests Required", description: "Legal attestation model replaces antiquated scantron-style quizzes." },
              { icon: CreditCard, number: "1", unit: "×", title: "One-Time Payment", description: "Transparent flat fees. Pay once, keep your certificate forever." },
            ].map((prop, i) => (
              <motion.div
                key={prop.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="studio-card p-8 md:p-10"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <prop.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="stat-number text-5xl text-foreground">{prop.number}</span>
                  <span className="text-lg font-semibold text-muted-foreground">{prop.unit}</span>
                </div>
                <h3 className="text-lg font-bold tracking-tight mb-2">{prop.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{prop.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section>
        <div className="container py-16 md:py-20">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {["BRN Approved", "BVNPT Approved", "CE Broker Ready"].map((label) => (
              <span key={label} className="meta-label text-sm">{label}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — Dark section */}
      <section className="section-dark relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[100px]" />
        </div>
        <div className="container relative z-10 py-24 md:py-40 text-center">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <span className="section-marker block mb-6" style={{ color: 'hsl(0 0% 55%)' }}>Begin</span>
            <h2 className="font-serif text-5xl md:text-7xl text-white mb-6 leading-[1.1]">
              Showcase in
              <br />
              <span className="text-primary">Perfection.</span>
            </h2>
            <p className="text-sm font-light leading-relaxed text-white/50 max-w-md mx-auto mb-10">
              Join thousands of nurses who've switched to smarter continuing education.
            </p>
            <Link to="/catalog" className="font-cabin font-medium text-base text-white bg-[#7b39fc] hover:bg-[#6a2de6] rounded-[10px] px-8 py-3.5 transition-colors shadow-lg inline-flex items-center gap-2">
              Start Learning <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
