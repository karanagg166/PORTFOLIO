import React from 'react';
import type { Project, Skill, GitCommit, VSCodeFile, GitHubWrapped } from '@/types';

// ── Personal Info ──────────────────────────────────────────
export const PERSONAL_INFO = {
  name: "Karan Aggarwal",
  role: "Software Engineer",
  github: "karanagg166",
  email: "karanagg166@gmail.com",
  linkedin: "karanagg166",
  bio: "I'm a Software Engineer who fell in love with building things. From crafting pixel-perfect UIs to architecting scalable backends, I live for the thrill of turning complex problems into elegant solutions.",
  npmPackages: [
    { name: "problem-solving", version: "∞" },
    { name: "clean-code", version: "latest" },
    { name: "react", version: "expert" },
    { name: "python", version: "advanced" },
    { name: "typescript", version: "pro" },
    { name: "coffee-addiction", version: "critical" },
  ],
};

// ── Projects ───────────────────────────────────────────────
export const PROJECTS: Project[] = [
  {
    name: "Docstribe AI",
    hash: "0x1a2b...3c4d",
    blockNumber: 1337,
    from: "Clinical Research",
    to: "Healthcare",
    stack: ["FastAPI", "Uvicorn", "Pydantic", "SQLModel", "PostgreSQL"],
    status: "DEPLOYED",
    confirmations: "100+",
    description: "Clinical triage dashboard that transforms raw OPD patient JSON into actionable doctor insights in under 30 seconds using a hybrid LLM + deterministic engine pipeline.",
    category: "fullstack",
    codeSnippet: `// Docstribe AI — Triage Pipeline
@app.post("/triage")
async def analyze_patient(patient: PatientData):
    llm_insights = await cohere_service.analyze(patient)
    risk_score = risk_engine.calculate(patient.labs)
    variances = variance_detector.find(patient.history)
    
    return TriageResult(
        risk=risk_score,
        variances=variances,
        insights=llm_insights
    )`,
    github: "https://github.com/karanagg166/docstribe-ai",
    live: "https://docstribe-ai.vercel.app",
    image: "/images/projects/docstribe-ai.png"
  },
  {
    name: "Wishify",
    hash: "0x4d5e...6f7g",
    blockNumber: 1338,
    from: "Creative Vision",
    to: "Social Media",
    stack: ["Next.js", "Prisma", "Neon", "Fabric.js", "Cloudinary"],
    status: "DEPLOYED",
    confirmations: "500+",
    description: "Modern greeting card creation platform with real-time canvas editing via Fabric.js. Features Google OAuth, live previews, and one-click social sharing.",
    category: "fullstack",
    codeSnippet: `// Wishify — Canvas Editing
const addTextOverlay = (canvas, text) => {
  const textObj = new fabric.IText(text, {
    fontFamily: 'Inter',
    fontSize: 48,
    fill: '#FFFFFF',
    shadow: new fabric.Shadow({
      color: 'rgba(0,0,0,0.5)',
      blur: 10
    })
  });
  canvas.add(textObj);
  canvas.centerObject(textObj);
};`,
    github: "https://github.com/karanagg166/wishify",
    live: "https://wishify.vercel.app",
    image: "/images/projects/wishify.png"
  },
  {
    name: "Book Recommender",
    hash: "0x8h9i...0j1k",
    blockNumber: 1339,
    from: "Machine Learning",
    to: "Readers",
    stack: ["FastAPI", "Pandas", "Scikit-Learn", "Seaborn", "NLTK"],
    status: "DEPLOYED",
    confirmations: "200+",
    description: "ML-powered book recommendation system using TF-IDF vectorization and cosine similarity. Instantly recommends books based on user-input genres.",
    category: "fullstack",
    codeSnippet: `# Book Recommender — ML Engine
def get_recommendations(title: str, cosine_sim=cosine_sim):
    idx = indices[title]
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:11]
    book_indices = [i[0] for i in sim_scores]
    return books['title'].iloc[book_indices]`,
    github: "https://github.com/karanagg166/Book-Recommender",
    live: "https://book-recommender.vercel.app",
    image: "/images/projects/book-recommender.png"
  },
  {
    name: "PennySaver",
    hash: "0x2l3m...4n5o",
    blockNumber: 1340,
    from: "Personal Finance",
    to: "Savings",
    stack: ["React", "Node.js", "Express", "MongoDB"],
    status: "DEPLOYED",
    confirmations: "150+",
    description: "Personal expense management system with income/expense tracking, category-based analytics, and budget visualization.",
    category: "fullstack",
    codeSnippet: `// PennySaver — Expense Analytics
const getMonthlyStats = async (userId) => {
  return await Transaction.aggregate([
    { $match: { user: userId } },
    { $group: {
        _id: { $month: "$date" },
        totalExpenses: { 
          $sum: { $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0] } 
        },
        totalIncome: { 
          $sum: { $cond: [{ $eq: ["$type", "income"] }, "$amount", 0] } 
        }
    }}
  ]);
};`,
    github: "https://github.com/karanagg166/PennySaver",
    live: "https://pennysaver-rho.vercel.app",
    image: "/images/projects/pennysaver.png"
  },
  {
    name: "ExamArena",
    hash: "0x6p7q...8r9s",
    blockNumber: 1341,
    from: "Education",
    to: "1000+ Students",
    stack: ["Next.js", "Clerk", "Radix UI", "React Hook Form"],
    status: "DEPLOYED",
    confirmations: "1000+",
    description: "Full-stack exam management platform with role-based access for principals, teachers, and students. Real-time exam analytics & auto-grading engine.",
    category: "fullstack",
    codeSnippet: `// ExamArena — Auto Grading
export async function gradeSubmission(submissionId: string) {
  const submission = await db.submission.findUnique({
    where: { id: submissionId },
    include: { answers: true, exam: { include: { questions: true } } }
  });
  
  let score = 0;
  submission.answers.forEach(ans => {
    const q = submission.exam.questions.find(q => q.id === ans.questionId);
    if (q.correctOption === ans.selectedOption) score += q.points;
  });
  
  return await db.submission.update({
    where: { id: submissionId },
    data: { score, graded: true }
  });
}`,
    github: "https://github.com/karanagg166/ExamArena",
    live: "https://examarena.vercel.app",
    image: "/images/projects/examarena.png"
  },
  {
    name: "Quick Clinic",
    hash: "0x0t1u...2v3w",
    blockNumber: 1342,
    from: "Healthcare Tech",
    to: "Patients",
    stack: ["Next.js", "Prisma", "PostgreSQL", "Socket.IO", "Redis"],
    status: "DEPLOYED",
    confirmations: "300+",
    description: "Full-stack healthcare management system with role-based portals for patients, doctors, and admins. Features real-time chat via Socket.IO.",
    category: "fullstack",
    codeSnippet: `// Quick Clinic — Real-time Consultation
io.on("connection", (socket) => {
  socket.on("join_consultation", (roomId) => {
    socket.join(roomId);
  });
  
  socket.on("send_message", async (data) => {
    const msg = await db.message.create({ data });
    io.to(data.roomId).emit("receive_message", msg);
  });
});`,
    github: "https://github.com/karanagg166/Quick-Clinic",
    live: "https://quick-clinic.vercel.app",
    image: "/images/projects/quick-clinic.png"
  },
  {
    name: "Leetcode Bot",
    hash: "0x4x5y...6z7a",
    blockNumber: 1343,
    from: "Competitive Coding",
    to: "Daily Practice",
    stack: ["Next.js", "Prisma", "TypeScript"],
    status: "DEPLOYED",
    confirmations: "800+",
    description: "Automated LeetCode problem tracker and practice bot. Helps users track their problem-solving progress and get daily challenges.",
    category: "fullstack",
    codeSnippet: `// Leetcode Bot — Progress Tracking
export async function updateProgress(userId: string, problemId: string) {
  const solved = await db.solvedProblem.create({
    data: {
      userId,
      problemId,
      solvedAt: new Date()
    }
  });
  
  await db.userStats.update({
    where: { userId },
    data: { totalSolved: { increment: 1 } }
  });
  
  return solved;
}`,
    github: "https://github.com/karanagg166/leetcode-bot",
    live: "https://leetcode-bot.vercel.app",
    image: "/images/projects/leetcode-bot.png"
  },
  {
    name: "ShopSizzle",
    hash: "0x8b9c...0d1e",
    blockNumber: 1344,
    from: "E-Commerce",
    to: "Shoppers",
    stack: ["Next.js", "Prisma", "Tailwind CSS"],
    status: "DEPLOYED",
    confirmations: "400+",
    description: "Modern e-commerce platform with product listings, cart management, and checkout flow. Built with Next.js App Router and Prisma ORM.",
    category: "fullstack",
    codeSnippet: `// ShopSizzle — Cart Management
export const addToCart = async (productId: string, quantity: number) => {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");
  
  return await db.cartItem.upsert({
    where: { userId_productId: { userId: session.user.id, productId } },
    update: { quantity: { increment: quantity } },
    create: { userId: session.user.id, productId, quantity }
  });
};`,
    github: "https://github.com/karanagg166/ShopSizzle",
    live: "https://shopsizzle.vercel.app",
    image: "/images/projects/shopsizzle.png"
  },
  {
    name: "Portfolio",
    hash: "0x7b1e...4a2f",
    blockNumber: 1345,
    from: "Creative Vision",
    to: "The Internet",
    stack: ["Next.js", "Three.js", "GSAP", "React Spring"],
    status: "DEPLOYED",
    confirmations: "∞",
    description: "This cinematic space-themed portfolio with interactive 3D backgrounds, terminal emulator, and developer-centric UI metaphors.",
    category: "frontend",
    codeSnippet: `// DevPortfolio — 3D Rendering
export function StarField() {
  const ref = useRef<THREE.Points>(null);
  
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });
  
  return (
    <points ref={ref}>
      <bufferGeometry attach="geometry" {...particles} />
      <pointsMaterial attach="material" color="#ffffff" size={0.02} />
    </points>
  );
}`,
    github: "https://github.com/karanagg166/PORTFOLIO",
    live: "https://portfolio-kappa-bay-76.vercel.app",
    image: "/images/projects/portfolio.png"
  },
  {
    name: "Stellar Stocks",
    hash: "0x2f3g...4h5i",
    blockNumber: 1346,
    from: "Financial Data",
    to: "Investors",
    stack: ["FastAPI", "SQLModel", "Pandas", "yfinance", "Plotly"],
    status: "DEPLOYED",
    confirmations: "600+",
    description: "Financial data intelligence dashboard with automated stock data pipeline. Scrapes OHLCV data, calculates metrics, and provides interactive charts.",
    category: "fullstack",
    codeSnippet: `# Stellar Stocks — Data Pipeline
@app.get("/api/stocks/{ticker}/metrics")
async def get_metrics(ticker: str):
    data = yf.download(ticker, period="1y")
    df = pd.DataFrame(data)
    
    # Calculate 7-day Moving Average
    df['MA7'] = df['Close'].rolling(window=7).mean()
    
    # Calculate Volatility Score
    df['Volatility'] = df['Close'].pct_change().rolling(21).std() * np.sqrt(252)
    
    return {"ticker": ticker, "metrics": df.tail(1).to_dict('records')[0]}`,
    github: "https://github.com/karanagg166/stellar-stocks",
    live: "https://stellar-stocks.vercel.app",
    image: "/images/projects/stellar-stocks.png"
  }
];

