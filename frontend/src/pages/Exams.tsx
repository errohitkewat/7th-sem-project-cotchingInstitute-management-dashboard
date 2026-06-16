import { ModulePage } from "./ModulePage";

export const Exams = () => (
  <ModulePage
    resource="exams"
    title="Exams"
    description="Schedule exams, enter marks, generate results and review rankings."
    columns={["Title", "Date", "Max Marks"]}
    fields={[
      { key: "title", label: "Title", required: true },
      { key: "courseId", label: "Course ID", required: true },
      { key: "date", label: "Date", type: "date", required: true },
      { key: "maxMarks", label: "Max Marks", type: "number" }
    ]}
  />
);
