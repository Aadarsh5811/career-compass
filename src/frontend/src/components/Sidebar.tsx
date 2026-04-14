import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  ClipboardList,
  Compass,
  Home,
  LayoutDashboard,
  Lightbulb,
  LogIn,
  LogOut,
  MapPin,
  User,
} from "lucide-react";
import { useAuth } from "../hooks/use-auth";
import { useUserProgress } from "../hooks/use-backend";
import { ProgressBar } from "./ProgressBar";

const navItems = [
  { to: "/", label: "Home", icon: Home, ocid: "sidebar.home_link" },
  {
    to: "/assessment",
    label: "Assessment",
    icon: ClipboardList,
    ocid: "sidebar.assessment_link",
  },
  {
    to: "/recommendations",
    label: "Recommendations",
    icon: Lightbulb,
    ocid: "sidebar.recommendations_link",
  },
  {
    to: "/roadmap",
    label: "Roadmap",
    icon: MapPin,
    ocid: "sidebar.roadmap_link",
  },
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    ocid: "sidebar.dashboard_link",
  },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const { isAuthenticated, isInitializing, principalId, login, logout } =
    useAuth();
  const { data: progress } = useUserProgress();

  const router = useRouterState();
  const currentPath = router.location.pathname;

  const milestoneCount = progress?.milestoneProgress?.length ?? 0;
  const completedCount =
    progress?.milestoneProgress?.filter((m) => m.completed).length ?? 0;
  const progressPct =
    milestoneCount > 0
      ? Math.round((completedCount / milestoneCount) * 100)
      : 0;

  return (
    <aside
      className={cn(
        "flex flex-col w-64 shrink-0 bg-sidebar border-r border-sidebar-border h-full",
        className,
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-sidebar-border">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground shadow-subtle">
          <Compass className="h-4.5 w-4.5" strokeWidth={2.5} />
        </div>
        <div>
          <span className="font-bold font-display text-base text-sidebar-foreground leading-none">
            Career
          </span>
          <span className="font-bold font-display text-base text-primary leading-none">
            {" "}
            Compass
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav
        className="flex-1 px-3 py-4 space-y-0.5"
        aria-label="Main navigation"
      >
        {navItems.map((item) => {
          const isActive =
            item.to === "/"
              ? currentPath === "/"
              : currentPath.startsWith(item.to);

          return (
            <Link
              key={item.to}
              to={item.to}
              data-ocid={item.ocid}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth group",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-sidebar-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <item.icon
                className={cn(
                  "h-4 w-4 shrink-0 transition-smooth",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground group-hover:text-foreground",
                )}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Assessment Progress (signature detail) */}
      {isAuthenticated && milestoneCount > 0 && (
        <>
          <Separator className="bg-sidebar-border" />
          <div className="px-5 py-4" data-ocid="sidebar.progress_panel">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              Roadmap Progress
            </p>
            <ProgressBar
              value={progressPct}
              size="sm"
              variant="primary"
              showLabel
              animated
            />
            <p className="text-xs text-muted-foreground mt-1.5">
              {completedCount} / {milestoneCount} milestones done
            </p>
          </div>
        </>
      )}

      <Separator className="bg-sidebar-border" />

      {/* Auth section */}
      <div className="px-3 py-4">
        {isInitializing ? (
          <div className="h-9 bg-muted rounded-lg animate-pulse" />
        ) : isAuthenticated ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted">
              <User className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              <span className="text-xs text-muted-foreground truncate font-mono">
                {principalId?.slice(0, 10)}…
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs transition-smooth"
              onClick={logout}
              data-ocid="sidebar.logout_button"
            >
              <LogOut className="h-3.5 w-3.5 mr-1.5" />
              Sign Out
            </Button>
          </div>
        ) : (
          <Button
            size="sm"
            className="w-full text-xs bg-primary text-primary-foreground transition-smooth hover:bg-primary/90"
            onClick={login}
            data-ocid="sidebar.login_button"
          >
            <LogIn className="h-3.5 w-3.5 mr-1.5" />
            Sign In with II
          </Button>
        )}
      </div>
    </aside>
  );
}
