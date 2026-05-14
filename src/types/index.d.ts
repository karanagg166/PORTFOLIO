export interface Project {
  name: string;
  hash: string;
  blockNumber: number;
  from: string;
  to: string;
  stack: string[];
  status: 'CONFIRMED' | 'PENDING' | 'DEPLOYED';
  confirmations: string;
  codeSnippet: string;
  description?: string;
  github?: string;
  live?: string;
  image?: string;
  category: 'frontend' | 'backend' | 'fullstack';
}

export interface Skill {
  name: string;
  proficiency: number;
  category: 'frontend' | 'backend' | 'devops' | 'tools' | 'languages';
  pid: string;
  status: 'RUNNING' | 'SLEEPING' | 'CRITICAL';
  icon?: string;
}

export interface GitCommit {
  hash: string;
  branch?: string;
  author: string;
  date: string;
  message: string;
  body: string;
  filesChanged: number;
  insertions: number;
  deletions: number;
}

export interface VSCodeFile {
  name: string;
  icon: string;
  content: string;
  language?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface GitHubWrapped {
  year: number;
  topLanguage: { name: string; percentage: number };
  longestStreak: number;
  favoriteCommitTime: string;
  totalCommits: number;
  topProject: string;
  personalityType: string;
  totalPRs: number;
  linesWritten: string;
}
