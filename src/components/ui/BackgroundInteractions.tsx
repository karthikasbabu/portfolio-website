'use client';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useEffect, useState } from 'react';
import styles from './BackgroundInteractions.module.css';

const symbols = ['{ }', '< >', '( )', ';', '[ ]', '=>', '//', 'printf', 'const', 'async', 'await', 'import'];

function FloatingSymbol({ i, springX, springY, total, mounted, isMobile }: { i: number, springX: any, springY: any, total: number, mounted: boolean, isMobile: boolean }) {
    const x = useTransform(springX, (val: number) => val * (0.5 + (i % 3) * 0.2));
    const y = useTransform(springY, (val: number) => val * (0.5 + (i % 3) * 0.2));

    if (i >= total) return null;

    return (
        <motion.div
            className={styles.symbol}
            style={{
                top: `${(i * (100 / (isMobile ? 8 : 25))) % 100}%`,
                left: `${(i * 19.3) % 100}%`,
                fontSize: `${(i % 3) * 0.4 + 0.7}rem`,
                opacity: (i % 5) * 0.03 + 0.05,
                x,
                y,
            }}
            animate={mounted && !isMobile ? {
                rotateX: [0, 15, -15, 0],
                rotateY: [0, 20, -20, 0],
                rotateZ: [0, 360],
                scale: [1, 1.1, 0.9, 1]
            } : {}}
            transition={mounted && !isMobile ? {
                duration: 15 + (i % 10),
                repeat: Infinity,
                ease: "linear",
            } : {}}
        >
            {symbols[i % symbols.length]}
        </motion.div>
    );
}

function AnimatedBlob({ className, springX, springY, factor, reverse = false }: { className: string, springX: any, springY: any, factor: number, reverse?: boolean }) {
    const x = useTransform(springX, (val: number) => (reverse ? -val : val) * factor);
    const y = useTransform(springY, (val: number) => (reverse ? -val : val) * factor);

    return (
        <motion.div
            className={className}
            style={{ x, y }}
            animate={{
                x: reverse ? [0, -80, 80, 0] : [0, 80, -80, 0],
                y: reverse ? [0, 80, -80, 0] : [0, -80, 80, 0],
                scale: reverse ? [1, 0.9, 1.2, 1] : [1, 1.2, 0.9, 1],
            }}
            transition={{
                duration: reverse ? 30 : 25,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        />
    );
}

export default function BackgroundInteractions() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    const [mounted, setMounted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setMounted(true);
        setIsMobile(window.innerWidth <= 768);
    }, []);

    const symbolCount = isMobile ? 8 : 25;

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
                    <FloatingSymbol
                        key={i}
                        i={i}
                        springX={springX}
                        springY={springY}
                        total={symbolCount}
                        mounted={mounted}
                        isMobile={isMobile}
                    />
                ))}
            </div>

            {/* Dynamic Blobs */}
            <div className={styles.blobsLayer}>
                <AnimatedBlob
                    className={styles.blob + ' ' + styles.blob1}
                    springX={springX}
                    springY={springY}
                    factor={0.5}
                />
                <AnimatedBlob
                    className={styles.blob + ' ' + styles.blob2}
                    springX={springX}
                    springY={springY}
                    factor={0.5}
                    reverse
                />
            </div>
        </div>
    );
}
