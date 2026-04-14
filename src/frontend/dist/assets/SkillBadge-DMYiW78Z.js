import { c as createLucideIcon } from "./Layout-BlufahZe.js";
import { j as jsxRuntimeExports, c as cn } from "./index-BYoSv118.js";
import { B as Badge } from "./badge-mlo4tde5.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16", key: "jecpp" }],
  ["rect", { width: "20", height: "14", x: "2", y: "6", rx: "2", key: "i6l2r4" }]
];
const Briefcase = createLucideIcon("briefcase", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]];
const Circle = createLucideIcon("circle", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
];
const ExternalLink = createLucideIcon("external-link", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }]
];
const FileText = createLucideIcon("file-text", __iconNode);
const levelColors = {
  Beginner: "bg-primary/10 text-primary border-primary/20",
  Intermediate: "bg-secondary/10 text-secondary border-secondary/20",
  Advanced: "bg-accent/15 text-accent-foreground border-accent/30",
  Expert: "bg-primary/20 text-primary border-primary/40"
};
const variantStyles = {
  default: "bg-muted text-muted-foreground border-border",
  acquired: "bg-primary/10 text-primary border-primary/20",
  gap: "bg-destructive/10 text-destructive border-destructive/20",
  required: "bg-secondary/10 text-secondary border-secondary/20"
};
function SkillBadge({
  name,
  level,
  variant = "default",
  className
}) {
  const colorClass = level ? levelColors[level] : variantStyles[variant];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Badge,
    {
      variant: "outline",
      className: cn(
        "skill-badge font-medium transition-smooth cursor-default select-none",
        colorClass,
        className
      ),
      children: [
        name,
        level && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1 opacity-60 text-[10px]", children: [
          "· ",
          level
        ] })
      ]
    }
  );
}
export {
  Briefcase as B,
  Circle as C,
  ExternalLink as E,
  FileText as F,
  SkillBadge as S
};
