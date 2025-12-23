import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Send, Sparkles, Paperclip } from 'lucide-react';
import { Link } from 'react-router-dom';

const ChatMessage = ({ sender, text, children, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay, duration: 0.4 }}
        style={{
            alignSelf: sender === 'user' ? 'flex-end' : 'flex-start',
            maxWidth: '80%',
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
            boxShadow: sender === 'user' ? '0 10px 15px -3px rgba(79, 70, 229, 0.3)' : '0 4px 6px -1px rgba(0,0,0,0.05)',
            border: sender === 'user' ? 'none' : '1px solid #E5E7EB',
            fontSize: '1rem',
            lineHeight: 1.5,
            position: 'relative'
        }}>
            {text}
            {children}
        </div>
        <span style={{ fontSize: '0.75rem', color: '#9CA3AF', marginTop: '0.25rem', marginLeft: '0.5rem', marginRight: '0.5rem' }}>
            {sender === 'user' ? 'You' : 'Atomic AI'}
        </span>
    </motion.div>
);

const StudentDemo = () => {
    const { t } = useLanguage();
    const [inputValue, setInputValue] = useState("");
    const [messages, setMessages] = useState([
        { id: 1, sender: 'user', text: "Help me calculate the projectile motion of a ball thrown at 45 degrees.", delay: 0.5 },
        {
            id: 2,
            sender: 'ai',
            text: "Sure! Let's break it down.",
            delay: 1.5,
            children: (
                <div style={{ marginTop: '0.75rem', padding: '0.75rem', background: '#F3F4F6', borderRadius: '0.5rem', fontSize: '0.9rem' }}>
                    <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Key Formula:</div>
                    <code style={{ fontFamily: 'monospace', color: '#D946EF' }}>R = (v² * sin(2θ)) / g</code>
                </div>
            )
        },
        {
            id: 3,
            sender: 'ai',
            text: "Here's a quick graph of the trajectory:",
            delay: 2.5,
            children: (
                <div style={{
                    marginTop: '0.75rem',
                    height: '100px',
                    background: 'white',
                    border: '1px solid #E5E7EB',
                    borderRadius: '0.5rem',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    {/* CSS Parabola */}
                    <div style={{
                        position: 'absolute',
                        bottom: -50,
                        left: 10,
                        width: '180px',
                        height: '140px',
                        border: '2px dashed #4F46E5',
                        borderRadius: '50%',
                        borderBottom: 'none',
                        borderRight: 'none',
                        borderLeft: 'none',
                        transform: 'rotate(0deg)'
                    }}></div>
                    <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '1px', background: '#D1D5DB' }}></div>
                    <div style={{ position: 'absolute', bottom: 0, left: 0, width: '1px', height: '100%', background: '#D1D5DB' }}></div>
                </div>
            )
        }
    ]);

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!inputValue.trim()) return;

        // Add User Message
        const userMsgId = Date.now();
        const newMessage = { id: userMsgId, sender: 'user', text: inputValue, delay: 0 };
        setMessages(prev => [...prev, newMessage]);
        setInputValue("");

        // Simulate AI Response
        setTimeout(() => {
            const aiMsg = {
                id: userMsgId + 1,
                sender: 'ai',
                text: "That's a great question! I'm analyzing your request...",
                delay: 0
            };
            setMessages(prev => [...prev, aiMsg]);
        }, 1000);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSend();
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
                    <span style={{ fontWeight: 600, color: '#111827' }}>Student AI Mentor Simulator</span>
                </div>
            </div>

            <div style={{ flex: 1, padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                {/* Mobile Phone Container */}
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    style={{
                        width: '100%',
                        maxWidth: '400px',
                        background: 'white',
                        height: 'min(750px, 85vh)',
                        borderRadius: '2.5rem',
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
                        padding: '0 1.5rem',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: '#111827'
                    }}>
                        <span>9:41</span>
                        <div style={{ display: 'flex', gap: '4px' }}>
                            <div style={{ width: 14, height: 14, background: '#111827', borderRadius: '50%' }} />
                            <div style={{ width: 14, height: 14, border: '1px solid #111827', borderRadius: '50%' }} />
                        </div>
                    </div>

                    {/* Chat Area */}
                    <div style={{ flex: 1, background: '#F9FAFB', padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>

                        <div style={{ textAlign: 'center', marginBottom: '2rem', marginTop: '1rem' }}>
                            <div style={{ width: 64, height: 64, background: '#EEF2FF', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#4F46E5' }}>
                                <Sparkles size={32} />
                            </div>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#111827' }}>Atomic AI Mentor</h3>
                            <p style={{ fontSize: '0.9rem', color: '#6B7280' }}>Ask me anything about your studies!</p>
                        </div>

                        {messages.map((msg) => (
                            <ChatMessage key={msg.id} sender={msg.sender} text={msg.text} delay={msg.delay}>
                                {msg.children}
                            </ChatMessage>
                        ))}
                        <div ref={messagesEndRef} />

                    </div>

                    {/* Input Area */}
                    <div style={{ padding: '1rem', background: 'white', borderTop: '1px solid #E5E7EB' }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            background: '#F3F4F6',
                            borderRadius: '9999px',
                            padding: '0.5rem 0.5rem 0.5rem 1.25rem',
                            gap: '0.5rem'
                        }}>
                            <Paperclip size={20} color="#9CA3AF" />
                            <input
                                type="text"
                                placeholder="Type your question..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: '1rem' }}
                            />
                            <div
                                onClick={handleSend}
                                style={{ width: 40, height: 40, background: '#4F46E5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer' }}
                            >
                                <Send size={20} />
                            </div>
                        </div>
                    </div>

                </motion.div>

            </div>
        </div>
    );
};

export default StudentDemo;
