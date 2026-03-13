'use client';

import React from 'react';
import styles from './Logo.module.css';

interface LogoProps {
    className?: string;
}

export default function Logo({ className }: LogoProps) {
    return (
        <div className={`${styles.logoContainer} ${className}`}>
            <img
                src="/karthika-logo.png"
                alt="Karthika Logo"
                className={styles.logoImage}
            />
        </div>

    );
}
