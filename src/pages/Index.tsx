import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Index() {
  return (
    <div className="min-h-screen">
      {/* Hero — massive typographic impact */}
      <section className="border-b border-foreground/10">
        <div className="container py-24 md:py-40">
          <div className="grid md:grid-cols-2 gap-16 items-end">
            {/* Left — metadata + body */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <span className="section-marker block mb-12">01. Introduction</span>

              <p className="text-base font-light leading-[1.8] max-w-md mb-10">
                Short-form video courses designed for busy nurses.
                No 15-page articles. No tedious tests. Just fast, engaging
                continuing education — completed in minutes, not hours.
              </p>

              <div className="flex gap-4">
                <Link to="/catalog">
                  <button className="btn-primary inline-flex items-center gap-3">
                    Browse Courses
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
                <Link to="/dashboard">
                  <button className="btn-outline">
                    View Progress
                  </button>
                </Link>
              </div>
            </motion.div>

            {/* Right — massive display text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-right"
            >
              <h1 className="display-massive text-7xl md:text-8xl lg:text-[10rem]">
                Ditch
                <br />
                the
                <br />
                PDFs.
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Value props — split layout with dividers */}
      <section className="border-b border-foreground/10">
        <div className="container py-20 md:py-32">
          <span className="section-marker block mb-16">02. The Paradigm</span>

          <div className="space-y-0">
            {[
              {
                number: "01",
                title: "Short-Form Video",
                description: "Sub-9 minute visual modules. Learn on breaks, during commutes, or between shifts. No more reading endless PDFs.",
              },
              {
                number: "02",
                title: "No Tests Required",
                description: "Legal attestation model replaces antiquated scantron-style quizzes. Interactive clinical scenarios instead.",
              },
              {
                number: "03",
                title: "No Subscriptions",
                description: "Transparent one-time flat fees. Pay once, keep your certificate forever. The fundamental limitation of subscription models — eliminated.",
              },
            ].map((prop, i) => (
              <motion.div
                key={prop.number}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                className="grid md:grid-cols-[120px_1fr_2fr] gap-6 md:gap-10 py-10 border-t border-foreground/10"
              >
                <span className="font-mono text-sm text-muted-foreground">{prop.number}</span>
                <h3 className="text-lg font-bold tracking-tight">{prop.title}</h3>
                <p className="text-sm font-light leading-[1.8] text-muted-foreground max-w-lg">{prop.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials — minimal badges */}
      <section className="border-b border-foreground/10">
        <div className="container py-12">
          <div className="flex flex-wrap items-center gap-10">
            <span className="section-marker">03. Approved By</span>
            <div className="h-4 w-px bg-foreground/15 hidden md:block" />
            {["BRN Approved", "BVNPT Approved", "CE Broker Ready"].map((label) => (
              <span key={label} className="meta-label">{label}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — architectural precision */}
      <section>
        <div className="container py-24 md:py-40">
          <div className="grid md:grid-cols-2 gap-16 items-end">
            <div>
              <span className="section-marker block mb-8">04. Begin</span>
              <h2 className="display-massive text-5xl md:text-7xl mb-8">
                Optimization
                <br />
                Trajectories.
              </h2>
              <p className="text-sm font-light leading-[1.8] text-muted-foreground max-w-md">
                Join thousands of nurses who've switched to smarter continuing education.
                The continuum of professional development, redefined.
              </p>
            </div>
            <div className="md:text-right">
              <Link to="/catalog">
                <button className="btn-primary inline-flex items-center gap-3">
                  Start Learning
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
