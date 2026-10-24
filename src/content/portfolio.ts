export interface Profile {
  name: string;
  role: string;
  tagline: string;
  about: string[];
  email: string;
  github: string;
  linkedin: string;
  location: string;
}

export interface SkillGroup {
  label: string;
  skills: string[];
}

export interface Project {
  id: string;
  title: string;
  summary: string;
  tech: string[];
  github: string;
  /** optional verified live demo link, present only where data explicitly provides one */
  demo?: string;
  /** link from project data to the internship-backed work, for optional context */
  sourceNote?: string;
  /** problem statement, sourced from the project's documentation */
  problem?: string;
  /** how it was approached, sourced from the project's documentation */
  approach?: string[];
  /** documented evaluation or outcome, kept faithful to the source */
  evaluation?: string[];
}

export interface ExperienceItem {
  org: string;
  role: string;
  period?: string;
  location?: string;
  points: string[];
  certificateUrl?: string;
  certificateNote?: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  result: string;
}

export interface Achievement {
  title: string;
  detail: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  verifyUrl?: string;
  /** certificate document served from /assets/certs (copies of Data/Certificates) */
  certificateUrl?: string;
}

export const certifications: Certification[] = [
  {
    name: "Artificial Intelligence Fundamentals",
    issuer: "IBM SkillsBuild",
    date: "Apr 2026",
    certificateUrl: "/assets/certs/IBM.pdf",
  },
  {
    name: "Agentic AI Certified Foundations Associate",
    issuer: "Oracle",
    date: "Aug 2026",
    credentialId: "330554684AAI26OFA",
    certificateUrl: "/assets/certs/Oracle.pdf",
  },
  {
    name: "GenAI Powered Data Analytics Job Simulation",
    issuer: "Tata Group / Forage",
    date: "Mar 2026 – May 2026",
    certificateUrl: "/assets/certs/Tata.pdf",
  },
];

export const profile: Profile = {
  name: "Vansh Mittal",
  role: "ML / AI Engineer",
  tagline: "Agentic AI · RAG Pipelines · NLP",
  about: [
    "Final-year Computer Science (Data Science) undergraduate specializing in AI agent engineering, applied machine learning, and production-grade LLM architectures.",
    "I design multi-agent systems, RAG pipelines, and automated workflows with human-in-the-loop guardrails, using LangGraph, LangChain, n8n, Python, JavaScript, and SQL, backed by deployments with FastAPI, Streamlit, PostgreSQL, and Docker.",
    "I build systems so that an LLM never mutates data or invents an answer without verification: grounded retrieval, approval gates, edge-case testing, and audit trails.",
  ],
  email: "mittalvansh21@gmail.com",
  github: "https://github.com/vanshhh18",
  linkedin: "https://linkedin.com/in/vanshmittal18",
  location: "Noida, India",
};

export const skillGroups: SkillGroup[] = [
  {
    label: "Languages & Data",
    skills: ["Python", "JavaScript", "SQL", "NumPy", "Pandas", "scikit-learn"],
  },
  {
    label: "Machine Learning & NLP",
    skills: ["PyTorch", "TensorFlow/Keras", "YOLOv8", "TF-IDF", "LinearSVC"],
  },
  {
    label: "LLMs & Agentic Systems",
    skills: [
      "LangGraph",
      "LangChain",
      "Groq (LLaMA)",
      "RAG (FAISS / BM25 / ChromaDB)",
      "n8n",
    ],
  },
  {
    label: "Backend & Developer Tools",
    skills: ["FastAPI", "Streamlit", "PostgreSQL", "Docker", "Git", "React"],
  },
];

/* Featured first. Order grounded in the documented technical depth and
   evidence of engineering decisions in each project's readme. */
