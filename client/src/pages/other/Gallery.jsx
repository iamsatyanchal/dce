import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import ImageModal from '../components/ImageModal';

const Gallery = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await api.get('/images');
                setImages(response.data);
            } catch (error) {
                console.error("Error fetching images:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

    const openModal = (index) => setSelectedImageIndex(index);
    const closeModal = () => setSelectedImageIndex(null);

    const nextImage = () => {
        setSelectedImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="bg-gray-100 min-h-screen py-10">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary">
                        Campus Gallery
                    </h2>
                    <div className="w-20 h-1 bg-secondary mx-auto mt-3 rounded-full"></div>
                </div>

                {loading ? (
                    <div className="text-center py-20 text-gray-500">Loading gallery...</div>
                ) : images.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">No images found.</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {images.map((img, index) => (
                            <div
                                key={img._id}
                                className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition duration-300 bg-white cursor-pointer"
                                onClick={() => openModal(index)}
                            >
                                <div className="aspect-w-4 aspect-h-3">
                                    <img
                                        src={img.imageUrl}
                                        alt={img.title || "Gallery Image"}
                                        className="w-full h-64 object-cover transform group-hover:scale-105 transition duration-500"
                                    />
                                </div>
                                {img.title && (
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                                        <p className="text-white text-sm font-medium truncate">{img.title}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {selectedImageIndex !== null && (
                    <ImageModal
                        images={images}
                        currentIndex={selectedImageIndex}
                        onClose={closeModal}
                        onNext={nextImage}
                        onPrev={prevImage}
                    />
                )}
            </div>
        </div>
    );
};

export default Gallery;
