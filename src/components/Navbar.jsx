/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { languages } from '../data/translations';
import { Menu, X, Globe, Atom, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { currentLanguage, setCurrentLanguage, t } = useLanguage();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        if (!isMenuOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'unset';
    };

    const toggleLang = () => setIsLangOpen(!isLangOpen);

    const handleLangSelect = (code) => {
        setCurrentLanguage(code);
        setIsLangOpen(false);
        setIsMenuOpen(false);
        document.body.style.overflow = 'unset';
    };

    const currentLangName = languages.find(l => l.code === currentLanguage)?.name || 'English';

    return (
        <>
            <nav className="navbar" style={{ position: 'sticky', top: 0, zIndex: 1000, background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)', borderBottom: '1px solid #E5E7EB' }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
                    {/* Logo */}
                    <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '1.5rem', color: 'var(--color-primary)' }}>
                        <Atom size={32} />
                        <span>Atomic Learn</span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="desktop-nav" style={{ gap: '2rem', alignItems: 'center' }}>
                        <a href="#home" style={{ fontWeight: 500, color: 'var(--color-text)' }}>{t('navHome')}</a>
                        {/* <a href="#features" style={{ fontWeight: 500, color: 'var(--color-text)' }}>{t('navFeatures')}</a> */}
                        <a href="#about" style={{ fontWeight: 500, color: 'var(--color-text)' }}>{t('navAbout')}</a>

                        {/* Language Selector */}
                        <div style={{ position: 'relative' }}>
                            <button
                                onClick={toggleLang}
                                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid #E5E7EB', background: 'white', color: 'var(--color-text)' }}
                            >
                                <Globe size={16} />
                                <span>{currentLangName.split(' ')[0]}</span>
                            </button>

                            {isLangOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    style={{ position: 'absolute', top: '100%', right: 0, marginTop: '0.5rem', background: 'white', borderRadius: '0.5rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', padding: '0.5rem', minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}
                                >
                                    {languages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => handleLangSelect(lang.code)}
                                            style={{ textAlign: 'left', padding: '0.5rem', borderRadius: '0.25rem', background: currentLanguage === lang.code ? '#F3F4F6' : 'transparent', border: 'none', width: '100%' }}
                                        >
                                            {lang.name}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </div>

                        <button className="btn btn-primary">{t('navContact')}</button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="mobile-menu-btn"
                        onClick={toggleMenu}
                        style={{ border: 'none', background: 'transparent', color: '#111827' }}>
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="mobile-menu-overlay"
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#4F46E5' }}>Atomic Learn</span>
                            <button onClick={toggleMenu} style={{ border: 'none', background: 'transparent' }}><X size={28} /></button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontSize: '1.25rem', fontWeight: 600 }}>
                            <a href="#home" onClick={toggleMenu}>{t('navHome')}</a>
                            {/* <a href="#features" onClick={toggleMenu}>{t('navFeatures')}</a> */}
                            <a href="#about" onClick={toggleMenu}>{t('navAbout')}</a>
                        </div>

                        <div style={{ height: '1px', background: '#E5E7EB', width: '100%' }}></div>

                        {/* Mobile Language Selector */}
                        <div>
                            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#6B7280', marginBottom: '1rem', textTransform: 'uppercase' }}>Select Language</div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                                {languages.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => handleLangSelect(lang.code)}
                                        style={{
                                            padding: '0.75rem',
                                            borderRadius: '0.5rem',
                                            background: currentLanguage === lang.code ? '#EEF2FF' : '#F9FAFB',
                                            border: currentLanguage === lang.code ? '1px solid #4F46E5' : '1px solid #E5E7EB',
                                            color: currentLanguage === lang.code ? '#4F46E5' : '#374151',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 500
                                        }}
                                    >
                                        {lang.name.split(' (')[0]}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button className="btn btn-primary" style={{ width: '100%', marginTop: 'auto' }}>{t('navContact')}</button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
