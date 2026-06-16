import { AttendanceStatus, PaymentStatus } from "@prisma/client";
import { prisma } from "../config/prisma.js";

const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const dashboardService = {
  async overview() {
    const [students, teachers, courses, paidFees, attendance, activities, coursePopularity] = await Promise.all([
      prisma.student.count(),
      prisma.teacher.count(),
      prisma.course.count(),
      prisma.fee.findMany({ where: { paymentStatus: PaymentStatus.PAID }, select: { amount: true, paymentDate: true } }),
      prisma.attendance.findMany({ select: { status: true, date: true } }),
      prisma.activityLog.findMany({ take: 8, orderBy: { createdAt: "desc" } }),
      prisma.course.findMany({ select: { name: true, _count: { select: { students: true } } } })
    ]);

    const revenue = paidFees.reduce((sum, fee) => sum + Number(fee.amount), 0);
    const present = attendance.filter((row) => row.status === AttendanceStatus.PRESENT).length;
    const attendancePercentage = attendance.length ? Math.round((present / attendance.length) * 100) : 0;

    const monthlyRevenue = monthLabels.map((label, index) => ({
      label,
      value: paidFees
        .filter((fee) => fee.paymentDate && fee.paymentDate.getMonth() === index)
        .reduce((sum, fee) => sum + Number(fee.amount), 0)
    }));

    const attendanceTrend = monthLabels.map((label, index) => {
      const monthRows = attendance.filter((row) => row.date.getMonth() === index);
      const monthPresent = monthRows.filter((row) => row.status === AttendanceStatus.PRESENT).length;
      return { label, value: monthRows.length ? Math.round((monthPresent / monthRows.length) * 100) : 0 };
    });

    return {
      stats: { students, teachers, courses, revenue, attendancePercentage },
      monthlyRevenue,
      studentGrowth: monthLabels.map((label, index) => ({ label, value: Math.max(0, students - (11 - index) * 3) })),
      attendanceTrend,
      coursePopularity: coursePopularity.map((course) => ({ label: course.name, value: course._count.students })),
      activities
    };
  }
};
