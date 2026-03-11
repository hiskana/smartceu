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
      {/* Desktop top nav — thick bordered */}
      <header className="hidden md:flex fixed top-0 left-0 right-0 z-50 bg-card border-b-[3px] border-foreground">
        <div className="container flex items-center justify-between h-14">
          <NavLink to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary border-[2px] border-foreground flex items-center justify-center" style={{ boxShadow: '2px 2px 0px 0px hsl(0 0% 0%)' }}>
              <span className="text-sm font-bold text-primary-foreground font-mono">{'/>'}</span>
            </div>
            <span className="font-display font-bold text-xl">SmartCEU</span>
          </NavLink>
          <nav className="flex items-center gap-0">
            {navItems.map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `px-4 py-2 text-sm font-bold uppercase tracking-wide border-[2px] border-foreground transition-all ${
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "bg-card text-foreground hover:bg-secondary hover:text-secondary-foreground"
                  }`
                }
                style={{ marginLeft: '-2px' }}
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

      {/* Mobile bottom nav — thick bordered */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t-[3px] border-foreground">
        <div className="flex items-center justify-around h-16">
          {navItems.map(({ path, label, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-0.5 px-3 py-1.5 transition-all ${
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className={`p-1.5 border-[2px] transition-all ${isActive ? "border-foreground bg-accent" : "border-transparent"}`}
                    style={isActive ? { boxShadow: '2px 2px 0px 0px hsl(0 0% 0%)' } : {}}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wide">{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
