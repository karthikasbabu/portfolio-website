import React from 'react';
import Logo from '../ui/Logo';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footerSection}>
      <div className={`container ${styles.footerContent}`}>
        <Logo />
        <p className={styles.copyright}>
          © {new Date().getFullYear()} • Crafted with passion by <span className={styles.textWhite}>KARTH!KA.</span>
        </p>
        <div className={styles.footerStatus}>
          <span className={styles.statusDot}></span>
          Available for new projects
        </div>
      </div>
    </footer>
  );
}
