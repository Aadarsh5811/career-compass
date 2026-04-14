import CareerTypes "../types/career";
import AssessmentTypes "../types/assessment";
import CareerLib "../lib/career";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";

mixin (
  careers : Map.Map<CareerTypes.CareerPathId, CareerTypes.CareerPath>,
  profiles : Map.Map<AssessmentTypes.UserId, AssessmentTypes.UserProfile>,
) {

  /// Return all available career paths
  public shared query func listCareers() : async [CareerTypes.CareerPath] {
    CareerLib.listCareers(careers);
  };

  /// Return a single career path by id
  public shared query func getCareer(id : CareerTypes.CareerPathId) : async ?CareerTypes.CareerPath {
    CareerLib.getCareer(careers, id);
  };

  /// Return top matched career paths for the caller based on their profile
  public shared query ({ caller }) func getCareerRecommendations() : async [CareerTypes.CareerMatch] {
    switch (profiles.get(caller)) {
      case (?profile) CareerLib.recommendCareers(careers, profile);
      case null Runtime.trap("Complete your assessment first");
    };
  };
};
