import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Quote, User, Briefcase, GraduationCap, X, Upload, CheckCircle2 } from 'lucide-react';

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState("");
    const [batch, setBatch] = useState("");
    const [branch, setBranch] = useState("");
    const [company, setCompany] = useState("");
    const [text, setText] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchTestimonials = async () => {
            try {
                // Fetch only approved testimonials
                const { data } = await api.get('/student-life/testimonials');
                setTestimonials(data);
            } catch (error) {
                console.error("Error fetching testimonials:", error);
            }
        };
        fetchTestimonials();

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !batch || !branch || !text || !imageFile) {
            setMessage("Please fill all required fields and select an image");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("batch", batch);
        formData.append("branch", branch);
        formData.append("company", company);
        formData.append("text", text);
        formData.append("image", imageFile);

        setLoading(true); setMessage("");
        try {
            await api.post('/student-life/testimonials/public', formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            setMessage("Thank you! Your testimonial has been submitted and is pending admin approval.");
            setName(""); setBatch(""); setBranch(""); setCompany(""); setText(""); setImageFile(null);
            setTimeout(() => { setIsModalOpen(false); setMessage(""); }, 3000);
        } catch (err) {
            setMessage("Failed to submit testimonial. Please try again.");
        }
        finally { setLoading(false); }
    };

    return (
        <div className="min-h-screen bg-[#f8f9fa]">
            {/* 1. Header Section */}
            <div className="bg-[#133b5c] pt-40 pb-20 relative overflow-hidden text-center text-white">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#c6b677]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#c6b677]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>

                <div className="container mx-auto px-8 max-w-4xl relative z-10 reveal">
                    <div className="w-16 h-16 bg-[#c6b677]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <User className="text-[#c6b677]" size={32} />
                    </div>
                    <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 tracking-tight">Leave Your Legacy</h1>
                    <p className="text-lg md:text-xl text-white/70 font-light italic leading-relaxed">
                        "Are you a current student or an alumnus with a story to share? We'd love to spotlight your successes and experiences on this page."
                    </p>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="mt-10 border-b-2 border-[#c6b677] pb-1 text-[#c6b677] font-bold uppercase tracking-[0.2em] text-sm hover:text-white hover:border-white transition-colors"
                    >
                        Submit Your Testimonial
                    </button>
                </div>
            </div>

            {/* 2. Testimonials Grid Section */}
            <section className="py-24 container mx-auto px-8 md:px-16 reveal relative">
                <div className="absolute top-1/2 left-0 w-[30rem] h-[30rem] bg-[#c6b677]/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"></div>

                <div className="text-center mb-20 relative z-10">
                    <span className="text-[#c6b677] font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Alumni Voices</span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#133b5c] mb-6">Voices of DCE</h2>
                    <div className="w-24 h-1 bg-[#c6b677] mx-auto opacity-50"></div>
                </div>

                {testimonials.length === 0 ? (
                    <div className="py-20 text-center text-gray-400 italic font-light border border-dashed border-gray-300 rounded-3xl relative z-10">
                        No testimonials to display yet. Be the first to share your story!
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
                        {testimonials.map((t, i) => (
                            <div key={i} className="bg-white p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(19,59,92,0.1)] transition-all duration-500 border border-gray-100 flex flex-col h-full group relative overflow-hidden">
                                <Quote className="absolute top-8 right-8 text-[#133b5c]/5 group-hover:text-[#c6b677]/10 transition-colors duration-500" size={64} />

                                <div className="flex-1 relative z-10 mb-8">
                                    <p className="text-gray-600 leading-loose italic font-light font-serif text-lg">
                                        "{t.text}"
                                    </p>
                                </div>

                                <div className="flex items-center gap-5 pt-6 border-t border-gray-50 relative z-10">
                                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#133b5c]/10 group-hover:border-[#c6b677] transition-colors shrink-0">
                                        {t.imageUrl ? (
                                            <img src={t.imageUrl} alt={t.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full bg-[#133b5c]/5 flex items-center justify-center text-[#133b5c] font-bold text-xl uppercase font-serif">
                                                {t.name.charAt(0)}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[#133b5c] text-lg mb-1">{t.name}</h4>
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2 text-xs text-gray-500 font-bold tracking-wider uppercase">
                                                <GraduationCap size={14} className="text-[#c6b677]" />
                                                <span>{t.branch} • {t.batch}</span>
                                            </div>
                                            {t.company && (
                                                <div className="flex items-center gap-2 text-xs text-emerald-600 font-bold tracking-wider uppercase">
                                                    <Briefcase size={12} />
                                                    <span>{t.company}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Modal Overlay */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                        {/* Modal Header */}
                        <div className="bg-[#133b5c] p-6 text-white flex justify-between items-center shrink-0">
                            <div>
                                <h3 className="text-2xl font-serif font-bold border-b border-[#c6b677] inline-block pb-1">Share Your Story</h3>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="text-white/70 hover:text-white transition-colors bg-white/10 p-2 rounded-full">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body (Scrollable form) */}
                        <div className="p-8 overflow-y-auto">
                            {message && (
                                <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${message.includes("Thank you") ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>
                                    <CheckCircle2 size={18} /> <span className="text-sm font-bold">{message}</span>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Full Name *</label>
                                        <input type="text" required value={name} onChange={e => setName(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#c6b677] outline-none" placeholder="e.g. Rahul Kumar" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Batch (Graduation Year) *</label>
                                        <input type="text" required value={batch} onChange={e => setBatch(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#c6b677] outline-none" placeholder="e.g. 2024" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Branch *</label>
                                        <input type="text" required value={branch} onChange={e => setBranch(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#c6b677] outline-none" placeholder="e.g. Computer Science Engineering" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Current Company (Optional)</label>
                                        <input type="text" value={company} onChange={e => setCompany(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#c6b677] outline-none" placeholder="e.g. TCS, Microsoft..." />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Profile Picture *</label>
                                    <div className="border border-gray-200 rounded-xl p-2 bg-gray-50 flex items-center">
                                        <input type="file" required onChange={e => setImageFile(e.target.files[0])} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-[#133b5c]/10 file:text-[#133b5c] hover:file:bg-[#133b5c]/20 cursor-pointer" />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Your Testimonial *</label>
                                    <textarea required value={text} onChange={e => setText(e.target.value)} className="w-full p-4 border border-gray-200 rounded-xl min-h-[120px] focus:ring-2 focus:ring-[#c6b677] outline-none font-serif italic text-gray-700" placeholder="Describe your experience at DCE..."></textarea>
                                </div>

                                <button type="submit" disabled={loading} className="w-full bg-[#133b5c] text-white py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-[#1a4b73] transition-colors flex justify-center items-center gap-2">
                                    <Upload size={18} /> {loading ? "Submitting..." : "Submit for Approval"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Testimonials;
