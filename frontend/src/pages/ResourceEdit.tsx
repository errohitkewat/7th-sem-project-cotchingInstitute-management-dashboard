import { ArrowLeft, Save } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useState } from "react";

export const ResourceEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState(
    location.state?.record || {}
  );

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <h1 className="text-2xl font-bold">
          Edit Record
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

          {Object.entries(form).map(
            ([key, value]) => (
              <div key={key}>
                <label className="mb-1 block text-sm">
                  {key}
                </label>

                <Input
                  value={String(value)}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      [key]: e.target.value,
                    })
                  }
                />
              </div>
            )
          )}

        </div>

        <Button className="mt-6">
          <Save size={16} />
          Save Changes
        </Button>

      </Card>
    </div>
  );
};