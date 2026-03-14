import React, { useEffect, useState } from 'react';
import { FaGraduationCap, FaLink, FaUniversity, FaStamp, FaHandshake, FaGlobe, FaDownload } from 'react-icons/fa';
import api from '../../services/api';

const BeuApproval = () => {
    const [beuDoc, setBeuDoc] = useState(null);

    useEffect(() => {
        const fetchDoc = async () => {
            try {
                const { data } = await api.get('/documents?category=beu');
                if (data && data.length > 0) setBeuDoc(data[0]);
            } catch (error) {
                console.error("Error fetching BEU doc:", error);
            }
        };
        fetchDoc();

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
        <div className="w-full flex flex-col font-sans bg-white overflow-x-hidden">
            {/* 1. Hero Banner */}
            <div className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden">
                <img
                    src="/beu.jpeg"
                    className="absolute inset-0 w-full h-full object-cover scale-105 animate-zoom-in brightness-[0.4]"
                    alt="BEU Banner"
                />
                <div className="relative z-10 text-center px-4 max-w-4xl">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 animate-slide-in-down tracking-tight">
                        BEU <span className="text-[#c6b677]">Affiliation</span>
                    </h1>
                    <p className="text-gray-200 text-lg md:text-xl font-light mb-8 animate-fade-in delay-300">
                        Bridging institutional academic standards with Bihar's premier engineering university.
                    </p>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent"></div>
            </div>

            {/* 2. Description Section */}
            <div className="py-24 px-8 md:px-16 bg-white reveal">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-20 items-center">
                    <div className="md:w-1/2">
                        <span className="text-yellow-600 font-bold uppercase tracking-widest text-sm mb-4 block">State Higher Education</span>
                        <h2 className="text-4xl font-serif font-bold text-[#133b5c] mb-8 leading-tight">Bihar Engineering University, Patna</h2>
                        <div className="space-y-6 text-gray-600 leading-relaxed text-lg font-light">
                            <p>
                                Bihar Engineering University (BEU) is a state-level technical university established by the Government of Bihar to monitor and enhance the quality of engineering and technical education across the state.
                            </p>
                            <p>
                                Darbhanga College of Engineering is proudly affiliated with Bihar Engineering University, Patna. This affiliation ensures that our curriculum, examination patterns, and academic standards are in perfect sync with the regional and national requirements for engineering professionals.
                            </p>
                        </div>
                        <div className="mt-10 flex flex-wrap gap-4">
                            <a
                                href="https://beu-bih.ac.in/BEUP/Vision.aspx"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 bg-[#133b5c] text-white px-10 py-4 rounded-sm font-bold shadow-xl hover:bg-[#c6b677] hover:text-[#133b5c] transition-all transform hover:-translate-y-1"
                            >
                                <FaGlobe /> Visit BEU Website
                            </a>
                            {beuDoc && (
                                <a
                                    href={beuDoc.fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 border-2 border-[#133b5c] text-[#133b5c] px-10 py-4 rounded-sm font-bold hover:bg-[#133b5c] hover:text-white transition-all transform hover:-translate-y-1"
                                >
                                    <FaDownload /> Download Certificate
                                </a>
                            )}
                        </div>
                    </div>
                    <div className="md:w-1/2 grid grid-cols-2 gap-4">
                        {[
                            { icon: <FaGraduationCap />, title: "Curriculum", color: "bg-blue-50" },
                            { icon: <FaStamp />, title: "Certification", color: "bg-red-50" },
                            { icon: <FaHandshake />, title: "State Support", color: "bg-green-50" },
                            { icon: <FaUniversity />, title: "Governance", color: "bg-amber-50" }
                        ].map((item, i) => (
                            <div key={i} className={`${item.color} p-10 rounded-2xl flex flex-col items-center text-center group hover:scale-105 transition-all duration-300`}>
                                <div className="text-4xl text-[#133b5c] mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                                <h4 className="font-bold text-[#133b5c] text-sm uppercase tracking-wider">{item.title}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 3. Affiliation Message Section */}
            <div className="py-24 px-8 md:px-16 bg-[#f8f9fa] reveal">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-[#133b5c]/5 rounded-full text-[#133b5c] text-3xl mb-8">
                        <FaUniversity />
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-[#133b5c] mb-8">Official Affiliation</h2>
                    <div className="bg-white p-12 rounded-3xl shadow-xl border border-gray-100 italic text-gray-600 leading-relaxed text-lg">
                        "Darbhanga College of Engineering, Darbhanga is a government-funded technical institution that operates under the administrative control of the Department of Science, Technology and Technical Education, Government of Bihar, and is strictly affiliated with **Bihar Engineering University (BEU), Patna** for all its undergraduate and specialized programs."
                    </div>
                </div>
            </div>

            {/* 4. Footer Message */}
            <div className="py-20 px-8 bg-white text-center reveal">
                <div className="max-w-3xl mx-auto italic text-gray-400 font-light leading-relaxed">
                    "Upholding the vision of BEU to transform Bihar into a hub of technical excellence and innovative research."
                </div>
            </div>
        </div>
    );
};

export default BeuApproval;
