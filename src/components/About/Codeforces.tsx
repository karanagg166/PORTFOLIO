import React, { useState, useEffect } from "react";
import Heatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";

interface ActivityData {
  date: string;
  count: number;
}

function CodeforcesHeatmap(): React.JSX.Element {
  const [activityData, setActivityData] = useState<ActivityData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true; // Flag to prevent state updates on unmounted component

    const fetchData = async (): Promise<void> => {
      try {
        if (!isMounted) return;

        // Try multiple approaches for Codeforces API
        const approaches = [
          // Direct API call (might work in some environments)
          {
            name: 'Direct API',
            url: 'https://codeforces.com/api/user.status?handle=KaranCipherKnight',
            headers: {
              'Accept': 'application/json',
            } as Record<string, string>
          },
          // CORS proxy services
          {
            name: 'AllOrigins Proxy',
            url: 'https://api.allorigins.win/raw?url=' + encodeURIComponent('https://codeforces.com/api/user.status?handle=KaranCipherKnight'),
            headers: {
              'Accept': 'application/json',
            } as Record<string, string>
          },
          {
            name: 'CORS Anywhere',
            url: 'https://cors-anywhere.herokuapp.com/https://codeforces.com/api/user.status?handle=KaranCipherKnight',
            headers: {
              'Accept': 'application/json',
              'X-Requested-With': 'XMLHttpRequest',
            } as Record<string, string>
          },
          // Alternative proxy services
          {
            name: 'ProxyCORS',
            url: 'https://proxy.cors.sh/https://codeforces.com/api/user.status?handle=KaranCipherKnight',
            headers: {
              'Accept': 'application/json',
            } as Record<string, string>
          }
        ];

        let response: Response | null = null;
        let lastError: Error | null = null;
        let successfulApproach = '';

        // Try each approach until one works
        for (const approach of approaches) {
          try {
            if (!isMounted) return;
            
            console.log(`Trying Codeforces ${approach.name}...`);
            
            // Add timeout to prevent hanging requests (increased to 15 seconds)
            const controller = new AbortController();
            const timeoutId = setTimeout(() => {
              console.log(`⏰ Codeforces ${approach.name} timed out after 15 seconds`);
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
              successfulApproach = approach.name;
              console.log(`✅ Codeforces ${approach.name} succeeded!`);
              break; // Success, exit the loop
            } else {
              console.warn(`❌ Codeforces ${approach.name} failed with status: ${response.status}`);
            }
          } catch (error) {
            lastError = error as Error;
            console.warn(`❌ Codeforces ${approach.name} failed:`, error);
            continue; // Try next approach
          }
        }

        if (!response || !response.ok) {
          throw lastError || new Error('All Codeforces API approaches failed');
        }

        const data = await response.json();
        console.log(`✅ Codeforces API data loaded via ${successfulApproach}:`, data);

        if (!isMounted) return;

        const submissions = data.result;

        // Check if the response has results
        if (!submissions || submissions.length === 0) {
          throw new Error("No submissions found");
        }

        // Process submissions to create heatmap data
        const processedData = submissions.map((submission: any): ActivityData | null => {
          const date = new Date(submission.creationTimeSeconds * 1000);
          // Check if date is valid
          if (!isNaN(date.getTime())) {
            return { date: date.toISOString().split("T")[0], count: 1 };
          }
          return null; // In case of an invalid date
        }).filter((item: ActivityData | null): item is ActivityData => item !== null);

        // Aggregate counts for the same date
        const aggregatedData: ActivityData[] = Object.values(
          processedData.reduce((acc: Record<string, ActivityData>, { date, count }: ActivityData) => {
            acc[date] = acc[date] || { date, count: 0 };
            acc[date].count += count;
            return acc;
          }, {})
        );

        setActivityData(aggregatedData);
        setError(`✅ Real data loaded via ${successfulApproach}`);
      } catch (error) {
        if (!isMounted) return;
        console.error("Error fetching Codeforces data:", error);
        
        // Fallback to mock data
        const generateMockData = (): ActivityData[] => {
          const data: ActivityData[] = [];
          const today = new Date();
          
          for (let i = 0; i < 180; i++) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            
            // Random activity simulation
            const count = Math.random() > 0.8 ? Math.floor(Math.random() * 3) + 1 : 0;
            
            data.push({
              date: date.toISOString().split("T")[0],
              count: count,
            });
          }
          
          return data.reverse();
        };

        setActivityData(generateMockData());
        setError("Using demo data (API unavailable)");
      }
    };

    fetchData();

    // Cleanup function to prevent memory leaks
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Container fluid className="codeforces-section">
      <Particle />
      <Container>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <h1 className="project-heading" style={{ paddingBottom: "20px" }}>
            My Codeforces <strong className="purple">Activity</strong>
          </h1>
          {error && (
            <div style={{ 
              color: error.includes('✅') ? '#00d4ff' : '#ff6b6b', 
              fontSize: '0.9em',
              marginBottom: '20px',
              textAlign: 'center',
              fontWeight: '500'
            }}>
              {error}
            </div>
          )}
          <Col md={12} style={{ paddingBottom: "50px" }}>
            <Heatmap
              startDate={new Date('2024-01-01')}
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
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default CodeforcesHeatmap;
