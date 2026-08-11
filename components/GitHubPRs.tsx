'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SiCodeforces, 
  SiLeetcode, 
  SiCodechef, 
  SiCplusplus, 
  SiGithub,
  SiGeeksforgeeks
} from 'react-icons/si';
import { 
  FiExternalLink, 
  FiAward, 
  FiTrendingUp, 
  FiCheckCircle, 
  FiCode, 
  FiActivity, 
  FiLayers, 
  FiZap,
  FiGitBranch,
  FiTerminal,
  FiCalendar
} from 'react-icons/fi';
import { codingProfiles, githubOverview } from '@/data';

interface LiveStatsState {
  cfRating: number;
  cfRank: string;
  cfSolved: number | string;
  lcRating: number;
  lcSolved: number;
  lcEasy: number;
  lcMed: number;
  lcHard: number;
  lcBadge: string;
  lcTopPercent: number;
  ccRating: number;
  ccStars: string;
  csesSolved: number;
  csesSubmissions: number;
  gfgScore: number;
  gfgSolved: number;
  gfgRank: number;
  gfgStreak: number;
  ghRepos: number;
  ghFollowers: number;
  ghContributions: number | string;
  isLive: boolean;
}

const CACHE_KEY = 'portfolio_coding_stats';
const CACHE_TIME_KEY = 'portfolio_coding_stats_time';
const CACHE_DURATION_MS = 60 * 60 * 1000; // 60 minutes cache

