'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Phone, Github, Linkedin } from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';
import styles from './Contact.module.css';

import { ScrollReveal } from '../ui/ScrollReveal';
import Toast from '../ui/Toast';
import { TypingHeading } from '../ui/TypingHeading';

import emailjs from '@emailjs/browser';

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ isVisible: boolean; message: string; type: 'success' | 'error' }>({
    isVisible: false,
    message: '',
    type: 'success',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
      const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '';
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';

      if (!serviceID || !templateID || !publicKey) {
        console.error('EmailJS configuration missing');
        setToast({
          isVisible: true,
          message: 'Email configuration missing.',
          type: 'error',
        });
        setIsSubmitting(false);
        return;
      }

      await emailjs.send(
        serviceID,
        templateID,
        {
          name: formState.name,
          email: formState.email,
          message: formState.message,
          title: `New Message from ${formState.name}`,
          time: new Date().toLocaleString(),
        },
        publicKey
      );

      setToast({
        isVisible: true,
        message: 'Message sent successfully! I will get back to you soon.',
        type: 'success',
      });
      setFormState({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Failed to send email:', error);
      setToast({
        isVisible: true,
        message: 'Failed to send message. Please try again.',
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className={styles.contactSection}>
      <ScrollReveal>
        <div className="container">
          <div className={styles.sectionHeader}>
            <p className="retro-subtitle">Contact</p>
            <TypingHeading text="Let's Connect" className={styles.sectionTitle} />
          </div>

          <div className={styles.contactGrid}>
            <div className={styles.contactInfo}>
              <div className={`${styles.infoCard} glass`}>
                <h3 className={styles.cardTitle}>Contact Information</h3>
                <div className={styles.infoItems}>
                  <div className={styles.infoItem}>
                    <Mail className={styles.infoIcon} size={20} />
                    <a href="mailto:karthikasbabu4@gmail.com" className={styles.emailLink}>
                      karthikasbabu4@gmail.com
                    </a>
                  </div>
                  <div className={styles.infoItem}>
                    <MapPin className={styles.infoIcon} size={20} />
                    <span>Cochin, Kerala</span>
                  </div>
                </div>

                <div className={styles.socialLinks}>
                  <a href="https://github.com/karthikasbabu" target="_blank" rel="noopener noreferrer">
                    <MagneticButton className={`${styles.socialBtn} glass`}><Github size={20} /></MagneticButton>
                  </a>
                  <a href="https://www.linkedin.com/in/karthika-s-babu-5a02683a1/" target="_blank" rel="noopener noreferrer">
                    <MagneticButton className={`${styles.socialBtn} glass`}><Linkedin size={20} /></MagneticButton>
                  </a>
                </div>
              </div>
            </div>

            <div className={styles.contactFormContainer}>
              <form className={`${styles.contactForm} glass`} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label>Name</label>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Message</label>
                  <textarea
                    rows={5}
                    placeholder="Tell me about your project..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    required
                  ></textarea>
                </div>

                <MagneticButton className={styles.submitBtnWrapper}>
                  <button
                    type="submit"
                    className={styles.submitBtn}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    <Send size={18} style={{ marginLeft: '8px' }} />
                  </button>
                </MagneticButton>
              </form>
            </div>
          </div>
        </div>
      </ScrollReveal>

      <Toast
        isVisible={toast.isVisible}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />
    </section>
  );
}
