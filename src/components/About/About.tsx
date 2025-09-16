import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import Aboutcard from "./AboutCard";
import karanImg from "../../Assets/karan.jpeg";
import Techstack from "./Techstack";
import Toolstack from "./Toolstack";
import Github from "./Github";
import Leetcode from "./leetcode";
import Codeforces from "./Codeforces";

function About(): React.JSX.Element {
  return (
    <Container fluid className="about-section">
      <Particle />
      <Container>
        <Row className="justify-content-center">
          <Col
            md={7}
            className="d-flex flex-column justify-content-center pt-8 pb-12"
          >
            <h1 className="text-center md:text-left">
              Know Who <strong className="purple">I'M</strong>
            </h1>
            <Aboutcard />
          </Col>
          <Col
            md={5}
            className="pt-20 md:pt-32 pb-12 flex justify-center"
          >
            <img
              src={karanImg}
              alt="about"
              className="img-fluid"
              style={{ maxHeight: "450px" }}
            />
          </Col>
        </Row>
        <h1 className="purple">
          Professional <strong className="purple">Skillset</strong>
        </h1>

        <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
          <Techstack />
        </Row>
        <h1 className="purple">
          <strong className="purple">Tools</strong> I use
        </h1>
        <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
          <Toolstack />
        </Row>
        <Codeforces />
        <Leetcode />
        <Github />
       
      </Container>
    </Container>
  );
}

export default About;