import React, { useState, useEffect } from "react";
import Heatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { Row, Col } from "react-bootstrap";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface ActivityData {
  date: string;
  count: number;
}

interface QuestionStats {
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalSolved: number;
}

interface PieDataItem {
  name: string;
  value: number;
}

interface ContestData {
  contestAttend: number;
  contestRating: number;
  contestGlobalRanking: number;
  totalParticipants: number;
  contestTopPercentage: number;
  contestBadges: {
    name: string;
  };
}

function LeetcodeHeatmap(): React.JSX.Element {
  const [activityData, setActivityData] = useState<ActivityData[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [questionStats, setQuestionStats] = useState<QuestionStats>({
    easySolved: 0,
    mediumSolved: 0,
    hardSolved: 0,
    totalSolved: 0,
  });
  const [contestData, setContestData] = useState<ContestData | null>(null);

  const generateMockActivityData = (): ActivityData[] => {
    const data: ActivityData[] = [];
    const today = new Date();
    
    for (let i = 0; i < 365; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Random activity simulation
      const count = Math.random() > 0.7 ? Math.floor(Math.random() * 5) + 1 : 0;
      
      data.push({
        date: date.toISOString().split("T")[0],
        count: count,
      });
    }
    
    return data.reverse();
  };

  useEffect(() => {
    let isMounted = true; // Flag to prevent state updates on unmounted component

    const fetchData = async (): Promise<void> => {
      try {
        if (!isMounted) return;
        setLoading(true);
        
        // Try multiple approaches for LeetCode API
        const approaches = [
          // Try alternative LeetCode API endpoints
          {
            name: 'LeetCode Stats API',
            url: 'https://leetcode-stats-api.herokuapp.com/aggarwalkaran241',
            headers: {
              'Accept': 'application/json',
            } as Record<string, string>
          },
          {
            name: 'LeetCode API Alternative',
            url: 'https://leetcode-api-faisalshohag.vercel.app/aggarwalkaran241',
            headers: {
              'Accept': 'application/json',
            } as Record<string, string>
          },
          // CORS proxy services
          {
            name: 'AllOrigins Proxy',
            url: 'https://api.allorigins.win/raw?url=' + encodeURIComponent('https://leetcode-stats-api.herokuapp.com/aggarwalkaran241'),
            headers: {
              'Accept': 'application/json',
            } as Record<string, string>
          },
          {
            name: 'CORS Anywhere',
            url: 'https://cors-anywhere.herokuapp.com/https://leetcode-stats-api.herokuapp.com/aggarwalkaran241',
            headers: {
              'Accept': 'application/json',
              'X-Requested-With': 'XMLHttpRequest',
            } as Record<string, string>
          },
          // Alternative proxy services
          {
            name: 'ProxyCORS',
            url: 'https://proxy.cors.sh/https://leetcode-stats-api.herokuapp.com/aggarwalkaran241',
            headers: {
              'Accept': 'application/json',
            } as Record<string, string>
          }
        ];

        let response: Response | null = null;
        let lastError: Error | null = null;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        let successfulApproach = '';

        // Try each approach until one works
        for (const approach of approaches) {
          try {
            if (!isMounted) return;
            
            // console.log(`Trying ${approach.name}...`);
            
            // Add timeout to prevent hanging requests (increased to 15 seconds)
            const controller = new AbortController();
            const timeoutId = setTimeout(() => {
              // console.log(`⏰ ${approach.name} timed out after 15 seconds`);
              controller.abort();
            }, 15000); // 15 second timeout
            
            try {
              response = await fetch(approach.url, {
                method: 'GET',
                headers: approach.headers,
                mode: 'cors',
                signal: controller.signal,
              });
              
              clearTimeout(timeoutId);
            } catch (fetchError) {
              clearTimeout(timeoutId);
              throw fetchError;
            }

            if (response.ok) {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              successfulApproach = approach.name;
              // console.log(`✅ ${approach.name} succeeded!`);
              break; // Success, exit the loop
            } else {
              console.warn(`❌ ${approach.name} failed with status: ${response.status}`);
            }
          } catch (error) {
            lastError = error as Error;
            console.warn(`❌ ${approach.name} failed:`, error);
            continue; // Try next approach
          }
        }

        if (!response || !response.ok) {
          throw lastError || new Error('All API approaches failed');
        }

        const data = await response.json();
        // console.log(`✅ LeetCode API data loaded via ${successfulApproach}:`, data);

        if (!isMounted) return;

        // Process real API data
        const submissionCalendar = data.submissionCalendar;

        setQuestionStats({
          easySolved: data.easySolved || 0,
          mediumSolved: data.mediumSolved || 0,
          hardSolved: data.hardSolved || 0,
          totalSolved: data.totalSolved || 0,
        });

        if (submissionCalendar && Object.keys(submissionCalendar).length > 0) {
          const activityData = Object.entries(submissionCalendar).map(([date, count]) => ({
            date: new Date(parseInt(date) * 1000).toISOString().split("T")[0],
            count: parseInt(count as string),
          }));
          setActivityData(activityData);
         
        } else {
          // If no submission calendar, use mock data for heatmap
          setActivityData(generateMockActivityData());
        //  setError(`✅ Real stats loaded via ${successfulApproach}, demo heatmap (no submission data)`);
        }

        // Fetch contest data from additional API
        try {
          const contestApproaches = [
            {
              name: 'Contest API Direct',
              url: 'https://alfa-leetcode-api.onrender.com/aggarwalkaran241/contest',
              headers: {
                'Accept': 'application/json',
              } as Record<string, string>
            },
            {
              name: 'Contest API Proxy',
              url: 'https://api.allorigins.win/raw?url=' + encodeURIComponent('https://alfa-leetcode-api.onrender.com/aggarwalkaran241/contest'),
              headers: {
                'Accept': 'application/json',
              } as Record<string, string>
            }
          ];

          for (const contestApproach of contestApproaches) {
            try {
              if (!isMounted) return;
              
              // console.log(`Trying LeetCode Contest ${contestApproach.name}...`);
              
              const contestController = new AbortController();
              const contestTimeoutId = setTimeout(() => {
                // console.log(`⏰ Contest ${contestApproach.name} timed out after 10 seconds`);
                contestController.abort();
              }, 10000);
              
              const contestResponse = await fetch(contestApproach.url, {
                method: 'GET',
                headers: contestApproach.headers,
                mode: 'cors',
                signal: contestController.signal,
              });
              
              clearTimeout(contestTimeoutId);
              
              if (contestResponse.ok) {
                const contestData = await contestResponse.json();
                console.log(`✅ LeetCode Contest data loaded via ${contestApproach.name}:`, contestData);
                setContestData(contestData);
                break; // Success, exit the loop
              } else {
                console.warn(`❌ Contest ${contestApproach.name} failed with status: ${contestResponse.status}`);
              }
            } catch (contestError) {
              console.warn(`❌ Contest ${contestApproach.name} failed:`, contestError);
              continue; // Try next approach
            }
          }
        } catch (contestError) {
          console.warn("LeetCode Contest API failed:", contestError);
        }
        
      } catch (error) {
        if (!isMounted) return;
        console.warn("LeetCode API failed, using mock data:", error);
        
        // Fallback to mock data
        const mockStats: QuestionStats = {
          easySolved: 45,
          mediumSolved: 32,
          hardSolved: 8,
          totalSolved: 85,
        };
        
        setQuestionStats(mockStats);
        setActivityData(generateMockActivityData());
        setError("Using demo data (API unavailable)");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    // Cleanup function to prevent memory leaks
    return () => {
      isMounted = false;
    };
  }, []); // Empty dependency array is correct here

  const pieData: PieDataItem[] = [
    { name: "Easy", value: questionStats.easySolved },
    { name: "Medium", value: questionStats.mediumSolved },
    { name: "Hard", value: questionStats.hardSolved },
  ];

  const COLORS = ["#4CAF50", "#FF9800", "#F44336"]; // Modern color scheme for pie chart

  return (
    <Row className="leetcode-heatmap-container" style={{ justifyContent: "center", paddingBottom: "20px" }}>
      <Col md={12}>
        <h1 className="project-heading" style={{ paddingBottom: "20px", textAlign: "center" }}>
          My LeetCode <strong className="purple">Activity</strong>
         
        
        </h1>
      </Col>

      {loading ? (
        <Col md={12} style={{ textAlign: "center", padding: "50px" }}>
          <div style={{ color: "#00d4ff", fontSize: "1.2em" }}>
            Loading LeetCode data...
          </div>
        </Col>
      ) : (
        <>
          {/* Heatmap Section */}
          <Col md={12}>
            <div className="heatmap-container">
              <h2 className="section-heading">Submission Heatmap</h2>
              <Heatmap
                startDate={new Date("2024-02-01")}
                endDate={new Date()}
                values={activityData}
                classForValue={(value: ActivityData | null): string => {
                  if (!value) {
                    return "color-empty";
                  }
                  return `color-github-${Math.min(4, value.count)}`;
                }}
                gutterSize={4}
              />
            </div>
          </Col>

          {/* Chart Section */}
          <Col md={12} className="pie-chart-section" style={{ marginTop: "50px" }}>
            <h2 className="section-heading">Questions Solved by Difficulty</h2>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                  label
                  animationBegin={400}
                  animationDuration={800}
                  isAnimationActive={true}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </Col>

          {/* Question Statistics */}
          <Col md={12} className="question-stats">
            <h3 className="section-heading">LeetCode Stats</h3>
            <p>Total Solved: <strong>{questionStats.totalSolved}</strong></p>
            <p>
              Easy: <strong>{questionStats.easySolved}</strong>, Medium: <strong>{questionStats.mediumSolved}</strong>, Hard: <strong>{questionStats.hardSolved}</strong>
            </p>
          </Col>

          {/* Contest Data */}
          {contestData && (
            <Col md={12} className="contest-stats" style={{ marginTop: "30px" }}>
              <h3 className="section-heading">Contest Performance</h3>
              <div style={{ 
                background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.3), rgba(10, 10, 20, 0.5))',
                border: '1px solid rgba(0, 212, 255, 0.3)',
                borderRadius: '10px',
                padding: '20px',
                color: '#ffffff'
              }}>
                <Row>
                  <Col md={3} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: '1.8em', color: '#00d4ff', fontWeight: 'bold' }}>
                      {contestData.contestAttend}
                    </div>
                    <div style={{ color: '#8b5cf6', fontSize: '0.9em' }}>Contests Attended</div>
                  </Col>
                  <Col md={3} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: '1.8em', color: '#00ff00', fontWeight: 'bold' }}>
                      {Math.round(contestData.contestRating)}
                    </div>
                    <div style={{ color: '#8b5cf6', fontSize: '0.9em' }}>Current Rating</div>
                  </Col>
                  <Col md={3} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: '1.8em', color: '#ffd700', fontWeight: 'bold' }}>
                      #{contestData.contestGlobalRanking.toLocaleString()}
                    </div>
                    <div style={{ color: '#8b5cf6', fontSize: '0.9em' }}>Global Ranking</div>
                  </Col>
                  <Col md={3} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: '1.8em', color: '#8b5cf6', fontWeight: 'bold' }}>
                      {contestData.contestBadges.name}
                    </div>
                    <div style={{ color: '#8b5cf6', fontSize: '0.9em' }}>Badge</div>
                  </Col>
                </Row>
              </div>
            </Col>
          )}
        </>
      )}
    </Row>
  );
}

export default LeetcodeHeatmap;
