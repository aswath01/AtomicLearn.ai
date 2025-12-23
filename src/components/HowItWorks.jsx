import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Upload, Cpu, Play } from 'lucide-react';

const HowItWorks = () => {
    // eslint-disable-next-line no-unused-vars
    const { t } = useLanguage();

    const steps = [
        {
            icon: <Upload size={28} />,
            title: "Upload Content",
            desc: "Teachers upload textbooks or notes in PDF/Image format."
        },
        {
            icon: <Cpu size={28} />,
            title: "AI Processing",
            desc: "Our AI analyzes the content and generates scripts & visuals."
        },
        {
            icon: <Play size={28} />,
            title: "Get Video",
            desc: "Receive high-quality explanatory videos in minutes."
        }
    ];

    return (
        <section id="how-it-works" style={{ padding: '6rem 2rem', background: 'white' }}>
            <div className="container" style={{ maxWidth: '1280px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#111827', marginBottom: '1rem' }}>
                        How It Works
                    </h2>
                    <p style={{ fontSize: '1.1rem', color: '#6B7280' }}>Transforming education in 3 simple steps</p>
                </div>

                <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', gap: '4rem', flexWrap: 'wrap' }}>
                    {/* Connecting Line */}
                    <div style={{
                        position: 'absolute',
                        top: '40px',
                        left: '20%',
                        right: '20%',
                        height: '2px',
                        background: '#E5E7EB',
                        zIndex: 0,
                        display: 'flex' // Hide on mobile logic needed if using display flex on parent
                    }} className="step-line" />

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            style={{
                                position: 'relative',
                                zIndex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                maxWidth: '300px'
                            }}
                        >
                            <div style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                background: '#4F46E5',
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '1.5rem',
                                boxShadow: '0 10px 25px -5px rgba(79, 70, 229, 0.4)'
                            }}>
                                {step.icon}
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', color: '#1F2937' }}>{step.title}</h3>
                            <p style={{ color: '#6B7280', lineHeight: 1.5 }}>{step.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
