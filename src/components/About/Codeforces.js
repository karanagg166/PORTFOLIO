import React, { useState, useEffect } from "react";
import Heatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";

function CodeforcesHeatmap() {
  const [activityData, setActivityData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://codeforces.com/api/user.status?handle=KaranCipherKnight`
        );
        const submissions = response.data.result;

        // Check if the response has results
        if (!submissions || submissions.length === 0) {
          throw new Error("No submissions found");
        }

        // Process submissions to create heatmap data
        const data = submissions.map((submission) => {
          const date = new Date(submission.creationTimeSeconds * 1000);
          // Check if date is valid
          if (!isNaN(date)) {
            return { date: date.toISOString().split("T")[0], count: 1 };
          }
          return null; // In case of an invalid date
        }).filter(item => item); // Filter out any null values

        // Aggregate counts for the same date
        const aggregatedData = Object.values(
          data.reduce((acc, { date, count }) => {
            acc[date] = acc[date] || { date, count: 0 };
            acc[date].count += count;
            return acc;
          }, {})
        );

        setActivityData(aggregatedData);
      } catch (error) {
        console.error("Error fetching Codeforces data:", error);
        setError("Failed to fetch data. Please try again later.");
      }
    };

    fetchData();
  }, []);

  return (
    <Container fluid className="codeforces-section">
      <Particle />
      <Container>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <h1 className="project-heading" style={{ paddingBottom: "20px" }}>
            My Codeforces <strong className="purple">Activity</strong>
          </h1>
          {error ? (
            <div style={{ color: 'red' }}>{error}</div> // Display error message if fetch fails
          ) : (
            <Col md={12} style={{ paddingBottom: "50px" }}>
              <Heatmap
                startDate={new Date('2024-01-01')}
                endDate={new Date()}
                values={activityData}
                classForValue={(value) => {
                  if (!value) {
                    return "color-empty";
                  }
                  return `color-github-${Math.min(4, value.count)}`;
                }}
                gutterSize={4}
              />
            </Col>
          )}
        </Row>
      </Container>
    </Container>
  );
}

export default CodeforcesHeatmap;
