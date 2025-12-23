import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Send, Sparkles, Paperclip, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const ChatMessage = ({ sender, text, children, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay, duration: 0.4 }}
        style={{
            alignSelf: sender === 'user' ? 'flex-end' : 'flex-start',
            maxWidth: '85%',
            marginBottom: '1rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: sender === 'user' ? 'flex-end' : 'flex-start'
        }}
    >
        <div style={{
            background: sender === 'user' ? '#4F46E5' : 'white',
            color: sender === 'user' ? 'white' : '#1F2937',
            padding: '1rem 1.25rem',
            borderRadius: sender === 'user' ? '1.25rem 1.25rem 0 1.25rem' : '1.25rem 1.25rem 1.25rem 0',
            boxShadow: sender === 'user' ? '0 4px 6px -1px rgba(79, 70, 229, 0.2)' : '0 2px 4px -1px rgba(0,0,0,0.05)',
            border: sender === 'user' ? 'none' : '1px solid #E5E7EB',
            fontSize: '0.95rem',
            lineHeight: 1.6,
            position: 'relative',
            wordBreak: 'break-word'
        }}>
            {text}
            {children}
        </div>
        <span style={{ fontSize: '0.7rem', color: '#9CA3AF', marginTop: '0.25rem', marginLeft: '0.25rem', marginRight: '0.25rem' }}>
            {sender === 'user' ? 'You' : 'Atomic AI'}
        </span>
    </motion.div>
);

const TypingIndicator = () => (
    <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        style={{
            alignSelf: 'flex-start',
            marginBottom: '1rem',
            background: 'white',
            padding: '0.75rem 1.25rem',
            borderRadius: '1.25rem 1.25rem 1.25rem 0',
            border: '1px solid #E5E7EB',
            display: 'flex',
            gap: '0.25rem',
            alignItems: 'center'
        }}
    >
        <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} style={{ width: 6, height: 6, background: '#9CA3AF', borderRadius: '50%' }} />
        <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} style={{ width: 6, height: 6, background: '#9CA3AF', borderRadius: '50%' }} />
        <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} style={{ width: 6, height: 6, background: '#9CA3AF', borderRadius: '50%' }} />
    </motion.div>
);

