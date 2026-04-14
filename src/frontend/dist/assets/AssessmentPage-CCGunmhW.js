import { j as jsxRuntimeExports, c as cn, u as useNavigate, r as reactExports } from "./index-BYoSv118.js";
import { c as createLucideIcon, d as useSaveProfile, L as Layout, B as Button, e as ue } from "./Layout-BlufahZe.js";
import { C as CircleCheck, L as LoaderCircle } from "./loader-circle-Bsyd3PbY.js";
import { B as Badge } from "./badge-mlo4tde5.js";
import { A as ArrowLeft } from "./arrow-left-DWz_NL4A.js";
import { A as ArrowRight } from "./arrow-right-BvcNRmQx.js";
import { R as RefreshCw } from "./refresh-cw-Lm64eejB.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M21 10.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.5", key: "1uzm8b" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const SquareCheckBig = createLucideIcon("square-check-big", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }]
];
const Square = createLucideIcon("square", __iconNode);
const PHASES = [
  { label: "Interests", description: "Topics & passions" },
  { label: "Skills", description: "Experience & time" },
  { label: "Goals", description: "Learning style & timeline" }
];
function AssessmentProgress({
  currentPhase,
  totalPhases = 3
}) {
  var _a, _b;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full", "data-ocid": "assessment.progress_bar", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-4 left-0 right-0 flex items-center px-10 pointer-events-none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: cn(
              "h-0.5 flex-1 transition-smooth",
              1 < currentPhase ? "bg-primary" : "bg-border"
            )
          }
        ),
        totalPhases > 2 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: cn(
              "h-0.5 flex-1 transition-smooth",
              2 < currentPhase ? "bg-primary" : "bg-border"
            )
          }
        ),
        totalPhases > 3 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: cn(
              "h-0.5 flex-1 transition-smooth",
              3 < currentPhase ? "bg-primary" : "bg-border"
            )
          }
        )
      ] }),
      PHASES.slice(0, totalPhases).map((phase, i) => {
        const phaseNum = i + 1;
        const isDone = phaseNum < currentPhase;
        const isActive = phaseNum === currentPhase;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center gap-1.5 z-10",
            "data-ocid": `assessment.phase_step.${phaseNum}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-smooth border-2",
                    isDone ? "bg-primary border-primary text-primary-foreground" : isActive ? "bg-primary/10 border-primary text-primary" : "bg-card border-border text-muted-foreground"
                  ),
                  children: isDone ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4" }) : phaseNum
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center hidden sm:block", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: cn(
                      "text-xs font-semibold leading-tight",
                      isActive ? "text-foreground" : isDone ? "text-primary" : "text-muted-foreground"
                    ),
                    children: phase.label
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground leading-tight mt-0.5", children: phase.description })
              ] })
            ]
          },
          phaseNum
        );
      })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:hidden mt-3 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground", children: [
        "Phase ",
        currentPhase,
        " — ",
        (_a = PHASES[currentPhase - 1]) == null ? void 0 : _a.label
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: (_b = PHASES[currentPhase - 1]) == null ? void 0 : _b.description })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "p",
      {
        className: "text-xs text-muted-foreground text-right mt-2",
        "aria-label": `Phase ${currentPhase} of ${totalPhases}`,
        children: [
          "Step ",
          currentPhase,
          "/",
          totalPhases
        ]
      }
    )
  ] });
}
function MultiSelect({
  options,
  selected,
  onChange,
  max,
  ocidPrefix
}) {
  const toggle = (val) => {
    if (selected.includes(val)) {
      onChange(selected.filter((v) => v !== val));
    } else if (!max || selected.length < max) {
      onChange([...selected, val]);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: options.map((opt, idx) => {
    const isSelected = selected.includes(opt.value);
    const isDisabled = !isSelected && !!max && selected.length >= max;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        disabled: isDisabled,
        onClick: () => toggle(opt.value),
        "data-ocid": `${ocidPrefix}.${idx + 1}`,
        "aria-pressed": isSelected,
        className: cn(
          "inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border text-sm font-medium transition-smooth cursor-pointer select-none",
          isSelected ? "bg-primary/10 border-primary text-primary" : isDisabled ? "bg-muted border-border text-muted-foreground cursor-not-allowed opacity-50" : "bg-card border-border text-foreground hover:border-primary/60 hover:bg-primary/5"
        ),
        children: [
          isSelected ? /* @__PURE__ */ jsxRuntimeExports.jsx(SquareCheckBig, { className: "h-3.5 w-3.5 shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Square, { className: "h-3.5 w-3.5 shrink-0 text-muted-foreground" }),
          opt.icon && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: opt.icon }),
          opt.label
        ]
      },
      opt.value
    );
  }) });
}
function SingleSelect({
  options,
  selected,
  onChange,
  ocidPrefix,
  layout = "grid"
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn(
        "gap-3",
        layout === "grid" ? "grid grid-cols-2 sm:grid-cols-3" : "flex flex-wrap"
      ),
      children: options.map((opt, idx) => {
        const isSelected = selected === opt.value;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => onChange(opt.value),
            "data-ocid": `${ocidPrefix}.${idx + 1}`,
            "aria-pressed": isSelected,
            className: cn(
              "flex flex-col items-center gap-1.5 px-4 py-3 rounded-xl border text-sm font-medium transition-smooth cursor-pointer select-none text-center",
              isSelected ? "bg-primary/10 border-primary text-primary shadow-sm" : "bg-card border-border text-foreground hover:border-primary/60 hover:bg-primary/5"
            ),
            children: [
              opt.icon && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl leading-none", children: opt.icon }),
              opt.label
            ]
          },
          opt.value
        );
      })
    }
  );
}
function Question({
  index,
  label,
  hint,
  required = true,
  hasAnswer,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Badge,
        {
          variant: "outline",
          className: cn(
            "shrink-0 mt-0.5 font-mono text-[10px] px-1.5 py-0.5 transition-smooth",
            hasAnswer ? "bg-primary/10 border-primary/30 text-primary" : "bg-muted text-muted-foreground"
          ),
          children: [
            "Q",
            index
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground leading-snug", children: [
          label,
          required && !hasAnswer && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 text-destructive text-xs", children: "*" })
        ] }),
        hint && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: hint })
      ] })
    ] }),
    children
  ] });
}
const TOPIC_OPTIONS = [
  { value: "tech", label: "Technology", icon: "💻" },
  { value: "healthcare", label: "Healthcare", icon: "🏥" },
  { value: "finance", label: "Finance", icon: "📈" },
  { value: "creative", label: "Creative Arts", icon: "🎨" },
  { value: "science", label: "Science", icon: "🔬" },
  { value: "education", label: "Education", icon: "📚" },
  { value: "business", label: "Business", icon: "💼" },
  { value: "environment", label: "Environment", icon: "🌿" }
];
const WORK_ENV_OPTIONS = [
  { value: "solo", label: "Solo", icon: "🧘" },
  { value: "team", label: "Team", icon: "👥" },
  { value: "mixed", label: "Mixed", icon: "🔄" }
];
const PROBLEM_STYLE_OPTIONS = [
  { value: "analytical", label: "Analytical", icon: "📊" },
  { value: "creative", label: "Creative", icon: "💡" },
  { value: "people", label: "People-Oriented", icon: "🤝" }
];
const INDUSTRY_OPTIONS = [
  { value: "startup", label: "Startups", icon: "🚀" },
  { value: "corporate", label: "Corporate", icon: "🏢" },
  { value: "nonprofit", label: "Non-Profit", icon: "❤️" },
  { value: "government", label: "Government", icon: "🏛️" },
  { value: "freelance", label: "Freelance", icon: "🌐" },
  { value: "research", label: "Research", icon: "🔍" }
];
const SKILL_OPTIONS = [
  { value: "programming", label: "Programming" },
  { value: "design", label: "Design" },
  { value: "data_analysis", label: "Data Analysis" },
  { value: "writing", label: "Writing" },
  { value: "communication", label: "Communication" },
  { value: "management", label: "Management" },
  { value: "marketing", label: "Marketing" },
  { value: "finance_skills", label: "Finance" }
];
const EXP_LEVEL_OPTIONS = [
  { value: "Beginner", label: "Beginner", icon: "🌱" },
  { value: "Intermediate", label: "Intermediate", icon: "🌿" },
  { value: "Advanced", label: "Advanced", icon: "🌳" }
];
const HOURS_OPTIONS = [
  { value: "5", label: "< 5 hrs/week", icon: "⏱️" },
  { value: "10", label: "5–10 hrs/week", icon: "⏰" },
  { value: "20", label: "10–20 hrs/week", icon: "🕐" },
  { value: "40", label: "20+ hrs/week", icon: "🚀" }
];
const LEARNING_STYLE_OPTIONS = [
  { value: "video", label: "Video courses", icon: "🎬" },
  { value: "reading", label: "Reading docs", icon: "📖" },
  { value: "hands_on", label: "Hands-on projects", icon: "🛠️" },
  { value: "mixed", label: "Mixed approach", icon: "🔀" }
];
const GOAL_OPTIONS = [
  { value: "high_income", label: "High income", icon: "💰" },
  { value: "rapid_growth", label: "Rapid growth", icon: "📈" },
  { value: "creative_work", label: "Creative work", icon: "🎨" },
  { value: "helping_others", label: "Helping others", icon: "🤝" },
  { value: "stability", label: "Job stability", icon: "🏠" }
];
const TIMELINE_OPTIONS = [
  { value: "3", label: "3 months", icon: "⚡" },
  { value: "6", label: "6 months", icon: "🎯" },
  { value: "12", label: "1 year", icon: "📅" },
  { value: "24", label: "2+ years", icon: "🌄" }
];
const EMPTY_FORM = {
  topics: [],
  workEnv: "",
  problemStyle: "",
  industries: [],
  skillAreas: [],
  expLevel: "",
  hoursPerWeek: "",
  learningStyle: "",
  topGoal: "",
  timelineMonths: ""
};
function formToAssessmentInput(f) {
  const skills = f.skillAreas.map((name) => ({
    name,
    level: f.expLevel || "Beginner"
  }));
  const interests = [...f.topics, ...f.industries];
  const goals = [
    f.topGoal,
    `learn_${f.learningStyle}`,
    `timeline_${f.timelineMonths}mo`
  ].filter(Boolean);
  return {
    interests,
    currentSkills: skills,
    preferredWorkStyle: `${f.workEnv}_${f.problemStyle}`,
    educationLevel: f.expLevel || "Beginner",
    yearsExperience: f.hoursPerWeek === "40" ? 5 : f.hoursPerWeek === "20" ? 2 : 0,
    goals
  };
}
function phase1Valid(f) {
  return f.topics.length > 0 && f.workEnv && f.problemStyle && f.industries.length > 0;
}
function phase2Valid(f) {
  return f.skillAreas.length > 0 && f.expLevel && f.hoursPerWeek;
}
function phase3Valid(f) {
  return f.learningStyle && f.topGoal && f.timelineMonths;
}
function AssessmentPage() {
  const navigate = useNavigate();
  const saveProfile = useSaveProfile();
  const [phase, setPhase] = reactExports.useState(1);
  const [form, setForm] = reactExports.useState(EMPTY_FORM);
  const [submitted, setSubmitted] = reactExports.useState(false);
  const set = reactExports.useCallback(
    (key, val) => {
      setForm((prev) => ({ ...prev, [key]: val }));
    },
    []
  );
  const canNext = phase === 1 ? phase1Valid(form) : phase === 2 ? phase2Valid(form) : false;
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
      ue.success("Assessment saved! Generating your career matches…");
      navigate({ to: "/recommendations" });
    } catch {
      ue.error("Failed to save assessment. Please try again.");
      setSubmitted(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 bg-background min-h-[80vh]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-10 space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground mb-1", children: "Career Assessment" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
        "~2 minutes · ",
        10,
        " questions · Personalized roadmap"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AssessmentProgress, { currentPhase: phase, totalPhases: 3 }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-6 space-y-7 elevation-card", children: [
      phase === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-primary mb-1", children: "Phase 1 of 3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-lg text-foreground", children: "Interests & Passions" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Question,
          {
            index: 1,
            label: "Which topics excite you most?",
            hint: "Select all that apply",
            hasAnswer: form.topics.length > 0,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              MultiSelect,
              {
                options: TOPIC_OPTIONS,
                selected: form.topics,
                onChange: (v) => set("topics", v),
                ocidPrefix: "assessment.topics"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Question,
          {
            index: 2,
            label: "Preferred work environment?",
            hasAnswer: !!form.workEnv,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              SingleSelect,
              {
                options: WORK_ENV_OPTIONS,
                selected: form.workEnv,
                onChange: (v) => set("workEnv", v),
                ocidPrefix: "assessment.work_env",
                layout: "row"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Question,
          {
            index: 3,
            label: "How do you solve problems?",
            hasAnswer: !!form.problemStyle,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              SingleSelect,
              {
                options: PROBLEM_STYLE_OPTIONS,
                selected: form.problemStyle,
                onChange: (v) => set("problemStyle", v),
                ocidPrefix: "assessment.problem_style",
                layout: "row"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Question,
          {
            index: 4,
            label: "Which industry sectors interest you?",
            hint: "Select at least one",
            hasAnswer: form.industries.length > 0,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              MultiSelect,
              {
                options: INDUSTRY_OPTIONS,
                selected: form.industries,
                onChange: (v) => set("industries", v),
                ocidPrefix: "assessment.industries"
              }
            )
          }
        )
      ] }),
      phase === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-primary mb-1", children: "Phase 2 of 3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-lg text-foreground", children: "Skills & Experience" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Question,
          {
            index: 5,
            label: "Which skill areas do you have experience in?",
            hint: "Select all that apply",
            hasAnswer: form.skillAreas.length > 0,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              MultiSelect,
              {
                options: SKILL_OPTIONS,
                selected: form.skillAreas,
                onChange: (v) => set("skillAreas", v),
                ocidPrefix: "assessment.skill_areas"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Question,
          {
            index: 6,
            label: "What's your current experience level?",
            hasAnswer: !!form.expLevel,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              SingleSelect,
              {
                options: EXP_LEVEL_OPTIONS,
                selected: form.expLevel,
                onChange: (v) => set("expLevel", v),
                ocidPrefix: "assessment.exp_level",
                layout: "row"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Question,
          {
            index: 7,
            label: "How many hours per week can you dedicate?",
            hasAnswer: !!form.hoursPerWeek,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              SingleSelect,
              {
                options: HOURS_OPTIONS,
                selected: form.hoursPerWeek,
                onChange: (v) => set("hoursPerWeek", v),
                ocidPrefix: "assessment.hours_per_week",
                layout: "grid"
              }
            )
          }
        )
      ] }),
      phase === 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-primary mb-1", children: "Phase 3 of 3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-lg text-foreground", children: "Goals & Timeline" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Question,
          {
            index: 8,
            label: "What's your preferred learning style?",
            hasAnswer: !!form.learningStyle,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              SingleSelect,
              {
                options: LEARNING_STYLE_OPTIONS,
                selected: form.learningStyle,
                onChange: (v) => set("learningStyle", v),
                ocidPrefix: "assessment.learning_style",
                layout: "grid"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Question,
          {
            index: 9,
            label: "What's your top career goal?",
            hasAnswer: !!form.topGoal,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              SingleSelect,
              {
                options: GOAL_OPTIONS,
                selected: form.topGoal,
                onChange: (v) => set("topGoal", v),
                ocidPrefix: "assessment.top_goal",
                layout: "grid"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Question,
          {
            index: 10,
            label: "When do you want to start your career?",
            hasAnswer: !!form.timelineMonths,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              SingleSelect,
              {
                options: TIMELINE_OPTIONS,
                selected: form.timelineMonths,
                onChange: (v) => set("timelineMonths", v),
                ocidPrefix: "assessment.timeline",
                layout: "row"
              }
            )
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          onClick: handleBack,
          disabled: phase === 1,
          "data-ocid": "assessment.back_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4 mr-1.5" }),
            "Back"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: phase < 3 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: handleNext,
          disabled: !canNext,
          "data-ocid": "assessment.next_button",
          children: [
            "Next",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 ml-1.5" })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => {
              setForm(EMPTY_FORM);
              setPhase(1);
              setSubmitted(false);
            },
            "data-ocid": "assessment.retake_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-3.5 w-3.5 mr-1.5" }),
              "Retake"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: handleSubmit,
            disabled: !canSubmit || submitted || saveProfile.isPending,
            "data-ocid": "assessment.submit_button",
            children: saveProfile.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 mr-1.5 animate-spin" }),
              "Saving…"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              "Get My Matches",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 ml-1.5" })
            ] })
          }
        )
      ] }) })
    ] }),
    (phase === 1 && !phase1Valid(form) || phase === 2 && !phase2Valid(form) || phase === 3 && !phase3Valid(form)) && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "p",
      {
        className: "text-xs text-muted-foreground text-center",
        "data-ocid": "assessment.validation_hint",
        children: "Answer all questions to continue"
      }
    )
  ] }) }) });
}
export {
  AssessmentPage as default
};
