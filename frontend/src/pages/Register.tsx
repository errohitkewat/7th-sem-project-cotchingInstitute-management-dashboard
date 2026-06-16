import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { useAuth } from "../context/AuthContext";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(["SUPER_ADMIN", "ADMIN", "TEACHER", "STUDENT"])
});

export const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { role: "STUDENT" }
  });

  const onSubmit = form.handleSubmit(async (values) => {
    await register(values);
    navigate("/");
  });

  return (
    <div className="grid min-h-screen place-items-center bg-neutralSoft p-4 dark:bg-slate-950">
      <Card className="w-full max-w-md">
        <h1 className="text-xl font-semibold">Create account</h1>
        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <Input placeholder="Full name" {...form.register("name")} />
          <Input placeholder="Email" {...form.register("email")} />
          <Input placeholder="Password" type="password" {...form.register("password")} />
          <select className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm dark:border-slate-800 dark:bg-slate-950" {...form.register("role")}>
            <option value="STUDENT">Student</option>
            <option value="TEACHER">Teacher</option>
            <option value="ADMIN">Admin</option>
            <option value="SUPER_ADMIN">Super Admin</option>
          </select>
          <Button className="w-full" disabled={form.formState.isSubmitting}>Register</Button>
        </form>
        <Link to="/login" className="mt-5 block text-sm text-slate-500 hover:text-primary">Back to login</Link>
      </Card>
    </div>
  );
};
