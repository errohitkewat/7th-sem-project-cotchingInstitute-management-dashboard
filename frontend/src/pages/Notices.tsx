import { ModulePage } from "./ModulePage";

export const Notices = () => (
  <ModulePage
    resource="notices"
    title="Notices"
    description="Create, edit, publish and manage institute announcements."
    columns={["Title", "Published", "Created At"]}
    fields={[
      { key: "title", label: "Title", required: true },
      { key: "body", label: "Body", type: "textarea", required: true },
      { key: "published", label: "Published", type: "select", options: ["true", "false"] }
    ]}
  />
);
