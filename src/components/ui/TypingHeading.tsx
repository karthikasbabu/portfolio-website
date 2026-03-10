'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';

interface TypingHeadingProps {
    text: string;
    className?: string;
    as?: 'h1' | 'h2' | 'h3' | 'span';
    delay?: number;
}

export const TypingHeading: React.FC<TypingHeadingProps> = ({
    text,
    className,
    as = 'h2',
    delay = 0
}) => {
    const Tag = as;

    const containerVariants: Variants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: delay,
            },
        },
    };

    const letterVariants: Variants = {
        hidden: { opacity: 0, display: 'none' },
        visible: {
            opacity: 1,
            display: 'inline-block',
        },
    };

    return (
        <Tag className={className}>
            <motion.span
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                {text.split('').map((char, index) => (
                    <motion.span
                        key={`${char}-${index}`}
                        variants={letterVariants}
                    >
                        {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                ))}
            </motion.span>
        </Tag>
    );
};
