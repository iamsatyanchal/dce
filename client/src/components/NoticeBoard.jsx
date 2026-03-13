import React, { useState, useEffect } from 'react';
import { FileText, Calendar } from 'lucide-react';
import api from '../services/api';

const NoticeBoard = () => {
    const [notices, setNotices] = useState([]);

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const response = await api.get("/notices");
                setNotices(response.data);
            } catch (error) {
                console.error("Error fetching notices:", error);
            }
        };

        fetchNotices();
    }, []);

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
            <div className="bg-[#133b5c] text-[#c6b677] p-3 flex justify-between items-center border-b-2 border-[#c6b677]">
                <h3 className="font-bold text-lg flex items-center gap-2 text-white">
                    <FileText size={20} className="text-[#c6b677]" /> Event Notice
                </h3>
                <button className="text-xs text-[#c6b677] hover:text-white px-2 py-1 rounded transition-colors">
                    <a href="/Acedmics/Notice">View All</a>
                </button>
            </div>

            <div className="relative h-[300px] overflow-hidden p-2">
                {/* Simple vertical scrolling animation using Tailwind/CSS */}
                <div className="animate-marquee-vertical space-y-4">
                    {notices.length === 0 ? (
                        <p className="text-center text-gray-500 text-sm">No notices available.</p>
                    ) : (
                        // Duplicate list for infinite scroll effect if needed, or just map once
                        notices.concat(notices).map((notice, index) => (
                            <div key={`${notice._id}-${index}`} className="border-b border-gray-100 pb-2 last:border-0 hover:bg-gray-50 p-2 transition-colors cursor-pointer" onClick={() => window.open(notice.fileUrl, '_blank')}>
                                <div className="flex items-center gap-2 text-xs text-[#133b5c] font-semibold mb-1">
                                    <Calendar size={12} className="text-[#c6b677]" /> {notice.date || new Date(notice.createdAt).toLocaleDateString()}
                                </div>
                                <p className="text-sm text-gray-700 hover:text-[#c6b677] leading-snug font-medium transition-colors">
                                    {notice.title}
                                </p>
                                <p className="text-xs text-gray-500 line-clamp-1">
                                    {notice.description}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default NoticeBoard;