// ── Skills ─────────────────────────────────────────────────
export const SKILLS: Skill[] = [
  // Frontend
  { name: "React", proficiency: 92, category: "frontend", pid: "001", status: "RUNNING" },
  { name: "Next.js", proficiency: 88, category: "frontend", pid: "002", status: "RUNNING" },
  { name: "TypeScript", proficiency: 87, category: "frontend", pid: "003", status: "RUNNING" },
  { name: "Tailwind CSS", proficiency: 90, category: "frontend", pid: "004", status: "RUNNING" },
  { name: "Three.js", proficiency: 65, category: "frontend", pid: "005", status: "RUNNING" },
  { name: "Framer Motion", proficiency: 78, category: "frontend", pid: "006", status: "RUNNING" },
  // Backend
  { name: "Python", proficiency: 89, category: "backend", pid: "010", status: "RUNNING" },
  { name: "FastAPI", proficiency: 85, category: "backend", pid: "011", status: "RUNNING" },
  { name: "Node.js", proficiency: 82, category: "backend", pid: "012", status: "RUNNING" },
  { name: "PostgreSQL", proficiency: 80, category: "backend", pid: "013", status: "RUNNING" },
  { name: "Redis", proficiency: 70, category: "backend", pid: "014", status: "SLEEPING" },
  // DevOps
  { name: "Docker", proficiency: 82, category: "devops", pid: "020", status: "RUNNING" },
  { name: "Git", proficiency: 90, category: "devops", pid: "021", status: "RUNNING" },
  { name: "CI/CD", proficiency: 75, category: "devops", pid: "022", status: "RUNNING" },
  { name: "AWS", proficiency: 68, category: "devops", pid: "023", status: "SLEEPING" },
  // Tools & Languages
  { name: "JavaScript", proficiency: 93, category: "languages", pid: "030", status: "RUNNING" },
  { name: "C++", proficiency: 72, category: "languages", pid: "031", status: "SLEEPING" },
  { name: "SQL", proficiency: 80, category: "languages", pid: "032", status: "RUNNING" },
];

