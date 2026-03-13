import api from '../../services/api';
import { Camera, Music, Trophy, Star, Heart, Calendar, Image as ImageIcon, Sparkles, PartyPopper, ChevronLeft, ChevronRight, X } from 'lucide-react';

const StudentFest = () => {
    const [fests, setFests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lightbox, setLightbox] = useState({ isOpen: false, images: [], index: 0 });

    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchFests = async () => {
            try {
                const { data } = await api.get('/student-life/fests');
                setFests(data);
            } catch (error) {
                console.error("Error fetching fests:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchFests();

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

    const openLightbox = (images, index) => setLightbox({ isOpen: true, images, index });
    const closeLightbox = () => setLightbox({ isOpen: false, images: [], index: 0 });
    const nextImg = (e) => {
        e.stopPropagation();
        setLightbox(prev => ({ ...prev, index: (prev.index + 1) % prev.images.length }));
    };
    const prevImg = (e) => {
        e.stopPropagation();
        setLightbox(prev => ({ ...prev, index: (prev.index - 1 + prev.images.length) % prev.images.length }));
    };

    const festHighlights = [
        {
            title: "Cultural Extravaganza",
            desc: "Mesmerizing dance performances, musical nights, and theatrical plays that showcase Bihar's rich heritage.",
            icon: <Music size={32} />
        },
        {
            title: "Technical Symposium",
            desc: "Robotics competitions, hackathons, and guest lectures by industry pioneers during 'DCE TechFest'.",
            icon: <Star size={32} />
        },
        {
            title: "Sports Meet",
            desc: "Inter-departmental championships in cricket, football, and athletics fostering team spirit.",
            icon: <Trophy size={32} />
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* 1. Hero Section */}
            <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                <div className="absolute inset-0 z-0 bg-[#133b5c]">
                    <img
                        src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2000&auto=format&fit=crop"
                        className="w-full h-full object-cover mix-blend-overlay opacity-50"
                        alt="Background"
                    />
                    <div className="absolute inset-0 bg-linear-to-r from-[#133b5c]/95 to-[#133b5c]/60 backdrop-blur-sm"></div>
                </div>

                <div className="container mx-auto px-8 md:px-16 relative z-10 text-center text-white">
                    <span className="text-[#c6b677] font-bold uppercase tracking-[0.3em] text-sm mb-6 block animate-fade-in-up">Vibrant Campus Life</span>
                    <h1 className="text-5xl lg:text-7xl font-serif font-bold mb-6 leading-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        Student <span className="text-transparent bg-clip-text bg-linear-to-r from-[#c6b677] to-yellow-300">Fests & Events</span>
                    </h1>
                    <p className="text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto font-light leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        Celebrating talents, fostering teamwork, and creating unforgettable memories at DCE.
                    </p>
                </div>
            </div>

            {/* 2. Intro Features */}
            <section className="py-24 bg-white relative reveal">
                <div className="container mx-auto px-8 md:px-16">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {festHighlights.map((feature, i) => (
                            <div key={i} className="text-center group p-8 rounded-4xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                                <div className="w-20 h-20 bg-[#133b5c]/5 text-[#133b5c] rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:bg-[#133b5c] group-hover:text-white transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl">
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-[#133b5c] mb-4">{feature.title}</h3>
                                <p className="text-gray-500 leading-relaxed font-light">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. Dynamic Events Section */}
            <section className="py-24 bg-[#133b5c] text-white relative overflow-hidden reveal">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#c6b677]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                <div className="absolute bottom-0 left-0 w-160 h-160 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                <div className="container mx-auto px-8 md:px-16 relative z-10">
                    <div className="text-center mb-20">
                        <span className="text-[#c6b677] font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Event Archive</span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Our Flagship Events</h2>
                        <div className="w-24 h-1 bg-[#c6b677] mx-auto opacity-50"></div>
                    </div>

                    <div className="space-y-32">
                        {loading ? (
                            <div className="py-24 flex flex-col items-center justify-center text-center">
                                <div className="relative flex justify-center items-center mb-8">
                                    <div className="absolute w-28 h-28 border-4 border-dashed border-[#c6b677]/30 rounded-full animate-[spin_4s_linear_infinite]"></div>
                                    <div className="absolute w-20 h-20 border-4 border-t-pink-500 border-r-yellow-400 border-b-blue-500 border-l-emerald-400 rounded-full animate-spin"></div>
                                    <PartyPopper size={40} className="text-white animate-bounce relative z-10" />
                                </div>
                                <h3 className="text-3xl font-serif font-bold text-white mb-3 tracking-wide">Getting the Party Ready...</h3>
                                <div className="flex items-center justify-center gap-2 text-[#c6b677] font-bold tracking-widest uppercase text-xs">
                                    <Sparkles size={14} className="animate-pulse" />
                                    <span>Loading Events Archive</span>
                                    <Sparkles size={14} className="animate-pulse" />
                                </div>
                            </div>
                        ) : fests.length === 0 ? (
                            <div className="py-12 text-center text-white/50 italic border border-dashed border-white/20 rounded-2xl w-full max-w-2xl mx-auto">
                                No events uploaded yet. Stay tuned for upcoming fests!
                            </div>
                        ) : fests.map((fest, festIdx) => {
                            // Helper to parse youtube link
                            let videoId = null;
                            if (fest.youtubeLink) {
                                const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
                                const match = fest.youtubeLink.match(regExp);
                                videoId = (match && match[2].length === 11) ? match[2] : null;
                            }

                            return (
                                <div key={fest._id || festIdx} className="group border border-white/10 p-8 md:p-12 rounded-[3rem] bg-white/5 backdrop-blur-sm relative overflow-hidden">
                                    <div className="flex flex-col lg:flex-row gap-12 items-start mb-12">
                                        <div className="lg:w-1/3 space-y-6">
                                            <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#c6b677]">{fest.title}</h3>
                                            <p className="text-white/70 leading-relaxed font-light text-lg">
                                                {fest.description}
                                            </p>
                                        </div>

                                        <div className="lg:w-2/3 w-full">
                                            {videoId ? (
                                                <div className="w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10">
                                                    <iframe
                                                        width="100%"
                                                        height="100%"
                                                        src={`https://www.youtube.com/embed/${videoId}?autoplay=0`}
                                                        title="YouTube video player"
                                                        frameBorder="0"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                    ></iframe>
                                                </div>
                                            ) : (
                                                fest.images && fest.images.length > 0 && (
                                                    <div className="w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10">
                                                        <img src={fest.images[0].imageUrl} alt={fest.title} className="w-full h-full object-cover" />
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>

                                    {/* Image Gallery Wrapper */}
                                    {fest.images && fest.images.length > 0 && (
                                        <div>
                                            <div className="flex items-center gap-3 mb-6">
                                                <ImageIcon className="text-[#c6b677]" size={20} />
                                                <span className="font-bold text-sm tracking-widest uppercase text-white/50">Gallery ({fest.images.length})</span>
                                            </div>
                                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                                {fest.images.map((img, imgIdx) => (
                                                    <div key={imgIdx} onClick={() => openLightbox(fest.images, imgIdx)} className="group overflow-hidden rounded-2xl aspect-square cursor-pointer border border-white/10 hover:border-[#c6b677]/50 transition-colors bg-white/5 relative">
                                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                                                            <Camera className="text-white" size={24} />
                                                        </div>
                                                        <img
                                                            src={img.imageUrl}
                                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                            alt={`${fest.title} Moment ${imgIdx + 1}`}
                                                            loading="lazy"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 4. Upcoming Events Placeholder */}
            <section className="py-24 px-8 md:px-16 container mx-auto">
                <div className="bg-[#f8f9fa] rounded-3xl p-12 md:p-20 text-center relative overflow-hidden shadow-inner reveal">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-[#c6b677]/5 rounded-full -ml-32 -mt-32"></div>
                    <Calendar className="text-[#133b5c] mx-auto mb-8" size={64} />
                    <h2 className="text-4xl font-serif font-bold text-[#133b5c] mb-6 italic">Next Edition Loading...</h2>
                    <p className="text-gray-400 text-lg font-light max-w-2xl mx-auto italic mb-10">
                        "Stay tuned for the most anticipated event of the year. Our student council is hard at work planning something spectacular."
                    </p>
                    <div className="flex justify-center gap-4">
                        <div className="bg-white px-6 py-4 rounded-xl shadow-lg border border-gray-100">
                            <p className="text-3xl font-bold text-[#133b5c]">120</p>
                            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Days Left</p>
                        </div>
                        <div className="bg-white px-6 py-4 rounded-xl shadow-lg border border-gray-100">
                            <p className="text-3xl font-bold text-[#133b5c]">08</p>
                            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Departments</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Heartbeat Section */}
            <section className="py-20 bg-[#c6b677] text-center reveal">
                <div className="flex items-center justify-center gap-4 mb-6">
                    <Heart className="text-[#133b5c] fill-[#133b5c] animate-pulse" />
                    <span className="text-[#133b5c] font-bold uppercase tracking-[0.4em] text-xs">The Heartbeat of DCE</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#133b5c] italic">Join the Celebration</h2>
            </section>

            {/* Lightbox Modal */}
            {lightbox.isOpen && (
                <div className="fixed inset-0 z-100 bg-black/95 backdrop-blur-md flex items-center justify-center" onClick={closeLightbox}>
                    <button onClick={closeLightbox} className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-sm z-50">
                        <X size={24} />
                    </button>

                    {lightbox.images.length > 1 && (
                        <>
                            <button onClick={prevImg} className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-4 rounded-full backdrop-blur-sm z-50">
                                <ChevronLeft size={32} />
                            </button>
                            <button onClick={nextImg} className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-4 rounded-full backdrop-blur-sm z-50">
                                <ChevronRight size={32} />
                            </button>
                        </>
                    )}

                    <div className="relative" onClick={e => e.stopPropagation()}>
                        <img src={lightbox.images[lightbox.index].imageUrl} className="max-h-[85vh] max-w-[90vw] object-contain shadow-2xl rounded-xl" alt="Lightbox View" />

                        {lightbox.images.length > 1 && (
                            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-white/60 font-bold tracking-widest text-sm bg-black/50 px-6 py-2 rounded-full backdrop-blur-sm">
                                {lightbox.index + 1} / {lightbox.images.length}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentFest;