const SuggestionChip = ({ text, onClick }) => (
    <button
        onClick={onClick}
        onMouseDown={(e) => e.preventDefault()} // Prevent focus loss
        style={{
            background: 'white',
            border: '1px solid #E5E7EB',
            padding: '0.5rem 1rem',
            borderRadius: '9999px',
            fontSize: '0.85rem',
            color: '#4B5563',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'all 0.2s',
            flexShrink: 0
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#4F46E5'; e.currentTarget.style.color = '#4F46E5'; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.color = '#4B5563'; }}
    >
        {text}
    </button>
);

const StudentDemo = () => {
    const { t } = useLanguage();
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, sender: 'user', text: "Help me calculate the projectile motion of a ball thrown at 45 degrees.", delay: 0 },
        {
            id: 2,
            sender: 'ai',
            text: "Sure! Let's break it down.",
            delay: 0.5,
            children: (
                <div style={{ marginTop: '0.75rem', padding: '0.75rem', background: '#F3F4F6', borderRadius: '0.5rem', fontSize: '0.9rem' }}>
                    <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Key Formula:</div>
                    <code style={{ fontFamily: 'monospace', color: '#D946EF' }}>R = (v² * sin(2θ)) / g</code>
                </div>
            )
        }
    ]);

    const messagesEndRef = useRef(null);
    const SUGGESTIONS = [
        "Explain Quantum Entanglement",
        "Summarize Hamlet",
        "Periodic Table Quiz",
        "Calculus Derivatives"
    ];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = (text = inputValue) => {
        if (!text.trim()) return;

        // Add User Message
        const userMsgId = Date.now();
        const newMessage = { id: userMsgId, sender: 'user', text: text, delay: 0 };
        setMessages(prev => [...prev, newMessage]);
        setInputValue("");
        setIsTyping(true);

        // Simulate Smart AI Response
        setTimeout(() => {
            setIsTyping(false);

            let responseText = "That's an interesting topic! I can help break it down for you. What specific part are you stuck on?";
            let children = null;

            const lowerText = text.toLowerCase();
            if (lowerText.includes("quantum")) {
                responseText = "Quantum entanglement is a phenomenon where particles become interlinked. Here's a visualization:";
                children = (
                    <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center', background: '#F3F4F6', padding: '0.5rem', borderRadius: '0.5rem' }}>
                        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#EC4899', boxShadow: '0 0 10px #EC4899' }}></div>
                        <div style={{ height: 1, flex: 1, background: '#9CA3AF', borderTop: '1px dashed #9CA3AF' }}></div>
                        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#EC4899', boxShadow: '0 0 10px #EC4899' }}></div>
                    </div>
                );
            } else if (lowerText.includes("quiz")) {
                responseText = "Ready for a quiz? Question 1: What is the atomic number of Carbon?";
            } else if (lowerText.includes("hamlet")) {
                responseText = "Hamlet explores themes of revenge and madness. The famous soliloquy starts with:";
                children = (
                    <div style={{ marginTop: '0.5rem', fontStyle: 'italic', background: '#FEF3C7', padding: '0.5rem', borderRadius: '0.25rem', borderLeft: '3px solid #F59E0B' }}>
                        "To be, or not to be, that is the question..."
                    </div>
                );
            }

            const aiMsg = {
                id: userMsgId + 1,
                sender: 'ai',
                text: responseText,
                delay: 0,
                children: children
            };
            setMessages(prev => [...prev, aiMsg]);
        }, 1500 + Math.random() * 1000); // Random delay 1.5s - 2.5s
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <div style={{ background: '#F3F4F6', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Header / Nav */}
            <div style={{ background: 'white', padding: '1rem', borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4B5563', textDecoration: 'none', fontWeight: 500 }}>
                        <ArrowLeft size={20} />
                        Back to Home
                    </Link>
                    <div style={{ width: '1px', height: '20px', background: '#D1D5DB' }}></div>
                    <span style={{ fontWeight: 600, color: '#111827' }}>Student AI Mentor</span>
                </div>
            </div>

            <div style={{ flex: 1, padding: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                {/* Mobile Phone Container */}
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    style={{
                        width: '100%',
                        maxWidth: '400px',
                        background: 'white',
                        height: 'min(800px, 85dvh)', // Improved mobile height
                        borderRadius: '2rem',
                        border: '8px solid #111827',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                        position: 'relative',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    {/* Status Bar Mock */}
                    <div style={{
                        height: '32px',
                        background: 'white',
                        borderBottom: '1px solid #F3F4F6',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0 1.25rem',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: '#111827'
                    }}>
                        <span>9:41</span>
                        <div style={{ display: 'flex', gap: '4px' }}>
                            <div style={{ width: 12, height: 12, background: '#111827', borderRadius: '50%' }} />
                            <div style={{ width: 12, height: 12, border: '1px solid #111827', borderRadius: '50%' }} />
                        </div>
                    </div>

                    {/* Chat Area */}
                    <div style={{ flex: 1, background: '#F9FAFB', padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>

                        <div style={{ textAlign: 'center', marginBottom: '2rem', marginTop: '1rem' }}>
                            <div style={{ width: 56, height: 56, background: '#EEF2FF', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem', color: '#4F46E5', boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.1)' }}>
                                <Sparkles size={28} />
                            </div>
                            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#111827' }}>Atomic AI Mentor</h3>
                            <p style={{ fontSize: '0.85rem', color: '#6B7280' }}>Ask me anything about your studies!</p>
                        </div>

                        {messages.map((msg) => (
                            <ChatMessage key={msg.id} sender={msg.sender} text={msg.text} delay={msg.delay}>
                                {msg.children}
                            </ChatMessage>
                        ))}

                        <AnimatePresence>
                            {isTyping && <TypingIndicator key="typing" />}
                        </AnimatePresence>

                        <div ref={messagesEndRef} />

                    </div>

                    {/* Suggestions & Input Area */}
                    <div style={{ background: 'white', borderTop: '1px solid #E5E7EB' }}>

                        {/* Suggestions Horizontal Scroll */}
                        <div style={{
                            padding: '0.75rem 1rem 0.5rem',
                            display: 'flex',
                            gap: '0.5rem',
                            overflowX: 'auto',
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none'
                        }}>
                            {SUGGESTIONS.map((s, i) => (
                                <SuggestionChip key={i} text={s} onClick={() => handleSend(s)} />
                            ))}
                        </div>

                        {/* Input Row */}
                        <div style={{ padding: '0.5rem 1rem 1rem' }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                background: '#F3F4F6',
                                borderRadius: '1.5rem',
                                padding: '0.5rem 0.5rem 0.5rem 1rem',
                                gap: '0.5rem',
                                border: '1px solid transparent',
                                transition: 'border-color 0.2s'
                            }}
                                onFocus={(e) => e.currentTarget.style.borderColor = '#C7D2FE'}
                                onBlur={(e) => e.currentTarget.style.borderColor = 'transparent'}
                            >
                                <Paperclip size={20} color="#9CA3AF" style={{ cursor: 'pointer' }} />
                                <input
                                    type="text"
                                    placeholder="Type your question..."
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: '0.95rem', color: '#1F2937' }}
                                />
                                <motion.div
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => handleSend(inputValue)}
                                    style={{ width: 36, height: 36, background: '#4F46E5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer' }}
                                >
                                    <Send size={18} />
                                </motion.div>
                            </div>
                        </div>
                    </div>

                </motion.div>

            </div>
        </div>
    );
};

export default StudentDemo;
