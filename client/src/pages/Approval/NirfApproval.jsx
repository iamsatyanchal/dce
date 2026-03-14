import React, { useEffect, useState } from 'react';
import { FaTrophy, FaChartBar, FaFileAlt, FaCheckCircle, FaSearch, FaFilePdf, FaDownload } from 'react-icons/fa';
import api from '../../services/api';

const NirfApproval = () => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const { data } = await api.get('/documents?category=nirf');
                setDocuments(data);
            } catch (error) {
                console.error("Error fetching NIRF documents:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDocuments();

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

    // Dynamic documents fetch replaced hardcoded data array

    return (
        <div className="w-full flex flex-col font-sans bg-white overflow-x-hidden">
            {/* 1. Hero Banner */}
            <div className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2000&auto=format&fit=crop"
                    className="absolute inset-0 w-full h-full object-cover scale-105 animate-zoom-in brightness-[0.4]"
                    alt="NIRF Banner"
                />
                <div className="relative z-10 text-center px-4 max-w-4xl">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 animate-slide-in-down tracking-tight">
                        NIRF <span className="text-[#c6b677]">Ranking</span>
                    </h1>
                    <p className="text-gray-200 text-lg md:text-xl font-light mb-8 animate-fade-in delay-300">
                        Measuring institutional performance and academic excellence on a national scale.
                    </p>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent"></div>
            </div>

            {/* 2. Description Section */}
            <div className="py-24 px-8 md:px-16 bg-white reveal">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-20 items-center">
                    <div className="md:w-1/2">
                        <span className="text-yellow-600 font-bold uppercase tracking-widest text-sm mb-4 block">National Framework</span>
                        <h2 className="text-4xl font-serif font-bold text-[#133b5c] mb-8 leading-tight">National Institutional Ranking Framework</h2>
                        <div className="space-y-6 text-gray-600 leading-relaxed text-lg font-light">
                            <p>
                                The National Institutional Ranking Framework (NIRF) was approved by the MHRD and launched by the Honorable Minister of Human Resource Development. This framework outlines a methodology to rank institutions across the country.
                            </p>
                            <p>
                                Darbhanga College of Engineering consistently participates in the NIRF ranking process, providing transparent data regarding our teaching, learning, research, and placement outcomes. Our participation underscores our commitment to continuous improvement and national benchmarking.
                            </p>
                        </div>
                    </div>
                    <div className="md:w-1/2 grid grid-cols-2 gap-4">
                        {[
                            { icon: <FaTrophy />, title: "Excellence", color: "bg-orange-50" },
                            { icon: <FaChartBar />, title: "Benchmarking", color: "bg-blue-50" },
                            { icon: <FaFileAlt />, title: "Data Privacy", color: "bg-green-50" },
                            { icon: <FaSearch />, title: "Transparency", color: "bg-purple-50" }
                        ].map((item, i) => (
                            <div key={i} className={`${item.color} p-10 rounded-2xl flex flex-col items-center text-center group hover:scale-105 transition-all duration-300`}>
                                <div className="text-4xl text-[#133b5c] mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                                <h4 className="font-bold text-[#133b5c] text-sm">{item.title}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 3. Ranking & Data Section */}
            <div className="py-24 px-8 md:px-16 bg-[#f8f9fa] reveal">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-serif font-bold text-[#133b5c] mb-4">Participation Archives</h2>
                        <p className="text-gray-500">View our annual NIRF submission data and ranking status.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {loading ? (
                            <div className="col-span-full py-20 text-center text-gray-400 italic">Retrieving official records...</div>
                        ) : documents.length === 0 ? (
                            <div className="col-span-full py-20 text-center text-gray-400 italic">No NIRF documents found in the archive.</div>
                        ) : documents.map((doc, i) => (
                            <div key={doc._id} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex items-center justify-between group hover:border-[#c6b677] transition-all">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 bg-[#133b5c]/5 rounded-xl flex items-center justify-center text-[#133b5c] group-hover:bg-[#133b5c] group-hover:text-white transition-all text-2xl font-bold">
                                        {doc.title.slice(-2)}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[#133b5c] text-lg">{doc.title} National Submission</h4>
                                        <div className="flex items-center gap-2 text-green-600 text-xs font-bold uppercase mt-1">
                                            <FaCheckCircle /> Participated
                                        </div>
                                    </div>
                                </div>
                                <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer" className="p-4 text-[#c6b677] hover:bg-[#c6b677] hover:text-white rounded-full transition-all block">
                                    <FaDownload />
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 4. Footer Message */}
            <div className="py-20 px-8 bg-white text-center reveal">
                <div className="max-w-3xl mx-auto italic text-gray-400 font-light leading-relaxed">
                    "Ranking is not just a destination, but a journey of continuous academic enhancement. DCE Darbhanga strives for excellence in every metric defined by the NIRF."
                </div>
            </div>
        </div>
    );
};

export default NirfApproval;
