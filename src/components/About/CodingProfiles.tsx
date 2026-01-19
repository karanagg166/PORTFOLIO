"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Code2, Trophy, Target, Zap, ExternalLink } from "lucide-react";
import { SiLeetcode, SiCodeforces, SiGeeksforgeeks, SiHackerrank } from "react-icons/si";
import { Card, CardContent, Badge } from "@/components/ui/shadcn";
import { SpringCard } from "@/components/animations/SpringAnimations";

interface LeetCodeStats {
    totalSolved: number;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
    ranking: number;
}

interface CodeforcesStats {
    rating: number;
    maxRating: number;
    rank: string;
    handle: string;
}

export default function CodingProfiles() {
    const [leetcodeStats, setLeetcodeStats] = useState<LeetCodeStats | null>(null);
    const [codeforcesStats, setCodeforcesStats] = useState<CodeforcesStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch LeetCode stats
        const fetchLeetCode = async () => {
            try {
                const res = await fetch("https://leetcode-stats-api.herokuapp.com/karanagg166");
                const data = await res.json();
                if (data.status === "success") {
                    setLeetcodeStats({
                        totalSolved: data.totalSolved || 0,
                        easySolved: data.easySolved || 0,
                        mediumSolved: data.mediumSolved || 0,
                        hardSolved: data.hardSolved || 0,
                        ranking: data.ranking || 0,
                    });
                }
            } catch (error) {
                console.error("LeetCode fetch error:", error);
                // Fallback stats
                setLeetcodeStats({
                    totalSolved: 250,
                    easySolved: 80,
                    mediumSolved: 130,
                    hardSolved: 40,
                    ranking: 150000,
                });
            }
        };

        // Fetch Codeforces stats
        const fetchCodeforces = async () => {
            try {
                const res = await fetch("https://codeforces.com/api/user.info?handles=karanagg166");
                const data = await res.json();
                if (data.status === "OK" && data.result?.[0]) {
                    const user = data.result[0];
                    setCodeforcesStats({
                        rating: user.rating || 0,
                        maxRating: user.maxRating || 0,
                        rank: user.rank || "newbie",
                        handle: user.handle,
                    });
                }
            } catch (error) {
                console.error("Codeforces fetch error:", error);
                // Fallback stats
                setCodeforcesStats({
                    rating: 1200,
                    maxRating: 1350,
                    rank: "Pupil",
                    handle: "karanagg166",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchLeetCode();
        fetchCodeforces();
    }, []);

    const codingProfiles = [
        {
            name: "LeetCode",
            icon: SiLeetcode,
            color: "#FFA116",
            link: "https://leetcode.com/karanagg166",
            stats: leetcodeStats ? `${leetcodeStats.totalSolved} problems solved` : "Loading...",
        },
        {
            name: "Codeforces",
            icon: SiCodeforces,
            color: "#1F8ACB",
            link: "https://codeforces.com/profile/karanagg166",
            stats: codeforcesStats ? `Rating: ${codeforcesStats.rating} (${codeforcesStats.rank})` : "Loading...",
        },
        {
            name: "GeeksforGeeks",
            icon: SiGeeksforgeeks,
            color: "#2F8D46",
            link: "https://auth.geeksforgeeks.org/user/karanagg166",
            stats: "500+ problems solved",
        },
        {
            name: "HackerRank",
            icon: SiHackerrank,
            color: "#00EA64",
            link: "https://www.hackerrank.com/karanagg166",
            stats: "5★ Problem Solving",
        },
    ];

    const achievements = [
        {
            icon: Trophy,
            title: "LeetCode Knight",
            description: "Top 5% on LeetCode globally",
            color: "#FFA116",
        },
        {
            icon: Target,
            title: "500+ Problems",
            description: "Solved across all platforms",
            color: "#00d4ff",
        },
        {
            icon: Zap,
            title: "Contest Rating",
            description: "Peak rating 1800+ on LeetCode",
            color: "#FFD700",
        },
        {
            icon: Code2,
            title: "Daily Streak",
            description: "100+ days consistent coding",
            color: "#10B981",
        },
    ];

    return (
        <div className="mt-16">
            {/* Coding Profiles Section */}
            <motion.h2
                className="text-2xl md:text-3xl font-bold text-center mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <Code2 className="inline-block mr-2 mb-1" />
                Coding <span className="purple">Profiles</span>
            </motion.h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                {codingProfiles.map((profile, index) => (
                    <motion.div
                        key={profile.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <SpringCard>
                            <a
                                href={profile.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block"
                            >
                                <Card variant="glass" className="h-full hover:border-cyan-500/50 transition-all group">
                                    <CardContent className="p-4 text-center">
                                        <profile.icon
                                            size={40}
                                            className="mx-auto mb-2 transition-transform group-hover:scale-110"
                                            style={{ color: profile.color }}
                                        />
                                        <h3 className="font-semibold text-white mb-1">{profile.name}</h3>
                                        <p className="text-xs text-gray-400">{profile.stats}</p>
                                        <ExternalLink size={14} className="mx-auto mt-2 text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </CardContent>
                                </Card>
                            </a>
                        </SpringCard>
                    </motion.div>
                ))}
            </div>

            {/* LeetCode Stats Detail */}
            {leetcodeStats && (
                <motion.div
                    className="mb-12"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <Card variant="glow" className="p-6">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <SiLeetcode size={24} color="#FFA116" />
                            <h3 className="text-xl font-bold">LeetCode Stats</h3>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                            <div>
                                <div className="text-3xl font-bold text-cyan-400">{leetcodeStats.totalSolved}</div>
                                <div className="text-sm text-gray-400">Total Solved</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-green-400">{leetcodeStats.easySolved}</div>
                                <div className="text-sm text-gray-400">Easy</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-yellow-400">{leetcodeStats.mediumSolved}</div>
                                <div className="text-sm text-gray-400">Medium</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-red-400">{leetcodeStats.hardSolved}</div>
                                <div className="text-sm text-gray-400">Hard</div>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            )}

            {/* Achievements Section */}
            <motion.h2
                className="text-2xl md:text-3xl font-bold text-center mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <Trophy className="inline-block mr-2 mb-1" />
                Coding <span className="purple">Achievements</span>
            </motion.h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {achievements.map((achievement, index) => (
                    <motion.div
                        key={achievement.title}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <Card variant="glass" className="h-full text-center p-4">
                            <achievement.icon
                                size={36}
                                className="mx-auto mb-2"
                                style={{ color: achievement.color }}
                            />
                            <h3 className="font-semibold text-white text-sm mb-1">{achievement.title}</h3>
                            <p className="text-xs text-gray-400">{achievement.description}</p>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
