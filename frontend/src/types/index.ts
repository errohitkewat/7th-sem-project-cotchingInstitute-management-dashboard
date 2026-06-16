export type Role = "SUPER_ADMIN" | "ADMIN" | "TEACHER" | "STUDENT";

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  phone?: string;
};

export type Paginated<T> = {
  items: T[];
  total: number;
  page: number;
  limit: number;
};

export type Student = {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  dateOfBirth: string;
  address: string;
  parentName: string;
  parentPhone: string;
  joiningDate: string;
  feesStatus: string;
  course?: Course;
};

export type Teacher = {
  id: string;
  name: string;
  email: string;
  phone: string;
  qualification: string;
  experience: number;
  salary: string;
  joiningDate: string;
};

export type Course = {
  id: string;
  name: string;
  description: string;
  duration: string;
  fees: string;
  teacher?: Teacher;
  _count?: { students: number };
};

export type ChartPoint = { label: string; value: number };
