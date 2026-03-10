'use client';

import React from 'react';
import { TechMarquee } from '../ui/TechMarquee';
import styles from './TechStacks.module.css';

export default function TechStacks() {
    return (
        <section className={styles.techStackSection}>
            <div className={styles.dividerTop}></div>
            <div className={styles.marqueeContainer}>
                <TechMarquee />
            </div>
            <div className={styles.dividerBottom}></div>
        </section>
    );
}