// ── Experience ─────────────────────────────────────────────
export const EXPERIENCE: GitCommit[] = [
  {
    hash: "a3f2c1d",
    branch: "(HEAD -> career, origin/future)",
    author: "Karan Aggarwal <karanagg166@gmail.com>",
    date: "2024 — Present",
    message: "feat: building full-stack products & open-source tools",
    body: "Designing and shipping end-to-end applications using Next.js, FastAPI, and PostgreSQL.\nArchitecting microservices with Docker and CI/CD pipelines.\nContributing to open-source projects and mentoring junior developers.\nFocusing on performance optimization and developer experience.",
    filesChanged: 47,
    insertions: 3200,
    deletions: 890,
  },
  {
    hash: "b2e1f9a",
    author: "Karan Aggarwal <karanagg166@gmail.com>",
    date: "2023 — 2024",
    message: "feat: built ExamArena platform from scratch",
    body: "Full-stack exam management system serving 1000+ students.\nImplemented role-based access (principal/teacher/student) with JWT auth.\nBuilt real-time exam engine with auto-grading and analytics.\nDeveloped CI/CD pipeline reducing deploy time by 60%.",
    filesChanged: 89,
    insertions: 8400,
    deletions: 120,
  },
  {
    hash: "c1d8e7f",
    author: "Karan Aggarwal <karanagg166@gmail.com>",
    date: "2022 — 2023",
    message: "feat: leveled up with real-world projects",
    body: "Built multiple full-stack projects including CloudSync and PacketSniffer.\nLearned system design, distributed systems, and cloud architecture.\nParticipated in hackathons and coding competitions.\nContributed to open-source Python and JavaScript ecosystems.",
    filesChanged: 150,
    insertions: 12000,
    deletions: 3400,
  },
  {
    hash: "d0a9b3e",
    author: "Karan Aggarwal <karanagg166@gmail.com>",
    date: "2021 — 2022",
    message: "init: started B.Tech Computer Science",
    body: "Began journey into Computer Science and engineering.\nLearned data structures, algorithms, and object-oriented programming.\nBuilt first projects: calculator apps, portfolio websites, CLI tools.\nDiscovered passion for web development and system programming.",
    filesChanged: 50,
    insertions: 5000,
    deletions: 0,
  },
];

