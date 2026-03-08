import { Link } from "react-router-dom";
import { Play, Video, FileCheck, CreditCard, Shield, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Index() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="container relative py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Hero Text */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center md:text-left"
            >
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Ditch the PDFs.{" "}
                <span className="text-gradient">Get your CEUs in minutes.</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl">
                Short-form video courses designed for busy nurses. No 15-page articles. 
                No tedious tests. Just fast, engaging learning that fits your schedule.
              </p>
              <Link to="/catalog">
                <Button size="lg" className="gradient-primary text-primary-foreground font-semibold text-base px-8 py-6 rounded-xl hover:opacity-90 transition-opacity">
                  <Play className="w-5 h-5 mr-2" />
                  Start Your First Free Course
                </Button>
              </Link>
            </motion.div>

            {/* Phone Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 blur-3xl opacity-30 gradient-primary rounded-full scale-90" />
                
                {/* Phone frame */}
                <div className="relative w-64 md:w-72 glass-strong rounded-[2.5rem] p-3 glow-teal animate-float">
                  <div className="bg-background rounded-[2rem] overflow-hidden aspect-[9/16] flex flex-col">
                    {/* Video preview placeholder */}
                    <div className="flex-1 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center relative">
                      <div className="text-6xl mb-4">🧠</div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="glass rounded-lg p-3">
                          <p className="text-xs font-medium">Implicit Bias Training</p>
                          <p className="text-[10px] text-muted-foreground">Module 2 of 4</p>
                        </div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center">
                          <Play className="w-6 h-6 text-primary-foreground ml-1" fill="currentColor" />
                        </div>
                      </div>
                    </div>
                    {/* Progress bar */}
                    <div className="h-1 bg-muted">
                      <div className="h-full w-1/3 gradient-primary" />
                    </div>
                    {/* Bottom nav preview */}
                    <div className="flex items-center justify-around py-3 border-t border-border">
                      <div className="w-8 h-8 rounded-full bg-muted" />
                      <div className="w-8 h-8 rounded-full bg-primary/20" />
                      <div className="w-8 h-8 rounded-full bg-muted" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-16 border-t border-border">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Video,
                title: "Short-Form Video Courses",
                description: "Sub-9 minute visual bursts. Learn on breaks, during commutes, or between shifts.",
                color: "text-primary",
                bg: "bg-primary/10",
              },
              {
                icon: FileCheck,
                title: "No Tests Required",
                description: "Legal attestation model. No more scantron-style quizzes. Just interactive scenarios.",
                color: "text-secondary",
                bg: "bg-secondary/10",
              },
              {
                icon: CreditCard,
                title: "No Sneaky Subscriptions",
                description: "Transparent one-time flat fees. Pay once, keep your certificate forever.",
                color: "text-accent",
                bg: "bg-accent/10",
              },
            ].map((prop, i) => (
              <motion.div
                key={prop.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                className="glass rounded-2xl p-6 hover:glow-teal transition-shadow"
              >
                <div className={`w-12 h-12 rounded-xl ${prop.bg} flex items-center justify-center mb-4`}>
                  <prop.icon className={`w-6 h-6 ${prop.color}`} />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{prop.title}</h3>
                <p className="text-sm text-muted-foreground">{prop.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 border-t border-border">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
            {[
              { label: "BRN Approved", icon: Shield },
              { label: "BVNPT Approved", icon: Shield },
              { label: "CE Broker Ready", icon: CheckCircle },
            ].map((badge) => (
              <div key={badge.label} className="flex items-center gap-2 text-muted-foreground">
                <badge.icon className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 border-t border-border">
        <div className="container">
          <div className="glass-strong rounded-3xl p-8 md:p-12 text-center glow-purple">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
              Ready to ditch the old way?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Join thousands of nurses who've switched to smarter CEUs. Start with our free mandatory course.
            </p>
            <Link to="/catalog">
              <Button variant="outline" size="lg" className="rounded-xl border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Browse All Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
