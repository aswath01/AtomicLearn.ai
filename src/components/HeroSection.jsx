/* eslint-disable no-unused-vars */
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { ArrowRight, PlayCircle, Sparkles, Pencil, Book } from 'lucide-react';
import { Link } from 'react-router-dom';

const FloatingIcon = ({ children, delay, x, y, rotate }) => (
    <motion.div
        animate={{
            y: [0, -15, 0],
            rotate: [rotate - 5, rotate + 5, rotate - 5]
        }}
        transition={{
            duration: 4,
            delay: delay,
            repeat: Infinity,
            ease: "easeInOut"
        }}
        style={{
            position: 'absolute',
            top: y,
            left: x,
            background: 'white',
            padding: '1rem',
            borderRadius: '1rem',
            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
            zIndex: 1
        }}
    >
        {children}
    </motion.div>
);

const HeroSection = () => {
    const { t } = useLanguage();

    return (
        <section id="home" style={{ padding: '6rem 1rem 8rem', position: 'relative', overflow: 'hidden' }}>
            <div className="container hero-grid">

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{ position: 'relative', zIndex: 10 }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.5rem 1rem',
                            background: '#EEF2FF',
                            color: '#4F46E5',
                            borderRadius: '9999px',
                            fontWeight: 600,
                            fontSize: '0.9rem',
                            marginBottom: '1.5rem',
                            border: '1px solid #C7D2FE'
                        }}
                    >
                        <Sparkles size={16} />
                        <span>AI-Powered Education Platform</span>
                    </motion.div>

                    <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1, marginBottom: '1.5rem', color: '#111827' }}>
                        {t('heroTitle').split('. ')[0]}.
                        <span style={{ display: 'block', color: '#4F46E5', position: 'relative' }}>
                            {t('heroTitle').split('. ')[1]}.
                            {/* Underline decoration */}
                            <svg width="100%" height="15" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', bottom: -5, left: 0, width: '200px', zIndex: -1 }}>
                                <path d="M2.00025 6.99997C35.5002 2.99997 101.5 -1.50003 197.5 4.99997" stroke="#FCD34D" strokeWidth="4" strokeLinecap="round" />
                            </svg>
                        </span>
                    </h1>

                    <p style={{ fontSize: '1.25rem', color: '#4B5563', marginBottom: '2.5rem', maxWidth: '550px', lineHeight: 1.6 }}>
                        {t('heroDescription')}
                    </p>

                    <div className="btn-container" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <Link to="/teacher-demo" style={{ textDecoration: 'none' }}>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="btn btn-primary"
                                style={{ fontSize: '1.125rem', display: 'flex', alignItems: 'center' }}
                            >
                                {t('forTeachers')} <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />
                            </motion.button>
                        </Link>
                        <Link to="/student-demo" style={{ textDecoration: 'none' }}>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="btn btn-secondary"
                                style={{ fontSize: '1.125rem', display: 'flex', alignItems: 'center' }}
                            >
                                {t('forStudents')} <PlayCircle size={20} style={{ marginLeft: '0.5rem' }} />
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>

                {/* Visuals */}
                <div className="hero-visuals">
                    {/* Blob Background */}
                    <motion.div
                        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
                        transition={{ duration: 10, repeat: Infinity }}
                        style={{ position: 'absolute', width: '100%', height: '100%', background: 'linear-gradient(120deg, #E0E7FF 0%, #F5F3FF 100%)', borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%', zIndex: 0 }}
                    />

                    {/* Main 3D Card Simulator */}
                    <motion.div
                        initial={{ opacity: 0, y: 50, rotateX: 10 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        style={{
                            position: 'relative',
                            width: '90%',
                            background: 'rgba(255,255,255,0.8)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '1.5rem',
                            padding: '1.5rem',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                            zIndex: 2,
                            border: '1px solid rgba(255,255,255,0.5)'
                        }}
                    >
                        {/* Mock Browser Header */}
                        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#EF4444' }} />
                            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#F59E0B' }} />
                            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#10B981' }} />
                        </div>

                        {/* Mock Content */}
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <div style={{ flex: 1 }}>
                                <div style={{ height: '20px', width: '60%', background: '#E5E7EB', borderRadius: '4px', marginBottom: '0.75rem' }} />
                                <div style={{ height: '140px', background: '#F3F4F6', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9CA3AF' }}>
                                    <PlayCircle size={48} />
                                </div>
                            </div>
                            <div style={{ width: '35%' }}>
                                <div style={{ height: '20px', width: '80%', background: '#E5E7EB', borderRadius: '4px', marginBottom: '0.75rem' }} />
                                <div style={{ height: '12px', width: '100%', background: '#F3F4F6', borderRadius: '4px', marginBottom: '0.5rem' }} />
                                <div style={{ height: '12px', width: '100%', background: '#F3F4F6', borderRadius: '4px', marginBottom: '0.5rem' }} />
                                <div style={{ height: '12px', width: '70%', background: '#F3F4F6', borderRadius: '4px', marginBottom: '1rem' }} />
                                <div style={{ height: '30px', width: '100%', background: '#4F46E5', borderRadius: '0.5rem', opacity: 0.8 }} />
                            </div>
                        </div>
                    </motion.div>

                    {/* Floating Helpers */}
                    <FloatingIcon delay={0} x="5%" y="10%" rotate={-10}><Book size={24} color="#F59E0B" /></FloatingIcon>
                    <FloatingIcon delay={1} x="85%" y="20%" rotate={10}><Pencil size={24} color="#EC4899" /></FloatingIcon>
                    <FloatingIcon delay={2} x="10%" y="80%" rotate={-5}><span style={{ fontSize: '1.5rem' }}>⚛️</span></FloatingIcon>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
