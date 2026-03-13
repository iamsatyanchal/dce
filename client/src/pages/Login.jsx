import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const { data } = await api.post('/auth/login', {
                email,
                password,
            });

            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate('/Admin');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col font-sans bg-[#f4f4f4] items-center justify-center p-6 bg-cover bg-center relative" style={{ backgroundImage: "linear-gradient(rgba(19, 59, 92, 0.92), rgba(19, 59, 92, 0.92)), url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop')" }}>

            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-white/20 animate-zoom-in">
                {/* Header Branding */}
                <div className="bg-[#133b5c] p-10 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-[#c6b677]"></div>
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-6 text-white border border-white/20 backdrop-blur-sm">
                        <ShieldCheck size={36} className="text-[#c6b677]" />
                    </div>
                    <h2 className="text-white text-3xl font-serif font-bold mb-2 tracking-tight">Admin Login</h2>
                    <p className="text-gray-300 text-sm font-light">Secure Access to Institutional Dashboard</p>
                </div>

                <div className="p-10">
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm flex items-center gap-3 animate-fade-in">
                            <span className="text-lg">⚠️</span>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="block text-xs font-bold text-[#133b5c] uppercase tracking-widest ml-1">Administrator Email</label>
                            <div className="relative group">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#c6b677] transition-colors"><Mail size={18} /></span>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#c6b677]/30 focus:border-[#c6b677] outline-none transition-all placeholder:text-gray-300 text-sm"
                                    placeholder="admin@dce.ac.in"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-xs font-bold text-[#133b5c] uppercase tracking-widest ml-1">Secure Password</label>
                            <div className="relative group">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#c6b677] transition-colors"><Lock size={18} /></span>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#c6b677]/30 focus:border-[#c6b677] outline-none transition-all placeholder:text-gray-300 text-sm"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-[11px] pt-1">
                            <label className="flex items-center gap-2 text-gray-500 cursor-pointer hover:text-[#133b5c]">
                                <input type="checkbox" className="rounded-sm border-gray-300 text-[#133b5c] focus:ring-[#133b5c]" />
                                Keep me logged in
                            </label>
                            <button type="button" className="text-[#c6b677] font-bold hover:underline uppercase tracking-tighter">Authorized Only</button>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full bg-[#133b5c] text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40 hover:bg-[#1a4b73] transform hover:-translate-y-1 active:scale-[0.98] transition-all flex items-center justify-center gap-3 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>Access Dashboard <ArrowRight size={18} className="text-[#c6b677]" /></>
                            )}
                        </button>
                    </form>

                    <div className="mt-10 pt-8 border-t border-gray-100 text-center">
                        <p className="text-gray-400 text-[10px] font-light uppercase tracking-[0.2em]">
                            Systems Control Panel &copy; DCE Darbhanga
                        </p>
                    </div>
                </div>
            </div>

            <button
                onClick={() => navigate('/')}
                className="mt-8 text-white/60 hover:text-white transition-colors text-sm font-medium flex items-center gap-2 group"
            >
                <ArrowRight size={16} className="rotate-180 group-hover:-translate-x-1 transition-transform" /> Exit to Homepage
            </button>
        </div>
    );
};

export default Login;
