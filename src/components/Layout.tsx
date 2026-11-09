import { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  BookOpen,
  House,
  Bookmark,
  Menu,
  X,
  LayoutDashboard,
} from "lucide-react";
const items = [
  { path: "/", label: "Home", icon: House },
  { path: "/catalog", label: "Courses", icon: BookOpen },
  { path: "/dashboard", label: "My learning", icon: Bookmark },
  { path: "/hub", label: "Hub", icon: LayoutDashboard },
];
export default function Layout() {
  const [menu, setMenu] = useState(false);
  const { pathname } = useLocation();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="site-header">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-20 flex justify-between items-center gap-4">
          <NavLink
            to="/"
            className="flex items-center gap-2.5"
            onClick={() => setMenu(false)}
          >
            <span className="brand-mark">
              <BookOpen size={22} />
            </span>
            <span className="text-2xl font-bold tracking-tight">
              Smart<span className="text-primary">CEU</span>
            </span>
          </NavLink>
          <nav
            aria-label="Main navigation"
            className="hidden md:flex items-center gap-2"
          >
            {items.map((item) => (
              <NavLink
                key={item.path}
                end={item.path === "/"}
                to={item.path}
                className={({ isActive }) =>
                  `rounded-full px-5 py-2.5 text-sm font-semibold ${isActive ? "bg-secondary text-primary" : "text-muted-foreground hover:text-primary"}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <button
            className="md:hidden p-2 rounded-lg border border-border"
            aria-label={menu ? "Close menu" : "Open menu"}
            aria-expanded={menu}
            aria-controls="mobile-menu"
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {menu && (
          <nav
            id="mobile-menu"
            aria-label="Mobile menu"
            className="md:hidden border-t px-5 py-3 space-y-1"
          >
            {items.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMenu(false)}
                className="block py-3 font-medium"
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        )}
      </header>
      <main className="pb-28 sm:pb-24">
        <Outlet />
      </main>
      {pathname !== "/" && (
        <footer className="border-t border-border px-5 py-8 pb-28 sm:pb-24 text-center text-xs text-muted-foreground">
          Made for California PTs & LVNs. Currently a learning preview · No CE
          credit.
        </footer>
      )}
      <nav aria-label="Quick navigation" className="mobile-tabs md:hidden">
        {items.map(({ path, label, icon: Icon }) => (
          <NavLink
            key={path}
            end={path === "/"}
            to={path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 p-2 text-[11px] font-semibold ${isActive ? "text-primary" : "text-muted-foreground"}`
            }
          >
            <Icon size={21} />
            {label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
