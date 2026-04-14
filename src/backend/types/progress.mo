import Common "common";

module {
  public type UserId = Common.UserId;
  public type CareerPathId = Common.CareerPathId;
  public type MilestoneId = Common.MilestoneId;
  public type Timestamp = Common.Timestamp;

  // Per-user progress record for a career path
  public type UserProgress = {
    userId : UserId;
    careerPathId : CareerPathId;
    completedMilestones : [MilestoneId];
    acquiredSkills : [Text];
    completedCourses : [Text];
    startedAt : Timestamp;
    updatedAt : Timestamp;
  };

  // Computed summary for the dashboard
  public type ProgressSummary = {
    careerTitle : Text;
    totalMilestones : Nat;
    completedCount : Nat;
    percentComplete : Nat; // 0–100
    nextMilestoneId : ?MilestoneId;
    timelineEstimate : Text;
  };

  public type ToggleMilestoneRequest = {
    milestoneId : MilestoneId;
    completed : Bool;
  };
};
