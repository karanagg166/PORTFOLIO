"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { CgGitFork, CgFileDocument } from "react-icons/cg";
import {
    AiFillStar,
    AiOutlineHome,
    AiOutlineFundProjectionScreen,
    AiOutlineUser,
    AiOutlineMail,
} from "react-icons/ai";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY >= 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { href: "/", label: "Home", icon: AiOutlineHome },
        { href: "/about", label: "About", icon: AiOutlineUser },
        { href: "/project", label: "Projects", icon: AiOutlineFundProjectionScreen },
        { href: "/resume", label: "Resume", icon: CgFileDocument },
        { href: "/contact", label: "Contact", icon: AiOutlineMail },
    ];

    return (
        <nav className={`navbar ${isScrolled ? "sticky" : ""}`}>
            <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <Image
                        src="/images/karan.jpeg"
                        alt="Karan Aggarwal"
                        width={40}
                        height={40}
                        className="logo"
                        priority
                    />
                </Link>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden flex flex-col gap-1.5 p-2"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={`w-6 h-0.5 bg-cyan-400 transition-all ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
                    <span className={`w-6 h-0.5 bg-cyan-400 transition-all ${isMobileMenuOpen ? "opacity-0" : ""}`}></span>
                    <span className={`w-6 h-0.5 bg-cyan-400 transition-all ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
                </button>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-2">
                    {navLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`nav-link ${pathname === link.href ? "text-cyan-400" : ""}`}
                            >
                                <Icon className="text-lg" />
                                {link.label}
                            </Link>
                        );
                    })}

                    {/* Theme Toggle */}
                    <ThemeToggle />

                    {/* GitHub Fork Button */}
                    <a
                        href="https://github.com/karanagg166/PORTFOLIO"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="fork-btn"
                    >
                        <CgGitFork />
                        <AiFillStar />
                    </a>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-lg md:hidden">
                        <div className="flex flex-col p-4">
                            {navLinks.map((link) => {
                                const Icon = link.icon;
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`nav-link py-3 ${pathname === link.href ? "text-cyan-400" : ""}`}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <Icon className="text-lg" />
                                        {link.label}
                                    </Link>
                                );
                            })}
                            <div className="flex items-center gap-4 mt-4">
                                <ThemeToggle />
                                <a
                                    href="https://github.com/karanagg166/PORTFOLIO"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="fork-btn justify-center flex-1"
                                >
                                    <CgGitFork />
                                    <AiFillStar />
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
