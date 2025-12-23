import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Atom, Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
    const { t } = useLanguage();

    return (
        <footer style={{ background: '#111827', color: 'white', padding: '4rem 1rem 2rem' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>

                    {/* Brand */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '1.5rem', marginBottom: '1rem', color: '#FBBF24' }}>
                            <Atom size={32} />
                            <span>Atomic Learn</span>
                        </div>
                        <p style={{ color: '#9CA3AF', marginBottom: '1.5rem' }}>
                            {t('footerTagline')}
                        </p>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <a href="#" style={{ color: '#9CA3AF' }}><Twitter size={20} /></a>
                            <a href="#" style={{ color: '#9CA3AF' }}><Facebook size={20} /></a>
                            <a href="#" style={{ color: '#9CA3AF' }}><Instagram size={20} /></a>
                            <a href="#" style={{ color: '#9CA3AF' }}><Linkedin size={20} /></a>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 style={{ fontSize: '1.125rem', marginBottom: '1rem', color: 'white' }}>{t('footerLinks')}</h4>
                        <ul style={{ listStyle: 'none', color: '#9CA3AF', display: 'grid', gap: '0.5rem' }}>
                            <li><a href="#home">{t('navHome')}</a></li>
                            <li><a href="#features">{t('navFeatures')}</a></li>
                            <li><a href="#about">{t('navAbout')}</a></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 style={{ fontSize: '1.125rem', marginBottom: '1rem', color: 'white' }}>Legal</h4>
                        <ul style={{ listStyle: 'none', color: '#9CA3AF', display: 'grid', gap: '0.5rem' }}>
                            <li><a href="#">{t('footerPrivacy')}</a></li>
                            <li><a href="#">{t('footerTerms')}</a></li>
                            <li><a href="#">{t('footerContact')}</a></li>
                        </ul>
                    </div>

                </div>

                <div style={{ borderTop: '1px solid #374151', paddingTop: '2rem', textAlign: 'center', color: '#6B7280', fontSize: '0.875rem' }}>
                    {t('footerCopyright')}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
