import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
};

export const Button = ({ className, variant = "primary", ...props }: Props) => (
  <button
    className={cn(
      "inline-flex h-10 items-center justify-center gap-2 rounded-md px-4 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60",
      variant === "primary" && "border broder-black hover:border-black bg-gray-900 text-white hover:text-black hover:bg-white",
      variant === "secondary" && "bg-slate-900 text-white hover:bg-slate-700 dark:bg-white dark:text-slate-950",
      variant === "ghost" && "bg-transparent text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800",
      variant === "danger" && "bg-danger text-white hover:bg-red-600",
      className
    )}
    {...props}
  />
);
