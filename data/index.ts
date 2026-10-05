export const navItems = [
  { name: "About", link: "#about" },
  { name: "Projects", link: "#projects" },
  { name: "TechStack", link: "#tech" },
  { name: "Experience", link: "#experience" },
  { name: "Coding Stats", link: "#coding-stats" },
  { name: "Contact", link: "#contact" },
];

export const gridItems = [
  {
    id: 1,
    title: "Software Engineer Intern at <span class='text-orange-300'>Akatsuki AI Technologies</span>",
    description: "Built LogiSync, configured CI/CD with GitHub Actions, implemented real-time Socket.IO sync, Razorpay payments, and Redis caching. Based in Faridabad, Haryana.",
    className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
    imgClassName: "w-full h-full object-cover",
    titleClassName: "justify-end",
    img: "/grid.svg",
    spareImg: "",
    link: "https://linkedin.com/in/karan-aggarwal-a13427276",
    linkText: "LinkedIn Profile"
  },
  {
    id: 2,
    title: "Competitive Programmer: <span class='text-emerald-300'>Codeforces Expert & LeetCode Knight</span>",
    description: "Codeforces Expert (1606 - Top 5% globally, 800+ solved). LeetCode Knight (1935 - Top 3.7% globally, 910+ solved). CodeChef 3-Star (1624). CSES 110+ Solved.",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "",
    spareImg: "",
    link: "https://leetcode.com/u/aggarwalkaran241",
    linkText: "LeetCode Profile",
    link2: "https://codeforces.com/profile/KaranCipherKnight",
    linkText2: "Codeforces Profile"
  },
  {
    id: 3,
    title: "My <span class='text-violet-400'>tech stack</span>",
    description: "Constantly expanding skills",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-center",
    img: "",
    spareImg: "",
  },
  {
    id: 4,
    title: "B.Tech CSE Student at <span class='text-sky-400'>PDPM IIITDM Jabalpur</span>",
    description: "Nov 2022 – Present. Originating from Faridabad, Haryana, India. Coursework: OS, DBMS, Networks, DSA, Software Engineering.",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "w-full h-full",
    titleClassName: " flex flex-col justify-start",
    img: "/grid.svg",
    spareImg: "/b4.svg",
    link: "https://linkedin.com/in/karan-aggarwal-a13427276",
    linkText: "LinkedIn Profile"
  },
  {
    id: 5,
    title: "Full-Stack & Systems Developer: <span class='text-rose-400'>React, Next.js, FastAPI & Docker</span>",
    description: "Architecting high-performance web applications, WebSocket real-time systems, and automated CI/CD pipelines.",
    className: "md:col-span-3 md:row-span-2",
    imgClassName: "absolute right-0 bottom-0 md:w-96 w-60 ",
    titleClassName: "justify-center md:justify-start lg:justify-center",
    img: "/b5.svg",
    spareImg: "/grid.svg",
    link: "https://github.com/karanagg166",
    linkText: "GitHub Profile"
  },
  {
    id: 6,
    title: "Do you want to start a <span class='text-fuchsia-400'>project</span> together?",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-center md:max-w-full max-w-60 text-center",
    img: "",
    spareImg: "",
  },
];

