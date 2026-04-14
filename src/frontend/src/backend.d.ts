import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ToggleMilestoneRequest {
    completed: boolean;
    milestoneId: MilestoneId;
}
export type Timestamp = bigint;
export interface SaveProfileRequest {
    experienceLevel: SkillLevel;
    learningStyle: LearningStyle;
    displayName: string;
    interests: Array<InterestCategory>;
    answers: Array<AssessmentAnswer>;
    currentSkills: Array<string>;
}
export interface LearningResource {
    id: ResourceId;
    url: string;
    title: string;
    source: string;
    difficulty: Difficulty;
    skillTag: string;
    resourceType: ResourceType;
    estimatedDuration: string;
}
export type CareerPathId = bigint;
export interface SkillGap {
    missing: Array<string>;
    acquired: Array<string>;
    required: Array<string>;
}
export interface Milestone {
    id: MilestoneId;
    title: string;
    order: bigint;
    projects: Array<string>;
    careerPathId: CareerPathId;
    description: string;
    resourceIds: Array<ResourceId>;
    requiredSkills: Array<string>;
    estimatedTime: string;
}
export interface UserProgress {
    startedAt: Timestamp;
    completedCourses: Array<string>;
    userId: UserId;
    completedMilestones: Array<MilestoneId>;
    careerPathId: CareerPathId;
    acquiredSkills: Array<string>;
    updatedAt: Timestamp;
}
export interface UserProfilePublic {
    experienceLevel: SkillLevel;
    learningStyle: LearningStyle;
    selectedCareerPathId?: CareerPathId;
    displayName: string;
    interests: Array<InterestCategory>;
    userId: UserId;
    answers: Array<AssessmentAnswer>;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    currentSkills: Array<string>;
}
export interface CareerMatch {
    matchScore: bigint;
    career: CareerPath;
}
export type UserId = Principal;
export interface AssessmentAnswer {
    answer: string;
    questionId: bigint;
}
export type MilestoneId = bigint;
export interface CareerPath {
    id: CareerPathId;
    title: string;
    description: string;
    sector: IndustrySector;
    interestTags: Array<string>;
    salaryRange: SalaryRange;
    requiredSkills: Array<string>;
}
export type ResourceId = bigint;
export interface SalaryRange {
    max: bigint;
    min: bigint;
    currency: string;
}
export interface ProgressSummary {
    completedCount: bigint;
    timelineEstimate: string;
    totalMilestones: bigint;
    nextMilestoneId?: MilestoneId;
    careerTitle: string;
    percentComplete: bigint;
}
export enum IndustrySector {
    healthcare = "healthcare",
    finance = "finance",
    social = "social",
    creative = "creative",
    tech = "tech",
    education = "education",
    engineering = "engineering",
    business = "business",
    science = "science"
}
export enum InterestCategory {
    healthcare = "healthcare",
    social = "social",
    arts = "arts",
    education = "education",
    engineering = "engineering",
    technology = "technology",
    business = "business",
    science = "science"
}
export enum LearningStyle {
    handson = "handson",
    auditory = "auditory",
    readingWriting = "readingWriting",
    visual = "visual"
}
export enum ResourceType {
    video = "video",
    documentation = "documentation",
    article = "article",
    course = "course"
}
export enum SkillLevel {
    intermediate = "intermediate",
    beginner = "beginner",
    advanced = "advanced"
}
export interface backendInterface {
    addAcquiredSkill(careerPathId: CareerPathId, skill: string): Promise<void>;
    getCareer(id: CareerPathId): Promise<CareerPath | null>;
    getCareerRecommendations(): Promise<Array<CareerMatch>>;
    getMyProfile(): Promise<UserProfilePublic | null>;
    getMyProgress(): Promise<UserProgress | null>;
    getProgressSummary(): Promise<ProgressSummary | null>;
    getResources(ids: Array<ResourceId>): Promise<Array<LearningResource>>;
    getResourcesBySkill(skillTag: string): Promise<Array<LearningResource>>;
    getRoadmap(careerPathId: CareerPathId): Promise<Array<Milestone>>;
    getSkillGap(careerPathId: CareerPathId): Promise<SkillGap>;
    listCareers(): Promise<Array<CareerPath>>;
    retakeAssessment(): Promise<void>;
    saveMyProfile(req: SaveProfileRequest): Promise<UserProfilePublic>;
    selectCareer(careerPathId: bigint): Promise<void>;
    toggleMilestone(req: ToggleMilestoneRequest): Promise<UserProgress>;
}
