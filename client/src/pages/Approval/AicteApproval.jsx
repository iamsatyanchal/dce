import React, { useEffect, useState } from 'react';
import { FaFilePdf, FaDownload, FaUniversity, FaCertificate, FaShieldAlt, FaExternalLinkAlt } from 'react-icons/fa';
import api from '../../services/api';

const AicteApproval = () => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const { data } = await api.get('/documents?category=aicte');
                setDocuments(data);
            } catch (error) {
                console.error("Error fetching AICTE documents:", error);
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

    // Dynamic documents fetch replaced hardcoded approvals array

    return (
        <div className="w-full flex flex-col font-sans bg-white overflow-x-hidden">
            {/* 1. Hero Banner */}
            <div className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2000&auto=format&fit=crop"
                    className="absolute inset-0 w-full h-full object-cover scale-105 animate-zoom-in brightness-[0.4]"
                    alt="AICTE Banner"
                />
                <div className="relative z-10 text-center px-4 max-w-4xl">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 animate-slide-in-down tracking-tight">
                        AICTE <span className="text-[#c6b677]">Approval</span>
                    </h1>
                    <p className="text-gray-200 text-lg md:text-xl font-light mb-8 animate-fade-in delay-300">
                        Ensuring excellence through rigorous technical standards and institutional compliance.
                    </p>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent"></div>
            </div>

            {/* 2. Description Section */}
            <div className="py-24 px-8 md:px-16 bg-white reveal">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-20 items-center">
                    <div className="md:w-1/2">
                        <span className="text-yellow-600 font-bold uppercase tracking-widest text-sm mb-4 block">Regulatory Compliance</span>
                        <h2 className="text-4xl font-serif font-bold text-[#133b5c] mb-8 leading-tight">All India Council for Technical Education</h2>
                        <div className="space-y-6 text-gray-600 leading-relaxed text-lg font-light">
                            <p>
                                The All India Council for Technical Education (AICTE) is a statutory body, and a national-level council for technical education, under the Department of Higher Education. AICTE is responsible for proper planning and coordinated development of the technical education and management education system in India.
                            </p>
                            <p>
                                Darbhanga College of Engineering is proudly approved by AICTE, adhering to all the norms and standards prescribed by the council. This approval reflects our commitment to providing high-quality technical education that meets global benchmarks.
                            </p>
                        </div>
                    </div>
                    <div className="md:w-1/2 grid grid-cols-2 gap-4">
                        {[
                            { icon: <FaUniversity />, title: "National Standards", color: "bg-blue-50" },
                            { icon: <FaCertificate />, title: "Quality Assurance", color: "bg-amber-50" },
                            { icon: <FaShieldAlt />, title: "Regulatory Trust", color: "bg-green-50" },
                            { icon: <FaExternalLinkAlt />, title: "Global Recognition", color: "bg-purple-50" }
                        ].map((item, i) => (
                            <div key={i} className={`${item.color} p-10 rounded-2xl flex flex-col items-center text-center group hover:scale-105 transition-all duration-300`}>
                                <div className="text-4xl text-[#133b5c] mb-4 group-hover:rotate-12 transition-transform">{item.icon}</div>
                                <h4 className="font-bold text-[#133b5c] text-sm">{item.title}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 3. Downloadable Table Section */}
            <div className="py-24 px-8 md:px-16 bg-[#f8f9fa] reveal">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-serif font-bold text-[#133b5c] mb-4">Extension of Approval Letters</h2>
                        <p className="text-gray-500">Official academic year-wise approval documents from AICTE.</p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-[#133b5c] text-white">
                                    <tr>
                                        <th className="px-8 py-6 font-bold uppercase tracking-wider text-sm">SL#</th>
                                        <th className="px-8 py-6 font-bold uppercase tracking-wider text-sm">Academic Year</th>
                                        <th className="px-8 py-6 font-bold uppercase tracking-wider text-sm text-center">Download</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {loading ? (
                                        <tr><td colSpan="3" className="px-8 py-6 text-center text-gray-400 italic">Retrieving official records...</td></tr>
                                    ) : documents.length === 0 ? (
                                        <tr><td colSpan="3" className="px-8 py-6 text-center text-gray-400 italic">No AICTE documents found in the archive.</td></tr>
                                    ) : documents.map((doc, i) => (
                                        <tr key={doc._id} className="hover:bg-gray-50 transition-colors group">
                                            <td className="px-8 py-6 text-gray-500 font-medium">{documents.length - i}</td>
                                            <td className="px-8 py-6 text-[#133b5c] font-bold">{doc.title}</td>
                                            <td className="px-8 py-6 text-center">
                                                <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#c6b677]/10 text-[#c6b677] px-6 py-2 rounded-full font-bold text-xs group-hover:bg-[#c6b677] group-hover:text-white transition-all transform group-hover:-translate-y-1">
                                                    <FaFilePdf /> PDF Archive <FaDownload className="text-[10px]" />
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* 4. Footer Message */}
            <div className="py-20 px-8 bg-white text-center reveal">
                <div className="max-w-3xl mx-auto italic text-gray-400 font-light leading-relaxed">
                    "DCE Darbhanga is dedicated to maintaining the highest standards of technical education as mandated by the All India Council for Technical Education, fostering an environment of innovation and academic excellence for all its students."
                </div>
            </div>
        </div>
    );
};

export default AicteApproval;
