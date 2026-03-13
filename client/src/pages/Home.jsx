import React, { useState, useEffect } from 'react';
import HeroSlider from '../components/HeroSlider';
import NoticeBoard from '../components/NoticeBoard';
import api from '../services/api';
import { FaUniversity, FaQuoteLeft } from "react-icons/fa";
import CampusLife from '../components/CampusLife';
import SocialWall from '../components/SocialWall';
import CampusPlacements from '../components/CampusPlacements';
import AcademicSlider from './Slider/AcedmicSlider';

const Home = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [importantLinks, setImportantLinks] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        // Fetch latest 8 images
        const imgRes = await api.get('/images');
        setGalleryImages(imgRes.data.slice(0, 8));

        // Fetch important links
        const linkRes = await api.get('/important-links');
        setImportantLinks(linkRes.data);
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    };

    fetchContent();
  }, []);

  const openModal = (index) => setSelectedImageIndex(index);
  const closeModal = () => setSelectedImageIndex(null);

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };


  return (
    <div className="bg-gray-100 flex flex-col ">
      {/*Slider image  */}
      <div><HeroSlider /></div>
      <div className='parent-container '>
        <div className="relative grid md:grid-cols-3 gap-6 px-6 py-12">

          {/* ================= ACADEMIC NOTICES (SLIDER) ================= */}
          <AcademicSlider />

          {/* ================= EVENTS (SLIDER) ================= */}
          <NoticeBoard />

          {/* ================= NOTICE ================= */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
            <div className="bg-[#133b5c] text-[#c6b677] p-3 flex justify-between items-center border-b-2 border-[#c6b677]">
              <h2 className="font-bold text-lg flex items-center gap-2 text-white">Important Link</h2>
              <a href="#" className="text-xs text-[#c6b677] hover:text-white transition-colors px-2 py-1">View all</a>
            </div>

            <div className="space-y-4 text-sm p-4">
              {importantLinks.length > 0 ? (
                importantLinks.map((link) => (
                  <div key={link._id}>
                    <p className="font-medium">
                      ⭐ {link.title}
                    </p>
                    <p className="text-gray-500">{new Date(link.date).toLocaleDateString()}</p>
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-red-600 text-xs">View Link</a>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No updates available.</p>
              )}
            </div>
          </div>

        </div>

      </div>
      {/* ================= PRINCIPAL MESSAGE SECTION ================= */}
      <div className="max-w-7xl mx-auto px-4 py-16 lg:py-24">
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center">

          {/* Left Area - Principal Photo */}
          <div className="w-full md:w-1/3 flex justify-center md:justify-end">
            <div className="relative group">
              {/* Decorative Background Box */}
              <div className="absolute inset-0 bg-[#c6b677] translate-x-4 translate-y-4 rounded-xl -z-10 transition-transform duration-300 group-hover:translate-x-6 group-hover:translate-y-6"></div>

              <img
                src="/chandan-sir.jpeg"
                alt="Principal"
                className="w-64 h-80 md:w-full md:h-auto max-w-[320px] object-cover rounded-xl shadow-lg border border-gray-100 relative z-10"
              />
            </div>
          </div>

          {/* Right Area - Message Text */}
          <div className="w-full md:w-2/3 flex flex-col justify-center">

            <h2 className="text-[#133b5c] text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6">
              Message from the Principal
            </h2>

            <div className="text-gray-600 text-base md:text-lg leading-relaxed space-y-4 font-light">
              <p>
                Welcome to DCE Darbhanga. Empowering young minds with robust technical knowledge and instilling an innovative spirit has always been the cornerstone of our philosophy.
              </p>
              <p>
                In today's rapidly evolving global landscape, engineers are the architects of the future. We strive to create an academic ecosystem that nurtures creativity, critical thinking, and a passion for excellence. Our dedicated faculty and state-of-the-art facilities ensure that our students are not just industry-ready, but are visionary leaders who can construct solutions for tomorrow's complex challenges.
              </p>
              <p>
                As you embark on this exciting journey with us, I urge you to dream big, work tirelessly, and remember that your potential is truly limitless.
              </p>
            </div>

            <div className="mt-10 border-l-4 border-[#c6b677] pl-4">
              <h4 className="text-xl font-bold text-gray-800 tracking-wide">Prof. (Dr.) Chandan Kumar</h4>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-widest mt-1">Principal, DCE Darbhanga</p>
            </div>

          </div>

        </div>
      </div>

      {/* ================= CAMPUS LIFE SECTION ================= */}
      <CampusLife />

      {/* ================= SOCIAL WALL SECTION ================= */}
      <SocialWall />

      {/* ================= CAMPUS PLACEMENTS SECTION ================= */}
      <CampusPlacements />

    </div>
  );
};

export default Home;
