import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  Briefcase,
  DollarSign,
  MapPin,
  TrendingUp,
} from "lucide-react";
import { useMemo } from "react";
import { Layout } from "../components/Layout";
import { MilestoneCard } from "../components/MilestoneCard";
import { ProgressBar } from "../components/ProgressBar";
import { SkillGapChart } from "../components/SkillGapChart";
import {
  useCareerPath,
  useRoadmap,
  useToggleMilestone,
  useUserProgress,
} from "../hooks/use-backend";

// TanStack Router param extraction
import { useParams } from "@tanstack/react-router";
import type { LearningResource } from "../types";

// Fallback sample resources per milestone if backend returns none
const SAMPLE_RESOURCES: LearningResource[] = [
  {
    id: "r1",
    title: "Getting Started — Official Documentation",
    url: "https://developer.mozilla.org",
    type: "Article",
    isFree: true,
    provider: "MDN Web Docs",
    durationHours: 2,
    skillTags: ["fundamentals"],
  },
  {
    id: "r2",
    title: "Hands-on Crash Course",
    url: "https://www.youtube.com",
    type: "Video",
    isFree: true,
    provider: "YouTube",
    durationHours: 3,
    skillTags: ["practical"],
  },
];

function RoadmapSkeleton() {
  return (
    <div className="space-y-6 max-w-3xl mx-auto px-4 py-8">
      <Skeleton className="h-10 w-2/3" />
      <Skeleton className="h-5 w-1/2" />
      <Skeleton className="h-36 w-full rounded-xl" />
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex gap-4">
          <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
          <Skeleton className="h-32 flex-1 rounded-xl" />
        </div>
      ))}
    </div>
  );
}

function formatSalary(usd: number): string {
  if (usd >= 1000) return `$${Math.round(usd / 1000)}k`;
  return `$${usd}`;
}

