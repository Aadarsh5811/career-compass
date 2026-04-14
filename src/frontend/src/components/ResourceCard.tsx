import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Clock,
  ExternalLink,
  FileText,
  Lightbulb,
  MonitorPlay,
  Video,
} from "lucide-react";
import type { LearningResource } from "../types";

interface ResourceCardProps {
  resource: LearningResource;
  className?: string;
}

const typeIcon: Record<LearningResource["type"], React.ReactNode> = {
  Video: <Video className="h-4 w-4" />,
  Course: <MonitorPlay className="h-4 w-4" />,
  Article: <FileText className="h-4 w-4" />,
  Book: <BookOpen className="h-4 w-4" />,
  Project: <Lightbulb className="h-4 w-4" />,
};

const typeColor: Record<LearningResource["type"], string> = {
  Video: "bg-chart-1/10 text-chart-1",
  Course: "bg-secondary/10 text-secondary",
  Article: "bg-muted text-muted-foreground",
  Book: "bg-chart-4/10 text-chart-4",
  Project: "bg-accent/10 text-accent-foreground",
};

export function ResourceCard({ resource, className }: ResourceCardProps) {
  return (
    <Card
      className={cn(
        "group hover:shadow-card transition-smooth border-border",
        className,
      )}
    >
      <CardHeader className="pb-2 pt-4 px-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p className="font-semibold font-display text-sm text-foreground line-clamp-2 leading-snug">
              {resource.title}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {resource.provider}
            </p>
          </div>
          <div
            className={cn(
              "flex-shrink-0 flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium",
              typeColor[resource.type],
            )}
          >
            {typeIcon[resource.type]}
            <span className="hidden sm:inline">{resource.type}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-4 pb-2">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {resource.durationHours}h
          </span>
          <Badge
            variant={resource.isFree ? "secondary" : "outline"}
            className={cn(
              "text-[10px] px-1.5 py-0",
              resource.isFree
                ? "bg-primary/10 text-primary border-primary/20"
                : "text-muted-foreground",
            )}
          >
            {resource.isFree ? "Free" : "Paid"}
          </Badge>
        </div>

        {resource.skillTags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {resource.skillTags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="px-4 pb-4 pt-0">
        <Button
          variant="outline"
          size="sm"
          className="w-full text-xs group-hover:border-primary/40 group-hover:text-primary transition-smooth"
          asChild
        >
          <a href={resource.url} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-3 w-3 mr-1.5" />
            Open Resource
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
