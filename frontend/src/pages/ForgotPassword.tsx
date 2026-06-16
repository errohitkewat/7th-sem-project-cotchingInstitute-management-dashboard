import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { api } from "../services/api";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <div className="grid min-h-screen place-items-center bg-neutralSoft p-4 dark:bg-slate-950">
      <Card className="w-full max-w-md">
        <h1 className="text-xl font-semibold">Reset password</h1>
        <form
          className="mt-6 space-y-4"
          onSubmit={async (event) => {
            event.preventDefault();
            await api.post("/api/auth/forgot-password", { email });
            setSent(true);
          }}
        >
          <Input placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
          <Button className="w-full">Send reset request</Button>
        </form>
        {sent && <p className="mt-4 text-sm text-success">Reset request recorded.</p>}
        <Link to="/login" className="mt-5 block text-sm text-slate-500 hover:text-primary">Back to login</Link>
      </Card>
    </div>
  );
};
