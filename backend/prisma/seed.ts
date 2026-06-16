import bcrypt from "bcrypt";
import { AttendanceStatus, FeeStatus, Gender, PaymentStatus, PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("Rohit@1234", 12);

  const newAdmin = await prisma.user.findUnique({ where: { email: "rohitkewat@gmail.com" } });
  const oldAdmin = await prisma.user.findUnique({ where: { email: "admin@edumanage.local" } });
  const existingAdmin = newAdmin ?? oldAdmin;

  const admin = existingAdmin
    ? await prisma.user.update({
        where: { id: existingAdmin.id },
        data: {
          name: "Rohit Kewat",
          email: newAdmin ? newAdmin.email : "rohitkewat@gmail.com",
          passwordHash,
          role: Role.SUPER_ADMIN,
          phone: "+91 9876543210"
        }
      })
    : await prisma.user.create({
        data: {
          name: "Rohit Kewat",
          email: "rohitkewat@gmail.com",
          passwordHash,
          role: Role.SUPER_ADMIN,
          phone: "+91 9876543210"
        }
      });

  const teacher = await prisma.teacher.upsert({
    where: { email: "ananya@edumanage.local" },
    update: {
      name: "Ananya Sharma",
      phone: "+91 9812345670",
      qualification: "M.Sc Mathematics",
      experience: 8,
      salary: 65000,
      joiningDate: new Date("2022-06-01")
    },
    create: {
      name: "Ananya Sharma",
      email: "ananya@edumanage.local",
      phone: "+91 9812345670",
      qualification: "M.Sc Mathematics",
      experience: 8,
      salary: 65000,
      joiningDate: new Date("2022-06-01")
    }
  });

  const existingCourse = await prisma.course.findFirst({ where: { name: "JEE Foundation" } });
  const course = existingCourse
    ? await prisma.course.update({
        where: { id: existingCourse.id },
        data: {
          description: "Physics, Chemistry and Mathematics foundation program.",
          duration: "12 months",
          fees: 45000,
          teacherId: teacher.id
        }
      })
    : await prisma.course.create({
        data: {
          name: "JEE Foundation",
          description: "Physics, Chemistry and Mathematics foundation program.",
          duration: "12 months",
          fees: 45000,
          teacherId: teacher.id
        }
      });

  const students = await Promise.all(
    [
      ["Aarav Mehta", "aarav@edumanage.local", FeeStatus.PAID],
      ["Diya Patel", "diya@edumanage.local", FeeStatus.PENDING],
      ["Kabir Rao", "kabir@edumanage.local", FeeStatus.PARTIAL]
    ].map(([name, email, feesStatus], index) =>
      prisma.student.upsert({
        where: { email },
        update: {
          name,
          phone: `+91 90000000${index + 10}`,
          gender: index === 1 ? Gender.FEMALE : Gender.MALE,
          dateOfBirth: new Date(`2008-0${index + 3}-12`),
          address: "Demo campus address",
          parentName: "Parent Guardian",
          parentPhone: `+91 89999999${index + 10}`,
          courseId: course.id,
          joiningDate: new Date("2025-04-15"),
          feesStatus: feesStatus as FeeStatus
        },
        create: {
          name,
          email,
          phone: `+91 90000000${index + 10}`,
          gender: index === 1 ? Gender.FEMALE : Gender.MALE,
          dateOfBirth: new Date(`2008-0${index + 3}-12`),
          address: "Demo campus address",
          parentName: "Parent Guardian",
          parentPhone: `+91 89999999${index + 10}`,
          courseId: course.id,
          joiningDate: new Date("2025-04-15"),
          feesStatus: feesStatus as FeeStatus
        }
      })
    )
  );

  await Promise.all(
    students.map((student, index) =>
      prisma.attendance.upsert({
        where: { studentId_date: { studentId: student.id, date: new Date(`2026-06-0${index + 1}`) } },
        update: {
          status: index === 1 ? AttendanceStatus.ABSENT : AttendanceStatus.PRESENT,
          remarks: index === 1 ? "Parent informed" : "On time"
        },
        create: {
          studentId: student.id,
          date: new Date(`2026-06-0${index + 1}`),
          status: index === 1 ? AttendanceStatus.ABSENT : AttendanceStatus.PRESENT,
          remarks: index === 1 ? "Parent informed" : "On time"
        }
      })
    )
  );

  await prisma.fee.upsert({
    where: { receiptNo: "RCPT-1001" },
    update: {
      studentId: students[0].id,
      courseId: course.id,
      amount: 45000,
      dueDate: new Date("2026-05-01"),
      paymentDate: new Date("2026-05-03"),
      paymentStatus: PaymentStatus.PAID
    },
    create: {
      studentId: students[0].id,
      courseId: course.id,
      amount: 45000,
      dueDate: new Date("2026-05-01"),
      paymentDate: new Date("2026-05-03"),
      paymentStatus: PaymentStatus.PAID,
      receiptNo: "RCPT-1001"
    }
  });

  const existingExam = await prisma.exam.findFirst({
    where: { title: "Foundation Mock Test 1", courseId: course.id }
  });
  if (existingExam) {
    await prisma.exam.update({
      where: { id: existingExam.id },
      data: { date: new Date("2026-06-20"), maxMarks: 300 }
    });
  } else {
    await prisma.exam.create({
      data: {
        title: "Foundation Mock Test 1",
        courseId: course.id,
        date: new Date("2026-06-20"),
        maxMarks: 300
      }
    });
  }

  const existingNotice = await prisma.notice.findFirst({ where: { title: "New batch orientation" } });
  if (existingNotice) {
    await prisma.notice.update({
      where: { id: existingNotice.id },
      data: {
        body: "Orientation for the new JEE Foundation batch starts this Saturday.",
        published: true,
        publishedAt: new Date()
      }
    });
  } else {
    await prisma.notice.create({
      data: {
        title: "New batch orientation",
        body: "Orientation for the new JEE Foundation batch starts this Saturday.",
        published: true,
        publishedAt: new Date()
      }
    });
  }

  const existingTimetable = await prisma.timetable.findFirst({
    where: { courseId: course.id, classroom: "Room 204", dayOfWeek: "Monday" }
  });
  if (existingTimetable) {
    await prisma.timetable.update({
      where: { id: existingTimetable.id },
      data: { teacherId: teacher.id, startTime: "09:00", endTime: "10:30" }
    });
  } else {
    await prisma.timetable.create({
      data: {
        courseId: course.id,
        teacherId: teacher.id,
        classroom: "Room 204",
        dayOfWeek: "Monday",
        startTime: "09:00",
        endTime: "10:30"
      }
    });
  }

  await prisma.activityLog.create({
    data: { userId: admin.id, action: "SEEDED", entity: "Database", metadata: { version: "1.0.0" } }
  });
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
