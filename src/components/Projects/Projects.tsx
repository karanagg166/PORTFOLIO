import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import Particle from "../Particle";
import ProjectCard from "./ProjectCards";
import { projectImages } from "./projectImages";

function Projects(): React.JSX.Element {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="project-heading">
            My Recent <strong className="purple">Works </strong>
          </h1>
          <p style={{ color: "white" }}>
            Here are a few projects I've worked on recently.
          </p>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
            <Col md={4} className="project-card">
              <motion.div variants={itemVariants}>
                <ProjectCard
                  imgPath={projectImages.walletTrack}
                  isBlog={false}
                  title="Wallet-Track"
                  description="A comprehensive financial management application designed for organizations to track, visualize, and manage their income and expenses. Features advanced data visualization, expense categorization, budget planning, financial reporting, and real-time analytics to help businesses make informed financial decisions."
                  ghLink="https://github.com/karanagg166/wallet-track"
                  demoLink="https://wallet-track-demo.vercel.app/"
                />
              </motion.div>
            </Col>

            <Col md={4} className="project-card">
              <motion.div variants={itemVariants}>
                <ProjectCard
                  imgPath={projectImages.bookRecommender}
                  isBlog={false}
                  title="Book-Recommender"
                  description="An intelligent book recommendation system powered by advanced machine learning algorithms. Utilizes content-based filtering and hybrid recommendation techniques to provide personalized book suggestions based on user preferences, reading history, and book characteristics. Features collaborative filtering and sentiment analysis."
                  ghLink="https://github.com/karanagg166/Book-recommender"
                  demoLink="https://book-recommender-demo.herokuapp.com/"
                />
              </motion.div>
            </Col>

            <Col md={4} className="project-card">
              <motion.div variants={itemVariants}>
                <ProjectCard
                  imgPath={projectImages.quickClinic}
                  isBlog={false}
                  title="QuickClinic"
                  description="A comprehensive healthcare management platform that streamlines patient-doctor interactions and appointment scheduling. Features patient registration, doctor profiles, appointment booking, medical records management, prescription tracking, and automated notifications for seamless healthcare delivery."
                  ghLink="https://github.com/karanagg166/quickclinic"
                  demoLink="https://quickclinic-demo.vercel.app/"
                />
              </motion.div>
            </Col>

            <Col md={4} className="project-card">
              <motion.div variants={itemVariants}>
                <ProjectCard
                  imgPath={projectImages.shopSizzle}
                  isBlog={false}
                  title="Shop Sizzle"
                  description="A full-featured e-commerce platform inspired by Amazon, built with modern web technologies. Includes user authentication, product catalog, shopping cart, payment integration, order management, inventory tracking, seller dashboard, and advanced search functionality with filtering and recommendations."
                  ghLink="https://github.com/karanagg166/shop-sizzle"
                  demoLink="https://shop-sizzle-demo.vercel.app/"
                />
              </motion.div>
            </Col>

            <Col md={4} className="project-card">
              <motion.div variants={itemVariants}>
                <ProjectCard
                  imgPath={projectImages.fusionCollege}
                  isBlog={false}
                  title="Fusion College Website"
                  description="A modern, responsive college website featuring dynamic content management, student portal integration, event management, course catalog, faculty profiles, and interactive campus maps. Built with accessibility in mind and optimized for performance across all devices."
                  ghLink="https://github.com/karanagg166/fusion-college"
                  demoLink="https://fusion-college.edu/"
                />
              </motion.div>
            </Col>

            <Col md={4} className="project-card">
              <motion.div variants={itemVariants}>
                <ProjectCard
                  imgPath={projectImages.portfolio}
                  isBlog={false}
                  title="Modern Portfolio"
                  description="A cutting-edge personal portfolio website showcasing modern web development skills. Features 3D animations, interactive elements, smooth transitions, responsive design, and advanced UI components. Built with React, TypeScript, Framer Motion, and modern CSS techniques for optimal user experience."
                  ghLink="https://github.com/karanagg166/PORTFOLIO"
                  demoLink="https://karanagg166.github.io/PORTFOLIO/"
                />
              </motion.div>
            </Col>
          </Row>
        </motion.div>
      </Container>
    </Container>
  );
}

export default Projects;