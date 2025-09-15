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

function LeetcodeHeatmap(): React.JSX.Element {
  const [activityData, setActivityData] = useState<ActivityData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [questionStats, setQuestionStats] = useState<QuestionStats>({
    easySolved: 0,
    mediumSolved: 0,
    hardSolved: 0,
    totalSolved: 0,
  });

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await fetch(
          `https://leetcode-stats-api.herokuapp.com/aggarwalkaran241`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log(data);

        const submissionCalendar = data.submissionCalendar;

        setQuestionStats({
          easySolved: data.easySolved,
          mediumSolved: data.mediumSolved,
          hardSolved: data.hardSolved,
          totalSolved: data.totalSolved,
        });

        if (!submissionCalendar || Object.keys(submissionCalendar).length === 0) {
          throw new Error("No submissions found");
        }

        const activityData = Object.entries(submissionCalendar).map(([date, count]) => ({
          date: new Date(parseInt(date) * 1000).toISOString().split("T")[0],
          count: parseInt(count as string),
        }));

        setActivityData(activityData);
      } catch (error) {
        console.error("Error fetching LeetCode data:", error);
        setError("Failed to fetch data. Please try again later.");
      }
    };

    fetchData();
  }, []);

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

      {error ? (
        <div style={{ color: "red" }}>{error}</div>
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
                  animationBegin={400} // Animation
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
        </>
      )}
    </Row>
  );
}

export default LeetcodeHeatmap;
