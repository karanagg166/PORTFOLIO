"use client";

import { DiCode } from "react-icons/di";
import {
    SiPostman,
    SiVercel,
    SiMacos,
    SiDocker,
    SiAmazon,
    SiGooglecloud,
    SiPrisma,
} from "react-icons/si";
import { VscCode, VscAzure } from "react-icons/vsc";

const toolStack = [
    { icon: SiMacos, title: "macOS" },
    { icon: VscCode, title: "Visual Studio Code" },
    { icon: SiPostman, title: "Postman" },
    { icon: SiVercel, title: "Vercel" },
    { icon: SiDocker, title: "Docker" },
    { icon: SiAmazon, title: "Amazon AWS" },
    { icon: SiGooglecloud, title: "Google Cloud" },
    { icon: VscAzure, title: "Microsoft Azure" },
    { icon: SiPrisma, title: "Prisma" },
];

export default function Toolstack() {
    return (
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
            {toolStack.map((tool, index) => {
                const Icon = tool.icon;
                return (
                    <div key={index} className="tech-icons" title={tool.title}>
                        <Icon />
                    </div>
                );
            })}
        </div>
    );
}
