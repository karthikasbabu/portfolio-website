'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import styles from './Projects.module.css';

import { ScrollReveal } from '../ui/ScrollReveal';
import { TypingHeading } from '../ui/TypingHeading';

const projects = [
  {
    title: 'Kasavidam E-Commerce Website',
    description: 'A modern, high-performance eCommerce platform that brings the beauty of authentic handloom clothing to customers through a fast and seamless digital experience.',
    image: '/kasavidam-canva.png',
    tags: ['Angular', 'Bootstrap', 'Node.js', 'Express.js', 'Razorpay', 'PostgreSQL'],
    link: 'https://www.kasavidam.com/',
    github: 'https://github.com/Nerdience/kasavidam-fe',
    category: 'E-Commerce',
    index: '01',
  },
  {
    title: 'Samagra Learning Platform',
    description: 'A full-stack business learning and entrepreneur growth platform that offers training programs, coaching services, community networking, and performance tools to help entrepreneurs scale and transform their businesses.',
    image: '/samagra-canva.png',
    tags: ['Next.js', 'Strapi CMS', 'PostgreSQL', 'Tailwind CSS', 'Cashfree'],
    link: 'https://samagralearning.com/',
    github: 'https://github.com/Nerdience/samagra-fe',
    category: 'EdTech',
    index: '02',
  },
  {
    title: 'Nerdience Corporate Website',
    description: 'A modern corporate website for an IT solutions company showcasing cloud platforms, AI solutions, digital product engineering, and enterprise technology services.',
    image: '/nerdience-canva.png',
    tags: ['Next.js', 'Tailwind CSS', 'TypeScript', 'Node.js', 'Express.js', 'Resend'],
    link: 'https://nerdience.com/',
    github: 'https://github.com/Nerdience/nerdy-website',
    category: 'Corporate',
    index: '03',
  }
];

const isMobileDevice = () => typeof window !== 'undefined' && (window.innerWidth <= 768 || 'ontouchstart' in window);

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsMobile(isMobileDevice());
  }, []);

  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-80px' });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 180, damping: 28 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 180, damping: 28 });
  const glareX = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%']);

  const glareBackground = useTransform(
    [glareX, glareY],
    ([x, y]) => `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,0.07) 0%, transparent 65%)`
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mounted || isMobile) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    if (!mounted || isMobile) return;
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className={styles.cardWrapper}
      initial={{ opacity: 0, y: 56, scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.78, delay: index * 0.14, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className={`${styles.projectCard} glass`}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      >
        {/* Dynamic glare - Disabled on mobile */}
        {mounted && !isMobile && (
          <motion.div
            className={styles.glare}
            style={{
              background: glareBackground,
            }}
          />
        )}

        {/* Ghost index */}
        <span className={styles.cardIndex}>{project.index}</span>

        {/* Image */}
        <div className={styles.projectImage}>
          <motion.img
            src={project.image}
            alt={project.title}
            whileHover={mounted && !isMobile ? { scale: 1.07 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className={styles.imageFade} />
          <div className={styles.imageOverlay}>
            <div className={styles.projectLinks}>
              <a href={project.github} target="_blank" rel="noopener noreferrer" className={styles.iconBtn}>
                <Github size={17} />
                <span>Source</span>
              </a>
              <a href={project.link} target="_blank" rel="noopener noreferrer" className={styles.iconBtnPrimary}>
                <ArrowUpRight size={17} />
                <span>Live Site</span>
              </a>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className={styles.projectInfo}>
          <div className={styles.metaRow}>
            <span className={styles.categoryBadge}>{project.category}</span>
          </div>

          <h3 className={styles.projectTitle}>{project.title}</h3>
          <p className={styles.projectDescription}>{project.description}</p>

          <div className={styles.projectTags}>
            {project.tags.map(tag => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className={styles.projectsSection}>
      {/* Ambient orbs */}
      <div className={styles.ambientOrb1} />
      <div className={styles.ambientOrb2} />

      <ScrollReveal>
        <div className="container">
          {/* Header — unchanged, exactly as original */}
          <div className={styles.sectionHeader}>
            <p className="retro-subtitle">Work</p>
            <TypingHeading text="Selected Projects" className={styles.sectionTitle} />
          </div>

          <div className={styles.projectsGrid}>
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}