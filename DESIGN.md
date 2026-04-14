# Design Brief

## Direction

Editorial, professional, clarity-focused. Trusted advisor interface for career guidance — organized, intentional, execution-driven. Confusion → Confidence.

## Tone

Approachable + actionable. Tech-forward but warm. Information architect, not corporate sterile.

## Palette

| Name | Light OKLCH | Dark OKLCH | Role |
|------|---|---|---|
| Primary (teal) | 0.58 0.14 186 | 0.68 0.14 186 | Career CTAs, key actions |
| Secondary (indigo) | 0.62 0.13 272 | 0.72 0.13 272 | Learning, milestones |
| Accent (amber) | 0.72 0.18 64 | 0.78 0.18 64 | Highlights, badges |
| Background | 0.98 0.01 0 | 0.14 0.01 250 | Surface |
| Foreground | 0.15 0.02 250 | 0.95 0.01 0 | Text |
| Card | 0.99 0.01 0 | 0.18 0.01 250 | Elevated surface |
| Muted | 0.93 0.01 0 | 0.25 0.01 250 | Secondary text, disabled |
| Destructive | 0.58 0.22 18 | 0.65 0.21 18 | Error, danger |
| Border | 0.92 0.01 0 | 0.28 0.01 250 | Divider lines |

## Typography

| Tier | Font | Size/Weight | Usage |
|------|------|---|---|
| Display | Figtree 700–900 | h1: 32–40px | Page titles, career names |
| Body | DM Sans 400–500 | p: 14–16px, sm: 12px | Content, descriptions |
| Mono | Geist Mono 400 | 13px | Data, skill tags, code |

## Shape Language

Borders: `rounded-lg` (12px) on cards/buttons, `rounded-md` (10px) on form inputs, `rounded-full` on badges. Edges: 0px on data containers.

## Structural Zones

| Zone | Background | Border | Notes |
|------|---|---|---|
| Header | card | border-b | Navigation, user context |
| Sidebar | sidebar | border-r | Assessment progress, navigation |
| Main | background | none | Content area, flexible height |
| Footer | muted/40 | border-t | Resources, links |
| Card overlay | card | border | Elevated, subtle shadow |

## Component Patterns

**Assessment cards**: Full-width, stacked sections, progress indicator top-left. **Career recommendation cards**: Grid 2–3 cols, salary/sector as secondary text, colored badges for skills. **Roadmap timeline**: Vertical or horizontal, milestone checkboxes, dates, colored line connectors. **Skill chart**: Bar chart or radar, required vs current comparison. **Progress dashboard**: Completion bars (90%+), milestone list with checkmarks. **Buttons**: Primary (teal bg, white text), Secondary (muted bg, foreground text).

## Motion

Smooth transitions: all 0.3s cubic-bezier(0.4, 0, 0.2, 1). No bounce/spring — keeps professional tone. Entrance: fade-in + subtle scale (1.02 → 1) on cards. Hover: slight bg shift, no lift.

## Elevation & Depth

Shadows: subtle (0 2px 8px 0 rgba 0.08) on hover, card (0 4px 12px 0 rgba 0.1) on popovers, modal (0 12px 32px 0 rgba 0.15) on modals. Card stack effect via borders + shadows, never z-index stacking.

## Spacing & Rhythm

Padding: 16px (cards), 12px (form fields). Margins: 24px (section), 16px (subsection), 8px (item). Grid: 12-column, gutter 16px.

## Constraints

No gradients, no gloss, no bouncy animations. High information density — minimize negative space. Avoid rounded corners on data tables. Use borders over background colors for dividers.

## Signature Detail

Assessment progress indicator in sidebar (circular or stepped) with filled/unfilled states. Animates on completion. Colored milestone markers on roadmap timeline match chart colors. Skill badges use accent color with tinted background.
