import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CheckSquare, Square } from "lucide-react";

// ─── Multi-select option ──────────────────────────────────────────────────────

interface SelectOption {
  value: string;
  label: string;
  icon?: string;
}

interface MultiSelectProps {
  options: SelectOption[];
  selected: string[];
  onChange: (next: string[]) => void;
  max?: number;
  ocidPrefix: string;
}

export function MultiSelect({
  options,
  selected,
  onChange,
  max,
  ocidPrefix,
}: MultiSelectProps) {
  const toggle = (val: string) => {
    if (selected.includes(val)) {
      onChange(selected.filter((v) => v !== val));
    } else if (!max || selected.length < max) {
      onChange([...selected, val]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt, idx) => {
        const isSelected = selected.includes(opt.value);
        const isDisabled = !isSelected && !!max && selected.length >= max;
        return (
          <button
            key={opt.value}
            type="button"
            disabled={isDisabled}
            onClick={() => toggle(opt.value)}
            data-ocid={`${ocidPrefix}.${idx + 1}`}
            aria-pressed={isSelected}
            className={cn(
              "inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border text-sm font-medium transition-smooth cursor-pointer select-none",
              isSelected
                ? "bg-primary/10 border-primary text-primary"
                : isDisabled
                  ? "bg-muted border-border text-muted-foreground cursor-not-allowed opacity-50"
                  : "bg-card border-border text-foreground hover:border-primary/60 hover:bg-primary/5",
            )}
          >
            {isSelected ? (
              <CheckSquare className="h-3.5 w-3.5 shrink-0" />
            ) : (
              <Square className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
            )}
            {opt.icon && <span>{opt.icon}</span>}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

// ─── Single-select (radio-style) ──────────────────────────────────────────────

interface SingleSelectProps {
  options: SelectOption[];
  selected: string;
  onChange: (val: string) => void;
  ocidPrefix: string;
  layout?: "row" | "grid";
}

export function SingleSelect({
  options,
  selected,
  onChange,
  ocidPrefix,
  layout = "grid",
}: SingleSelectProps) {
  return (
    <div
      className={cn(
        "gap-3",
        layout === "grid"
          ? "grid grid-cols-2 sm:grid-cols-3"
          : "flex flex-wrap",
      )}
    >
      {options.map((opt, idx) => {
        const isSelected = selected === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            data-ocid={`${ocidPrefix}.${idx + 1}`}
            aria-pressed={isSelected}
            className={cn(
              "flex flex-col items-center gap-1.5 px-4 py-3 rounded-xl border text-sm font-medium transition-smooth cursor-pointer select-none text-center",
              isSelected
                ? "bg-primary/10 border-primary text-primary shadow-sm"
                : "bg-card border-border text-foreground hover:border-primary/60 hover:bg-primary/5",
            )}
          >
            {opt.icon && (
              <span className="text-xl leading-none">{opt.icon}</span>
            )}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

// ─── Section question wrapper ─────────────────────────────────────────────────

interface QuestionProps {
  index: number;
  label: string;
  hint?: string;
  required?: boolean;
  hasAnswer: boolean;
  children: React.ReactNode;
}

export function Question({
  index,
  label,
  hint,
  required = true,
  hasAnswer,
  children,
}: QuestionProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-start gap-2">
        <Badge
          variant="outline"
          className={cn(
            "shrink-0 mt-0.5 font-mono text-[10px] px-1.5 py-0.5 transition-smooth",
            hasAnswer
              ? "bg-primary/10 border-primary/30 text-primary"
              : "bg-muted text-muted-foreground",
          )}
        >
          Q{index}
        </Badge>
        <div>
          <p className="text-sm font-semibold text-foreground leading-snug">
            {label}
            {required && !hasAnswer && (
              <span className="ml-1 text-destructive text-xs">*</span>
            )}
          </p>
          {hint && (
            <p className="text-xs text-muted-foreground mt-0.5">{hint}</p>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}
