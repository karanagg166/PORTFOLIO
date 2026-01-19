"use client";

import { motion } from "framer-motion";
import { CgCPlusPlus } from "react-icons/cg";
import {
    DiJavascript1,
    DiReact,
    DiNodejs,
    DiMongodb,
    DiPython,
    DiGit,
    DiJava,
} from "react-icons/di";
import {
    SiRedis,
    SiFirebase,
    SiNextdotjs,
    SiPostgresql,
    SiTailwindcss,
    SiTypescript,
    SiExpress,
    SiHtml5,
    SiCss3,
    SiBootstrap,
    SiDjango,
    SiFlask,
} from "react-icons/si";

const techStack = [
    { icon: CgCPlusPlus, title: "C++" },
    { icon: SiHtml5, title: "HTML5" },
    { icon: SiCss3, title: "CSS3" },
    { icon: SiTailwindcss, title: "Tailwind CSS" },
    { icon: SiBootstrap, title: "Bootstrap" },
    { icon: DiJavascript1, title: "JavaScript" },
    { icon: DiNodejs, title: "Node.js" },
    { icon: DiReact, title: "React" },
    { icon: DiMongodb, title: "MongoDB" },
    { icon: SiExpress, title: "Express.js" },
    { icon: SiNextdotjs, title: "Next.js" },
    { icon: SiTypescript, title: "TypeScript" },
    { icon: SiRedis, title: "Redis" },
    { icon: SiPostgresql, title: "PostgreSQL" },
    { icon: DiPython, title: "Python" },
    { icon: DiJava, title: "Java" },
    { icon: DiGit, title: "Git" },
    { icon: SiFirebase, title: "Firebase" },
    { icon: SiDjango, title: "Django" },
    { icon: SiFlask, title: "Flask" },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: "easeOut" as const,
        },
    },
};
export default function Techstack() {
    return (
        <motion.div
            className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            {techStack.map((tech, index) => {
                const Icon = tech.icon;
                return (
                    <motion.div
                        key={index}
                        className="tech-icons group cursor-pointer"
                        title={tech.title}
                        variants={itemVariants}
                        whileHover={{
                            scale: 1.15,
                            boxShadow: "0 0 30px rgba(0, 212, 255, 0.7)",
                            transition: { duration: 0.2 },
                        }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Icon />
                        {/* Tooltip */}
                        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 text-cyan-400 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                            {tech.title}
                        </span>
                    </motion.div>
                );
            })}
        </motion.div>
    );
}
