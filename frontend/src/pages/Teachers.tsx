import { ModulePage } from "./ModulePage";

export const Teachers = () => (
  <ModulePage
    resource="teachers"
    title="Teachers"
    description="Track teacher profiles, assigned courses, salary details and employment history."
    columns={["Name", "Email", "Phone", "Qualification", "Experience"]}
    fields={[
      { key: "name", label: "Name", required: true },
      { key: "email", label: "Email", required: true },
      { key: "phone", label: "Phone", required: true },
      { key: "qualification", label: "Qualification", required: true },
      { key: "experience", label: "Experience", type: "number" },
      { key: "salary", label: "Salary", type: "number" },
      { key: "joiningDate", label: "Joining Date", type: "date", required: true }
    ]}
  />
);
