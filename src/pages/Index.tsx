import { Link } from "react-router-dom";
import { Play, Shield, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Index() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b-[2px] border-foreground">
        <div className="container relative py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Hero Text */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center md:text-left"
            >
              {/* Annotation */}
              <span className="annotation text-2xl md:text-3xl inline-block rotate-[-3deg] mb-4">
                ★ the future of nursing education
              </span>

              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] mb-6 italic">
                Ditch the PDFs.{" "}
                <span className="not-italic">Get your CEUs</span>{" "}
                <span className="not-italic inline-block bg-accent text-accent-foreground px-3 py-1">in minutes.</span>
              </h1>

              <p className="text-base md:text-lg mb-8 max-w-xl font-body leading-relaxed">
                Short-form video courses designed for busy nurses.
                No 15-page articles. No tedious tests. Just fast, engaging learning.
              </p>

              {/* Annotation arrow */}
              <span className="annotation text-xl inline-block rotate-[2deg] mb-4">
                ↓ start here, it's free!
              </span>

              <div>
                <Link to="/catalog">
                  <button className="editorial-btn text-lg px-10 py-4 inline-flex items-center gap-3">
                    Start Your First Free Course
                  </button>
                </Link>
              </div>
            </motion.div>

            {/* Phone Mockup — Editorial Style */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex justify-center"
            >
              <div className="relative">
                {/* Red tape decoration */}
                <div className="absolute -top-3 left-8 w-12 h-4 bg-accent border-[1px] border-foreground rotate-[-10deg] z-10" />
                <div className="absolute -top-2 right-12 w-10 h-4 bg-accent border-[1px] border-foreground rotate-[8deg] z-10" />

                {/* Handwritten note */}
                <span className="absolute -top-10 right-0 annotation text-lg rotate-[5deg] z-10">
                  ← swipe to learn!
                </span>

                {/* Phone frame */}
                <div className="w-60 md:w-68 editorial-card p-3">
                  <div className="bg-muted overflow-hidden aspect-[9/16] flex flex-col border-[2px] border-foreground">
                    {/* Video preview */}
                    <div className="flex-1 bg-foreground/5 flex items-center justify-center relative">
                      <div className="text-6xl mb-4">🧠</div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="bg-card border-[2px] border-foreground p-2">
                          <p className="text-xs font-bold font-condensed uppercase">Implicit Bias Training</p>
                          <p className="annotation text-sm">Module 2 of 4</p>
                        </div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 bg-accent border-[2px] border-foreground flex items-center justify-center">
                          <Play className="w-6 h-6 text-accent-foreground ml-1" fill="currentColor" />
                        </div>
                      </div>
                    </div>
                    {/* Progress bar */}
                    <div className="h-2 bg-muted border-t-[2px] border-foreground">
                      <div className="h-full w-1/3 bg-accent" />
                    </div>
                    {/* Bottom nav */}
                    <div className="flex items-center justify-around py-2 border-t-[2px] border-foreground bg-card">
                      <div className="w-6 h-6 bg-muted border-[1px] border-foreground" />
                      <div className="w-6 h-6 bg-accent border-[1px] border-foreground" />
                      <div className="w-6 h-6 bg-muted border-[1px] border-foreground" />
                    </div>
                  </div>
                </div>

                {/* Red star sticker */}
                <span className="absolute -bottom-4 -right-4 text-4xl red-star rotate-[12deg]">★</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-14 border-b-[2px] border-foreground">
        <div className="container">
          {/* Section annotation */}
          <span className="annotation text-xl inline-block rotate-[-2deg] mb-6">
            ★ why nurses love us →
          </span>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Short-Form Video",
                description: "Sub-9 minute visual bursts. Learn on breaks, during commutes, or between shifts.",
                annotation: "no more 15-page PDFs!",
              },
              {
                title: "No Tests Required",
                description: "Legal attestation model. No more scantron-style quizzes. Just interactive scenarios.",
                annotation: "finally!",
              },
              {
                title: "No Subscriptions",
                description: "Transparent one-time flat fees. Pay once, keep your certificate forever.",
                annotation: "new paradigm ★",
              },
            ].map((prop, i) => (
              <motion.div
                key={prop.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + i * 0.1 }}
                className="editorial-card editorial-card-taped p-6 pt-8 hover:translate-y-[-2px] transition-transform"
              >
                <h3 className="header-condensed text-xl mb-2">{prop.title}</h3>
                <p className="text-sm font-body text-muted-foreground mb-3">{prop.description}</p>
                <span className="annotation text-base inline-block rotate-[-2deg]">{prop.annotation}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-8 border-b-[2px] border-foreground">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
            {[
              { label: "BRN Approved", icon: Shield },
              { label: "BVNPT Approved", icon: Shield },
              { label: "CE Broker Ready", icon: CheckCircle },
            ].map((badge) => (
              <div key={badge.label} className="flex items-center gap-2 bg-card border-[2px] border-foreground px-4 py-2">
                <badge.icon className="w-4 h-4" />
                <span className="header-condensed text-sm">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container">
          <div className="editorial-card editorial-card-taped p-10 md:p-16 text-center pt-12">
            <span className="annotation text-2xl inline-block rotate-[-3deg] mb-4">
              ★ deeper understanding awaits
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-black mb-4 italic">
              Ready to ditch the old way?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto font-body">
              Join thousands of nurses who've switched to smarter CEUs.
            </p>
            <Link to="/catalog">
              <button className="editorial-btn text-base px-10 py-4 inline-flex items-center gap-3">
                Browse All Courses
              </button>
            </Link>
            {/* Sticker */}
            <div className="inline-block ml-4">
              <span className="sticker-btn px-4 py-2 text-sm inline-block">New Paradigm!</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
