'use client';

import React, { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring, motion } from 'framer-motion';

interface CountingNumberProps {
    value: number;
    duration?: number;
    suffix?: string;
    className?: string;
}

export const CountingNumber = ({ value, duration = 2, suffix = '', className }: CountingNumberProps) => {
    const ref = useRef<HTMLSpanElement>(null);
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {
        duration: duration * 1000,
        bounce: 0,
    });
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (isInView) {
            motionValue.set(value);
        }
    }, [isInView, value, motionValue]);

    useEffect(() => {
        const unsubscribe = springValue.on("change", (latest: number) => {
            if (ref.current) {
                ref.current.textContent = Intl.NumberFormat("en-US").format(Math.round(latest)) + suffix;
            }
        });
        return () => unsubscribe();
    }, [springValue, suffix]);

    return (
        <span
            ref={ref}
            className={className}
        />
    );
};
