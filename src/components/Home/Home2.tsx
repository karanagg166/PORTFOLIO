"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Particle from "@/components/Particle";
import { Code2, Cpu, Globe as GlobeIcon, Sparkles } from "lucide-react";
import {
    AiFillGithub,
    AiOutlineTwitter,
    AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { FadeInUp, FadeInLeft, FloatingAnimation } from "@/components/ui/AnimatedSection";
import { SpringCard, SpringFloat, SpringGlow } from "@/components/animations/SpringAnimations";

export default function Home2() {
    const socialLinks = [
        { href: "https://github.com/karanagg166", icon: AiFillGithub, label: "GitHub" },
        { href: "https://twitter.com/karanagg166", icon: AiOutlineTwitter, label: "Twitter" },
        { href: "https://www.linkedin.com/in/karan-aggarwal-166/", icon: FaLinkedinIn, label: "LinkedIn" },
        { href: "https://www.instagram.com/karanagg166/", icon: AiFillInstagram, label: "Instagram" },
    ];

    const floatingIcons = [
        { Icon: Code2, delay: 0, position: "top-10 left-10" },
        { Icon: Cpu, delay: 0.5, position: "top-20 right-20" },
        { Icon: GlobeIcon, delay: 1, position: "bottom-20 left-20" },
        { Icon: Sparkles, delay: 1.5, position: "bottom-10 right-10" },
    ];

    return (
        <div className="home-about-section relative overflow-hidden">
            <Particle />

            {/* Floating Background Icons using lucide-react with SpringFloat */}
            {floatingIcons.map(({ Icon, delay, position }, index) => (
                <SpringFloat key={index} delay={delay * 1000} className={`absolute ${position} opacity-10 hidden md:block`}>
                    <Icon size={60} color="#00d4ff" />
                </SpringFloat>
            ))}

            <div className="section-container relative z-10">
                <div className="grid md:grid-cols-12 gap-8">
                    <FadeInLeft className="md:col-span-8 home-about-description">
                        <motion.h1
                            className="text-3xl md:text-4xl font-bold mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            LET ME <span className="purple">INTRODUCE</span> MYSELF
                        </motion.h1>
                        <motion.div
                            className="home-about-body space-y-4"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <p>
                                I fell in love with programming and I have at least learnt
                                something, I think… 🤷‍♂️
                            </p>
                            <p>
                                I am fluent in classics like
                                <b className="purple"> C++, Javascript and Go.</b>
                            </p>
                            <p>
                                My field of Interest&apos;s are building new
                                <b className="purple"> Web Technologies and Products </b>
                                and also in areas related to
                                <b className="purple"> Machine Learning</b>.
                            </p>
                            <p>
                                Whenever possible, I also apply my passion for developing products
                                with <b className="purple">Node.js</b> and
                                <i>
                                    <b className="purple"> Modern Javascript Frameworks</b>
                                </i>
                                &nbsp; like
                                <i>
                                    <b className="purple"> React.js and Next.js</b>
                                </i>
                            </p>
                        </motion.div>
                    </FadeInLeft>

                    <FadeInUp className="md:col-span-4 myAvtar">
                        {/* SpringGlow wrapping avatar for pulsing glow effect */}
                        <SpringGlow color="#00d4ff" className="rounded-full">
                            <FloatingAnimation>
                                <Image
                                    src="/images/avatar.jpeg"
                                    alt="avatar"
                                    width={300}
                                    height={300}
                                    className="rounded-full"
                                    priority
                                />
                            </FloatingAnimation>
                        </SpringGlow>
                    </FadeInUp>
                </div>

                <div className="home-about-social mt-16">
                    <motion.h1
                        className="text-2xl md:text-3xl font-bold mb-6"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        FIND ME ON
                    </motion.h1>
                    <p className="text-gray-300 mb-8">
                        Feel free to <span className="purple">connect</span> with me
                    </p>

                    {/* Social links with SpringCard hover effect */}
                    <ul className="home-about-social-links">
                        {socialLinks.map(({ href, icon: Icon, label }, index) => (
                            <li key={index} className="social-icons">
                                <SpringCard>
                                    <a
                                        href={href}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="home-social-icons"
                                        aria-label={label}
                                    >
                                        <Icon size={24} />
                                    </a>
                                </SpringCard>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
