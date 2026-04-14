import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "@tanstack/react-router";
import {
  Award,
  BookOpen,
  Calendar,
  DollarSign,
  LayoutDashboard,
  Loader2,
  MapPin,
  Rocket,
} from "lucide-react";
import { JobGuidanceCard } from "../components/JobGuidanceCard";
import { Layout } from "../components/Layout";
import { MilestoneChecklist } from "../components/MilestoneChecklist";
import {
  NextActionCard,
  NextActionComplete,
} from "../components/NextActionCard";
import { ProgressBar } from "../components/ProgressBar";
import { SkillBadge } from "../components/SkillBadge";
import { StatCard } from "../components/StatCard";
import { useDashboard, useRoadmap } from "../hooks/use-backend";

// ─── Loading Skeleton ─────────────────────────────────────────────────────────

function DashboardSkeleton() {
  return (
    <div
      data-ocid="dashboard.loading_state"
      className="flex flex-col gap-6 px-4 md:px-6 py-6 max-w-5xl mx-auto w-full"
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} className="h-24 rounded-xl" />
        ))}
      </div>
      <Skeleton className="h-32 rounded-xl" />
      <Skeleton className="h-24 rounded-xl" />
      <Skeleton className="h-64 rounded-xl" />
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyState({ onAssess }: { onAssess: () => void }) {
  return (
    <div
      data-ocid="dashboard.empty_state"
      className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center gap-5"
    >
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
        <Rocket className="w-8 h-8 text-primary" />
      </div>
      <div>
        <h2 className="font-display font-bold text-2xl text-foreground mb-2">
          No career path selected yet
        </h2>
        <p className="text-muted-foreground max-w-sm text-sm">
          Take the career assessment to get personalized recommendations, a
          step-by-step roadmap, and track your progress here.
        </p>
      </div>
      <Button
        size="lg"
        onClick={onAssess}
        data-ocid="dashboard.empty_state.take_assessment_button"
        className="gap-2"
      >
        <Rocket className="w-4 h-4" />
        Take Career Assessment
      </Button>
    </div>
  );
}

// ─── Career Path Card ─────────────────────────────────────────────────────────

