'use client';

import React, { useRef } from 'react';
import { motion, Variants } from 'framer-motion';
import styles from './Skills.module.css';

import { ScrollReveal } from '../ui/ScrollReveal';
import { TypingHeading } from '../ui/TypingHeading';

const skillCategories = [
  {
    title: 'Frontend Architecture',
    skills: ['HTML', 'CSS', 'Javascript', 'React', 'Next.js', 'Typescript', 'Framer Motion', 'Tailwind', 'Bootstrap', 'Angular']
  },
  {
    title: 'Backend & Systems',
    skills: ['Node.js', 'Express.js', 'Strapi CMS', 'Python', 'Django', 'PostgreSQL', 'MySQL', 'MongoDB']
  },
  {
    title: 'DevOps & Infrastructure',
    skills: ['Git', 'GitHub', 'Vercel']
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const categoryVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 12
    }
  }
};

const skillVariants: Variants = {
  hidden: { scale: 0, opacity: 0, y: 20 },
  skillRest: {
    scale: 1,
    opacity: 1,
    y: 0,
    rotateX: 0,
    rotateY: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    color: 'var(--text-secondary)',
    boxShadow: '0 0 0px rgba(0,0,0,0)',
    zIndex: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 260,
      damping: 20
    }
  },
  skillActive: {
    y: -10,
    scale: 1.1,
    rotateX: -10,
    rotateY: 10,
    backgroundColor: 'var(--text-secondary)',
    color: '#ffffff',
    boxShadow: '0 15px 30px rgba(94, 75, 122, 0.25)',
    zIndex: 20,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 15
    }
  }
};

function CategoryCard({ category, catIndex }: { category: any, catIndex: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = React.useState<{ x: number, y: number, duration: number }[]>([]);

  React.useEffect(() => {
    setParticles(
      Array.from({ length: 6 }).map(() => ({
        x: Math.random() * 250,
        y: Math.random() * 150,
        duration: 5 + Math.random() * 5
      }))
    );
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <motion.div
      ref={cardRef}
      key={catIndex}
      className={`${styles.skillCategory} glass`}
      variants={categoryVariants}
      onMouseMove={handleMouseMove}
      style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
    >
      <div className={styles.particleContainer}>
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className={styles.particle}
            initial={{
              x: p.x,
              y: p.y,
              opacity: 0.1
            }}
            animate={{
              y: [p.y, p.y - 40, p.y],
              opacity: [0.1, 0.3, 0.1],
              rotate: [0, 360]
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {i % 2 === 0 ? '0' : '1'}
          </motion.div>
        ))}
      </div>

      <h3 className={styles.categoryTitle}>{category.title}</h3>
      <div className={styles.skillsList}>
        {category.skills.map((skill: string) => (
          <motion.div
            key={skill}
            className={`${styles.skillTag} interactive`}
            variants={skillVariants}
            whileHover="skillActive"
            initial="hidden"
            animate="skillRest"
          >
            {skill}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className={styles.skillsSection}>
      <ScrollReveal>
        <div className="container">
          <div className={styles.sectionHeader}>
            <p className="retro-subtitle">Tech</p>
            <TypingHeading text="Technical Expertise" className={styles.sectionTitle} />
          </div>


          <motion.div
            className={styles.skillsGrid}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {skillCategories.map((category, catIndex) => (
              <CategoryCard key={catIndex} category={category} catIndex={catIndex} />
            ))}
          </motion.div>
        </div>
      </ScrollReveal>
    </section>
  );
}