// ── VSCode Files ───────────────────────────────────────────
export const VSCODE_FILES: VSCodeFile[] = [
  {
    name: "bio.md",
    icon: "📄",
    language: "markdown",
    content: `# Karan Aggarwal

## Software Engineer | Full Stack Developer

I'm a Software Engineer who fell in love with building things.
From crafting pixel-perfect UIs to architecting scalable backends,
I live for the thrill of turning complex problems into
elegant solutions.

### What I Do
- 🎯 Full Stack Development (Next.js + FastAPI)
- 🏗️ System Design & Architecture
- 🐳 DevOps & Containerization
- 🌐 Open Source Contributions

### Philosophy
> "Write code that your future self would thank you for."

I believe in clean code, thorough testing, and continuous learning.
Every project is an opportunity to push boundaries and create
something meaningful.`,
  },
  {
    name: "skills.json",
    icon: "📄",
    language: "json",
    content: `{
  "frontend": {
    "frameworks": ["React", "Next.js", "React Native"],
    "styling": ["Tailwind CSS", "Framer Motion", "Three.js"],
    "languages": ["TypeScript", "JavaScript"]
  },
  "backend": {
    "frameworks": ["FastAPI", "Node.js", "Express"],
    "databases": ["PostgreSQL", "Redis", "MongoDB"],
    "languages": ["Python", "JavaScript", "SQL"]
  },
  "devops": {
    "containerization": ["Docker", "Docker Compose"],
    "cicd": ["GitHub Actions", "GitLab CI"],
    "cloud": ["AWS (S3, EC2, Lambda)", "Vercel"]
  },
  "currentlyLearning": ["Rust", "Kubernetes", "System Design"]
}`,
  },
  {
    name: "experience.ts",
    icon: "📄",
    language: "typescript",
    content: `interface Role {
  title: string;
  period: string;
  highlights: string[];
}

export const career: Role[] = [
  {
    title: "Full Stack Developer",
    period: "2024 — Present",
    highlights: [
      "Built ExamArena: 1000+ users, 60% faster deploys",
      "Architected microservices with Docker & CI/CD",
      "Open source contributor & mentor",
      "Next.js + FastAPI + PostgreSQL stack"
    ]
  },
  {
    title: "Student & Builder",
    period: "2021 — 2024",
    highlights: [
      "B.Tech Computer Science",
      "Hackathon participant & winner",
      "Built 10+ projects from scratch",
      "Learned system design & cloud architecture"
    ]
  }
];

export const stats = {
  projectsShipped: 10,
  linesOfCode: "50K+",
  githubContributions: 847,
  coffeeConsumed: "∞"
};`,
  },
  {
    name: "contact.env",
    icon: "📄",
    language: "bash",
    content: `# ── Contact Configuration ──────────────
EMAIL=karanagg166@gmail.com
GITHUB=github.com/karanagg166
LINKEDIN=linkedin.com/in/karanagg166

# ── Availability ──────────────────────
STATUS=available
RESPONSE_TIME=within_24h
OPEN_TO=freelance,fulltime,collaboration

# ── Preferred Stack ───────────────────
FRONTEND=Next.js,React,TypeScript
BACKEND=FastAPI,Node.js,PostgreSQL
DEVOPS=Docker,GitHub_Actions,AWS`,
  },
];

