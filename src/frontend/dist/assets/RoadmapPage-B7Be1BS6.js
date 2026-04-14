import { j as jsxRuntimeExports, c as cn, r as reactExports, a as useParams, S as Skeleton } from "./index-BYoSv118.js";
import { B as Badge } from "./badge-mlo4tde5.js";
import { c as createLucideIcon, B as Button, b as Lightbulb, P as ProgressBar, h as useCareerPath, i as useRoadmap, j as useUserProgress, k as useToggleMilestone, L as Layout, M as MapPin } from "./Layout-BlufahZe.js";
import { C as Card, a as CardHeader, b as CardContent, c as CardFooter } from "./card-Bl25nIOz.js";
import { C as Clock, D as DollarSign } from "./dollar-sign-C2ryqQ-5.js";
import { E as ExternalLink, F as FileText, C as Circle, S as SkillBadge, B as Briefcase } from "./SkillBadge-DMYiW78Z.js";
import { B as BookOpen } from "./book-open-BkePRDfa.js";
import { L as LoaderCircle, C as CircleCheck } from "./loader-circle-Bsyd3PbY.js";
import { S as Sparkles, C as ChevronUp, a as ChevronDown, T as TrendingUp } from "./trending-up-CuVxf7ZM.js";
import { A as ArrowLeft } from "./arrow-left-DWz_NL4A.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v5",
      key: "1w6njk"
    }
  ],
  ["circle", { cx: "13", cy: "12", r: "2", key: "1j92g6" }],
  ["path", { d: "M18 19c-2.8 0-5-2.2-5-5v8", key: "pkpw2h" }],
  ["circle", { cx: "20", cy: "19", r: "2", key: "1obnsp" }]
];
const FolderGit2 = createLucideIcon("folder-git-2", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M10 7.75a.75.75 0 0 1 1.142-.638l3.664 2.249a.75.75 0 0 1 0 1.278l-3.664 2.25a.75.75 0 0 1-1.142-.64z",
      key: "1pctta"
    }
  ],
  ["path", { d: "M12 17v4", key: "1riwvh" }],
  ["path", { d: "M8 21h8", key: "1ev6f3" }],
  ["rect", { x: "2", y: "3", width: "20", height: "14", rx: "2", key: "x3v2xh" }]
];
const MonitorPlay = createLucideIcon("monitor-play", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5",
      key: "ftymec"
    }
  ],
  ["rect", { x: "2", y: "6", width: "14", height: "12", rx: "2", key: "158x01" }]
];
const Video = createLucideIcon("video", __iconNode);
const typeIcon = {
  Video: /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "h-4 w-4" }),
  Course: /* @__PURE__ */ jsxRuntimeExports.jsx(MonitorPlay, { className: "h-4 w-4" }),
  Article: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4" }),
  Book: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4" }),
  Project: /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className: "h-4 w-4" })
};
const typeColor = {
  Video: "bg-chart-1/10 text-chart-1",
  Course: "bg-secondary/10 text-secondary",
  Article: "bg-muted text-muted-foreground",
  Book: "bg-chart-4/10 text-chart-4",
  Project: "bg-accent/10 text-accent-foreground"
};
function ResourceCard({ resource, className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      className: cn(
        "group hover:shadow-card transition-smooth border-border",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2 pt-4 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold font-display text-sm text-foreground line-clamp-2 leading-snug", children: resource.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: resource.provider })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: cn(
                "flex-shrink-0 flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium",
                typeColor[resource.type]
              ),
              children: [
                typeIcon[resource.type],
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: resource.type })
              ]
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "px-4 pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
              resource.durationHours,
              "h"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: resource.isFree ? "secondary" : "outline",
                className: cn(
                  "text-[10px] px-1.5 py-0",
                  resource.isFree ? "bg-primary/10 text-primary border-primary/20" : "text-muted-foreground"
                ),
                children: resource.isFree ? "Free" : "Paid"
              }
            )
          ] }),
          resource.skillTags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1 mt-2", children: resource.skillTags.slice(0, 3).map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground",
              children: tag
            },
            tag
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardFooter, { className: "px-4 pb-4 pt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            className: "w-full text-xs group-hover:border-primary/40 group-hover:text-primary transition-smooth",
            asChild: true,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: resource.url, target: "_blank", rel: "noopener noreferrer", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3 w-3 mr-1.5" }),
              "Open Resource"
            ] })
          }
        ) })
      ]
    }
  );
}
const PROJECTS = {};
function inferProjects(milestone) {
  const known = PROJECTS[milestone.id];
  if (known) return known;
  if (milestone.skillsGained.length === 0) return [];
  return milestone.skillsGained.slice(0, 2).map((s, i) => `${i === 0 ? "Build" : "Create"} a project using ${s}`);
}
function MilestoneCard({
  milestone,
  index,
  isCompleted,
  isLast,
  resources,
  onToggle,
  isToggling = false
}) {
  const [expanded, setExpanded] = reactExports.useState(false);
  const projects = inferProjects(milestone);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "roadmap-milestone",
      "data-ocid": `roadmap.milestone.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center flex-shrink-0 w-10 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => onToggle(milestone.id, !isCompleted),
              type: "button",
              disabled: isToggling,
              "aria-label": isCompleted ? `Mark milestone ${index + 1} incomplete` : `Mark milestone ${index + 1} complete`,
              "data-ocid": `roadmap.milestone.checkbox.${index + 1}`,
              className: cn(
                "w-8 h-8 rounded-full border-2 flex items-center justify-center transition-smooth focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 flex-shrink-0",
                isCompleted ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground hover:border-primary/60 hover:text-primary"
              ),
              children: isToggling ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : isCompleted ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "h-4 w-4" })
            }
          ),
          !isLast && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: cn(
                "w-0.5 flex-1 mt-2 min-h-[2rem]",
                isCompleted ? "bg-primary/40" : "bg-border"
              )
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: cn(
              "flex-1 min-w-0 mb-6 rounded-xl border transition-smooth",
              isCompleted ? "border-primary/20 bg-primary/5" : "border-border bg-card"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pt-4 pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-semibold text-muted-foreground uppercase tracking-widest", children: [
                    "Step ",
                    index + 1
                  ] }),
                  milestone.isOptional && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: "outline",
                      className: "text-[10px] px-1.5 py-0 text-muted-foreground",
                      children: "Optional"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Badge,
                    {
                      variant: "outline",
                      className: "text-[10px] px-1.5 py-0 bg-accent/10 text-accent-foreground border-accent/20 flex items-center gap-1",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-2.5 w-2.5" }),
                        milestone.estimatedWeeks,
                        "w"
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h3",
                  {
                    className: cn(
                      "font-display font-bold text-base leading-snug",
                      isCompleted ? "line-through text-muted-foreground" : "text-foreground"
                    ),
                    children: milestone.title
                  }
                ),
                milestone.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 leading-relaxed", children: milestone.description })
              ] }) }) }),
              (milestone.skillsRequired.length > 0 || milestone.skillsGained.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-3 space-y-2", children: [
                milestone.skillsRequired.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-medium uppercase tracking-wide text-muted-foreground mb-1.5", children: "Skills needed" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1", children: milestone.skillsRequired.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkillBadge, { name: s, variant: "required" }, s)) })
                ] }),
                milestone.skillsGained.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-medium uppercase tracking-wide text-muted-foreground mb-1.5", children: "You'll gain" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1", children: milestone.skillsGained.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkillBadge, { name: s, variant: "acquired" }, s)) })
                ] })
              ] }),
              projects.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] font-medium uppercase tracking-wide text-muted-foreground mb-1.5 flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FolderGit2, { className: "h-3 w-3" }),
                  "Projects to build"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1", children: projects.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "li",
                  {
                    className: "flex items-start gap-2 text-sm text-foreground",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5 text-accent-foreground flex-shrink-0 mt-0.5" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: p })
                    ]
                  },
                  p
                )) })
              ] }),
              resources.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "w-full flex items-center justify-between px-4 py-3 h-auto text-xs font-medium text-muted-foreground hover:text-foreground rounded-none rounded-b-xl",
                    onClick: () => setExpanded((v) => !v),
                    "data-ocid": `roadmap.milestone.resources_toggle.${index + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                        resources.length,
                        " learning resource",
                        resources.length !== 1 ? "s" : ""
                      ] }),
                      expanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3.5 w-3.5" })
                    ]
                  }
                ),
                expanded && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "px-4 pb-4 grid grid-cols-1 sm:grid-cols-2 gap-3",
                    "data-ocid": `roadmap.milestone.resources_panel.${index + 1}`,
                    children: resources.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(ResourceCard, { resource: r }, r.id))
                  }
                )
              ] })
            ]
          }
        )
      ]
    }
  );
}
function SkillGapChart({
  userSkills,
  requiredSkills,
  className
}) {
  const userSkillSet = new Set(userSkills.map((s) => s.toLowerCase()));
  const requiredSkillSet = new Set(requiredSkills.map((s) => s.toLowerCase()));
  const acquired = requiredSkills.filter(
    (s) => userSkillSet.has(s.toLowerCase())
  );
  const gaps = requiredSkills.filter((s) => !userSkillSet.has(s.toLowerCase()));
  const bonusSkills = userSkills.filter(
    (s) => !requiredSkillSet.has(s.toLowerCase())
  );
  const total = requiredSkills.length;
  const readinessPct = total > 0 ? Math.round(acquired.length / total * 100) : 0;
  const readinessLabel = readinessPct >= 80 ? "Almost ready" : readinessPct >= 50 ? "Good progress" : readinessPct >= 25 ? "Getting started" : "Beginner";
  const readinessVariant = readinessPct >= 75 ? "accent" : readinessPct >= 40 ? "primary" : "secondary";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("space-y-5", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-xl border border-border bg-card p-4 space-y-3",
        "data-ocid": "skill_gap.readiness_panel",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground font-display", children: "Skill Readiness" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: cn(
                  "text-xs font-medium px-2 py-0.5 rounded-full",
                  readinessPct >= 75 ? "bg-accent/15 text-accent-foreground" : readinessPct >= 40 ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"
                ),
                children: readinessLabel
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ProgressBar,
            {
              value: readinessPct,
              variant: readinessVariant,
              size: "lg",
              label: `${acquired.length} of ${total} required skills`,
              showLabel: true
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-xl border border-primary/20 bg-primary/5 p-4 space-y-3",
          "data-ocid": "skill_gap.acquired_panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-primary flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground font-display", children: "Skills You Have" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto text-xs font-medium text-primary tabular-nums", children: acquired.length })
            ] }),
            acquired.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground italic", children: "No required skills matched yet" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: acquired.map((skill) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkillBadge, { name: skill, variant: "acquired" }, skill)) }),
            bonusSkills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2 border-t border-primary/10", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-medium text-muted-foreground uppercase tracking-wide mb-1.5", children: "Bonus skills" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1", children: bonusSkills.slice(0, 6).map((skill) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkillBadge, { name: skill, variant: "default" }, skill)) })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-xl border border-accent/20 bg-accent/5 p-4 space-y-3",
          "data-ocid": "skill_gap.gap_panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-4 w-4 text-accent-foreground flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground font-display", children: "Skills to Acquire" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto text-xs font-medium text-accent-foreground tabular-nums", children: gaps.length })
            ] }),
            gaps.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground italic", children: "You have all required skills!" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: gaps.map((skill) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkillBadge, { name: skill, variant: "gap" }, skill)) })
          ]
        }
      )
    ] })
  ] });
}
const SAMPLE_RESOURCES = [
  {
    id: "r1",
    title: "Getting Started — Official Documentation",
    url: "https://developer.mozilla.org",
    type: "Article",
    isFree: true,
    provider: "MDN Web Docs",
    durationHours: 2,
    skillTags: ["fundamentals"]
  },
  {
    id: "r2",
    title: "Hands-on Crash Course",
    url: "https://www.youtube.com",
    type: "Video",
    isFree: true,
    provider: "YouTube",
    durationHours: 3,
    skillTags: ["practical"]
  }
];
function RoadmapSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-3xl mx-auto px-4 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-2/3" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-1/2" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-36 w-full rounded-xl" }),
    [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-8 rounded-full flex-shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 flex-1 rounded-xl" })
    ] }, i))
  ] });
}
function formatSalary(usd) {
  if (usd >= 1e3) return `$${Math.round(usd / 1e3)}k`;
  return `$${usd}`;
}
function RoadmapPage() {
  const params = useParams({ strict: false });
  const careerId = params.careerId ?? "";
  const { data: career, isLoading: careerLoading } = useCareerPath(careerId);
  const { data: milestones = [], isLoading: milestonesLoading } = useRoadmap(careerId);
  const { data: progress } = useUserProgress();
  const toggleMutation = useToggleMilestone();
  const sorted = reactExports.useMemo(
    () => [...milestones].sort((a, b) => a.order - b.order),
    [milestones]
  );
  const completedIds = reactExports.useMemo(() => {
    if (!progress) return /* @__PURE__ */ new Set();
    return new Set(
      progress.milestoneProgress.filter((mp) => mp.completed).map((mp) => mp.milestoneId)
    );
  }, [progress]);
  const completedCount = sorted.filter((m) => completedIds.has(m.id)).length;
  const totalCount = sorted.length;
  const progressPct = totalCount > 0 ? Math.round(completedCount / totalCount * 100) : 0;
  const nextMilestone = sorted.find((m) => !completedIds.has(m.id));
  const userSkills = reactExports.useMemo(() => (progress == null ? void 0 : progress.completedSkills) ?? [], [progress]);
  const requiredSkills = reactExports.useMemo(
    () => (career == null ? void 0 : career.requiredSkills.map((s) => s.name)) ?? [],
    [career]
  );
  const isLoading = careerLoading || milestonesLoading;
  if (!careerId) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col items-center justify-center min-h-[70vh] px-6 py-16 text-center bg-background", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-8 w-8 text-accent-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-3xl text-foreground mb-3", children: "No Career Selected" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base max-w-md mb-6", children: "Choose a career from recommendations to view your personalized roadmap." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/recommendations",
          "data-ocid": "roadmap.go_recommendations_button",
          children: "Browse Recommendations"
        }
      ) })
    ] }) });
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(RoadmapSkeleton, {}) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    career && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "sticky top-0 z-30 bg-card/95 backdrop-blur-sm border-b border-border shadow-sm",
        "data-ocid": "roadmap.sticky_bar",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 py-2.5 flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground font-display truncate", children: career.title }),
            nextMilestone && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground truncate", children: [
              "Next: ",
              nextMilestone.title
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold text-primary tabular-nums", children: [
              progressPct,
              "%"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 hidden sm:block", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressBar, { value: progressPct, showLabel: false, size: "sm" }) })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 py-8 space-y-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "roadmap.header", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "sm",
            className: "mb-4 -ml-2 text-muted-foreground hover:text-foreground",
            asChild: true,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "/recommendations", "data-ocid": "roadmap.switch_career_link", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4 mr-1" }),
              "Switch Career"
            ] })
          }
        ),
        career ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "bg-secondary/10 text-secondary border-secondary/20 text-xs",
                "data-ocid": "roadmap.sector_badge",
                children: career.category
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Badge,
              {
                variant: "outline",
                className: cn(
                  "text-xs",
                  career.jobDemand === "Very High" ? "bg-accent/15 text-accent-foreground border-accent/30" : career.jobDemand === "High" ? "bg-primary/10 text-primary border-primary/20" : "bg-muted text-muted-foreground"
                ),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-3 w-3 mr-1" }),
                  career.jobDemand,
                  " demand"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-extrabold text-3xl sm:text-4xl text-foreground tracking-tight", children: career.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base max-w-xl leading-relaxed", children: career.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-4 text-sm text-muted-foreground pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "h-4 w-4 text-accent-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: formatSalary(career.avgSalaryUsd) }),
              "avg salary"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "h-4 w-4 text-primary" }),
              career.timeToReadyMonths,
              " months to job-ready"
            ] })
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-48" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-2/3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-full" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-xl border border-border bg-card p-4",
          "data-ocid": "roadmap.progress_section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold font-display text-foreground", children: "Roadmap Progress" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground tabular-nums", children: [
                completedCount,
                " / ",
                totalCount,
                " milestones"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ProgressBar,
              {
                value: progressPct,
                size: "lg",
                showLabel: true,
                label: "Complete"
              }
            )
          ]
        }
      ),
      (requiredSkills.length > 0 || userSkills.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "roadmap.skill_gap_section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground mb-4", children: "Skill Gap Analysis" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SkillGapChart,
          {
            userSkills,
            requiredSkills
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "roadmap.timeline_section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground mb-6", children: "Your Learning Roadmap" }),
        sorted.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/30 p-12 text-center",
            "data-ocid": "roadmap.milestones.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-10 w-10 text-muted-foreground mb-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground mb-1", children: "No milestones yet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Roadmap is being generated. Check back soon." })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-0", children: sorted.map((milestone, i) => {
          var _a;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            MilestoneCard,
            {
              milestone,
              index: i,
              isCompleted: completedIds.has(milestone.id),
              isLast: i === sorted.length - 1,
              resources: milestone.resourceIds.length > 0 ? SAMPLE_RESOURCES.filter(
                (_, ri) => milestone.resourceIds.includes(`r${ri + 1}`)
              ) : SAMPLE_RESOURCES.slice(0, 2),
              onToggle: (id, completed) => {
                toggleMutation.mutate({ milestoneId: id, completed });
              },
              isToggling: toggleMutation.isPending && ((_a = toggleMutation.variables) == null ? void 0 : _a.milestoneId) === milestone.id
            },
            milestone.id
          );
        }) })
      ] })
    ] })
  ] });
}
export {
  RoadmapPage as default
};
