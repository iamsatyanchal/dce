import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../services/api';
import { Link } from 'react-router-dom';

const CampusPlacements = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [currentIdx, setCurrentIdx] = useState(0);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const { data } = await api.get('/student-life/testimonials');
                setTestimonials(data);
            } catch (err) {
                console.error("Failed to load testimonials:", err);
            }
        };
        fetchTestimonials();
    }, []);

    const handleNext = () => {
        if (testimonials.length > 0) {
            setCurrentIdx((prev) => (prev + 1) % testimonials.length);
        }
    };

    const handlePrev = () => {
        if (testimonials.length > 0) {
            setCurrentIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);
        }
    };

    const currentTestimonial = testimonials[currentIdx];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] }
        }
    };

    // The distinct logos required by the user
    const partnerLogos = [
        { id: 1, element: <div className="font-bold text-xl md:text-2xl tracking-tighter flex items-center gap-2"><span className="text-sky-400">tcs</span> <span className="text-[10px] md:text-xs font-normal leading-tight">TATA<br />CONSULTANCY<br />SERVICES</span></div> },
        { id: 2, element: <div className="font-bold text-lg md:text-xl font-sans leading-tight">Tech<br />Mahindra</div> },
        { id: 3, element: <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-dashed border-white/80 flex items-center justify-center font-bold text-xs uppercase">wipro</div> },
        { id: 4, element: <div className="text-4xl md:text-6xl font-sans font-light leading-none opacity-50">&gt;</div> },
        { id: 5, element: <div className="font-black text-2xl md:text-3xl tracking-tighter">NIIT</div> }
    ];

    // Duplicate array to create the infinite scrolling effect seamlessly
    const infiniteLogos = [...partnerLogos, ...partnerLogos.map(l => ({ ...l, id: l.id + 10 }))];

    return (
        <section className="w-full flex flex-col lg:flex-row min-h-[600px] font-sans overflow-hidden bg-[#133b5c]">

            {/* Left Panel - Placement Stats & Image Overlay */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={containerVariants}
                className="lg:w-[65%] w-full relative bg-[#133b5c] text-white flex flex-col justify-between overflow-hidden"
            >

                {/* Background Image with Deep Blue Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1471&auto=format&fit=crop"
                        alt="Students"
                        className="w-full h-full object-cover opacity-50 mix-blend-overlay"
                    />
                    {/* Linear gradient to darken the bottom for logos and right edge for transition */}
                    <div className="absolute inset-0 bg-linear-to-t from-[#0a2339] via-transparent to-transparent opacity-90"></div>
                </div>

                {/* Top Content Area */}
                <motion.div variants={itemVariants} className="relative z-10 p-8 md:p-12 lg:p-16 max-w-2xl">
                    <h4 className="text-gray-300 tracking-wide text-sm md:text-base font-light mb-2">Campus Placements</h4>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif leading-tight mb-6">
                        PLACEMENT SUPPORT AT<br />DCE DARBHANGA
                    </h2>

                    <p className="text-gray-200 text-sm md:text-base leading-relaxed max-w-md mb-8">
                        Our dedicated career advisory and placement team
                        provides comprehensive career counselling to identify
                        the unique and distinctive goals
                    </p>

                    <div className="border border-white/50 rounded-full p-2 inline-flex items-center justify-center cursor-pointer hover:bg-white hover:text-[#133b5c] transition-colors">
                        <ChevronRight size={18} />
                    </div>
                </motion.div>

                {/* Bottom Stats & Logos Area */}
                <div className="relative z-10 p-8 md:p-12 lg:px-16 pt-0 mt-auto">

                    {/* Stats Row */}
                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-start sm:items-center gap-8 md:gap-16 mb-12">
                        {/* Stat 1 */}
                        <div className="flex items-center gap-4 group">
                            <span className="text-5xl md:text-6xl font-serif tracking-tight text-white group-hover:text-yellow-400 transition-colors duration-300">460</span>
                            <span className="text-sm text-gray-300 leading-tight max-w-[80px]">companies participated</span>
                        </div>

                        {/* Divider Line (hidden on very small screens) */}
                        <div className="hidden sm:block w-px h-12 bg-white/20"></div>

                        {/* Stat 2 */}
                        <div className="flex items-center gap-4 group">
                            <span className="text-5xl md:text-6xl font-serif tracking-tight text-white group-hover:text-yellow-400 transition-colors duration-300">1788</span>
                            <span className="text-sm text-gray-300 leading-tight max-w-[100px]">drives hosted on campus</span>
                        </div>
                    </motion.div>

                    {/* Infinite Partner Logos Strip */}
                    <motion.div variants={itemVariants} className="flex overflow-hidden border-t border-white/10 pt-8 mt-auto w-full relative -mx-8 sm:mx-0 px-8 sm:px-0 mask-image-linear-edges">

                        <div className="flex w-max animate-marquee items-center gap-12 sm:gap-16 md:gap-24 opacity-80 pr-12 sm:pr-16 md:pr-24 cursor-default">
                            {infiniteLogos.map((logo) => (
                                <div key={logo.id} className="inline-flex shrink-0 hover:opacity-100 transition-opacity">
                                    {logo.element}
                                </div>
                            ))}
                        </div>

                    </motion.div>

                </div>
            </motion.div>


            {/* Right Panel - Gold Testimonial Block */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }}
                className="lg:w-[35%] w-full bg-[#c8b472] p-8 md:p-12 flex flex-col text-white relative"
            >

                {/* Large Quotation Mark */}
                <div className="text-6xl font-serif font-black mb-4 opacity-90 leading-none">
                    &ldquo;
                </div>

                {testimonials.length > 0 && currentTestimonial ? (
                    <>
                        <p className="text-lg lg:text-[17px] font-medium leading-relaxed mb-6 w-11/12 opacity-95 line-clamp-4 min-h-[110px]">
                            {currentTestimonial.text} <Info size={14} className="inline ml-1 text-white/80" />
                        </p>

                        {/* Alumni Details */}
                        <div className="space-y-1 text-sm font-medium opacity-90">
                            <p>Name: <span className="font-bold tracking-wide">{currentTestimonial.name}</span></p>
                            <p>Branch: <span className="font-bold tracking-wide">{currentTestimonial.branch}</span></p>
                            <p>Batch: <span className="font-bold tracking-wide">{currentTestimonial.batch}</span></p>
                        </div>

                        {/* Placed Company Logo */}
                        <div className="mt-6 mb-8 text-blue-900 font-black text-3xl font-serif italic tracking-tighter mix-blend-color-burn opacity-80 min-h-[36px]">
                            {currentTestimonial.company}
                        </div>

                        {/* Alumni Photo */}
                        <div className="w-48 h-64 lg:h-72 bg-[#133b5c] mb-6 overflow-hidden mt-auto shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                            {currentTestimonial.imageUrl ? (
                                <img
                                    src={currentTestimonial.imageUrl}
                                    alt="Alumni Portrait"
                                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-4xl text-white font-bold opacity-30">{currentTestimonial.name.charAt(0)}</div>
                            )}
                        </div>
                    </>
                ) : (
                    <>
                        <p className="text-lg lg:text-[17px] font-medium leading-relaxed mb-10 w-11/12 opacity-95">
                            A heartfelt thank you to DCE Darbhanga and the placement team for their invaluable support in my placement journey. <Info size={14} className="inline ml-1 text-white/80" />
                        </p>

                        <div className="space-y-1 text-sm font-medium opacity-90">
                            <p>Alumni Name: <span className="font-bold tracking-wide">Deepakshi</span></p>
                            <p>Course: <span className="font-bold tracking-wide">B.Tech (CSE)</span></p>
                            <p>Batch: <span className="font-bold tracking-wide">2020-24</span></p>
                        </div>

                        <div className="mt-6 mb-8 text-blue-900 font-black text-3xl font-serif italic tracking-tighter mix-blend-color-burn opacity-80 min-h-[36px]">
                            KPMG
                        </div>

                        <div className="w-48 h-64 lg:h-72 bg-gray-200 mb-6 overflow-hidden mt-auto shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                            <img
                                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop"
                                alt="Alumni Portrait"
                                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                            />
                        </div>
                    </>
                )}

                {/* Footer Controls */}
                <div className="flex items-center justify-between w-full">
                    <div className="flex gap-3">
                        <div onClick={handlePrev} className={`w-8 h-8 rounded-full border border-white/70 flex items-center justify-center cursor-pointer transition-colors group ${testimonials.length > 1 ? 'hover:bg-white hover:text-[#c8b472]' : 'opacity-50 cursor-not-allowed'}`}>
                            <ChevronLeft size={16} className={`${testimonials.length > 1 ? 'group-hover:-translate-x-0.5' : ''} transition-transform`} />
                        </div>
                        <div onClick={handleNext} className={`w-8 h-8 rounded-full border border-white/70 flex items-center justify-center cursor-pointer transition-colors group ${testimonials.length > 1 ? 'hover:bg-white hover:text-[#c8b472]' : 'opacity-50 cursor-not-allowed'}`}>
                            <ChevronRight size={16} className={`${testimonials.length > 1 ? 'group-hover:translate-x-0.5' : ''} transition-transform`} />
                        </div>
                    </div>

                    <Link to="/testimonial" className="flex items-center gap-1 text-[11px] md:text-xs font-bold tracking-widest uppercase hover:text-white/80 transition-all group cursor-pointer border-b border-transparent hover:border-white pb-0.5 mt-1">
                        View More <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

            </motion.div>

        </section>
    );
};

export default CampusPlacements;
