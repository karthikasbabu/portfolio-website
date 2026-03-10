'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';
import styles from './Toast.module.css';

interface ToastProps {
    message: string;
    type: 'success' | 'error';
    isVisible: boolean;
    onClose: () => void;
    duration?: number;
}

export default function Toast({ message, type, isVisible, onClose, duration = 5000 }: ToastProps) {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, onClose]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className={styles.toastContainer}
                    initial={{ opacity: 0, y: 50, scale: 0.9, x: '-50%' }}
                    animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
                    exit={{ opacity: 0, scale: 0.9, y: 20, x: '-50%' }}
                    transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                >
                    <div className={`${styles.toast} ${styles[type]}`}>
                        <div className={styles.terminalHeader}>
                            <div className={styles.dots}>
                                <div className={styles.dotRed}></div>
                                <div className={styles.dotYellow}></div>
                                <div className={styles.dotGreen}></div>
                            </div>
                            <div className={styles.terminalTitle}>System Notification</div>
                            <button onClick={onClose} className={styles.closeBtn}>
                                <X size={14} />
                            </button>
                        </div>
                        <div className={styles.terminalBody}>
                            <div className={styles.iconContainer}>
                                {type === 'success' ? (
                                    <CheckCircle2 size={20} className={styles.successIcon} />
                                ) : (
                                    <AlertCircle size={20} className={styles.errorIcon} />
                                )}
                            </div>
                            <div className={styles.content}>
                                <p className={styles.message}>{message}</p>
                            </div>
                        </div>
                        <motion.div
                            className={styles.progressBar}
                            initial={{ width: '100%' }}
                            animate={{ width: 0 }}
                            transition={{ duration: duration / 1000, ease: 'linear' }}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
