import React, { useEffect, useState } from 'react';
import { FaFilePdf } from 'react-icons/fa';
import api from '../services/api';

const Magazine = () => {
    const [magazines, setMagazines] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMagazines = async () => {
            try {
                const { data } = await api.get('/magazine');
                setMagazines(data);
            } catch (error) {
                console.error("Error fetching magazines:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMagazines();

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

    return (
        <div className="w-full bg-[#f8f9fa] min-h-screen pt-28 pb-20 px-4 md:px-12 overflow-x-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Page Header */}
                <div className="mb-16 reveal">
                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#133b5c] uppercase tracking-wide inline-block relative pb-4">
                        DCE DARBHANGA - UNIBUZZ
                        <span className="absolute bottom-0 left-0 w-32 h-1 bg-[#c6b677]"></span>
                    </h1>
                </div>

                {loading ? (
                    <div className="py-20 text-center text-gray-400 italic font-serif">Loading publications...</div>
                ) : magazines.length === 0 ? (
                    <div className="py-20 text-center bg-white rounded-sm border border-dashed border-gray-200">
                        <p className="text-gray-400 font-serif italic">No magazine editions have been published yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {magazines.map((mag) => (
                            <div key={mag._id} className="group reveal bg-white rounded-sm shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden">
                                {/* Image Container */}
                                <div className="relative h-64 overflow-hidden border-b border-gray-100">
                                    <img
                                        src={mag.coverImage}
                                        alt={mag.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
                                </div>

                                {/* Info Section */}
                                <div className="p-6">
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="relative">
                                            <h3 className="text-[#133b5c] font-medium text-lg lg:text-xl group-hover:text-sky-700 transition-colors">
                                                {mag.title}
                                            </h3>
                                            <div className="mt-4 w-20 h-0.5 bg-[#c6b677]/40 group-hover:w-full transition-all duration-500"></div>
                                        </div>
                                        <a
                                            href={mag.pdfUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="bg-[#c00] p-2.5 rounded-sm shadow-md hover:bg-red-700 hover:scale-110 active:scale-95 transition-all"
                                            title="Download PDF"
                                        >
                                            <FaFilePdf className="text-white text-xl" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Magazine;
