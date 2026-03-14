import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import * as Icons from 'lucide-react';
import { Sparkles, Users, Image as ImageIcon, Heart } from 'lucide-react';

const SocietyPage = () => {
    const { id } = useParams();
    const [society, setSociety] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchSocietyDetails = async () => {
            try {
                const { data } = await api.get('/student-life/societies');
                const found = data.find(s => s._id === id);
                setSociety(found);
            } catch (err) {
                console.error("Error fetching society details:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchSocietyDetails();
    }, [id]);

    const getIcon = (iconName) => {
        const IconComponent = Icons[iconName] || Icons.Users;
        return <IconComponent size={48} />;
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#133b5c]"></div>
            </div>
        );
    }

    if (!society) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white text-[#133b5c] font-serif text-2xl">
                Society Not Found
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* 1. Hero Section */}
            <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-[#133b5c]">
                {society.heroImage?.imageUrl ? (
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-40 animate-zoom-in"
                        style={{ backgroundImage: `url(${society.heroImage.imageUrl})` }}
                    ></div>
                ) : (
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544928147-79723bd4d284?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-30 animate-zoom-in"></div>
                )}
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="relative z-10 text-center px-6 max-w-5xl pt-20">
                    <div className="animate-fade-in-up">
                        <div className="text-[#c6b677] mx-auto mb-6 flex justify-center">
                            {getIcon(society.iconName)}
                        </div>
                        <span className="text-white/60 font-bold uppercase tracking-[0.5em] text-xs mb-4 block">Official Student Society of DCE</span>
                        <h1 className="text-5xl md:text-8xl font-serif font-bold text-white mb-6 uppercase tracking-tight">{society.name}</h1>
                        <div className="h-1 w-32 bg-[#c6b677] mx-auto mb-8"></div>
                        <p className="text-[#c6b677] text-lg md:text-2xl font-light italic max-w-2xl mx-auto leading-relaxed">
                            "{society.description}"
                        </p>
                    </div>
                </div>
            </section>

            {/* 2. About/Philosophy Section */}
            <section className="py-24 px-8 md:px-16 container mx-auto">
                <div className="flex flex-col lg:flex-row gap-20 items-center">
                    <div className="lg:w-1/2">
                        <span className="text-yellow-600 font-bold uppercase tracking-[0.3em] text-xs mb-4 block">About the Society</span>
                        <h2 className="text-4xl font-serif font-bold text-[#133b5c] mb-8 leading-tight italic">Mission & Vision</h2>
                        <div className="space-y-6 text-gray-500 text-lg leading-relaxed font-light">
                            <p className="whitespace-pre-line">
                                {society.longDescription || "No detailed description provided yet. This society is a vibrant community of passionate students at Darbhanga College of Engineering, dedicated to excellence and creative expression."}
                            </p>
                        </div>
                    </div>
                    <div className="lg:w-1/2 grid grid-cols-2 gap-6">
                        <div className="bg-[#133b5c] p-10 rounded-3xl text-white shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700"></div>
                            <p className="text-4xl font-bold text-[#c6b677] mb-2">Active</p>
                            <p className="text-xs uppercase tracking-widest text-white/50">Society Status</p>
                        </div>
                        <div className="bg-[#f8f9fa] p-10 rounded-3xl border border-gray-100 shadow-xl group hover:border-[#c6b677] transition-all text-center">
                            <Users size={32} className="mx-auto mb-2 text-[#133b5c]" />
                            <p className="text-xs uppercase tracking-widest text-gray-400">Collaborative Environment</p>
                        </div>
                        <div className="bg-[#f8f9fa] p-10 rounded-3xl border border-gray-100 shadow-xl col-span-2 text-center group">
                            <p className="text-2xl font-serif font-bold text-[#133b5c] mb-2 italic">Official Member of DCE Student Council</p>
                            <p className="text-xs uppercase tracking-widest text-[#c6b677] font-bold">Darbhanga College of Engineering</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Gallery Section */}
            {society.gallery && society.gallery.length > 0 && (
                <section className="py-24 px-8 md:px-16 container mx-auto">
                    <div className="text-center mb-16">
                        <ImageIcon className="text-[#c6b677] mx-auto mb-6" size={48} />
                        <h2 className="text-4xl font-serif font-bold text-[#133b5c] mb-4">Society Gallery</h2>
                        <p className="text-gray-400 uppercase tracking-widest text-xs font-bold">Capturing Moments of Excellence</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {society.gallery.map((img, i) => (
                            <div key={i} className={`group relative overflow-hidden rounded-xl cursor-pointer ${i % 3 === 0 ? 'row-span-2' : ''}`}>
                                <img src={img.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Society Moment" />
                                <div className="absolute inset-0 bg-[#133b5c]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <Sparkles className="text-white" />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* 4. Membership CTA */}
            <section className="py-24 bg-[#f8f9fa]">
                <div className="container mx-auto px-8 md:px-16">
                    <div className="bg-[#133b5c] rounded-[3rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                            <Users size={400} className="scale-150 grayscale invert" />
                        </div>
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 text-[#c6b677]">Join Our Legacy</h2>
                            <p className="text-white/60 text-lg md:text-xl font-light italic max-w-3xl mx-auto mb-12 leading-relaxed">
                                Become a part of {society.name}. Whether you're a seasoned professional or a curious beginner, there's a spotlight waiting just for you.
                            </p>
                            <div className="flex flex-wrap justify-center gap-6">
                                <button className="bg-[#c6b677] text-[#133b5c] px-12 py-4 rounded-full font-bold shadow-xl hover:bg-white transition-all transform hover:-translate-y-1">
                                    Register as Member
                                </button>
                                <button className="border border-white/30 px-12 py-4 rounded-full font-bold hover:bg-white/10 transition-all transform hover:-translate-y-1">
                                    Follow our Instagram
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Signature */}
            <section className="py-12 text-center">
                <Heart className="text-red-500 mx-auto mb-4" />
                <p className="text-gray-400 font-bold uppercase tracking-[0.3em] text-[10px]">Curated by {society.name}</p>
            </section>
        </div>
    );
};

export default SocietyPage;
