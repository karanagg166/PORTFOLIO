"use client";

import { ImPointRight } from "react-icons/im";

export default function AboutCard() {
    return (
        <div className="quote-card-view">
            <blockquote className="blockquote mb-0">
                <p className="text-justify mb-4">
                    Hi everyone, I am <span className="purple">Karan Aggarwal </span>
                    from <span className="purple">Faridabad, Haryana.</span>
                    <br />
                    I am a student at PDPM IIITDMJ, Jabalpur, Madhya Pradesh.
                    <br />
                    Apart from coding, here are some other activities that I love:
                </p>
                <ul className="space-y-2 mb-4">
                    <li className="about-activity">
                        <ImPointRight className="text-cyan-400" /> Playing chess and badminton
                    </li>
                    <li className="about-activity">
                        <ImPointRight className="text-cyan-400" /> Watching movies and series
                    </li>
                    <li className="about-activity">
                        <ImPointRight className="text-cyan-400" /> Traveling and exploring
                    </li>
                </ul>
                <p className="text-purple-400 italic">
                    &quot;Strive to build things that make a difference!&quot;
                </p>
                <footer className="text-sm text-gray-400 mt-4">— Karan Aggarwal</footer>
            </blockquote>
        </div>
    );
}
