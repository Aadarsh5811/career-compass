import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Loader2, RefreshCw } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { AssessmentProgress } from "../components/AssessmentProgress";
import {
  MultiSelect,
  Question,
  SingleSelect,
} from "../components/AssessmentStep";
import { Layout } from "../components/Layout";
import { useSaveProfile } from "../hooks/use-backend";
import type { AssessmentInput, Skill } from "../types";

// ─── Question data ────────────────────────────────────────────────────────────

const TOPIC_OPTIONS = [
  { value: "tech", label: "Technology", icon: "💻" },
  { value: "healthcare", label: "Healthcare", icon: "🏥" },
  { value: "finance", label: "Finance", icon: "📈" },
  { value: "creative", label: "Creative Arts", icon: "🎨" },
  { value: "science", label: "Science", icon: "🔬" },
  { value: "education", label: "Education", icon: "📚" },
  { value: "business", label: "Business", icon: "💼" },
  { value: "environment", label: "Environment", icon: "🌿" },
];

const WORK_ENV_OPTIONS = [
  { value: "solo", label: "Solo", icon: "🧘" },
  { value: "team", label: "Team", icon: "👥" },
  { value: "mixed", label: "Mixed", icon: "🔄" },
];

const PROBLEM_STYLE_OPTIONS = [
  { value: "analytical", label: "Analytical", icon: "📊" },
  { value: "creative", label: "Creative", icon: "💡" },
  { value: "people", label: "People-Oriented", icon: "🤝" },
];

const INDUSTRY_OPTIONS = [
  { value: "startup", label: "Startups", icon: "🚀" },
  { value: "corporate", label: "Corporate", icon: "🏢" },
  { value: "nonprofit", label: "Non-Profit", icon: "❤️" },
  { value: "government", label: "Government", icon: "🏛️" },
  { value: "freelance", label: "Freelance", icon: "🌐" },
  { value: "research", label: "Research", icon: "🔍" },
];

const SKILL_OPTIONS = [
  { value: "programming", label: "Programming" },
  { value: "design", label: "Design" },
  { value: "data_analysis", label: "Data Analysis" },
  { value: "writing", label: "Writing" },
  { value: "communication", label: "Communication" },
  { value: "management", label: "Management" },
  { value: "marketing", label: "Marketing" },
  { value: "finance_skills", label: "Finance" },
];

const EXP_LEVEL_OPTIONS = [
  { value: "Beginner", label: "Beginner", icon: "🌱" },
  { value: "Intermediate", label: "Intermediate", icon: "🌿" },
  { value: "Advanced", label: "Advanced", icon: "🌳" },
];

const HOURS_OPTIONS = [
  { value: "5", label: "< 5 hrs/week", icon: "⏱️" },
  { value: "10", label: "5–10 hrs/week", icon: "⏰" },
  { value: "20", label: "10–20 hrs/week", icon: "🕐" },
  { value: "40", label: "20+ hrs/week", icon: "🚀" },
];

const LEARNING_STYLE_OPTIONS = [
  { value: "video", label: "Video courses", icon: "🎬" },
  { value: "reading", label: "Reading docs", icon: "📖" },
  { value: "hands_on", label: "Hands-on projects", icon: "🛠️" },
  { value: "mixed", label: "Mixed approach", icon: "🔀" },
];

const GOAL_OPTIONS = [
  { value: "high_income", label: "High income", icon: "💰" },
  { value: "rapid_growth", label: "Rapid growth", icon: "📈" },
  { value: "creative_work", label: "Creative work", icon: "🎨" },
  { value: "helping_others", label: "Helping others", icon: "🤝" },
  { value: "stability", label: "Job stability", icon: "🏠" },
];

const TIMELINE_OPTIONS = [
  { value: "3", label: "3 months", icon: "⚡" },
  { value: "6", label: "6 months", icon: "🎯" },
  { value: "12", label: "1 year", icon: "📅" },
  { value: "24", label: "2+ years", icon: "🌄" },
];

// ─── Form state ───────────────────────────────────────────────────────────────

interface FormState {
  // Phase 1
  topics: string[];
  workEnv: string;
  problemStyle: string;
  industries: string[];
  // Phase 2
  skillAreas: string[];
  expLevel: string;
  hoursPerWeek: string;
  // Phase 3
  learningStyle: string;
  topGoal: string;
  timelineMonths: string;
}

