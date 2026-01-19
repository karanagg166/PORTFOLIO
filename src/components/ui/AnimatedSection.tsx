"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedSectionProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

export const FadeInUp = ({ children, className = "", delay = 0 }: AnimatedSectionProps) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay }}
        viewport={{ once: true }}
        className={className}
    >
        {children}
    </motion.div>
);

export const FadeInLeft = ({ children, className = "", delay = 0 }: AnimatedSectionProps) => (
    <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay }}
        viewport={{ once: true }}
        className={className}
    >
        {children}
    </motion.div>
);

export const FadeInRight = ({ children, className = "", delay = 0 }: AnimatedSectionProps) => (
    <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay }}
        viewport={{ once: true }}
        className={className}
    >
        {children}
    </motion.div>
);

export const ScaleIn = ({ children, className = "", delay = 0 }: AnimatedSectionProps) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay }}
        viewport={{ once: true }}
        className={className}
    >
        {children}
    </motion.div>
);

export const StaggerContainer = ({ children, className = "" }: Omit<AnimatedSectionProps, "delay">) => (
    <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
            hidden: { opacity: 0 },
            visible: {
                opacity: 1,
                transition: {
                    staggerChildren: 0.1,
                },
            },
        }}
        className={className}
    >
        {children}
    </motion.div>
);

export const StaggerItem = ({ children, className = "" }: Omit<AnimatedSectionProps, "delay">) => (
    <motion.div
        variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
        }}
        className={className}
    >
        {children}
    </motion.div>
);

export const HoverScale = ({ children, className = "" }: Omit<AnimatedSectionProps, "delay">) => (
    <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={className}
    >
        {children}
    </motion.div>
);

export const FloatingAnimation = ({ children, className = "" }: Omit<AnimatedSectionProps, "delay">) => (
    <motion.div
        animate={{
            y: [0, -10, 0],
        }}
        transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
        }}
        className={className}
    >
        {children}
    </motion.div>
);