export const projects: Project[] = [
  {
    id: "recoverai",
    title: "RecoverAI",
    summary:
      "Razorpay hackathon (Track 3, AI Revenue Recovery): an agent that diagnoses why a payment failed, routes each cause through an adaptive recovery policy, and acts through real test-mode APIs with confidence gates, retry caps, and a full audit trail, measured against a blind-retry baseline on a held-out test set.",
    tech: [
      "scikit-learn",
      "Groq LLM (Hinglish agent)",
      "Razorpay API",
      "Streamlit",
    ],
    github: "https://github.com/vanshhh18/RecoverAI",
    demo:
      "https://recoverai-ojdefuk4vqkqodljgazlxj.streamlit.app/",
    sourceNote: "Razorpay Hackathon, Track 3: AI Revenue Recovery",
    problem:
      "Most systems retry failed payments blindly, treating all failures the same. An expired card, a bank outage, and a hesitant customer each call for a different recovery move; uniform retries leave recoverable revenue on the table.",
    approach: [
      "Diagnose: a Decision Tree classifier on nine per-payment features predicts one of six root causes (insufficient funds, issuer down, mandate/card expired, timeout, hesitation).",
      "Decide: an adaptive explore/exploit policy maps each cause to the best-performing channel, adjusting to live outcomes, for example it switched from payment links to voice calls for expired mandates after observing results.",
      "Act: recovery actions run through Razorpay test-mode APIs with guardrails (60% confidence gate → human review, retry cap of 3, voice-call caps) and a Hinglish conversational agent scoped to two safe actions.",
      "Verify: every decision, outcome, and Razorpay order ID is logged to an audit trail; nothing is a black box.",
    ],
    evaluation: [
      "Measured on a held-out test set of 180 synthetic failed payments: 61.0% recovery rate vs 40.4% for naive blind retry, about Rs 2,71,800 more recovered with fewer attempts (174 actions vs 540 retries).",
      "Classifier accuracy 88.9% on the held-out set. The author documents that inputs are synthetic and outcomes simulated, with probability estimates stated explicitly in code, with no production claims.",
    ],
  },
  {
    id: "opscopilot",
    title: "OpsCopilot",
    summary:
      "An LLM-powered operations agent (LangGraph ReAct, LLaMA 3.3-70B) where every write action is staged as a pending request and applied only after explicit human approval. Tested against a 12-tool query suite plus adversarial edge cases, including approval-bypass attempts.",
    tech: ["LangGraph", "LLaMA 3.3-70B", "FastAPI", "SQLAlchemy", "Pydantic"],
    github: "https://github.com/vanshhh18/OpsCopilot",
    problem:
      "LLM agents that can mutate real business data are dangerous: memberships, bookings, and user records could be silently altered by a hallucinated or misunderstood instruction.",
    approach: [
      "A LangGraph ReAct agent separates read operations (safe, instant) from write operations (staged as pending actions with an ID).",
      "Every write generates a pending request; approve_action/reject_action commits or discards it, so an LLM can never directly mutate the database.",
      "Pydantic input validation rejects invalid requests (negative durations, nonexistent users) before the database layer.",
    ],
    evaluation: [
      "Author-run test suite: 100% intent-to-tool accuracy (12/12 queries), ~1.5s average latency, 80% safe-handling rate on adversarial edge cases including approval-bypass attempts.",
      "Known issue documented honestly: update_phone format validation gap, with the fix described in the repo.",
    ],
  },
  {
    id: "hybrid-rag",
    title: "Agentic RAG for Technical Documentation",
    summary:
      "Hybrid retrieval (BM25 + FAISS) feeding a LangGraph agentic workflow over large-scale technical documentation, grounding every answer in retrieved context instead of model memory.",
    tech: ["LangChain", "LangGraph", "BM25", "FAISS", "HuggingFace", "Groq"],
    github: "https://github.com/vanshhh18/hybrid-rag-system",
    problem:
      "Answering questions over large-scale technical documentation requires both exact keyword matches and semantic understanding: pure vector search misses precise terms, pure BM25 misses paraphrases.",
    approach: [
      "Chunk technical documents, then index with BM25 (lexical) and FAISS (semantic) in parallel.",
      "A hybrid retriever fuses both result sets and passes grounded context into a LangGraph agentic workflow that reasons over multiple documents.",
      "Built while supporting an SDR system processing defence-relevant records; the open-source repo intentionally excludes confidential datasets and organization-specific assets, per its own disclaimer.",
    ],
  },
  {
    id: "multi-agent-helpdesk",
    title: "NLP Agentic Helpdesk",
    summary:
      "A support system that classifies tickets (department + priority) with TF-IDF/LinearSVC, routes them through a LangGraph department workflow, and answers from a ChromaDB knowledge base with a Groq LLM.",
    tech: ["LinearSVC", "LangGraph", "ChromaDB", "Groq", "FastAPI"],
    github: "https://github.com/vanshhh18/multi-agent-helpdesk",
    problem:
      "Support tickets arrive unstructured; manually classifying department and priority, then writing responses from a knowledge base, is slow and inconsistent.",
    approach: [
      "A TF-IDF + LinearSVC multi-output classifier assigns department (10 categories) and priority (high/medium/low).",
      "A LangGraph workflow routes the ticket to the matched department agent.",
      "A RAG pipeline (ChromaDB + Sentence Transformers) retrieves knowledge-base documents; Groq LLM writes the response; a confirmation email is sent with ticket details.",
    ],
  },
  {
    id: "lead-gen-agent",
    title: "Lead-Generation Agent",
    summary:
      "An n8n pipeline that scrapes businesses via Overpass API, scores each lead with an LLM, enriches contact info through conditional website scraping, and writes qualified leads to Google Sheets.",
    tech: ["n8n", "LLM scoring", "Overpass API", "Google Sheets"],
    github: "https://github.com/vanshhh18/Lead-Generation-Agent",
    problem:
      "Manually searching directories, copy-pasting contact info, and qualifying leads one by one doesn't scale for sales or agency outreach.",
    approach: [
      "An n8n workflow takes a location + distance, calls the Overpass API (OpenStreetMap) to fetch all businesses in that radius.",
      "Each business is scored 0–10 by an LLM agent; output is parsed into key-value fields and a threshold filter skips weak leads.",
      "Conditional logic enriches contact info: website-only leads get scraped by an HTTP node that extracts email/phone from the page.",
      "Qualified leads land in Google Sheets with name, address, phone, email, website, score, and category.",
    ],
  },
  {
    id: "ppe-detection",
    title: "PPE Compliance Detector",
    summary:
      "YOLOv8m fine-tuned for PPE detection with a class-imbalance-aware design decision: minority 'missing-item' classes were dropped in favor of a geometric, rule-based compliance engine over person-region overlaps.",
    tech: ["YOLOv8m", "Python", "Streamlit"],
    github: "https://github.com/vanshhh18/ppe-compliance-detector",
    problem:
      "Missing PPE (helmets, vests, gloves, boots, goggles) is a leading cause of preventable injuries on construction sites, and manual monitoring doesn't scale.",
    approach: [
      "Fine-tuned YOLOv8m on a construction-site PPE dataset via transfer learning (Google Colab T4, class-imbalance-aware augmentation).",
      "Diagnosed per-class mAP and found 'missing-item' minority classes had as few as 4–56 training instances, so they were removed from training rather than learned from unreliable samples.",
      "Compliance is inferred geometrically instead: each detected person's bounding box is split into head/torso/hands/feet regions and checked against overlapping PPE detections; a failed overlap is a flagged violation.",
      "Interactive Streamlit demo for image/video detection plus per-worker compliance reports.",
    ],
    evaluation: [
      "Author-reported per-class mAP@0.5 on the project dataset: helmet 0.79, gloves 0.77, vest 0.82, boots 0.79, goggles 0.76, person 0.89 (overall 0.80).",
      "Known limitations documented in the repo: fixed-region logic assumes an upright pose and underrepresented classes have lower precision.",
    ],
  },
  {
    id: "code-rag",
    title: "Codebase Q&A RAG",
    summary:
      "Upload code files, ask questions in natural language, and get answers with explicit file-and-chunk sources, using Groq inference over HuggingFace embeddings stored in FAISS.",
    tech: ["LangChain", "FAISS", "Groq (Llama 3.1)", "HuggingFace", "Streamlit"],
    github: "https://github.com/vanshhh18/hallucination-detector-rag",
    problem:
      "New developers and reviewers need quick answers about a codebase (what a function does, how files connect) without reading every file or waiting on a senior dev.",
    approach: [
      "Upload code files (or a ZIP archive). Uploads are split into chunks, embedded with HuggingFace MiniLM, and stored in FAISS.",
      "A user question is embedded, the most similar code chunks are retrieved, and Groq-hosted Llama 3.1 answers grounded in those chunks.",
      "Every answer shows its sources: the file and chunk referenced, so you know exactly where to verify.",
    ],
  },
  {
    id: "movie-recommender",
    title: "Movie Recommender System",
    summary:
      "Content-based recommendation over 40,000+ movie titles using TF-IDF vectorization and cosine similarity, returning top-10 matches in under 200ms per query.",
    tech: ["Python", "scikit-learn", "pandas", "TF-IDF"],
    github: "https://github.com/vanshhh18/movie-recommender-system",
    problem:
      "Build a content-based recommender that works cold-start, with no user history or ratings, only movie metadata (plot, genres, cast, crew, keywords).",
    approach: [
      "Engineer a combined text profile per movie from genres, cast, crew, keywords, and overview fields.",
      "TF-IDF vectorization turns profiles into vectors; cosine similarity ranks the closest titles.",
      "Works cold-start: the recommendation depends only on the input movie, making it useful in new-start scenarios with no history.",
    ],
  },
  {
    id: "fashion-recommender",
    title: "Fashion Recommender System",
    summary:
      "Deep-learning content-based fashion recommendations: ResNet embeddings with Euclidean-distance similarity over a product image dataset.",
    tech: ["TensorFlow", "Keras", "ResNet50", "Python"],
    github: "https://github.com/vanshhh18/Fashion-recommender-system",
    problem:
      "Shoppers browsing an image-based catalog want visually similar items, and text metadata alone can't capture look-alike garments.",
    approach: [
      "Extract deep image features with a pre-trained ResNet (top classification layer removed) followed by global max pooling and L2 normalization.",
      "Store normalized embedding vectors (embeddings.pkl) over the image dataset.",
      "Measure Euclidean distance between a selected item and all embeddings; the smallest distances become the top-K similar items.",
    ],
  },
  {
    id: "foodify",
    title: "Foodify (FoodRescue)",
    summary:
      "A food-donation platform where a vision-capable LLM detects food items from images and auto-fills donation listings, with the AI output treated as reviewable suggestions rather than a source of truth.",
    tech: ["Vision-capable LLM", "React", "Node.js", "MongoDB"],
    github: "https://github.com/vanshhh18/Foodify",
    problem:
      "Donating surplus food usually means filling out a long listing form manually, friction that leaves edible food going to waste.",
    approach: [
      "A user captures or uploads a food photo; a vision-capable LLM identifies what is shown.",
      "Detected information auto-fills the donation listing; the user reviews and edits before submitting (AI output is treated as an assistant, not a source of truth).",
      "Full-stack flow covers image upload, AI processing, JWT authentication, and donation listings stored in a database.",
    ],
  },
];

