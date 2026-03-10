'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
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
    github: 'https://github.com/Nerdience/kasavidam-fe'
  },
  {
    title: 'Samagra Learning Platform',
    description: 'A full-stack business learning and entrepreneur growth platform that offers training programs, coaching services, community networking, and performance tools to help entrepreneurs scale and transform their businesses.',
    image: '/samagra-canva.png',
    tags: ['Next.js', 'Strapi CMS', 'PostgreSQL', 'Tailwind CSS', 'Cashfree'],
    link: 'https://samagralearning.com/',
    github: 'https://github.com/Nerdience/samagra-fe'
  },
  {
    title: 'Nerdience Corporate Website',
    description: 'A modern corporate website for an IT solutions company showcasing cloud platforms, AI solutions, digital product engineering, and enterprise technology services.',
    image: '/nerdience-canva.png',
    tags: ['Next.js', 'Tailwind CSS', 'TypeScript', 'Node.js', 'Express.js', 'Resend'],
    link: 'https://nerdience.com/',
    github: 'https://github.com/Nerdience/nerdy-website'
  }
];

export default function Projects() {
  return (
    <section id="projects" className={styles.projectsSection}>
      <ScrollReveal>
        <div className="container">
          <div className={styles.sectionHeader}>
            <p className="retro-subtitle">Work</p>
            <TypingHeading text="Selected Projects" className={styles.sectionTitle} />
          </div>

          <div className={styles.projectsGrid}>
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className={`${styles.projectCard} glass`}
                whileHover={{ y: -10 }}
              >
                <div className={styles.projectImage}>
                  <img src={project.image} alt={project.title} />
                  <div className={styles.imageOverlay}>
                    <div className={styles.projectLinks}>
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className={`${styles.iconBtn} glass`}><Github size={20} /></a>
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className={`${styles.iconBtn} glass`}><ExternalLink size={20} /></a>
                    </div>
                  </div>
                </div>
                <div className={styles.projectInfo}>
                  <div className={styles.projectTags}>
                    {project.tags.map(tag => <span key={tag} className={styles.tag}>{tag}</span>)}
                  </div>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.projectDescription}>{project.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
