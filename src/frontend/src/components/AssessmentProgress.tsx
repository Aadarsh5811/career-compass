import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

interface Phase {
  label: string;
  description: string;
}

const PHASES: Phase[] = [
  { label: "Interests", description: "Topics & passions" },
  { label: "Skills", description: "Experience & time" },
  { label: "Goals", description: "Learning style & timeline" },
];

interface AssessmentProgressProps {
  currentPhase: number; // 1-indexed
  totalPhases?: number;
}

export function AssessmentProgress({
  currentPhase,
  totalPhases = 3,
}: AssessmentProgressProps) {
  return (
    <div className="w-full" data-ocid="assessment.progress_bar">
      {/* Step indicators */}
      <div className="flex items-start justify-between relative">
        {/* Connector lines */}
        <div className="absolute top-4 left-0 right-0 flex items-center px-10 pointer-events-none">
          <div
            className={cn(
              "h-0.5 flex-1 transition-smooth",
              1 < currentPhase ? "bg-primary" : "bg-border",
            )}
          />
          {totalPhases > 2 && (
            <div
              className={cn(
                "h-0.5 flex-1 transition-smooth",
                2 < currentPhase ? "bg-primary" : "bg-border",
              )}
            />
          )}
          {totalPhases > 3 && (
            <div
              className={cn(
                "h-0.5 flex-1 transition-smooth",
                3 < currentPhase ? "bg-primary" : "bg-border",
              )}
            />
          )}
        </div>

        {PHASES.slice(0, totalPhases).map((phase, i) => {
          const phaseNum = i + 1;
          const isDone = phaseNum < currentPhase;
          const isActive = phaseNum === currentPhase;

          return (
            <div
              key={phaseNum}
              className="flex flex-col items-center gap-1.5 z-10"
              data-ocid={`assessment.phase_step.${phaseNum}`}
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-smooth border-2",
                  isDone
                    ? "bg-primary border-primary text-primary-foreground"
                    : isActive
                      ? "bg-primary/10 border-primary text-primary"
                      : "bg-card border-border text-muted-foreground",
                )}
              >
                {isDone ? <CheckCircle2 className="h-4 w-4" /> : phaseNum}
              </div>
              <div className="text-center hidden sm:block">
                <p
                  className={cn(
                    "text-xs font-semibold leading-tight",
                    isActive
                      ? "text-foreground"
                      : isDone
                        ? "text-primary"
                        : "text-muted-foreground",
                  )}
                >
                  {phase.label}
                </p>
                <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">
                  {phase.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Phase label for mobile */}
      <div className="sm:hidden mt-3 text-center">
        <p className="text-sm font-semibold text-foreground">
          Phase {currentPhase} — {PHASES[currentPhase - 1]?.label}
        </p>
        <p className="text-xs text-muted-foreground">
          {PHASES[currentPhase - 1]?.description}
        </p>
      </div>

      {/* Progress fraction */}
      <p
        className="text-xs text-muted-foreground text-right mt-2"
        aria-label={`Phase ${currentPhase} of ${totalPhases}`}
      >
        Step {currentPhase}/{totalPhases}
      </p>
    </div>
  );
}
