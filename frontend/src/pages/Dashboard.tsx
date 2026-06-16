import { BookOpen, IndianRupee, Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { BarChart } from "../components/charts/BarChart";
import { LineChart } from "../components/charts/LineChart";
import { Card } from "../components/ui/card";
import { Skeleton } from "../components/ui/skeleton";
import { api, unwrap } from "../services/api";
import type { ChartPoint } from "../types";

type Overview = {
  stats: { students: number; teachers: number; courses: number; revenue: number; attendancePercentage: number };
  monthlyRevenue: ChartPoint[];
  studentGrowth: ChartPoint[];
  attendanceTrend: ChartPoint[];
  coursePopularity: ChartPoint[];
  activities: { id: string; action: string; entity: string; createdAt: string }[];
};

const Stat = ({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  icon: typeof Users;
}) => (
  <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-white via-slate-50 to-slate-100 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
    <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-slate-200/20 blur-2xl" />

    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <p className="mt-3 text-3xl font-bold tracking-tight">
          {value}
        </p>
      </div>

      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-black text-white shadow-lg">
        <Icon size={20} />
      </div>
    </div>
  </Card>
);

export const Dashboard = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => unwrap<Overview>(api.get("/api/dashboard/overview"))
  });

  if (isLoading || !data) {
    return <Skeleton className="h-[560px]" />;
  }

  return (
  <div className="space-y-6">

    {/* Welcome Section */}
    <div className="rounded-3xl bg-gradient-to-r from-black via-slate-900 to-slate-800 p-8 text-white shadow-2xl">
      <h1 className="text-3xl font-bold">
        TFP Coding Management Dashboard
      </h1>

      <p className="mt-2 text-slate-300">
        Monitor students, teachers, courses, revenue and attendance from one place.
      </p>
    </div>

    {/* Stats */}
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      <Stat
        label="Students"
        value={data.stats.students}
        icon={Users}
      />

      {/* <Stat
        label="Teachers"
        value={data.stats.teachers}
        icon={Activity}
      /> */}

      <Stat
        label="Courses"
        value={data.stats.courses}
        icon={BookOpen}
      />

      <Stat
        label="Revenue"
        value={`₹${data.stats.revenue.toLocaleString()}`}
        icon={IndianRupee}
      />

      {/* <Stat
        label="Attendance"
        value={`${data.stats.attendancePercentage}%`}
        icon={TrendingUp}
      /> */}
    </div>

    {/* Charts */}
    <div className="grid gap-6 xl:grid-cols-2">

      <Card className="rounded-3xl border-0 bg-white p-6 shadow-xl">
        <h2 className="mb-6 text-lg font-bold">
          Monthly Revenue
        </h2>

        <div className="h-72">
          <LineChart
            label="Revenue"
            data={data.monthlyRevenue}
          />
        </div>
      </Card>

      <Card className="rounded-3xl border-0 bg-white p-6 shadow-xl">
        <h2 className="mb-6 text-lg font-bold">
          Student Growth
        </h2>

        <div className="h-72">
          <BarChart
            label="Students"
            data={data.studentGrowth}
          />
        </div>
      </Card>

      <Card className="rounded-3xl border-0 bg-white p-6 shadow-xl">
        <h2 className="mb-6 text-lg font-bold">
          Attendance Trend
        </h2>

        <div className="h-72">
          <LineChart
            label="Attendance"
            data={data.attendanceTrend}
            color="#10B981"
          />
        </div>
      </Card>

      <Card className="rounded-3xl border-0 bg-white p-6 shadow-xl">
        <h2 className="mb-6 text-lg font-bold">
          Course Popularity
        </h2>

        <div className="h-72">
          <BarChart
            label="Enrollments"
            data={data.coursePopularity}
            color="#F59E0B"
          />
        </div>
      </Card>
    </div>

    {/* Bottom Section */}
    <div className="grid gap-6 xl:grid-cols-3">

      {/* Recent Activities */}
      <Card className="xl:col-span-2 rounded-3xl border-0 bg-white p-6 shadow-xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold">
            Recent Activities
          </h2>

          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium">
            Live Updates
          </span>
        </div>

        <div className="space-y-3">
          {data.activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-all hover:bg-slate-100"
            >
              <div>
                <p className="font-medium">
                  {activity.action} {activity.entity}
                </p>
              </div>

              <span className="text-sm text-slate-500">
                {new Date(activity.createdAt).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Summary */}
      <Card className="rounded-3xl border-0 bg-gradient-to-b from-amber-50 to-white p-6 shadow-xl">
        <h2 className="mb-6 text-lg font-bold">
          Quick Summary
        </h2>

        <div className="space-y-4">
          <div className="rounded-2xl bg-white p-4 shadow">
            <p className="text-sm text-slate-500">
              Total Students
            </p>
            <p className="text-2xl font-bold">
              {data.stats.students}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-4 shadow">
            <p className="text-sm text-slate-500">
              Active Courses
            </p>
            <p className="text-2xl font-bold">
              {data.stats.courses}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-4 shadow">
            <p className="text-sm text-slate-500">
              Attendance Rate
            </p>
            <p className="text-2xl font-bold">
              {data.stats.attendancePercentage}%
            </p>
          </div>
        </div>
      </Card>

    </div>
  </div>
);
};
