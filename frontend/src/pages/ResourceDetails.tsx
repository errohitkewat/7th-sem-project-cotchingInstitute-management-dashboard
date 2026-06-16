import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";

export const ResourceDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const data = location.state?.record || {};

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Details
        </h1>

        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={18} />
          Back
        </Button>
      </div>

      <Card>
        <div className="grid gap-4 md:grid-cols-2">
          {Object.entries(data).map(([key, value]) => (
            <div
              key={key}
              className="rounded-xl border border-slate-200 p-4 dark:border-slate-800"
            >
              <p className="text-xs text-slate-500">
                {key}
              </p>

              <p className="mt-1 font-medium">
                {String(value)}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};