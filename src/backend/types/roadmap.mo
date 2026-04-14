import Common "common";

module {
  public type CareerPathId = Common.CareerPathId;
  public type MilestoneId = Common.MilestoneId;
  public type ResourceId = Common.ResourceId;

  public type ResourceType = {
    #video;
    #course;
    #article;
    #documentation;
  };

  public type Difficulty = {
    #beginner;
    #intermediate;
    #advanced;
  };

  public type LearningResource = {
    id : ResourceId;
    title : Text;
    resourceType : ResourceType;
    source : Text;    // e.g. "YouTube", "Coursera", "MDN"
    url : Text;
    estimatedDuration : Text; // e.g. "2 hours", "4 weeks"
    difficulty : Difficulty;
    skillTag : Text;  // skill this resource teaches
  };

  public type Milestone = {
    id : MilestoneId;
    careerPathId : CareerPathId;
    order : Nat;      // 1-based ordering within roadmap
    title : Text;
    description : Text;
    requiredSkills : [Text];
    estimatedTime : Text; // e.g. "2 weeks"
    projects : [Text];   // short project descriptions
    resourceIds : [ResourceId];
  };

  // Skill gap result
  public type SkillGap = {
    required : [Text];
    acquired : [Text];
    missing : [Text];
  };
};
