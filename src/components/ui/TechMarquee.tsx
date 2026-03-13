'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './TechMarquee.module.css';

const techLogos = [
    { name: 'HTML5', slug: 'html5' },
    { name: 'CSS3', slug: 'css3' },
    { name: 'JavaScript', slug: 'javascript' },
    { name: 'TypeScript', slug: 'typescript' },
    { name: 'React', slug: 'react' },
    { name: 'Next.js', slug: 'nextdotjs' },
    { name: 'Node.js', slug: 'nodedotjs' },
    { name: 'Express', slug: 'express' },
    { name: 'Angular', slug: 'angular' },
    { name: 'Python', slug: 'python' },
    { name: 'Django', slug: 'django' },
    { name: 'PostgreSQL', slug: 'postgresql' },
    { name: 'MongoDB', slug: 'mongodb' },
    { name: 'Tailwind CSS', slug: 'tailwindcss' },
    { name: 'Bootstrap', slug: 'bootstrap' },
    { name: 'Framer', slug: 'framer' },
    { name: 'GitHub', slug: 'github' },
    { name: 'Git', slug: 'git' },
    { name: 'Vercel', slug: 'vercel' },
    { name: 'Strapi', slug: 'strapi' },
    { name: 'Resend', slug: 'resend' },
    { name: 'SendGrid', slug: 'sendgrid' },
    { name: 'Razorpay', slug: 'razorpay' },
    { name: 'Cashfree', slug: 'cashfree' },
    { name: 'EmailJS', slug: 'mailfwd' },
];

export const TechMarquee = () => {
    // Duplicate the array to create a seamless loop
    const doubledLogos = [...techLogos, ...techLogos, ...techLogos];

    return (
        <div className={styles.marqueeContainer}>
            <motion.div
                className={styles.marqueeContent}
                animate={{
                    x: [0, -1035], // Approximate half of the doubled content width
                }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 30,
                        ease: "linear",
                    },
                }}
            >
                {doubledLogos.map((tech, index) => (
                    <motion.div
                        key={`${tech.slug}-${index}`}
                        className={styles.techIcon}
                        whileHover={{ scale: 1.2, color: 'var(--accent-primary)' }}
                    >
                        <img
                            src={`https://cdn.simpleicons.org/${tech.slug}/5e4b7a`}
                            alt={tech.name}
                            className={styles.svgIcon}
                        />
                        <span className={styles.techName}>{tech.name}</span>
                    </motion.div>
                ))}
            </motion.div>

            {/* Gradient overlays for smooth fading at edges */}
            <div className={styles.overlayLeft}></div>
            <div className={styles.overlayRight}></div>
        </div>
    );
};
