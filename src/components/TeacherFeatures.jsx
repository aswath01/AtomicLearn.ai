/* eslint-disable no-unused-vars */
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { Video, FileText, CheckCircle, BrainCircuit } from 'lucide-react';

const TeacherFeatures = () => {
    const { t } = useLanguage();

    const features = [
        { icon: Video, title: t('tabVideo'), desc: "Generate educational videos instantly from text." },
        { icon: FileText, title: t('tabNotes'), desc: "Create comprehensive lesson notes automatically." },
        { icon: CheckCircle, title: t('tabQuiz'), desc: "Generate quizzes to test student understanding." },
        { icon: BrainCircuit, title: t('tabAnalytics'), desc: "Track student performance with AI analytics." },
    ];

    return (
        <section id="features" style={{ padding: '6rem 1rem', background: '#F9FAFB' }}>
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

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            style={{ background: 'white', padding: '2rem', borderRadius: '1rem', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}
                        >
                            <div style={{ width: 48, height: 48, background: '#EEF2FF', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: '#4F46E5' }}>
                                <feature.icon size={24} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#111827', fontWeight: 600 }}>{feature.title}</h3>
                            <p style={{ color: '#6B7280' }}>
                                {feature.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeacherFeatures;
