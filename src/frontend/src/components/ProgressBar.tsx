import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number; // 0–100
  label?: string;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "accent" | "secondary";
  className?: string;
  animated?: boolean;
}

const sizeStyles = {
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-4",
};

const variantFill = {
  primary: "bg-primary",
  accent: "bg-accent",
  secondary: "bg-secondary",
};

export function ProgressBar({
  value,
  label,
  showLabel = true,
  size = "md",
  variant = "primary",
  className,
  animated = true,
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className={cn("w-full", className)}>
      {(showLabel || label) && (
        <div className="flex items-center justify-between mb-1.5">
          {label && (
            <span className="text-xs font-medium text-muted-foreground">
              {label}
            </span>
          )}
          {showLabel && (
            <span className="text-xs font-semibold text-foreground tabular-nums">
              {clamped}%
            </span>
          )}
        </div>
      )}
      <div
        className={cn(
          "w-full rounded-full bg-muted overflow-hidden",
          sizeStyles[size],
        )}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-700 ease-out",
            variantFill[variant],
            animated && "transition-[width]",
          )}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
