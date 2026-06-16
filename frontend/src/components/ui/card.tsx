import type { HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export const Card = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "rounded-3xl border border-slate-200 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900",
      className
    )}
    {...props}
  />
);