const EMPTY_FORM: FormState = {
  topics: [],
  workEnv: "",
  problemStyle: "",
  industries: [],
  skillAreas: [],
  expLevel: "",
  hoursPerWeek: "",
  learningStyle: "",
  topGoal: "",
  timelineMonths: "",
};

function formToAssessmentInput(f: FormState): AssessmentInput {
  const skills: Skill[] = f.skillAreas.map((name) => ({
    name,
    level: (f.expLevel as Skill["level"]) || "Beginner",
  }));

  const interests = [...f.topics, ...f.industries];
  const goals = [
    f.topGoal,
    `learn_${f.learningStyle}`,
    `timeline_${f.timelineMonths}mo`,
  ].filter(Boolean);

  return {
    interests,
    currentSkills: skills,
    preferredWorkStyle: `${f.workEnv}_${f.problemStyle}`,
    educationLevel: f.expLevel || "Beginner",
    yearsExperience:
      f.hoursPerWeek === "40" ? 5 : f.hoursPerWeek === "20" ? 2 : 0,
    goals,
  };
}

// ─── Phase validation ─────────────────────────────────────────────────────────

function phase1Valid(f: FormState) {
  return (
    f.topics.length > 0 &&
    f.workEnv &&
    f.problemStyle &&
    f.industries.length > 0
  );
}

function phase2Valid(f: FormState) {
  return f.skillAreas.length > 0 && f.expLevel && f.hoursPerWeek;
}

