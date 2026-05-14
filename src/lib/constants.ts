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
    name: "ExamArena",
    hash: "0x3f2a...9c1d",
    blockNumber: 1337,
    from: "Karan's Brain",
    to: "Production",
    stack: ["Next.js", "FastAPI", "PostgreSQL", "Docker"],
    status: "CONFIRMED",
    confirmations: "1000+",
    description: "Full-stack exam management platform with role-based access for principals, teachers, and students. Real-time exam analytics & auto-grading engine.",
    category: "fullstack",
    codeSnippet: `// ExamArena — Full Stack Platform
const examArena = new Project({
  frontend: "Next.js 15",
  backend: "FastAPI",
  database: "PostgreSQL",
  auth: "JWT + RBAC",
  features: [
    "Real-time exam taking",
    "Auto-grading engine",
    "Analytics dashboard",
    "Role-based access control"
  ],
  result: "🚀 Production"
});`,
    github: "https://github.com/karanagg166/examarena",
  },
  {
    name: "DevPortfolio",
    hash: "0x7b1e...4a2f",
    blockNumber: 1338,
    from: "Creative Vision",
    to: "The Internet",
    stack: ["Next.js", "Three.js", "GSAP", "Framer Motion"],
    status: "CONFIRMED",
    confirmations: "∞",
    description: "This cinematic space-themed portfolio with interactive 3D backgrounds, terminal emulator, and developer-centric UI metaphors.",
    category: "frontend",
    codeSnippet: `// DevPortfolio — This Portfolio
const portfolio = new Project({
  framework: "Next.js 15",
  rendering: "Three.js + R3F",
  animations: "GSAP + Framer Motion",
  theme: "Space + Glassmorphism",
  features: [
    "npm install hero",
    "VSCode about section",
    "htop skills monitor",
    "git log timeline",
    "Interactive terminal"
  ],
  result: "🌌 You're looking at it"
});`,
    live: "https://karanaggarwal.dev",
  },
  {
    name: "CloudSync",
    hash: "0x9d4c...8e3b",
    blockNumber: 1339,
    from: "System Design",
    to: "AWS Cloud",
    stack: ["Python", "FastAPI", "Redis", "AWS S3", "Docker"],
    status: "CONFIRMED",
    confirmations: "500+",
    description: "Distributed file synchronization service with real-time conflict resolution, chunked uploads, and end-to-end encryption.",
    category: "backend",
    codeSnippet: `# CloudSync — Distributed File Sync
class CloudSync:
    def __init__(self):
        self.storage = S3Client()
        self.cache = RedisCache()
        self.resolver = ConflictResolver()
    
    async def sync(self, file: File):
        chunks = self.chunk(file, size="4MB")
        encrypted = [self.encrypt(c) for c in chunks]
        await self.upload_parallel(encrypted)
        self.cache.invalidate(file.key)
        return SyncResult(status="synced ✅")`,
    github: "https://github.com/karanagg166/cloudsync",
  },
  {
    name: "Neural Notes",
    hash: "0x2e8f...1d7a",
    blockNumber: 1340,
    from: "Research",
    to: "App Store",
    stack: ["React Native", "TypeScript", "Supabase", "OpenAI"],
    status: "CONFIRMED",
    confirmations: "200+",
    description: "AI-powered note-taking app that auto-summarizes, tags, and connects your notes into a knowledge graph.",
    category: "fullstack",
    codeSnippet: `// Neural Notes — AI Knowledge Graph
const neuralNotes = new Project({
  mobile: "React Native",
  backend: "Supabase Edge Functions",
  ai: "OpenAI GPT-4",
  storage: "Supabase + pgvector",
  features: [
    "Auto-summarization",
    "Smart tagging",
    "Knowledge graph viz",
    "Semantic search"
  ],
  result: "🧠 Thinking companion"
});`,
  },
  {
    name: "PacketSniffer",
    hash: "0x5c1a...6f9e",
    blockNumber: 1341,
    from: "Curiosity",
    to: "Open Source",
    stack: ["Python", "Scapy", "Tkinter", "SQLite"],
    status: "DEPLOYED",
    confirmations: "300+",
    description: "Network packet analysis tool with real-time visualization, protocol dissection, and anomaly detection.",
    category: "backend",
    codeSnippet: `# PacketSniffer — Network Analysis
class PacketSniffer:
    def __init__(self, interface="eth0"):
        self.interface = interface
        self.db = SQLiteDB("packets.db")
        self.analyzer = ProtocolAnalyzer()
    
    def capture(self, count=100):
        packets = sniff(iface=self.interface, count=count)
        for pkt in packets:
            analysis = self.analyzer.dissect(pkt)
            self.db.store(analysis)
            if analysis.is_anomaly:
                self.alert(analysis)`,
    github: "https://github.com/karanagg166/packetsniffer",
  },
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
