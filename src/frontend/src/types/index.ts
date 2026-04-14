// Shared frontend types for Career Compass
// Mirrors the Motoko backend data model

export type SkillLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert";

export interface Skill {
  name: string;
  level: SkillLevel;
}

export interface AssessmentInput {
  interests: string[];
  currentSkills: Skill[];
  preferredWorkStyle: string;
  educationLevel: string;
  yearsExperience: number;
  goals: string[];
}

export interface LearningResource {
  id: string;
  title: string;
  url: string;
  type: "Video" | "Course" | "Article" | "Book" | "Project";
  isFree: boolean;
  provider: string;
  durationHours: number;
  skillTags: string[];
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  order: number;
  skillsRequired: string[];
  skillsGained: string[];
  resourceIds: string[];
  estimatedWeeks: number;
  isOptional: boolean;
}

export interface CareerPath {
  id: string;
  title: string;
  description: string;
  category: string;
  requiredSkills: Skill[];
  avgSalaryUsd: number;
  jobDemand: "Low" | "Medium" | "High" | "Very High";
  growthOutlook: string;
  timeToReadyMonths: number;
  tags: string[];
}

export interface CareerMatch {
  career: CareerPath;
  matchScore: number;
  matchReasons: string[];
  skillGaps: string[];
}

export interface MilestoneProgress {
  milestoneId: string;
  completed: boolean;
  completedAt?: bigint;
  notesMarkdown?: string;
}

export interface UserProgress {
  userId: string;
  selectedCareerId?: string;
  completedSkills: string[];
  milestoneProgress: MilestoneProgress[];
  lastUpdated: bigint;
}

export interface ProgressSummary {
  totalMilestones: number;
  completedMilestones: number;
  percentComplete: number;
  estimatedWeeksRemaining: number;
  completedSkills: string[];
  nextMilestone?: Milestone;
}

export interface UserProfile {
  userId: string;
  assessment: AssessmentInput;
  createdAt: bigint;
  updatedAt: bigint;
}

export interface DashboardData {
  profile?: UserProfile;
  progress?: UserProgress;
  summary?: ProgressSummary;
  selectedCareer?: CareerPath;
  recommendations: CareerMatch[];
}
