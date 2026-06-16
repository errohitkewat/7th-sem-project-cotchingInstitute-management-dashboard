import {
  BarChart3,
  Bell,
  BookOpen,
  CalendarDays,
  ClipboardCheck,
  CreditCard,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "../../utils/cn";

const links = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/students", label: "Students", icon: GraduationCap },
  { to: "/teachers", label: "Teachers", icon: Users },
  { to: "/courses", label: "Courses", icon: BookOpen },
  { to: "/attendance", label: "Attendance", icon: ClipboardCheck },
  { to: "/fees", label: "Fees", icon: CreditCard },
  { to: "/exams", label: "Exams", icon: BarChart3 },
  { to: "/notices", label: "Notices", icon: Bell },
  { to: "/timetable", label: "Timetable", icon: CalendarDays },
  { to: "/reports", label: "Reports", icon: FileText },
  { to: "/settings", label: "Settings", icon: Settings },
];

export const Sidebar = () => {
  return (
    <aside className="hidden  min-h-screen w-72 border-r border-slate-200 bg-gradient-to-b from-white via-slate-50 to-slate-100 px-5 py-6 shadow-xl dark:border-slate-800 dark:from-slate-950 dark:via-slate-900 dark:to-black lg:block">

      {/* Logo */}
      <div className="mb-8 rounded-3xl bg-white p-4 shadow-lg dark:bg-slate-900">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-black to-slate-800 text-white shadow-lg">
            <GraduationCap size={26} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              TFP Coding
            </h2>

            <p className="text-xs text-slate-500">
              Management Dashboard
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                "group flex items-center gap-4 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300",
                isActive
                  ? "bg-gradient-to-r from-black to-slate-800 text-white shadow-lg"
                  : "text-slate-600 hover:bg-white hover:text-black hover:shadow-md dark:text-slate-300 dark:hover:bg-slate-800"
              )
            }
          >
            <Icon
              size={20}
              className="transition-transform duration-300 group-hover:scale-110"
            />

            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom Info Card */}
      {/* <div className="mt-10 rounded-3xl bg-gradient-to-br from-black via-slate-900 to-slate-800 p-5 text-white shadow-2xl">
        <h3 className="font-semibold">
          Institute Overview
        </h3>

        <p className="mt-2 text-xs leading-relaxed text-slate-300">
          Manage students, teachers, fees, attendance,
          courses and reports from one powerful dashboard.
        </p>

        <div className="mt-4 rounded-xl bg-white px-3 py-2 text-center text-xs font-semibold text-black">
          Premium Dashboard
        </div>
      </div> */}
    </aside>
  );
};