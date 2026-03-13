import React, { useState, useEffect, useCallback } from 'react';
import { ChevronRight, ChevronLeft, Layers } from 'lucide-react';
import api from '../services/api';

const SocialWall = () => {

    const [socialPosts, setSocialPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleCount, setVisibleCount] = useState(3);

    // Fetch images from API
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await api.get('/images');
                // Map the api data to the shape expected by the component
                const formattedImages = response.data.map((img) => ({
                    id: img._id,
                    imageUrl: img.imageUrl,
                    caption: img.title || "Gallery Update",
                    hasMultipleImages: false
                }));
                // Optional: We can limit the number of posts or take all.
                setSocialPosts(formattedImages);
            } catch (error) {
                console.error("Error fetching social wall images:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

    // Responsive visible count: 1 on mobile, 3 on larger screens
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setVisibleCount(1);
            } else {
                setVisibleCount(3);
            }
        };

        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const maxIndex = Math.max(0, socialPosts.length - visibleCount);

    const nextSlide = useCallback(() => {
        if (socialPosts.length <= visibleCount) return;
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, [maxIndex, socialPosts.length, visibleCount]);

    const prevSlide = useCallback(() => {
        if (socialPosts.length <= visibleCount) return;
        setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    }, [maxIndex, socialPosts.length, visibleCount]);

    // Automatic carousel
    useEffect(() => {
        if (socialPosts.length <= visibleCount) return;

        const interval = setInterval(() => {
            nextSlide();
        }, 3500); // Change slides every 3.5 seconds

        return () => clearInterval(interval);
    }, [nextSlide, socialPosts.length, visibleCount]);

    return (
        <section className="w-full bg-white py-16 font-sans overflow-hidden">
            <div className="max-w-[1920px] mx-auto px-6 md:px-12 relative">

                {/* Header Section */}
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-[#333333] text-2xl md:text-3xl lg:text-[32px] font-medium tracking-tight pl-2">
                        DCE Darbhanga Social Wall
                    </h2>
                </div>

                {/* Carousel Container */}
                {loading ? (
                    <div className="flex justify-center items-center py-20 text-gray-500">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600 mr-3"></div>
                        Loading social wall...
                    </div>
                ) : socialPosts.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">
                        No recent updates to show.
                    </div>
                ) : (
                    <div className="relative group">

                        {/* Left Navigation Arrow */}
                        <button
                            onClick={prevSlide}
                            className={`absolute -left-4 md:-left-6 top-[40%] -translate-y-1/2 z-20 bg-white hover:bg-gray-50 text-gray-800 p-2 md:p-3 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-gray-100 transition-all opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 focus:opacity-100 ${socialPosts.length <= visibleCount ? 'hidden' : ''}`}
                            aria-label="Previous slide"
                        >
                            <ChevronLeft size={24} />
                        </button>

                        {/* Cards Container with Hidden Overflow */}
                        <div className="overflow-hidden px-1 py-4 -my-4">
                            <div
                                className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                                style={{ transform: `translateX(-${currentIndex * (100 / visibleCount)}%)` }}
                            >
                                {socialPosts.map((post) => (
                                    <div
                                        key={post.id}
                                        className="shrink-0 px-3 md:px-4"
                                        style={{ width: `${100 / visibleCount}%` }}
                                    >
                                        <div className="flex flex-col cursor-pointer group/card h-full">
                                            {/* Image Container */}
                                            <div className="w-full aspect-4/3 bg-gray-100 overflow-hidden relative mb-4 shadow-sm">
                                                <img
                                                    src={post.imageUrl}
                                                    alt="Social Media Post"
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105"
                                                />

                                                {/* Layers Icon for multiple images */}
                                                {post.hasMultipleImages && (
                                                    <div className="absolute top-3 right-3 bg-black/40 p-1.5 rounded-sm backdrop-blur-sm">
                                                        <Layers size={16} className="text-white" />
                                                    </div>
                                                )}
                                            </div>

                                            {/* Caption */}
                                            <p className="text-gray-600 text-sm md:text-[15px] leading-relaxed font-medium line-clamp-2 pr-2">
                                                {post.caption}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Navigation Arrow */}
                        <button
                            onClick={nextSlide}
                            className={`absolute -right-4 md:-right-6 top-[40%] -translate-y-1/2 z-20 bg-white hover:bg-gray-50 text-gray-800 p-2 md:p-3 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-gray-100 transition-all opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 focus:opacity-100 ${socialPosts.length <= visibleCount ? 'hidden' : ''}`}
                            aria-label="Next slide"
                        >
                            <ChevronRight size={24} />
                        </button>

                    </div>
                )}

            </div>
        </section>
    );
};

export default SocialWall;
