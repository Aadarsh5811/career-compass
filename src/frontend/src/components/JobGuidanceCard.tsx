import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Briefcase,
  CheckCircle2,
  ExternalLink,
  FileText,
  MessageSquare,
} from "lucide-react";

const resumeTips = [
  {
    id: "tailor",
    title: "Tailor for every role",
    desc: "Mirror the job posting's keywords. ATS systems rank exact matches.",
  },
  {
    id: "impact",
    title: "Lead with impact numbers",
    desc: 'Replace duties with achievements: "Reduced load time by 40%", not "Worked on performance".',
  },
  {
    id: "onepage",
    title: "Keep it to one page",
    desc: "Recruiters scan in 6 seconds. Front-load your strongest wins above the fold.",
  },
];

const interviewItems = [
  {
    id: "research",
    text: "Research the company's mission, recent news, and products",
  },
  {
    id: "star",
    text: "Prepare 3 STAR stories (Situation, Task, Action, Result)",
  },
  {
    id: "intro",
    text: "Practice your 2-minute 'Tell me about yourself' answer",
  },
  {
    id: "questions",
    text: "Prepare 5 thoughtful questions to ask the interviewer",
  },
  {
    id: "logistics",
    text: "Confirm logistics (time zone, link, attire) 24 hours before",
  },
];

const jobPlatforms = [
  {
    id: "linkedin",
    name: "LinkedIn",
    url: "https://www.linkedin.com/jobs",
    color: "bg-primary",
    label: "Best for networking + referrals",
  },
  {
    id: "glassdoor",
    name: "Glassdoor",
    url: "https://www.glassdoor.com/Job",
    color: "bg-secondary",
    label: "Salaries + company reviews",
  },
  {
    id: "indeed",
    name: "Indeed",
    url: "https://www.indeed.com",
    color: "bg-accent",
    label: "High-volume job listings",
  },
];

interface JobGuidanceSectionProps {
  icon: React.ReactNode;
  title: string;
  badge?: string;
  children: React.ReactNode;
  className?: string;
}

function GuidanceSection({
  icon,
  title,
  badge,
  children,
  className,
}: JobGuidanceSectionProps) {
  return (
    <div
      className={cn(
        "bg-card border border-border rounded-xl p-5 flex flex-col gap-4",
        className,
      )}
    >
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
          <span className="text-secondary">{icon}</span>
        </div>
        <h3 className="font-display font-semibold text-sm text-foreground">
          {title}
        </h3>
        {badge && (
          <Badge variant="secondary" className="ml-auto text-xs">
            {badge}
          </Badge>
        )}
      </div>
      {children}
    </div>
  );
}

export function JobGuidanceCard() {
  return (
    <div
      data-ocid="dashboard.job_guidance.section"
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
    >
      {/* Resume Tips */}
      <GuidanceSection
        icon={<FileText className="w-4 h-4" />}
        title="Resume Tips"
        badge="3 tips"
      >
        <ul className="flex flex-col gap-3">
          {resumeTips.map((tip, idx) => (
            <li
              key={tip.id}
              data-ocid={`dashboard.job_guidance.resume_tip.${idx + 1}`}
              className="flex items-start gap-2.5"
            >
              <span className="mt-0.5 w-5 h-5 rounded-full bg-secondary/10 text-secondary flex items-center justify-center text-[10px] font-bold shrink-0">
                {idx + 1}
              </span>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-foreground">
                  {tip.title}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {tip.desc}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </GuidanceSection>

      {/* Interview Prep */}
      <GuidanceSection
        icon={<MessageSquare className="w-4 h-4" />}
        title="Interview Prep"
        badge="5 items"
      >
        <ul className="flex flex-col gap-2">
          {interviewItems.map((item, idx) => (
            <li
              key={item.id}
              data-ocid={`dashboard.job_guidance.interview_item.${idx + 1}`}
              className="flex items-start gap-2 text-xs text-muted-foreground"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </GuidanceSection>

      {/* Job Platforms */}
      <GuidanceSection
        icon={<Briefcase className="w-4 h-4" />}
        title="Job Search Platforms"
        badge="3 sites"
      >
        <div className="flex flex-col gap-2.5">
          {jobPlatforms.map((platform, idx) => (
            <a
              key={platform.id}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid={`dashboard.job_guidance.platform_link.${idx + 1}`}
              className="flex items-center gap-3 p-2.5 rounded-lg border border-border hover:border-secondary/40 hover:bg-secondary/5 transition-smooth group"
            >
              <div
                className={cn(
                  "w-7 h-7 rounded-md flex items-center justify-center text-white text-[10px] font-bold shrink-0",
                  platform.color,
                )}
              >
                {platform.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-foreground truncate">
                  {platform.name}
                </p>
                <p className="text-[11px] text-muted-foreground truncate">
                  {platform.label}
                </p>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-secondary transition-smooth shrink-0" />
            </a>
          ))}
        </div>
      </GuidanceSection>
    </div>
  );
}
