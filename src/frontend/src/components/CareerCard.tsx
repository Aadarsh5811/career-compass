import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Clock,
  DollarSign,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import type { CareerMatch } from "../types";
import { ProgressBar } from "./ProgressBar";

interface CareerCardProps {
  match: CareerMatch;
  rank: number;
  onStartRoadmap: (careerId: string) => void;
  isPending?: boolean;
  className?: string;
}

const sectorColors: Record<string, string> = {
  Technology: "bg-primary/10 text-primary border-primary/25",
  Finance: "bg-secondary/10 text-secondary border-secondary/25",
  Healthcare: "bg-accent/10 text-accent-foreground border-accent/25",
  Education: "bg-primary/10 text-primary border-primary/25",
  Design: "bg-secondary/10 text-secondary border-secondary/25",
  Engineering: "bg-primary/10 text-primary border-primary/25",
  Marketing: "bg-accent/10 text-accent-foreground border-accent/25",
  Science: "bg-secondary/10 text-secondary border-secondary/25",
  Business: "bg-primary/10 text-primary border-primary/25",
};

const demandColor: Record<string, string> = {
  Low: "bg-muted text-muted-foreground border-border",
  Medium: "bg-accent/10 text-accent-foreground border-accent/20",
  High: "bg-primary/10 text-primary border-primary/20",
  "Very High": "bg-secondary/10 text-secondary border-secondary/20",
};

function getSectorColor(category: string): string {
  return (
    sectorColors[category] ?? "bg-muted text-muted-foreground border-border"
  );
}

function formatSalary(usd: number): string {
  return `$${(usd / 1000).toFixed(0)}k`;
}

