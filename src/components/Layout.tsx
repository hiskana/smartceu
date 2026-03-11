import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Home, BookOpen, Award, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/catalog", label: "Catalog", icon: BookOpen },
  { path: "/dashboard", label: "My CEUs", icon: Award },
  { path: "/profile", label: "Profile", icon: User },
];

export default function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Desktop top nav — black bar */}
      <header className="hidden md:flex fixed top-0 left-0 right-0 z-50 bg-primary border-b-[2px] border-foreground">
        <div className="container flex items-center justify-between h-14">
          <NavLink to="/" className="flex items-center gap-3">
            <span className="font-display text-2xl font-black text-primary-foreground italic">SmartCEU</span>
            <span className="annotation text-lg text-accent rotate-[-3deg]">★ for nurses</span>
          </NavLink>
          <nav className="flex items-center gap-0">
            {navItems.map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `px-5 py-2 header-condensed text-sm border-l-[2px] border-foreground transition-all ${
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "bg-primary text-primary-foreground hover:bg-card hover:text-foreground"
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
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile bottom nav — black bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-primary border-t-[2px] border-foreground">
        <div className="flex items-center justify-around h-16">
          {navItems.map(({ path, label, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-0.5 px-3 py-1.5 transition-all ${
                  isActive
                    ? "text-accent"
                    : "text-primary-foreground"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className={`p-1.5 transition-all ${isActive ? "bg-accent border-[1px] border-foreground" : ""}`}>
                    <Icon className={`w-5 h-5 ${isActive ? "text-accent-foreground" : ""}`} />
                  </div>
                  <span className="text-[10px] font-condensed uppercase tracking-wide">{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
