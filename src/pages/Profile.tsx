import { User, Shield, Bell, Moon, LogOut, ChevronRight, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
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
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Profile</h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </motion.div>

        {/* User Info Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-strong rounded-3xl p-6 mb-6 glow-teal"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center">
              <User className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-display font-semibold text-lg">{mockUser.name}</h2>
              <p className="text-sm text-muted-foreground">{mockUser.email}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Stethoscope className="w-5 h-5 text-secondary" />
              <div>
                <p className="text-sm font-medium">{mockUser.licenseType}</p>
                <p className="text-xs text-muted-foreground">{mockUser.licenseNumber}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-medium">{mockUser.state}</p>
                <p className="text-xs text-muted-foreground">Licensed State</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl divide-y divide-border"
        >
          {/* Notifications */}
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                <Bell className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">Notifications</p>
                <p className="text-xs text-muted-foreground">Course reminders & updates</p>
              </div>
            </div>
            <Switch defaultChecked />
          </div>

          {/* Dark Mode */}
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                <Moon className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">Dark Mode</p>
                <p className="text-xs text-muted-foreground">Easier on night-shift eyes</p>
              </div>
            </div>
            <Switch defaultChecked />
          </div>

          {/* License Settings */}
          <button className="flex items-center justify-between p-4 w-full text-left hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                <Shield className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">License Settings</p>
                <p className="text-xs text-muted-foreground">Update your license info</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        </motion.div>

        {/* Logout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6"
        >
          <Button variant="outline" className="w-full rounded-xl border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground">
            <LogOut className="w-4 h-4 mr-2" />
            Log Out
          </Button>
        </motion.div>

        {/* App Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center"
        >
          <p className="text-xs text-muted-foreground">SmartCEU v1.0.0</p>
          <p className="text-xs text-muted-foreground mt-1">BRN Provider #12345 • BVNPT Provider #67890</p>
        </motion.div>
      </div>
    </div>
  );
}
