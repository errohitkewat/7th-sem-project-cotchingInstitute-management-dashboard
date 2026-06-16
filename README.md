# Cotching Institute Management Dashboard

A localhost-first coaching institute management dashboard built with React, TypeScript, Vite, Tailwind CSS, React Query, React Router, Chart.js, Node.js, Express, Prisma and PostgreSQL.

## Features

- JWT authentication with protected routes and role-based middleware.
- Dashboard analytics for revenue, student growth, attendance and course popularity.
- Management pages for students, teachers, courses, attendance, fees, exams, notices and timetable.
- Reports, settings, profile, responsive sidebar/navbar, dark mode, global search surface, loading skeletons and CSV export.
- Prisma models for User, Student, Teacher, Course, Attendance, Fee, Exam, Result, Notice, Timetable and ActivityLog.

## Prerequisites

- Node.js 22+
- PostgreSQL running locally
- npm 11+

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create backend environment:

```bash
cp backend/.env.example backend/.env
```

3. Update `backend/.env` if your PostgreSQL username, password or database name differs.

4. Generate Prisma client and run migrations:

```bash
npm run db:generate
npm run db:migrate
```

5. Seed demo data:

```bash
npm run db:seed
```

6. Start both apps:

```bash
npm run dev
```

Frontend: `http://localhost:5173`

Backend: `http://localhost:4000`

Demo login:

- Email: `rohitkewat@gmail.com`
- Password: `Rohit@1234`

## API Overview

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/forgot-password`
- `GET /api/dashboard/overview`
- `GET|POST /api/students`
- `GET|PUT|DELETE /api/students/:id`
- `GET|POST /api/teachers`
- `PUT|DELETE /api/teachers/:id`
- `GET|POST /api/courses`
- `PUT|DELETE /api/courses/:id`
- `GET|POST /api/attendance`
- `GET|POST /api/fees`
- `GET|POST /api/exams`
- `GET|POST /api/notices`
- `PUT|DELETE /api/notices/:id`
- `GET|POST /api/timetable`

## Project Structure

```text
backend/
  prisma/
  src/
    config/
    controllers/
    middleware/
    routes/
    services/
    utils/
    validators/
frontend/
  src/
    components/
    context/
    hooks/
    layouts/
    pages/
    routes/
    services/
    types/
    utils/
```
