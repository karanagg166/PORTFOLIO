"use client";

import Image from "next/image";
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

export default function ProjectCards(props: ProjectCardsProps) {
    return (
        <div className="project-card-view h-full flex flex-col">
            <div className="relative w-full h-48">
                <Image
                    src={props.imgPath}
                    alt={props.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
            <div className="card-body flex-1 flex flex-col">
                <h3 className="card-title">{props.title}</h3>
                <p className="card-text flex-1">{props.description}</p>
                <div className="flex flex-wrap gap-3 mt-auto">
                    <a
                        className="btn-primary"
                        href={props.ghLink}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <BsGithub />
                        {props.isBlog ? "Blog" : "GitHub"}
                    </a>

                    {!props.isBlog && props.demoLink && (
                        <a
                            className="btn-primary"
                            href={props.demoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <CgWebsite />
                            Demo
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
