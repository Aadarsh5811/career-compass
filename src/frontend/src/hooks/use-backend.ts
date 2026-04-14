import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type {
  AssessmentInput,
  CareerMatch,
  CareerPath,
  DashboardData,
  LearningResource,
  Milestone,
  ProgressSummary,
  UserProgress,
} from "../types";

function callMethod(
  actor: unknown,
  method: string,
  ...args: unknown[]
): Promise<unknown> {
  return (actor as Record<string, (...a: unknown[]) => Promise<unknown>>)[
    method
  ](...args);
}

// ─── Query Hooks ──────────────────────────────────────────────────────────────

export function useCareerRecommendations() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<CareerMatch[]>({
    queryKey: ["careerRecommendations"],
    queryFn: async () => {
      if (!actor) return [];
      const result = await callMethod(actor, "getCareerRecommendations");
      return (result ?? []) as CareerMatch[];
    },
    enabled: !!actor && !isFetching,
  });
}

export function useListCareerPaths() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<CareerPath[]>({
    queryKey: ["careerPaths"],
    queryFn: async () => {
      if (!actor) return [];
      const result = await callMethod(actor, "listCareerPaths");
      return (result ?? []) as CareerPath[];
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCareerPath(careerId: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<CareerPath | null>({
    queryKey: ["careerPath", careerId],
    queryFn: async () => {
      if (!actor || !careerId) return null;
      const result = await callMethod(actor, "getCareerPath", careerId);
      return (result ?? null) as CareerPath | null;
    },
    enabled: !!actor && !isFetching && !!careerId,
  });
}

export function useRoadmap(careerId: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Milestone[]>({
    queryKey: ["roadmap", careerId],
    queryFn: async () => {
      if (!actor || !careerId) return [];
      const result = await callMethod(actor, "getRoadmapMilestones", careerId);
      return (result ?? []) as Milestone[];
    },
    enabled: !!actor && !isFetching && !!careerId,
  });
}

export function useResourcesBySkill(skill: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<LearningResource[]>({
    queryKey: ["resources", "skill", skill],
    queryFn: async () => {
      if (!actor || !skill) return [];
      const result = await callMethod(actor, "getResourcesBySkill", skill);
      return (result ?? []) as LearningResource[];
    },
    enabled: !!actor && !isFetching && !!skill,
  });
}

export function useUserProgress() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<UserProgress | null>({
    queryKey: ["userProgress"],
    queryFn: async () => {
      if (!actor) return null;
      const result = await callMethod(actor, "getProgress");
      return (result ?? null) as UserProgress | null;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useProgressSummary() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ProgressSummary | null>({
    queryKey: ["progressSummary"],
    queryFn: async () => {
      if (!actor) return null;
      const result = await callMethod(actor, "getDashboard");
      return (result ?? null) as ProgressSummary | null;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useDashboard() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<DashboardData | null>({
    queryKey: ["dashboard"],
    queryFn: async () => {
      if (!actor) return null;
      const result = await callMethod(actor, "getDashboard");
      return (result ?? null) as DashboardData | null;
    },
    enabled: !!actor && !isFetching,
  });
}

// ─── Mutation Hooks ───────────────────────────────────────────────────────────

export function useSaveProfile() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (assessment: AssessmentInput) => {
      if (!actor) throw new Error("Actor not ready");
      return callMethod(actor, "submitAssessment", assessment);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["careerRecommendations"] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

export function useToggleMilestone() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      milestoneId,
      completed,
    }: {
      milestoneId: string;
      completed: boolean;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return callMethod(
        actor,
        "updateMilestoneProgress",
        milestoneId,
        completed,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["userProgress"] });
      qc.invalidateQueries({ queryKey: ["progressSummary"] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

export function useSelectCareer() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (careerId: string) => {
      if (!actor) throw new Error("Actor not ready");
      return callMethod(actor, "selectCareer", careerId);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["userProgress"] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}