export function CareerCard({
  match,
  rank,
  onStartRoadmap,
  isPending,
  className,
}: CareerCardProps) {
  const { career, matchScore, matchReasons, skillGaps } = match;
  const [expanded, setExpanded] = useState(false);
  const matchPct = Math.round(matchScore * 100);

  const salaryMin = Math.round(career.avgSalaryUsd * 0.8);
  const salaryMax = Math.round(career.avgSalaryUsd * 1.25);

  const topSkills = career.requiredSkills.slice(0, 4);
  const extraSkills = career.requiredSkills.slice(4);

  return (
    <Card
      className={cn(
        "group flex flex-col transition-smooth hover:shadow-card relative overflow-hidden",
        matchPct >= 85 && "ring-2 ring-primary/30 border-primary/20",
        className,
      )}
      data-ocid={`career_card.item.${rank}`}
    >
      {/* Top match ribbon */}
      {rank === 1 && (
        <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-bl-lg flex items-center gap-1">
          <Sparkles className="h-2.5 w-2.5" />
          TOP MATCH
        </div>
      )}

      <CardHeader className="pb-2 pt-4 px-5">
        <div className="flex items-start justify-between gap-2 pr-16">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold font-display text-lg text-foreground leading-tight">
              {career.title}
            </h3>
          </div>
        </div>

        {/* Sector + demand badges */}
        <div className="flex items-center gap-2 flex-wrap mt-1.5">
          <Badge
            variant="outline"
            className={cn(
              "text-xs font-semibold",
              getSectorColor(career.category),
            )}
            data-ocid={`career_card.sector_badge.${rank}`}
          >
            {career.category}
          </Badge>
          {career.jobDemand && (
            <Badge
              variant="outline"
              className={cn(
                "text-[11px] font-semibold",
                demandColor[career.jobDemand],
              )}
            >
              {career.jobDemand} demand
            </Badge>
          )}
        </div>

        {/* Match score bar */}
        <div className="mt-3" data-ocid={`career_card.match_score.${rank}`}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-muted-foreground font-medium">
              Match score
            </span>
            <span
              className={cn(
                "text-sm font-bold tabular-nums",
                matchPct >= 80
                  ? "text-primary"
                  : matchPct >= 60
                    ? "text-secondary"
                    : "text-muted-foreground",
              )}
            >
              {matchPct}%
            </span>
          </div>
          <ProgressBar
            value={matchPct}
            size="sm"
            variant={matchPct >= 80 ? "primary" : "secondary"}
          />
        </div>
      </CardHeader>

      <CardContent className="px-5 pb-3 flex-1 space-y-3">
        {/* One-line description */}
        <p
          className={cn(
            "text-sm text-muted-foreground leading-relaxed",
            expanded ? "" : "line-clamp-2",
          )}
        >
          {career.description}
        </p>

        {/* Salary + time stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col gap-0.5 bg-muted/50 rounded-lg p-2.5">
            <div className="flex items-center gap-1 text-muted-foreground">
              <DollarSign className="h-3 w-3 shrink-0" />
              <span className="text-[10px] font-medium uppercase tracking-wide">
                Salary
              </span>
            </div>
            <span className="text-xs font-bold text-foreground">
              {formatSalary(salaryMin)}–{formatSalary(salaryMax)}
            </span>
            <span className="text-[10px] text-muted-foreground">per year</span>
          </div>

          <div className="flex flex-col gap-0.5 bg-muted/50 rounded-lg p-2.5">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-3 w-3 shrink-0" />
              <span className="text-[10px] font-medium uppercase tracking-wide">
                Ready in
              </span>
            </div>
            <span className="text-xs font-bold text-foreground">
              {career.timeToReadyMonths}mo
            </span>
            <span className="text-[10px] text-muted-foreground">
              to job-ready
            </span>
          </div>

          <div className="flex flex-col gap-0.5 bg-muted/50 rounded-lg p-2.5">
            <div className="flex items-center gap-1 text-muted-foreground">
              <TrendingUp className="h-3 w-3 shrink-0" />
              <span className="text-[10px] font-medium uppercase tracking-wide">
                Growth
              </span>
            </div>
            <span className="text-xs font-bold text-foreground line-clamp-2 leading-tight">
              {career.growthOutlook}
            </span>
          </div>
        </div>

        {/* Top skills */}
        {topSkills.length > 0 && (
          <div>
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
              Key skills
            </p>
            <div className="flex flex-wrap gap-1.5">
              {topSkills.map((skill) => (
                <span key={skill.name} className="skill-badge">
                  {skill.name}
                </span>
              ))}
              {!expanded && extraSkills.length > 0 && (
                <span className="skill-badge opacity-60">
                  +{extraSkills.length} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Expanded content */}
        {expanded && (
          <div className="space-y-3 border-t border-border pt-3">
            {extraSkills.length > 0 && (
              <div>
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
                  All required skills
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {extraSkills.map((skill) => (
                    <span key={skill.name} className="skill-badge">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {matchReasons.length > 0 && (
              <div>
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
                  Why this matches you
                </p>
                <ul className="space-y-1">
                  {matchReasons.map((reason) => (
                    <li
                      key={reason}
                      className="text-xs text-muted-foreground flex items-start gap-1.5"
                    >
                      <span className="text-primary mt-0.5 shrink-0">✓</span>
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {skillGaps.length > 0 && (
              <div>
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
                  Skills to develop
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {skillGaps.map((gap) => (
                    <span
                      key={gap}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-destructive/10 text-destructive border border-destructive/20"
                    >
                      {gap}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="px-5 pb-4 pt-0 flex gap-2">
        <Button
          size="sm"
          className="flex-1 text-sm font-semibold transition-smooth"
          onClick={() => onStartRoadmap(career.id)}
          disabled={isPending}
          data-ocid={`career_card.start_roadmap_button.${rank}`}
        >
          {isPending ? "Loading…" : "Start Roadmap"}
          <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="shrink-0 text-xs transition-smooth"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          data-ocid={`career_card.learn_more_button.${rank}`}
        >
          {expanded ? (
            <>
              Less <ChevronUp className="h-3 w-3 ml-1" />
            </>
          ) : (
            <>
              More <ChevronDown className="h-3 w-3 ml-1" />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
