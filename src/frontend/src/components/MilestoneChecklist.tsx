import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { CheckCircle2, Circle, Clock, Loader2 } from "lucide-react";
import { useToggleMilestone } from "../hooks/use-backend";
import type { Milestone, MilestoneProgress } from "../types";

interface MilestoneRowProps {
  milestone: Milestone;
  completed: boolean;
  index: number;
}

function MilestoneRow({ milestone, completed, index }: MilestoneRowProps) {
  const { mutate: toggle, isPending } = useToggleMilestone();

  const handleToggle = () => {
    toggle({ milestoneId: milestone.id, completed: !completed });
  };

  return (
    <div
      data-ocid={`dashboard.milestone.item.${index}`}
      className={cn(
        "flex items-start gap-3 px-4 py-3 rounded-lg border transition-smooth group",
        completed
          ? "bg-muted/40 border-border/60 opacity-70"
          : "bg-card border-border hover:border-primary/30 hover:bg-primary/[0.02]",
      )}
    >
      {/* Checkbox */}
      <div className="mt-0.5 shrink-0">
        {isPending ? (
          <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
        ) : completed ? (
          <CheckCircle2 className="w-4 h-4 text-primary" />
        ) : (
          <Checkbox
            checked={completed}
            onCheckedChange={handleToggle}
            data-ocid={`dashboard.milestone.checkbox.${index}`}
            className="rounded-full"
            aria-label={`Mark "${milestone.title}" as complete`}
          />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p
          className={cn(
            "text-sm font-medium leading-snug",
            completed
              ? "line-through text-muted-foreground"
              : "text-foreground",
          )}
        >
          {milestone.order}. {milestone.title}
        </p>
        {milestone.description && !completed && (
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
            {milestone.description}
          </p>
        )}
      </div>

      {/* Time */}
      <div className="flex items-center gap-1 shrink-0 text-xs text-muted-foreground whitespace-nowrap mt-0.5">
        <Clock className="w-3 h-3" />
        <span>{milestone.estimatedWeeks}w</span>
      </div>
    </div>
  );
}

interface MilestoneChecklistProps {
  milestones: Milestone[];
  milestoneProgress: MilestoneProgress[];
}

export function MilestoneChecklist({
  milestones,
  milestoneProgress,
}: MilestoneChecklistProps) {
  const progressMap = new Map(
    milestoneProgress.map((p) => [p.milestoneId, p.completed]),
  );

  const sorted = [...milestones].sort((a, b) => a.order - b.order);
  const done = sorted.filter((m) => progressMap.get(m.id));
  const pending = sorted.filter((m) => !progressMap.get(m.id));
  const ordered = [...pending, ...done];

  if (milestones.length === 0) {
    return (
      <div
        data-ocid="dashboard.milestone.empty_state"
        className="flex flex-col items-center justify-center py-10 text-center"
      >
        <Circle className="w-8 h-8 text-muted-foreground/40 mb-2" />
        <p className="text-sm text-muted-foreground">No milestones yet.</p>
      </div>
    );
  }

  return (
    <div data-ocid="dashboard.milestone.list" className="flex flex-col gap-2">
      {ordered.map((milestone, i) => (
        <MilestoneRow
          key={milestone.id}
          milestone={milestone}
          completed={!!progressMap.get(milestone.id)}
          index={i + 1}
        />
      ))}
    </div>
  );
}
