import { type ReactNode } from "react";

export interface CalloutProps {
  type: "tip" | "warning" | "note" | "insight";
  children: ReactNode;
}

const config: Record<
  CalloutProps["type"],
  { border: string; bg: string; icon: string; label: string }
> = {
  tip: {
    border: "border-l-green-500",
    bg: "bg-green-50 dark:bg-green-950/30",
    icon: "\u2713",
    label: "Tip",
  },
  warning: {
    border: "border-l-amber-500",
    bg: "bg-amber-50 dark:bg-amber-950/30",
    icon: "\u26A0",
    label: "Warning",
  },
  note: {
    border: "border-l-blue-500",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    icon: "\u2139",
    label: "Note",
  },
  insight: {
    border: "border-l-purple-500",
    bg: "bg-purple-50 dark:bg-purple-950/30",
    icon: "\u2728",
    label: "Insight",
  },
};

export default function Callout({ type, children }: CalloutProps) {
  const { border, bg, icon, label } = config[type];

  return (
    <aside
      role="note"
      aria-label={label}
      className={`my-6 rounded-r-lg border-l-4 ${border} ${bg} p-4`}
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 text-base" aria-hidden="true">
          {icon}
        </span>
        <div className="min-w-0 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
          {children}
        </div>
      </div>
    </aside>
  );
}
