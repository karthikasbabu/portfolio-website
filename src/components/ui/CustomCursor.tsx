'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Github } from 'lucide-react';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isOverText, setIsOverText] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const moveMouse = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible) setIsVisible(true);

            const target = e.target as HTMLElement;
            if (target) {
                const computedStyle = window.getComputedStyle(target);
                setIsOverText(computedStyle.cursor === 'text');
            }
        };

        const handleHoverStart = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const closestInteractive = target.closest('a') || target.closest('button') || target.classList.contains('interactive');
            setIsHovering(!!closestInteractive);
        };

        const handleMouseDown = () => setIsMouseDown(true);
        const handleMouseUp = () => setIsMouseDown(false);
        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener('mousemove', moveMouse);
        window.addEventListener('mouseover', handleHoverStart);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', moveMouse);
            window.removeEventListener('mouseover', handleHoverStart);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [mouseX, mouseY, isVisible]);

    if (!isVisible) return null;

    return (
        <motion.div
            className={styles.cursor}
            style={{
                x: cursorX,
                y: cursorY,
            }}
            animate={{
                scale: isMouseDown ? 0.9 : isHovering ? 1.2 : 1,
                opacity: isOverText ? 0.2 : 1,
            }}
        >
            <motion.div
                animate={{
                    rotate: isHovering ? 360 : 0,
                }}
                transition={{
                    rotate: isHovering ? { duration: 2, repeat: Infinity, ease: "linear" } : { duration: 0.5 }
                }}
            >
                <Github className={styles.githubIcon} size={32} />
            </motion.div>
        </motion.div>
    );
}