// ── Social Links ───────────────────────────────────────────
export const SOCIAL_LINKS = {
  github: "https://github.com/karanagg166",
  linkedin: "https://linkedin.com/in/karanagg166",
  twitter: "https://twitter.com/karanagg166",
  email: "mailto:karanagg166@gmail.com",
};

// ── GitHub Wrapped ─────────────────────────────────────────
export const GITHUB_WRAPPED: GitHubWrapped = {
  year: 2024,
  topLanguage: { name: "TypeScript", percentage: 47 },
  longestStreak: 23,
  favoriteCommitTime: "2AM 🌙",
  totalCommits: 847,
  topProject: "ExamArena",
  personalityType: "fixes bug, creates 3 more",
  totalPRs: 134,
  linesWritten: "50K+",
};

// ── Terminal Commands ──────────────────────────────────────
export const COMMANDS: Record<string, string | (() => string)> = {
  welcome: "Welcome to Karan's interactive terminal! 🚀\nType 'help' to see available commands.\n\nTip: Try 'hire me' for a surprise! 🎉",
  whoami: `╔════════════════════════════════════════╗
║  Karan Aggarwal                        ║
║  Software Engineer | Full Stack Dev    ║
║                                        ║
║  Passionate about building things      ║
║  that make a difference.               ║
║                                        ║
║  🎯 React + Next.js + FastAPI          ║
║  🌍 Open Source Contributor            ║
║  ☕ Powered by caffeine                ║
╚════════════════════════════════════════╝`,
  projects: () => PROJECTS.map(p => `  📦 ${p.name.padEnd(16)} [${p.status}]  ${p.stack.slice(0, 3).join(', ')}`).join('\n'),
  skills: () => SKILLS
    .filter(s => s.category === 'frontend' || s.category === 'backend')
    .sort((a, b) => b.proficiency - a.proficiency)
    .slice(0, 10)
    .map(s => `  ${s.name.padEnd(15)} ${'█'.repeat(Math.floor(s.proficiency / 5))}${'░'.repeat(20 - Math.floor(s.proficiency / 5))} ${s.proficiency}%`)
    .join('\n'),
  contact: `📧 Email:    karanagg166@gmail.com
🐙 GitHub:   github.com/karanagg166
💼 LinkedIn: linkedin.com/in/karanagg166
🐦 Twitter:  twitter.com/karanagg166

Status: 🟢 Available for opportunities`,
  "hire me": "__CONFETTI__",
  help: `Available commands:
  whoami     — About me
  projects   — My projects
  skills     — Technical skills
  contact    — Get in touch
  hire me    — 🎉 Surprise!
  ls         — List directory
  cat        — Read files
  neofetch   — System info
  sudo       — Nice try
  clear      — Clear terminal`,
  ls: "📁 about/  📁 projects/  📁 skills/  📄 resume.pdf  📄 contact.env  📄 README.md",
  "cat resume.pdf": "📥 Download my resume at: /resume/karan-aggarwal-resume.pdf",
  "cat README.md": `# Karan Aggarwal 🚀

Full Stack Developer who turns caffeine into code.

## Quick Start
\`\`\`bash
$ npm install karan-aggarwal
$ npm run build-something-awesome
\`\`\`

## Stats
- 🏗️ 10+ projects shipped
- ⭐ 50K+ lines written
- ☕ ∞ cups of coffee consumed`,
  neofetch: `  ██╗  ██╗ █████╗
  ██║ ██╔╝██╔══██╗    karan@dev
  █████╔╝ ███████║    ──────────────
  ██╔═██╗ ██╔══██║    OS: macOS (Developer Edition)
  ██║  ██╗██║  ██║    Shell: zsh + oh-my-zsh
  ╚═╝  ╚═╝╚═╝  ╚═╝    Editor: VS Code
                        Languages: TS, Python, C++
                        Stack: Next.js + FastAPI
                        Uptime: since 2021
                        Coffee: ████████████ 100%`,
  pwd: "/home/karan/portfolio",
  date: () => new Date().toLocaleString(),
  echo: "Usage: echo <message>",
  "rm -rf /": "🚫 Nice try. Permission denied. This incident will be reported.",
  sudo: "🔒 karan is not in the sudoers file. This incident will be reported.",
  "git status": `On branch main
Your branch is up to date with 'origin/main'.

Changes to be committed:
  new file:   portfolio-v3/
  modified:   skills/
  modified:   experience/

Untracked files:
  ideas/
  future-projects/`,
  exit: "🚪 You can checkout any time you like, but you can never leave... 🎸",
};
