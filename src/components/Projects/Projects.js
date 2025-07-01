import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import leaf from "../../Assets/Projects/leaf.png";

import editor from "../../Assets/Projects/codeEditor.png";
import chatify from "../../Assets/Projects/chatify.png";

import bitsOfCode from "../../Assets/Projects/blog.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={chatify}
              isBlog={false}
              title="Quick-Clinic"
              description="A smart healthcare platform enabling real-time chat and video consultations between patients and doctors. Features include appointment booking, medical history tracking, doctor availability, and secure digital interactions."
              ghLink="https://github.com/karanagg166/quickclinic"
              demoLink="https://quickclinic-49jb4atli-karan-aggarwals-projects.vercel.app/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={bitsOfCode}
              isBlog={false}
              title="Penny Saver"
              description="A personal finance tracker with interactive date-based analytics. Users can log daily transactions, view financial trends through graphs, categorize expenses, and generate reports—making budgeting smarter and more efficient."
              ghLink="https://github.com/karanagg166/PennySaver"
              demoLink="https://penny-saver-r26w9jga7-karan-aggarwals-projects.vercel.app/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={editor}
              isBlog={false}
              title="Task-Flow"
              description="A smart task management app designed for productivity. Features include task creation, deadline tracking, status updates, and category filters — all within a clean, user-friendly interface to streamline daily workflows.
    
"
              ghLink="https://github.com/karanagg166/TaskFlow"
              demoLink="https://task-flow-qu2dg91bw-karan-aggarwals-projects.vercel.app/"              
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={leaf}
              isBlog={false}
              title="Shop Sizzle"
              description="A scalable e-commerce platform built with TypeScript. Features include advanced product search and filters, secure checkout, real-time order tracking, and user account management — optimized for high-volume transactions and seamless shopping."
              ghLink="https://github.com/karanagg166/ShopSizzle"
              demoLink="https://github.com/karanagg166/ShopSizzle"
            />
          </Col>
           <Col md={4} className="project-card">
            <ProjectCard
              imgPath={leaf}
              isBlog={false}
              title="Stock-Pilot"
              description="A real-time stock tracking and portfolio management tool. Users can monitor live prices, analyze trends, and manage their investments efficiently — all through an intuitive dashboard designed for informed trading decisions."
              ghLink="https://github.com/karanagg166/stockpilot"
              demoLink="https://github.com/karanagg166/stockpilot"
            />
          </Col>
         
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
