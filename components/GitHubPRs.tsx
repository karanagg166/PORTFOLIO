'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiGitPullRequest, FiCheck, FiX } from 'react-icons/fi';

interface PullRequest {
  id: number;
  title: string;
  html_url: string;
  state: string;
  created_at: string;
  merged_at: string | null;
  repository_url: string;
  user: {
    login: string;
  };
  labels: Array<{ name: string; color: string }>;
}

interface ProcessedPR {
  id: number;
  title: string;
  url: string;
  state: string;
  createdAt: string;
  mergedAt: string | null;
  repoName: string;
  labels: Array<{ name: string; color: string }>;
}

const GitHubPRs = () => {
  const [prs, setPrs] = useState<ProcessedPR[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'merged' | 'open' | 'closed'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const PRS_PER_PAGE = 5;

  // Replace with your GitHub username
  const GITHUB_USERNAME = 'karanagg166';

  useEffect(() => {
    fetchPullRequests();
  }, []);

  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const fetchPullRequests = async () => {
    try {
      setLoading(true);
      // GitHub Search API to find all PRs created by the user
      const response = await fetch(
        `https://api.github.com/search/issues?q=author:${GITHUB_USERNAME}+type:pr&per_page=100&sort=created&order=desc`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch pull requests');
      }

      const data = await response.json();
      
      const processedPRs: ProcessedPR[] = data.items.map((pr: any) => ({
        id: pr.id,
        title: pr.title,
        url: pr.html_url,
        state: pr.state,
        createdAt: pr.created_at,
        mergedAt: pr.pull_request?.merged_at || null,
        repoName: pr.repository_url.split('/').slice(-2).join('/'),
        labels: pr.labels || [],
      }));

      setPrs(processedPRs);
      setError(null);
    } catch (err) {
      setError('Failed to load pull requests. Please try again later.');
      console.error('Error fetching PRs:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredPRs = prs.filter((pr) => {
    if (filter === 'all') return true;
    if (filter === 'merged') return pr.mergedAt !== null;
    if (filter === 'open') return pr.state === 'open';
    if (filter === 'closed') return pr.state === 'closed' && pr.mergedAt === null;
    return true;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredPRs.length / PRS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRS_PER_PAGE;
  const endIndex = startIndex + PRS_PER_PAGE;
  const paginatedPRs = filteredPRs.slice(startIndex, endIndex);

  const stats = {
    total: prs.length,
    merged: prs.filter((pr) => pr.mergedAt !== null).length,
    open: prs.filter((pr) => pr.state === 'open').length,
    closed: prs.filter((pr) => pr.state === 'closed' && pr.mergedAt === null).length,
  };

  return (
    <section id="github-prs" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="text-purple-500">GitHub</span> Contributions
          </h2>
          <p className="text-gray-400 text-lg">
            All pull requests I&apos;ve created across GitHub repositories
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: 'Total PRs', value: stats.total, color: 'text-blue-400' },
            { label: 'Merged', value: stats.merged, color: 'text-green-400' },
            { label: 'Open', value: stats.open, color: 'text-yellow-400' },
            { label: 'Closed', value: stats.closed, color: 'text-red-400' },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-black-200 border border-white/[0.1] rounded-lg p-4 text-center"
            >
              <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-8 justify-center"
        >
          {(['all', 'merged', 'open', 'closed'] as const).map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-4 py-2 rounded-lg capitalize transition-all ${
                filter === filterType
                  ? 'bg-purple-500 text-white'
                  : 'bg-black-200 border border-white/[0.1] text-gray-400 hover:border-purple-500'
              }`}
            >
              {filterType}
            </button>
          ))}
        </motion.div>

        {/* Pagination Info */}
        {!loading && !error && filteredPRs.length > 0 && (
          <div className="text-center mb-6 text-gray-400">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredPRs.length)} of {filteredPRs.length} pull requests
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            <p className="text-gray-400 mt-4">Loading pull requests...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12 text-red-400">
            <FiX className="mx-auto text-4xl mb-2" />
            <p>{error}</p>
          </div>
        )}

        {/* PRs List */}
        {!loading && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4"
          >
            {paginatedPRs.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                No pull requests found for this filter.
              </div>
            ) : (
              paginatedPRs.map((pr, index) => (
                <motion.a
                  key={pr.id}
                  href={pr.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="block bg-black-200 border border-white/[0.1] rounded-lg p-4 hover:border-purple-500 transition-all group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <FiGitPullRequest
                          className={`text-xl ${
                            pr.mergedAt
                              ? 'text-purple-500'
                              : pr.state === 'open'
                              ? 'text-green-500'
                              : 'text-red-500'
                          }`}
                        />
                        <span className="text-gray-400 text-sm font-mono">
                          {pr.repoName}
                        </span>
                      </div>
                      <h3 className="text-white font-semibold group-hover:text-purple-400 transition-colors mb-2">
                        {pr.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          {pr.mergedAt ? (
                            <>
                              <FiCheck className="text-green-400" />
                              Merged
                            </>
                          ) : pr.state === 'open' ? (
                            <>
                              <FiGitPullRequest className="text-green-400" />
                              Open
                            </>
                          ) : (
                            <>
                              <FiX className="text-red-400" />
                              Closed
                            </>
                          )}
                        </span>
                        <span>
                          {new Date(pr.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                      {pr.labels.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {pr.labels.slice(0, 3).map((label) => (
                            <span
                              key={label.name}
                              className="px-2 py-1 rounded text-xs"
                              style={{
                                backgroundColor: `#${label.color}20`,
                                color: `#${label.color}`,
                                border: `1px solid #${label.color}40`,
                              }}
                            >
                              {label.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <FiGithub className="text-2xl text-gray-400 group-hover:text-purple-400 transition-colors" />
                  </div>
                </motion.a>
              ))
            )}
          </motion.div>
        )}

        {/* Pagination Controls */}
        {!loading && !error && filteredPRs.length > PRS_PER_PAGE && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center justify-center gap-4 mt-8"
          >
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                currentPage === 1
                  ? 'bg-black-200 text-gray-600 cursor-not-allowed'
                  : 'bg-purple-500 hover:bg-purple-600 text-white'
              }`}
            >
              ← Previous
            </button>
            <span className="text-gray-400">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                currentPage === totalPages
                  ? 'bg-black-200 text-gray-600 cursor-not-allowed'
                  : 'bg-purple-500 hover:bg-purple-600 text-white'
              }`}
            >
              Next →
            </button>
          </motion.div>
        )}

        {/* View More on GitHub */}
        {!loading && !error && prs.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center mt-8"
          >
            <a
              href={`https://github.com/pulls?q=is%3Apr+author%3A${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
            >
              <FiGithub />
              View All on GitHub
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default GitHubPRs;
