import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            const response = await api.post('/messages', formData);
            setStatus({ type: 'success', message: response.data.message || 'Thank you for contacting us. We will get back to you shortly.' });
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            console.error('Error sending message:', error);
            setStatus({ type: 'error', message: error.response?.data?.message || 'Failed to send message. Please try again later.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full flex flex-col font-sans bg-[#f4f4f4] overflow-x-hidden min-h-screen">
            {/* Page Header */}
            <div className="w-full bg-white py-12 px-8 md:px-16 border-b border-gray-100 animate-fade-in">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#133b5c] mb-4 uppercase tracking-tight animate-slide-in-down">Connect With Us</h1>
                </div>
            </div>

            {/* Form Content */}
            <div className="flex-1 flex items-center justify-center p-8 md:p-24 relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#c6b677]/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#133b5c]/5 rounded-full blur-3xl"></div>

                <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden reveal z-10 border border-gray-100">
                    <div className="bg-[#133b5c] p-8 md:p-12 text-center relative">
                        <div className="absolute top-0 left-0 w-full h-1 bg-[#c6b677]"></div>
                        <h2 className="text-white text-3xl font-serif font-bold mb-4">Send us a Message</h2>
                        <p className="text-gray-300 font-light">We'd love to hear from you. Fill out the form below and we'll be in touch.</p>
                    </div>

                    <div className="p-8 md:p-12">
                        {status.message && (
                            <div className={`mb-8 p-4 rounded-xl text-sm font-medium animate-fade-in flex items-center gap-3 ${status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                                <span className="text-lg">{status.type === 'success' ? '✅' : '❌'}</span>
                                {status.message}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold text-[#133b5c] uppercase tracking-wider ml-1">Your Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="John Doe"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#c6b677]/30 focus:border-[#c6b677] focus:bg-white"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold text-[#133b5c] uppercase tracking-wider ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        placeholder="john@example.com"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#c6b677]/30 focus:border-[#c6b677] focus:bg-white"
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-[#133b5c] uppercase tracking-wider ml-1">Subject</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="How can we help you?"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#c6b677]/30 focus:border-[#c6b677] focus:bg-white"
                                    value={formData.subject}
                                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-xs font-bold text-[#133b5c] uppercase tracking-wider ml-1">Message</label>
                                <textarea
                                    rows="5"
                                    required
                                    placeholder="Write your message here..."
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#c6b677]/30 focus:border-[#c6b677] focus:bg-white resize-none"
                                    value={formData.message}
                                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full bg-[#133b5c] text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-[#133b5c]/30 hover:bg-[#1a4b73] transition-all flex items-center justify-center gap-3 transform hover:-translate-y-1 active:scale-[0.98] ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        Send Message
                                        <span className="text-yellow-400 group-hover:translate-x-1 transition-transform">→</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="w-full bg-[#133b5c] py-12 px-4 text-center reveal">
                <div className="max-w-4xl mx-auto">
                    <p className="text-sky-300/80 font-light italic">
                        "Your feedback and inquiries are valuable to us. Our dedicated team will process your message and get back to you as soon as possible."
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Contact;
