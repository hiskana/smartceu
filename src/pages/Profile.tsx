import { User, Shield, Bell, Moon, LogOut, ChevronRight, Stethoscope } from "lucide-react";
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
    <div className="min-h-screen py-6 md:py-10">
      <div className="container max-w-lg">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="brutalist-card p-4 inline-block mb-2">
            <h1 className="font-display text-3xl md:text-4xl font-bold uppercase">Profile</h1>
          </div>
          <p className="font-mono text-sm text-muted-foreground mt-2">{'>'} Manage your account and preferences</p>
        </motion.div>

        {/* User Info Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="brutalist-card-pink p-6 mb-6"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-card border-[2px] border-foreground flex items-center justify-center" style={{ boxShadow: '2px 2px 0px 0px hsl(0 0% 0%)' }}>
              <User className="w-8 h-8" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg text-primary-foreground">{mockUser.name}</h2>
              <p className="font-mono text-sm text-primary-foreground/80">{mockUser.email}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 bg-card/20 border-[2px] border-primary-foreground/30 p-3">
              <Stethoscope className="w-5 h-5 text-primary-foreground" />
              <div>
                <p className="text-sm font-bold text-primary-foreground">{mockUser.licenseType}</p>
                <p className="font-mono text-xs text-primary-foreground/70">{mockUser.licenseNumber}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-card/20 border-[2px] border-primary-foreground/30 p-3">
              <Shield className="w-5 h-5 text-primary-foreground" />
              <div>
                <p className="text-sm font-bold text-primary-foreground">{mockUser.state}</p>
                <p className="font-mono text-xs text-primary-foreground/70">Licensed State</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="brutalist-card divide-y-[2px] divide-foreground"
        >
          {/* Notifications */}
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-secondary border-[2px] border-foreground flex items-center justify-center" style={{ boxShadow: '2px 2px 0px 0px hsl(0 0% 0%)' }}>
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold uppercase">Notifications</p>
                <p className="font-mono text-xs text-muted-foreground">// Course reminders & updates</p>
              </div>
            </div>
            <Switch defaultChecked />
          </div>

          {/* Dark Mode */}
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent border-[2px] border-foreground flex items-center justify-center" style={{ boxShadow: '2px 2px 0px 0px hsl(0 0% 0%)' }}>
                <Moon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold uppercase">Dark Mode</p>
                <p className="font-mono text-xs text-muted-foreground">// Night-shift friendly</p>
              </div>
            </div>
            <Switch />
          </div>

          {/* License Settings */}
          <button className="flex items-center justify-between p-4 w-full text-left hover:bg-muted transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-muted border-[2px] border-foreground flex items-center justify-center" style={{ boxShadow: '2px 2px 0px 0px hsl(0 0% 0%)' }}>
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold uppercase">License Settings</p>
                <p className="font-mono text-xs text-muted-foreground">// Update your license info</p>
              </div>
            </div>
            <div className="bg-foreground text-background p-1">
              <ChevronRight className="w-5 h-5" />
            </div>
          </button>
        </motion.div>

        {/* Logout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6"
        >
          <button className="brutalist-btn bg-destructive text-destructive-foreground w-full py-3 text-sm inline-flex items-center justify-center gap-2">
            <LogOut className="w-4 h-4" />
            Log Out
          </button>
        </motion.div>

        {/* App Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center"
        >
          <p className="font-mono text-xs text-muted-foreground">SmartCEU v1.0.0</p>
          <p className="font-mono text-xs text-muted-foreground mt-1">BRN Provider #12345 | BVNPT Provider #67890</p>
        </motion.div>
      </div>
    </div>
  );
}
