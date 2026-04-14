import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, Clock, Zap } from "lucide-react";
import type { Milestone } from "../types";

interface NextActionCardProps {
  milestone: Milestone;
  onViewRoadmap: () => void;
  className?: string;
}

export function NextActionCard({
  milestone,
  onViewRoadmap,
  className,
}: NextActionCardProps) {
  return (
    <div
      data-ocid="dashboard.next_action.card"
      className={cn(
        "relative overflow-hidden rounded-xl border border-primary/30 bg-primary/5 p-5 flex flex-col gap-3",
        className,
      )}
    >
      {/* Decorative gradient blob */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
        <div className="absolute -top-8 -right-8 w-36 h-36 bg-primary/10 rounded-full blur-2xl" />
      </div>

      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
          <Zap className="w-4 h-4 text-primary" />
        </div>
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">
          What to do next
        </span>
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-display font-bold text-lg text-foreground leading-snug line-clamp-2">
          {milestone.title}
        </h3>
        {milestone.description && (
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {milestone.description}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="w-3.5 h-3.5 shrink-0" />
          <span>
            ~{milestone.estimatedWeeks}{" "}
            {milestone.estimatedWeeks === 1 ? "week" : "weeks"} estimated
          </span>
        </div>

        <Button
          size="sm"
          variant="default"
          className="gap-1.5 shrink-0 h-8 text-xs"
          onClick={onViewRoadmap}
          data-ocid="dashboard.next_action.view_roadmap_button"
        >
          View Roadmap
          <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>
  );
}

interface NextActionEmptyProps {
  onViewRoadmap: () => void;
}

export function NextActionComplete({ onViewRoadmap }: NextActionEmptyProps) {
  return (
    <div
      data-ocid="dashboard.next_action.complete_card"
      className="relative overflow-hidden rounded-xl border border-primary/30 bg-primary/5 p-5 flex flex-col gap-3"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
        <div className="absolute -top-8 -right-8 w-36 h-36 bg-primary/10 rounded-full blur-2xl" />
      </div>
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
          <Zap className="w-4 h-4 text-primary" />
        </div>
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">
          Roadmap complete!
        </span>
      </div>
      <p className="text-sm text-muted-foreground">
        You've completed all milestones. Time to land that job!
      </p>
      <Button
        size="sm"
        variant="default"
        className="gap-1.5 w-fit h-8 text-xs"
        onClick={onViewRoadmap}
        data-ocid="dashboard.next_action.complete_roadmap_button"
      >
        Review Roadmap
        <ArrowRight className="w-3.5 h-3.5" />
      </Button>
    </div>
  );
}
