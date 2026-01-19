"use client";

import {
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    ResponsiveContainer,
    Tooltip,
} from "recharts";
import { motion } from "framer-motion";

const skillsData = [
    { skill: "React/Next.js", level: 95, fullMark: 100 },
    { skill: "TypeScript", level: 88, fullMark: 100 },
    { skill: "Node.js", level: 85, fullMark: 100 },
    { skill: "Python", level: 82, fullMark: 100 },
    { skill: "MongoDB", level: 80, fullMark: 100 },
    { skill: "PostgreSQL", level: 78, fullMark: 100 },
    { skill: "Docker", level: 75, fullMark: 100 },
    { skill: "AWS", level: 70, fullMark: 100 },
];

export default function SkillChart() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full glass-card p-6"
            style={{ height: "450px" }}
        >
            <h3
                className="text-center text-2xl font-bold mb-6"
                style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    background: "linear-gradient(135deg, #00d4ff, #1e3a5f)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                }}
            >
                Skill Proficiency
            </h3>
            <ResponsiveContainer width="100%" height="85%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={skillsData}>
                    <PolarGrid
                        stroke="rgba(0, 212, 255, 0.2)"
                        strokeDasharray="3 3"
                    />
                    <PolarAngleAxis
                        dataKey="skill"
                        tick={{ fill: "rgba(255, 255, 255, 0.8)", fontSize: 11 }}
                        tickLine={{ stroke: "rgba(0, 212, 255, 0.3)" }}
                    />
                    <PolarRadiusAxis
                        angle={30}
                        domain={[0, 100]}
                        tick={{ fill: "rgba(255, 255, 255, 0.4)", fontSize: 10 }}
                        axisLine={{ stroke: "rgba(0, 212, 255, 0.2)" }}
                    />
                    <Radar
                        name="Skills"
                        dataKey="level"
                        stroke="#00d4ff"
                        fill="url(#skillGradient)"
                        fillOpacity={0.6}
                        strokeWidth={2}
                    />
                    <defs>
                        <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#00d4ff" stopOpacity={0.8} />
                            <stop offset="100%" stopColor="#1e3a5f" stopOpacity={0.4} />
                        </linearGradient>
                    </defs>
                    <Tooltip
                        contentStyle={{
                            background: "rgba(10, 22, 40, 0.95)",
                            border: "1px solid rgba(0, 212, 255, 0.3)",
                            borderRadius: "12px",
                            color: "#ffffff",
                            backdropFilter: "blur(10px)",
                            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                        }}
                        labelStyle={{ color: "#00d4ff", fontWeight: 600 }}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </motion.div>
    );
}
