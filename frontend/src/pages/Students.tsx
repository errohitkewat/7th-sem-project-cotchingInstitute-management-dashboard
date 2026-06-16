import { ModulePage } from "./ModulePage";

export const Students = () => (
  <ModulePage
    resource="students"
    title="Students"
    description="Manage admissions, profiles, parent details, search, filters, pagination and CSV exports."
    columns={["Name", "Email", "Phone", "Gender", "Fees Status"]}
    fields={[
      { key: "name", label: "Name", required: true },
      { key: "email", label: "Email", required: true },
      { key: "phone", label: "Phone", required: true },
      { key: "gender", label: "Gender", type: "select", options: ["MALE", "FEMALE", "OTHER"] },
      { key: "dateOfBirth", label: "Date Of Birth", type: "date", required: true },
      { key: "address", label: "Address", required: true },
      { key: "parentName", label: "Parent Name", required: true },
      { key: "parentPhone", label: "Parent Phone", required: true },
      { key: "joiningDate", label: "Joining Date", type: "date", required: true },
      { key: "feesStatus", label: "Fees Status", type: "select", options: ["PAID", "PENDING", "PARTIAL", "OVERDUE"] }
    ]}
  />
);
