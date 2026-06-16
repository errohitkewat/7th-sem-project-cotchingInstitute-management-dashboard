import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useTheme } from "../context/ThemeContext";

export const Settings = () => {
  const { toggleTheme } = useTheme();
  return (
    <div className="grid gap-4 xl:grid-cols-2">
      <Card>
        <h2 className="font-semibold">Institute Information</h2>
        <div className="mt-5 space-y-4">
          <Input placeholder="Institute name" defaultValue="EduManage Coaching Institute" />
          <Input placeholder="Address" defaultValue="Main Campus" />
          <Input placeholder="Contact email" defaultValue="admin@edumanage.local" />
          <Button>Save Settings</Button>
        </div>
      </Card>
      <Card>
        <h2 className="font-semibold">Theme Settings</h2>
        <p className="mt-2 text-sm text-slate-500">Switch between light and dark mode for the dashboard.</p>
        <Button className="mt-5" variant="secondary" onClick={toggleTheme}>Toggle Theme</Button>
      </Card>
    </div>
  );
};
