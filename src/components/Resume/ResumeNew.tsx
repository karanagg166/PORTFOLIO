import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Particle from "../Particle";
import pdf from "../../Assets/karan_resume.pdf";
import { AiOutlineDownload } from "react-icons/ai";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function ResumeNew(): React.JSX.Element {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  return (
    <div>
      <Container fluid className="resume-section">
        <Particle />
        <Container>
          <Row style={{ justifyContent: "center", position: "relative" }}>
            <Button
              variant="primary"
              href={pdf}
              target="_blank"
              style={{ maxWidth: "250px" }}
            >
              <AiOutlineDownload />
              &nbsp;Download CV
            </Button>
          </Row>

          <Row className="resume">
            <Document
              className="d-flex justify-content-center"
              file={pdf}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page pageNumber={pageNumber} scale={1.7} />
            </Document>
          </Row>

          <Row style={{ justifyContent: "center", position: "relative" }}>
            <Button
              variant="primary"
              onClick={() => {
                setPageNumber(pageNumber - 1);
              }}
              disabled={pageNumber <= 1}
            >
              <AiOutlineDownload />
              &nbsp;Previous
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setPageNumber(pageNumber + 1);
              }}
              disabled={pageNumber >= numPages}
            >
              Next
              <AiOutlineDownload />
            </Button>
          </Row>
        </Container>
      </Container>
    </div>
  );
}

export default ResumeNew;