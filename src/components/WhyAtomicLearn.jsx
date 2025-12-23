import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { Zap, Globe, Eye, Smile } from 'lucide-react';

const WhyAtomicLearn = () => {
    const { t } = useLanguage();

    const reasons = [
        { keyTitle: 'why1Title', keyDesc: 'why1Desc', icon: Zap },
        { keyTitle: 'why2Title', keyDesc: 'why2Desc', icon: Globe },
        { keyTitle: 'why3Title', keyDesc: 'why3Desc', icon: Eye },
        { keyTitle: 'why4Title', keyDesc: 'why4Desc', icon: Smile },
    ];

    return (
        <section id="why" style={{ padding: '4rem 1rem' }}>
            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', color: '#111827' }}>
                        {t('whyTitle')}
                    </h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
                    {reasons.map((reason, index) => (
                        <motion.div
                            key={reason.keyTitle}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            style={{ textAlign: 'center', padding: '1.5rem' }}
                        >
                            <div style={{ width: 64, height: 64, background: '#EEF2FF', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: '#4F46E5' }}>
                                <reason.icon size={32} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#111827' }}>{t(reason.keyTitle)}</h3>
                            <p style={{ color: '#6B7280' }}>{t(reason.keyDesc)}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyAtomicLearn;
