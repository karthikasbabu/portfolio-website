'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import MagneticButton from '../ui/MagneticButton';
import styles from './Hero.module.css';
import { TypingHeading } from '../ui/TypingHeading';

export default function Hero() {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                damping: 12,
                stiffness: 100,
            }
        },
    };

    return (
        <section id="home" className={styles.heroSection}>
            <div className="container">
                <motion.div
                    className={styles.heroContent}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <h1 className={styles.heroTitle}>
                        <TypingHeading
                            as="span"
                            text="Coding with Passion,"
                            className={styles.heroTitlePrimary}
                            delay={0.5}
                        />
                        <TypingHeading
                            as="span"
                            text="Crafting with Purpose"
                            className={styles.heroTitleSecondary}
                            delay={1.5}
                        />
                    </h1>

                    <motion.p variants={itemVariants} className={styles.heroDescription}>
                        I am a Full Stack Developer with 1 year of experience specializing in
                        building high-performance, visually stunning web applications.
                        Let's turn your vision into a reality.
                    </motion.p>

                    <motion.div variants={itemVariants} className={styles.heroActions}>
                        <MagneticButton>
                            <a href="#projects" className={`${styles.btn} ${styles.btnPrimary}`}>
                                View My Work
                            </a>
                        </MagneticButton>
                        <MagneticButton>
                            <a href="#contact" className={`${styles.btn} ${styles.btnSecondary}`}>
                                Get In Touch
                            </a>
                        </MagneticButton>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