export default function RoadmapPage() {
  const params = useParams({ strict: false }) as { careerId?: string };
  const careerId = params.careerId ?? "";

  const { data: career, isLoading: careerLoading } = useCareerPath(careerId);
  const { data: milestones = [], isLoading: milestonesLoading } =
    useRoadmap(careerId);
  const { data: progress } = useUserProgress();
  const toggleMutation = useToggleMilestone();

  const sorted = useMemo(
    () => [...milestones].sort((a, b) => a.order - b.order),
    [milestones],
  );

  const completedIds = useMemo(() => {
    if (!progress) return new Set<string>();
    return new Set(
      progress.milestoneProgress
        .filter((mp) => mp.completed)
        .map((mp) => mp.milestoneId),
    );
  }, [progress]);

  const completedCount = sorted.filter((m) => completedIds.has(m.id)).length;
  const totalCount = sorted.length;
  const progressPct =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const nextMilestone = sorted.find((m) => !completedIds.has(m.id));

  const userSkills = useMemo(() => progress?.completedSkills ?? [], [progress]);

  const requiredSkills = useMemo(
    () => career?.requiredSkills.map((s) => s.name) ?? [],
    [career],
  );

  const isLoading = careerLoading || milestonesLoading;

  if (!careerId) {
    return (
      <Layout>
        <div className="flex-1 flex flex-col items-center justify-center min-h-[70vh] px-6 py-16 text-center bg-background">
          <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
            <MapPin className="h-8 w-8 text-accent-foreground" />
          </div>
          <h1 className="font-display font-bold text-3xl text-foreground mb-3">
            No Career Selected
          </h1>
          <p className="text-muted-foreground text-base max-w-md mb-6">
            Choose a career from recommendations to view your personalized
            roadmap.
          </p>
          <Button asChild>
            <a
              href="/recommendations"
              data-ocid="roadmap.go_recommendations_button"
            >
              Browse Recommendations
            </a>
          </Button>
        </div>
      </Layout>
    );
  }

  if (isLoading) {
    return (
      <Layout>
        <RoadmapSkeleton />
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Sticky summary bar */}
      {career && (
        <div
          className="sticky top-0 z-30 bg-card/95 backdrop-blur-sm border-b border-border shadow-sm"
          data-ocid="roadmap.sticky_bar"
        >
          <div className="max-w-3xl mx-auto px-4 py-2.5 flex items-center gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground font-display truncate">
                {career.title}
              </p>
              {nextMilestone && (
                <p className="text-xs text-muted-foreground truncate">
                  Next: {nextMilestone.title}
                </p>
              )}
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <span className="text-xs font-semibold text-primary tabular-nums">
                {progressPct}%
              </span>
              <div className="w-24 hidden sm:block">
                <ProgressBar value={progressPct} showLabel={false} size="sm" />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        {/* Page header */}
        <div data-ocid="roadmap.header">
          <Button
            variant="ghost"
            size="sm"
            className="mb-4 -ml-2 text-muted-foreground hover:text-foreground"
            asChild
          >
            <a href="/recommendations" data-ocid="roadmap.switch_career_link">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Switch Career
            </a>
          </Button>

          {career ? (
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  variant="outline"
                  className="bg-secondary/10 text-secondary border-secondary/20 text-xs"
                  data-ocid="roadmap.sector_badge"
                >
                  {career.category}
                </Badge>
                <Badge
                  variant="outline"
                  className={cn(
                    "text-xs",
                    career.jobDemand === "Very High"
                      ? "bg-accent/15 text-accent-foreground border-accent/30"
                      : career.jobDemand === "High"
                        ? "bg-primary/10 text-primary border-primary/20"
                        : "bg-muted text-muted-foreground",
                  )}
                >
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {career.jobDemand} demand
                </Badge>
              </div>

              <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground tracking-tight">
                {career.title}
              </h1>
              <p className="text-muted-foreground text-base max-w-xl leading-relaxed">
                {career.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pt-1">
                <span className="flex items-center gap-1.5">
                  <DollarSign className="h-4 w-4 text-accent-foreground" />
                  <span className="font-semibold text-foreground">
                    {formatSalary(career.avgSalaryUsd)}
                  </span>
                  avg salary
                </span>
                <span className="flex items-center gap-1.5">
                  <Briefcase className="h-4 w-4 text-primary" />
                  {career.timeToReadyMonths} months to job-ready
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-10 w-2/3" />
              <Skeleton className="h-5 w-full" />
            </div>
          )}
        </div>

        {/* Milestone progress bar */}
        <div
          className="rounded-xl border border-border bg-card p-4"
          data-ocid="roadmap.progress_section"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold font-display text-foreground">
              Roadmap Progress
            </span>
            <span className="text-xs text-muted-foreground tabular-nums">
              {completedCount} / {totalCount} milestones
            </span>
          </div>
          <ProgressBar
            value={progressPct}
            size="lg"
            showLabel
            label="Complete"
          />
        </div>

        {/* Skill gap analysis */}
        {(requiredSkills.length > 0 || userSkills.length > 0) && (
          <section data-ocid="roadmap.skill_gap_section">
            <h2 className="font-display font-bold text-xl text-foreground mb-4">
              Skill Gap Analysis
            </h2>
            <SkillGapChart
              userSkills={userSkills}
              requiredSkills={requiredSkills}
            />
          </section>
        )}

        {/* Milestones timeline */}
        <section data-ocid="roadmap.timeline_section">
          <h2 className="font-display font-bold text-xl text-foreground mb-6">
            Your Learning Roadmap
          </h2>

          {sorted.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/30 p-12 text-center"
              data-ocid="roadmap.milestones.empty_state"
            >
              <MapPin className="h-10 w-10 text-muted-foreground mb-3" />
              <p className="font-semibold text-foreground mb-1">
                No milestones yet
              </p>
              <p className="text-sm text-muted-foreground">
                Roadmap is being generated. Check back soon.
              </p>
            </div>
          ) : (
            <div className="space-y-0">
              {sorted.map((milestone, i) => (
                <MilestoneCard
                  key={milestone.id}
                  milestone={milestone}
                  index={i}
                  isCompleted={completedIds.has(milestone.id)}
                  isLast={i === sorted.length - 1}
                  resources={
                    milestone.resourceIds.length > 0
                      ? SAMPLE_RESOURCES.filter((_, ri) =>
                          milestone.resourceIds.includes(`r${ri + 1}`),
                        )
                      : SAMPLE_RESOURCES.slice(0, 2)
                  }
                  onToggle={(id, completed) => {
                    toggleMutation.mutate({ milestoneId: id, completed });
                  }}
                  isToggling={
                    toggleMutation.isPending &&
                    toggleMutation.variables?.milestoneId === milestone.id
                  }
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
}
