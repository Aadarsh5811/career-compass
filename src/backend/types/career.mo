import Common "common";

module {
  public type CareerPathId = Common.CareerPathId;

  public type IndustrySector = {
    #tech;
    #finance;
    #healthcare;
    #education;
    #creative;
    #science;
    #engineering;
    #business;
    #social;
  };

  // Salary range as text descriptor, e.g. "$60k–$120k"
  public type SalaryRange = { min : Nat; max : Nat; currency : Text };

  public type CareerPath = {
    id : CareerPathId;
    title : Text;
    description : Text;
    sector : IndustrySector;
    salaryRange : SalaryRange;
    requiredSkills : [Text];
    // Scoring weights per interest category (parallel arrays)
    interestTags : [Text];
  };

  // Career recommendation with computed match score
  public type CareerMatch = {
    career : CareerPath;
    matchScore : Nat; // 0–100
  };
};
