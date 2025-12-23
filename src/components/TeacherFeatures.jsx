/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, FileText, CheckCircle, BrainCircuit, PlayCircle, Loader2, Save, Share2, MousePointer2, Menu } from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, active, id }) => (
    <div
        id={`tab-${id}`}
        style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            width: '100%',
            padding: '0.75rem 1rem',
            borderRadius: '0.5rem',
            background: active ? '#EEF2FF' : 'transparent',
            color: active ? '#4F46E5' : '#4B5563',
            fontWeight: active ? 600 : 500,
            transition: 'all 0.3s',
            position: 'relative'
        }}
    >
        <Icon size={20} />
        {label}
    </div>
);

const TeacherFeatures = () => {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState('video');
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const [isClicking, setIsClicking] = useState(false);

    // Simplified Auto-Loop Logic
    useEffect(() => {
        const tabs = ['video', 'notes', 'quiz'];
        let currentIndex = 0;

        const interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % tabs.length;
            setIsClicking(true);
            setTimeout(() => setIsClicking(false), 300);
            setActiveTab(tabs[currentIndex]);
        }, 4000); // Change every 4 seconds

        return () => clearInterval(interval);
    }, []);

    // Calculate cursor Y position based on active tab
    const getCursorY = () => {
        switch (activeTab) {
            case 'video': return 110; // Approximate pixel values relative to sidebar top
            case 'notes': return 170;
            case 'quiz': return 230;
            default: return 0;
        }
    };

    return (
        <section id="features" style={{ padding: '4rem 1rem', background: 'transparent' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span style={{ color: '#4F46E5', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', background: '#e0e7ff', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                            {t('dashboardTag')}
                        </span>
                        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', marginTop: '1rem', color: '#111827' }}>
                            {t('dashboardTitle')}
                        </h2>
                        <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: '#6B7280', marginTop: '0.5rem' }}>
                            {t('dashboardDesc')}
                        </p>
                    </motion.div>
                </div>

                {/* Dashboard Simulator Window */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    style={{
                        background: 'white',
                        borderRadius: '1.5rem',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
                        border: '1px solid #E5E7EB',
                        overflow: 'hidden',
                        display: 'flex',
                        flexWrap: 'wrap', // Responsive wrapping
                        minHeight: '600px',
                        maxWidth: '1100px',
                        margin: '0 auto',
                        position: 'relative'
                    }}
                >
                    {/* Simulated Cursor Layer */}
                    <motion.div
                        animate={{
                            top: getCursorY(),
                            left: 150,
                            scale: isClicking ? 0.8 : 1
                        }}
                        transition={{
                            top: { type: "spring", stiffness: 100, damping: 20 },
                            scale: { duration: 0.1 }
                        }}
                        style={{
                            position: 'absolute',
                            zIndex: 50,
                            pointerEvents: 'none',
                            filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.2))',
                            display: 'block'
                        }}
                    >
                        <MousePointer2 size={32} fill="black" color="white" />
                    </motion.div>

                    {/* Sidebar */}
                    <div style={{
                        background: '#F9FAFB',
                        borderRight: '1px solid #E5E7EB',
                        padding: '1.5rem',
                        position: 'relative',
                        flex: '1 0 250px', // Flex basis 250px, grow 1
                        minWidth: '250px'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', paddingLeft: '0.5rem' }}>
                            <div style={{ width: 32, height: 32, background: '#4F46E5', borderRadius: '8px' }}></div>
                            <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Atomic Pilot</span>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <SidebarItem icon={Video} label={t('tabVideo')} active={activeTab === 'video'} id="video" />
                            <SidebarItem icon={FileText} label={t('tabNotes')} active={activeTab === 'notes'} id="notes" />
                            <SidebarItem icon={CheckCircle} label={t('tabQuiz')} active={activeTab === 'quiz'} id="quiz" />
                            <SidebarItem icon={BrainCircuit} label={t('tabAnalytics')} active={false} id="analytics" />
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div style={{
                        padding: '2rem',
                        background: 'white',
                        display: 'flex',
                        flexDirection: 'column',
                        flex: '999 1 300px', // Take up remaining space, wrap if < 300px available
                        minWidth: '300px'
                    }}>
                        {/* Header */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                            <h3 style={{ fontSize: '1.5rem', margin: 0 }}>
                                {activeTab === 'video' && t('tabVideo')}
                                {activeTab === 'notes' && t('tabNotes')}
                                {activeTab === 'quiz' && t('tabQuiz')}
                            </h3>
                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                <div style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', background: '#F3F4F6', color: '#374151', borderRadius: '9999px', whiteSpace: 'nowrap' }}>{t('drafts')}</div>
                                <div style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', background: '#4F46E5', color: 'white', borderRadius: '9999px', whiteSpace: 'nowrap' }}>
                                    {t('newProject')}
                                </div>
                            </div>
                        </div>

                        {/* Dynamic Content */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
                            >
                                {/* Prompt Input Area */}
                                <div style={{ marginBottom: '2rem' }}>
                                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                        <div style={{ flex: 1, padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid #D1D5DB', background: '#F9FAFB', color: '#6B7280', minWidth: '200px' }}>
                                            {activeTab === 'video' ? "Explain Photosynthesis..." :
                                                activeTab === 'notes' ? "Summarize Newton's Laws..." :
                                                    "Quiz on Periodic Table..."}
                                        </div>
                                        <div style={{ padding: '0.75rem 1.5rem', borderRadius: '0.5rem', background: '#E5E7EB', color: 'white', minWidth: '100px', display: 'none' }}>
                                            {/* Hidden placeholder for mobile simulation simplicity */}
                                        </div>
                                    </div>
                                </div>

                                {/* Results Area */}
                                <div style={{ flex: 1, background: '#F9FAFB', border: '1px dashed #D1D5DB', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', minHeight: '300px' }}>
                                    <div style={{ width: '100%', height: '100%', padding: '2rem', display: 'flex', flexDirection: 'column' }}>
                                        {/* Simulated Result Content */}
                                        {activeTab === 'video' && (
                                            <motion.div
                                                initial={{ scale: 0.9 }} animate={{ scale: 1 }}
                                                style={{ width: '100%', height: '100%', background: '#1F2937', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', minHeight: '200px' }}
                                            >
                                                <PlayCircle size={64} color="white" style={{ opacity: 0.9, marginBottom: '1rem' }} />
                                                <div style={{ color: 'white', fontWeight: 600 }}>{t('generating')}</div>
                                                <div style={{ width: '200px', height: '4px', background: '#374151', marginTop: '1rem', borderRadius: '2px', overflow: 'hidden' }}>
                                                    <motion.div animate={{ width: ['0%', '100%'] }} transition={{ duration: 3 }} style={{ height: '100%', background: '#4F46E5' }} />
                                                </div>
                                            </motion.div>
                                        )}

                                        {activeTab === 'notes' && (
                                            <motion.div
                                                initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                                                style={{ width: '100%', height: '100%', background: 'white', border: '1px solid #E5E7EB', borderRadius: '0.5rem', padding: '2rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}
                                            >
                                                <h4 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Newton's Laws Summary</h4>
                                                <div style={{ marginBottom: '0.5rem', fontWeight: 600 }}>1. Law of Inertia</div>
                                                <p style={{ fontSize: '0.9rem', color: '#6B7280', marginBottom: '1rem' }}>An object at rest stays at rest...</p>
                                                <div style={{ marginBottom: '0.5rem', fontWeight: 600 }}>2. F = ma</div>
                                            </motion.div>
                                        )}

                                        {activeTab === 'quiz' && (
                                            <motion.div
                                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                                style={{ display: 'grid', gap: '1rem' }}
                                            >
                                                <div style={{ padding: '1rem', background: 'white', border: '1px solid #10B981', borderRadius: '0.5rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                                                    <span>1. H is the symbol for...?</span>
                                                    <CheckCircle size={20} color="#10B981" />
                                                </div>
                                                <div style={{ padding: '1rem', background: 'white', border: '1px solid #E5E7EB', borderRadius: '0.5rem' }}>
                                                    <span>2. O stands for...?</span>
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default TeacherFeatures;
