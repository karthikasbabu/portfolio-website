'use client';

import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Monitor, Terminal, Cpu } from 'lucide-react';
import { ScrollReveal } from '../ui/ScrollReveal';
import styles from './About.module.css';
import { CountingNumber } from '../ui/CountingNumber';
import { TypingHeading } from '../ui/TypingHeading';

const stats = [
  { label: 'Year Experience', value: 1, suffix: '+' },
  { label: 'Projects', value: 10, suffix: '+' },
  { label: 'Lines of Code', value: 10, suffix: 'k+' },
  { label: 'Technologies', value: 15, suffix: '+' },
];

export default function About() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 100 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(springY, [-200, 200], [10, -10]);
  const rotateY = useTransform(springX, [-200, 200], [-10, 10]);

  const bgX = useTransform(springX, [-200, 200], [15, -15]);
  const bgY = useTransform(springY, [-200, 200], [15, -15]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section id="about" className={styles.aboutSection}>
      <ScrollReveal>
        <div className="container">
          <p className="retro-subtitle">Who I Am</p>
          <TypingHeading text="Beyond the Pixels" className={styles.sectionTitle} />
          <p className={styles.aboutBio}>
            I’m Karthika S Babu, a Full Stack Developer dedicated to crafting modern, high-performance web applications. I combine clean architecture, thoughtful design, and practical problem-solving to build digital products that are reliable, scalable, and user-focused.
          </p>

          <div className={styles.aboutGrid}>
            <div
              className={styles.aboutImageContainer}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <motion.div
                className={styles.secondaryFrame}
                style={{
                  x: bgX,
                  y: bgY,
                }}
              />

              <motion.div
                className={styles.imageCard}
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: 'preserve-3d',
                }}
              >
                <div className={styles.imageOverlay} />
                <span className={`${styles.corner} ${styles.topRight}`} />
                <span className={`${styles.corner} ${styles.bottomLeft}`} />
                <div className={styles.scanLine} />

                <Image
                  src="/karthika-img.jpeg"
                  alt="Karthika S Babu"
                  width={400}
                  height={400}
                  className={styles.profileImage}
                  priority
                />
              </motion.div>
              <div className={styles.floatingElements}>
                <div className={styles.floatItem}>
                  <Monitor className="text-secondary" size={24} />
                </div>
                <div className={styles.floatItem}>
                  <Terminal className="text-primary" size={24} />
                </div>
                <div className={styles.floatItem}>
                  <Cpu className="text-secondary" size={24} />
                </div>
              </div>
            </div>

            <div className={styles.aboutContent}>
              <div className={styles.statsGrid}>
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className={styles.statItem}
                  >
                    <div className={styles.statNumber}>
                      <div className={styles.statValue}>
                        <CountingNumber
                          value={stat.value}
                          suffix={stat.suffix}
                        />
                      </div>
                    </div>
                    <span className={styles.statLabel}>{stat.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
