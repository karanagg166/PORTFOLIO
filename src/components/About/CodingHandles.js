import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { SiLeetcode, SiCodechef, SiGeeksforgeeks, SiCodeforces } from "react-icons/si";

function CodingHandles() {
  return (
    <Container fluid style={{ textAlign: "center", paddingBottom: "50px" }}>
      <Row>
        <Col>
          <h3 style={{ marginBottom: "20px" }}>Coding Handles:</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", justifyContent: "center", gap: "30px" }}>
            <li style={{ display: "inline-block", textAlign: "center" }}>
              <a
                href="https://codeforces.com/profile/KaranCipherKnight"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Codeforces Profile"
                style={{ color: "inherit", textDecoration: "none", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "50px", height: "50px", position: "relative", zIndex: 1 }}
              >
                <SiCodeforces size={50} style={{ color: "#1F8AC4" }} />
              </a>
              <h6 style={{ marginTop: "5px", color: "#1F8AC4" }}>Codeforces</h6>
            </li>

            <li style={{ display: "inline-block", textAlign: "center" }}>
              <a
                href="https://leetcode.com/u/aggarwalkaran241/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LeetCode Profile"
                style={{ color: "inherit", textDecoration: "none", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "50px", height: "50px", position: "relative", zIndex: 1 }}
              >
                <SiLeetcode size={50} style={{ color: "#FFA116" }} />
              </a>
              <h6 style={{ marginTop: "5px", color: "#FFA116" }}>LeetCode</h6>
            </li>

            <li style={{ display: "inline-block", textAlign: "center" }}>
              <a
                href="https://www.codechef.com/users/your_username" // Replace with actual username
                target="_blank"
                rel="noopener noreferrer"
                aria-label="CodeChef Profile"
                style={{ color: "inherit", textDecoration: "none", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "50px", height: "50px", position: "relative", zIndex: 1 }}
              >
                <SiCodechef size={50} style={{ color: "#8B4513" }} />
              </a>
              <h6 style={{ marginTop: "5px", color: "#8B4513" }}>CodeChef</h6>
            </li>

            <li style={{ display: "inline-block", textAlign: "center" }}>
              <a
                href="https://www.geeksforgeeks.org/user/aggarwalklmvk/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GeeksforGeeks Profile"
                style={{ color: "inherit", textDecoration: "none", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "50px", height: "50px", position: "relative", zIndex: 1 }}
              >
                <SiGeeksforgeeks size={50} style={{ color: "#4CAF50" }} />
              </a>
              <h6 style={{ marginTop: "5px", color: "#4CAF50" }}>GeeksforGeeks</h6>
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
}

export default CodingHandles;
