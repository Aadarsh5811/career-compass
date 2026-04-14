import ProgressTypes "../types/progress";
import RoadmapTypes "../types/roadmap";
import CareerTypes "../types/career";
import ProgressLib "../lib/progress";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";

mixin (
  progressMap : Map.Map<ProgressTypes.UserId, ProgressTypes.UserProgress>,
  milestones : Map.Map<RoadmapTypes.MilestoneId, RoadmapTypes.Milestone>,
  careers : Map.Map<CareerTypes.CareerPathId, CareerTypes.CareerPath>,
) {

  /// Return the caller's raw progress record
  public shared query ({ caller }) func getMyProgress() : async ?ProgressTypes.UserProgress {
    ProgressLib.getProgress(progressMap, caller);
  };

  /// Toggle a milestone as complete or incomplete
  public shared ({ caller }) func toggleMilestone(req : ProgressTypes.ToggleMilestoneRequest) : async ProgressTypes.UserProgress {
    // Derive careerPathId from the milestone itself
    let careerPathId = switch (milestones.get(req.milestoneId)) {
      case (?m) m.careerPathId;
      case null Runtime.trap("Milestone not found");
    };
    ProgressLib.toggleMilestone(progressMap, caller, careerPathId, req.milestoneId, req.completed, Time.now());
  };

  /// Mark a skill as acquired
  public shared ({ caller }) func addAcquiredSkill(careerPathId : CareerTypes.CareerPathId, skill : Text) : async () {
    ProgressLib.addAcquiredSkill(progressMap, caller, careerPathId, skill, Time.now());
  };

  /// Return a computed dashboard summary for the caller
  public shared query ({ caller }) func getProgressSummary() : async ?ProgressTypes.ProgressSummary {
    ProgressLib.getSummary(progressMap, milestones, careers, caller);
  };
};
