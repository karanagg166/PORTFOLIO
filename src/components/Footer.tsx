"use client";

import {
    AiFillGithub,
    AiOutlineTwitter,
    AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
    const year = new Date().getFullYear();

    const socialLinks = [
        { href: "https://github.com/karanagg166", icon: AiFillGithub, label: "GitHub" },
        { href: "https://twitter.com/karanagg166", icon: AiOutlineTwitter, label: "Twitter" },
        { href: "https://www.linkedin.com/in/karan-aggarwal-166/", icon: FaLinkedinIn, label: "LinkedIn" },
        { href: "https://www.instagram.com/karanagg166/", icon: AiFillInstagram, label: "Instagram" },
    ];

    return (
        <footer className="footer">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-center md:text-left">
                        <h3 className="text-sm text-gray-300">Designed and Developed by Karan Agg</h3>
                    </div>

                    <div className="text-center">
                        <h3 className="text-sm text-gray-300">Copyright © {year} KA</h3>
                    </div>

                    <ul className="footer-icons">
                        {socialLinks.map((link) => {
                            const Icon = link.icon;
                            return (
                                <li key={link.label} className="social-icons">
                                    <a
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={link.label}
                                    >
                                        <Icon />
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </footer>
    );
}
