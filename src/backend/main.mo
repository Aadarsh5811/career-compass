import Map "mo:core/Map";
import AssessmentTypes "types/assessment";
import CareerTypes "types/career";
import RoadmapTypes "types/roadmap";
import ProgressTypes "types/progress";
import AssessmentApi "mixins/assessment-api";
import CareerApi "mixins/career-api";
import RoadmapApi "mixins/roadmap-api";
import ProgressApi "mixins/progress-api";
import CareerLib "lib/career";
import RoadmapLib "lib/roadmap";

actor {
  // ── Shared state slices ──────────────────────────────────────────────────
  let profiles    = Map.empty<AssessmentTypes.UserId, AssessmentTypes.UserProfile>();
  let careers     = Map.empty<CareerTypes.CareerPathId, CareerTypes.CareerPath>();
  let milestones  = Map.empty<RoadmapTypes.MilestoneId, RoadmapTypes.Milestone>();
  let resources   = Map.empty<RoadmapTypes.ResourceId, RoadmapTypes.LearningResource>();
  let progressMap = Map.empty<ProgressTypes.UserId, ProgressTypes.UserProgress>();

  var nextCareerPathId : Nat = 0;
  var nextMilestoneId  : Nat = 0;
  var nextResourceId   : Nat = 0;

  // ── Seed data (runs once on first deploy — idempotent via id counter) ────
  if (nextCareerPathId == 0) {
    nextCareerPathId := CareerLib.seedCareers(careers, nextCareerPathId);
    let (newMid, newRid) = RoadmapLib.seedMilestones(milestones, resources, nextMilestoneId, nextResourceId);
    nextMilestoneId := newMid;
    nextResourceId  := newRid;
  };

  // ── Mixin composition ────────────────────────────────────────────────────
  include AssessmentApi(profiles);
  include CareerApi(careers, profiles);
  include RoadmapApi(milestones, resources, profiles);
  include ProgressApi(progressMap, milestones, careers);
};
