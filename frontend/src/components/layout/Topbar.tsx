import {
  Bell,
  LogOut,
  Menu,
  Moon,
  Search,
  Sun,
  UserCircle2,
} from "lucide-react";
import { useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

export const Topbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const title =
    location.pathname === "/"
      ? "Dashboard"
      : location.pathname.slice(1).replace("-", " ");

  return (
    <header className="sticky top-0 z-20 mb-6 border-b border-slate-200 bg-white/80 px-6 py-4 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80">
      <div className="flex items-center gap-4">

        {/* Mobile Menu */}
        <Button
          variant="ghost"
          className="h-10 w-10 rounded-xl lg:hidden"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </Button>

        {/* Title */}
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
            Workspace
          </p>

          <h1 className="truncate text-2xl font-bold capitalize text-slate-900 dark:text-white">
            {title}
          </h1>
        </div>

        {/* Search */}
        <div className="hidden w-full max-w-md items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-2 shadow-sm transition-all focus-within:shadow-lg dark:border-slate-700 dark:bg-slate-900 md:flex">
          <Search
            size={18}
            className="text-slate-400"
          />

          <Input
            placeholder="Search students, teachers, courses..."
            className="border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
          />
        </div>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          className="h-11 w-11 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <Moon size={18} />
          ) : (
            <Sun size={18} />
          )}
        </Button>

        {/* Notifications */}
        <Button
          variant="ghost"
          className="relative h-11 w-11 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
          aria-label="Notifications"
        >
          <Bell size={18} />

          <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500" />
        </Button>

        {/* User Card */}
        <div className="hidden items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:flex">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-black to-slate-700 text-white">
            <UserCircle2 size={24} />
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              {user?.name}
            </p>

            <p className="text-xs capitalize text-slate-500">
              {user?.role?.replace("_", " ")}
            </p>
          </div>
        </div>

        {/* Logout */}
        <Button
          variant="ghost"
          className="h-11 w-11 rounded-xl border border-red-200 bg-red-50 text-red-600 shadow-sm hover:bg-red-100 dark:border-red-900 dark:bg-red-950/40"
          onClick={logout}
          aria-label="Logout"
        >
          <LogOut size={18} />
        </Button>
      </div>
    </header>
  );
};