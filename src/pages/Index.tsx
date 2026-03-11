import { Link } from "react-router-dom";
import { Play, Video, FileCheck, CreditCard, Shield, CheckCircle, Rocket, Cpu, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Index() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b-[3px] border-foreground">
        <div className="container relative py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Hero Text */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center md:text-left"
            >
              {/* Pixel label */}
              <div className="inline-block mb-4">
                <span className="pixel-text bg-secondary border-[2px] border-foreground px-3 py-1 inline-block" style={{ boxShadow: '2px 2px 0px 0px hsl(0 0% 0%)' }}>
                  {'<'} CEU Platform {'/>'}
                </span>
              </div>
              
              <div className="brutalist-card p-4 md:p-6 mb-6 inline-block">
                <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Ditch the PDFs.{" "}
                  <span className="bg-primary text-primary-foreground px-2">Get your CEUs</span>{" "}
                  in minutes.
                </h1>
              </div>
              
              <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-xl font-mono text-sm">
                // Short-form video courses designed for busy nurses.<br />
                // No 15-page articles. No tedious tests.<br />
                // Just fast, engaging learning.
              </p>
              
              <Link to="/catalog">
                <button className="brutalist-btn bg-primary text-primary-foreground text-base px-8 py-4 inline-flex items-center gap-2">
                  <Rocket className="w-5 h-5" />
                  Launch Your First Free Course
                </button>
              </Link>
            </motion.div>

            {/* Phone Mockup — Brutalist Style */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex justify-center"
            >
              <div className="relative">
                {/* Decorative pixel elements */}
                <div className="absolute -top-4 -right-4 pixel-text bg-secondary border-[2px] border-foreground px-2 py-1 z-10" style={{ boxShadow: '2px 2px 0px 0px hsl(0 0% 0%)' }}>
                  {'>>>'} PLAY
                </div>
                <div className="absolute -bottom-3 -left-3 pixel-text bg-accent border-[2px] border-foreground px-2 py-1 z-10" style={{ boxShadow: '2px 2px 0px 0px hsl(0 0% 0%)' }}>
                  {'<>'} LEARN {'</>'}
                </div>
                
                {/* Phone frame — brutalist */}
                <div className="w-60 md:w-68 brutalist-card p-3">
                  <div className="bg-muted overflow-hidden aspect-[9/16] flex flex-col border-[2px] border-foreground">
                    {/* Video preview */}
                    <div className="flex-1 bg-foreground/5 flex items-center justify-center relative">
                      <div className="text-6xl mb-4">🧠</div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="bg-card border-[2px] border-foreground p-2" style={{ boxShadow: '2px 2px 0px 0px hsl(0 0% 0%)' }}>
                          <p className="text-xs font-bold">Implicit Bias Training</p>
                          <p className="text-[10px] font-mono text-muted-foreground">Module 2 of 4</p>
                        </div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 bg-primary border-[3px] border-foreground flex items-center justify-center" style={{ boxShadow: '3px 3px 0px 0px hsl(0 0% 0%)' }}>
                          <Play className="w-6 h-6 text-primary-foreground ml-1" fill="currentColor" />
                        </div>
                      </div>
                    </div>
                    {/* Progress bar */}
                    <div className="h-2 bg-muted border-t-[2px] border-foreground">
                      <div className="h-full w-1/3 bg-primary" />
                    </div>
                    {/* Bottom nav */}
                    <div className="flex items-center justify-around py-2 border-t-[2px] border-foreground bg-card">
                      <div className="w-6 h-6 bg-muted border-[1px] border-foreground" />
                      <div className="w-6 h-6 bg-accent border-[1px] border-foreground" />
                      <div className="w-6 h-6 bg-muted border-[1px] border-foreground" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-12 border-b-[3px] border-foreground">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Video,
                title: "Short-Form Video",
                description: "Sub-9 minute visual bursts. Learn on breaks, during commutes, or between shifts.",
                bg: "bg-accent",
              },
              {
                icon: FileCheck,
                title: "No Tests Required",
                description: "Legal attestation model. No more scantron-style quizzes. Just interactive scenarios.",
                bg: "bg-secondary",
              },
              {
                icon: CreditCard,
                title: "No Subscriptions",
                description: "Transparent one-time flat fees. Pay once, keep your certificate forever.",
                bg: "bg-primary",
                textColor: "text-primary-foreground",
              },
            ].map((prop, i) => (
              <motion.div
                key={prop.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + i * 0.1 }}
                className="brutalist-card p-6 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_hsl(0_0%_0%)] transition-all"
              >
                <div className={`w-12 h-12 ${prop.bg} ${prop.textColor || 'text-foreground'} border-[2px] border-foreground flex items-center justify-center mb-4`} style={{ boxShadow: '2px 2px 0px 0px hsl(0 0% 0%)' }}>
                  <prop.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-lg mb-2 uppercase">{prop.title}</h3>
                <p className="text-sm text-muted-foreground font-mono">{prop.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-8 border-b-[3px] border-foreground">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
            {[
              { label: "BRN Approved", icon: Shield },
              { label: "BVNPT Approved", icon: Shield },
              { label: "CE Broker Ready", icon: CheckCircle },
            ].map((badge) => (
              <div key={badge.label} className="flex items-center gap-2 bg-card border-[2px] border-foreground px-4 py-2" style={{ boxShadow: '2px 2px 0px 0px hsl(0 0% 0%)' }}>
                <badge.icon className="w-4 h-4 text-primary" />
                <span className="text-sm font-bold uppercase tracking-wide">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12">
        <div className="container">
          <div className="brutalist-card-pink p-8 md:p-12 text-center">
            {/* Decorative corners */}
            <span className="pixel-text text-primary-foreground/70 block mb-2">{'>>>'} AWAITING YOUR COMMAND {'<<<'}</span>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 text-primary-foreground">
              Ready to ditch the old way?
            </h2>
            <p className="text-primary-foreground/80 mb-6 max-w-md mx-auto font-mono text-sm">
              Join thousands of nurses who've switched to smarter CEUs.
            </p>
            <Link to="/catalog">
              <button className="brutalist-btn bg-card text-foreground text-base px-8 py-4 inline-flex items-center gap-2">
                <Code2 className="w-5 h-5" />
                Browse All Courses
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
