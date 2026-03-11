import { User, Shield, Bell, Moon, LogOut, ArrowRight, Stethoscope } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";

const mockUser = {
  name: "Sarah Johnson, RN",
  email: "sarah.johnson@email.com",
  licenseType: "Registered Nurse (RN)",
  licenseNumber: "RN 1234567",
  state: "California",
};

export default function Profile() {
  return (
    <div className="min-h-screen">
      {/* Header — dark cinematic */}
      <section className="section-dark relative overflow-hidden">
        <div className="absolute inset-0 studio-glow" />
        <div className="container relative z-10 py-24 md:py-32 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="section-marker block mb-4" style={{ color: 'hsl(0 0% 55%)' }}>Account</span>
            <h1 className="display-massive text-5xl md:text-7xl text-white">Profile.</h1>
          </motion.div>
        </div>
      </section>

      <div className="container max-w-2xl py-16 md:py-24">
        {/* User Info */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <span className="section-marker block mb-6">01. Identity</span>
          <div className="studio-card p-6">
            <div className="flex items-center gap-5 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center">
                <User className="w-6 h-6 text-primary-foreground" strokeWidth={1.5} />
              </div>
              <div>
                <h2 className="text-sm font-bold tracking-tight">{mockUser.name}</h2>
                <span className="meta-label">{mockUser.email}</span>
              </div>
            </div>

            <div className="space-y-0">
              {[
                { icon: Stethoscope, label: mockUser.licenseType, detail: mockUser.licenseNumber },
                { icon: Shield, label: mockUser.state, detail: "Licensed State" },
              ].map((item) => (
                <div key={item.label} className="py-4 flex items-center gap-4 border-t border-border">
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                    <item.icon className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{item.label}</p>
                    <span className="meta-label">{item.detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Settings */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <span className="section-marker block mb-6">02. Settings</span>
          <div className="studio-card overflow-hidden">
            {/* Notifications */}
            <div className="flex items-center justify-between p-5 border-b border-border">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                  <Bell className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm font-semibold">Notifications</p>
                  <span className="meta-label">Course reminders & updates</span>
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            {/* Dark Mode */}
            <div className="flex items-center justify-between p-5 border-b border-border">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                  <Moon className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm font-semibold">Dark Mode</p>
                  <span className="meta-label">Night-shift optimized</span>
                </div>
              </div>
              <Switch />
            </div>

            {/* License Settings */}
            <button className="flex items-center justify-between p-5 w-full text-left hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                  <Shield className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm font-semibold">License Settings</p>
                  <span className="meta-label">Update license information</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </motion.section>

        {/* Logout */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <button className="btn-premium w-full inline-flex items-center justify-center gap-2">
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </motion.div>

        {/* Footer info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <p className="meta-label">SmartCEU v1.0.0</p>
          <p className="meta-label mt-1">BRN Provider #12345 — BVNPT Provider #67890</p>
        </motion.div>
      </div>
    </div>
  );
}
