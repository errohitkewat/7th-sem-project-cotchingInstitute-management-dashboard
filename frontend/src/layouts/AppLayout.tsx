import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/layout/Sidebar";
import { Topbar } from "../components/layout/Topbar";

export const AppLayout = () => (
  <div className="min-h-screen bg-neutralSoft text-slate-950 dark:bg-slate-950 dark:text-slate-100">
    <div className="flex">
      <Sidebar />
      <main className="min-w-0 flex-1">
        <Topbar />
        <div className="p-4 md:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  </div>
);
