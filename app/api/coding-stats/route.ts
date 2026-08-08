import { NextResponse } from 'next/server';

export const revalidate = 3600; // Cache and re-fetch every 60 minutes

export async function GET() {
  const stats = {
    codeforces: {
      handle: 'KaranCipherKnight',
      rank: 'expert',
      maxRank: 'expert',
      rating: 1606,
      maxRating: 1606,
      solvedCount: 801,
      topPercentile: 'Top 5%',
      link: 'https://codeforces.com/profile/KaranCipherKnight',
      isLive: false,
    },
    leetcode: {
      username: 'aggarwalkaran241',
      badge: 'Knight',
      rating: 1935,
      globalRanking: 31679,
      topPercentage: 3.73,
      totalSolved: 913,
      easySolved: 214,
      mediumSolved: 596,
      hardSolved: 103,
      contestsAttended: 27,
      link: 'https://leetcode.com/u/aggarwalkaran241',
      isLive: false,
    },
    codechef: {
      username: 'code_rush03',
      stars: '3★',
      division: 'Div 2',
      rating: 1624,
      maxRating: 1624,
      globalRank: 408,
      link: 'https://www.codechef.com/users/code_rush03',
      isLive: false,
    },
    cses: {
      userId: '225098',
      username: 'KARANAGGARWAL',
      solved: 110,
      submissions: 354,
      language: '100% C++',
      badge: 'Algorithm Master',
      link: 'https://cses.fi/user/225098',
      isLive: false,
    },
    gfg: {
      username: 'aggarwalkaran241',
      score: 891,
      solved: 258,
      instituteRank: 39,
      streak: 105,
      link: 'https://www.geeksforgeeks.org/profile/aggarwalkaran241',
      isLive: false,
    },
    github: {
      username: 'karanagg166',
      publicRepos: 37,
      followers: 2,
      totalContributions: 1357,
      link: 'https://github.com/karanagg166',
    },
  };

  // 1. Live Codeforces Fetch: User info & submissions count
  try {
    const cfUserRes = await fetch('https://codeforces.com/api/user.info?handles=KaranCipherKnight', {
      next: { revalidate: 3600 },
    });
    if (cfUserRes.ok) {
      const cfUserData = await cfUserRes.json();
      if (cfUserData.status === 'OK' && cfUserData.result?.[0]) {
        const u = cfUserData.result[0];
        stats.codeforces.rating = u.rating || stats.codeforces.rating;
        stats.codeforces.maxRating = u.maxRating || stats.codeforces.maxRating;
        stats.codeforces.rank = u.rank || stats.codeforces.rank;
        stats.codeforces.maxRank = u.maxRank || stats.codeforces.maxRank;
        stats.codeforces.isLive = true;
      }
    }

    const cfStatusRes = await fetch('https://codeforces.com/api/user.status?handle=KaranCipherKnight&from=1&count=10000', {
      next: { revalidate: 3600 },
    });
    if (cfStatusRes.ok) {
      const statusData = await cfStatusRes.json();
      if (statusData.status === 'OK' && Array.isArray(statusData.result)) {
        const solvedSet = new Set<string>();
        statusData.result.forEach((sub: { verdict?: string; problem?: { contestId?: number; index?: string } }) => {
          if (sub.verdict === 'OK' && sub.problem?.contestId && sub.problem?.index) {
            solvedSet.add(`${sub.problem.contestId}-${sub.problem.index}`);
          }
        });
        if (solvedSet.size > 0) {
          stats.codeforces.solvedCount = solvedSet.size;
        }
      }
    }
  } catch (err) {
    console.error('CF live fetch error:', err);
  }

  // 2. Live LeetCode GraphQL Fetch
  try {
    const lcRes = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      },
      body: JSON.stringify({
        query: `
          query getUserProfile($username: String!) {
            matchedUser(username: $username) {
              submitStats: submitStatsGlobal {
                acSubmissionNum {
                  difficulty
                  count
                }
              }
            }
            userContestRanking(username: $username) {
              attendedContestsCount
              rating
              globalRanking
              topPercentage
              badge {
                name
              }
            }
          }
        `,
        variables: { username: 'aggarwalkaran241' },
      }),
      next: { revalidate: 3600 },
    });

    if (lcRes.ok) {
      const lcData = await lcRes.json();
      const matched = lcData.data?.matchedUser;
      const contest = lcData.data?.userContestRanking;

      if (matched?.submitStats?.acSubmissionNum) {
        matched.submitStats.acSubmissionNum.forEach((item: { difficulty: string; count: number }) => {
          if (item.difficulty === 'All') stats.leetcode.totalSolved = item.count;
          if (item.difficulty === 'Easy') stats.leetcode.easySolved = item.count;
          if (item.difficulty === 'Medium') stats.leetcode.mediumSolved = item.count;
          if (item.difficulty === 'Hard') stats.leetcode.hardSolved = item.count;
        });
      }

      if (contest) {
        stats.leetcode.rating = Math.round(contest.rating || stats.leetcode.rating);
        stats.leetcode.globalRanking = contest.globalRanking || stats.leetcode.globalRanking;
        stats.leetcode.topPercentage = contest.topPercentage ? Number(contest.topPercentage.toFixed(2)) : stats.leetcode.topPercentage;
        stats.leetcode.contestsAttended = contest.attendedContestsCount || stats.leetcode.contestsAttended;
        if (contest.badge?.name) stats.leetcode.badge = contest.badge.name;
      }
      stats.leetcode.isLive = true;
    }
  } catch (err) {
    console.error('LeetCode live fetch error:', err);
  }

  // 3. Live CodeChef Fetch
  try {
    const ccRes = await fetch('https://www.codechef.com/users/code_rush03', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      },
      next: { revalidate: 3600 },
    });
    if (ccRes.ok) {
      const html = await ccRes.text();
      const ratingMatch = html.match(/rating-number">\s*(\d+)\s*<\/div>/i);
      const starsMatch = html.match(/class="rating">\s*(\d+★?)/i);
      const globalRankMatch = html.match(/global-rank[\s\S]*?>\s*(\d+)\s*<\/strong>/i);

      if (ratingMatch && ratingMatch[1]) {
        stats.codechef.rating = parseInt(ratingMatch[1], 10);
        stats.codechef.isLive = true;
      }
      if (starsMatch && starsMatch[1]) {
        stats.codechef.stars = starsMatch[1];
      }
      if (globalRankMatch && globalRankMatch[1]) {
        stats.codechef.globalRank = parseInt(globalRankMatch[1], 10);
      }
    }
  } catch (err) {
    console.error('CodeChef live fetch error:', err);
  }

  // 4. Live CSES Fetch: Scrapes exact submission count for User 225098
  try {
    const csesRes = await fetch('https://cses.fi/user/225098', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      },
      next: { revalidate: 3600 },
    });
    if (csesRes.ok) {
      const html = await csesRes.text();
      const subsMatch = html.match(/Submission count:<\/td><td >(\d+)<\/td>/i);
      if (subsMatch && subsMatch[1]) {
        stats.cses.submissions = parseInt(subsMatch[1], 10);
        stats.cses.isLive = true;
      }
    }
  } catch (err) {
    console.error('CSES live fetch error:', err);
  }

  // 5. Live GeeksforGeeks Fetch
  try {
    const gfgRes = await fetch('https://www.geeksforgeeks.org/profile/aggarwalkaran241', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      },
      next: { revalidate: 3600 },
    });
    if (gfgRes.ok) {
      const html = await gfgRes.text();
      const scoreMatch = html.match(/"score":(\d+)/i);
      const solvedMatch = html.match(/"total_problems_solved":(\d+)/i);
      const rankMatch = html.match(/"institute_rank":(\d+)/i);
      const streakMatch = html.match(/"pod_solved_longest_streak":(\d+)/i);

      if (scoreMatch && scoreMatch[1]) stats.gfg.score = parseInt(scoreMatch[1], 10);
      if (solvedMatch && solvedMatch[1]) stats.gfg.solved = parseInt(solvedMatch[1], 10);
      if (rankMatch && rankMatch[1]) stats.gfg.instituteRank = parseInt(rankMatch[1], 10);
      if (streakMatch && streakMatch[1]) stats.gfg.streak = parseInt(streakMatch[1], 10);
      stats.gfg.isLive = true;
    }
  } catch (err) {
    console.error('GFG live fetch error:', err);
  }

    // 6. Live GitHub User & Contributions Fetch
  try {
    const ghRes = await fetch('https://api.github.com/users/karanagg166', {
      headers: { 'User-Agent': 'Portfolio-App' },
      next: { revalidate: 3600 },
    });
    if (ghRes.ok) {
      const ghData = await ghRes.json();
      stats.github.publicRepos = ghData.public_repos ?? stats.github.publicRepos;
      stats.github.followers = ghData.followers ?? stats.github.followers;
    }

    const contribRes = await fetch('https://github-contributions-api.jogruber.de/v4/karanagg166?y=last', {
      headers: { 'User-Agent': 'Portfolio-App' },
      next: { revalidate: 3600 },
    });
    if (contribRes.ok) {
      const contribData = await contribRes.json();
      if (contribData.total?.lastYear) {
        stats.github.totalContributions = contribData.total.lastYear;
      }
    }
  } catch (err) {
    console.error('GitHub live fetch error:', err);
  }

  return NextResponse.json(stats);
}
