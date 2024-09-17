import React from "react";
import { Col, Row } from "react-bootstrap";
import {
  SiVisualstudiocode,
  SiPostman,
  SiVercel,
  SiMacos,
  SiDocker,
  SiAmazonaws,
  SiGooglecloud,
  SiMicrosoftazure,
  SiPrisma,
} from "react-icons/si";

function Toolstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      <Col xs={4} md={2} className="tech-icons">
        <SiMacos />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiVisualstudiocode />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiPostman />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiVercel />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiDocker />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiAmazonaws />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiGooglecloud />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiMicrosoftazure />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiPrisma />
      </Col>
    </Row>
  );
}

export default Toolstack;
