import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { FileText, Image as ImageIcon, ExternalLink, Calendar, Search } from "lucide-react";

const Notice = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      // Updated to fetch from backend API
      const response = await api.get("/notices");
      setNotices(response.data);
    } catch (error) {
      console.error("Error fetching notices:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredNotices = notices.filter(notice =>
    notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    notice.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Notices & Circulars
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Stay updated with the latest announcements from the administration.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 max-w-xl mx-auto relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-amber-500 focus:border-amber-500 sm:text-sm shadow-sm transition duration-150 ease-in-out"
            placeholder="Search for notices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
          </div>
        ) : filteredNotices.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No notices found</h3>
            <p className="mt-1 text-sm text-gray-500">Check back later for new announcements.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredNotices.map((notice) => (
              <div key={notice._id} className="bg-white overflow-hidden shadow-sm rounded-lg hover:shadow-md transition-shadow duration-300 border border-gray-100 flex flex-col">
                <div className="p-6 flex-1">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar className="h-4 w-4 mr-1 text-amber-500" />
                    {new Date(notice.createdAt).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2" title={notice.title}>
                    {notice.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
                    {notice.description}
                  </p>
                </div>
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 mt-auto">
                  <a
                    href={notice.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-amber-700 bg-amber-100 hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors duration-150"
                  >
                    {notice.fileType.includes("pdf") ? <FileText className="mr-2 h-4 w-4" /> : <ImageIcon className="mr-2 h-4 w-4" />}
                    View Attachment
                    <ExternalLink className="ml-2 h-3 w-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notice;