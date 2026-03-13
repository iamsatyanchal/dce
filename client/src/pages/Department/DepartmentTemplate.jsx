import React, { useEffect, useState } from 'react';
import {
    FaUserTie, FaFlask, FaGraduationCap, FaDownload, FaBuilding,
    FaChartLine, FaCheckCircle, FaAward, FaQuestionCircle,
    FaChevronDown, FaLaptopCode, FaMicroscope, FaBookOpen,
    FaShieldAlt, FaTools, FaHardHat, FaBolt, FaAtom, FaFireExtinguisher
} from 'react-icons/fa';
import { ArrowRight, Mail, Phone, ExternalLink } from 'lucide-react';

const IconMap = {
    FaUserTie: <FaUserTie />,
    FaFlask: <FaFlask />,
    FaGraduationCap: <FaGraduationCap />,
    FaBuilding: <FaBuilding />,
    FaChartLine: <FaChartLine />,
    FaAward: <FaAward />,
    FaLaptopCode: <FaLaptopCode />,
    FaMicroscope: <FaMicroscope />,
    FaBookOpen: <FaBookOpen />,
    FaShieldAlt: <FaShieldAlt />,
    FaTools: <FaTools />,
    FaHardHat: <FaHardHat />,
    FaBolt: <FaBolt />,
    FaAtom: <FaAtom />,
    FaFireExtinguisher: <FaFireExtinguisher />
};

