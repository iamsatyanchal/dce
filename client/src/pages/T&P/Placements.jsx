import React, { useState, useEffect } from 'react';
import { FaDownload, FaUsers, FaLaptopCode, FaHandshake, FaUserTie, FaChevronRight, FaFilePdf, FaQuoteLeft, FaArrowRight } from 'react-icons/fa';
import { MdTrendingUp, MdBusiness, MdSchool, MdEngineering } from 'react-icons/md';

const Placements = () => {
    const [selectedYear, setSelectedYear] = useState('2024');
    const [recruiterFilter, setRecruiterFilter] = useState('All');

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

    const stats = {
        '2024': { highest: '18 LPA', average: '5.5 LPA', percent: '85%', offers: '250+', companies: '60+' },
        '2023': { highest: '15 LPA', average: '4.8 LPA', percent: '80%', offers: '210+', companies: '55+' },
        '2022': { highest: '12 LPA', average: '4.2 LPA', percent: '78%', offers: '180+', companies: '45+' },
    };

    const recruiters = [
        { name: 'TCS', category: 'IT', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg' },
        { name: 'Infosys', category: 'IT', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg' },
        { name: 'Wipro', category: 'IT', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg' },
        { name: 'Cognizant', category: 'IT', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/43/Cognizant_logo_2022.svg' },
        { name: 'L&T', category: 'Core', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Larsen_%26_Toubro_logo.svg' },
        { name: 'Adani', category: 'Core', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Adani_Group_logo.svg' },
        { name: 'HCL', category: 'IT', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/HCL_Technologies_logo.svg' },
        { name: 'Byju\'s', category: 'Startup', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/74/Byju%27s_Logo.svg' },
    ];

    const filteredRecruiters = recruiterFilter === 'All'
        ? recruiters
        : recruiters.filter(r => r.category === recruiterFilter);

    return (
        <div className="w-full flex flex-col font-sans bg-white overflow-x-hidden">

            {/* 1. Hero Section */}
            <div className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2000&auto=format&fit=crop"
                    className="absolute inset-0 w-full h-full object-cover scale-105 animate-zoom-in brightness-[0.4]"
                    alt="Hero Background"
                />
                <div className="relative z-10 text-center px-4 max-w-4xl">
                    <h1 className="text-4xl md:text-7xl font-serif font-bold text-white mb-6 animate-slide-in-down tracking-tight">
                        Training & Placement <span className="text-[#c6b677]">Cell</span>
                    </h1>
                    <p className="text-gray-200 text-lg md:text-2xl font-light mb-10 animate-fade-in delay-300">
                        Bridging the gap between academic excellence and corporate leadership.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in delay-500">
                        <button className="bg-[#c6b677] text-[#133b5c] font-bold py-4 px-8 rounded-sm shadow-xl hover:bg-white transition-all transform hover:-translate-y-1 flex items-center gap-2">
                            <FaFilePdf /> Placement Brochure
                        </button>
                        <button className="bg-white/10 backdrop-blur-md text-white border border-white/30 font-bold py-4 px-8 rounded-sm hover:bg-white hover:text-[#133b5c] transition-all transform hover:-translate-y-1">
                            Placement Statistics
                        </button>
                    </div>
                </div>
                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
                    <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
                        <div className="w-1 h-2 bg-white rounded-full"></div>
                    </div>
                </div>
            </div>

            {/* 2. About Placement Cell */}
            <div className="py-24 px-8 md:px-16 bg-white reveal">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20">
                    <div className="lg:w-3/5">
                        <span className="text-yellow-600 font-bold uppercase tracking-widest text-sm mb-4 block">Our Commitment</span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#133b5c] mb-8 leading-tight">Empowering Students for <br /> Global Opportunities</h2>
                        <div className="space-y-6 text-gray-600 leading-relaxed text-lg font-light">
                            <p>The Training and Placement Cell at Darbhanga College of Engineering serves as a vital bridge between the academic world and the professional landscape. Our mission is to provide students with the necessary skills, guidance, and opportunities to launch successful careers in their chosen fields.</p>
                            <p>Through robust industry connections and continuous student preparation initiatives, we ensure that our graduates are not just technically proficient but also professionally prepared for the challenges of the 21st-century workforce.</p>
                        </div>
                    </div>
                    <div className="lg:w-2/5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            { icon: <FaLaptopCode />, title: "Internships", desc: "Real-world exposure" },
                            { icon: <MdTrendingUp />, title: "Training", desc: "Skill enhancement" },
                            { icon: <FaHandshake />, title: "Tie-ups", desc: "Industry partners" },
                            { icon: <FaUserTie />, title: "Guidance", desc: "Career mentoring" }
                        ].map((item, i) => (
                            <div key={i} className="bg-gray-50 p-8 rounded-xl border border-gray-100 hover:border-[#c6b677] hover:shadow-xl transition-all group flex flex-col items-center text-center">
                                <div className="text-3xl text-[#133b5c] group-hover:text-yellow-600 group-hover:scale-110 transition-all mb-4">
                                    {item.icon}
                                </div>
                                <h4 className="font-bold text-[#133b5c] mb-2">{item.title}</h4>
                                <p className="text-xs text-gray-400 uppercase tracking-tighter">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 3. Placement Statistics */}
            <div className="py-24 px-8 md:px-16 bg-[#133b5c] text-white overflow-hidden reveal">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                        <div>
                            <span className="text-yellow-400 font-bold uppercase tracking-widest text-sm mb-4 block underline underline-offset-8">Metrics of Success</span>
                            <h2 className="text-4xl font-serif font-bold text-white">Placement Statistics</h2>
                        </div>
                        <div className="flex bg-white/10 p-1 rounded-sm backdrop-blur-sm">
                            {['2024', '2023', '2022'].map(year => (
                                <button
                                    key={year}
                                    onClick={() => setSelectedYear(year)}
                                    className={`px-6 py-2 text-sm font-bold transition-all ${selectedYear === year ? 'bg-[#c6b677] text-[#133b5c]' : 'hover:text-yellow-400'}`}
                                >
                                    {year}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                        {[
                            { label: "Highest Package", val: stats[selectedYear].highest, icon: <MdTrendingUp /> },
                            { label: "Average Package", val: stats[selectedYear].average, icon: <MdBusiness /> },
                            { label: "Placement %", val: stats[selectedYear].percent, icon: <MdSchool /> },
                            { label: "Total Offers", val: stats[selectedYear].offers, icon: <FaUsers /> },
                            { label: "Companies Visited", val: stats[selectedYear].companies, icon: <FaHandshake /> }
                        ].map((item, i) => (
                            <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-sm hover:bg-white/10 transition-all group">
                                <div className="text-yellow-400 text-3xl mb-6 group-hover:scale-110 transition-transform">{item.icon}</div>
                                <div className="text-3xl font-bold mb-2">{item.val}</div>
                                <div className="text-gray-400 text-sm uppercase tracking-widest">{item.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 4. Recruiters Section */}
            <div className="py-24 px-8 md:px-16 bg-[#f4f4f4] reveal">
                <div className="max-w-7xl mx-auto text-center">
                    <span className="text-yellow-600 font-bold uppercase tracking-widest text-sm mb-4 block">Corporate Partners</span>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#133b5c] mb-12">Who Recruits Our Students?</h2>

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-4 mb-16">
                        {['All', 'Core', 'IT', 'Startup'].map(cat => (
                            <button
                                key={cat}
                                onClick={() => setRecruiterFilter(cat)}
                                className={`px-8 py-3 rounded-full text-sm font-bold transition-all border ${recruiterFilter === cat ? 'bg-[#133b5c] text-white border-[#133b5c]' : 'bg-transparent text-gray-500 border-gray-300 hover:border-[#133b5c] hover:text-[#133b5c]'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Logos Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {filteredRecruiters.map((rec, i) => (
                            <div key={i} className="bg-white p-10 rounded-xl shadow-sm hover:shadow-xl transition-all flex items-center justify-center group h-40">
                                <img
                                    src={rec.logo}
                                    alt={rec.name}
                                    className="max-w-full max-h-full grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 5. Placement Brochure Section */}
            <div className="py-24 px-8 md:px-16 bg-white reveal">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
                    <div className="w-full md:w-1/2">
                        <span className="text-yellow-600 font-bold uppercase tracking-widest text-sm mb-4 block">Information Resource</span>
                        <h2 className="text-4xl font-serif font-bold text-[#133b5c] mb-6">Placement Brochure</h2>
                        <p className="text-gray-600 mb-8 text-lg font-light leading-relaxed">
                            Discover the academic excellence and professional potential of our students through our comprehensive placement brochure. It contains detailed department profiles, student achievements, and our recruitment policies.
                        </p>
                        <div className="flex gap-4">
                            <button className="bg-[#133b5c] text-white py-4 px-10 rounded-sm font-bold shadow-xl hover:bg-[#c6b677] hover:text-[#133b5c] transition-all flex items-center gap-2">
                                <FaFilePdf /> View 2024-25 Brochure
                            </button>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2">
                        <div className="grid grid-cols-2 gap-6">
                            {[2024, 2023, 2022, 2021].map(year => (
                                <div key={year} className="group cursor-pointer">
                                    <div className="bg-[#f4f4f4] p-8 aspect-[3/4] flex flex-col items-center justify-center rounded-xl border-b-4 border-transparent group-hover:border-[#c6b677] transition-all relative overflow-hidden">
                                        <FaFilePdf className="text-4xl text-red-600 mb-4 group-hover:scale-110 transition-transform" />
                                        <span className="font-bold text-[#133b5c]">{year} Archive</span>
                                        <div className="absolute inset-x-0 bottom-0 py-2 bg-[#c6b677] text-[#133b5c] text-[10px] font-bold text-center translate-y-full group-hover:translate-y-0 transition-transform uppercase tracking-widest">Download PDF</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* 6. Placement List (Tabbed Year Filter) */}
            <div className="py-24 px-8 md:px-16 bg-[#f8f9fa] reveal">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-serif font-bold text-[#133b5c] mb-4">Placement Archives</h2>
                        <p className="text-gray-500">Detailed list of placed students and internship offers across graduation years.</p>
                    </div>

                    <div className="flex justify-center mb-12 border-b border-gray-200">
                        {['2025', '2024', '2023'].map(year => (
                            <button
                                key={year}
                                onClick={() => setSelectedYear(year)}
                                className={`px-12 py-4 font-bold text-sm transition-all relative ${selectedYear === year ? 'text-[#133b5c]' : 'text-gray-400 hover:text-[#133b5c]'}`}
                            >
                                {year}
                                {selectedYear === year && <div className="absolute bottom-0 left-0 w-full h-1 bg-[#c6b677] animate-fade-in"></div>}
                            </button>
                        ))}
                    </div>

                    <div className="space-y-4">
                        {[
                            { title: `Final Placement List ${selectedYear}`, type: "PDF", size: "1.2 MB" },
                            { title: `Summer Internship List ${selectedYear}`, type: "PDF", size: "850 KB" },
                            { title: `Branch-wise Offer Summary ${selectedYear}`, type: "XLS", size: "420 KB" }
                        ].map((file, i) => (
                            <div key={i} className="bg-white p-6 rounded-xl flex items-center justify-between shadow-sm hover:shadow-lg transition-all border border-gray-100 group">
                                <div className="flex items-center gap-6">
                                    <div className="w-12 h-12 bg-[#133b5c]/5 flex items-center justify-center rounded-lg text-[#133b5c] group-hover:bg-[#133b5c] group-hover:text-white transition-all">
                                        <FaFilePdf />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[#133b5c]">{file.title}</h4>
                                        <p className="text-xs text-gray-400 font-medium uppercase">{file.type} &bull; {file.size}</p>
                                    </div>
                                </div>
                                <button className="p-3 text-[#c6b677] hover:text-[#133b5c] transition-colors">
                                    <FaDownload />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 7. Placement Process (Visual Timeline) */}
            <div className="py-24 px-8 md:px-16 bg-white reveal overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <span className="text-yellow-600 font-bold uppercase tracking-widest text-sm mb-4 block">The Journey</span>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#133b5c]">Recruitment Process</h2>
                    </div>

                    <div className="relative flex flex-col md:flex-row gap-8">
                        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 hidden md:block -translate-y-1/2"></div>
                        {[
                            { step: "01", title: "Invitation", desc: "Inviting corporate partners" },
                            { step: "02", title: "Registration", desc: "Student slot booking" },
                            { step: "03", title: "Shortlisting", desc: "Resume & GPA screening" },
                            { step: "04", title: "Assessment", desc: "Technical & Aptitude tests" },
                            { step: "05", title: "Interview", desc: "GD and Personal Interviews" },
                            { step: "06", title: "Offer", desc: "Final selection & onboarding" }
                        ].map((item, i) => (
                            <div key={i} className="flex-1 relative z-10 group text-center">
                                <div className="w-16 h-16 bg-[#133b5c] text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-6 group-hover:bg-[#c6b677] transition-all transform group-hover:rotate-[360deg] duration-700 shadow-xl">
                                    {item.step}
                                </div>
                                <h4 className="font-bold text-[#133b5c] mb-2">{item.title}</h4>
                                <p className="text-sm text-gray-400 px-4 leading-relaxed">{item.desc}</p>
                                {i < 5 && <FaChevronRight className="absolute top-8 -right-4 text-gray-200 hidden md:block" />}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 8. Training Programs Section */}
            <div className="py-24 px-8 md:px-16 bg-[#133b5c] text-white reveal">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-16">
                        <div className="md:w-1/3">
                            <h2 className="text-4xl font-serif font-bold mb-8 leading-tight text-white">Preparing for the <span className="text-yellow-400">Future</span></h2>
                            <p className="text-gray-300 font-light leading-relaxed mb-10 text-lg">We provide rigorous training initiatives aimed at the holistic development of our students, ensuring they excel in every stage of recruitment.</p>
                            <div className="inline-flex items-center gap-4 text-yellow-400 font-bold cursor-pointer group">
                                Learn More About Prep <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                            </div>
                        </div>
                        <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                { title: "Aptitude Training", desc: "Quantitative, Logic & Reasoning labs" },
                                { title: "Technical Prep", desc: "Coding camps & core subject drills" },
                                { title: "Soft Skills", desc: "Communication & body language workshops" },
                                { title: "Mock Interviews", desc: "Simulated rounds with industrial experts" }
                            ].map((prog, i) => (
                                <div key={i} className="bg-white/5 border border-white/10 p-10 hover:bg-white transition-all duration-500 rounded-sm group relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-[#c6b677] -translate-x-full group-hover:translate-x-0 transition-transform"></div>
                                    <h4 className="text-xl font-bold mb-4 text-white group-hover:text-[#133b5c] transition-colors">{prog.title}</h4>
                                    <p className="text-gray-300 group-hover:text-gray-600 font-light leading-snug transition-colors">{prog.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>


            {/* 9. Placement Team */}
            <div className="py-24 px-8 md:px-16 bg-[#f4f4f4] reveal">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <span className="text-yellow-600 font-bold uppercase tracking-widest text-sm mb-4 block">The Backbone</span>
                        <h2 className="text-4xl font-serif font-bold text-[#133b5c]">Our T&P Team</h2>
                    </div>

                    <div className="space-y-16">
                        {/* TPO */}
                        <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg border-t-4 border-[#c6b677] text-center">
                            <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-6 overflow-hidden">
                                <img src="https://www.dce-darbhanga.org/wp-content/uploads/2023/05/Screenshot_20230515_192611_WhatsApp.jpg" alt="TPO" className="w-full h-full object-cover" />
                            </div>
                            <h3 className="text-2xl font-bold text-[#133b5c]">Mr. Prafulla Chandra</h3>
                            <p className="text-yellow-600 font-bold text-sm mb-4 uppercase tracking-widest">Training & Placement Officer</p>
                            <div className="flex flex-col gap-2 text-gray-500 text-sm">
                                <span>prafuldce@gmail.com</span>
                                <span>+91-8884911159</span>
                            </div>
                        </div>

                        {/* Faculty Coordinators */}
                        <div>
                            <h4 className="text-xl font-bold text-[#133b5c] mb-8 text-center uppercase tracking-widest">Faculty Coordinators</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {[
                                    { name: "Prof. S. R. Singh", dept: "CSE" },
                                    { name: "Prof. Anjali Kumari", dept: "ECE" },
                                    { name: "Prof. Rajesh Jha", dept: "ME" },
                                    { name: "Prof. Amit Verma", dept: "EE" }
                                ].map((fac, i) => (
                                    <div key={i} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center hover:shadow-md transition-all">
                                        <h5 className="font-bold text-[#133b5c]">{fac.name}</h5>
                                        <p className="text-xs text-gray-400 font-bold uppercase">{fac.dept} Department</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Student Coordinators */}
                        <div>
                            <h4 className="text-xl font-bold text-[#133b5c] mb-8 text-center uppercase tracking-widest">Student Lead Team</h4>
                            <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
                                {[
                                    "Arjun Jha", "Sanya Gupta", "Rakesh Roy", "Isha Verma", "Vikash Singh", "Neha Raj"
                                ].map((lead, i) => (
                                    <div key={i} className="bg-white/50 p-4 rounded-md text-center text-sm font-medium text-gray-600 border border-gray-100">
                                        {lead}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 10. Placement Reviews / Testimonials */}
            <div className="py-24 px-8 md:px-16 bg-white reveal">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-serif font-bold text-[#133b5c]">Voices of Success</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {[
                            { name: "Sonali Kumari", batch: "CSE 2024", company: "TCS Ninja", text: "The T&P cell helped me refine my technical and personality traits. The mock interviews were instrumental in building my confidence." },
                            { name: "Aditya Verma", batch: "ECE 2023", company: "L&T Construction", text: "DCE's industry tie-ups opened doors I didn't know existed. I'm grateful for the continuous support of our faculty mentors." }
                        ].map((test, i) => (
                            <div key={i} className="bg-gray-50 p-10 rounded-3xl relative overflow-hidden group">
                                <FaQuoteLeft className="absolute -top-4 -left-4 text-9xl text-gray-200/50 group-hover:text-[#c6b677]/20 transition-colors" />
                                <div className="relative z-10">
                                    <p className="text-gray-600 italic mb-8 leading-relaxed">"{test.text}"</p>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-[#133b5c] rounded-full text-white flex items-center justify-center font-bold">{test.name[0]}</div>
                                        <div>
                                            <h5 className="font-bold text-[#133b5c]">{test.name}</h5>
                                            <p className="text-xs text-[#c6b677] font-bold uppercase">{test.batch} &bull; Placed at {test.company}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 11. Policies & Guidelines */}
            <div className="py-24 px-8 md:px-16 bg-[#133b5c] text-white reveal">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-16 items-center">
                        <div className="md:w-1/2">
                            <h2 className="text-3xl font-serif font-bold mb-6 text-white">Policies & Guidelines</h2>
                            <p className="text-gray-300 font-light leading-relaxed mb-8">We maintain a transparent and merit-based placement process. All students and participating companies are requested to strictly adhere to our institutional guidelines.</p>
                        </div>
                        <div className="md:w-1/2 grid grid-cols-1 gap-4 w-full">
                            {[
                                { title: "DCE Placement Policy", desc: "Eligibility, one-job policy, and debarment rules." },
                                { title: "Recruiter Guidelines", desc: "Shortlisting process and offer release protocols." },
                                { title: "Internship Policy", desc: "Credit distribution and attendance norms." }
                            ].map((pol, i) => (
                                <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-lg flex items-center justify-between group hover:bg-white/10 transition-all cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <FaFilePdf className="text-xl text-[#c6b677]" />
                                        <div>
                                            <h5 className="font-bold text-white group-hover:text-yellow-400 transition-colors uppercase tracking-wider text-sm">{pol.title}</h5>
                                            <p className="text-xs text-gray-300 group-hover:text-gray-800 transition-colors">{pol.desc}</p>
                                        </div>
                                    </div>
                                    <FaDownload className="text-gray-500 group-hover:text-white transition-all transform group-hover:scale-125" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* 12. Contact Section */}
            <div className="py-24 px-8 md:px-16 bg-[#f8f9fa] reveal">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl font-serif font-bold text-[#133b5c] mb-12">Get in Touch with T&P</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h5 className="font-bold text-[#133b5c] mb-4 uppercase tracking-widest text-xs">Office Address</h5>
                            <p className="text-gray-500 text-sm leading-relaxed">T&P Cell, Administrative Block,<br />DCE Darbhanga, Bihar - 846005</p>
                        </div>
                        <div>
                            <h5 className="font-bold text-[#133b5c] mb-4 uppercase tracking-widest text-xs">Email Inquiries</h5>
                            <p className="text-gray-500 text-sm">prafuldce@gmail.com<br />placements@dce.ac.in</p>
                        </div>
                        <div>
                            <h5 className="font-bold text-[#133b5c] mb-4 uppercase tracking-widest text-xs">Phone Numbers</h5>
                            <p className="text-gray-500 text-sm">+91 06272-255255<br />+91-8884911159</p>
                        </div>
                        <div>
                            <h5 className="font-bold text-[#133b5c] mb-4 uppercase tracking-widest text-xs">Working Hours</h5>
                            <p className="text-gray-500 text-sm">Mon - Sat: 09:00 AM - 05:00 PM<br />Sunday: Closed</p>
                        </div>
                    </div>
                </div>
            </div>

        </div >
    );
};

export default Placements;
