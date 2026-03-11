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
    <div className="min-h-screen py-8 md:py-12">
      <div className="container max-w-lg">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="font-display text-5xl md:text-6xl font-black italic mb-2">Profile</h1>
          <span className="annotation text-xl inline-block rotate-[-2deg]">
            ★ manage your account
          </span>
        </motion.div>

        {/* User Info Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="editorial-card editorial-card-taped p-6 pt-10 mb-6"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-primary border-[2px] border-foreground flex items-center justify-center">
              <User className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h2 className="header-condensed text-lg">{mockUser.name}</h2>
              <span className="annotation text-base">{mockUser.email}</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 bg-muted border-[2px] border-foreground p-3">
              <Stethoscope className="w-5 h-5" />
              <div>
                <p className="text-sm font-bold font-body">{mockUser.licenseType}</p>
                <span className="annotation text-sm">{mockUser.licenseNumber}</span>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-muted border-[2px] border-foreground p-3">
              <Shield className="w-5 h-5" />
              <div>
                <p className="text-sm font-bold font-body">{mockUser.state}</p>
                <span className="annotation text-sm">Licensed State</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="editorial-card divide-y-[2px] divide-foreground"
        >
          {/* Notifications */}
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent border-[2px] border-foreground flex items-center justify-center">
                <Bell className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <p className="text-sm font-bold font-body uppercase">Notifications</p>
                <span className="annotation text-sm">course reminders & updates</span>
              </div>
            </div>
            <Switch defaultChecked />
          </div>

          {/* Dark Mode */}
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary border-[2px] border-foreground flex items-center justify-center">
                <Moon className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm font-bold font-body uppercase">Dark Mode</p>
                <span className="annotation text-sm">night-shift friendly</span>
              </div>
            </div>
            <Switch />
          </div>

          {/* License Settings */}
          <button className="flex items-center justify-between p-4 w-full text-left hover:bg-muted transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-muted border-[2px] border-foreground flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold font-body uppercase">License Settings</p>
                <span className="annotation text-sm">update your license info</span>
              </div>
            </div>
            <div className="bg-primary text-primary-foreground p-1 border-[2px] border-foreground">
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
          <button className="editorial-btn bg-accent text-accent-foreground w-full py-3 text-sm inline-flex items-center justify-center gap-2">
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
          <p className="font-body text-xs text-muted-foreground">SmartCEU v1.0.0</p>
          <span className="annotation text-sm">BRN Provider #12345 | BVNPT Provider #67890</span>
        </motion.div>
      </div>
    </div>
  );
}
