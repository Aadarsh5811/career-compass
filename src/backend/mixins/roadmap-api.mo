import RoadmapTypes "../types/roadmap";
import AssessmentTypes "../types/assessment";
import RoadmapLib "../lib/roadmap";
import Map "mo:core/Map";

mixin (
  milestones : Map.Map<RoadmapTypes.MilestoneId, RoadmapTypes.Milestone>,
  resources : Map.Map<RoadmapTypes.ResourceId, RoadmapTypes.LearningResource>,
  profiles : Map.Map<AssessmentTypes.UserId, AssessmentTypes.UserProfile>,
) {

  /// Return ordered milestones for a career path
  public shared query func getRoadmap(careerPathId : RoadmapTypes.CareerPathId) : async [RoadmapTypes.Milestone] {
    RoadmapLib.getMilestones(milestones, careerPathId);
  };

  /// Return resources grouped by skill tag for a career path
  public shared query func getResourcesBySkill(skillTag : Text) : async [RoadmapTypes.LearningResource] {
    RoadmapLib.getResourcesBySkill(resources, skillTag);
  };

  /// Return resources by a list of ids
  public shared query func getResources(ids : [RoadmapTypes.ResourceId]) : async [RoadmapTypes.LearningResource] {
    RoadmapLib.getResources(resources, ids);
  };

  /// Compute skill gap for the caller vs a given career path
  public shared query ({ caller }) func getSkillGap(careerPathId : RoadmapTypes.CareerPathId) : async RoadmapTypes.SkillGap {
    let userSkills = switch (profiles.get(caller)) {
      case (?p) p.currentSkills;
      case null [];
    };
    RoadmapLib.computeSkillGap(milestones, careerPathId, userSkills);
  };
};
