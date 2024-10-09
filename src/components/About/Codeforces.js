import React, { useState, useEffect } from "react";
import Heatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import axios from "axios";
import { Row } from "react-bootstrap";

function CodeforcesHeatmap() {
  const [activityData, setActivityData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://codeforces.com/api/user.status?handle=KaranCipherKnight`
        );
        const submissions = response.data.result;
        console.log(response.data.result);
        console.log(response.data);
        
        // Process submissions to create heatmap data
        const data = submissions.map((submission) => {
          const date = new Date(submission.creationTimeSeconds * 1000).toISOString().split("T")[0];
          return { date: date, count: 1 };
        });

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
      }
    };

    fetchData();
  }, []);

  return (
    <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
      <h1 className="project-heading" style={{ paddingBottom: "20px" }}>
        My Codeforces <strong className="purple">Activity</strong>
      </h1>
      <Heatmap
        startDate={new Date('2023-01-01')}
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
    </Row>
  );
}

export default CodeforcesHeatmap;
