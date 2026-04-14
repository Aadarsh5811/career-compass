import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  ClipboardList,
  Home,
  LayoutDashboard,
  Lightbulb,
  MapPin,
} from "lucide-react";
import { Sidebar } from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const mobileNavItems = [
  { to: "/", label: "Home", icon: Home, ocid: "mobile_nav.home_link" },
  {
    to: "/assessment",
    label: "Assess",
    icon: ClipboardList,
    ocid: "mobile_nav.assessment_link",
  },
  {
    to: "/recommendations",
    label: "Careers",
    icon: Lightbulb,
    ocid: "mobile_nav.recommendations_link",
  },
  {
    to: "/roadmap",
    label: "Roadmap",
    icon: MapPin,
    ocid: "mobile_nav.roadmap_link",
  },
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    ocid: "mobile_nav.dashboard_link",
  },
];

function MobileBottomNav() {
  const router = useRouterState();
  const currentPath = router.location.pathname;

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border flex items-stretch safe-area-inset-bottom"
      aria-label="Mobile navigation"
    >
      {mobileNavItems.map((item) => {
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
              "flex flex-1 flex-col items-center justify-center gap-0.5 py-2.5 px-1 text-[10px] font-medium transition-colors min-h-[56px]",
              isActive
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <item.icon
              className={cn(
                "h-5 w-5 shrink-0",
                isActive ? "text-primary" : "text-muted-foreground",
              )}
            />
            <span className="truncate">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export function Layout({ children, className }: LayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar — visible on md+ */}
      <div className="hidden md:flex md:flex-col md:shrink-0">
        <Sidebar className="h-full" />
      </div>

      {/* Main content — adds bottom padding on mobile to clear the nav bar */}
      <main
        className={cn(
          "flex-1 overflow-y-auto bg-background pb-[56px] md:pb-0",
          className,
        )}
        id="main-content"
      >
        {children}
      </main>

      {/* Mobile bottom nav */}
      <MobileBottomNav />

      <Toaster richColors position="top-right" />
    </div>
  );
}
