"use client";

import { useEffect, useState } from "react";
import Particle from "@/components/Particle";
import { GSAPFadeIn } from "@/components/animations/GSAPAnimations";
import { ScrollReveal, AutoAnimateList } from "@/components/animations/ScrollAnimations";
import { Button, Badge, Card, CardContent } from "@/components/ui/shadcn";
import { SpringCard } from "@/components/animations/SpringAnimations";
import { Github, ExternalLink, Star, GitFork } from "lucide-react";
import { projectImages } from "./projectImages";

// GitHub repo interface
interface GitHubRepo {
    name: string;
    description: string | null;
    language: string;
    stargazers_count: number;
    forks_count: number;
    topics: string[];
    html_url: string;
    homepage: string | null;
}

// Project mapping to GitHub repos
const projectMapping: Record<string, { image: string; ghRepo: string; tags: string[] }> = {
    "tenkisense": {
        image: projectImages.tenkiSense,
        ghRepo: "tenkisense",
        tags: ["ai", "fullstack"],
    },
    "wallet-track": {
        image: projectImages.walletTrack,
        ghRepo: "wallet-track",
        tags: ["fullstack", "finance"],
    },
    "book-recommender": {
        image: projectImages.bookRecommender,
        ghRepo: "Book-recommender",
        tags: ["ai", "ml"],
    },
    "quick-clinic": {
        image: projectImages.quickClinic,
        ghRepo: "Quick-Clinic",
        tags: ["fullstack", "healthcare"],
    },
    "shop-sizzle": {
        image: projectImages.shopSizzle,
        ghRepo: "shop-sizzle",
        tags: ["fullstack", "ecommerce"],
    },
    "fusion-college": {
        image: projectImages.fusionCollege,
        ghRepo: "fusion-college",
        tags: ["frontend", "education"],
    },
    "portfolio": {
        image: projectImages.portfolio,
        ghRepo: "PORTFOLIO",
        tags: ["frontend", "portfolio"],
    },
};