const DepartmentTemplate = ({ data }) => {
    const [activeFaq, setActiveFaq] = useState(null);
    const [activeSyllabus, setActiveSyllabus] = useState(0);

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

    if (!data) return null;

    return (
        <div className="w-full bg-white overflow-x-hidden font-sans">

            {/* 1. Hero Section */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-[#133b5c]">
                {/* Animated Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] ease-out scale-110 animate-slow-zoom"
                    style={{ backgroundImage: `url(${data.heroImage || 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2000&auto=format&fit=crop'})`, opacity: '0.4' }}
                ></div>
                {/* Darker Overlay for better contrast */}
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative z-10 text-center px-6 max-w-5xl pt-20">
                    <div className="reveal animate-slide-in-down">
                        <span className="bg-[#c6b677] text-[#133b5c] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 inline-block shadow-lg">
                            Seat Capacity: {data.intake} Students
                        </span>
                        <h1 className="text-4xl md:text-7xl font-serif font-bold text-white mb-6 uppercase tracking-tight">
                            {data.name}
                        </h1>
                        <p className="text-gray-200 text-lg md:text-2xl font-light mb-10 max-w-3xl mx-auto italic select-none">
                            "{data.tagline}"
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <button className="bg-[#c6b677] text-[#133b5c] px-8 py-3 rounded-sm font-bold shadow-xl hover:bg-white transition-all flex items-center gap-2 group">
                                <FaDownload className="group-hover:translate-y-1 transition-transform" /> Syllabus
                            </button>
                            <button className="border border-white/30 text-white backdrop-blur-md px-8 py-3 rounded-sm font-bold hover:bg-white/10 transition-all">
                                View Faculty
                            </button>
                            <button className="border border-white/30 text-white backdrop-blur-md px-8 py-3 rounded-sm font-bold hover:bg-white/10 transition-all">
                                Visit Labs
                            </button>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent"></div>
            </section>

            {/* 2. Branch Overview & 3. Key Highlights */}
            <section className="py-24 px-8 md:px-16 container mx-auto">
                <div className="flex flex-col lg:flex-row gap-20">
                    <div className="lg:w-2/3 reveal">
                        <span className="text-yellow-600 font-bold uppercase tracking-[0.3em] text-xs mb-4 block">About the Department</span>
                        <h2 className="text-4xl font-serif font-bold text-[#133b5c] mb-10 leading-tight">Nurturing Excellence in Engineering</h2>
                        <div className="space-y-6 text-gray-600 text-lg leading-relaxed font-light">
                            {data.description && data.description.map((p, i) => <p key={i}>{p}</p>)}
                        </div>
                    </div>

                    <div className="lg:w-1/3 grid grid-cols-1 gap-6 reveal delay-300">
                        {data.highlights && data.highlights.map((h, i) => (
                            <div key={i} className="bg-[#133b5c] p-8 rounded-xl text-white shadow-2xl relative overflow-hidden group hover:-translate-y-2 transition-all">
                                <div className="absolute -right-4 -bottom-4 text-white/5 text-8xl group-hover:rotate-12 transition-transform">
                                    {IconMap[h.icon] || <FaAward />}
                                </div>
                                <h4 className="text-[#c6b677] font-bold uppercase tracking-widest text-xs mb-2">{h.label}</h4>
                                <p className="text-2xl font-serif font-bold">{h.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Programs & Seat Intake */}
            <section className="py-24 bg-[#133b5c] text-white overflow-hidden relative">
                <div className="container mx-auto px-8 md:px-16 relative z-10 reveal">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4 text-[#c6b677]">Academic Programs</h2>
                        <p className="text-white/60">Comprehensive curriculum aligned with industry standards and BEU Patna guidelines.</p>
                    </div>

                    <div className="overflow-x-auto rounded-2xl border border-white/10 backdrop-blur-sm bg-white/5">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-white/10 text-[#c6b677] uppercase text-xs tracking-widest">
                                    <th className="p-6">Program Name</th>
                                    <th className="p-6">Intake</th>
                                    <th className="p-6">Duration</th>
                                    <th className="p-6">Eligibility</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {data.programs && data.programs.map((prog, i) => (
                                    <tr key={i} className="hover:bg-white/5 transition-colors">
                                        <td className="p-6 font-bold">{prog.name}</td>
                                        <td className="p-6">{prog.intake}</td>
                                        <td className="p-6">{prog.duration}</td>
                                        <td className="p-6 text-white/70 text-sm italic">{prog.eligibility}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* 5. HOD Section */}
            <section className="py-24 px-8 md:px-16 container mx-auto reveal">
                <div className="bg-[#f8f9fa] rounded-3xl p-12 md:p-20 flex flex-col md:flex-row gap-16 items-center shadow-inner relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#c6b677]/5 rounded-full -mr-32 -mt-32"></div>
                    <div className="w-64 h-80 flex-shrink-0 relative">
                        <div className="absolute inset-0 border-2 border-[#c6b677] translate-x-4 translate-y-4 rounded-2xl"></div>
                        <img
                            src={data.hod.image || "https://via.placeholder.com/300x400"}
                            className="w-full h-full object-cover rounded-2xl relative z-10 shadow-2xl"
                            alt={data.hod.name}
                        />
                    </div>
                    <div className="relative z-10">
                        <span className="text-yellow-600 font-bold uppercase tracking-widest text-xs mb-4 block">HOD Message</span>
                        <h2 className="text-4xl font-serif font-bold text-[#133b5c] mb-2">{data.hod.name}</h2>
                        <p className="text-[#c6b677] font-bold text-sm mb-6 uppercase tracking-wider">{data.hod.designation} | {data.hod.qualification}</p>
                        <blockquote className="text-gray-600 text-xl leading-relaxed font-light italic mb-8 border-l-4 border-[#c6b677] pl-8">
                            "{data.hod.message}"
                        </blockquote>
                        <div className="flex gap-4">
                            <a href={`mailto:${data.hod.email}`} className="text-[#133b5c] hover:text-[#c6b677] transition-all flex items-center gap-2 font-bold text-sm underline"><Mail size={16} /> {data.hod.email}</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Faculty Section */}
            <section className="py-24 px-8 md:px-16 bg-white">
                <div className="container mx-auto reveal">
                    <div className="flex justify-between items-end mb-16">
                        <div>
                            <span className="text-yellow-600 font-bold uppercase tracking-widest text-xs mb-4 block">Our Team</span>
                            <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#133b5c]">Core Faculty Members</h2>
                        </div>
                        <button className="text-[#133b5c] font-bold flex items-center gap-2 hover:gap-4 transition-all">View Full Directory <ArrowRight size={20} /></button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {data.faculty && data.faculty.map((f, i) => (
                            <div key={i} className="group cursor-pointer">
                                <div className="relative overflow-hidden rounded-2xl aspect-[4/5] mb-6">
                                    <img src={f.image || "https://via.placeholder.com/400"} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={f.name} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#133b5c] via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity"></div>
                                    <div className="absolute bottom-0 left-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform text-white">
                                        <p className="text-xs uppercase tracking-widest text-[#c6b677] mb-1">{f.specialization}</p>
                                        <button className="text-sm font-bold flex items-center gap-2">Read Profile <ArrowRight size={14} /></button>
                                    </div>
                                </div>
                                <h4 className="text-xl font-bold text-[#133b5c] mb-1">{f.name}</h4>
                                <p className="text-gray-500 text-sm font-light uppercase tracking-widest">{f.designation}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. Laboratories & Infrastructure */}
            <section className="py-24 bg-[#f8f9fa] overflow-hidden">
                <div className="container mx-auto px-8 md:px-16 reveal">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-serif font-bold text-[#133b5c] mb-4">Dedicated Laboratories</h2>
                        <p className="max-w-2xl mx-auto text-gray-500 font-light">Equipped with the latest industry-standard tools and technologies for practical excellence.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {data.labs && data.labs.map((lab, i) => (
                            <div key={i} className="flex gap-8 group items-start">
                                <div className="w-32 h-32 flex-shrink-0 bg-white shadow-xl rounded-2xl flex items-center justify-center text-4xl text-[#c6b677] group-hover:bg-[#133b5c] group-hover:text-white transition-all transform group-hover:rotate-6">
                                    {lab.icon || <FaFlask />}
                                </div>
                                <div>
                                    <h4 className="text-2xl font-bold text-[#133b5c] mb-3">{lab.name}</h4>
                                    <p className="text-gray-500 text-sm leading-relaxed mb-4">{lab.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {lab.tools && lab.tools.map((t, ti) => <span key={ti} className="text-[10px] uppercase font-bold text-[#133b5c]/50 bg-gray-200 px-3 py-1 rounded-full">{t}</span>)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 8. Curriculum & Syllabus (Accordion) */}
            <section className="py-24 px-8 md:px-16 container mx-auto reveal">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="bg-[#133b5c] text-[#c6b677] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-4 inline-block">Study Plan</span>
                        <h2 className="text-4xl font-serif font-bold text-[#133b5c]">Curriculum & Syllabus</h2>
                    </div>

                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                            <div key={sem} className="border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                                <button
                                    onClick={() => setActiveSyllabus(activeSyllabus === sem ? 0 : sem)}
                                    className="w-full p-6 flex justify-between items-center bg-white hover:bg-gray-50 transition-colors"
                                >
                                    <span className="font-bold text-[#133b5c] flex items-center gap-4">
                                        <span className="w-8 h-8 rounded-full bg-[#c6b677] text-white flex items-center justify-center text-xs">{sem}</span>
                                        Semester {sem} Curriculum
                                    </span>
                                    <FaChevronDown className={`text-[#c6b677] transition-transform ${activeSyllabus === sem ? 'rotate-180' : ''}`} />
                                </button>
                                {activeSyllabus === sem && (
                                    <div className="p-8 bg-gray-50 animate-fade-in divide-y divide-gray-200">
                                        <div className="py-4 flex justify-between items-center group">
                                            <div>
                                                <h5 className="font-bold text-[#133b5c] mb-1">Detailed Syllabus - Sem {sem}</h5>
                                                <p className="text-xs text-gray-400">PDF File | 2.4 MB | Last updated Oct 2025</p>
                                            </div>
                                            <button className="bg-[#133b5c] text-white p-3 rounded-full hover:bg-[#c6b677] transition-all shadow-lg active:scale-90"><FaDownload /></button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 9. Research & Activities */}
            <section className="py-24 bg-[#133b5c] text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="grid grid-cols-12 h-full border-l border-white/5 divide-x divide-white/5">
                        {Array(12).fill(0).map((_, i) => <div key={i} className="h-full"></div>)}
                    </div>
                </div>
                <div className="container mx-auto px-8 md:px-16 relative z-10 reveal">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-20">
                        <h2 className="text-4xl font-serif font-bold mb-4 md:mb-0 text-[#c6b677]">Innovation & Research</h2>
                        <div className="flex gap-10">
                            <div className="text-center">
                                <p className="text-4xl font-bold text-[#c6b677]">45+</p>
                                <p className="text-xs uppercase tracking-widest text-white/50">Publications</p>
                            </div>
                            <div className="text-center">
                                <p className="text-4xl font-bold text-[#c6b677]">12</p>
                                <p className="text-xs uppercase tracking-widest text-white/50">Ongoing Patents</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {data.activities && data.activities.map((act, i) => (
                            <div key={i} className="bg-white/5 p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all group">
                                <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 group-hover:bg-[#c6b677] group-hover:text-[#133b5c] transition-all">
                                    {act.icon || <FaLaptopCode />}
                                </div>
                                <h4 className="text-xl font-bold mb-3 text-[#c6b677]">{act.title}</h4>
                                <p className="text-white/60 text-sm leading-relaxed mb-6 font-light">{act.description}</p>
                                <button className="text-xs uppercase font-bold tracking-widest text-[#c6b677] flex items-center gap-2 hover:gap-4 transition-all">Explore More <ArrowRight size={14} /></button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 10. Placement Section */}
            <section className="py-24 px-8 md:px-16 container mx-auto reveal">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <span className="text-yellow-600 font-bold uppercase tracking-widest text-xs mb-4 block">Future-Ready</span>
                        <h2 className="text-4xl font-serif font-bold text-[#133b5c] mb-6 leading-tight">Industry Interaction & Placements</h2>
                        <p className="text-gray-500 text-lg mb-10 leading-relaxed font-light">The department consistently maintains excellent placement records with students being recruited by Fortune 500 companies and leading Indian conglomerates.</p>

                        {data.placements && (
                            <div className="grid grid-cols-2 gap-6 mb-10">
                                <div className="bg-[#f8f9fa] p-8 rounded-2xl text-center border-b-4 border-[#c6b677]">
                                    <p className="text-3xl font-bold text-[#133b5c]">{data.placements.highestPackage}</p>
                                    <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mt-1">Highest Package</p>
                                </div>
                                <div className="bg-[#f8f9fa] p-8 rounded-2xl text-center border-b-4 border-[#133b5c]">
                                    <p className="text-3xl font-bold text-[#133b5c]">{data.placements.averagePackage}</p>
                                    <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mt-1">Average Package</p>
                                </div>
                            </div>
                        )}
                        <button className="bg-[#133b5c] text-white px-10 py-4 rounded-sm font-bold shadow-xl flex items-center gap-3 hover:translate-x-2 transition-all">View Placement Record <FaChartLine /></button>
                    </div>

                    <div className="grid grid-cols-3 gap-6 bg-[#f8f9fa] p-10 rounded-3xl group">
                        {data.recruiters && data.recruiters.map((r, i) => (
                            <div key={i} className="bg-white p-6 rounded-xl shadow-sm grayscale group-hover:grayscale-0 transition-all hover:scale-105 flex items-center justify-center">
                                <img src={r.logo} className="max-h-12 w-auto object-contain" alt="Recruiter" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 11. Student Achievements */}
            <section className="py-24 bg-[#c6b677] overflow-hidden relative">
                <div className="container mx-auto px-8 md:px-16 relative z-10 reveal">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-serif font-bold text-[#133b5c] mb-4">Student Pride</h2>
                        <p className="text-[#133b5c]/70 font-bold uppercase tracking-widest text-xs">Recent excellence awards and competition winners</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {data.achievements && data.achievements.map((ach, i) => (
                            <div key={i} className="bg-white p-8 rounded-2xl shadow-2xl relative group">
                                <div className="absolute top-0 right-0 w-2 h-0 group-hover:h-full bg-[#133b5c] transition-all duration-300"></div>
                                <div className="text-4xl text-[#133b5c] mb-6 opacity-30"><FaAward /></div>
                                <h4 className="text-xl font-bold text-[#133b5c] mb-3">{ach.title}</h4>
                                <p className="text-gray-500 text-sm leading-relaxed mb-4">{ach.student}</p>
                                <div className="text-[10px] font-bold text-white bg-[#133b5c] px-3 py-1 rounded inline-block uppercase">{ach.year}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 12. FAQ Section */}
            <section className="py-24 px-8 md:px-16 container mx-auto reveal mb-16">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#133b5c] mb-4">Common Questions</h2>
                        <p className="text-gray-400">Everything you need to know about the department and career scope.</p>
                    </div>

                    <div className="space-y-4">
                        {data.faqs && data.faqs.map((faq, i) => (
                            <div key={i} className="border-b border-gray-100">
                                <button
                                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                                    className="w-full py-6 flex justify-between items-center text-left hover:text-[#c6b677] transition-all"
                                >
                                    <span className="font-bold text-[#133b5c] pr-6">{faq.question}</span>
                                    <FaQuestionCircle className={`text-[#c6b677] transition-transform ${activeFaq === i ? 'rotate-180 opacity-100' : 'opacity-30'}`} />
                                </button>
                                {activeFaq === i && (
                                    <div className="pb-8 text-gray-500 text-lg font-light leading-relaxed animate-fade-in">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer Branding */}
            <section className="py-10 bg-[#f8f9fa] border-t border-gray-100 reveal text-center">
                <p className="text-xs uppercase tracking-[0.5em] text-[#133b5c]/30 font-bold mb-2">Darbhanga College of Engineering</p>
                <p className="text-[10px] text-[#c6b677] font-bold">EXCELLENCE IN TECHNICAL EDUCATION SINCE 2008</p>
            </section>
        </div>
    );
};

export default DepartmentTemplate;
