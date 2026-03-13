import api from '../../services/api';
import { Palette, Music4, Theater, Mic2, Users, Image as ImageIcon, Sparkles, Heart } from 'lucide-react';
import * as Icons from 'lucide-react';

const KalaKalakar = () => {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);

        // Fetch Societies from API
        const fetchSocieties = async () => {
            try {
                const { data } = await api.get('/student-life/societies');
                setActivities(data);
            } catch (err) {
                console.error("Error fetching societies:", err);
            }
        };
        fetchSocieties();

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

    // Helper to render dynamic icon
    const getIcon = (iconName) => {
        const IconComponent = Icons[iconName] || Icons.Users;
        return <IconComponent size={32} />;
    };

    return (
        <div className="min-h-screen bg-white">
            {/* 1. Hero Section */}
            <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-[#133b5c]">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544928147-79723bd4d284?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-30 animate-zoom-in"></div>
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="relative z-10 text-center px-6 max-w-5xl pt-20">
                    <div className="reveal">
                        <Sparkles className="text-[#c6b677] mx-auto mb-6" size={48} />
                        <span className="text-white/60 font-bold uppercase tracking-[0.5em] text-xs mb-4 block">The Cultural Soul of DCE</span>
                        <h1 className="text-5xl md:text-8xl font-serif font-bold text-white mb-6 uppercase tracking-tight">Kala & Kalakar</h1>
                        <div className="h-1 w-32 bg-[#c6b677] mx-auto mb-8"></div>
                        <p className="text-[#c6b677] text-lg md:text-2xl font-light italic max-w-2xl mx-auto leading-relaxed">
                            "Where art breathes, talent finds a voice, and every student becomes a performer."
                        </p>
                    </div>
                </div>
            </section>

            {/* 2. Philosophy Section */}
            <section className="py-24 px-8 md:px-16 container mx-auto">
                <div className="flex flex-col lg:flex-row gap-20 items-center">
                    <div className="lg:w-1/2 reveal">
                        <span className="text-yellow-600 font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Our Philosophy</span>
                        <h2 className="text-4xl font-serif font-bold text-[#133b5c] mb-8 leading-tight italic">More than just a club, it's an emotion.</h2>
                        <div className="space-y-6 text-gray-500 text-lg leading-relaxed font-light">
                            <p>
                                <span className="text-[#133b5c] font-bold">Kala & Kalakar</span> is the premier cultural society of Darbhanga College of Engineering. We believe that engineering isn't just about logic and calculations; it's about the creative fire that burns within every visionary.
                            </p>
                            <p>
                                Founded to provide a sanctuary for artistic expression, the club has grown into a vibrant community of dancers, musicians, actors, and writers who represent the colors of Bihar across national platforms.
                            </p>
                        </div>
                    </div>
                    <div className="lg:w-1/2 grid grid-cols-2 gap-6 reveal">
                        <div className="bg-[#133b5c] p-10 rounded-3xl text-white shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700"></div>
                            <p className="text-4xl font-bold text-[#c6b677] mb-2">500+</p>
                            <p className="text-xs uppercase tracking-widest text-white/50">Active Members</p>
                        </div>
                        <div className="bg-[#f8f9fa] p-10 rounded-3xl border border-gray-100 shadow-xl group hover:border-[#c6b677] transition-all">
                            <p className="text-4xl font-bold text-[#133b5c] mb-2">25+</p>
                            <p className="text-xs uppercase tracking-widest text-gray-400">Events Yearly</p>
                        </div>
                        <div className="bg-[#f8f9fa] p-10 rounded-3xl border border-gray-100 shadow-xl col-span-2 text-center group">
                            <p className="text-2xl font-serif font-bold text-[#133b5c] mb-2 italic">Excellence in Cultural Arts</p>
                            <p className="text-xs uppercase tracking-widest text-[#c6b677] font-bold">Verified Institution of Talent</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Core Wings */}
            <section className="py-24 bg-[#133b5c] text-white reveal overflow-hidden relative">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                <div className="container mx-auto px-8 md:px-16 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4 italic text-[#c6b677]">Our Creative Wings</h2>
                        <p className="text-white/60">Diverse domains where our students express their creative genius.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {activities.length === 0 ? (
                            <div className="col-span-full py-12 text-center text-white/50 italic border border-dashed border-white/20 rounded-2xl">
                                Stay tuned for upcoming societies!
                            </div>
                        ) : activities.map((act, i) => (
                            <Link to={`/student-society/${act._id}`} key={i} className="bg-white/5 backdrop-blur-md p-10 rounded-2xl border border-white/10 hover:bg-white/10 transition-all text-center group">
                                <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center text-[#c6b677] mx-auto mb-8 group-hover:rotate-6 transition-transform">
                                    {getIcon(act.iconName)}
                                </div>
                                <h4 className="text-xl font-bold mb-4 text-[#c6b677]">{act.name}</h4>
                                <p className="text-white/50 text-sm leading-relaxed font-light">{act.description}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Moments Gallery */}
            <section className="py-24 px-8 md:px-16 container mx-auto reveal">
                <div className="text-center mb-16">
                    <ImageIcon className="text-[#c6b677] mx-auto mb-6" size={48} />
                    <h2 className="text-4xl font-serif font-bold text-[#133b5c] mb-4">Moments in Motion</h2>
                    <p className="text-gray-400 uppercase tracking-widest text-xs font-bold">Freezing the stage in time</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1000&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1000&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1000&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1544928147-79723bd4d284?q=80&w=1000&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1514525253361-bee8d4074da7?q=80&w=1000&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1000&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1472653431158-6364773b2a56?q=80&w=1000&auto=format&fit=crop"
                    ].map((img, i) => (
                        <div key={i} className={`group relative overflow-hidden rounded-xl cursor-pointer ${i === 1 || i === 4 ? 'row-span-2' : ''}`}>
                            <img src={img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Club Moment" />
                            <div className="absolute inset-0 bg-[#133b5c]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Sparkles className="text-white" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 5. Membership CTA */}
            <section className="py-24 bg-[#f8f9fa] reveal">
                <div className="container mx-auto px-8 md:px-16">
                    <div className="bg-[#133b5c] rounded-[3rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                            <Users size={400} className="scale-150 grayscale invert" />
                        </div>
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 text-[#c6b677]">Unleash Your Inner Artist</h2>
                            <p className="text-white/60 text-lg md:text-xl font-light italic max-w-3xl mx-auto mb-12Leading-relaxed">
                                Join the biggest family at DCE. Whether you're a seasoned professional or a curious beginner, there's a spotlight waiting just for you.
                            </p>
                            <div className="flex flex-wrap justify-center gap-6">
                                <button className="bg-[#c6b677] text-[#133b5c] px-12 py-4 rounded-full font-bold shadow-xl hover:bg-white transition-all transform hover:-translate-y-1">
                                    Register as Member
                                </button>
                                <button className="border border-white/30 px-12 py-4 rounded-full font-bold hover:bg-white/10 transition-all transform hover:-translate-y-1">
                                    Follow our Instagram
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Signature */}
            <section className="py-12 text-center reveal">
                <Heart className="text-red-500 mx-auto mb-4" />
                <p className="text-gray-400 font-bold uppercase tracking-[0.3em] text-[10px]">Curated by the Cultural Council</p>
            </section>
        </div>
    );
};

export default KalaKalakar;
