import Types "../types/assessment";
import AssessmentLib "../lib/assessment";
import Map "mo:core/Map";
import Time "mo:core/Time";

mixin (profiles : Map.Map<Types.UserId, Types.UserProfile>) {

  /// Get the caller's profile (returns null if not yet assessed)
  public shared query ({ caller }) func getMyProfile() : async ?Types.UserProfilePublic {
    AssessmentLib.getProfile(profiles, caller);
  };

  /// Save/update the caller's profile from assessment data
  public shared ({ caller }) func saveMyProfile(req : Types.SaveProfileRequest) : async Types.UserProfilePublic {
    AssessmentLib.saveProfile(profiles, caller, req, Time.now());
  };

  /// Select a career path (after seeing recommendations)
  public shared ({ caller }) func selectCareer(careerPathId : Nat) : async () {
    AssessmentLib.selectCareer(profiles, caller, careerPathId, Time.now());
  };

  /// Clear career selection to retake the assessment
  public shared ({ caller }) func retakeAssessment() : async () {
    AssessmentLib.clearCareerSelection(profiles, caller, Time.now());
  };
};
