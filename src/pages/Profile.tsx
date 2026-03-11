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
    <div className="min-h-screen py-16 md:py-24">
      <div className="container max-w-2xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-20"
        >
          <span className="section-marker block mb-6">Account</span>
          <h1 className="display-massive text-6xl md:text-8xl">
            Profile.
          </h1>
        </motion.div>

        {/* User Info */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-16"
        >
          <span className="section-marker block mb-6">01. Identity</span>
          <div className="border-t border-foreground/10">
            <div className="py-6 grid grid-cols-[auto_1fr] gap-6 items-center">
              <div className="w-14 h-14 bg-primary flex items-center justify-center">
                <User className="w-6 h-6 text-primary-foreground" strokeWidth={1.5} />
              </div>
              <div>
                <h2 className="text-sm font-bold tracking-tight">{mockUser.name}</h2>
                <span className="meta-label">{mockUser.email}</span>
              </div>
            </div>
          </div>

          <div className="border-t border-foreground/5">
            {[
              { icon: Stethoscope, label: mockUser.licenseType, detail: mockUser.licenseNumber },
              { icon: Shield, label: mockUser.state, detail: "Licensed State" },
            ].map((item) => (
              <div key={item.label} className="py-4 grid grid-cols-[auto_1fr] gap-4 items-center border-b border-foreground/5">
                <item.icon className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
                <div>
                  <p className="text-sm font-medium">{item.label}</p>
                  <span className="meta-label">{item.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Settings */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <span className="section-marker block mb-6">02. Settings</span>
          <div className="border-t border-foreground/10">
            {/* Notifications */}
            <div className="flex items-center justify-between py-5 border-b border-foreground/5">
              <div className="flex items-center gap-4">
                <Bell className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
                <div>
                  <p className="text-sm font-medium">Notifications</p>
                  <span className="meta-label">Course reminders & updates</span>
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            {/* Dark Mode */}
            <div className="flex items-center justify-between py-5 border-b border-foreground/5">
              <div className="flex items-center gap-4">
                <Moon className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
                <div>
                  <p className="text-sm font-medium">Dark Mode</p>
                  <span className="meta-label">Night-shift optimized</span>
                </div>
              </div>
              <Switch />
            </div>

            {/* License Settings */}
            <button className="flex items-center justify-between py-5 w-full text-left hover:bg-muted/30 transition-colors border-b border-foreground/5">
              <div className="flex items-center gap-4">
                <Shield className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
                <div>
                  <p className="text-sm font-medium">License Settings</p>
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
          <button className="btn-primary w-full inline-flex items-center justify-center gap-2">
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