function phase3Valid(f: FormState) {
  return f.learningStyle && f.topGoal && f.timelineMonths;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function AssessmentPage() {
  const navigate = useNavigate();
  const saveProfile = useSaveProfile();
  const [phase, setPhase] = useState(1);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);

  const set = useCallback(
    <K extends keyof FormState>(key: K, val: FormState[K]) => {
      setForm((prev) => ({ ...prev, [key]: val }));
    },
    [],
  );

  const canNext =
    phase === 1 ? phase1Valid(form) : phase === 2 ? phase2Valid(form) : false;
  const canSubmit = phase === 3 && phase3Valid(form);

  const handleNext = () => {
    if (phase < 3) setPhase((p) => p + 1);
  };

  const handleBack = () => {
    if (phase > 1) setPhase((p) => p - 1);
  };

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setSubmitted(true);
    try {
      await saveProfile.mutateAsync(formToAssessmentInput(form));
      toast.success("Assessment saved! Generating your career matches…");
      navigate({ to: "/recommendations" });
    } catch {
      toast.error("Failed to save assessment. Please try again.");
      setSubmitted(false);
    }
  };

  return (
    <Layout>
      <div className="flex-1 bg-background min-h-[80vh]">
        <div className="max-w-2xl mx-auto px-4 py-10 space-y-8">
          {/* Header */}
          <div>
            <h1 className="font-display font-bold text-2xl text-foreground mb-1">
              Career Assessment
            </h1>
            <p className="text-sm text-muted-foreground">
              ~2 minutes · {10} questions · Personalized roadmap
            </p>
          </div>

          {/* Progress */}
          <AssessmentProgress currentPhase={phase} totalPhases={3} />

          {/* Phase panels */}
          <div className="bg-card border border-border rounded-2xl p-6 space-y-7 elevation-card">
            {phase === 1 && (
              <>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">
                    Phase 1 of 3
                  </p>
                  <h2 className="font-display font-semibold text-lg text-foreground">
                    Interests & Passions
                  </h2>
                </div>

                <Question
                  index={1}
                  label="Which topics excite you most?"
                  hint="Select all that apply"
                  hasAnswer={form.topics.length > 0}
                >
                  <MultiSelect
                    options={TOPIC_OPTIONS}
                    selected={form.topics}
                    onChange={(v) => set("topics", v)}
                    ocidPrefix="assessment.topics"
                  />
                </Question>

                <Question
                  index={2}
                  label="Preferred work environment?"
                  hasAnswer={!!form.workEnv}
                >
                  <SingleSelect
                    options={WORK_ENV_OPTIONS}
                    selected={form.workEnv}
                    onChange={(v) => set("workEnv", v)}
                    ocidPrefix="assessment.work_env"
                    layout="row"
                  />
                </Question>

                <Question
                  index={3}
                  label="How do you solve problems?"
                  hasAnswer={!!form.problemStyle}
                >
                  <SingleSelect
                    options={PROBLEM_STYLE_OPTIONS}
                    selected={form.problemStyle}
                    onChange={(v) => set("problemStyle", v)}
                    ocidPrefix="assessment.problem_style"
                    layout="row"
                  />
                </Question>

                <Question
                  index={4}
                  label="Which industry sectors interest you?"
                  hint="Select at least one"
                  hasAnswer={form.industries.length > 0}
                >
                  <MultiSelect
                    options={INDUSTRY_OPTIONS}
                    selected={form.industries}
                    onChange={(v) => set("industries", v)}
                    ocidPrefix="assessment.industries"
                  />
                </Question>
              </>
            )}

            {phase === 2 && (
              <>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">
                    Phase 2 of 3
                  </p>
                  <h2 className="font-display font-semibold text-lg text-foreground">
                    Skills & Experience
                  </h2>
                </div>

                <Question
                  index={5}
                  label="Which skill areas do you have experience in?"
                  hint="Select all that apply"
                  hasAnswer={form.skillAreas.length > 0}
                >
                  <MultiSelect
                    options={SKILL_OPTIONS}
                    selected={form.skillAreas}
                    onChange={(v) => set("skillAreas", v)}
                    ocidPrefix="assessment.skill_areas"
                  />
                </Question>

                <Question
                  index={6}
                  label="What's your current experience level?"
                  hasAnswer={!!form.expLevel}
                >
                  <SingleSelect
                    options={EXP_LEVEL_OPTIONS}
                    selected={form.expLevel}
                    onChange={(v) => set("expLevel", v)}
                    ocidPrefix="assessment.exp_level"
                    layout="row"
                  />
                </Question>

                <Question
                  index={7}
                  label="How many hours per week can you dedicate?"
                  hasAnswer={!!form.hoursPerWeek}
                >
                  <SingleSelect
                    options={HOURS_OPTIONS}
                    selected={form.hoursPerWeek}
                    onChange={(v) => set("hoursPerWeek", v)}
                    ocidPrefix="assessment.hours_per_week"
                    layout="grid"
                  />
                </Question>
              </>
            )}

            {phase === 3 && (
              <>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">
                    Phase 3 of 3
                  </p>
                  <h2 className="font-display font-semibold text-lg text-foreground">
                    Goals & Timeline
                  </h2>
                </div>

                <Question
                  index={8}
                  label="What's your preferred learning style?"
                  hasAnswer={!!form.learningStyle}
                >
                  <SingleSelect
                    options={LEARNING_STYLE_OPTIONS}
                    selected={form.learningStyle}
                    onChange={(v) => set("learningStyle", v)}
                    ocidPrefix="assessment.learning_style"
                    layout="grid"
                  />
                </Question>

                <Question
                  index={9}
                  label="What's your top career goal?"
                  hasAnswer={!!form.topGoal}
                >
                  <SingleSelect
                    options={GOAL_OPTIONS}
                    selected={form.topGoal}
                    onChange={(v) => set("topGoal", v)}
                    ocidPrefix="assessment.top_goal"
                    layout="grid"
                  />
                </Question>

                <Question
                  index={10}
                  label="When do you want to start your career?"
                  hasAnswer={!!form.timelineMonths}
                >
                  <SingleSelect
                    options={TIMELINE_OPTIONS}
                    selected={form.timelineMonths}
                    onChange={(v) => set("timelineMonths", v)}
                    ocidPrefix="assessment.timeline"
                    layout="row"
                  />
                </Question>
              </>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between gap-4">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={phase === 1}
              data-ocid="assessment.back_button"
            >
              <ArrowLeft className="h-4 w-4 mr-1.5" />
              Back
            </Button>

            <div className="flex items-center gap-3">
              {phase < 3 ? (
                <Button
                  onClick={handleNext}
                  disabled={!canNext}
                  data-ocid="assessment.next_button"
                >
                  Next
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setForm(EMPTY_FORM);
                      setPhase(1);
                      setSubmitted(false);
                    }}
                    data-ocid="assessment.retake_button"
                  >
                    <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
                    Retake
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={!canSubmit || submitted || saveProfile.isPending}
                    data-ocid="assessment.submit_button"
                  >
                    {saveProfile.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />
                        Saving…
                      </>
                    ) : (
                      <>
                        Get My Matches
                        <ArrowRight className="h-4 w-4 ml-1.5" />
                      </>
                    )}
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Validation hint */}
          {((phase === 1 && !phase1Valid(form)) ||
            (phase === 2 && !phase2Valid(form)) ||
            (phase === 3 && !phase3Valid(form))) && (
            <p
              className="text-xs text-muted-foreground text-center"
              data-ocid="assessment.validation_hint"
            >
              Answer all questions to continue
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
}
