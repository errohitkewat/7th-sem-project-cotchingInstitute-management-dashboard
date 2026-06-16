import { Role } from "@prisma/client";
import { Router } from "express";
import { makeResourceController } from "../controllers/resource.controller.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { idParam, paginationQuery } from "../validators/common.js";
import {
  attendanceSchema,
  courseSchema,
  examSchema,
  feeSchema,
  noticeSchema,
  studentSchema,
  teacherSchema,
  timetableSchema
} from "../validators/resource.validators.js";

const managers = [Role.SUPER_ADMIN, Role.ADMIN] as const;
const staff = [Role.SUPER_ADMIN, Role.ADMIN, Role.TEACHER] as const;

export const resourceRouter = Router();
resourceRouter.use(authenticate);

const students = makeResourceController("student", ["name", "email", "phone"], { course: true });
resourceRouter.get("/students", validate(paginationQuery), students.list);
resourceRouter.get("/students/:id", validate(idParam), students.get);
resourceRouter.post("/students", authorize(...managers), validate(studentSchema), students.create);
resourceRouter.put("/students/:id", authorize(...managers), validate(idParam.merge(studentSchema)), students.update);
resourceRouter.delete("/students/:id", authorize(...managers), validate(idParam), students.remove);

const teachers = makeResourceController("teacher", ["name", "email", "phone"], { courses: true });
resourceRouter.get("/teachers", validate(paginationQuery), teachers.list);
resourceRouter.get("/teachers/:id", validate(idParam), teachers.get);
resourceRouter.post("/teachers", authorize(...managers), validate(teacherSchema), teachers.create);
resourceRouter.put("/teachers/:id", authorize(...managers), validate(idParam.merge(teacherSchema)), teachers.update);
resourceRouter.delete("/teachers/:id", authorize(...managers), validate(idParam), teachers.remove);

const courses = makeResourceController("course", ["name", "duration"], { teacher: true, _count: { select: { students: true } } });
resourceRouter.get("/courses", validate(paginationQuery), courses.list);
resourceRouter.get("/courses/:id", validate(idParam), courses.get);
resourceRouter.post("/courses", authorize(...managers), validate(courseSchema), courses.create);
resourceRouter.put("/courses/:id", authorize(...managers), validate(idParam.merge(courseSchema)), courses.update);
resourceRouter.delete("/courses/:id", authorize(...managers), validate(idParam), courses.remove);

const attendance = makeResourceController("attendance", ["remarks"], { student: true });
resourceRouter.get("/attendance", validate(paginationQuery), attendance.list);
resourceRouter.post("/attendance", authorize(...staff), validate(attendanceSchema), attendance.create);

const fees = makeResourceController("fee", ["receiptNo"], { student: true });
resourceRouter.get("/fees", validate(paginationQuery), fees.list);
resourceRouter.post("/fees", authorize(...managers), validate(feeSchema), fees.create);

const exams = makeResourceController("exam", ["title"], { course: true, results: true });
resourceRouter.get("/exams", validate(paginationQuery), exams.list);
resourceRouter.post("/exams", authorize(...staff), validate(examSchema), exams.create);

const notices = makeResourceController("notice", ["title", "body"]);
resourceRouter.get("/notices", validate(paginationQuery), notices.list);
resourceRouter.post("/notices", authorize(...staff), validate(noticeSchema), notices.create);
resourceRouter.put("/notices/:id", authorize(...staff), validate(idParam.merge(noticeSchema)), notices.update);
resourceRouter.delete("/notices/:id", authorize(...managers), validate(idParam), notices.remove);

const timetables = makeResourceController("timetable", ["classroom", "dayOfWeek"], { course: true, teacher: true });
resourceRouter.get("/timetable", validate(paginationQuery), timetables.list);
resourceRouter.post("/timetable", authorize(...staff), validate(timetableSchema), timetables.create);
