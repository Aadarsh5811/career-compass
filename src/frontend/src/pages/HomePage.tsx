import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  ClipboardList,
  Compass,
  Lightbulb,
  MapPin,
  Target,
} from "lucide-react";
import { motion } from "motion/react";
import { Layout } from "../components/Layout";
import { useAuth } from "../hooks/use-auth";

const features = [
  {
    icon: ClipboardList,
    title: "Career Assessment",
    description:
      "Tell us your skills, interests, and goals. Our assessment pinpoints the careers that fit you best.",
    color: "text-primary",
    bg: "bg-primary/10",
    ocid: "home.feature_card.1",
  },
  {
    icon: Lightbulb,
    title: "Smart Recommendations",
    description:
      "Get ranked career matches with match scores, skill gap analysis, and salary benchmarks.",
    color: "text-secondary",
    bg: "bg-secondary/10",
    ocid: "home.feature_card.2",
  },
  {
    icon: MapPin,
    title: "Personalized Roadmap",
    description:
      "Step-by-step milestones: what to learn, which projects to build, and in what order.",
    color: "text-accent-foreground",
    bg: "bg-accent/10",
    ocid: "home.feature_card.3",
  },
  {
    icon: BookOpen,
    title: "Curated Resources",
    description:
      "Hand-picked courses, videos, and articles — free and paid — for every milestone.",
    color: "text-chart-4",
    bg: "bg-chart-4/10",
    ocid: "home.feature_card.4",
  },
  {
    icon: Target,
    title: "Skill Gap Analysis",
    description:
      "Compare your current skills against what's required and focus your learning where it matters.",
    color: "text-primary",
    bg: "bg-primary/10",
    ocid: "home.feature_card.5",
  },
  {
    icon: BarChart3,
    title: "Progress Dashboard",
    description:
      "Track completed milestones, skills acquired, and estimated time to job-ready.",
    color: "text-secondary",
    bg: "bg-secondary/10",
    ocid: "home.feature_card.6",
  },
];

const steps = [
  { label: "Take the Assessment", sub: "5-minute skills & interests quiz" },
  { label: "Review Matches", sub: "Ranked careers with match scores" },
  { label: "Follow the Roadmap", sub: "Step-by-step milestones & resources" },
  { label: "Track Progress", sub: "Dashboard to stay on track" },
];

export default function HomePage() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  const handleCTA = () => {
    if (isAuthenticated) {
      navigate({ to: "/assessment" });
    } else {
      login();
    }
  };

  return (
    <Layout>
      {/* Hero */}
      <section
        className="relative flex flex-col items-center justify-center min-h-[80vh] px-6 py-16 text-center bg-background overflow-hidden"
        data-ocid="home.hero_section"
      >
        {/* Background gradient blobs */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          aria-hidden
        >
          <div className="absolute -top-24 -left-24 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-[400px] h-[400px] rounded-full bg-secondary/5 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-accent/5 blur-2xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="relative z-10 max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-6">
            <Compass className="h-3.5 w-3.5" />
            Smart Career Guidance Platform
          </div>

          <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1.1] tracking-tight mb-4">
            Find Your <span className="text-primary">Career Path.</span>
            <br />
            Execute the Plan.
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl mx-auto">
            Stop guessing. Career Compass analyzes your skills and interests to
            surface the best career options — then hands you a step-by-step
            roadmap to get there.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth shadow-card font-semibold"
              onClick={handleCTA}
              data-ocid="home.start_assessment_button"
            >
              Start Your Assessment
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="transition-smooth"
              onClick={() => navigate({ to: "/recommendations" })}
              data-ocid="home.explore_careers_button"
            >
              Explore Careers
            </Button>
          </div>
        </motion.div>

        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          className="relative z-10 mt-12 w-full max-w-3xl rounded-2xl overflow-hidden shadow-modal border border-border"
        >
          <img
            src="/assets/generated/hero-compass.dim_1200x600.jpg"
            alt="Career Compass — visual career path illustration"
            className="w-full h-auto object-cover"
            loading="eager"
          />
        </motion.div>
      </section>

      {/* How It Works */}
      <section
        className="bg-muted/30 border-t border-border px-6 py-14"
        data-ocid="home.how_it_works_section"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-2">
              How It Works
            </h2>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              From confused to job-ready in four clear steps.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex flex-col items-center text-center p-5 rounded-xl bg-card border border-border shadow-xs"
                data-ocid={`home.step_card.${i + 1}`}
              >
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <span className="text-sm font-bold text-primary">
                    {i + 1}
                  </span>
                </div>
                <p className="font-semibold font-display text-sm text-foreground mb-1">
                  {step.label}
                </p>
                <p className="text-xs text-muted-foreground">{step.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        className="bg-background border-t border-border px-6 py-14"
        data-ocid="home.features_section"
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-2">
              Everything You Need
            </h2>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              Not just suggestions — a complete system to get you from interest
              to employed.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                data-ocid={feat.ocid}
              >
                <Card className="h-full hover:shadow-card transition-smooth border-border group">
                  <CardHeader className="pb-2 pt-5 px-5">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${feat.bg}`}
                    >
                      <feat.icon className={`h-5 w-5 ${feat.color}`} />
                    </div>
                    <p className="font-bold font-display text-sm text-foreground">
                      {feat.title}
                    </p>
                  </CardHeader>
                  <CardContent className="px-5 pb-5">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {feat.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section
        className="bg-primary px-6 py-12 text-center"
        data-ocid="home.cta_section"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-lg mx-auto"
        >
          <h2 className="font-display font-bold text-2xl md:text-3xl text-primary-foreground mb-3">
            Ready to find your direction?
          </h2>
          <p className="text-primary-foreground/80 text-sm mb-6">
            Take the 5-minute assessment and get your personalized career
            roadmap today.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold shadow-md transition-smooth"
            onClick={handleCTA}
            data-ocid="home.cta_start_button"
          >
            Get Started — It's Free
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border px-6 py-6 text-center">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
              typeof window !== "undefined" ? window.location.hostname : "",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline transition-smooth"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </Layout>
  );
}
