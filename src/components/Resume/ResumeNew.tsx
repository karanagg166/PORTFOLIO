import React, { useState, useEffect } from "react";
import { Container, Row, Button } from "react-bootstrap";
import Particle from "../Particle";
import pdf from "../../Assets/karan_resume.pdf";
import { AiOutlineDownload } from "react-icons/ai";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

// Set the worker source for pdfjs
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function ResumeNew(): React.JSX.Element {
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Update the width on window resize
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Function to handle document load errors
  const onLoadError = (error: Error) => {
    console.error("Error loading PDF:", error);
    setError(error.message || "Failed to load PDF");
  };

  return (
    <Container fluid className="resume-section">
      <Particle />

      <Row style={{ justifyContent: "center", marginBottom: "20px" }}>
        <Button
          variant="primary"
          href={pdf}
          target="_blank"
          style={{ maxWidth: "250px" }}
          aria-label="Download CV"
        >
          <AiOutlineDownload />
          &nbsp;Download CV
        </Button>
      </Row>

      <Row className="resume" style={{ justifyContent: "center" }}>
        {error ? (
          <p>Error: {error}</p>
        ) : (
          <Document file={pdf} onLoadError={onLoadError}>
            <Page pageNumber={1} scale={width > 786 ? 1.7 : 0.6} />
          </Document>
        )}
      </Row>
    </Container>
  );
}

export default ResumeNew;
