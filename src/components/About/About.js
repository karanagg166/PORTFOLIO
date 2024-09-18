import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import Github from "./Github";
import Techstack from "./Techstack";
import Aboutcard from "./AboutCard";
import karanImg from "../../Assets/karanportfolio.jpeg";
import Toolstack from "./Toolstack";
import CodeforcesHeatmap from "./Codeforces";
import CodingHandles from "./CodingHandles";

function About() {
  return (
    <Container fluid className="about-section">
      <Particle />
      <Container>
        <Row style={{ justifyContent: "center", padding: "10px" }}>
          <Col
            md={7}
            style={{
              justifyContent: "center",
              paddingTop: "30px",
              paddingBottom: "50px",
            }}
          >
            <h1 style={{ fontSize: "2.1em", paddingBottom: "20px" }}>
              Know Who <strong className="purple">I'M</strong>
            </h1>
            <Aboutcard />
          </Col>
          <Col
            md={5}
            style={{ paddingTop: "120px", paddingBottom: "50px" }}
            className="about-img"
          >
           <img
  src={karanImg}
  alt="about"
  className="img-fluid"
  style={{
    width: "350px", // Adjust the size as needed
    height: "390px",
    borderRadius: "50%", // Makes the image round
    objectFit: "cover", // Ensures the image covers the area without distortion
    display: "block", // Ensures proper alignment
    margin: "0 auto" // Centers the image horizontally
  }}
/>

          </Col>
        </Row>
        <h1 className="project-heading">
          Professional <strong className="purple">Skillset </strong>
        </h1>

        <Techstack />

        <h1 className="project-heading">
          <strong className="purple">Tools</strong> I use
        </h1>
        <Toolstack />

        <Github />
        <CodeforcesHeatmap />
        <CodingHandles />
      </Container>
    </Container>
  );
}

export default About;
