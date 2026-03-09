import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CampusLife = () => {

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] }
        }
    };

    return (
        <section className="w-full bg-[#f4f4f4] pt-16 pb-0 overflow-hidden font-sans">
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-7xl mx-auto px-4 lg:px-8 mb-10"
            >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-l-2 border-gray-300 pl-6 space-y-4 md:space-y-0 relative">
                    {/* Main Titles */}
                    <div>
                        <span className="text-gray-600 tracking-wide text-lg sm:text-xl font-light">Campus Life</span>
                        <h2 className="text-[#00338d] text-3xl sm:text-4xl lg:text-5xl font-serif mt-1 max-w-xl leading-snug">
                            A COMMUNITY OF<br />POSSIBILITIES
                        </h2>
                    </div>
                </div>
            </motion.div>

            {/* Grid Layout Container */}
            <div className="w-full max-w-[1920px] mx-auto">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-12 auto-rows-[300px] md:auto-rows-[40vh]"
                >

                    {/* Block 1: Left Main Image */}
                    <motion.div
                        variants={itemVariants}
                        className="col-span-1 md:col-span-5 row-span-2 relative group cursor-pointer overflow-hidden origin-bottom"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop"
                            alt="Events and Celebrations"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end transform transition-transform duration-500 group-hover:-translate-y-2">
                            <h3 className="text-white text-xl md:text-2xl font-semibold tracking-wide">Events & Celebrations</h3>
                            <div className="bg-transparent border border-white rounded-full p-2 text-white group-hover:bg-white group-hover:text-black transition-all duration-300">
                                <ChevronRight size={18} />
                            </div>
                        </div>
                        <Link to="/student-fest" className="absolute inset-0 z-20"></Link>
                    </motion.div>

                    {/* Center Column Wrapper */}
                    <div className="col-span-1 md:col-span-3 row-span-2 flex flex-col">

                        {/* Block 2: Center Top Image */}
                        <motion.div
                            variants={itemVariants}
                            className="flex-1 relative group cursor-pointer overflow-hidden h-[300px] md:h-1/2"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1493225457124-a1a2a5f5f9af?q=80&w=1000&auto=format&fit=crop"
                                alt="Art & Culture"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end transform transition-transform duration-500 group-hover:-translate-y-2">
                                <h3 className="text-[#dcb15b] text-lg font-semibold tracking-wide transition-colors group-hover:text-yellow-400">Art & Culture</h3>
                                <div className="bg-transparent border border-white rounded-full p-1.5 text-white group-hover:bg-white group-hover:text-black transition-all duration-300">
                                    <ChevronRight size={14} />
                                </div>
                            </div>
                            <Link to="/student-society/kala-and-kalakar" className="absolute inset-0 z-20"></Link>
                        </motion.div>

                        {/* Block 3: Center Bottom Menu */}
                        <motion.div
                            variants={itemVariants}
                            className="flex-1 bg-[#15428f] p-6 sm:p-8 flex flex-col justify-center h-[300px] md:h-1/2 overflow-hidden relative"
                        >
                            {/* Decorative background circle */}
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl transition-transform duration-700 hover:scale-150"></div>

                            <ul className="space-y-4 relative z-10">
                                {[
                                    { label: "Sports", path: "/campus-life/sports" },
                                    { label: "Innovation & Entrepreneurship", path: "/campus-life/innovation" },
                                    { label: "Magazine", path: "/magazine" },
                                    { label: "360° Virtual Tour", path: "/campus-life/tour" }
                                ].map((item, index) => (
                                    <li key={index} className="border-b border-white/20 pb-3 last:border-0 last:pb-0 overflow-hidden">
                                        <Link to={item.path} className="text-white hover:text-yellow-400 transition-colors text-sm sm:text-base font-medium flex items-center group relative w-max">
                                            {item.label}
                                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                    </div>

                    {/* Right Column Wrapper */}
                    <div className="col-span-1 md:col-span-4 row-span-2 flex flex-col">

                        {/* Top Row Split */}
                        <div className="flex flex-col sm:flex-row h-auto md:h-1/2">
                            {/* Block 4: Facilities Left */}
                            <motion.div
                                variants={itemVariants}
                                className="flex-1 relative group cursor-pointer overflow-hidden border-r border-white/30 border-b h-[300px] sm:h-auto"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1596417772648-527fbdd47a3e?q=80&w=1000&auto=format&fit=crop"
                                    alt="Campus Facilities"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
                                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end transform transition-transform duration-500 group-hover:-translate-y-2">
                                    <h3 className="text-white text-sm sm:text-base font-bold tracking-wide w-1/2">Campus Facilities</h3>
                                    <div className="bg-transparent border border-white rounded-full p-1.5 text-white group-hover:bg-white group-hover:text-black transition-all duration-300">
                                        <ChevronRight size={14} />
                                    </div>
                                </div>
                                <Link to="/about/infrastructure" className="absolute inset-0 z-20"></Link>
                            </motion.div>

                            {/* Block 5: Facilities Right */}
                            <motion.div
                                variants={itemVariants}
                                className="flex-1 relative group cursor-pointer overflow-hidden border-b border-white/30 h-[300px] sm:h-auto"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1560523160-754a9e425192?q=80&w=1000&auto=format&fit=crop"
                                    alt="Academic Facilities"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
                                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end transform transition-transform duration-500 group-hover:-translate-y-2">
                                    <h3 className="text-white text-sm sm:text-base font-bold tracking-wide w-1/2">Academic Facilities</h3>
                                    <div className="bg-transparent border border-white rounded-full p-1.5 text-white group-hover:bg-white group-hover:text-black transition-all duration-300">
                                        <ChevronRight size={14} />
                                    </div>
                                </div>
                                <Link to="/about/infrastructure" className="absolute inset-0 z-20"></Link>
                            </motion.div>
                        </div>

                        {/* Block 6: Right Bottom Large Image */}
                        <motion.div
                            variants={itemVariants}
                            className="flex-1 relative group cursor-pointer overflow-hidden h-[300px] md:h-1/2"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1000&auto=format&fit=crop"
                                alt="Community Focus"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-500"></div>
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <span className="bg-white/20 backdrop-blur-md border border-white/50 text-white font-medium py-2 px-6 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    Explore More
                                </span>
                            </div>
                        </motion.div>

                    </div>

                </motion.div>
            </div>
        </section>
    );
};

export default CampusLife;
