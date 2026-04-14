import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface CircularProgressProps {
  value: number; // 0–100
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export function CircularProgress({
  value,
  size = 64,
  strokeWidth = 5,
  className,
}: CircularProgressProps) {
  const clamped = Math.min(100, Math.max(0, value));
  const r = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * r;
  const dash = (clamped / 100) * circumference;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={cn("rotate-[-90deg]", className)}
      aria-label={`${clamped}% complete`}
      role="img"
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        strokeWidth={strokeWidth}
        className="stroke-muted"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        strokeWidth={strokeWidth}
        strokeDasharray={`${dash} ${circumference - dash}`}
        strokeLinecap="round"
        className="stroke-primary transition-all duration-700 ease-out"
      />
    </svg>
  );
}

interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  icon?: ReactNode;
  circularPercent?: number;
  accent?: "primary" | "secondary" | "accent";
  className?: string;
  "data-ocid"?: string;
}

const accentRing: Record<string, string> = {
  primary: "ring-primary/20",
  secondary: "ring-secondary/20",
  accent: "ring-accent/20",
};

const accentText: Record<string, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  accent: "text-accent",
};

export function StatCard({
  label,
  value,
  sub,
  icon,
  circularPercent,
  accent = "primary",
  className,
  "data-ocid": dataOcid,
}: StatCardProps) {
  return (
    <div
      data-ocid={dataOcid}
      className={cn(
        "relative bg-card rounded-xl border border-border p-5 flex items-center gap-4 ring-2 elevation-subtle transition-smooth hover:elevation-card",
        accentRing[accent],
        className,
      )}
    >
      {circularPercent !== undefined ? (
        <div className="relative shrink-0 flex items-center justify-center">
          <CircularProgress value={circularPercent} size={64} strokeWidth={5} />
          <span
            className={cn(
              "absolute text-sm font-bold tabular-nums",
              accentText[accent],
            )}
            style={{ transform: "rotate(0deg)" }}
          >
            {circularPercent}%
          </span>
        </div>
      ) : icon ? (
        <div
          className={cn(
            "shrink-0 w-12 h-12 rounded-xl flex items-center justify-center",
            accent === "primary" && "bg-primary/10",
            accent === "secondary" && "bg-secondary/10",
            accent === "accent" && "bg-accent/10",
          )}
        >
          <span className={accentText[accent]}>{icon}</span>
        </div>
      ) : null}

      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide truncate">
          {label}
        </p>
        <p
          className={cn(
            "text-2xl font-bold font-display tabular-nums leading-tight mt-0.5",
            accentText[accent],
          )}
        >
          {value}
        </p>
        {sub && (
          <p className="text-xs text-muted-foreground mt-0.5 truncate">{sub}</p>
        )}
      </div>
    </div>
  );
}
