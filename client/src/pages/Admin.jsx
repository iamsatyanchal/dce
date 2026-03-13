import React, { useState, useEffect } from "react";
import api from "../services/api";
import { Trash2, FileText, Image as ImageIcon, Mail, LayoutDashboard, Link as LinkIcon, Bell, LogOut, User, Plus, ExternalLink, ChevronRight, BarChart3, Clock, CheckCircle2, ShieldCheck, MessageSquare, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ManageDepartments from "../components/ManageDepartments";

const Admin = () => {
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [notices, setNotices] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(""); // Added date state
  const [file, setFile] = useState(null);

  // Image Gallery State
  const [images, setImages] = useState([]);
  const [imageTitle, setImageTitle] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [stats, setStats] = useState({
    notices: 0,
    images: 0,
    links: 0,
    messages: 0,
    testimonials: 0
  });

  const API_URL = "/notices";
  const IMAGE_API_URL = "/images";
  const LINK_API_URL = "/important-links";
  const MESSAGE_API_URL = "/messages";
  const TESTIMONIAL_API_URL = "/student-life/testimonials";

  // Important Links State
  const [links, setLinks] = useState([]);
  const [linkTitle, setLinkTitle] = useState("");
  const [linkUrl, setLinkUrl] = useState("");

  // Messages State
  const [messages, setMessages] = useState([]);

  // Testimonials State
  const [testimonials, setTestimonials] = useState([]);
  const [selectedTestimonialImage, setSelectedTestimonialImage] = useState(null);

  // Coordinators State
  const [coordinators, setCoordinators] = useState([]);
  const [coordEmail, setCoordEmail] = useState("");
  const [coordPassword, setCoordPassword] = useState("");

  const COORDINATOR_API_URL = "/users/coordinators";

  // Get token from localStorage
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo?.token;

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
    if (activeTab === "notifications") {
      fetchNotices();
    }
    if (activeTab === "images") {
      fetchImages();
    }
    if (activeTab === "links") {
      fetchLinks();
    }
    if (activeTab === "messages") {
      fetchMessages();
    }
    if (activeTab === "coordinators") {
      fetchCoordinators();
    }
    if (activeTab === "testimonials") {
      fetchTestimonials();
    }
  }, [activeTab, navigate, userInfo]); // Added userInfo to dependency array

  const fetchMessages = async () => {
    try {
      const response = await api.get(MESSAGE_API_URL, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(response.data);
      setStats(prev => ({ ...prev, messages: response.data.length }));
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const fetchTestimonials = async () => {
    try {
      const response = await api.get(`${TESTIMONIAL_API_URL}/admin`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTestimonials(response.data);
      setStats(prev => ({ ...prev, testimonials: response.data.filter(t => !t.isApproved).length }));
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    }
  };

  const fetchCoordinators = async () => {
    try {
      const response = await api.get(COORDINATOR_API_URL, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCoordinators(response.data);
    } catch (error) {
      console.error("Error fetching coordinators:", error);
    }
  };

  const handleCoordinatorUpload = async (e) => {
    e.preventDefault();
    if (!coordEmail || !coordPassword) {
      setMessage("Please enter email and password.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await api.post(COORDINATOR_API_URL, { email: coordEmail, password: coordPassword }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Coordinator added successfully!");
      setCoordEmail("");
      setCoordPassword("");
      fetchCoordinators();
    } catch (error) {
      console.error("Error adding coordinator:", error);
      setMessage("Failed to add coordinator. " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCoordinator = async (id) => {
    if (!window.confirm("Are you sure you want to delete this coordinator?")) return;
    try {
      await api.delete(`${COORDINATOR_API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCoordinators(coordinators.filter(c => c._id !== id));
      setMessage("Coordinator deleted successfully!");
    } catch (error) {
      console.error("Error deleting coordinator:", error);
      setMessage("Failed to delete coordinator.");
    }
  };

  const fetchNotices = async () => {
    try {
      const response = await api.get(API_URL);
      setNotices(response.data);
      setStats(prev => ({ ...prev, notices: response.data.length }));
    } catch (error) {
      console.error("Error fetching notices:", error);
    }
  };

  const fetchImages = async () => {
    try {
      const response = await api.get(IMAGE_API_URL);
      setImages(response.data);
      setStats(prev => ({ ...prev, images: response.data.length }));
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const fetchLinks = async () => {
    try {
      const response = await api.get(LINK_API_URL);
      setLinks(response.data);
      setStats(prev => ({ ...prev, links: response.data.length }));
    } catch (error) {
      console.error("Error fetching links:", error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!title || !description || !file || !date) { // Check for date
      setMessage("Please fill all fields and select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("date", date); // Append date
    formData.append("file", file);

    setLoading(true);
    setMessage("");

    try {
      await api.post(API_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        },
      });
      setMessage("Notice uploaded successfully!");
      setTitle("");
      setDescription("");
      setDate(""); // Reset date
      setFile(null);
      fetchNotices(); // Refresh list
    } catch (error) {
      console.error("Error uploading notice:", error);
      setMessage("Failed to upload notice. " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile) {
      setMessage("Please select an image file.");
      return;
    }

    const formData = new FormData();
    formData.append("title", imageTitle);
    formData.append("file", imageFile);

    setLoading(true);
    setMessage("");

    try {
      await api.post(IMAGE_API_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        },
      });
      setMessage("Image uploaded successfully!");
      setImageTitle("");
      setImageFile(null);
      fetchImages(); // Refresh image list
    } catch (error) {
      console.error("Error uploading image:", error);
      setMessage("Failed to upload image. " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this notice?")) return;
    try {
      await api.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotices(notices.filter((n) => n._id !== id));
    } catch (error) {
      console.error("Error deleting notice:", error);
    }
  };

  const handleLinkUpload = async (e) => {
    e.preventDefault();
    if (!linkTitle || !linkUrl) {
      setMessage("Please enter title and URL.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await api.post(LINK_API_URL, { title: linkTitle, url: linkUrl }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Link added successfully!");
      setLinkTitle("");
      setLinkUrl("");
      fetchLinks();
    } catch (error) {
      console.error("Error adding link:", error);
      setMessage("Failed to add link.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteLink = async (id) => {
    if (!window.confirm("Delete this link?")) return;
    try {
      await api.delete(`${LINK_API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLinks(links.filter(l => l._id !== id));
    } catch (error) {
      console.error("Error deleting link:", error);
    }
  };

  const handleDeleteImage = async (id) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;
    try {
      await api.delete(`${IMAGE_API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setImages(images.filter((img) => img._id !== id));
      setMessage("Image deleted successfully!");
    } catch (error) {
      console.error("Error deleting image:", error);
      setMessage("Failed to delete image. " + (error.response?.data?.message || error.message));
    }
  };

  const handleDeleteMessage = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      await api.delete(`${MESSAGE_API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(messages.filter(m => m._id !== id));
      setMessage("Message deleted successfully!");
    } catch (error) {
      console.error("Error deleting message:", error);
      setMessage("Failed to delete message.");
    }
  };

  const handleApproveTestimonial = async (id) => {
    try {
      await api.patch(`${TESTIMONIAL_API_URL}/${id}/approve`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage("Testimonial approved & published!");
      fetchTestimonials();
    } catch (error) {
      console.error("Error approving testimonial:", error);
      setMessage("Failed to approve testimonial.");
    }
  };

  const handleDeleteTestimonial = async (id) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      await api.delete(`${TESTIMONIAL_API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTestimonials(testimonials.filter(t => t._id !== id));
      setMessage("Testimonial deleted.");
      fetchTestimonials();
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      setMessage("Failed to delete testimonial.");
    }
  };

  return (
    <div className="min-h-screen flex bg-[#f8fafc] font-sans">
      {/* Sidebar */}
      <div className="w-72 bg-[#133b5c] text-white fixed h-full transition-all duration-300 shadow-2xl z-30">
        <div className="p-8 border-b border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-[#c6b677] rounded-lg flex items-center justify-center text-[#133b5c] shadow-lg">
              <ShieldCheck size={24} />
            </div>
            <h2 className="text-xl font-serif font-bold tracking-tight">DCE Admin</h2>
          </div>
          <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Systems Control Panel</p>
        </div>

        <nav className="p-6">
          <ul className="space-y-2">
            {[
              { id: 'dashboard', label: 'Overview', icon: <LayoutDashboard size={20} /> },
              { id: 'notices', label: 'Notices & News', icon: <Bell size={20} /> },
              { id: 'images', label: 'Gallery Assets', icon: <ImageIcon size={20} /> },
              { id: 'links', label: 'Quick Links', icon: <LinkIcon size={20} /> },
              { id: 'messages', label: 'Inquiries', icon: <Mail size={20} /> },
              { id: 'testimonials', label: 'Testimonials', icon: <MessageSquare size={20} /> },
              { id: 'departments', label: 'Departments', icon: <LayoutDashboard size={20} /> },
              { id: 'coordinators', label: 'Coordinators', icon: <User size={20} /> },
            ].map((item) => (
              <li
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-xl cursor-pointer transition-all duration-200 group ${activeTab === item.id
                  ? 'bg-[#c6b677] text-[#133b5c] shadow-lg shadow-[#c6b677]/20 font-bold translate-x-1'
                  : 'hover:bg-white/5 text-white/70 hover:text-white capitalize'
                  }`}
              >
                <span className={`${activeTab === item.id ? 'text-[#133b5c]' : 'text-[#c6b677] group-hover:scale-110 transition-transform'}`}>
                  {item.icon}
                </span>
                {item.label}
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-0 w-full p-6 border-t border-white/10 bg-[#0d2a42]">
          <div
            onClick={() => {
              localStorage.removeItem('userInfo');
              navigate('/login');
            }}
            className="flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer text-red-300 hover:bg-red-500/10 hover:text-red-400 transition-all group"
          >
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-bold uppercase tracking-wider">Sign Out</span>
          </div>
        </div>
      </div>

      {/* Main Section */}
      <div className="flex-1 ml-72">
        {/* Top Navbar */}
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 h-20 sticky top-0 z-20 px-10 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-serif font-bold text-[#133b5c] capitalize">
              {activeTab === 'dashboard' ? 'Institutional Overview' : activeTab.replace(/([A-Z])/g, ' $1').trim()}
            </h1>
            <div className="h-4 w-[1px] bg-gray-200 mx-2"></div>
            <p className="text-gray-400 text-xs font-medium">Dashboard / {activeTab}</p>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative group">
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center gap-3 bg-gray-50 border border-gray-100 pl-2 pr-4 py-1.5 rounded-full hover:bg-gray-100 transition-all"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-[#133b5c] to-[#1a4b73] rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md">
                  AD
                </div>
                <div className="text-left hidden md:block">
                  <p className="text-[12px] font-bold text-[#133b5c] leading-tight">Administrator</p>
                  <p className="text-[10px] text-gray-400">Main Control</p>
                </div>
                <ChevronRight size={14} className={`text-gray-400 transition-transform ${showProfile ? 'rotate-90' : ''}`} />
              </button>

              {showProfile && (
                <div className="absolute right-0 mt-3 w-56 bg-white shadow-2xl rounded-2xl p-2 border border-blue-50/50 animate-zoom-in overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-50 mb-1">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Active Session</p>
                  </div>
                  <button className="w-full text-left px-4 py-2.5 text-sm text-gray-600 hover:bg-blue-50 hover:text-[#133b5c] rounded-xl flex items-center gap-3 transition-colors">
                    <User size={16} /> My Account
                  </button>
                  <button
                    onClick={() => {
                      localStorage.removeItem('userInfo');
                      navigate('/login');
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 rounded-xl flex items-center gap-3 transition-colors"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-10 max-w-7xl mx-auto">
          {activeTab === "dashboard" && (
            <div className="space-y-10 animate-fade-in">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: "Active Notices", val: stats.notices, icon: <Bell className="text-blue-600" />, color: "bg-blue-50" },
                  { label: "Gallery Assets", val: stats.images, icon: <ImageIcon className="text-amber-600" />, color: "bg-amber-50" },
                  { label: "Quick Links", val: stats.links, icon: <LinkIcon className="text-emerald-600" />, color: "bg-emerald-50" },
                  { label: "Pending Testimonials", val: stats.testimonials, icon: <MessageSquare className="text-purple-600" />, color: "bg-purple-50" },
                  { label: "New Inquiries", val: stats.messages, icon: <Mail className="text-rose-600" />, color: "bg-rose-50" },
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
                    <div className="flex justify-between items-start mb-4">
                      <div className={`p-3 rounded-2xl ${stat.color} group-hover:scale-110 transition-transform`}>
                        {stat.icon}
                      </div>
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Live</span>
                    </div>
                    <div className="text-3xl font-bold text-[#133b5c] mb-1">{stat.val}</div>
                    <p className="text-sm font-medium text-gray-400">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Recent Activity / Quick Actions */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-xl font-serif font-bold text-[#133b5c]">System Performance</h3>
                      <BarChart3 size={20} className="text-[#c6b677]" />
                    </div>
                    <div className="space-y-6">
                      <div className="p-5 bg-gray-50 rounded-2xl flex items-center justify-between group cursor-pointer hover:bg-blue-50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
                            <Plus size={20} />
                          </div>
                          <div>
                            <p className="font-bold text-[#133b5c]">New Notice Publication</p>
                            <p className="text-xs text-gray-400 mt-0.5">Push latest updates to the main board</p>
                          </div>
                        </div>
                        <ChevronRight size={18} className="text-gray-300 group-hover:translate-x-1 transition-transform" />
                      </div>

                      <div className="p-5 bg-gray-50 rounded-2xl flex items-center justify-between group cursor-pointer hover:bg-amber-50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-amber-600 shadow-sm group-hover:bg-amber-600 group-hover:text-white transition-all">
                            <ImageIcon size={20} />
                          </div>
                          <div>
                            <p className="font-bold text-[#133b5c]">Update Campus Gallery</p>
                            <p className="text-xs text-gray-400 mt-0.5">Manage carousel and event photography</p>
                          </div>
                        </div>
                        <ChevronRight size={18} className="text-gray-300 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* System Status */}
                <div className="bg-[#133b5c] p-8 rounded-3xl shadow-xl relative overflow-hidden text-white">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                  <h3 className="text-xl font-serif font-bold mb-6">Server Status</h3>
                  <div className="space-y-6 relative z-10">
                    <div className="flex items-center justify-between p-3 bg-white/10 rounded-xl">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 size={16} className="text-[#c6b677]" />
                        <span className="text-sm font-medium">Database API</span>
                      </div>
                      <span className="text-[10px] bg-[#c6b677] text-[#133b5c] px-2 py-0.5 rounded-full font-bold">ACTIVE</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/10 rounded-xl">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 size={16} className="text-[#c6b677]" />
                        <span className="text-sm font-medium">Media Storage</span>
                      </div>
                      <span className="text-[10px] bg-[#c6b677] text-[#133b5c] px-2 py-0.5 rounded-full font-bold">STABLE</span>
                    </div>
                  </div>
                  <div className="mt-10 pt-10 border-t border-white/10">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40">Last Synchronized</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Clock size={14} className="text-[#c6b677]" />
                      <p className="text-sm font-medium">Recently Updated</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "images" && (
            <div className="space-y-8 animate-fade-in">
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-[#133b5c]">Gallery Assets</h2>
                    <p className="text-gray-400 text-sm mt-1">Manage institutional photography and event banners</p>
                  </div>
                  <div className="p-3 bg-amber-50 rounded-2xl text-amber-600">
                    <ImageIcon size={24} />
                  </div>
                </div>

                {message && (
                  <div className={`mb-6 p-4 rounded-2xl flex items-center gap-3 animate-slide-in-right ${message.includes("success") ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-red-50 text-red-700 border border-red-100"}`}>
                    <CheckCircle2 size={18} />
                    <span className="text-sm font-bold">{message}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50/50 p-6 rounded-3xl border border-dashed border-gray-200">
                  <div className="md:col-span-2 space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Asset Description</label>
                      <input
                        type="text"
                        placeholder="e.g. Annual Tech Fest 2024 - Robotics Competition"
                        value={imageTitle}
                        onChange={(e) => setImageTitle(e.target.value)}
                        className="w-full p-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#c6b677]/30 focus:border-[#c6b677] outline-none transition-all placeholder:text-gray-300 text-sm"
                      />
                    </div>
                    <div className="relative group">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImageFile(e.target.files[0])}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="flex flex-col items-center justify-center py-10 border-2 border-dashed border-gray-200 rounded-3xl cursor-pointer hover:bg-white hover:border-[#c6b677] transition-all group-hover:shadow-lg"
                      >
                        <ImageIcon size={32} className="text-gray-300 group-hover:text-[#c6b677] mb-2 transition-colors" />
                        <span className="text-sm font-bold text-gray-500 group-hover:text-[#133b5c]">
                          {imageFile ? imageFile.name : "Select Asset Image"}
                        </span>
                        <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest font-bold">Highly Recommended: JPG/PNG, Max 5MB</p>
                      </label>
                    </div>
                  </div>
                  <div className="flex flex-col justify-end gap-3">
                    <button
                      onClick={handleImageUpload}
                      disabled={loading || !imageFile}
                      className={`w-full bg-[#133b5c] text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-900/10 hover:bg-[#1a4b73] transform hover:-translate-y-1 transition-all flex items-center justify-center gap-3 ${loading || !imageFile ? 'opacity-50 cursor-not-allowed grayscale' : ''}`}
                    >
                      {loading ? "Processing..." : <><Plus size={18} className="text-[#c6b677]" /> Upload to Cloud</>}
                    </button>
                    <p className="text-[10px] text-center text-gray-400 uppercase font-bold tracking-widest">Assets auto-optimize for web</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <h3 className="text-lg font-serif font-bold text-[#133b5c] mb-6 flex items-center gap-2">
                  Cloud Repository <span className="text-xs bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full font-sans uppercase tracking-widest">{images.length} Objects</span>
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {images.map((img) => (
                    <div key={img._id} className="relative group aspect-square rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
                      <img src={img.imageUrl} alt={img.title} className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-opacity" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end">
                        <p className="text-white text-[10px] font-bold truncate mb-2 uppercase tracking-tight">{img.title || "Untitled Asset"}</p>
                        <button
                          onClick={() => handleDeleteImage(img._id)}
                          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl text-xs font-bold transition-all shadow-lg flex items-center justify-center gap-2"
                        >
                          <Trash2 size={14} /> Purge Object
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "links" && (
            <div className="space-y-8 animate-fade-in">
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-[#133b5c]">Quick Links</h2>
                    <p className="text-gray-400 text-sm mt-1">Manage important external resources and institutional portals</p>
                  </div>
                  <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600">
                    <LinkIcon size={24} />
                  </div>
                </div>

                {message && (
                  <div className={`mb-6 p-4 rounded-2xl flex items-center gap-3 animate-slide-in-right ${message.includes("success") ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-red-50 text-red-700 border border-red-100"}`}>
                    <CheckCircle2 size={18} />
                    <span className="text-sm font-bold">{message}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50/50 p-6 rounded-3xl border border-gray-200">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Portal Name</label>
                      <input
                        type="text"
                        placeholder="e.g. AICTE Approval Portal"
                        value={linkTitle}
                        onChange={(e) => setLinkTitle(e.target.value)}
                        className="w-full p-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#c6b677]/30 focus:border-[#c6b677] outline-none transition-all placeholder:text-gray-300 text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">URL / Destination</label>
                      <input
                        type="text"
                        placeholder="https://example.com"
                        value={linkUrl}
                        onChange={(e) => setLinkUrl(e.target.value)}
                        className="w-full p-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#c6b677]/30 focus:border-[#c6b677] outline-none transition-all placeholder:text-gray-300 text-sm"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col justify-end">
                    <button
                      onClick={handleLinkUpload}
                      disabled={loading || !linkTitle || !linkUrl}
                      className={`w-full bg-[#133b5c] text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-900/10 hover:bg-[#1a4b73] transform hover:-translate-y-1 transition-all flex items-center justify-center gap-3 ${loading || !linkTitle || !linkUrl ? 'opacity-50 cursor-not-allowed grayscale' : ''}`}
                    >
                      {loading ? "Adding..." : <><Plus size={18} className="text-[#c6b677]" /> Register Link</>}
                    </button>
                    <p className="text-[10px] text-center text-gray-400 mt-4 uppercase font-bold tracking-widest">Links appear globally in the footer</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <h3 className="text-lg font-serif font-bold text-[#133b5c] mb-6 flex items-center gap-2">
                  Active Links <span className="text-xs bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full font-sans uppercase tracking-widest">{links.length} Entries</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {links.map((link) => (
                    <div key={link._id} className="flex justify-between items-center p-4 bg-gray-50 border border-gray-100 rounded-2xl hover:bg-white hover:shadow-xl hover:border-[#c6b677]/30 transition-all duration-300 group">
                      <div className="flex-1 min-w-0 pr-4">
                        <p className="font-bold text-[#133b5c] truncate">{link.title}</p>
                        <p className="text-[10px] text-blue-500 font-medium truncate mt-0.5">{link.url}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-blue-500 hover:bg-white rounded-lg transition-all shadow-sm">
                          <ExternalLink size={14} />
                        </a>
                        <button
                          onClick={() => handleDeleteLink(link._id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-white rounded-lg transition-all shadow-sm"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "departments" && (
            <ManageDepartments />
          )}

          {activeTab === "notices" && (
            <div className="space-y-10 animate-fade-in">
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-[#c6b677]"></div>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-[#133b5c]">Notices & News Board</h2>
                    <p className="text-gray-400 text-sm mt-1">Publish critical updates for students and faculty</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-2xl text-[#133b5c]">
                    <Bell size={24} />
                  </div>
                </div>

                {message && (
                  <div className={`mb-6 p-4 rounded-2xl flex items-center gap-3 animate-slide-in-right ${message.includes("success") ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-red-50 text-red-700 border border-red-100"}`}>
                    <CheckCircle2 size={18} />
                    <span className="text-sm font-bold">{message}</span>
                  </div>
                )}

                <form onSubmit={handleUpload} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Notice Headline</label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. End Semester Examination Schedule - Spring 2024"
                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#c6b677]/30 focus:border-[#c6b677] outline-none transition-all placeholder:text-gray-300 text-sm font-bold text-[#133b5c]"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Extended Description</label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Provide deep details about the notification..."
                        rows="4"
                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#c6b677]/30 focus:border-[#c6b677] outline-none transition-all placeholder:text-gray-300 text-sm"
                        required
                      ></textarea>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Publication Date</label>
                        <input
                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#c6b677]/30 focus:border-[#c6b677] outline-none transition-all text-sm font-bold text-[#133b5c]"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Media Attachment</label>
                        <div className="relative h-[58px]">
                          <input
                            type="file"
                            onChange={handleFileChange}
                            className="hidden"
                            id="notice-file"
                            required
                          />
                          <label
                            htmlFor="notice-file"
                            className="absolute inset-0 flex items-center gap-3 px-4 bg-gray-100 border border-gray-200 rounded-2xl cursor-pointer hover:bg-white hover:border-[#c6b677] transition-all"
                          >
                            <FileText size={16} className="text-[#c6b677]" />
                            <span className="text-xs font-bold text-gray-500 truncate max-w-[120px]">
                              {file ? file.name : "Select Document"}
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#133b5c]/5 p-6 rounded-3xl border border-[#133b5c]/10">
                      <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-4">Submission Check</p>
                      <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-[#133b5c] text-white py-5 rounded-2xl font-bold shadow-xl shadow-blue-900/10 hover:bg-[#1a4b73] transform hover:-translate-y-1 transition-all flex items-center justify-center gap-3 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {loading ? "Transmitting..." : <><Plus size={20} className="text-[#c6b677]" /> Broadcast Notice</>}
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                  <h3 className="text-lg font-serif font-bold text-[#133b5c]">Active Broadcasts</h3>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Live Repository</div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-gray-50/50 text-[#133b5c] border-b border-gray-100">
                        <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest">Schedule Date</th>
                        <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest">Notice Details</th>
                        <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest">Document</th>
                        <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-right">Operations</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {notices.map((notice) => (
                        <tr key={notice._id} className="hover:bg-blue-50/30 transition-colors group">
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-white rounded-lg shadow-sm text-[#133b5c]">
                                <Clock size={14} />
                              </div>
                              <span className="text-sm font-bold text-gray-500 whitespace-nowrap">
                                {notice.date || new Date(notice.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <p className="font-bold text-[#133b5c] text-sm group-hover:text-amber-600 transition-colors">{notice.title}</p>
                            <p className="text-xs text-gray-400 mt-1 line-clamp-1">{notice.description}</p>
                          </td>
                          <td className="px-8 py-6">
                            <a
                              href={notice.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-xs font-bold text-[#133b5c] hover:bg-white hover:border-[#c6b677] transition-all"
                            >
                              {notice.fileType?.includes("pdf") ? <FileText size={14} className="text-red-500" /> : <ImageIcon size={14} className="text-blue-500" />}
                              View Resource
                            </a>
                          </td>
                          <td className="px-8 py-6 text-right">
                            <button
                              onClick={() => handleDelete(notice._id)}
                              className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                              title="Delete Notice"
                            >
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "messages" && (
            <div className="space-y-8 animate-fade-in">
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-serif font-bold text-[#133b5c]">Communication Inquiries</h2>
                  <p className="text-gray-400 text-sm mt-1">Direct messages from the institutional portal</p>
                </div>
                <div className="p-3 bg-rose-50 rounded-2xl text-rose-600">
                  <Mail size={24} />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {messages.length === 0 ? (
                  <div className="bg-white p-20 rounded-3xl border border-gray-100 shadow-sm text-center">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                      <Mail size={32} />
                    </div>
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No active inquiries</p>
                  </div>
                ) : (
                  messages.map((msg) => (
                    <div key={msg._id} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
                      <div className="flex flex-col md:flex-row justify-between gap-6">
                        <div className="space-y-4 flex-1">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-[#133b5c] font-bold text-lg border border-gray-100 shadow-sm group-hover:bg-[#c6b677] group-hover:text-[#133b5c] group-hover:border-[#c6b677] transition-all">
                              {msg.name?.[0]?.toUpperCase() || "I"}
                            </div>
                            <div>
                              <p className="font-bold text-[#133b5c] text-lg">{msg.name}</p>
                              <p className="text-xs text-blue-500 font-medium">{msg.email}</p>
                            </div>
                            <div className="h-4 w-[1px] bg-gray-100"></div>
                            <span className="text-[10px] bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">
                              {new Date(msg.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                          </div>
                          <div>
                            <p className="text-xs font-bold text-[#c6b677] uppercase tracking-widest mb-1">Subject</p>
                            <p className="text-[#133b5c] font-bold">{msg.subject}</p>
                          </div>
                          <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                            <p className="text-gray-600 leading-relaxed text-sm">{msg.message}</p>
                          </div>
                        </div>
                        <div className="flex flex-row md:flex-col justify-end gap-3 pt-4 border-t border-gray-50 md:border-t-0 md:pt-0">
                          <button
                            onClick={() => handleDeleteMessage(msg._id)}
                            className="flex-1 md:flex-initial p-4 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-sm flex items-center justify-center"
                            title="Delete Inquiry"
                          >
                            <Trash2 size={20} />
                          </button>
                          <a
                            href={`mailto:${msg.email}`}
                            className="flex-1 md:flex-initial p-4 bg-blue-50 text-blue-500 rounded-2xl hover:bg-blue-500 hover:text-white transition-all shadow-sm flex items-center justify-center"
                          >
                            <Mail size={20} />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
          {activeTab === "testimonials" && (
            <div className="space-y-8 animate-fade-in">
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-serif font-bold text-[#133b5c]">Testimonials Moderation</h2>
                  <p className="text-gray-400 text-sm mt-1">Review and approve public student/alumni submissions</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-2xl text-purple-600">
                  <MessageSquare size={24} />
                </div>
              </div>

              {message && (
                <div className={`mb-6 p-4 rounded-2xl flex items-center gap-3 animate-slide-in-right ${message.includes("success") || message.includes("approved") || message.includes("deleted") ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-red-50 text-red-700 border border-red-100"}`}>
                  <CheckCircle2 size={18} />
                  <span className="text-sm font-bold">{message}</span>
                </div>
              )}

              <div className="grid grid-cols-1 gap-6">
                {testimonials.length === 0 ? (
                  <div className="bg-white p-20 rounded-3xl border border-gray-100 shadow-sm text-center">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                      <MessageSquare size={32} />
                    </div>
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No pending or approved testimonials.</p>
                  </div>
                ) : (
                  testimonials.map((t) => (
                    <div key={t._id} className={`bg-white p-8 rounded-[2rem] border ${t.isApproved ? 'border-gray-100' : 'border-purple-200 bg-purple-50/10'} shadow-sm transition-all duration-300 group`}>
                      <div className="flex flex-col md:flex-row gap-6">

                        {/* Avatar */}
                        <div className="shrink-0 flex items-start pt-2">
                          <div
                            className={`w-16 h-16 rounded-full overflow-hidden border-2 cursor-pointer hover:opacity-80 transition-opacity ${t.isApproved ? 'border-gray-200' : 'border-[#c6b677]'}`}
                            onClick={() => t.imageUrl && setSelectedTestimonialImage(t.imageUrl)}
                          >
                            {t.imageUrl ? (
                              <img src={t.imageUrl} alt={t.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full bg-[#133b5c] text-white flex justify-center items-center font-bold text-xl uppercase">
                                {t.name.charAt(0)}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-bold text-[#133b5c] text-xl">{t.name}</h3>
                              <div className="flex items-center gap-3 text-xs mt-1">
                                <span className="text-gray-500 font-bold tracking-widest uppercase">{t.branch} • {t.batch}</span>
                                {t.company && (
                                  <>
                                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                    <span className="text-emerald-600 font-bold tracking-widest uppercase">{t.company}</span>
                                  </>
                                )}
                              </div>
                            </div>
                            <div className="shrink-0">
                              {t.isApproved ? (
                                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-widest rounded-full">Approved</span>
                              ) : (
                                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-[10px] font-bold uppercase tracking-widest rounded-full animate-pulse">Pending Review</span>
                              )}
                            </div>
                          </div>

                          <div className="bg-gray-50 p-5 rounded-2xl mt-4">
                            <p className="text-gray-600 italic font-serif leading-relaxed">"{t.text}"</p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-row md:flex-col justify-end gap-3 shrink-0 pt-4 border-t border-gray-100 md:border-t-0 md:pt-0">
                          {!t.isApproved && (
                            <button
                              onClick={() => handleApproveTestimonial(t._id)}
                              className="flex-1 md:flex-initial p-4 bg-emerald-50 text-emerald-600 rounded-2xl hover:bg-emerald-500 hover:text-white transition-all shadow-sm flex items-center justify-center gap-2"
                              title="Approve & Publish"
                            >
                              <CheckCircle2 size={20} /> <span className="text-sm font-bold md:hidden">Approve</span>
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteTestimonial(t._id)}
                            className="flex-1 md:flex-initial p-4 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-sm flex items-center justify-center gap-2"
                            title={t.isApproved ? "Unpublish & Delete" : "Reject & Delete"}
                          >
                            <Trash2 size={20} /> <span className="text-sm font-bold md:hidden">Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Lightbox Modal */}
              {selectedTestimonialImage && (
                <div
                  className="fixed inset-0 z-100 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
                  onClick={() => setSelectedTestimonialImage(null)}
                >
                  <button
                    onClick={() => setSelectedTestimonialImage(null)}
                    className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-sm z-50"
                  >
                    <X size={24} />
                  </button>
                  <img
                    src={selectedTestimonialImage}
                    className="max-h-[90vh] max-w-full object-contain rounded-xl shadow-2xl animate-zoom-in"
                    alt="Testimonial Full Size"
                    onClick={e => e.stopPropagation()}
                  />
                </div>
              )}
            </div>
          )}

          {activeTab === "coordinators" && (
            <div className="space-y-8 animate-fade-in">
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-serif font-bold text-[#133b5c]">Department Coordinators</h2>
                  <p className="text-gray-400 text-sm mt-1">Manage personnel with access to the Coordinator Portal</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-2xl text-purple-600">
                  <User size={24} />
                </div>
              </div>

              {message && (
                <div className={`mb-6 p-4 rounded-2xl flex items-center gap-3 animate-slide-in-right ${message.includes("success") ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-red-50 text-red-700 border border-red-100"}`}>
                  <CheckCircle2 size={18} />
                  <span className="text-sm font-bold">{message}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50/50 p-6 rounded-3xl border border-gray-200">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Coordinator Email/ID</label>
                    <input
                      type="text"
                      placeholder="e.g. coordinator@dce.ac.in"
                      value={coordEmail}
                      onChange={(e) => setCoordEmail(e.target.value)}
                      className="w-full p-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#c6b677]/30 focus:border-[#c6b677] outline-none transition-all placeholder:text-gray-300 text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Initial Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={coordPassword}
                      onChange={(e) => setCoordPassword(e.target.value)}
                      className="w-full p-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#c6b677]/30 focus:border-[#c6b677] outline-none transition-all placeholder:text-gray-300 text-sm"
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-end">
                  <button
                    onClick={handleCoordinatorUpload}
                    disabled={loading || !coordEmail || !coordPassword}
                    className={`w-full bg-[#133b5c] text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-900/10 hover:bg-[#1a4b73] transform hover:-translate-y-1 transition-all flex items-center justify-center gap-3 ${loading || !coordEmail || !coordPassword ? 'opacity-50 cursor-not-allowed grayscale' : ''}`}
                  >
                    {loading ? "Registering..." : <><Plus size={18} className="text-[#c6b677]" /> Create Coordinator</>}
                  </button>
                  <p className="text-[10px] text-center text-gray-400 mt-4 uppercase font-bold tracking-widest">Grants access to Coordinator Portal</p>
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <h3 className="text-lg font-serif font-bold text-[#133b5c] mb-6 flex items-center gap-2">
                  Active Coordinators <span className="text-xs bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full font-sans uppercase tracking-widest">{coordinators.length} Users</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {coordinators.map((c) => (
                    <div key={c._id} className="flex justify-between items-center p-4 bg-gray-50 border border-gray-100 rounded-2xl hover:bg-white hover:shadow-xl hover:border-[#c6b677]/30 transition-all duration-300 group">
                      <div className="flex-1 min-w-0 pr-4">
                        <p className="font-bold text-[#133b5c] truncate">{c.email}</p>
                        <p className="text-[10px] text-blue-500 font-medium truncate mt-0.5">Coordinator Privileges</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDeleteCoordinator(c._id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-white rounded-lg transition-all shadow-sm"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Admin;
