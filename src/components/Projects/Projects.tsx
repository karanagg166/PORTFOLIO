"use client";

import { useEffect, useState } from "react";
import Particle from "@/components/Particle";
import { GSAPFadeIn } from "@/components/animations/GSAPAnimations";
import { ScrollReveal, AutoAnimateList } from "@/components/animations/ScrollAnimations";
import { Button, Badge, Card, CardContent } from "@/components/ui/shadcn";
import { SpringCard } from "@/components/animations/SpringAnimations";
import { Github, ExternalLink, Star, GitFork } from "lucide-react";
import { projectImages } from "./projectImages";
import TiltCard from "@/components/ui/TiltCard";

// Detailed project data with rich descriptions
const projectsData = [
    {
        title: "TenkiSense",
        shortDescription: "AI-powered weather chatbot with real-time forecasts and natural language processing.",
        fullDescription: "TenkiSense is an intelligent weather assistant that combines OpenAI's GPT with real-time weather APIs to deliver personalized weather insights. Features include natural language queries (\"Will it rain tomorrow?\"), location-based forecasts, weather alerts, 7-day predictions, and conversational AI that remembers context. Built with Next.js 14, TypeScript, TailwindCSS, and the OpenWeatherMap API. The chatbot leverages streaming responses for a seamless user experience.",
        imgPath: projectImages.tenkiSense,
        ghLink: "https://github.com/karanagg166/tenkisense",
        demoLink: "https://tenkisense.vercel.app",
        tags: ["ai", "fullstack"],
        tech: ["Next.js", "OpenAI", "TypeScript", "TailwindCSS"],
    },
    {
        title: "Quick-Clinic",
        shortDescription: "Full-stack healthcare platform with patient management, appointments, and real-time notifications.",
        fullDescription: "Quick-Clinic is a comprehensive healthcare management system designed to streamline patient-doctor interactions. Features include multi-role authentication (Patient, Doctor, Admin), appointment scheduling with calendar integration, medical records management, prescription tracking, real-time notifications via Socket.io, AI-powered medical chatbot for preliminary consultations, video consultations, and a responsive admin dashboard with audit logs. Built with Next.js 14, Prisma ORM, PostgreSQL, Socket.io, and NextAuth.",
        imgPath: projectImages.quickClinic,
        ghLink: "https://github.com/karanagg166/Quick-Clinic",
        demoLink: "https://quick-clinic-nine.vercel.app",
        tags: ["fullstack", "healthcare"],
        tech: ["Next.js", "Prisma", "PostgreSQL", "Socket.io", "NextAuth"],
    },
    {
        title: "Wallet-Track",
        shortDescription: "Personal finance tracker with expense categorization and data visualization.",
        fullDescription: "Wallet-Track is a sophisticated financial management application that helps users take control of their spending. Features include expense tracking with category-based organization, income management, monthly budget planning, interactive charts and graphs for spending analysis, recurring transaction support, CSV/PDF export, multi-currency support, and financial insights dashboard. The app uses Chart.js for beautiful visualizations and stores data securely with PostgreSQL and Prisma.",
        imgPath: projectImages.walletTrack,
        ghLink: "https://github.com/karanagg166/Wallet-Track",
        demoLink: "https://wallet-track-orcin.vercel.app",
        tags: ["fullstack", "finance"],
        tech: ["Next.js", "PostgreSQL", "Chart.js", "Prisma", "TailwindCSS"],
    },
    {
        title: "Book-Recommender",
        shortDescription: "ML-powered book recommendation engine using collaborative and content-based filtering.",
        fullDescription: "Book-Recommender is an intelligent recommendation system that uses machine learning to suggest books based on user preferences. Implements three algorithms: Content-Based Filtering (analyzes book features like genre, author, description), Collaborative Filtering (finds similar users and recommends their favorites), and Hybrid Approach (combines both for best results). Features include search functionality, book details pages, rating system, personalized recommendations, and a clean modern UI. Built with Python, Scikit-learn, Flask backend, and Next.js frontend.",
        imgPath: projectImages.bookRecommender,
        ghLink: "https://github.com/karanagg166/Book-Recommender",
        demoLink: "https://book-recommender-pied.vercel.app",
        tags: ["ai", "ml"],
        tech: ["Python", "Scikit-learn", "Next.js", "Flask"],
    },
    {
        title: "ShopSizzle",
        shortDescription: "Full-featured e-commerce platform with cart, payments, and order management.",
        fullDescription: "ShopSizzle is a complete e-commerce solution featuring user authentication, product catalog with search and filters, shopping cart with persistent storage, wishlist functionality, Stripe payment integration, order tracking, admin dashboard for product management, inventory control, and customer analytics. The platform supports product variants, reviews and ratings, discount codes, and responsive design for mobile shopping. Built with React, Node.js, Express, MongoDB, and Stripe API.",
        imgPath: projectImages.shopSizzle,
        ghLink: "https://github.com/karanagg166/ShopSizzle",
        demoLink: "https://shop-sizzle.vercel.app",
        tags: ["fullstack", "ecommerce"],
        tech: ["React", "Node.js", "MongoDB", "Stripe", "Express"],
    },
    {
        title: "Fusion-College",
        shortDescription: "Modern college ERP system with academic management and student portal.",
        fullDescription: "Fusion-College is a comprehensive Educational Resource Planning system for college administration. Features include student information management, course registration, attendance tracking, grade management, fee payment portal, library management, hostel allocation, placement cell portal, faculty dashboard, timetable scheduling, and announcement system. The platform supports multiple user roles (Student, Faculty, Admin, HOD) with role-based access control. Built as a contribution to the open-source Fusion project.",
        imgPath: projectImages.fusionCollege,
        ghLink: "https://github.com/karanagg166/Fusion-client",
        demoLink: "#",
        tags: ["frontend", "education"],
        tech: ["React", "JavaScript", "TailwindCSS"],
    },
    {
        title: "TaskFlow",
        shortDescription: "Kanban-style project management tool with drag-and-drop task organization.",
        fullDescription: "TaskFlow is a productivity-focused project management application inspired by Trello. Features include drag-and-drop task boards, multiple project workspaces, task assignments and due dates, priority labels, progress tracking, activity logs, team collaboration, and responsive design. The intuitive Kanban interface helps teams visualize workflow and manage projects efficiently. Built with Next.js, TypeScript, and implements smooth animations with Framer Motion.",
        imgPath: projectImages.portfolio,
        ghLink: "https://github.com/karanagg166/TaskFlow",
        demoLink: "https://task-flow-psi.vercel.app",
        tags: ["fullstack"],
        tech: ["Next.js", "TypeScript", "Framer Motion"],
    },
];

