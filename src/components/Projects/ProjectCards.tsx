import React from "react";
import Card from "react-bootstrap/Card";
import { CgWebsite } from "react-icons/cg";
import { BsGithub } from "react-icons/bs";

interface ProjectCardsProps {
  imgPath: string;
  isBlog: boolean;
  title: string;
  description: string;
  ghLink: string;
  demoLink?: string;
}

function ProjectCards(props: ProjectCardsProps): React.JSX.Element {
  return (
    <Card className="project-card-view">
      <Card.Img variant="top" src={props.imgPath} alt="card-img" />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text style={{ textAlign: "justify" }}>
          {props.description}
        </Card.Text>
        <a 
          className="btn btn-primary" 
          href={props.ghLink} 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ textDecoration: 'none', color: 'white' }}
        >
          <BsGithub /> &nbsp;
          {props.isBlog ? "Blog" : "GitHub"}
        </a>
        {"\n"}
        {"\n"}

        {/* If the component contains Demo link and if it's not a Blog then, it will render the below component  */}

        {!props.isBlog && props.demoLink && (
          <a
            className="btn btn-primary"
            href={props.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginLeft: "10px", textDecoration: 'none', color: 'white' }}
          >
            <CgWebsite /> &nbsp;
            {"Demo"}
          </a>
        )}
      </Card.Body>
    </Card>
  );
}

export default ProjectCards;
