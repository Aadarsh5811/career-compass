import { r as reactExports, j as jsxRuntimeExports, c as cn, S as Skeleton } from "./index-BYoSv118.js";
import { B as Badge } from "./badge-mlo4tde5.js";
import { c as createLucideIcon, P as ProgressBar, B as Button, u as useAuth, f as useCareerRecommendations, g as useSelectCareer, L as Layout, a as ClipboardList } from "./Layout-BlufahZe.js";
import { C as Card, a as CardHeader, b as CardContent, c as CardFooter } from "./card-Bl25nIOz.js";
import { S as Sparkles, T as TrendingUp, C as ChevronUp, a as ChevronDown } from "./trending-up-CuVxf7ZM.js";
import { D as DollarSign, C as Clock } from "./dollar-sign-C2ryqQ-5.js";
import { A as ArrowRight } from "./arrow-right-BvcNRmQx.js";
import { A as ArrowLeft } from "./arrow-left-DWz_NL4A.js";
import { R as RefreshCw } from "./refresh-cw-Lm64eejB.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "21", x2: "14", y1: "4", y2: "4", key: "obuewd" }],
  ["line", { x1: "10", x2: "3", y1: "4", y2: "4", key: "1q6298" }],
  ["line", { x1: "21", x2: "12", y1: "12", y2: "12", key: "1iu8h1" }],
  ["line", { x1: "8", x2: "3", y1: "12", y2: "12", key: "ntss68" }],
  ["line", { x1: "21", x2: "16", y1: "20", y2: "20", key: "14d8ph" }],
  ["line", { x1: "12", x2: "3", y1: "20", y2: "20", key: "m0wm8r" }],
  ["line", { x1: "14", x2: "14", y1: "2", y2: "6", key: "14e1ph" }],
  ["line", { x1: "8", x2: "8", y1: "10", y2: "14", key: "1i6ji0" }],
  ["line", { x1: "16", x2: "16", y1: "18", y2: "22", key: "1lctlv" }]
];
const SlidersHorizontal = createLucideIcon("sliders-horizontal", __iconNode);
const sectorColors = {
  Technology: "bg-primary/10 text-primary border-primary/25",
  Finance: "bg-secondary/10 text-secondary border-secondary/25",
  Healthcare: "bg-accent/10 text-accent-foreground border-accent/25",
  Education: "bg-primary/10 text-primary border-primary/25",
  Design: "bg-secondary/10 text-secondary border-secondary/25",
  Engineering: "bg-primary/10 text-primary border-primary/25",
  Marketing: "bg-accent/10 text-accent-foreground border-accent/25",
  Science: "bg-secondary/10 text-secondary border-secondary/25",
  Business: "bg-primary/10 text-primary border-primary/25"
};
const demandColor = {
  Low: "bg-muted text-muted-foreground border-border",
  Medium: "bg-accent/10 text-accent-foreground border-accent/20",
  High: "bg-primary/10 text-primary border-primary/20",
  "Very High": "bg-secondary/10 text-secondary border-secondary/20"
};
function getSectorColor(category) {
  return sectorColors[category] ?? "bg-muted text-muted-foreground border-border";
}
function formatSalary(usd) {
  return `$${(usd / 1e3).toFixed(0)}k`;
}
function CareerCard({
  match,
  rank,
  onStartRoadmap,
  isPending,
  className
}) {
  const { career, matchScore, matchReasons, skillGaps } = match;
  const [expanded, setExpanded] = reactExports.useState(false);
  const matchPct = Math.round(matchScore * 100);
  const salaryMin = Math.round(career.avgSalaryUsd * 0.8);
  const salaryMax = Math.round(career.avgSalaryUsd * 1.25);
  const topSkills = career.requiredSkills.slice(0, 4);
  const extraSkills = career.requiredSkills.slice(4);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      className: cn(
        "group flex flex-col transition-smooth hover:shadow-card relative overflow-hidden",
        matchPct >= 85 && "ring-2 ring-primary/30 border-primary/20",
        className
      ),
      "data-ocid": `career_card.item.${rank}`,
      children: [
        rank === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-bl-lg flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-2.5 w-2.5" }),
          "TOP MATCH"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-2 pt-4 px-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between gap-2 pr-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold font-display text-lg text-foreground leading-tight", children: career.title }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap mt-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: cn(
                  "text-xs font-semibold",
                  getSectorColor(career.category)
                ),
                "data-ocid": `career_card.sector_badge.${rank}`,
                children: career.category
              }
            ),
            career.jobDemand && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Badge,
              {
                variant: "outline",
                className: cn(
                  "text-[11px] font-semibold",
                  demandColor[career.jobDemand]
                ),
                children: [
                  career.jobDemand,
                  " demand"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3", "data-ocid": `career_card.match_score.${rank}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-medium", children: "Match score" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: cn(
                    "text-sm font-bold tabular-nums",
                    matchPct >= 80 ? "text-primary" : matchPct >= 60 ? "text-secondary" : "text-muted-foreground"
                  ),
                  children: [
                    matchPct,
                    "%"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ProgressBar,
              {
                value: matchPct,
                size: "sm",
                variant: matchPct >= 80 ? "primary" : "secondary"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "px-5 pb-3 flex-1 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: cn(
                "text-sm text-muted-foreground leading-relaxed",
                expanded ? "" : "line-clamp-2"
              ),
              children: career.description
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5 bg-muted/50 rounded-lg p-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "h-3 w-3 shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-medium uppercase tracking-wide", children: "Salary" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold text-foreground", children: [
                formatSalary(salaryMin),
                "–",
                formatSalary(salaryMax)
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: "per year" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5 bg-muted/50 rounded-lg p-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3 shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-medium uppercase tracking-wide", children: "Ready in" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold text-foreground", children: [
                career.timeToReadyMonths,
                "mo"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: "to job-ready" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5 bg-muted/50 rounded-lg p-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-3 w-3 shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-medium uppercase tracking-wide", children: "Growth" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-foreground line-clamp-2 leading-tight", children: career.growthOutlook })
            ] })
          ] }),
          topSkills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-1.5", children: "Key skills" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1.5", children: [
              topSkills.map((skill) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "skill-badge", children: skill.name }, skill.name)),
              !expanded && extraSkills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "skill-badge opacity-60", children: [
                "+",
                extraSkills.length,
                " more"
              ] })
            ] })
          ] }),
          expanded && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 border-t border-border pt-3", children: [
            extraSkills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-1.5", children: "All required skills" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: extraSkills.map((skill) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "skill-badge", children: skill.name }, skill.name)) })
            ] }),
            matchReasons.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-1.5", children: "Why this matches you" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1", children: matchReasons.map((reason) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "li",
                {
                  className: "text-xs text-muted-foreground flex items-start gap-1.5",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary mt-0.5 shrink-0", children: "✓" }),
                    reason
                  ]
                },
                reason
              )) })
            ] }),
            skillGaps.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-1.5", children: "Skills to develop" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: skillGaps.map((gap) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-destructive/10 text-destructive border border-destructive/20",
                  children: gap
                },
                gap
              )) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardFooter, { className: "px-5 pb-4 pt-0 flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              className: "flex-1 text-sm font-semibold transition-smooth",
              onClick: () => onStartRoadmap(career.id),
              disabled: isPending,
              "data-ocid": `career_card.start_roadmap_button.${rank}`,
              children: [
                isPending ? "Loading…" : "Start Roadmap",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5 ml-1.5" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "shrink-0 text-xs transition-smooth",
              onClick: () => setExpanded((v) => !v),
              "aria-expanded": expanded,
              "data-ocid": `career_card.learn_more_button.${rank}`,
              children: expanded ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                "Less ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "h-3 w-3 ml-1" })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                "More ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3 w-3 ml-1" })
              ] })
            }
          )
        ] })
      ]
    }
  );
}
function CardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-5 space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-2/3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-20 rounded-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-24 rounded-full" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-2 w-full rounded-full" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full rounded-lg" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 rounded-lg" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 rounded-lg" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 rounded-lg" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 flex-1 rounded-lg" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-20 rounded-lg" })
    ] })
  ] });
}
function RecommendationsPage() {
  const { principalId } = useAuth();
  const {
    data: recommendations,
    isLoading,
    error
  } = useCareerRecommendations();
  const selectCareer = useSelectCareer();
  const [sortKey, setSortKey] = reactExports.useState("match");
  const [pendingId, setPendingId] = reactExports.useState(null);
  const sorted = reactExports.useMemo(() => {
    if (!recommendations) return [];
    const list = [...recommendations];
    if (sortKey === "match") {
      list.sort((a, b) => b.matchScore - a.matchScore);
    } else {
      list.sort((a, b) => b.career.avgSalaryUsd - a.career.avgSalaryUsd);
    }
    return list.slice(0, 8);
  }, [recommendations, sortKey]);
  async function handleStartRoadmap(careerId) {
    setPendingId(careerId);
    try {
      await selectCareer.mutateAsync(careerId);
      window.location.href = `/roadmap/${careerId}`;
    } finally {
      setPendingId(null);
    }
  }
  const shortId = principalId ? `${principalId.slice(0, 5)}…${principalId.slice(-3)}` : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-end justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: "/dashboard",
            className: "text-muted-foreground hover:text-foreground transition-colors text-sm flex items-center gap-1",
            "data-ocid": "recommendations.back_link",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-3.5 w-3.5" }),
              "Dashboard"
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl sm:text-3xl text-foreground", children: "Your Career Matches" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1 text-sm", children: shortId ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          "Personalized for",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs bg-muted px-1.5 py-0.5 rounded", children: shortId })
        ] }) : "Ranked by how well they match your profile" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "a",
        {
          href: "/assessment",
          className: "inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors font-medium",
          "data-ocid": "recommendations.retake_assessment_link",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-3.5 w-3.5" }),
            "Retake Assessment"
          ]
        }
      ) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 py-8", children: [
      !isLoading && sorted.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center gap-3 mb-6",
          "data-ocid": "recommendations.sort_bar",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground font-medium", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "h-3.5 w-3.5" }),
              "Sort by"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 bg-muted/60 rounded-lg p-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setSortKey("match"),
                  className: cn(
                    "px-3 py-1.5 rounded-md text-xs font-semibold transition-smooth",
                    sortKey === "match" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  ),
                  "data-ocid": "recommendations.sort_match_tab",
                  children: "Best Match"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setSortKey("salary"),
                  className: cn(
                    "px-3 py-1.5 rounded-md text-xs font-semibold transition-smooth",
                    sortKey === "salary" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  ),
                  "data-ocid": "recommendations.sort_salary_tab",
                  children: "Highest Salary"
                }
              )
            ] }),
            sorted.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Badge,
              {
                variant: "outline",
                className: "ml-auto text-xs text-muted-foreground",
                children: [
                  sorted.length,
                  " careers"
                ]
              }
            )
          ]
        }
      ),
      isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5",
          "data-ocid": "recommendations.loading_state",
          children: ["s1", "s2", "s3", "s4", "s5", "s6"].map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(CardSkeleton, {}, id))
        }
      ),
      !isLoading && error && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center justify-center py-20 text-center",
          "data-ocid": "recommendations.error_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-destructive/10 flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "h-7 w-7 text-destructive" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground mb-2", children: "Couldn't load recommendations" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-sm", children: "There was an issue fetching your career matches. Please try again." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                className: "mt-4",
                onClick: () => window.location.reload(),
                "data-ocid": "recommendations.retry_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-3.5 w-3.5 mr-2" }),
                  "Try Again"
                ]
              }
            )
          ]
        }
      ),
      !isLoading && !error && sorted.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center justify-center py-20 text-center",
          "data-ocid": "recommendations.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "h-8 w-8 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground mb-2", children: "No matches yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-md mb-6", children: "Complete the career assessment so we can analyze your skills, interests, and goals — then surface the best career paths for you." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                asChild: true,
                "data-ocid": "recommendations.take_assessment_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "/assessment", children: [
                  "Take the Assessment",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4 ml-2 rotate-180" })
                ] })
              }
            )
          ]
        }
      ),
      !isLoading && !error && sorted.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5",
          "data-ocid": "recommendations.career_list",
          children: sorted.map((match, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            CareerCard,
            {
              match,
              rank: index + 1,
              onStartRoadmap: handleStartRoadmap,
              isPending: pendingId === match.career.id
            },
            match.career.id
          ))
        }
      )
    ] }) })
  ] });
}
export {
  RecommendationsPage as default
};
