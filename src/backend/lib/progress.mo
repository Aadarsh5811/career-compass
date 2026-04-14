import Types "../types/progress";
import RoadmapTypes "../types/roadmap";
import CareerTypes "../types/career";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Order "mo:core/Order";

module {
  public type UserProgress = Types.UserProgress;
  public type ProgressSummary = Types.ProgressSummary;
  public type UserId = Types.UserId;
  public type CareerPathId = Types.CareerPathId;
  public type MilestoneId = Types.MilestoneId;

  /// Return the progress record for a user, or null if not started
  public func getProgress(
    progressMap : Map.Map<UserId, UserProgress>,
    userId : UserId,
  ) : ?UserProgress {
    progressMap.get(userId);
  };

  /// Toggle a milestone completion for a user, initialising record if needed
  public func toggleMilestone(
    progressMap : Map.Map<UserId, UserProgress>,
    userId : UserId,
    careerPathId : CareerPathId,
    milestoneId : MilestoneId,
    completed : Bool,
    now : Int,
  ) : UserProgress {
    let existing = progressMap.get(userId);
    let base : UserProgress = switch (existing) {
      case (?p) p;
      case null {
        {
          userId;
          careerPathId;
          completedMilestones = [];
          acquiredSkills = [];
          completedCourses = [];
          startedAt = now;
          updatedAt = now;
        }
      };
    };

    let alreadyIn = base.completedMilestones.find(func(m : MilestoneId) : Bool { m == milestoneId }) != null;
    let updatedMilestones : [MilestoneId] = if (completed and not alreadyIn) {
      base.completedMilestones.concat([milestoneId]);
    } else if (not completed and alreadyIn) {
      base.completedMilestones.filter(func(m : MilestoneId) : Bool { m != milestoneId });
    } else {
      base.completedMilestones;
    };

    let updated : UserProgress = {
      base with
      careerPathId;
      completedMilestones = updatedMilestones;
      updatedAt = now;
    };
    progressMap.add(userId, updated);
    updated;
  };

  /// Add an acquired skill to the user's progress
  public func addAcquiredSkill(
    progressMap : Map.Map<UserId, UserProgress>,
    userId : UserId,
    careerPathId : CareerPathId,
    skill : Text,
    now : Int,
  ) : () {
    let existing = progressMap.get(userId);
    let base : UserProgress = switch (existing) {
      case (?p) p;
      case null {
        {
          userId;
          careerPathId;
          completedMilestones = [];
          acquiredSkills = [];
          completedCourses = [];
          startedAt = now;
          updatedAt = now;
        }
      };
    };
    if (base.acquiredSkills.find(func(s : Text) : Bool { s == skill }) == null) {
      let updated : UserProgress = {
        base with
        careerPathId;
        acquiredSkills = base.acquiredSkills.concat([skill]);
        updatedAt = now;
      };
      progressMap.add(userId, updated);
    };
  };

  /// Compute dashboard summary for a user
  public func getSummary(
    progressMap : Map.Map<UserId, UserProgress>,
    milestones : Map.Map<MilestoneId, RoadmapTypes.Milestone>,
    careers : Map.Map<CareerPathId, CareerTypes.CareerPath>,
    userId : UserId,
  ) : ?ProgressSummary {
    let progress = switch (progressMap.get(userId)) {
      case null { return null };
      case (?p) p;
    };
    let career = switch (careers.get(progress.careerPathId)) {
      case null { return null };
      case (?c) c;
    };

    let careerMilestones = milestones.values().toArray()
      .filter(func(m : RoadmapTypes.Milestone) : Bool { m.careerPathId == progress.careerPathId });

    let totalMilestones = careerMilestones.size();
    let completedCount = progress.completedMilestones.size();

    let percentComplete : Nat = if (totalMilestones == 0) 0
      else (completedCount * 100) / totalMilestones;

    let sorted = careerMilestones.sort(func(a : RoadmapTypes.Milestone, b : RoadmapTypes.Milestone) : Order.Order {
      Nat.compare(a.order, b.order)
    });

    let nextMilestone = sorted.find(func(m : RoadmapTypes.Milestone) : Bool {
      progress.completedMilestones.find(func(id : MilestoneId) : Bool { id == m.id }) == null
    });

    let nextMilestoneId : ?MilestoneId = switch (nextMilestone) {
      case (?m) ?m.id;
      case null null;
    };

    let remainingCount = if (completedCount >= totalMilestones) 0 else totalMilestones - completedCount;
    let timelineEstimate = if (remainingCount == 0) "Complete!"
      else (remainingCount.toText() # " milestones remaining");

    ?{
      careerTitle = career.title;
      totalMilestones;
      completedCount;
      percentComplete;
      nextMilestoneId;
      timelineEstimate;
    };
  };
};