export const projects = [
  {
    id: 1,
    title: "Exam-Arena — Proctored Online Examination System",
    des: "Proctored exam flow auto-flagging 100% of fullscreen-exit and tab-switch violations with auto-submit. Automated CI/CD GitHub Actions workflow for Docker images, teacher dashboard, and RBAC.",
    images: [
      "/images/projects/examarena/01-overview.png",
      "/images/projects/examarena/02-main-feature.png",
      "/images/projects/examarena/03-secondary-feature.png",
    ],
    iconLists: ["/nextjs.svg", "/re.svg", "/flask.svg", "/docker.png", "/github.png"],
    link: "https://github.com/karanagg166/ExamArena",
    color: "text-blue-200"
  },
  {
    id: 2,
    title: "Quick Clinic — Real-Time Healthcare & Consultation Portal",
    des: "Patient module supporting doctor search by specialization/availability. Doctor dashboard for schedules. Real-time chat via Socket.io (<2s response time) and analytics dashboard.",
    images: [
      "/images/projects/quick-clinic/01-overview.png",
      "/images/projects/quick-clinic/02-main-feature.png",
      "/images/projects/quick-clinic/03-secondary-feature.png",
    ],
    iconLists: ["/nextjs.svg", "/re.svg", "/Typescript.png", "/socketio.png", "/docker.png"],
    link: "https://github.com/karanagg166/Quick-Clinic",
    color: "text-green-200"
  },
  {
    id: 3,
    title: "Search Sphere — Hybrid RAG & Semantic Document Search",
    des: "Enterprise semantic document intelligence engine combining dense sentence embeddings and sparse BM25 retrieval via Reciprocal Rank Fusion (RRF) with Cohere reranking.",
    images: [
      "/images/projects/search-sphere/01-overview.png",
      "/images/projects/search-sphere/02-main-feature.png",
      "/images/projects/search-sphere/03-secondary-feature.png",
    ],
    iconLists: ["/nextjs.svg", "/Typescript.png", "/flask.svg", "/docker.png", "/github.png"],
    link: "https://github.com/karanagg166/search-sphere",
    color: "text-sky-200"
  },
  {
    id: 4,
    title: "Shop Sizzle — E-Commerce Browsing & Order Tracking System",
    des: "Product browsing and filtering system with category-based search. Secured 100% user sessions with JWT authentication and bcrypt hashing, featuring real-time order tracking.",
    images: [
      "/images/projects/shopsizzle/01-overview.png",
      "/images/projects/shopsizzle/02-main-feature.png",
      "/images/projects/shopsizzle/03-secondary-feature.png",
    ],
    iconLists: ["/re.svg", "/nojde.png", "/Express1.png", "/Mongod.png", "/Tailwindcs.png"],
    link: "https://github.com/karanagg166/ShopSizzle",
    color: "text-purple-200"
  },
  {
    id: 5,
    title: "Stellar Stocks — Real-Time Stock Market Analytics & Portfolio",
    des: "Financial analytics platform providing live candlestick charting, technical indicators, portfolio tracking, and market sector performance heatmaps.",
    images: [
      "/images/projects/stellar-stocks/01-overview.png",
      "/images/projects/stellar-stocks/02-main-feature.png",
      "/images/projects/stellar-stocks/03-secondary-feature.png",
    ],
    iconLists: ["/nextjs.svg", "/re.svg", "/Typescript.png", "/Tailwindcs.png", "/github.png"],
    link: "https://github.com/karanagg166/stellar-stocks",
    color: "text-amber-200"
  },
  {
    id: 6,
    title: "Wallet Track — Personal Financial Ledger & Spending Analytics",
    des: "Full-featured financial tracking suite with categorized income/expense transaction ledgers, cash flow summaries, and monthly spending analytics.",
    images: [
      "/images/projects/wallet-track/01-overview.png",
      "/images/projects/wallet-track/02-main-feature.png",
      "/images/projects/wallet-track/03-secondary-feature.png",
    ],
    iconLists: ["/re.svg", "/Typescript.png", "/Tailwindcs.png", "/Mongod.png", "/github.png"],
    link: "https://github.com/karanagg166/Wallet-Track",
    color: "text-emerald-200"
  },
  {
    id: 7,
    title: "URL Shortener — Dynamic Link Management & Click Analytics",
    des: "High-performance link redirection engine with customizable slugs, expiration dates, real-time click volume tracking, and geographic analytics.",
    images: [
      "/images/projects/url-shortener/01-overview.png",
      "/images/projects/url-shortener/02-main-feature.png",
      "/images/projects/url-shortener/03-secondary-feature.png",
    ],
    iconLists: ["/nextjs.svg", "/Typescript.png", "/docker.png", "/github.png"],
    link: "https://github.com/karanagg166/url-shortner",
    color: "text-indigo-200"
  },
  {
    id: 8,
    title: "PennySaver — Smart Budgeting & Savings Goal Tracker",
    des: "Personal budgeting assistant helping users establish savings targets, monitor spending velocities, and track category-by-category financial health.",
    images: [
      "/images/projects/pennysaver/01-overview.png",
      "/images/projects/pennysaver/02-main-feature.png",
      "/images/projects/pennysaver/03-secondary-feature.png",
    ],
    iconLists: ["/re.svg", "/Typescript.png", "/Tailwindcs.png", "/github.png"],
    link: "https://github.com/karanagg166/PennySaver",
    color: "text-teal-200"
  },
  {
    id: 9,
    title: "Tenkisense — Atmospheric Weather Intelligence & AI Advisor",
    des: "Multilingual weather platform delivering hyper-local atmospheric forecasts paired with an AI advisor for weather-driven activity recommendations.",
    images: [
      "/images/projects/tenkisense/01-overview.png",
      "/images/projects/tenkisense/02-main-feature.png",
      "/images/projects/tenkisense/03-secondary-feature.png",
    ],
    iconLists: ["/nextjs.svg", "/re.svg", "/Typescript.png", "/Tailwindcs.png", "/github.png"],
    link: "https://github.com/karanagg166/tenkisense",
    color: "text-cyan-200"
  },
];

