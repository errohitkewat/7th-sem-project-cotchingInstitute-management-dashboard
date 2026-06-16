import { ModulePage } from "./ModulePage";

export const Attendance = () => (
  <ModulePage
    resource="attendance"
    title="Attendance"
    description="Mark daily attendance, inspect monthly records and prepare attendance reports."
    columns={["Date", "Status", "Remarks"]}
    fields={[
      { key: "studentId", label: "Student ID", required: true },
      { key: "date", label: "Date", type: "date", required: true },
      { key: "status", label: "Status", type: "select", options: ["PRESENT", "ABSENT", "LATE"] },
      { key: "remarks", label: "Remarks" }
    ]}
  />
);
