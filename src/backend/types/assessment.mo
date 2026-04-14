import Common "common";

module {
  public type UserId = Common.UserId;
  public type Timestamp = Common.Timestamp;

  // Interests, skills, and learning style categories
  public type InterestCategory = {
    #technology;
    #business;
    #arts;
    #science;
    #healthcare;
    #education;
    #engineering;
    #social;
  };

  public type LearningStyle = {
    #visual;
    #auditory;
    #readingWriting;
    #handson;
  };

  public type SkillLevel = {
    #beginner;
    #intermediate;
    #advanced;
  };

  // One question-answer pair from the assessment
  public type AssessmentAnswer = {
    questionId : Nat;
    answer : Text; // free-text or option key
  };

  // Stored user profile after completing assessment
  public type UserProfile = {
    userId : UserId;
    displayName : Text;
    interests : [InterestCategory];
    currentSkills : [Text];
    learningStyle : LearningStyle;
    experienceLevel : SkillLevel;
    answers : [AssessmentAnswer];
    selectedCareerPathId : ?Common.CareerPathId;
    createdAt : Timestamp;
    updatedAt : Timestamp;
  };

  // Shared (API-boundary) version — same shape since all fields are shared types
  public type UserProfilePublic = UserProfile;

  public type SaveProfileRequest = {
    displayName : Text;
    interests : [InterestCategory];
    currentSkills : [Text];
    learningStyle : LearningStyle;
    experienceLevel : SkillLevel;
    answers : [AssessmentAnswer];
  };
};