export const workExperience = [
  {
    id: 1,
    title: "Software Engineer",
    org: "Humming Bird Web Solutions",
    desc: "• <b>B2B E-Commerce Platforms:</b> Developed and maintained enterprise B2B e-commerce platforms powered by <b>Magento 2</b>.<br/>• <b>Custom Backend Modules:</b> Engineered and maintained custom <b>Magento 2</b> backend modules, plugins, and core business functionality.<br/>• <b>APIs & Integrations:</b> Built robust integrations and endpoints using <b>GraphQL</b> and REST to connect internal and external systems.<br/>• <b>Hyvä Storefront Compatibility:</b> Developed compatibility solutions and optimizations for modern <b>Hyvä</b>-based Magento storefronts.<br/>• <b>Backend Architecture & Performance:</b> Contributed to backend architecture, debugging, performance improvements, and production-ready e-commerce features.",
    className: "md:col-span-2",
    thumbnail: "/exp3.svg",
    date: "June 2026 – Present",
    techImages: ["/docker.png", "/git.svg", "/Tailwindcs.png"]
  },
  {
    id: 2,
    title: "Desktop Application Developer (Freelance) — Zyro",
    org: "Hyper Devs (Freelance)",
    desc: "• <b>Cross-Platform Desktop Suite:</b> Built <b>Zyro</b> using Electron.js and React supporting macOS, Windows, and Linux for buyer stock, customer, and import management.<br/>• <b>Local-First Database Architecture:</b> Engineered complete offline local database storage directly on the client computer, guaranteeing 100% data security, fast querying, and zero network dependency.<br/>• <b>Excel Data & Stock Management:</b> Enabled buyers to seamlessly import, export, and batch-update product stocks and inventory directly via Excel / CSV spreadsheets.<br/>• <b>Billing & Payments:</b> Integrated automated invoice generation, customer accounts, and automated payment/billing calculation workflows.",
    className: "md:col-span-2",
    thumbnail: "/exp1.svg",
    date: "Apr 2026 – May 2026",
    techImages: ["/React.png", "/Typescript.png", "/Javascript.png", "/nojde.png"]
  },
  {
    id: 3,
    title: "Software Engineer Intern – Full Stack",
    org: "Akatsuki AI Technologies (Remote)",
    desc: "• <b>LogiSync Logistics Platform:</b> Built a full-stack inventory & logistics platform using React, Next.js, and FastAPI with 5+ real-time analytics dashboards.<br/>• <b>CI/CD Automation:</b> Configured GitHub Actions CI/CD pipeline to automate linting, testing, and Docker builds, cutting manual deployment by ~40%.<br/>• <b>Real-time Sync & Payments:</b> Enabled live WebSocket data sync via Socket.IO across 5+ dashboards and integrated Razorpay for payments across 4 core workflows.<br/>• <b>Database & Caching:</b> Engineered PostgreSQL architecture with Redis caching cutting query response time by ~30%.",
    className: "md:col-span-2",
    thumbnail: "/exp4.svg",
    date: "Feb 2026 – Mar 2026",
    techImages: ["/React.png", "/nextjs.png", "/flask.svg", "/docker.png", "/github.png"]
  },
];

export const socialMedia = [
  {
    id: 1,
    img: "/git.svg",
    navigate: "https://github.com/karanagg166"
  },
  {
    id: 2,
    img: "/instagram.jpg",
    navigate: "https://www.instagram.com/karanagg166/"
  },
  {
    id: 3,
    img: "/link.svg",
    navigate: "https://linkedin.com/in/karan-aggarwal-a13427276"
  },
];

export const photowall = [
  { id: 1, img: "/p1.svg" },
  { id: 2, img: "/p2.svg" },
  { id: 3, img: "/p3.svg" },
  { id: 4, img: "/p4.svg" },
  { id: 5, img: "/p5.svg" },
  { id: 6, img: "/p6.svg" },
];

export const stack = [
  "/React.png",
  "/Mongod.png",
  "/Express1.png",
  "/Nest.png",
  "/Typescript.png",
  "/Javascript.png",
  "/Vuejs.png",
  "/Django.png",
  "/Vite.png",
  "/nojde.png",
  "/Tailwindcs.png",
  "/framer.png",
  "/github.png",
  "/socketio.png",
  "/postman.png",
  "/docker.png",
];

