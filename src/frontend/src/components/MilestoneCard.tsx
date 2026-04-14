import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Circle,
  Clock,
  FolderGit2,
  Loader2,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import type { LearningResource, Milestone } from "../types";
import { ResourceCard } from "./ResourceCard";
import { SkillBadge } from "./SkillBadge";

interface MilestoneCardProps {
  milestone: Milestone;
  index: number;
  isCompleted: boolean;
  isLast: boolean;
  resources: LearningResource[];
  onToggle: (milestoneId: string, completed: boolean) => void;
  isToggling?: boolean;
}

const PROJECTS: Record<string, string[]> = {};

function inferProjects(milestone: Milestone): string[] {
  // Surface any mentioned project-like items from skills gained
  const known = PROJECTS[milestone.id];
  if (known) return known;
  // Derive suggestions from gained skills
  if (milestone.skillsGained.length === 0) return [];
  return milestone.skillsGained
    .slice(0, 2)
    .map((s, i) => `${i === 0 ? "Build" : "Create"} a project using ${s}`);
}

export function MilestoneCard({
  milestone,
  index,
  isCompleted,
  isLast,
  resources,
  onToggle,
  isToggling = false,
}: MilestoneCardProps) {
  const [expanded, setExpanded] = useState(false);
  const projects = inferProjects(milestone);

  return (
    <div
      className="roadmap-milestone"
      data-ocid={`roadmap.milestone.item.${index + 1}`}
    >
      {/* Timeline spine */}
      <div className="flex flex-col items-center flex-shrink-0 w-10 pt-1">
        <button
          onClick={() => onToggle(milestone.id, !isCompleted)}
          type="button"
          disabled={isToggling}
          aria-label={
            isCompleted
              ? `Mark milestone ${index + 1} incomplete`
              : `Mark milestone ${index + 1} complete`
          }
          data-ocid={`roadmap.milestone.checkbox.${index + 1}`}
          className={cn(
            "w-8 h-8 rounded-full border-2 flex items-center justify-center transition-smooth focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 flex-shrink-0",
            isCompleted
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-card text-muted-foreground hover:border-primary/60 hover:text-primary",
          )}
        >
          {isToggling ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : isCompleted ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            <Circle className="h-4 w-4" />
          )}
        </button>
        {!isLast && (
          <div
            className={cn(
              "w-0.5 flex-1 mt-2 min-h-[2rem]",
              isCompleted ? "bg-primary/40" : "bg-border",
            )}
          />
        )}
      </div>

      {/* Card body */}
      <div
        className={cn(
          "flex-1 min-w-0 mb-6 rounded-xl border transition-smooth",
          isCompleted
            ? "border-primary/20 bg-primary/5"
            : "border-border bg-card",
        )}
      >
        {/* Header */}
        <div className="px-4 pt-4 pb-3">
          <div className="flex items-start gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
                  Step {index + 1}
                </span>
                {milestone.isOptional && (
                  <Badge
                    variant="outline"
                    className="text-[10px] px-1.5 py-0 text-muted-foreground"
                  >
                    Optional
                  </Badge>
                )}
                <Badge
                  variant="outline"
                  className="text-[10px] px-1.5 py-0 bg-accent/10 text-accent-foreground border-accent/20 flex items-center gap-1"
                >
                  <Clock className="h-2.5 w-2.5" />
                  {milestone.estimatedWeeks}w
                </Badge>
              </div>
              <h3
                className={cn(
                  "font-display font-bold text-base leading-snug",
                  isCompleted
                    ? "line-through text-muted-foreground"
                    : "text-foreground",
                )}
              >
                {milestone.title}
              </h3>
              {milestone.description && (
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  {milestone.description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Skills */}
        {(milestone.skillsRequired.length > 0 ||
          milestone.skillsGained.length > 0) && (
          <div className="px-4 pb-3 space-y-2">
            {milestone.skillsRequired.length > 0 && (
              <div>
                <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground mb-1.5">
                  Skills needed
                </p>
                <div className="flex flex-wrap gap-1">
                  {milestone.skillsRequired.map((s) => (
                    <SkillBadge key={s} name={s} variant="required" />
                  ))}
                </div>
              </div>
            )}
            {milestone.skillsGained.length > 0 && (
              <div>
                <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground mb-1.5">
                  You'll gain
                </p>
                <div className="flex flex-wrap gap-1">
                  {milestone.skillsGained.map((s) => (
                    <SkillBadge key={s} name={s} variant="acquired" />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Projects to build */}
        {projects.length > 0 && (
          <div className="px-4 pb-3">
            <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground mb-1.5 flex items-center gap-1">
              <FolderGit2 className="h-3 w-3" />
              Projects to build
            </p>
            <ul className="space-y-1">
              {projects.map((p) => (
                <li
                  key={p}
                  className="flex items-start gap-2 text-sm text-foreground"
                >
                  <Sparkles className="h-3.5 w-3.5 text-accent-foreground flex-shrink-0 mt-0.5" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Resources expand/collapse */}
        {resources.length > 0 && (
          <div className="border-t border-border">
            <Button
              variant="ghost"
              size="sm"
              className="w-full flex items-center justify-between px-4 py-3 h-auto text-xs font-medium text-muted-foreground hover:text-foreground rounded-none rounded-b-xl"
              onClick={() => setExpanded((v) => !v)}
              data-ocid={`roadmap.milestone.resources_toggle.${index + 1}`}
            >
              <span>
                {resources.length} learning resource
                {resources.length !== 1 ? "s" : ""}
              </span>
              {expanded ? (
                <ChevronUp className="h-3.5 w-3.5" />
              ) : (
                <ChevronDown className="h-3.5 w-3.5" />
              )}
            </Button>

            {expanded && (
              <div
                className="px-4 pb-4 grid grid-cols-1 sm:grid-cols-2 gap-3"
                data-ocid={`roadmap.milestone.resources_panel.${index + 1}`}
              >
                {resources.map((r) => (
                  <ResourceCard key={r.id} resource={r} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