const GitHubPRs = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'cp' | 'github'>('all');
  const [liveStats, setLiveStats] = useState<LiveStatsState>({
    cfRating: 1606,
    cfRank: 'Expert',
    cfSolved: '800+',
    lcRating: 1935,
    lcSolved: 913,
    lcEasy: 214,
    lcMed: 596,
    lcHard: 103,
    lcBadge: 'Knight',
    lcTopPercent: 3.73,
    ccRating: 1624,
    ccStars: '3★',
    csesSolved: 110,
    csesSubmissions: 354,
    gfgScore: 891,
    gfgSolved: 258,
    gfgRank: 39,
    gfgStreak: 105,
    ghRepos: 37,
    ghFollowers: 2,
    ghContributions: '1,357+',
    isLive: false,
  });

  useEffect(() => {
    const loadStats = async () => {
      // 1. Check 60-minute cache in sessionStorage
      if (typeof window !== 'undefined') {
        const cached = sessionStorage.getItem(CACHE_KEY);
        const cachedTime = sessionStorage.getItem(CACHE_TIME_KEY);
        const now = Date.now();

        if (cached && cachedTime && now - parseInt(cachedTime, 10) < CACHE_DURATION_MS) {
          try {
            const parsed = JSON.parse(cached);
            setLiveStats(parsed);
            return;
          } catch (e) {
            console.log('Error reading cache', e);
          }
        }
      }

      // 2. Fetch fresh live data from API route
      try {
        const res = await fetch('/api/coding-stats');
        if (res.ok) {
          const data = await res.json();
          const updated: LiveStatsState = {
            cfRating: data.codeforces?.rating || 1606,
            cfRank: data.codeforces?.rank ? data.codeforces.rank.charAt(0).toUpperCase() + data.codeforces.rank.slice(1) : 'Expert',
            cfSolved: data.codeforces?.solvedCount ? `${data.codeforces.solvedCount}` : '800+',
            lcRating: data.leetcode?.rating || 1935,
            lcSolved: data.leetcode?.totalSolved || 913,
            lcEasy: data.leetcode?.easySolved || 214,
            lcMed: data.leetcode?.mediumSolved || 596,
            lcHard: data.leetcode?.hardSolved || 103,
            lcBadge: data.leetcode?.badge || 'Knight',
            lcTopPercent: data.leetcode?.topPercentage || 3.73,
            ccRating: data.codechef?.rating || 1624,
            ccStars: data.codechef?.stars || '3★',
            csesSolved: data.cses?.solved || 110,
            csesSubmissions: data.cses?.submissions || 354,
            gfgScore: data.gfg?.score || 891,
            gfgSolved: data.gfg?.solved || 258,
            gfgRank: data.gfg?.instituteRank || 39,
            gfgStreak: data.gfg?.streak || 105,
            ghRepos: data.github?.publicRepos || 37,
            ghFollowers: data.github?.followers || 2,
            ghContributions: data.github?.totalContributions ? `${data.github.totalContributions.toLocaleString()}+` : '1,357+',
            isLive: true,
          };

          setLiveStats(updated);

          // Save into 60-minute cache
          if (typeof window !== 'undefined') {
            sessionStorage.setItem(CACHE_KEY, JSON.stringify(updated));
            sessionStorage.setItem(CACHE_TIME_KEY, Date.now().toString());
          }
        }
      } catch (e) {
        console.log('Using default static stats for profiles', e);
      }
    };

    loadStats();
  }, []);

  return (
    <section id="coding-stats" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Anchor for backward compatibility */}
      <span id="github-prs" className="absolute -top-32" />

      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-purple-900/10 blur-[140px] -z-10 rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-[450px] h-[350px] bg-blue-900/10 blur-[130px] -z-10 rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-emerald-900/10 blur-[120px] -z-10 rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-medium mb-4 backdrop-blur-md">
            <FiZap className="text-yellow-400 animate-pulse" />
            <span>Problem Solving & Open Source Footprint</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Competitive Programming &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-sky-400 to-emerald-300">
              GitHub Stats
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Verified ratings, contest standings, and open-source footprints across Codeforces, LeetCode, CodeChef, GeeksforGeeks, CSES, and GitHub.
          </p>

          {/* Tab Filter */}
          <div className="flex items-center justify-center gap-2.5 mt-8 flex-wrap">
            {[
              { id: 'all', label: 'All Profiles & Activity', icon: FiLayers },
              { id: 'cp', label: 'Competitive Programming (5 Platforms)', icon: FiAward },
              { id: 'github', label: 'GitHub Heatmap & Open Source', icon: SiGithub },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'all' | 'cp' | 'github')}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/40 border border-purple-400/40 scale-105'
                      : 'bg-black-200/80 text-gray-400 hover:text-white border border-white/10 hover:border-purple-500/30 backdrop-blur-sm'
                  }`}
                >
                  <Icon className={isActive ? 'text-white' : 'text-gray-400'} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Dynamic Content */}
        <AnimatePresence mode="sync">
          {/* Competitive Programming Grid — Spacious 3-column layout */}
          {(activeTab === 'all' || activeTab === 'cp') && (
            <motion.div
              key="cp-section"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="mb-16"
            >
              {activeTab === 'all' && (
                <div className="flex items-center gap-3 mb-7">
                  <div className="h-7 w-1.5 rounded-full bg-gradient-to-b from-blue-500 via-amber-500 to-emerald-500" />
                  <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-wide flex items-center gap-2.5">
                    <FiTrendingUp className="text-sky-400 text-xl" /> Competitive Programming Highlights
                  </h3>
                </div>
              )}

              {/* Responsive 3-Column Grid ensuring no text is ever truncated */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* 1. Codeforces Card */}
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="relative group rounded-2xl bg-black-200/80 border border-blue-500/30 p-6 flex flex-col justify-between overflow-hidden backdrop-blur-md hover:border-blue-400/70 transition-all duration-300 shadow-lg hover:shadow-blue-950/50"
                >
                  <div className="absolute top-0 right-0 w-36 h-36 bg-blue-600/15 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-600/25 transition-all duration-500" />

                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 mb-5">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-12 h-12 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-inner shrink-0">
                          <SiCodeforces className="text-2xl" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-white font-bold text-base sm:text-lg leading-tight">Codeforces</h4>
                          <span className="text-xs text-blue-300 font-mono block truncate">@{codingProfiles[0].handle}</span>
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/40 shrink-0 whitespace-nowrap shadow-sm">
                        {liveStats.cfRank}
                      </span>
                    </div>

                    {/* Main Metric */}
                    <div className="my-4 p-4 rounded-xl bg-white/[0.03] border border-white/5">
                      <div className="flex items-baseline justify-between text-xs mb-1">
                        <span className="text-gray-400 uppercase tracking-wider font-mono">Current Rating</span>
                        <span className="text-blue-400 font-medium">Peak: {codingProfiles[0].maxRating}</span>
                      </div>
                      <div className="text-3xl sm:text-4xl font-extrabold text-white flex items-baseline gap-2">
                        {liveStats.cfRating}
                        <span className="text-xs font-normal text-gray-400">/ 1606 Expert</span>
                      </div>
                    </div>

                    {/* Key Stats Grid */}
                    <div className="grid grid-cols-2 gap-2.5 text-xs mb-4">
                      <div className="p-3 rounded-xl bg-black-100/70 border border-white/5">
                        <span className="text-gray-400 block text-xs">Problems Solved</span>
                        <span className="text-white font-bold text-base mt-0.5 block">{liveStats.cfSolved} Solved</span>
                      </div>
                      <div className="p-3 rounded-xl bg-black-100/70 border border-white/5">
                        <span className="text-gray-400 block text-xs">Global Standing</span>
                        <span className="text-blue-300 font-bold text-base mt-0.5 block">Top 5% Globally</span>
                      </div>
                    </div>
                  </div>

                  {/* Profile Link */}
                  <a
                    href={codingProfiles[0].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/40 hover:border-blue-400 text-xs sm:text-sm font-medium transition-all duration-200 shadow-sm"
                  >
                    <span>View Codeforces Profile</span>
                    <FiExternalLink className="text-xs" />
                  </a>
                </motion.div>

                {/* 2. LeetCode Card */}
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="relative group rounded-2xl bg-black-200/80 border border-amber-500/30 p-6 flex flex-col justify-between overflow-hidden backdrop-blur-md hover:border-amber-400/70 transition-all duration-300 shadow-lg hover:shadow-amber-950/50"
                >
                  <div className="absolute top-0 right-0 w-36 h-36 bg-amber-600/15 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-600/25 transition-all duration-500" />

                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 mb-5">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner shrink-0">
                          <SiLeetcode className="text-2xl" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-white font-bold text-base sm:text-lg leading-tight">LeetCode</h4>
                          <span className="text-xs text-amber-300 font-mono block truncate">@{codingProfiles[1].handle}</span>
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40 shrink-0 whitespace-nowrap shadow-sm flex items-center gap-1.5">
                        <FiAward className="text-amber-400" /> {liveStats.lcBadge}
                      </span>
                    </div>

                    {/* Main Metric */}
                    <div className="my-4 p-4 rounded-xl bg-white/[0.03] border border-white/5">
                      <div className="flex items-baseline justify-between text-xs mb-1">
                        <span className="text-gray-400 uppercase tracking-wider font-mono">Contest Rating</span>
                        <span className="text-amber-400 font-medium">Top {liveStats.lcTopPercent}% Worldwide</span>
                      </div>
                      <div className="text-3xl sm:text-4xl font-extrabold text-white flex items-baseline gap-2">
                        {liveStats.lcRating}
                        <span className="text-xs font-normal text-gray-400">pts (Knight)</span>
                      </div>
                    </div>

                    {/* Difficulty Pill Stats */}
                    <div className="space-y-1.5 mb-4">
                      <div className="flex justify-between text-xs text-gray-300">
                        <span className="font-mono text-gray-400">Total Solved</span>
                        <span className="font-bold text-white text-sm">{liveStats.lcSolved} Problems</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center text-xs">
                        <div className="py-1.5 px-2 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 font-medium">
                          Easy: {liveStats.lcEasy}
                        </div>
                        <div className="py-1.5 px-2 rounded-lg bg-amber-950/40 border border-amber-500/30 text-amber-400 font-medium">
                          Med: {liveStats.lcMed}
                        </div>
                        <div className="py-1.5 px-2 rounded-lg bg-rose-950/40 border border-rose-500/30 text-rose-400 font-semibold">
                          Hard: {liveStats.lcHard}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Profile Link */}
                  <a
                    href={codingProfiles[1].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-amber-600/20 hover:bg-amber-600 text-amber-300 hover:text-white border border-amber-500/40 hover:border-amber-400 text-xs sm:text-sm font-medium transition-all duration-200 shadow-sm"
                  >
                    <span>View LeetCode Profile</span>
                    <FiExternalLink className="text-xs" />
                  </a>
                </motion.div>

                {/* 3. CodeChef Card */}
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="relative group rounded-2xl bg-black-200/80 border border-purple-500/30 p-6 flex flex-col justify-between overflow-hidden backdrop-blur-md hover:border-purple-400/70 transition-all duration-300 shadow-lg hover:shadow-purple-950/50"
                >
                  <div className="absolute top-0 right-0 w-36 h-36 bg-purple-600/15 rounded-full blur-3xl pointer-events-none group-hover:bg-purple-600/25 transition-all duration-500" />

                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 mb-5">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-12 h-12 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-inner shrink-0">
                          <SiCodechef className="text-2xl" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-white font-bold text-base sm:text-lg leading-tight">CodeChef</h4>
                          <span className="text-xs text-purple-300 font-mono block truncate">@{codingProfiles[2].handle}</span>
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/40 shrink-0 whitespace-nowrap shadow-sm">
                        {liveStats.ccStars} Div 2
                      </span>
                    </div>

                    {/* Main Metric */}
                    <div className="my-4 p-4 rounded-xl bg-white/[0.03] border border-white/5">
                      <div className="flex items-baseline justify-between text-xs mb-1">
                        <span className="text-gray-400 uppercase tracking-wider font-mono">Rating Score</span>
                        <span className="text-purple-400 font-medium">Rank #408</span>
                      </div>
                      <div className="text-3xl sm:text-4xl font-extrabold text-white flex items-baseline gap-2">
                        {liveStats.ccRating}
                        <span className="text-xs font-normal text-gray-400">Peak: 1624 (3★)</span>
                      </div>
                    </div>

                    {/* Key Stats Grid */}
                    <div className="grid grid-cols-2 gap-2.5 text-xs mb-4">
                      <div className="p-3 rounded-xl bg-black-100/70 border border-white/5">
                        <span className="text-gray-400 block text-xs">Division</span>
                        <span className="text-white font-bold text-base mt-0.5 block">Div 2 Active</span>
                      </div>
                      <div className="p-3 rounded-xl bg-black-100/70 border border-white/5">
                        <span className="text-gray-400 block text-xs">Stars Badge</span>
                        <span className="text-purple-300 font-bold text-base mt-0.5 block">{liveStats.ccStars} Rated</span>
                      </div>
                    </div>
                  </div>

                  {/* Profile Link */}
                  <a
                    href={codingProfiles[2].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white border border-purple-500/40 hover:border-purple-400 text-xs sm:text-sm font-medium transition-all duration-200 shadow-sm"
                  >
                    <span>View CodeChef Profile</span>
                    <FiExternalLink className="text-xs" />
                  </a>
                </motion.div>

                {/* 4. GeeksforGeeks Card */}
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="relative group rounded-2xl bg-black-200/80 border border-green-500/30 p-6 flex flex-col justify-between overflow-hidden backdrop-blur-md hover:border-green-400/70 transition-all duration-300 shadow-lg hover:shadow-green-950/50"
                >
                  <div className="absolute top-0 right-0 w-36 h-36 bg-green-600/15 rounded-full blur-3xl pointer-events-none group-hover:bg-green-600/25 transition-all duration-500" />

                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 mb-5">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-12 h-12 rounded-xl bg-green-500/15 border border-green-500/30 flex items-center justify-center text-green-400 shadow-inner shrink-0">
                          <SiGeeksforgeeks className="text-2xl" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-white font-bold text-base sm:text-lg leading-tight">GeeksforGeeks</h4>
                          <span className="text-xs text-green-300 font-mono block truncate">@aggarwalkaran241</span>
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-300 border border-green-500/40 shrink-0 whitespace-nowrap shadow-sm">
                        Rank #{liveStats.gfgRank}
                      </span>
                    </div>

                    {/* Main Metric */}
                    <div className="my-4 p-4 rounded-xl bg-white/[0.03] border border-white/5">
                      <div className="flex items-baseline justify-between text-xs mb-1">
                        <span className="text-gray-400 uppercase tracking-wider font-mono">Coding Score</span>
                        <span className="text-green-400 font-medium">{liveStats.gfgStreak}D POTD Streak</span>
                      </div>
                      <div className="text-3xl sm:text-4xl font-extrabold text-white flex items-baseline gap-2">
                        {liveStats.gfgScore}
                        <span className="text-xs font-normal text-gray-400">pts (Solved 258+)</span>
                      </div>
                    </div>

                    {/* Key Stats Grid */}
                    <div className="grid grid-cols-2 gap-2.5 text-xs mb-4">
                      <div className="p-3 rounded-xl bg-black-100/70 border border-white/5">
                        <span className="text-gray-400 block text-xs">Problems Solved</span>
                        <span className="text-white font-bold text-base mt-0.5 block">{liveStats.gfgSolved}+ Problems</span>
                      </div>
                      <div className="p-3 rounded-xl bg-black-100/70 border border-white/5">
                        <span className="text-gray-400 block text-xs">Institute Rank</span>
                        <span className="text-green-300 font-bold text-base mt-0.5 block">#{liveStats.gfgRank} IIITDMJ</span>
                      </div>
                    </div>
                  </div>

                  {/* Profile Link */}
                  <a
                    href="https://www.geeksforgeeks.org/profile/aggarwalkaran241"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-green-600/20 hover:bg-green-600 text-green-300 hover:text-white border border-green-500/40 hover:border-green-400 text-xs sm:text-sm font-medium transition-all duration-200 shadow-sm"
                  >
                    <span>View GeeksforGeeks Profile</span>
                    <FiExternalLink className="text-xs" />
                  </a>
                </motion.div>

                {/* 5. CSES Problem Set Card */}
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="relative group rounded-2xl bg-black-200/80 border border-emerald-500/30 p-6 flex flex-col justify-between overflow-hidden backdrop-blur-md hover:border-emerald-400/70 transition-all duration-300 shadow-lg hover:shadow-emerald-950/50"
                >
                  <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-600/25 transition-all duration-500" />

                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 mb-5">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-inner shrink-0">
                          <SiCplusplus className="text-2xl" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-white font-bold text-base sm:text-lg leading-tight">CSES Problem Set</h4>
                          <span className="text-xs text-emerald-300 font-mono block truncate">User #225098</span>
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shrink-0 whitespace-nowrap shadow-sm">
                        100% C++
                      </span>
                    </div>

                    {/* Main Metric */}
                    <div className="my-4 p-4 rounded-xl bg-white/[0.03] border border-white/5">
                      <div className="flex items-baseline justify-between text-xs mb-1">
                        <span className="text-gray-400 uppercase tracking-wider font-mono">Standard Solved</span>
                        <span className="text-emerald-400 font-medium">{liveStats.csesSubmissions} Submissions</span>
                      </div>
                      <div className="text-3xl sm:text-4xl font-extrabold text-white flex items-baseline gap-2">
                        {liveStats.csesSolved}+
                        <span className="text-xs font-normal text-gray-400">DSA problems</span>
                      </div>
                    </div>

                    {/* Topics badges */}
                    <div className="p-3 rounded-xl bg-black-100/70 border border-white/5 mb-4 text-xs">
                      <span className="text-gray-400 block text-xs mb-1.5 font-mono">Core Algorithm Topics</span>
                      <div className="flex flex-wrap gap-1.5 text-xs">
                        <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-mono">DP</span>
                        <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-mono">Graphs</span>
                        <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-mono">Trees</span>
                        <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-mono">Math</span>
                      </div>
                    </div>
                  </div>

                  {/* Profile Link */}
                  <a
                    href="https://cses.fi/user/225098"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/40 hover:border-emerald-400 text-xs sm:text-sm font-medium transition-all duration-200 shadow-sm"
                  >
                    <span>View CSES User Profile</span>
                    <FiExternalLink className="text-xs" />
                  </a>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* GitHub Ecosystem & Real 1-Year Contribution Heatmap */}
          {(activeTab === 'all' || activeTab === 'github') && (
            <motion.div
              key="github-section"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="mt-8"
            >
              {activeTab === 'all' && (
                <div className="flex items-center gap-3 mb-7">
                  <div className="h-7 w-1.5 rounded-full bg-gradient-to-b from-purple-500 to-indigo-500" />
                  <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-wide flex items-center gap-2.5">
                    <SiGithub className="text-purple-400 text-xl" /> GitHub Activity & Open Source Analytics
                  </h3>
                </div>
              )}

              {/* GitHub KPI summary row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {[
                  { label: 'Yearly Contributions', value: `${liveStats.ghContributions}`, sub: 'Past 12 months activity', color: 'text-purple-400', icon: FiActivity },
                  { label: 'Public Repositories', value: `${liveStats.ghRepos}+`, sub: 'Active source projects', color: 'text-sky-400', icon: FiGitBranch },
                  { label: 'Primary Languages', value: 'TypeScript / C++', sub: 'Full Stack & Systems', color: 'text-amber-400', icon: FiCode },
                  { label: 'CI/CD Automation', value: 'GitHub Actions', sub: 'Docker & Auto-Testing', color: 'text-emerald-400', icon: FiCheckCircle },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-black-200/80 border border-white/10 text-center backdrop-blur-md hover:border-purple-500/40 transition-colors group shadow-lg"
                    >
                      <div className="flex justify-center mb-2 text-gray-500 group-hover:text-purple-400 transition-colors">
                        <Icon className="text-xl" />
                      </div>
                      <div className={`text-2xl sm:text-3xl font-extrabold ${item.color}`}>{item.value}</div>
                      <div className="text-white text-xs sm:text-sm font-semibold mt-1">{item.label}</div>
                      <div className="text-gray-500 text-xs mt-0.5">{item.sub}</div>
                    </div>
                  );
                })}
              </div>

              {/* Real 1-Year GitHub Contribution Heatmap Widget */}
              <div className="rounded-2xl bg-black-200/80 border border-emerald-500/30 p-6 mb-6 backdrop-blur-md shadow-xl overflow-hidden relative group">
                <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-inner">
                      <FiCalendar className="text-xl" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-base sm:text-lg flex items-center gap-2">
                        GitHub Contribution Calendar (Past 1 Year)
                      </h4>
                      <span className="text-xs text-gray-400">
                        {liveStats.ghContributions} total contributions in the last year • @{githubOverview.username}
                      </span>
                    </div>
                  </div>

                  <span className="px-3.5 py-1 rounded-full text-xs font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    Live Activity Heatmap
                  </span>
                </div>

                {/* SVG Heatmap Image Container with responsive scroll */}
                <div className="p-4 sm:p-6 rounded-xl bg-black-100/90 border border-white/5 overflow-x-auto flex justify-center items-center min-h-[140px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://ghchart.rshah.org/39d353/${githubOverview.username}`}
                    alt={`${githubOverview.username}'s 1-Year GitHub Contribution Chart`}
                    className="w-full max-w-5xl h-auto object-contain select-none filter contrast-125"
                    loading="lazy"
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-gray-400 mt-4 pt-3 border-t border-white/5 flex-wrap gap-2">
                  <span className="font-mono">Aug 2025 – Aug 2026 Activity Timeline</span>
                  <div className="flex items-center gap-2">
                    <span>Less</span>
                    <div className="flex gap-1">
                      <div className="w-3 h-3 rounded-sm bg-[#161b22]" title="0 contributions" />
                      <div className="w-3 h-3 rounded-sm bg-[#0e4429]" title="1-3 contributions" />
                      <div className="w-3 h-3 rounded-sm bg-[#006d32]" title="4-6 contributions" />
                      <div className="w-3 h-3 rounded-sm bg-[#26a641]" title="7-9 contributions" />
                      <div className="w-3 h-3 rounded-sm bg-[#39d353]" title="10+ contributions" />
                    </div>
                    <span>More</span>
                  </div>
                </div>
              </div>

              {/* Language Distribution & Verified Commits Breakdown */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
                {/* 1. Language Stack Breakdown (7 Cols) */}
                <div className="lg:col-span-7 rounded-2xl bg-black-200/80 border border-white/10 p-6 flex flex-col justify-between backdrop-blur-md shadow-lg">
                  <div>
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400 shadow-inner">
                        <FiCode className="text-xl" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-base sm:text-lg">Language Distribution</h4>
                        <span className="text-xs text-gray-400">Calculated across 37+ repositories</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {[
                        { name: 'TypeScript / React & Next.js', percent: 45, color: 'bg-blue-500', text: 'text-blue-400' },
                        { name: 'C++ (DSA & Low-Level)', percent: 25, color: 'bg-emerald-500', text: 'text-emerald-400' },
                        { name: 'Python (FastAPI & AI/ML)', percent: 15, color: 'bg-amber-500', text: 'text-amber-400' },
                        { name: 'JavaScript & Node.js', percent: 10, color: 'bg-yellow-400', text: 'text-yellow-300' },
                        { name: 'Docker / DevOps & Shell', percent: 5, color: 'bg-purple-500', text: 'text-purple-400' },
                      ].map((lang, index) => (
                        <div key={index} className="space-y-1.5">
                          <div className="flex justify-between text-xs sm:text-sm">
                            <span className="text-gray-300 font-medium">{lang.name}</span>
                            <span className={`font-mono font-bold ${lang.text}`}>{lang.percent}%</span>
                          </div>
                          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${lang.percent}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, delay: index * 0.1 }}
                              className={`h-full ${lang.color} rounded-full`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/25 text-center">
                    <span className="text-xs text-purple-300 font-medium flex items-center justify-center gap-2">
                      <FiTerminal /> Modern Full Stack & Problem Solving Stack
                    </span>
                  </div>
                </div>

                {/* 2. Repository & Pipeline Highlights (5 Cols) */}
                <div className="lg:col-span-5 rounded-2xl bg-black-200/80 border border-white/10 p-6 flex flex-col justify-between backdrop-blur-md shadow-lg">
                  <div>
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-inner">
                        <FiCheckCircle className="text-xl" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-base sm:text-lg">Engineering Footprint</h4>
                        <span className="text-xs text-gray-400">Practices & workflows</span>
                      </div>
                    </div>

                    <div className="space-y-3 text-xs sm:text-sm text-gray-300">
                      <div className="p-3.5 rounded-xl bg-black-100/70 border border-white/5 flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-purple-400 mt-1.5 shrink-0" />
                        <div>
                          <strong className="text-white block font-semibold">1,350+ Annual Contributions</strong>
                          <span className="text-gray-400 text-xs">Continuous open commits across web applications, proctored systems, and DSA repositories.</span>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-black-100/70 border border-white/5 flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-sky-400 mt-1.5 shrink-0" />
                        <div>
                          <strong className="text-white block font-semibold">CI/CD & Containerization</strong>
                          <span className="text-gray-400 text-xs">Automated GitHub Actions pipelines building Docker images and running tests on push.</span>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-black-100/70 border border-white/5 flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                        <div>
                          <strong className="text-white block font-semibold">37+ Public Repositories</strong>
                          <span className="text-gray-400 text-xs">Full-stack web apps, real-time WebSocket portals, and algorithms.</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <a
                    href={githubOverview.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs sm:text-sm font-semibold transition-all duration-200 shadow-lg shadow-purple-950/50 hover:scale-[1.02]"
                  >
                    <SiGithub className="text-base" />
                    <span>Explore All 37+ GitHub Repositories</span>
                    <FiExternalLink />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default GitHubPRs;