export const codingProfiles = [
  {
    id: "codeforces",
    name: "Codeforces",
    handle: "KaranCipherKnight",
    rank: "Expert",
    rankBadge: "Expert",
    rating: 1606,
    maxRating: 1606,
    solved: "800+",
    percentile: "Top 5%",
    link: "https://codeforces.com/profile/KaranCipherKnight",
    color: "#3b82f6",
    gradient: "from-blue-600/20 via-sky-500/10 to-transparent",
    borderColor: "border-blue-500/30 hover:border-blue-400",
    badgeColor: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    glowColor: "rgba(59, 130, 246, 0.25)",
    tag: "Div. 1 / Div. 2 Contests",
    stats: [
      { label: "Rating", value: "1606" },
      { label: "Rank", value: "Expert" },
      { label: "Problems", value: "800+" },
      { label: "Global", value: "Top 5%" },
    ],
  },
  {
    id: "leetcode",
    name: "LeetCode",
    handle: "aggarwalkaran241",
    rank: "Knight",
    rankBadge: "Knight",
    rating: 1935,
    maxRating: 1935,
    solved: "913",
    percentile: "Top 3.7%",
    link: "https://leetcode.com/u/aggarwalkaran241",
    color: "#f59e0b",
    gradient: "from-amber-500/20 via-yellow-500/10 to-transparent",
    borderColor: "border-yellow-500/30 hover:border-yellow-400",
    badgeColor: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    glowColor: "rgba(245, 158, 11, 0.25)",
    tag: "Knight Badge",
    stats: [
      { label: "Contest Rating", value: "1935" },
      { label: "Global Top", value: "Top 3.7%" },
      { label: "Total Solved", value: "913" },
      { label: "Hard Solved", value: "103" },
    ],
    difficultyBreakdown: {
      easy: 214,
      medium: 596,
      hard: 103,
    },
  },
  {
    id: "codechef",
    name: "CodeChef",
    handle: "code_rush03",
    rank: "3★ Star",
    rankBadge: "3★ Division 2",
    rating: 1624,
    maxRating: 1624,
    solved: "200+",
    percentile: "Div 2",
    link: "https://www.codechef.com/users/code_rush03",
    color: "#8b5cf6",
    gradient: "from-purple-600/20 via-indigo-500/10 to-transparent",
    borderColor: "border-purple-500/30 hover:border-purple-400",
    badgeColor: "bg-purple-500/15 text-purple-400 border-purple-500/30",
    glowColor: "rgba(139, 92, 246, 0.25)",
    tag: "3-Star Rated",
    stats: [
      { label: "Rating", value: "1624" },
      { label: "Stars", value: "3★" },
      { label: "Division", value: "Div 2" },
      { label: "Global Rank", value: "#408" },
    ],
  },
  {
    id: "cses",
    name: "CSES Problem Set",
    handle: "KARANAGGARWAL",
    userId: "225098",
    rank: "Algorithm Solver",
    rankBadge: "Algorithms",
    rating: null,
    maxRating: null,
    solved: "110+",
    submissions: "354",
    percentile: "Core DSA",
    link: "https://cses.fi/user/225098",
    color: "#10b981",
    gradient: "from-emerald-600/20 via-teal-500/10 to-transparent",
    borderColor: "border-emerald-500/30 hover:border-emerald-400",
    badgeColor: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    glowColor: "rgba(16, 185, 129, 0.25)",
    tag: "Advanced DSA",
    stats: [
      { label: "Solved", value: "110+" },
      { label: "Submissions", value: "354" },
      { label: "Language", value: "100% C++" },
      { label: "User ID", value: "225098" },
    ],
  },
  {
    id: "gfg",
    name: "GeeksforGeeks",
    handle: "aggarwalkaran241",
    rank: "Institute Rank #39",
    rankBadge: "Campus Rank #39",
    rating: 891,
    maxRating: 891,
    solved: "258+",
    percentile: "105 Days Streak",
    link: "https://www.geeksforgeeks.org/profile/aggarwalkaran241",
    color: "#2f8d46",
    gradient: "from-green-600/20 via-emerald-500/10 to-transparent",
    borderColor: "border-green-500/30 hover:border-green-400",
    badgeColor: "bg-green-500/15 text-green-400 border-green-500/30",
    glowColor: "rgba(47, 141, 70, 0.25)",
    tag: "Coding Score 891",
    stats: [
      { label: "Score", value: "891" },
      { label: "Solved", value: "258+" },
      { label: "POTD Streak", value: "105 Days" },
      { label: "Campus Rank", value: "#39" },
    ],
  },
];

export const githubOverview = {
  username: "karanagg166",
  profileUrl: "https://github.com/karanagg166",
  publicRepos: 37,
  keyLanguages: ["TypeScript", "Next.js", "Python", "C++", "Docker"],
};


