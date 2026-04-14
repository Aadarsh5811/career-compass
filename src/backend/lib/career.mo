import Types "../types/career";
import AssessmentTypes "../types/assessment";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Order "mo:core/Order";
import Text "mo:core/Text";

module {
  public type CareerPath = Types.CareerPath;
  public type CareerMatch = Types.CareerMatch;
  public type CareerPathId = Types.CareerPathId;

  /// Return all seeded career paths
  public func listCareers(
    careers : Map.Map<CareerPathId, CareerPath>,
  ) : [CareerPath] {
    careers.values().toArray();
  };

  /// Return a single career path by id
  public func getCareer(
    careers : Map.Map<CareerPathId, CareerPath>,
    id : CareerPathId,
  ) : ?CareerPath {
    careers.get(id);
  };

  /// Compute top matches (up to 8) based on user interests and skills
  public func recommendCareers(
    careers : Map.Map<CareerPathId, CareerPath>,
    profile : AssessmentTypes.UserProfile,
  ) : [CareerMatch] {
    let interestSet : [Text] = profile.interests.map<AssessmentTypes.InterestCategory, Text>(
      func(cat) {
        switch (cat) {
          case (#technology) "technology";
          case (#business) "business";
          case (#arts) "arts";
          case (#science) "science";
          case (#healthcare) "healthcare";
          case (#education) "education";
          case (#engineering) "engineering";
          case (#social) "social";
        };
      },
    );

    let allCareers = careers.values().toArray();

    let scored : [CareerMatch] = allCareers.map<CareerPath, CareerMatch>(
      func(career) {
        var score : Nat = 0;
        for (tag in career.interestTags.values()) {
          if (interestSet.any(func(t : Text) : Bool { Text.equal(t, tag) })) {
            score += 10;
          };
        };
        for (skill in career.requiredSkills.values()) {
          if (profile.currentSkills.any(func(s : Text) : Bool { Text.equal(s, skill) })) {
            score += 5;
          };
        };
        let matchScore = if (score > 100) 100 else score;
        { career; matchScore };
      },
    );

    let sorted = scored.sort(func(a : CareerMatch, b : CareerMatch) : Order.Order {
      Nat.compare(b.matchScore, a.matchScore)
    });

    if (sorted.size() > 8) sorted.sliceToArray(0, 8) else sorted;
  };

  /// Seed initial career paths (admin / one-time init)
  public func seedCareers(
    careers : Map.Map<CareerPathId, CareerPath>,
    nextId : Nat,
  ) : Nat {
    var id = nextId;

    let catalogue : [(Text, Text, Types.IndustrySector, Types.SalaryRange, [Text], [Text])] = [
      (
        "Software Engineer",
        "Design, build, and maintain software systems. Work across web, mobile, and backend domains using modern programming languages and frameworks.",
        #tech,
        { min = 70000; max = 160000; currency = "USD" },
        ["programming", "data structures", "algorithms", "version control", "system design"],
        ["technology", "engineering"],
      ),
      (
        "Data Scientist",
        "Extract insights from large datasets using statistical analysis, machine learning, and data visualisation to drive business decisions.",
        #tech,
        { min = 80000; max = 150000; currency = "USD" },
        ["statistics", "Python", "machine learning", "SQL", "data visualisation"],
        ["technology", "science"],
      ),
      (
        "UX/UI Designer",
        "Create intuitive, visually compelling user experiences across digital products. Balance aesthetics with usability through research and iteration.",
        #creative,
        { min = 55000; max = 120000; currency = "USD" },
        ["design thinking", "wireframing", "prototyping", "user research", "Figma"],
        ["arts", "technology"],
      ),
      (
        "Financial Analyst",
        "Analyse financial data, build models, and advise on investment and business decisions to maximise organisational value.",
        #finance,
        { min = 60000; max = 130000; currency = "USD" },
        ["Excel", "financial modelling", "accounting", "valuation", "risk analysis"],
        ["business", "science"],
      ),
      (
        "Healthcare Nurse",
        "Provide direct patient care, administer medications, and collaborate with medical teams to support patient recovery and wellbeing.",
        #healthcare,
        { min = 50000; max = 95000; currency = "USD" },
        ["patient care", "clinical assessment", "medication administration", "empathy", "critical thinking"],
        ["healthcare", "social"],
      ),
      (
        "Machine Learning Engineer",
        "Build and deploy ML models at scale. Bridge the gap between data science research and production-grade software systems.",
        #tech,
        { min = 100000; max = 180000; currency = "USD" },
        ["Python", "machine learning", "MLOps", "deep learning", "cloud platforms"],
        ["technology", "science", "engineering"],
      ),
      (
        "Digital Marketing Manager",
        "Plan and execute data-driven marketing campaigns across SEO, paid ads, email, and social channels to grow brand and revenue.",
        #business,
        { min = 50000; max = 110000; currency = "USD" },
        ["SEO", "content strategy", "analytics", "paid advertising", "copywriting"],
        ["business", "arts", "technology"],
      ),
      (
        "Biomedical Researcher",
        "Conduct laboratory and clinical research to advance understanding of diseases and develop new treatments and diagnostics.",
        #science,
        { min = 55000; max = 120000; currency = "USD" },
        ["biology", "chemistry", "lab techniques", "data analysis", "scientific writing"],
        ["science", "healthcare"],
      ),
    ];

    for ((title, desc, sector, salary, skills, tags) in catalogue.values()) {
      let path : CareerPath = {
        id;
        title;
        description = desc;
        sector;
        salaryRange = salary;
        requiredSkills = skills;
        interestTags = tags;
      };
      careers.add(id, path);
      id += 1;
    };

    id;
  };
};
