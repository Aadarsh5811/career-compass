import Types "../types/assessment";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";

module {
  public type UserProfile = Types.UserProfile;
  public type SaveProfileRequest = Types.SaveProfileRequest;
  public type UserId = Types.UserId;

  /// Return user profile for the given caller, or null if not onboarded yet
  public func getProfile(
    profiles : Map.Map<UserId, UserProfile>,
    userId : UserId,
  ) : ?UserProfile {
    profiles.get(userId);
  };

  /// Create or overwrite the caller's profile from assessment answers
  public func saveProfile(
    profiles : Map.Map<UserId, UserProfile>,
    userId : UserId,
    req : SaveProfileRequest,
    now : Int,
  ) : UserProfile {
    let existing = profiles.get(userId);
    let createdAt = switch (existing) {
      case (?p) p.createdAt;
      case null now;
    };
    let profile : UserProfile = {
      userId;
      displayName = req.displayName;
      interests = req.interests;
      currentSkills = req.currentSkills;
      learningStyle = req.learningStyle;
      experienceLevel = req.experienceLevel;
      answers = req.answers;
      selectedCareerPathId = switch (existing) {
        case (?p) p.selectedCareerPathId;
        case null null;
      };
      createdAt;
      updatedAt = now;
    };
    profiles.add(userId, profile);
    profile;
  };

  /// Set the selected career path on the user's profile
  public func selectCareer(
    profiles : Map.Map<UserId, UserProfile>,
    userId : UserId,
    careerPathId : Nat,
    now : Int,
  ) : () {
    switch (profiles.get(userId)) {
      case (?p) {
        profiles.add(userId, { p with selectedCareerPathId = ?careerPathId; updatedAt = now });
      };
      case null {
        Runtime.trap("Profile not found — complete assessment first");
      };
    };
  };

  /// Clear career selection so user can retake assessment
  public func clearCareerSelection(
    profiles : Map.Map<UserId, UserProfile>,
    userId : UserId,
    now : Int,
  ) : () {
    switch (profiles.get(userId)) {
      case (?p) {
        profiles.add(userId, { p with selectedCareerPathId = null; updatedAt = now });
      };
      case null ();
    };
  };
};
