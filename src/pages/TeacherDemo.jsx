import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, FileText, CheckCircle, BrainCircuit, PlayCircle, MousePointer2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const SidebarItem = ({ icon: Icon, label, active, id, onClick }) => (
    <div
        id={`tab-${id}`}
        onClick={() => onClick(id)}
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
            cursor: 'pointer',
            position: 'relative'
        }}
    >
        <Icon size={20} />
        {label}
    </div>
);

const TeacherDemo = () => {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState('video');

    // Auto-fake cursor movement when tab changes (optional polish)
    const [cursorTarget, setCursorTarget] = useState({ top: 110, left: 150 });

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        // Update cursor visual position based on tab
        const yPos = tab === 'video' ? 110 : tab === 'notes' ? 170 : tab === 'quiz' ? 230 : 290;
        setCursorTarget({ top: yPos, left: 150 });
    };

    return (
        <div style={{ background: '#F3F4F6', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Header / Nav */}
            <div style={{ background: 'white', padding: '1rem', borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4B5563', textDecoration: 'none', fontWeight: 500 }}>
                        <ArrowLeft size={20} />
                        Back to Home
                    </Link>
                    <div style={{ width: '1px', height: '20px', background: '#D1D5DB' }}></div>
                    <span style={{ fontWeight: 600, color: '#111827' }}>Teacher Dashboard Simulator</span>
                </div>
            </div>

            <div style={{ flex: 1, padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {/* Dashboard Simulator Window */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="teacher-demo-window"
                >
                    {/* Simulated Cursor Layer - Now responds to user clicks */}
                    <motion.div
                        animate={{
                            top: cursorTarget.top,
                            left: cursorTarget.left,
                        }}
                        transition={{
                            type: "spring", stiffness: 100, damping: 20
                        }}
                        style={{
                            position: 'absolute',
                            zIndex: 50,
                            pointerEvents: 'none',
                            filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.2))',
                            display: 'block' // Keep visible as a "guide" or remove if user finds annoying
                        }}
                    >
                        <MousePointer2 size={32} fill="black" color="white" />
                    </motion.div>

                    {/* Sidebar */}
                    <div className="teacher-sidebar">
                        <div className="sidebar-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', paddingLeft: '0.5rem' }}>
                            <div style={{ width: 32, height: 32, background: '#4F46E5', borderRadius: '8px' }}></div>
                            <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Atomic Pilot</span>
                        </div>

                        <div className="sidebar-items" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <SidebarItem icon={Video} label={t('tabVideo')} active={activeTab === 'video'} id="video" onClick={handleTabClick} />
                            <SidebarItem icon={FileText} label={t('tabNotes')} active={activeTab === 'notes'} id="notes" onClick={handleTabClick} />
                            <SidebarItem icon={CheckCircle} label={t('tabQuiz')} active={activeTab === 'quiz'} id="quiz" onClick={handleTabClick} />
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div style={{
                        padding: '2rem',
                        background: 'white',
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1
                    }}>
                        {/* Header */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.5rem', margin: 0 }}>
                                {activeTab === 'video' && t('tabVideo')}
                                {activeTab === 'notes' && t('tabNotes')}
                                {activeTab === 'quiz' && t('tabQuiz')}
                            </h3>
                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                <div style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', background: '#F3F4F6', color: '#374151', borderRadius: '9999px' }}>{t('drafts')}</div>
                                <div style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', background: '#4F46E5', color: 'white', borderRadius: '9999px' }}>
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
                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <div style={{ flex: 1, padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid #D1D5DB', background: '#F9FAFB', color: '#6B7280' }}>
                                            {activeTab === 'video' ? "Explain Photosynthesis..." :
                                                activeTab === 'notes' ? "Summarize Newton's Laws..." :
                                                    "Quiz on Periodic Table..."}
                                        </div>
                                    </div>
                                </div>

                                {/* Results Area */}
                                <div style={{ flex: 1, background: '#F9FAFB', border: '1px dashed #D1D5DB', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                                    <div style={{ width: '100%', height: '100%', padding: '2rem', display: 'flex', flexDirection: 'column' }}>
                                        {/* Simulated Result Content */}
                                        {activeTab === 'video' && (
                                            <motion.div
                                                initial={{ scale: 0.9 }} animate={{ scale: 1 }}
                                                style={{ width: '100%', height: '100%', background: '#1F2937', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}
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
                                                <div style={{ padding: '1rem', background: 'white', border: '1px solid #10B981', borderRadius: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
        </div>
    );
};

export default TeacherDemo;
