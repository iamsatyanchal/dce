import React, { useEffect, useState } from 'react';
import { Calendar, Download, Info, History, FileText } from 'lucide-react';
import api from '../../services/api';

const HolidayCalendar = () => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchDocuments();
    }, []);

    const fetchDocuments = async () => {
        try {
            const { data } = await api.get('/documents?category=holiday_calendar');
            setDocuments(data);
        } catch (error) {
            console.error("Error fetching holiday calendars:", error);
        } finally {
            setLoading(false);
        }
    };

    const latestDoc = documents[0];
    const archivedDocs = documents.slice(1);

    if (loading) return <div className="min-h-screen bg-gray-50 pt-32 text-center text-gray-500">Loading academic schedules...</div>;

    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-20">
            <div className="container mx-auto px-6 max-w-5xl">

                {/* Hero Section */}
                <div className="bg-[#133b5c] rounded-3xl p-10 md:p-16 mb-12 text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#c6b677]/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="bg-[#c6b677] p-3 rounded-2xl shadow-lg shadow-black/20">
                                <Calendar className="text-[#133b5c]" size={32} />
                            </div>
                            <span className="text-[#c6b677] font-bold uppercase tracking-[0.3em] text-xs">Administrative</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 italic text-white">
                            {latestDoc ? latestDoc.title : "Holiday Calendar"}
                        </h1>
                        <p className="text-white/70 max-w-2xl text-lg font-light leading-relaxed">
                            Official institutional holiday schedule. Please refer to the downloaded PDF for official signatures and detailed academic instructions.
                        </p>
                        {latestDoc && (
                            <a
                                href={latestDoc.fileUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="mt-10 bg-[#c6b677] text-[#133b5c] px-8 py-3 rounded-sm font-bold shadow-xl hover:bg-white transition-all inline-flex items-center gap-2 group w-fit"
                            >
                                <Download size={20} className="group-hover:translate-y-1 transition-transform" /> Download Latest PDF
                            </a>
                        )}
                    </div>
                </div>

                {/* Primary Content Placeholder / Instructions */}
                {!latestDoc && (
                    <div className="bg-white rounded-3xl p-20 text-center border border-dashed border-gray-200 mb-12">
                        <Info className="mx-auto text-gray-300 mb-4" size={48} />
                        <p className="text-gray-400 font-medium font-serif italic">No active holiday calendar has been uploaded for the current session.</p>
                    </div>
                )}

                {/* Archived Calendars */}
                {archivedDocs.length > 0 && (
                    <div className="mt-20">
                        <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-4">
                            <History className="text-[#c6b677]" size={24} />
                            <h2 className="text-2xl font-serif font-bold text-[#133b5c]">Historic Holiday Archives</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {archivedDocs.map((doc) => (
                                <a
                                    key={doc._id}
                                    href={doc.fileUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-[#c6b677] hover:shadow-xl transition-all group flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-gray-50 rounded-xl text-[#133b5c] group-hover:bg-[#133b5c] group-hover:text-white transition-colors">
                                            <FileText size={20} />
                                        </div>
                                        <span className="font-bold text-[#133b5c]">{doc.title}</span>
                                    </div>
                                    <Download size={18} className="text-gray-300 group-hover:text-[#c6b677]" />
                                </a>
                            ))}
                        </div>
                    </div>
                )}

                {/* Note Section */}
                <div className="mt-12 bg-white p-8 rounded-3xl border border-dashed border-gray-200 flex gap-6 items-start shadow-sm">
                    <div className="bg-blue-50 p-3 rounded-xl text-blue-500 flex-shrink-0">
                        <Info size={24} />
                    </div>
                    <div>
                        <h4 className="font-bold text-[#133b5c] mb-2">Important Note:</h4>
                        <p className="text-gray-500 text-sm italic leading-relaxed">
                            Local holidays/restricted holidays will be notified separately by the Principal's office. The college administration reserves the right to modify the holiday list if requested by university or government authorities.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HolidayCalendar;
