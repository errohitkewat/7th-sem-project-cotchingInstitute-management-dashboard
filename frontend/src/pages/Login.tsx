import { zodResolver } from "@hookform/resolvers/zod";
import { GraduationCap } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { useAuth } from "../context/AuthContext";

const schema = z.object({ email: z.string().email(), password: z.string().min(1) });
type FormValues = z.infer<typeof schema>;

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const form = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { email: "rohitkewat@gmail.com", password: "Rohit@1234" } });

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      await login(values.email, values.password);
      navigate("/");
    } catch {
      setError("Invalid email or password");
    }
  });

  return (
    <div className="grid min-h-screen place-items-center bg-neutralSoft p-4 dark:bg-slate-950">
      <Card className="w-full max-w-md">
        <div className="mb-6 flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-lg bg-primary text-white">
            <GraduationCap />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-slate-950 dark:text-white">EduManage Pro</h1>
            <p className="text-sm text-slate-500">Sign in to your institute dashboard</p>
          </div>
        </div>
        <form className="space-y-4" onSubmit={onSubmit}>
          <Input placeholder="Email" {...form.register("email")} />
          <Input placeholder="Password" type="password" {...form.register("password")} />
          {error && <p className="text-sm text-danger">{error}</p>}
          <Button className="w-full" disabled={form.formState.isSubmitting}>
            Login
          </Button>
        </form>
        <div className="mt-5 flex justify-between text-sm text-slate-500">
          <Link to="/forgot-password" className="hover:text-primary">Forgot password?</Link>
          <Link to="/register" className="hover:text-primary">Create account</Link>
        </div>
      </Card>
    </div>
  );
};