function CareerPathCard({
  title,
  category,
  avgSalary,
  daysActive,
  demand,
  timeToReady,
  onViewRoadmap,
}: {
  title: string;
  category: string;
  avgSalary: number;
  daysActive: number;
  demand: string;
  timeToReady: number;
  onViewRoadmap: () => void;
}) {
  const salaryStr = `$${Math.round(avgSalary / 1000)}k / yr`;
  return (
    <div
      data-ocid="dashboard.career_path.card"
      className="bg-card border border-border rounded-xl p-5"
    >
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-start gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
            <MapPin className="w-5 h-5 text-secondary" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
              Your Career Path
            </p>
            <h2 className="font-display font-bold text-xl text-foreground leading-tight truncate">
              {title}
            </h2>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <Badge variant="outline" className="text-[11px]">
                {category}
              </Badge>
              <Badge
                variant="outline"
                className="text-[11px] text-primary border-primary/30 bg-primary/5"
              >
                {demand} demand
              </Badge>
            </div>
          </div>
        </div>

        <Button
          size="sm"
          variant="secondary"
          onClick={onViewRoadmap}
          data-ocid="dashboard.career_path.view_roadmap_button"
          className="shrink-0 text-xs"
        >
          View Full Roadmap
        </Button>
      </div>

      <Separator className="my-4" />

      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center gap-0.5">
          <DollarSign className="w-4 h-4 text-accent mb-1" />
          <span className="text-sm font-bold text-foreground tabular-nums">
            {salaryStr}
          </span>
          <span className="text-[11px] text-muted-foreground">Avg Salary</span>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <Calendar className="w-4 h-4 text-secondary mb-1" />
          <span className="text-sm font-bold text-foreground tabular-nums">
            {daysActive}d
          </span>
          <span className="text-[11px] text-muted-foreground">Days Active</span>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <BookOpen className="w-4 h-4 text-primary mb-1" />
          <span className="text-sm font-bold text-foreground tabular-nums">
            {timeToReady}mo
          </span>
          <span className="text-[11px] text-muted-foreground">
            To Job-Ready
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export default function DashboardPage() {
  const navigate = useNavigate();
  const { data: dashboard, isLoading } = useDashboard();

  const selectedCareerId = dashboard?.selectedCareer?.id ?? "";
  const { data: roadmilestones = [] } = useRoadmap(selectedCareerId);

  const goToAssessment = () => navigate({ to: "/assessment" });
  const goToRoadmap = () =>
    selectedCareerId
      ? navigate({
          to: "/roadmap/$careerId",
          params: { careerId: selectedCareerId },
        })
      : navigate({ to: "/roadmap" });

  if (isLoading)
    return (
      <Layout>
        <DashboardSkeleton />
      </Layout>
    );

  const hasCareer = !!dashboard?.selectedCareer;

  if (!hasCareer) {
    return (
      <Layout>
        <EmptyState onAssess={goToAssessment} />
      </Layout>
    );
  }

  const career = dashboard!.selectedCareer!;
  const summary = dashboard?.summary;
  const progress = dashboard?.progress;
  const milestoneProgress = progress?.milestoneProgress ?? [];

  const pct = Math.round(summary?.percentComplete ?? 0);
  const completedCount = summary?.completedMilestones ?? 0;
  const totalCount = summary?.totalMilestones ?? 0;
  const completedSkills =
    summary?.completedSkills ?? progress?.completedSkills ?? [];
  const nextMilestone = summary?.nextMilestone;

  // Skill gap: all required skills minus completed ones
  const acquiredSet = new Set(completedSkills);
  const allRequiredSkills = career.requiredSkills.map((s) => s.name);
  const remainingSkills = allRequiredSkills.filter((s) => !acquiredSet.has(s));
  const acquiredSkills = completedSkills;

  // Days active: derived from lastUpdated or createdAt
  const createdAt = dashboard?.profile?.createdAt;
  const daysActive = createdAt
    ? Math.max(
        1,
        Math.floor((Date.now() - Number(createdAt / 1_000_000n)) / 86_400_000),
      )
    : 1;

  return (
    <Layout>
      <div className="flex flex-col gap-6 px-4 md:px-6 py-6 max-w-5xl mx-auto w-full">
        {/* Page title */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <LayoutDashboard className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h1 className="font-display font-bold text-xl text-foreground leading-tight">
              Progress Dashboard
            </h1>
            <p className="text-xs text-muted-foreground">
              Your career journey at a glance
            </p>
          </div>
        </div>

        {/* ── Stat Band ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            label="Roadmap Completion"
            value={`${pct}%`}
            sub={`${completedCount} of ${totalCount} milestones done`}
            circularPercent={pct}
            accent="primary"
            data-ocid="dashboard.stat.completion_card"
          />
          <StatCard
            label="Milestones Done"
            value={`${completedCount}/${totalCount}`}
            sub={
              totalCount - completedCount > 0
                ? `${totalCount - completedCount} remaining`
                : "All complete!"
            }
            icon={<Award className="w-5 h-5" />}
            accent="secondary"
            data-ocid="dashboard.stat.milestones_card"
          />
          <StatCard
            label="Skills Acquired"
            value={acquiredSkills.length}
            sub={
              remainingSkills.length > 0
                ? `${remainingSkills.length} skills to learn`
                : "All skills acquired!"
            }
            icon={<BookOpen className="w-5 h-5" />}
            accent="accent"
            data-ocid="dashboard.stat.skills_card"
          />
        </div>

        {/* Overall progress bar */}
        <ProgressBar
          value={pct}
          label="Overall progress"
          size="lg"
          variant="primary"
        />

        {/* ── Career Path Card ── */}
        <CareerPathCard
          title={career.title}
          category={career.category}
          avgSalary={career.avgSalaryUsd}
          daysActive={daysActive}
          demand={career.jobDemand}
          timeToReady={career.timeToReadyMonths}
          onViewRoadmap={goToRoadmap}
        />

        {/* ── Next Action ── */}
        {nextMilestone ? (
          <NextActionCard
            milestone={nextMilestone}
            onViewRoadmap={goToRoadmap}
          />
        ) : (
          <NextActionComplete onViewRoadmap={goToRoadmap} />
        )}

        {/* ── Milestone Checklist ── */}
        <section data-ocid="dashboard.milestone.section">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display font-semibold text-base text-foreground">
              Milestone Checklist
            </h2>
            <span className="text-xs text-muted-foreground tabular-nums">
              {completedCount}/{totalCount} done
            </span>
          </div>
          <MilestoneChecklist
            milestones={roadmilestones}
            milestoneProgress={milestoneProgress}
          />
        </section>

        {/* ── Skills Section ── */}
        <section
          data-ocid="dashboard.skills.section"
          className="flex flex-col gap-4"
        >
          <h2 className="font-display font-semibold text-base text-foreground">
            Skill Progress
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Acquired */}
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Acquired Skills
                </h3>
                <Badge
                  variant="outline"
                  className="ml-auto text-[11px] text-primary border-primary/30"
                >
                  {acquiredSkills.length}
                </Badge>
              </div>
              {acquiredSkills.length > 0 ? (
                <div
                  data-ocid="dashboard.skills.acquired_list"
                  className="flex flex-wrap gap-1.5"
                >
                  {acquiredSkills.map((skill) => (
                    <SkillBadge key={skill} name={skill} variant="acquired" />
                  ))}
                </div>
              ) : (
                <p
                  data-ocid="dashboard.skills.acquired_empty_state"
                  className="text-xs text-muted-foreground"
                >
                  Complete milestones to acquire skills.
                </p>
              )}
            </div>

            {/* Remaining */}
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-muted-foreground/40" />
                <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Skills to Learn
                </h3>
                <Badge variant="outline" className="ml-auto text-[11px]">
                  {remainingSkills.length}
                </Badge>
              </div>
              {remainingSkills.length > 0 ? (
                <div
                  data-ocid="dashboard.skills.remaining_list"
                  className="flex flex-wrap gap-1.5"
                >
                  {remainingSkills.map((skill) => (
                    <SkillBadge key={skill} name={skill} variant="default" />
                  ))}
                </div>
              ) : (
                <p
                  data-ocid="dashboard.skills.remaining_empty_state"
                  className="text-xs text-muted-foreground"
                >
                  All required skills acquired! 🎉
                </p>
              )}
            </div>
          </div>
        </section>

        {/* ── Job & Internship Guidance ── */}
        <section data-ocid="dashboard.job_guidance.panel">
          <div className="flex items-center gap-2 mb-3">
            <h2 className="font-display font-semibold text-base text-foreground">
              Job & Internship Guidance
            </h2>
          </div>
          <JobGuidanceCard />
        </section>
      </div>
    </Layout>
  );
}
