import { AttendanceStatus, FeeStatus, Gender, PaymentStatus } from "@prisma/client";
import { z } from "zod";
import { dateString } from "./common.js";

export const studentSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(7),
    gender: z.nativeEnum(Gender),
    dateOfBirth: dateString,
    address: z.string().min(2),
    parentName: z.string().min(2),
    parentPhone: z.string().min(7),
    courseId: z.string().optional().nullable(),
    joiningDate: dateString,
    feesStatus: z.nativeEnum(FeeStatus).default(FeeStatus.PENDING)
  })
});

export const teacherSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(7),
    qualification: z.string().min(2),
    experience: z.coerce.number().int().nonnegative(),
    salary: z.coerce.number().nonnegative(),
    joiningDate: dateString
  })
});

export const courseSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    description: z.string().min(2),
    duration: z.string().min(2),
    fees: z.coerce.number().nonnegative(),
    teacherId: z.string().optional().nullable()
  })
});

export const attendanceSchema = z.object({
  body: z.object({
    studentId: z.string().min(1),
    date: dateString,
    status: z.nativeEnum(AttendanceStatus),
    remarks: z.string().optional()
  })
});

export const feeSchema = z.object({
  body: z.object({
    studentId: z.string().min(1),
    courseId: z.string().optional().nullable(),
    amount: z.coerce.number().positive(),
    dueDate: dateString,
    paymentDate: dateString.optional().nullable(),
    paymentStatus: z.nativeEnum(PaymentStatus)
  })
});

export const examSchema = z.object({
  body: z.object({
    title: z.string().min(2),
    courseId: z.string().min(1),
    date: dateString,
    maxMarks: z.coerce.number().int().positive()
  })
});

export const noticeSchema = z.object({
  body: z.object({
    title: z.string().min(2),
    body: z.string().min(2),
    published: z.boolean().default(false)
  })
});

export const timetableSchema = z.object({
  body: z.object({
    courseId: z.string().min(1),
    teacherId: z.string().optional().nullable(),
    classroom: z.string().min(1),
    dayOfWeek: z.string().min(1),
    startTime: z.string().min(1),
    endTime: z.string().min(1)
  })
});
