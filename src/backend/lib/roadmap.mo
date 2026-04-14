import Types "../types/roadmap";
import Map "mo:core/Map";
import List "mo:core/List";
import Nat "mo:core/Nat";
import Order "mo:core/Order";
import Text "mo:core/Text";

module {
  public type Milestone = Types.Milestone;
  public type LearningResource = Types.LearningResource;
  public type SkillGap = Types.SkillGap;
  public type MilestoneId = Types.MilestoneId;
  public type ResourceId = Types.ResourceId;
  public type CareerPathId = Types.CareerPathId;

  /// Return ordered milestones for a career path
  public func getMilestones(
    milestones : Map.Map<MilestoneId, Milestone>,
    careerPathId : CareerPathId,
  ) : [Milestone] {
    let filtered = milestones.values().toArray()
      .filter(func(m : Milestone) : Bool { m.careerPathId == careerPathId });
    filtered.sort(func(a : Milestone, b : Milestone) : Order.Order {
      Nat.compare(a.order, b.order)
    });
  };

  /// Return all resources attached to a specific skill tag
  public func getResourcesBySkill(
    resources : Map.Map<ResourceId, LearningResource>,
    skillTag : Text,
  ) : [LearningResource] {
    let lower = skillTag.toLower();
    resources.values().toArray()
      .filter(func(r : LearningResource) : Bool { Text.equal(r.skillTag.toLower(), lower) });
  };

  /// Return resources by ids
  public func getResources(
    resources : Map.Map<ResourceId, LearningResource>,
    ids : [ResourceId],
  ) : [LearningResource] {
    ids.filterMap<ResourceId, LearningResource>(func(id) { resources.get(id) });
  };

  /// Compute skill gap between user's current skills and roadmap requirements
  public func computeSkillGap(
    milestones : Map.Map<MilestoneId, Milestone>,
    careerPathId : CareerPathId,
    userSkills : [Text],
  ) : SkillGap {
    let ms = getMilestones(milestones, careerPathId);
    let requiredList = List.empty<Text>();
    for (m in ms.values()) {
      for (skill in m.requiredSkills.values()) {
        if (requiredList.find(func(s : Text) : Bool { Text.equal(s, skill) }) == null) {
          requiredList.add(skill);
        };
      };
    };
    let required = requiredList.toArray();

    let acquired = userSkills.filter(func(s : Text) : Bool {
      required.find(func(r : Text) : Bool { Text.equal(r, s) }) != null
    });

    let missing = required.filter(func(r : Text) : Bool {
      userSkills.find(func(s : Text) : Bool { Text.equal(s, r) }) == null
    });

    { required; acquired; missing };
  };

  /// Seed milestones and resources for all 8 career paths
  public func seedMilestones(
    milestones : Map.Map<MilestoneId, Milestone>,
    resources : Map.Map<ResourceId, LearningResource>,
    nextMilestoneId : Nat,
    nextResourceId : Nat,
  ) : (Nat, Nat) {
    var mid = nextMilestoneId;
    var rid = nextResourceId;

    func addResource(
      title : Text,
      rType : Types.ResourceType,
      source : Text,
      url : Text,
      duration : Text,
      diff : Types.Difficulty,
      tag : Text,
    ) : ResourceId {
      let r : LearningResource = {
        id = rid;
        title;
        resourceType = rType;
        source;
        url;
        estimatedDuration = duration;
        difficulty = diff;
        skillTag = tag;
      };
      resources.add(rid, r);
      rid += 1;
      rid - 1;
    };

    func addMilestone(
      careerPathId : CareerPathId,
      order : Nat,
      title : Text,
      description : Text,
      skills : [Text],
      time : Text,
      projects : [Text],
      rids : [ResourceId],
    ) {
      let m : Milestone = {
        id = mid;
        careerPathId;
        order;
        title;
        description;
        requiredSkills = skills;
        estimatedTime = time;
        projects;
        resourceIds = rids;
      };
      milestones.add(mid, m);
      mid += 1;
    };

    // ── Career 0: Software Engineer ──────────────────────────────────────────
    let r0 = addResource("CS50: Intro to Computer Science", #course, "edX", "https://cs50.harvard.edu/x/", "12 weeks", #beginner, "programming");
    let r1 = addResource("Python Full Course for Beginners", #video, "YouTube", "https://youtube.com/watch?v=rfscVS0vtbw", "4 hours", #beginner, "programming");
    let r2 = addResource("Git & GitHub Crash Course", #video, "YouTube", "https://youtube.com/watch?v=RGOj5yH7evk", "1 hour", #beginner, "version control");
    let r3 = addResource("Data Structures Easy to Advanced", #video, "YouTube", "https://youtube.com/watch?v=RBSGKlAvoiM", "8 hours", #intermediate, "data structures");
    let r4 = addResource("LeetCode — Data Structures & Algorithms", #course, "LeetCode", "https://leetcode.com/explore/", "ongoing", #intermediate, "algorithms");
    let r5 = addResource("System Design Primer", #documentation, "GitHub", "https://github.com/donnemartin/system-design-primer", "self-paced", #advanced, "system design");
    let r6 = addResource("The Odin Project — Full Stack", #course, "The Odin Project", "https://www.theodinproject.com/", "24 weeks", #intermediate, "programming");
    let r7 = addResource("Clean Code by Robert C. Martin", #article, "O'Reilly", "https://www.oreilly.com/library/view/clean-code/9780136083238/", "self-paced", #intermediate, "programming");

    addMilestone(0, 1, "Programming Fundamentals",
      "Learn core programming concepts: variables, loops, functions, OOP. Build comfort with a first language (Python or JavaScript).",
      ["programming"], "6 weeks",
      ["Build a CLI calculator", "Create a number-guessing game"],
      [r0, r1]);
    addMilestone(0, 2, "Version Control with Git",
      "Master Git workflows: commits, branches, pull requests, resolving merge conflicts. Essential for every team environment.",
      ["version control"], "1 week",
      ["Host a project on GitHub with branches and PRs"],
      [r2]);
    addMilestone(0, 3, "Data Structures & Algorithms",
      "Understand arrays, linked lists, stacks, queues, trees, graphs, sorting, and searching — the foundation of technical interviews.",
      ["data structures", "algorithms"], "8 weeks",
      ["Implement a linked list from scratch", "Solve 50 LeetCode problems"],
      [r3, r4]);
    addMilestone(0, 4, "Web Development Basics",
      "Build responsive web pages with HTML, CSS, JavaScript. Learn DOM manipulation and basic React.",
      ["programming"], "6 weeks",
      ["Build a personal portfolio website", "Create a to-do app with React"],
      [r6]);
    addMilestone(0, 5, "Backend & Databases",
      "Build REST APIs with Node.js or Python/Django. Work with SQL and NoSQL databases.",
      ["programming", "system design"], "8 weeks",
      ["Build a RESTful CRUD API", "Design a database schema for a blog"],
      [r7]);
    addMilestone(0, 6, "System Design",
      "Learn how to design scalable, reliable distributed systems. Study caching, load balancing, queues, and microservices.",
      ["system design"], "4 weeks",
      ["Design a URL shortener", "Design a real-time chat system"],
      [r5]);

    // ── Career 1: Data Scientist ─────────────────────────────────────────────
    let r8  = addResource("Python for Data Science", #course, "Coursera", "https://www.coursera.org/learn/python-for-applied-data-science-ai", "5 weeks", #beginner, "Python");
    let r9  = addResource("Statistics and Probability — Khan Academy", #video, "YouTube", "https://youtube.com/watch?v=uhxtUt_-GyM", "3 hours", #beginner, "statistics");
    let r10 = addResource("Pandas Documentation", #documentation, "pandas.pydata.org", "https://pandas.pydata.org/docs/", "self-paced", #intermediate, "Python");
    let r11 = addResource("Machine Learning by Andrew Ng", #course, "Coursera", "https://www.coursera.org/learn/machine-learning", "11 weeks", #intermediate, "machine learning");
    let r12 = addResource("Kaggle Learn — SQL", #course, "Kaggle", "https://www.kaggle.com/learn/intro-to-sql", "3 hours", #beginner, "SQL");
    let r13 = addResource("Tableau Public Training Videos", #video, "Tableau", "https://www.tableau.com/learn/training", "6 hours", #beginner, "data visualisation");
    let r14 = addResource("Deep Learning Specialisation — Andrew Ng", #course, "Coursera", "https://www.coursera.org/specializations/deep-learning", "16 weeks", #advanced, "machine learning");

    addMilestone(1, 1, "Python & Data Libraries",
      "Master Python for data analysis with NumPy, Pandas, and Matplotlib. Learn to wrangle messy datasets.",
      ["Python"], "5 weeks",
      ["Analyse a real CSV dataset with Pandas", "Plot key trends with Matplotlib"],
      [r8, r10]);
    addMilestone(1, 2, "Statistics Foundations",
      "Understand probability, distributions, hypothesis testing, and regression — the mathematical backbone of data science.",
      ["statistics"], "4 weeks",
      ["Run an A/B test analysis", "Fit a linear regression on real data"],
      [r9]);
    addMilestone(1, 3, "SQL for Data Analysis",
      "Write complex SQL queries, joins, aggregations, and window functions to extract insights from relational databases.",
      ["SQL"], "3 weeks",
      ["Solve 30 SQL practice problems on Kaggle", "Build a sales report dashboard"],
      [r12]);
    addMilestone(1, 4, "Machine Learning Fundamentals",
      "Learn supervised and unsupervised learning: regression, classification, clustering, model evaluation, and feature engineering.",
      ["machine learning"], "11 weeks",
      ["Build a house price predictor", "Classify iris dataset with 5 algorithms"],
      [r11]);
    addMilestone(1, 5, "Data Visualisation & Storytelling",
      "Turn data into compelling visual narratives using Tableau, Plotly, and seaborn. Learn dashboard design principles.",
      ["data visualisation"], "3 weeks",
      ["Build an interactive Tableau dashboard", "Create an end-to-end data story"],
      [r13]);
    addMilestone(1, 6, "Deep Learning & Advanced ML",
      "Dive into neural networks, CNNs, RNNs, and transformers. Build and deploy models on real datasets.",
      ["machine learning"], "16 weeks",
      ["Build an image classifier with CNN", "Fine-tune a sentiment analysis model"],
      [r14]);

    // ── Career 2: UX/UI Designer ─────────────────────────────────────────────
    let r15 = addResource("Google UX Design Certificate", #course, "Coursera", "https://www.coursera.org/professional-certificates/google-ux-design", "6 months", #beginner, "design thinking");
    let r16 = addResource("Figma Tutorial for Beginners", #video, "YouTube", "https://youtube.com/watch?v=jk1T0CdLxwU", "2 hours", #beginner, "Figma");
    let r17 = addResource("User Research Methods Overview", #article, "Nielsen Norman Group", "https://www.nngroup.com/articles/which-ux-research-methods/", "30 min", #beginner, "user research");
    let r18 = addResource("Laws of UX", #documentation, "Laws of UX", "https://lawsofux.com/", "self-paced", #intermediate, "design thinking");
    let r19 = addResource("Figma Advanced Techniques", #video, "YouTube", "https://youtube.com/watch?v=6t_dYhXyYjI", "3 hours", #intermediate, "prototyping");
    let r20 = addResource("Design Systems 101 — Figma", #article, "Figma Blog", "https://www.figma.com/blog/design-systems-101-what-is-a-design-system/", "20 min", #advanced, "wireframing");

    addMilestone(2, 1, "Design Thinking & UX Fundamentals",
      "Learn the double-diamond process, empathy mapping, user journeys, and how to frame design problems.",
      ["design thinking"], "3 weeks",
      ["Complete a design thinking workshop challenge", "Map a user journey for an e-commerce app"],
      [r15, r18]);
    addMilestone(2, 2, "User Research",
      "Plan and conduct user interviews, surveys, and usability tests. Synthesise findings into actionable insights.",
      ["user research"], "3 weeks",
      ["Interview 5 users and write a research report", "Create an affinity diagram"],
      [r17]);
    addMilestone(2, 3, "Wireframing & Prototyping",
      "Sketch low-fidelity wireframes and build interactive prototypes in Figma. Test concepts before coding begins.",
      ["wireframing", "prototyping"], "4 weeks",
      ["Wireframe a 5-screen mobile app", "Build a clickable prototype in Figma"],
      [r16, r19]);
    addMilestone(2, 4, "Visual Design & UI Principles",
      "Master typography, colour theory, grid systems, and component design. Build pixel-perfect interfaces.",
      ["Figma"], "4 weeks",
      ["Design a full-colour UI kit", "Recreate a popular app's UI in Figma"],
      [r20]);
    addMilestone(2, 5, "Portfolio & Case Studies",
      "Document your design process end-to-end in 3 case studies. Build a portfolio site that tells your story.",
      ["design thinking", "user research"], "4 weeks",
      ["Write 3 detailed case studies", "Launch a personal portfolio website"],
      [r15]);

    // ── Career 3: Financial Analyst ──────────────────────────────────────────
    let r21 = addResource("Excel for Finance — Full Course", #video, "YouTube", "https://youtube.com/watch?v=oFBCCbJuYY0", "3 hours", #beginner, "Excel");
    let r22 = addResource("Corporate Finance Institute — Free Courses", #course, "CFI", "https://corporatefinanceinstitute.com/resources/free/", "self-paced", #intermediate, "financial modelling");
    let r23 = addResource("Accounting Fundamentals", #course, "Coursera", "https://www.coursera.org/learn/accounting", "4 weeks", #beginner, "accounting");
    let r24 = addResource("Valuation: Measuring and Managing Business Value", #article, "McKinsey", "https://www.mckinsey.com/capabilities/strategy-and-corporate-finance/our-insights/valuation", "30 min", #advanced, "valuation");
    let r25 = addResource("Financial Risk Management — GARP", #course, "Coursera", "https://www.coursera.org/learn/financial-risk-management", "6 weeks", #advanced, "risk analysis");

    addMilestone(3, 1, "Excel Mastery",
      "Master Excel for financial analysis: pivot tables, VLOOKUP, complex formulas, charting, and data visualisation.",
      ["Excel"], "3 weeks",
      ["Build a budget tracker", "Create a dynamic sales dashboard"],
      [r21]);
    addMilestone(3, 2, "Accounting Fundamentals",
      "Understand income statements, balance sheets, cash flow statements, and double-entry bookkeeping.",
      ["accounting"], "4 weeks",
      ["Analyse a public company's 10-K report", "Build a three-statement model"],
      [r23]);
    addMilestone(3, 3, "Financial Modelling",
      "Build DCF, LBO, and merger models in Excel. Learn best practices for model structure and auditing.",
      ["financial modelling", "Excel"], "6 weeks",
      ["Build a DCF model for a public company", "Model a leveraged buyout scenario"],
      [r22]);
    addMilestone(3, 4, "Valuation Methods",
      "Master comparable company analysis, precedent transactions, and intrinsic valuation using real deal data.",
      ["valuation"], "4 weeks",
      ["Value a company using three methods", "Present an investment thesis"],
      [r24]);
    addMilestone(3, 5, "Risk Analysis",
      "Identify, measure, and mitigate financial risk. Learn scenario analysis, Monte Carlo simulation, and VaR.",
      ["risk analysis"], "4 weeks",
      ["Run a sensitivity analysis on a financial model", "Calculate VaR for a portfolio"],
      [r25]);

    // ── Career 4: Healthcare Nurse ───────────────────────────────────────────
    let r26 = addResource("Nursing Fundamentals — Khan Academy", #video, "YouTube", "https://youtube.com/watch?v=8pP1ORQnKTg", "2 hours", #beginner, "patient care");
    let r27 = addResource("Clinical Assessment Skills", #course, "Coursera", "https://www.coursera.org/learn/clinical-assessment", "4 weeks", #beginner, "clinical assessment");
    let r28 = addResource("Pharmacology Basics for Nurses", #video, "YouTube", "https://youtube.com/watch?v=n0D9blY4L5c", "2 hours", #beginner, "medication administration");
    let r29 = addResource("Critical Thinking in Nursing", #article, "Journal of Nursing Education", "https://journals.healio.com/journal/jne", "30 min", #intermediate, "critical thinking");
    let r30 = addResource("NCLEX-RN Prep — Khan Academy", #course, "Khan Academy", "https://www.khanacademy.org/test-prep/nclex-rn", "self-paced", #intermediate, "patient care");

    addMilestone(4, 1, "Patient Care Fundamentals",
      "Learn foundational nursing skills: hygiene, mobility assistance, vital signs, wound care, and patient communication.",
      ["patient care", "empathy"], "6 weeks",
      ["Practice vital signs assessment", "Document patient care simulation"],
      [r26, r30]);
    addMilestone(4, 2, "Clinical Assessment",
      "Perform systematic head-to-toe assessments, interpret lab results, and document clinical findings accurately.",
      ["clinical assessment"], "6 weeks",
      ["Complete head-to-toe assessment checklist", "Interpret a set of lab panels"],
      [r27]);
    addMilestone(4, 3, "Medication Administration",
      "Study pharmacology principles, drug calculations, routes of administration, and medication safety protocols.",
      ["medication administration"], "4 weeks",
      ["Pass medication calculation test", "Create a drug class reference sheet"],
      [r28]);
    addMilestone(4, 4, "Critical Thinking & Clinical Judgement",
      "Apply clinical reasoning frameworks (SBAR, ADPIE) to prioritise care and respond to deteriorating patients.",
      ["critical thinking", "clinical assessment"], "4 weeks",
      ["Solve 10 clinical scenario case studies", "Practice SBAR handoff communications"],
      [r29]);
    addMilestone(4, 5, "NCLEX-RN Exam Preparation",
      "Comprehensive review of all nursing domains. Practice NCLEX-style questions and simulate exam conditions.",
      ["patient care", "critical thinking"], "8 weeks",
      ["Complete 1000 NCLEX practice questions", "Score >70% on 3 full practice exams"],
      [r30]);

    // ── Career 5: Machine Learning Engineer ─────────────────────────────────
    let r31 = addResource("Python Machine Learning — Sebastian Raschka", #course, "Udemy", "https://www.udemy.com/course/python-machine-learning-keras/", "12 hours", #intermediate, "Python");
    let r32 = addResource("Deep Learning Specialisation", #course, "Coursera", "https://www.coursera.org/specializations/deep-learning", "16 weeks", #advanced, "deep learning");
    let r33 = addResource("MLOps Fundamentals — Google Cloud", #course, "Coursera", "https://www.coursera.org/learn/mlops-fundamentals", "6 weeks", #advanced, "MLOps");
    let r34 = addResource("PyTorch in 60 Minutes", #documentation, "PyTorch", "https://pytorch.org/tutorials/beginner/deep_learning_60min_blitz.html", "2 hours", #intermediate, "deep learning");
    let r35 = addResource("Deploying ML Models on AWS SageMaker", #video, "YouTube", "https://youtube.com/watch?v=7rMaUtPpVCg", "2 hours", #advanced, "cloud platforms");
    let r36 = addResource("Feature Engineering for ML", #course, "Coursera", "https://www.coursera.org/learn/feature-engineering", "5 weeks", #intermediate, "machine learning");

    addMilestone(5, 1, "Python & ML Ecosystem",
      "Build fluency in Python for ML: NumPy, Pandas, scikit-learn. Understand the ML workflow end-to-end.",
      ["Python", "machine learning"], "6 weeks",
      ["Train and evaluate 5 ML models", "Build a scikit-learn pipeline"],
      [r31, r36]);
    addMilestone(5, 2, "Deep Learning",
      "Master neural network architectures: CNNs, RNNs, transformers, and attention mechanisms using PyTorch.",
      ["deep learning"], "16 weeks",
      ["Build image classifier from scratch", "Implement transformer attention mechanism"],
      [r32, r34]);
    addMilestone(5, 3, "MLOps & Model Deployment",
      "Learn to package, version, monitor, and deploy models with CI/CD pipelines, Docker, and cloud ML platforms.",
      ["MLOps", "cloud platforms"], "6 weeks",
      ["Deploy a model as REST API on AWS", "Build an automated retraining pipeline"],
      [r33, r35]);
    addMilestone(5, 4, "Cloud ML Platforms",
      "Work with AWS SageMaker, GCP Vertex AI, or Azure ML Studio to manage large-scale training and inference.",
      ["cloud platforms"], "4 weeks",
      ["Run distributed training on SageMaker", "Compare 3 cloud ML platforms"],
      [r35]);

    // ── Career 6: Digital Marketing Manager ─────────────────────────────────
    let r37 = addResource("Google Digital Marketing & E-commerce Certificate", #course, "Coursera", "https://www.coursera.org/professional-certificates/google-digital-marketing-ecommerce", "6 months", #beginner, "analytics");
    let r38 = addResource("SEO Full Course — Ahrefs", #video, "YouTube", "https://youtube.com/watch?v=DvwS7cV9GmQ", "2 hours", #beginner, "SEO");
    let r39 = addResource("Google Ads Masterclass", #course, "Udemy", "https://www.udemy.com/course/google-ads-masterclass/", "10 hours", #intermediate, "paid advertising");
    let r40 = addResource("Copywriting Formulas Cheat Sheet", #article, "HubSpot Blog", "https://blog.hubspot.com/marketing/copywriting-formulas", "15 min", #beginner, "copywriting");
    let r41 = addResource("Content Strategy Fundamentals", #course, "Coursera", "https://www.coursera.org/learn/content-strategy", "4 weeks", #intermediate, "content strategy");

    addMilestone(6, 1, "Digital Marketing Foundations",
      "Learn the marketing funnel, customer journey, channel mix, and key metrics (CTR, CPC, ROAS, LTV).",
      ["analytics"], "3 weeks",
      ["Audit an existing brand's digital presence", "Map a customer journey for a product"],
      [r37]);
    addMilestone(6, 2, "SEO & Content Marketing",
      "Master on-page and off-page SEO, keyword research, content calendars, and measuring organic growth.",
      ["SEO", "content strategy"], "5 weeks",
      ["Optimise 5 blog posts for target keywords", "Build a 3-month content calendar"],
      [r38, r41]);
    addMilestone(6, 3, "Paid Advertising",
      "Run Google Ads and Meta campaigns. Learn bidding strategies, audience targeting, ad creative, and budget management.",
      ["paid advertising"], "4 weeks",
      ["Set up a $100 Google Ads campaign", "A/B test two ad creatives"],
      [r39]);
    addMilestone(6, 4, "Analytics & Data-Driven Decisions",
      "Use Google Analytics 4 and attribution models to measure campaign performance and optimise ROI.",
      ["analytics"], "3 weeks",
      ["Set up GA4 for a website", "Build a marketing performance dashboard"],
      [r37]);
    addMilestone(6, 5, "Copywriting & Brand Voice",
      "Write persuasive copy for landing pages, emails, ads, and social posts. Develop a consistent brand voice.",
      ["copywriting"], "3 weeks",
      ["Write 10 ad variations for one product", "Craft a complete email drip campaign"],
      [r40]);

    // ── Career 7: Biomedical Researcher ──────────────────────────────────────
    let r42 = addResource("Biochemistry — MIT OpenCourseWare", #course, "MIT OCW", "https://ocw.mit.edu/courses/5-07sc-biological-chemistry-i-fall-2013/", "14 weeks", #beginner, "biology");
    let r43 = addResource("Research Methods in Biology", #course, "Coursera", "https://www.coursera.org/learn/research-methods-biology", "5 weeks", #beginner, "lab techniques");
    let r44 = addResource("Statistics for Biology — Khan Academy", #video, "YouTube", "https://youtube.com/watch?v=gGF3a_1CQWI", "2 hours", #beginner, "data analysis");
    let r45 = addResource("How to Write a Scientific Paper", #article, "Nature", "https://www.nature.com/articles/d41586-019-02918-5", "20 min", #intermediate, "scientific writing");
    let r46 = addResource("Bioinformatics for Beginners", #course, "Coursera", "https://www.coursera.org/learn/bioinformatics", "4 weeks", #intermediate, "data analysis");

    addMilestone(7, 1, "Biology & Chemistry Foundations",
      "Master cell biology, molecular biology, organic chemistry, and biochemistry — the core knowledge base for research.",
      ["biology", "chemistry"], "10 weeks",
      ["Summarise 5 foundational research papers", "Create a cell signalling pathway diagram"],
      [r42]);
    addMilestone(7, 2, "Laboratory Techniques",
      "Learn PCR, gel electrophoresis, cell culture, ELISA, Western blotting, and microscopy safety protocols.",
      ["lab techniques"], "8 weeks",
      ["Document a complete lab protocol", "Analyse gel electrophoresis results"],
      [r43]);
    addMilestone(7, 3, "Research Data Analysis",
      "Apply statistical methods to analyse experimental data using R or Python. Interpret results rigorously.",
      ["data analysis"], "5 weeks",
      ["Analyse a public biological dataset", "Run statistical tests on experimental results"],
      [r44, r46]);
    addMilestone(7, 4, "Scientific Writing & Publication",
      "Write clear, structured research papers. Navigate the peer-review process and respond to reviewer comments.",
      ["scientific writing"], "4 weeks",
      ["Write a literature review", "Draft a mock research paper introduction"],
      [r45]);
    addMilestone(7, 5, "Bioinformatics & Computational Methods",
      "Use bioinformatics tools (BLAST, NCBI, sequence alignment) to analyse genomic and proteomic data.",
      ["data analysis", "biology"], "5 weeks",
      ["Perform sequence alignment analysis", "Query NCBI databases for a target gene"],
      [r46]);

    (mid, rid);
  };
};
