import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  ClipboardList,
  RefreshCw,
  SlidersHorizontal,
} from "lucide-react";
import { useMemo, useState } from "react";
import { CareerCard } from "../components/CareerCard";
import { Layout } from "../components/Layout";
import { useAuth } from "../hooks/use-auth";
import {
  useCareerRecommendations,
  useSelectCareer,
} from "../hooks/use-backend";
import type { CareerMatch } from "../types";

type SortKey = "match" | "salary";

function CardSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-4">
      <div className="space-y-2">
        <Skeleton className="h-5 w-2/3" />
        <div className="flex gap-2">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-24 rounded-full" />
        </div>
      </div>
      <Skeleton className="h-2 w-full rounded-full" />
      <Skeleton className="h-10 w-full rounded-lg" />
      <div className="grid grid-cols-3 gap-2">
        <Skeleton className="h-14 rounded-lg" />
        <Skeleton className="h-14 rounded-lg" />
        <Skeleton className="h-14 rounded-lg" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-9 flex-1 rounded-lg" />
        <Skeleton className="h-9 w-20 rounded-lg" />
      </div>
    </div>
  );
}

export default function RecommendationsPage() {
  const { principalId } = useAuth();
  const {
    data: recommendations,
    isLoading,
    error,
  } = useCareerRecommendations();
  const selectCareer = useSelectCareer();

  const [sortKey, setSortKey] = useState<SortKey>("match");
  const [pendingId, setPendingId] = useState<string | null>(null);

  const sorted = useMemo<CareerMatch[]>(() => {
    if (!recommendations) return [];
    const list = [...recommendations];
    if (sortKey === "match") {
      list.sort((a, b) => b.matchScore - a.matchScore);
    } else {
      list.sort((a, b) => b.career.avgSalaryUsd - a.career.avgSalaryUsd);
    }
    return list.slice(0, 8);
  }, [recommendations, sortKey]);

  async function handleStartRoadmap(careerId: string) {
    setPendingId(careerId);
    try {
      await selectCareer.mutateAsync(careerId);
      window.location.href = `/roadmap/${careerId}` as string;
    } finally {
      setPendingId(null);
    }
  }

  const shortId = principalId
    ? `${principalId.slice(0, 5)}…${principalId.slice(-3)}`
    : null;

  return (
    <Layout>
      {/* ── Header section ──────────────────────────────────────────── */}
      <section className="bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <a
                  href="/dashboard"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm flex items-center gap-1"
                  data-ocid="recommendations.back_link"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Dashboard
                </a>
              </div>
              <h1 className="font-display font-bold text-2xl sm:text-3xl text-foreground">
                Your Career Matches
              </h1>
              <p className="text-muted-foreground mt-1 text-sm">
                {shortId ? (
                  <>
                    Personalized for{" "}
                    <span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">
                      {shortId}
                    </span>
                  </>
                ) : (
                  "Ranked by how well they match your profile"
                )}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href="/assessment"
                className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                data-ocid="recommendations.retake_assessment_link"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Retake Assessment
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main content ────────────────────────────────────────────── */}
      <section className="bg-background flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          {/* Sort/filter bar */}
          {!isLoading && sorted.length > 0 && (
            <div
              className="flex items-center gap-3 mb-6"
              data-ocid="recommendations.sort_bar"
            >
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                <SlidersHorizontal className="h-3.5 w-3.5" />
                Sort by
              </div>
              <div className="flex items-center gap-1.5 bg-muted/60 rounded-lg p-1">
                <button
                  type="button"
                  onClick={() => setSortKey("match")}
                  className={cn(
                    "px-3 py-1.5 rounded-md text-xs font-semibold transition-smooth",
                    sortKey === "match"
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                  data-ocid="recommendations.sort_match_tab"
                >
                  Best Match
                </button>
                <button
                  type="button"
                  onClick={() => setSortKey("salary")}
                  className={cn(
                    "px-3 py-1.5 rounded-md text-xs font-semibold transition-smooth",
                    sortKey === "salary"
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                  data-ocid="recommendations.sort_salary_tab"
                >
                  Highest Salary
                </button>
              </div>

              {sorted.length > 0 && (
                <Badge
                  variant="outline"
                  className="ml-auto text-xs text-muted-foreground"
                >
                  {sorted.length} careers
                </Badge>
              )}
            </div>
          )}

          {/* Loading state */}
          {isLoading && (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              data-ocid="recommendations.loading_state"
            >
              {(["s1", "s2", "s3", "s4", "s5", "s6"] as const).map((id) => (
                <CardSkeleton key={id} />
              ))}
            </div>
          )}

          {/* Error state */}
          {!isLoading && error && (
            <div
              className="flex flex-col items-center justify-center py-20 text-center"
              data-ocid="recommendations.error_state"
            >
              <div className="w-14 h-14 rounded-2xl bg-destructive/10 flex items-center justify-center mb-4">
                <ClipboardList className="h-7 w-7 text-destructive" />
              </div>
              <h2 className="font-display font-bold text-xl text-foreground mb-2">
                Couldn't load recommendations
              </h2>
              <p className="text-muted-foreground text-sm max-w-sm">
                There was an issue fetching your career matches. Please try
                again.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => window.location.reload()}
                data-ocid="recommendations.retry_button"
              >
                <RefreshCw className="h-3.5 w-3.5 mr-2" />
                Try Again
              </Button>
            </div>
          )}

          {/* Empty state — no profile yet */}
          {!isLoading && !error && sorted.length === 0 && (
            <div
              className="flex flex-col items-center justify-center py-20 text-center"
              data-ocid="recommendations.empty_state"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                <ClipboardList className="h-8 w-8 text-primary" />
              </div>
              <h2 className="font-display font-bold text-2xl text-foreground mb-2">
                No matches yet
              </h2>
              <p className="text-muted-foreground text-sm max-w-md mb-6">
                Complete the career assessment so we can analyze your skills,
                interests, and goals — then surface the best career paths for
                you.
              </p>
              <Button
                asChild
                data-ocid="recommendations.take_assessment_button"
              >
                <a href="/assessment">
                  Take the Assessment
                  <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
                </a>
              </Button>
            </div>
          )}

          {/* Career cards grid */}
          {!isLoading && !error && sorted.length > 0 && (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              data-ocid="recommendations.career_list"
            >
              {sorted.map((match, index) => (
                <CareerCard
                  key={match.career.id}
                  match={match}
                  rank={index + 1}
                  onStartRoadmap={handleStartRoadmap}
                  isPending={pendingId === match.career.id}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
