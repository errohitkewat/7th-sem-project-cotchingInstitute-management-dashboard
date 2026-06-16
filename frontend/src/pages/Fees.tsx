import { ModulePage } from "./ModulePage";

export const Fees = () => (
  <ModulePage
    resource="fees"
    title="Fees"
    description="Collect fees, monitor pending dues, generate reports and export receipts."
    columns={["Amount", "Due Date", "Payment Status", "Receipt No"]}
    fields={[
      { key: "studentId", label: "Student ID", required: true },
      { key: "amount", label: "Amount", type: "number" },
      { key: "dueDate", label: "Due Date", type: "date", required: true },
      { key: "paymentDate", label: "Payment Date", type: "date" },
      { key: "paymentStatus", label: "Payment Status", type: "select", options: ["PAID", "PENDING", "FAILED"] }
    ]}
  />
);
