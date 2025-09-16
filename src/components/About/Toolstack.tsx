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

function Toolstack(): React.JSX.Element {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      <Col xs={4} md={2} className="tech-icons" title="macOS">
        <SiMacos />
      </Col>
      <Col xs={4} md={2} className="tech-icons" title="Visual Studio Code">
        <SiVisualstudiocode />
      </Col>
      <Col xs={4} md={2} className="tech-icons" title="Postman">
        <SiPostman />
      </Col>
      <Col xs={4} md={2} className="tech-icons" title="Vercel">
        <SiVercel />
      </Col>
      <Col xs={4} md={2} className="tech-icons" title="Docker">
        <SiDocker />
      </Col>
      <Col xs={4} md={2} className="tech-icons" title="Amazon AWS">
        <SiAmazonaws />
      </Col>
      <Col xs={4} md={2} className="tech-icons" title="Google Cloud">
        <SiGooglecloud />
      </Col>
      <Col xs={4} md={2} className="tech-icons" title="Microsoft Azure">
        <SiMicrosoftazure />
      </Col>
      <Col xs={4} md={2} className="tech-icons" title="Prisma">
        <SiPrisma />
      </Col>
    </Row>
  );
}

export default Toolstack;
