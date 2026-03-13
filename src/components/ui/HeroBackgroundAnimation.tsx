'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './HeroBackgroundAnimation.module.css';

export default function HeroBackgroundAnimation() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let time = 0;

        const resize = () => {
            const parent = canvas.parentElement;
            if (parent) {
                canvas.width = parent.clientWidth;
                canvas.height = parent.clientHeight;
            }
        };

        window.addEventListener('resize', resize);
        resize();

        // Theme colors from CSS variables
        const getThemeColors = () => {
            if (typeof window === 'undefined') return ['#ded4e8', '#c7395f', '#e8ba40'];
            const style = getComputedStyle(document.documentElement);
            return [
                style.getPropertyValue('--bg-primary').trim() || '#ded4e8',
                style.getPropertyValue('--accent-primary').trim() || '#c7395f',
                style.getPropertyValue('--accent-secondary').trim() || '#e8ba40',
            ];
        };

        const colors = getThemeColors();

        const animate = () => {
            time += 0.005;

            const { width, height } = canvas;
            ctx.clearRect(0, 0, width, height);

            // Create a complex fluid-like gradient
            // We'll draw 3-4 large blobs that move around
            const blobs = [
                {
                    x: width * 0.5 + Math.cos(time * 0.7) * width * 0.2,
                    y: height * 0.5 + Math.sin(time * 0.5) * height * 0.2,
                    r: width * 0.7,
                    color: colors[0],
                },
                {
                    x: width * 0.2 + Math.sin(time * 0.4) * width * 0.1,
                    y: height * 0.3 + Math.cos(time * 0.6) * height * 0.1,
                    r: width * 0.6,
                    color: colors[1],
                },
                {
                    x: width * 0.8 + Math.cos(time * 0.5) * width * 0.15,
                    y: height * 0.7 + Math.sin(time * 0.4) * height * 0.15,
                    r: width * 0.5,
                    color: colors[2],
                }
            ];

            blobs.forEach((blob, i) => {
                const gradient = ctx.createRadialGradient(
                    blob.x, blob.y, 0,
                    blob.x, blob.y, blob.r
                );

                // Use very soft transitions
                gradient.addColorStop(0, blob.color + '33'); // 20% opacity
                gradient.addColorStop(0.5, blob.color + '11'); // 7% opacity
                gradient.addColorStop(1, 'transparent');

                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, width, height);
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        // Optimization: only animate if on screen or if not low power mode 
        // Simplified: just animate
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    if (!mounted) return null;

    return (
        <div className={styles.backgroundWrapper}>
            <canvas ref={canvasRef} className={styles.canvas} />
            <div className={styles.overlay} />
        </div>
    );
}
