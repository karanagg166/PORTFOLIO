export const navItems = [
  { name: "About", link: "#about" },
  { name: "Projects", link: "#projects" },
  { name: "TechStack", link: "#tech" },
  { name: "Experience", link: "#experience" },
  { name: "PhotoWall", link: "#photowall" },
  { name: "GitHub PRs", link: "#github-prs" },
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
    description: "Codeforces Expert (1602 - Top 5% globally, 700+ solved). LeetCode Knight (1916 - Top 3% globally, 850+ solved). CodeChef 3-Star (1624).",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "",
    spareImg: "",
    link: "https://leetcode.com/karanagg166",
    linkText: "LeetCode Profile",
    link2: "https://codeforces.com/profile/karanagg166",
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
      "/images/projects/examarena/1.png",
      "/images/projects/examarena/2.png",
      "/images/projects/examarena/3.png",
    ],
    iconLists: ["/nextjs.svg", "/re.svg", "/flask.svg", "/docker.png", "/github.png"],
    link: "https://github.com/karanagg166/Exam-Arena",
    color: "text-blue-200"
  },
  {
    id: 2,
    title: "Quick Clinic — Real-Time Healthcare & Consultation Portal",
    des: "Patient module supporting doctor search by specialization/availability. Doctor dashboard for schedules. Real-time chat via Socket.io (<2s response time) and analytics dashboard.",
    images: [
      "/images/projects/quick-clinic/1.png",
      "/images/projects/quick-clinic/2.png",
      "/images/projects/quick-clinic/3.png",
    ],
    iconLists: ["/nextjs.svg", "/re.svg", "/Typescript.png", "/socketio.png", "/docker.png"],
    link: "https://github.com/karanagg166/Quick-Clinic",
    color: "text-green-200"
  },
  {
    id: 3,
    title: "LogiSync — Full-Stack Inventory & Logistics Platform",
    des: "Full-stack inventory and logistics platform using React, Next.js, and FastAPI powering 5+ real-time analytics dashboards. Socket.IO live sync, Razorpay payments, and Google Maps API fee calculation.",
    images: [
      "/images/projects/logisync/1.png",
      "/images/projects/logisync/2.png",
      "/images/projects/logisync/3.png",
    ],
    iconLists: ["/re.svg", "/nextjs.svg", "/flask.svg", "/socketio.png", "/docker.png"],
    link: "https://github.com/karanagg166/LogiSync",
    color: "text-red-200"
  },
  {
    id: 4,
    title: "Shop Sizzle — E-Commerce Browsing & Order Tracking System",
    des: "Product browsing and filtering system with category-based search. Secured 100% user sessions with JWT authentication and bcrypt hashing, featuring real-time order tracking.",
    images: [
      "/images/projects/shopsizzle/1.png",
      "/images/projects/shopsizzle/2.png",
      "/images/projects/shopsizzle/3.png",
    ],
    iconLists: ["/re.svg", "/nojde.png", "/Express1.png", "/Mongod.png", "/Tailwindcs.png"],
    link: "https://github.com/karanagg166/Shop-Sizzle",
    color: "text-purple-200"
  },
];

export const workExperience = [
  {
    id: 1,
    title: "Software Engineer Intern – Full Stack",
    org: "Akatsuki AI Technologies (Remote)",
    desc: "• <b>LogiSync Logistics Platform:</b> Built a full-stack inventory & logistics platform using React, Next.js, and FastAPI with 5+ real-time analytics dashboards.<br/>• <b>CI/CD Automation:</b> Configured GitHub Actions CI/CD pipeline to automate linting, testing, and Docker builds, cutting manual deployment by ~40%.<br/>• <b>Real-time Sync & Payments:</b> Enabled live WebSocket data sync via Socket.IO across 5+ dashboards and integrated Razorpay for payments across 4 core workflows.<br/>• <b>Database & Caching:</b> Engineered PostgreSQL architecture with Redis caching cutting query response time by ~30%.",
    className: "md:col-span-2",
    thumbnail: "/exp1.svg",
    date: "Feb 2026 – Mar 2026",
    techImages: ["/React.png", "/nextjs.png", "/flask.svg", "/docker.png", "/github.png"]
  },
  {
    id: 2,
    title: "Full Stack & DevOps Lead — Exam-Arena",
    org: "PDPM IIITDM Jabalpur",
    desc: "• Established proctored exam flow auto-flagging 100% of fullscreen-exit and tab-switch violations with auto-submit.<br/>• Automated CI/CD GitHub Actions workflow to build/push Docker images and run test suite on every commit.<br/>• Architected teacher dashboard with 5+ configurable parameters and evaluation analytics across 3 result views.",
    className: "md:col-span-2",
    thumbnail: "/exp4.svg",
    date: "Mar 2026",
    techImages: ["/nextjs.png", "/Typescript.png", "/docker.png", "/github.png"]
  },
  {
    id: 3,
    title: "Full Stack Developer — Quick Clinic",
    org: "PDPM IIITDM Jabalpur",
    desc: "• Developed patient module for doctor search (book, cancel, reschedule) with real-time updates.<br/>• Implemented secure real-time chat using Socket.io bringing consultation response time under 2 seconds.<br/>• Designed analytics dashboard tracking earnings, appointment history, and leave records.",
    className: "md:col-span-2",
    thumbnail: "/exp3.svg",
    date: "Aug 2025",
    techImages: ["/React.png", "/Typescript.png", "/socketio.png", "/docker.png"]
  },
  {
    id: 4,
    title: "Full Stack Developer — Shop Sizzle",
    org: "Independent Project",
    desc: "• Crafted product browsing and filtering system with category-based search.<br/>• Secured 100% of user sessions with JWT authentication and bcrypt hashing.<br/>• Streamlined checkout workflow with real-time order tracking.",
    className: "md:col-span-2",
    thumbnail: "/exp2.svg",
    date: "Feb 2023",
    techImages: ["/React.png", "/Express1.png", "/Mongod.png"]
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
