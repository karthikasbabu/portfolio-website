'use client';

import React from 'react';
import styles from './Logo.module.css';

interface LogoProps {
    className?: string;
}

export default function Logo({ className }: LogoProps) {
    return (
        <div className={`${styles.logoContainer} ${className}`}>
            <div className={styles.terminalLogo}>
                <div className={styles.terminalHeader}>
                    <div className={`${styles.dot} ${styles.dotRed}`}></div>
                    <div className={`${styles.dot} ${styles.dotYellow}`}></div>
                    <div className={`${styles.dot} ${styles.dotGreen}`}></div>
                </div>
                <div className={styles.terminalBody}>
                    <span className={styles.terminalPrompt}>&gt;</span>
                    <span className={styles.terminalChar}>K</span>
                    <span className={styles.terminalCursor}></span>
                </div>
            </div>
        </div>
    );
}