export default function Projects() {
    const [filter, setFilter] = useState("all");
    const [techStacks, setTechStacks] = useState<string[]>([]);
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch projects and tech stacks from GitHub
    useEffect(() => {
        const fetchGitHubData = async () => {
            try {
                const response = await fetch("https://api.github.com/users/karanagg166/repos?per_page=100&sort=updated");
                const repos: GitHubRepo[] = await response.json();

                // Extract unique languages and topics
                const languages = new Set<string>();
                repos.forEach(repo => {
                    if (repo.language) languages.add(repo.language);
                    repo.topics?.forEach(topic => languages.add(topic));
                });
                setTechStacks(Array.from(languages).slice(0, 15));

                // Map repos to projects with GitHub descriptions
                const mappedProjects = Object.entries(projectMapping).map(([key, config]) => {
                    const repo = repos.find(r => r.name.toLowerCase() === config.ghRepo.toLowerCase());
                    return {
                        title: repo?.name || key.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
                        description: repo?.description || `A ${config.tags.join(" & ")} project built with modern technologies.`,
                        imgPath: config.image,
                        ghLink: repo?.html_url || `https://github.com/karanagg166/${config.ghRepo}`,
                        demoLink: repo?.homepage || "#",
                        tags: config.tags,
                        tech: repo?.topics?.slice(0, 3) || [repo?.language || "JavaScript"],
                        stars: repo?.stargazers_count || 0,
                        forks: repo?.forks_count || 0,
                    };
                });

                setProjects(mappedProjects);
            } catch (error) {
                console.error("Failed to fetch GitHub data:", error);
                // Fallback projects
                setProjects([
                    {
                        title: "TenkiSense",
                        description: "An intelligent weather chatbot powered by AI with real-time forecasts, natural language processing, and personalized insights based on user location and preferences.",
                        imgPath: projectImages.tenkiSense,
                        ghLink: "https://github.com/karanagg166/tenkisense",
                        demoLink: "https://tenki-sense.vercel.app/",
                        tags: ["ai", "fullstack"],
                        tech: ["React", "OpenAI", "Node.js"],
                        stars: 0,
                        forks: 0,
                    },
                    {
                        title: "Wallet-Track",
                        description: "A comprehensive financial management application featuring expense tracking, budget planning, data visualization with charts, expense categorization, and financial reporting dashboard.",
                        imgPath: projectImages.walletTrack,
                        ghLink: "https://github.com/karanagg166/wallet-track",
                        demoLink: "#",
                        tags: ["fullstack", "finance"],
                        tech: ["Next.js", "PostgreSQL", "Chart.js"],
                        stars: 0,
                        forks: 0,
                    },
                    {
                        title: "Book-Recommender",
                        description: "An intelligent book recommendation system using machine learning algorithms, content-based filtering, collaborative filtering, and hybrid techniques for personalized suggestions.",
                        imgPath: projectImages.bookRecommender,
                        ghLink: "https://github.com/karanagg166/Book-recommender",
                        demoLink: "#",
                        tags: ["ai", "ml"],
                        tech: ["Python", "Scikit-learn", "Flask"],
                        stars: 0,
                        forks: 0,
                    },
                    {
                        title: "QuickClinic",
                        description: "A full-stack healthcare management platform with patient registration, doctor profiles, appointment scheduling, medical records, prescription tracking, and real-time notifications.",
                        imgPath: projectImages.quickClinic,
                        ghLink: "https://github.com/karanagg166/Quick-Clinic",
                        demoLink: "#",
                        tags: ["fullstack", "healthcare"],
                        tech: ["Next.js", "Prisma", "Socket.io"],
                        stars: 0,
                        forks: 0,
                    },
                    {
                        title: "Shop Sizzle",
                        description: "A full-featured e-commerce platform with user authentication, product catalog, shopping cart, Stripe payment integration, order management, and admin dashboard.",
                        imgPath: projectImages.shopSizzle,
                        ghLink: "https://github.com/karanagg166/shop-sizzle",
                        demoLink: "#",
                        tags: ["fullstack", "ecommerce"],
                        tech: ["React", "Stripe", "MongoDB"],
                        stars: 0,
                        forks: 0,
                    },
                    {
                        title: "Fusion College",
                        description: "A modern, responsive college website with dynamic content management, student portal, event management, course catalog, faculty profiles, and interactive campus maps.",
                        imgPath: projectImages.fusionCollege,
                        ghLink: "https://github.com/karanagg166/fusion-college",
                        demoLink: "#",
                        tags: ["frontend", "education"],
                        tech: ["HTML", "CSS", "JavaScript"],
                        stars: 0,
                        forks: 0,
                    },
                ]);
                setTechStacks(["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Python"]);
            } finally {
                setLoading(false);
            }
        };

        fetchGitHubData();
    }, []);

    const filteredProjects = filter === "all"
        ? projects
        : projects.filter(p => p.tags?.includes(filter));

    const filterOptions = [
        { label: "All", value: "all", count: projects.length },
        { label: "Full Stack", value: "fullstack", count: projects.filter(p => p.tags?.includes("fullstack")).length },
        { label: "AI/ML", value: "ai", count: projects.filter(p => p.tags?.includes("ai")).length },
        { label: "Frontend", value: "frontend", count: projects.filter(p => p.tags?.includes("frontend")).length },
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
                            Here are a few projects I&apos;ve worked on recently. Descriptions fetched live from GitHub.
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
                {loading ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="animate-pulse">
                                <div className="bg-gray-800 rounded-lg h-48 mb-4" />
                                <div className="h-6 bg-gray-700 rounded mb-2" />
                                <div className="h-4 bg-gray-700 rounded w-3/4" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <AutoAnimateList className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project) => (
                            <ScrollReveal key={project.title} threshold={0.1}>
                                <Card variant="glow" className="h-full overflow-hidden group">
                                    <div className="relative overflow-hidden">
                                        <img
                                            src={project.imgPath}
                                            alt={project.title}
                                            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        {/* Stats overlay */}
                                        <div className="absolute top-2 right-2 flex gap-2">
                                            {project.stars > 0 && (
                                                <span className="flex items-center gap-1 bg-black/60 px-2 py-1 rounded-full text-xs">
                                                    <Star size={12} className="text-yellow-400" /> {project.stars}
                                                </span>
                                            )}
                                            {project.forks > 0 && (
                                                <span className="flex items-center gap-1 bg-black/60 px-2 py-1 rounded-full text-xs">
                                                    <GitFork size={12} className="text-cyan-400" /> {project.forks}
                                                </span>
                                            )}
                                        </div>
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
                                        <div className="relative">
                                            <p className="text-gray-400 text-sm mb-4 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                                                {project.description}
                                            </p>
                                            <span className="text-cyan-500 text-xs opacity-60 group-hover:opacity-0 transition-opacity">
                                                Hover to read more...
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tech?.map((t: string) => (
                                                <Badge key={t} variant="outline" className="text-xs">
                                                    {t}
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </ScrollReveal>
                        ))}
                    </AutoAnimateList>
                )}

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
