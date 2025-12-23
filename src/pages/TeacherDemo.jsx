import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, FileText, CheckCircle, BrainCircuit, PlayCircle, Plus, Loader2, Download, ArrowLeft, RefreshCw } from 'lucide-react';
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
    const [isGenerating, setIsGenerating] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const handleGenerate = () => {
        setIsGenerating(true);
        setShowResult(false);
        setTimeout(() => {
            setIsGenerating(false);
            setShowResult(true);
        }, 2000);
    };

    const resetView = (tab) => {
        setActiveTab(tab);
        setShowResult(false);
        setInputValue("");
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
                    {/* Sidebar */}
                    <div className="teacher-sidebar">
                        <div className="sidebar-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', paddingLeft: '0.5rem' }}>
                            <div style={{ width: 32, height: 32, background: '#4F46E5', borderRadius: '8px' }}></div>
                            <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Atomic Pilot</span>
                        </div>

                        <div className="sidebar-items" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <SidebarItem icon={Video} label={t('tabVideo')} active={activeTab === 'video'} id="video" onClick={resetView} />
                            <SidebarItem icon={FileText} label={t('tabNotes')} active={activeTab === 'notes'} id="notes" onClick={resetView} />
                            <SidebarItem icon={CheckCircle} label={t('tabQuiz')} active={activeTab === 'quiz'} id="quiz" onClick={resetView} />
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
                            <h3 style={{ fontSize: '1.5rem', margin: 0, fontWeight: 700, color: '#111827' }}>
                                {activeTab === 'video' && t('tabVideo')}
                                {activeTab === 'notes' && t('tabNotes')}
                                {activeTab === 'quiz' && t('tabQuiz')}
                            </h3>
                            <button
                                onClick={() => { setShowResult(false); setInputValue(""); }}
                                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', fontSize: '0.875rem', background: '#4F46E5', color: 'white', borderRadius: '9999px', border: 'none', cursor: 'pointer', fontWeight: 500 }}
                            >
                                <Plus size={16} /> {t('newProject')}
                            </button>
                        </div>

                        {/* Input State */}
                        {!showResult && !isGenerating && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                            >
                                <div style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '1rem', padding: '2rem', textAlign: 'center' }}>
                                    <div style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', color: '#374151' }}>
                                        {activeTab === 'video' ? "What topic do you want a video for?" :
                                            activeTab === 'notes' ? "What lesson do you need notes for?" :
                                                "Create a quiz about..."}
                                    </div>
                                    <div style={{ display: 'flex', gap: '1rem', maxWidth: '600px', margin: '0 auto' }}>
                                        <input
                                            type="text"
                                            placeholder={activeTab === 'video' ? "e.g., Photosynthesis, Newton's Laws" : activeTab === 'notes' ? "e.g., The French Revolution" : "e.g., Periodic Table"}
                                            className="search-input"
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            style={{ flex: 1, padding: '1rem', borderRadius: '0.75rem', border: '1px solid #D1D5DB', fontSize: '1rem', outline: 'none' }}
                                        />
                                        <button
                                            onClick={handleGenerate}
                                            disabled={!inputValue}
                                            style={{
                                                padding: '0 2rem',
                                                background: inputValue ? '#4F46E5' : '#E5E7EB',
                                                color: inputValue ? 'white' : '#9CA3AF',
                                                border: 'none',
                                                borderRadius: '0.75rem',
                                                fontSize: '1rem',
                                                fontWeight: 600,
                                                cursor: inputValue ? 'pointer' : 'not-allowed',
                                                transition: 'background 0.2s'
                                            }}
                                        >
                                            Generate
                                        </button>
                                    </div>
                                    <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                                        {["Photosynthesis", "World War II", "Algebra Basics"].map(tag => (
                                            <button
                                                key={tag}
                                                onClick={() => setInputValue(tag)}
                                                style={{ padding: '0.5rem 1rem', background: 'white', border: '1px solid #E5E7EB', borderRadius: '9999px', fontSize: '0.9rem', color: '#6B7280', cursor: 'pointer' }}
                                            >
                                                {tag}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Loading State */}
                        {isGenerating && (
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#6B7280' }}>
                                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                                    <Loader2 size={48} color="#4F46E5" />
                                </motion.div>
                                <p style={{ marginTop: '1.5rem', fontSize: '1.1rem', fontWeight: 500 }}>AI is creating your {activeTab}...</p>
                            </div>
                        )}

                        {/* Result State */}
                        {showResult && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
                                {activeTab === 'video' && (
                                    <div style={{ flex: 1, background: 'black', borderRadius: '1rem', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                                        <img src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2600&auto=format&fit=crop" alt="Video thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
                                        <div style={{ position: 'absolute', zIndex: 10 }}>
                                            <PlayCircle size={80} color="white" fill="rgba(255,255,255,0.2)" />
                                        </div>
                                        <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', color: 'white' }}>
                                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{inputValue || "Educational Video"}</h3>
                                            <p style={{ opacity: 0.8 }}>Generated by Atomic AI • 02:45</p>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'notes' && (
                                    <div style={{ flex: 1, background: 'white', border: '1px solid #E5E7EB', borderRadius: '1rem', padding: '2.5rem', overflowY: 'auto' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                                            <div>
                                                <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#111827' }}>{inputValue || "Lesson Notes"}</h1>
                                                <p style={{ color: '#6B7280' }}>Grade 10 • Science • Generated just now</p>
                                            </div>
                                            <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', border: '1px solid #D1D5DB', borderRadius: '0.5rem', backgroundColor: 'white', cursor: 'pointer' }}>
                                                <Download size={18} /> Export PDF
                                            </button>
                                        </div>
                                        <div style={{ lineHeight: 1.8, color: '#374151' }}>
                                            <h3 style={{ color: '#111827', marginTop: '1.5rem' }}>1. Introduction</h3>
                                            <p>This section introduces the core concepts of {inputValue}, explaining its significance in modern science...</p>
                                            <h3 style={{ color: '#111827', marginTop: '1.5rem' }}>2. Key Terminology</h3>
                                            <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                                                <li><strong>Term A:</strong> Definition and context.</li>
                                                <li><strong>Term B:</strong> Real-world capabilities.</li>
                                            </ul>
                                            <h3 style={{ color: '#111827', marginTop: '1.5rem' }}>3. Summary</h3>
                                            <p>In conclusion, understanding {inputValue} is crucial for grasping more complex topics in the curriculum.</p>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'quiz' && (
                                    <div style={{ flex: 1, padding: '1rem', overflowY: 'auto' }}>
                                        <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Quiz: {inputValue}</h2>
                                            <button style={{ color: '#4F46E5', background: 'transparent', border: 'none', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <RefreshCw size={16} /> Regenerate
                                            </button>
                                        </div>
                                        {[1, 2, 3].map((q) => (
                                            <div key={q} style={{ background: 'white', padding: '1.5rem', borderRadius: '1rem', border: '1px solid #E5E7EB', marginBottom: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                                                <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#1F2937' }}>{q}. What is a primary characteristic of {inputValue}?</h4>
                                                <div style={{ display: 'grid', gap: '0.75rem' }}>
                                                    {['Option A', 'Option B', 'Option C', 'Option D'].map((opt, i) => (
                                                        <div key={i} style={{ padding: '0.75rem 1rem', border: '1px solid #E5E7EB', borderRadius: '0.5rem', cursor: 'pointer', transition: 'background 0.2s', display: 'flex', alignItems: 'center', gap: '0.75rem' }}
                                                            onMouseEnter={(e) => e.currentTarget.style.background = '#F9FAFB'}
                                                            onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                                                        >
                                                            <div style={{ width: 16, height: 16, border: '1px solid #D1D5DB', borderRadius: '50%' }}></div>
                                                            {opt}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default TeacherDemo;
