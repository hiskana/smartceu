import { Link } from "react-router-dom";
import { ArrowRight, Play, Sparkles, Zap, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

export default function Index() {
  return (
    <div className="min-h-screen">
      {/* Hero — Cinematic dark section with glow */}
      <section className="section-dark relative overflow-hidden">
        <div className="absolute inset-0 studio-glow" />
        <div className="container relative z-10 py-32 md:py-48 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <span className="section-marker block mb-6" style={{ color: 'hsl(0 0% 55%)' }}>
              Continuing Education, Reimagined
            </span>

            <h1 className="display-massive text-5xl md:text-7xl lg:text-[6rem] mb-8 text-white leading-[1.05]">
              Modern CE
              <br />
              Made <span className="text-primary">Easy.</span>
            </h1>

            <p className="text-base md:text-lg font-light leading-relaxed max-w-lg mx-auto mb-12 text-white/60">
              Short-form video courses designed for busy nurses.
              No PDFs. No tedious tests. Just fast, engaging
              continuing education — completed in minutes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/catalog">
                <button className="btn-premium inline-flex items-center gap-3">
                  Browse Courses
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link to="/dashboard">
                <button className="btn-ghost inline-flex items-center gap-3" style={{ borderColor: 'rgba(255,255,255,0.15)', color: 'white' }}>
                  <Play className="w-4 h-4" />
                  View Progress
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Floating device frame */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="mt-20 max-w-3xl mx-auto"
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

      {/* Value props — Light studio section with bento cards */}
      <section className="section-light">
        <div className="container py-24 md:py-40">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="section-marker block mb-4">The Paradigm</span>
            <h2 className="display-massive text-4xl md:text-6xl">
              The Eternal Challenge,
              <br />
              <span className="text-primary">Solved.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Play,
                number: "9",
                unit: "min",
                title: "Short-Form Video",
                description: "Sub-9 minute visual modules. Learn on breaks, during commutes, or between shifts.",
              },
              {
                icon: Sparkles,
                number: "0",
                unit: "tests",
                title: "No Tests Required",
                description: "Legal attestation model replaces antiquated scantron-style quizzes.",
              },
              {
                icon: CreditCard,
                number: "1",
                unit: "×",
                title: "One-Time Payment",
                description: "Transparent flat fees. Pay once, keep your certificate forever.",
              },
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

      {/* Credentials — white section */}
      <section>
        <div className="container py-16 md:py-20">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {["BRN Approved", "BVNPT Approved", "CE Broker Ready"].map((label) => (
              <span key={label} className="meta-label text-sm">{label}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — Dark cinematic section */}
      <section className="section-dark relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[100px]" />
        </div>
        <div className="container relative z-10 py-24 md:py-40 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="section-marker block mb-6" style={{ color: 'hsl(0 0% 55%)' }}>Begin</span>
            <h2 className="display-massive text-5xl md:text-7xl text-white mb-6">
              Showcase in
              <br />
              <span className="text-primary">Perfection.</span>
            </h2>
            <p className="text-sm font-light leading-relaxed text-white/50 max-w-md mx-auto mb-10">
              Join thousands of nurses who've switched to smarter continuing education.
            </p>
            <Link to="/catalog">
              <button className="btn-premium inline-flex items-center gap-3">
                Start Learning
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
