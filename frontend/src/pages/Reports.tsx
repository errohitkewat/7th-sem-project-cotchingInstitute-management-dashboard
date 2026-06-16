import { FileText } from "lucide-react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";

const reports = ["Student Report", "Attendance Report", "Fee Report", "Teacher Report", "Course Report"];

export const Reports = () => (
  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
    {reports.map((report) => (
      <Card key={report}>
        <FileText className="mb-4 text-primary" />
        <h2 className="font-semibold">{report}</h2>
        <p className="mt-2 text-sm text-slate-500">Generate institute-ready summaries from the latest operational data.</p>
        <Button className="mt-5">Generate</Button>
      </Card>
    ))}
  </div>
);
