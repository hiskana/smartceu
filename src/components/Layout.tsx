import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Home, BookOpen, Award, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/catalog", label: "Catalog", icon: BookOpen },
  { path: "/dashboard", label: "Progress", icon: Award },
  { path: "/profile", label: "Profile", icon: User },
];

export default function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Desktop nav — ultra-minimal top bar */}
      <header className="hidden md:flex fixed top-0 left-0 right-0 z-50 bg-background border-b border-foreground/10">
        <div className="container flex items-center justify-between h-14">
          <NavLink to="/" className="flex items-center gap-2">
            <span className="text-sm font-black tracking-[-0.03em] uppercase">SmartCEU</span>
          </NavLink>
          <nav className="flex items-center gap-0">
            {navItems.map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `px-5 py-4 text-xs tracking-[0.15em] uppercase font-medium transition-colors ${
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 pb-20 md:pb-0 md:pt-14">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile bottom nav — minimal */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-foreground/10">
        <div className="flex items-center justify-around h-16">
          {navItems.map(({ path, label, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-1 px-3 py-1.5 transition-colors ${
                  isActive ? "text-foreground" : "text-muted-foreground"
                }`
              }
            >
              <Icon className="w-5 h-5" strokeWidth={1.5} />
              <span className="text-[9px] tracking-[0.15em] uppercase font-medium">{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
