import React, { useState, useEffect } from "react";
import Heatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";


function LeetcodeHeatmap() {
  const [activityData, setActivityData] = useState([]);
  const [error, setError] = useState(null);
  const [questionStats, setQuestionStats] = useState({
    easySolved: 0,
    mediumSolved: 0,
    hardSolved: 0,
    totalSolved: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://leetcode-stats-api.herokuapp.com/aggarwalkaran241`
        );
        console.log(response);

        const submissionCalendar = response.data.submissionCalendar;

        setQuestionStats({
          easySolved: response.data.easySolved,
          mediumSolved: response.data.mediumSolved,
          hardSolved: response.data.hardSolved,
          totalSolved: response.data.totalSolved,
        });

        if (!submissionCalendar || Object.keys(submissionCalendar).length === 0) {
          throw new Error("No submissions found");
        }

        const data = Object.entries(submissionCalendar).map(([date, count]) => ({
          date: new Date(parseInt(date) * 1000).toISOString().split("T")[0],
          count: parseInt(count),
        }));

        setActivityData(data);
      } catch (error) {
        console.error("Error fetching LeetCode data:", error);
        setError("Failed to fetch data. Please try again later.");
      }
    };

    fetchData();
  }, []);

  const pieData = [
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
                classForValue={(value) => {
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
