import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
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
            <a
              className="btn btn-primary"
              href={pdf}
              target="_blank"
              rel="noopener noreferrer"
              style={{ maxWidth: "250px", textDecoration: 'none', color: 'white' }}
            >
              <AiOutlineDownload />
              &nbsp;Download CV
            </a>
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
            <button
              className="btn btn-primary"
              onClick={() => {
                setPageNumber(pageNumber - 1);
              }}
              disabled={pageNumber <= 1}
              style={{ marginRight: "10px" }}
            >
              <AiOutlineDownload />
              &nbsp;Previous
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                setPageNumber(pageNumber + 1);
              }}
              disabled={pageNumber >= numPages}
            >
              Next
              <AiOutlineDownload />
            </button>
          </Row>
        </Container>
      </Container>
    </div>
  );
}

export default ResumeNew;