export default function Projects() {
    const [filter, setFilter] = useState("all");
    const [techStacks, setTechStacks] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch tech stacks from GitHub
    useEffect(() => {
        const fetchGitHubData = async () => {
            try {
                const response = await fetch("https://api.github.com/users/karanagg166/repos?per_page=100&sort=updated");
                const repos = await response.json();

                const languages = new Set<string>();
                repos.forEach((repo: any) => {
                    if (repo.language) languages.add(repo.language);
                    repo.topics?.forEach((topic: string) => languages.add(topic));
                });
                setTechStacks(Array.from(languages).slice(0, 15));
            } catch (error) {
                setTechStacks(["JavaScript", "TypeScript", "React", "Next.js", "Python", "Node.js"]);
            } finally {
                setLoading(false);
            }
        };
        fetchGitHubData();
    }, []);

    const filteredProjects = filter === "all"
        ? projectsData
        : projectsData.filter(p => p.tags.includes(filter));

    const filterOptions = [
        { label: "All", value: "all", count: projectsData.length },
        { label: "Full Stack", value: "fullstack", count: projectsData.filter(p => p.tags.includes("fullstack")).length },
        { label: "AI/ML", value: "ai", count: projectsData.filter(p => p.tags.includes("ai")).length },
        { label: "Frontend", value: "frontend", count: projectsData.filter(p => p.tags.includes("frontend")).length },
    ];

    return (
        <div className="project-section min-h-screen">
            <Particle />
            <div className="section-container">
                {/* Header */}
                <GSAPFadeIn direction="up">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            My Recent <span className="gradient-text">Works</span>
                        </h1>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Here are a few projects I&apos;ve worked on recently. Hover over cards to see full descriptions!
                        </p>
                    </div>
                </GSAPFadeIn>

                {/* Tech Stacks from GitHub */}
                <ScrollReveal>
                    <div className="mb-16">
                        <h2 className="text-2xl font-bold text-center mb-6">
                            <Github className="inline-block mr-2 mb-1" size={24} />
                            Tech Stack <span className="text-gray-400 text-base">(from GitHub)</span>
                        </h2>
                        <div className="flex flex-wrap justify-center gap-3">
                            {loading ? (
                                <div className="animate-pulse flex gap-3">
                                    {[...Array(8)].map((_, i) => (
                                        <div key={i} className="h-8 w-20 bg-gray-700 rounded-full" />
                                    ))}
                                </div>
                            ) : (
                                techStacks.map((tech, index) => (
                                    <SpringCard key={tech}>
                                        <Badge
                                            variant="default"
                                            className="text-sm py-1.5 px-4 cursor-default"
                                            style={{ animationDelay: `${index * 50}ms` }}
                                        >
                                            {tech}
                                        </Badge>
                                    </SpringCard>
                                ))
                            )}
                        </div>
                    </div>
                </ScrollReveal>

                {/* Filter buttons */}
                <GSAPFadeIn direction="up">
                    <div className="flex flex-wrap justify-center gap-3 mb-12">
                        {filterOptions.map((option) => (
                            <Button
                                key={option.value}
                                variant={filter === option.value ? "default" : "outline"}
                                size="lg"
                                onClick={() => setFilter(option.value)}
                                className="min-w-[120px]"
                            >
                                {option.label}
                                <Badge variant="secondary" className="ml-2">
                                    {option.count}
                                </Badge>
                            </Button>
                        ))}
                    </div>
                </GSAPFadeIn>

                {/* Projects Grid */}
                <AutoAnimateList className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project) => (
                        <ScrollReveal key={project.title} threshold={0.1}>
                            <TiltCard tiltAmount={10} glareOpacity={0.2} scale={1.03}>
                                <Card variant="glow" className="h-full overflow-hidden group">
                                    <div className="relative overflow-hidden">
                                        <img
                                            src={project.imgPath}
                                            alt={project.title}
                                            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 gap-3">
                                            <a
                                                href={project.ghLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 bg-black/50 rounded-full hover:bg-cyan-500/50 transition-colors"
                                            >
                                                <Github size={20} />
                                            </a>
                                            {project.demoLink && project.demoLink !== "#" && (
                                                <a
                                                    href={project.demoLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 bg-black/50 rounded-full hover:bg-cyan-500/50 transition-colors"
                                                >
                                                    <ExternalLink size={20} />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                    <CardContent className="p-6">
                                        <h3 className="text-xl font-bold text-cyan-400 mb-2">{project.title}</h3>
                                        {/* Expandable description - short by default, full on hover */}
                                        <div className="relative min-h-[80px]">
                                            <p className="text-gray-400 text-sm mb-4 line-clamp-2 group-hover:hidden transition-all duration-300">
                                                {project.shortDescription}
                                            </p>
                                            <p className="text-gray-400 text-sm mb-4 hidden group-hover:block transition-all duration-300 max-h-[200px] overflow-y-auto">
                                                {project.fullDescription}
                                            </p>
                                            <span className="text-cyan-500 text-xs opacity-60 group-hover:hidden transition-opacity">
                                                Hover to read more...
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {project.tech.map((t) => (
                                                <Badge key={t} variant="outline" className="text-xs">
                                                    {t}
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TiltCard>
                        </ScrollReveal>
                    ))}
                </AutoAnimateList>

                {/* View More on GitHub */}
                <ScrollReveal>
                    <div className="text-center mt-16">
                        <a
                            href="https://github.com/karanagg166"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button variant="glow" size="xl" className="gap-2">
                                <Github size={20} />
                                View More on GitHub
                            </Button>
                        </a>
                    </div>
                </ScrollReveal>
            </div>
        </div>
    );
}
