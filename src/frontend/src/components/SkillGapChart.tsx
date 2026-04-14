import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2, TrendingUp } from "lucide-react";
import { ProgressBar } from "./ProgressBar";
import { SkillBadge } from "./SkillBadge";

interface SkillGapChartProps {
  userSkills: string[];
  requiredSkills: string[];
  className?: string;
}

export function SkillGapChart({
  userSkills,
  requiredSkills,
  className,
}: SkillGapChartProps) {
  const userSkillSet = new Set(userSkills.map((s) => s.toLowerCase()));
  const requiredSkillSet = new Set(requiredSkills.map((s) => s.toLowerCase()));

  const acquired = requiredSkills.filter((s) =>
    userSkillSet.has(s.toLowerCase()),
  );
  const gaps = requiredSkills.filter((s) => !userSkillSet.has(s.toLowerCase()));
  const bonusSkills = userSkills.filter(
    (s) => !requiredSkillSet.has(s.toLowerCase()),
  );

  const total = requiredSkills.length;
  const readinessPct =
    total > 0 ? Math.round((acquired.length / total) * 100) : 0;

  const readinessLabel =
    readinessPct >= 80
      ? "Almost ready"
      : readinessPct >= 50
        ? "Good progress"
        : readinessPct >= 25
          ? "Getting started"
          : "Beginner";

  const readinessVariant: "primary" | "accent" | "secondary" =
    readinessPct >= 75
      ? "accent"
      : readinessPct >= 40
        ? "primary"
        : "secondary";

  return (
    <div className={cn("space-y-5", className)}>
      {/* Readiness meter */}
      <div
        className="rounded-xl border border-border bg-card p-4 space-y-3"
        data-ocid="skill_gap.readiness_panel"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-foreground font-display">
              Skill Readiness
            </span>
          </div>
          <span
            className={cn(
              "text-xs font-medium px-2 py-0.5 rounded-full",
              readinessPct >= 75
                ? "bg-accent/15 text-accent-foreground"
                : readinessPct >= 40
                  ? "bg-primary/10 text-primary"
                  : "bg-secondary/10 text-secondary",
            )}
          >
            {readinessLabel}
          </span>
        </div>
        <ProgressBar
          value={readinessPct}
          variant={readinessVariant}
          size="lg"
          label={`${acquired.length} of ${total} required skills`}
          showLabel
        />
      </div>

      {/* Two-column breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Skills You Have */}
        <div
          className="rounded-xl border border-primary/20 bg-primary/5 p-4 space-y-3"
          data-ocid="skill_gap.acquired_panel"
        >
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
            <span className="text-sm font-semibold text-foreground font-display">
              Skills You Have
            </span>
            <span className="ml-auto text-xs font-medium text-primary tabular-nums">
              {acquired.length}
            </span>
          </div>
          {acquired.length === 0 ? (
            <p className="text-xs text-muted-foreground italic">
              No required skills matched yet
            </p>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {acquired.map((skill) => (
                <SkillBadge key={skill} name={skill} variant="acquired" />
              ))}
            </div>
          )}
          {bonusSkills.length > 0 && (
            <div className="pt-2 border-t border-primary/10">
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide mb-1.5">
                Bonus skills
              </p>
              <div className="flex flex-wrap gap-1">
                {bonusSkills.slice(0, 6).map((skill) => (
                  <SkillBadge key={skill} name={skill} variant="default" />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Skills You Need */}
        <div
          className="rounded-xl border border-accent/20 bg-accent/5 p-4 space-y-3"
          data-ocid="skill_gap.gap_panel"
        >
          <div className="flex items-center gap-2 mb-1">
            <AlertCircle className="h-4 w-4 text-accent-foreground flex-shrink-0" />
            <span className="text-sm font-semibold text-foreground font-display">
              Skills to Acquire
            </span>
            <span className="ml-auto text-xs font-medium text-accent-foreground tabular-nums">
              {gaps.length}
            </span>
          </div>
          {gaps.length === 0 ? (
            <p className="text-xs text-muted-foreground italic">
              You have all required skills!
            </p>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {gaps.map((skill) => (
                <SkillBadge key={skill} name={skill} variant="gap" />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
