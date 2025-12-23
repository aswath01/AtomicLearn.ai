import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { BookOpen, Clock, MessageCircle, TrendingUp } from 'lucide-react';

const StudentFeatures = () => {
    const { t } = useLanguage();

    const features = [
        { key: 'studentFeat1', icon: BookOpen },
        { key: 'studentFeat2', icon: Clock },
        { key: 'studentFeat3', icon: MessageCircle },
        { key: 'studentFeat4', icon: TrendingUp },
    ];

    return (
        <section id="student-features" style={{ padding: '4rem 1rem', background: '#F9FAFB' }}>
            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <span style={{ color: '#059669', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', background: '#D1FAE5', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                        {t('forStudents')}
                    </span>
                    <h2 style={{ fontSize: '2.5rem', marginTop: '1rem', color: '#111827' }}>
                        {t('studentTitle')}
                    </h2>
                    <p style={{ fontSize: '1.2rem', color: '#6B7280', marginTop: '0.5rem' }}>
                        {t('studentDesc')}
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                    {features.map((feat, index) => (
                        <motion.div
                            key={feat.key}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            style={{ background: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}
                        >
                            <div style={{ width: 48, height: 48, background: '#D1FAE5', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: '#059669' }}>
                                <feat.icon size={24} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#111827' }}>{t(feat.key)}</h3>
                            <p style={{ color: '#6B7280' }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StudentFeatures;
