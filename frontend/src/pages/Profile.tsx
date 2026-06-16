import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useAuth } from "../context/AuthContext";

export const Profile = () => {
  const { user } = useAuth();
  return (
    <Card className="max-w-2xl">
      <h2 className="font-semibold">Profile</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <Input defaultValue={user?.name} />
        <Input defaultValue={user?.email} />
        <Input defaultValue={user?.role.replace("_", " ")} />
        <Input placeholder="Phone" defaultValue={user?.phone} />
      </div>
      <Button className="mt-5">Update Profile</Button>
    </Card>
  );
};
