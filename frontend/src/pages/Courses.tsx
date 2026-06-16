import { ModulePage } from "./ModulePage";

export const Courses = () => (
  <ModulePage
    resource="courses"
    title="Courses"
    description="Create course offerings with fees, duration, descriptions and teacher assignment."
    columns={["Name", "Duration", "Fees", "Description"]}
    fields={[
      { key: "name", label: "Course Name", required: true },
      { key: "description", label: "Description", type: "textarea", required: true },
      { key: "duration", label: "Duration", required: true },
      { key: "fees", label: "Fees", type: "number" }
    ]}
  />
);
