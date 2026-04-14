import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type SkillVariant = "default" | "acquired" | "gap" | "required";
type SkillLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert";

interface SkillBadgeProps {
  name: string;
  level?: SkillLevel;
  variant?: SkillVariant;
  className?: string;
}

const levelColors: Record<SkillLevel, string> = {
  Beginner: "bg-primary/10 text-primary border-primary/20",
  Intermediate: "bg-secondary/10 text-secondary border-secondary/20",
  Advanced: "bg-accent/15 text-accent-foreground border-accent/30",
  Expert: "bg-primary/20 text-primary border-primary/40",
};

const variantStyles: Record<SkillVariant, string> = {
  default: "bg-muted text-muted-foreground border-border",
  acquired: "bg-primary/10 text-primary border-primary/20",
  gap: "bg-destructive/10 text-destructive border-destructive/20",
  required: "bg-secondary/10 text-secondary border-secondary/20",
};

export function SkillBadge({
  name,
  level,
  variant = "default",
  className,
}: SkillBadgeProps) {
  const colorClass = level ? levelColors[level] : variantStyles[variant];

  return (
    <Badge
      variant="outline"
      className={cn(
        "skill-badge font-medium transition-smooth cursor-default select-none",
        colorClass,
        className,
      )}
    >
      {name}
      {level && <span className="ml-1 opacity-60 text-[10px]">· {level}</span>}
    </Badge>
  );
}