export const experience: ExperienceItem[] = [
  {
    org: "DEAL, DRDO",
    role: "AI Intern (Platform Software Group)",
    period: "Jun 2026 – Jul 2026",
    location: "Dehradun, India",
    points: [
      "Built a production RAG pipeline for an SDR system, processing 10,000–100,000 defence-relevant records with intelligent retrieval and analysis.",
      "Engineered agentic workflows using LangGraph to orchestrate multi-step decision-making, improving retrieval accuracy and cutting manual intervention in signal data handling.",
    ],
    certificateUrl: "/assets/drdocertificate.jpg",
    certificateNote: "Certificate of completion (issued by DEAL, DRDO)",
  },
];

export const education: EducationItem[] = [
  {
    institution: "ABES Engineering College, Ghaziabad",
    degree: "B.Tech CSE (Data Science)",
    period: "2023 – 2027",
    result: "CGPA 7.32/10 (Sem 1–6)",
  },
  {
    institution: "Higher Secondary (PCM)",
    degree: "Class XII",
    period: "2022 – 2023",
    result: "88%",
  },
];

export const experienceExtra: ExperienceItem = {
  org: "AirDawg Labs",
  role: "AI Systems Evaluation Intern",
  period: "Jul 2026 – Oct 2026",
  points: [
    "Authored 19 tasks for Terminal-Bench 2.1 and 3, an LLM agent benchmark (8–9 accepted after review), each with a verifiable test harness targeting reasoning gaps in CLI and Linux problem-solving.",
    "Designed correctness and efficiency rubrics, revised tasks from reviewer feedback, and stress-tested them against frontier models (GPT 5.6, Opus 5) to check difficulty and surface failure modes.",
  ],
};

export const achievements: Achievement[] = [
  {
    title: "Top 6 finalist, AI Automation Competition",
    detail:
      "Selected from 100+ participants in an AI Automation competition hosted by UpNex Solutions. Designed and built an automated n8n lead-generation agent during the final round and won a $50 cash prize.",
  },
];

/** IDs of nav targets for the homepage map and the fallback navigation. */
export const portfolioSections = [
  { id: "top", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Certifications" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];
