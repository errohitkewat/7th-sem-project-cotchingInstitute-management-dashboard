import { ModulePage } from "./ModulePage";

export const Timetable = () => (
  <ModulePage
    resource="timetable"
    title="Timetable"
    description="Build weekly schedules with classroom, course and teacher assignments."
    columns={["Day Of Week", "Classroom", "Start Time", "End Time"]}
    fields={[
      { key: "courseId", label: "Course ID", required: true },
      { key: "teacherId", label: "Teacher ID" },
      { key: "classroom", label: "Classroom", required: true },
      { key: "dayOfWeek", label: "Day Of Week", required: true },
      { key: "startTime", label: "Start Time", required: true },
      { key: "endTime", label: "End Time", required: true }
    ]}
  />
);
