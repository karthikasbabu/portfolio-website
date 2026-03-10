'use client';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useEffect } from 'react';
import styles from './BackgroundInteractions.module.css';

export default function BackgroundInteractions() {
    const symbols = ['{ }', '< >', '( )', ';', '[ ]', '=>', '//', 'printf', 'const', 'async', 'await', 'import'];

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            mouseX.set((clientX / innerWidth - 0.5) * 50);
            mouseY.set((clientY / innerHeight - 0.5) * 50);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div className={styles.backgroundContainer}>
            {/* Technical Grid Overlay */}
            <motion.div
                className={styles.gridOverlay}
                style={{ x: springX, y: springY }}
            ></motion.div>

            {/* Floating Code Symbols */}
            <div className={styles.symbolsLayer}>
                {Array.from({ length: 25 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className={styles.symbol}
                        style={{
                            top: `${(i * 13.7) % 100}%`,
                            left: `${(i * 19.3) % 100}%`,
                            fontSize: `${(i % 3) * 0.5 + 0.8}rem`,
                            opacity: (i % 5) * 0.04 + 0.06,
                            x: useTransform(springX, x => x * (1 + (i % 3) * 0.5)),
                            y: useTransform(springY, y => y * (1 + (i % 3) * 0.5)),
                            z: (i % 5) * 20,
                        }}
                        animate={{
                            rotateX: [0, 15, -15, 0],
                            rotateY: [0, 20, -20, 0],
                            rotateZ: [0, 360],
                            scale: [1, 1.1, 0.9, 1]
                        }}
                        transition={{
                            duration: 15 + (i % 10),
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    >
                        {symbols[i % symbols.length]}
                    </motion.div>
                ))}
            </div>

            {/* Dynamic Blobs */}
            <div className={styles.blobsLayer}>
                <motion.div
                    className={styles.blob + ' ' + styles.blob1}
                    style={{ x: useTransform(springX, x => x * 0.5), y: useTransform(springY, y => y * 0.5) }}
                    animate={{
                        x: [0, 80, -80, 0],
                        y: [0, -80, 80, 0],
                        scale: [1, 1.2, 0.9, 1],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                ></motion.div>
                <motion.div
                    className={styles.blob + ' ' + styles.blob2}
                    style={{ x: useTransform(springX, x => -x * 0.5), y: useTransform(springY, y => -y * 0.5) }}
                    animate={{
                        x: [0, -80, 80, 0],
                        y: [0, 80, -80, 0],
                        scale: [1, 0.9, 1.2, 1],
                    }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                ></motion.div>
            </div>
        </div>
    );
}
