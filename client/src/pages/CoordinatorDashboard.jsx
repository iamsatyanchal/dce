import React, { useState, useEffect } from "react";
import api from "../services/api";
import { Trash2, Edit, Image as ImageIcon, Users, MessageSquare, LayoutDashboard, LogOut, Upload, CheckCircle2, Calendar, Star, Film, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CoordinatorDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");

  // Fest State (Updated for Event model)
  const [fests, setFests] = useState([]);
  const [festTitle, setFestTitle] = useState("");
  const [festDescription, setFestDescription] = useState("");
  const [festYoutubeLink, setFestYoutubeLink] = useState("");
  const [festFiles, setFestFiles] = useState([]);

  // Societies State
  const [societies, setSocieties] = useState([]);
  const [socName, setSocName] = useState("");
  const [socDesc, setSocDesc] = useState("");
  const [socLongDesc, setSocLongDesc] = useState("");
  const [socIcon, setSocIcon] = useState("Users");
  const [socHeroImage, setSocHeroImage] = useState(null);
  const [socGallery, setSocGallery] = useState([]);

  // Edit State
  const [editMode, setEditMode] = useState(false);
  const [currentSocId, setCurrentSocId] = useState(null);
  const [existingHero, setExistingHero] = useState(null);
  const [existingGallery, setExistingGallery] = useState([]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [stats, setStats] = useState({ fests: 0, societies: 0 });



  // Get token from localStorage
  const coordinatorInfo = JSON.parse(localStorage.getItem("coordinatorInfo"));
  const token = coordinatorInfo?.token;

  useEffect(() => {
    if (!coordinatorInfo) {
      navigate('/coordinator-login');
      return;
    }
    if (activeTab === "dashboard") {
      fetchFests();
      fetchSocieties();
    }
    if (activeTab === "fest") fetchFests();
    if (activeTab === "societies") fetchSocieties();
  }, [activeTab, navigate, coordinatorInfo]);

  // Fetchers
  const fetchFests = async () => {
    try {
      const { data } = await api.get(`/student-life/fests`);
      setFests(data);
      setStats(prev => ({ ...prev, fests: data.length }));
    } catch (err) { console.error(err); }
  };
  const fetchSocieties = async () => {
    try {
      const { data } = await api.get(`/student-life/societies`);
      setSocieties(data);
      setStats(prev => ({ ...prev, societies: data.length }));
    } catch (err) { console.error(err); }
  };

  // Handlers - Fest (Updated)
  const handleFestUpload = async (e) => {
    e.preventDefault();
    if (!festTitle || !festDescription) return setMessage("Please fill title and description");
    if (festFiles.length === 0) return setMessage("Please select at least one image");

    const formData = new FormData();
    formData.append("title", festTitle);
    formData.append("description", festDescription);
    if (festYoutubeLink) formData.append("youtubeLink", festYoutubeLink);

    // Append multiple files
    Array.from(festFiles).forEach(file => {
      formData.append("images", file);
    });

    setLoading(true); setMessage("");
    try {
      await api.post(`/student-life/fests`, formData, {
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` }
      });
      setMessage("Fest event uploaded successfully!");
      setFestTitle(""); setFestDescription(""); setFestYoutubeLink(""); setFestFiles([]);
      fetchFests();
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to upload fest event");
    }
    finally { setLoading(false); }
  };
  const handleDeleteFest = async (id) => {
    if (!window.confirm("Delete this entire fest event?")) return;
    try {
      await api.delete(`/student-life/fests/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchFests();
    } catch (err) { console.error(err); }
  };

  // Handlers - Societies
  const handleAddSociety = async (e) => {
    e.preventDefault();
    if (!socName || !socDesc) return setMessage("Please fill name and description");

    const formData = new FormData();
    formData.append("name", socName);
    formData.append("description", socDesc);
    formData.append("longDescription", socLongDesc);
    formData.append("iconName", socIcon);
    if (socHeroImage) formData.append("heroImage", socHeroImage);
    if (socGallery && socGallery.length > 0) {
      Array.from(socGallery).forEach(file => {
        formData.append("gallery", file);
      });
    }

    setLoading(true); setMessage("");
    try {
      if (editMode) {
        await api.put(`/student-life/societies/${currentSocId}`, formData, {
          headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` }
        });
        setMessage("Society updated successfully!");
      } else {
        await api.post(`/student-life/societies`, formData, {
          headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` }
        });
        setMessage("Society added successfully!");
      }
      resetSocForm();
      fetchSocieties();
    } catch (err) { setMessage(editMode ? "Failed to update society" : "Failed to add society"); }
    finally { setLoading(false); }
  };

  const resetSocForm = () => {
    setSocName(""); setSocDesc(""); setSocLongDesc(""); setSocIcon("Users");
    setSocHeroImage(null); setSocGallery([]);
    setEditMode(false); setCurrentSocId(null);
    setExistingHero(null); setExistingGallery([]);
    setMessage("");
  };

  const handleEditSociety = (soc) => {
    setEditMode(true);
    setCurrentSocId(soc._id);
    setSocName(soc.name);
    setSocDesc(soc.description);
    setSocLongDesc(soc.longDescription);
    setSocIcon(soc.iconName);
    setExistingHero(soc.heroImage?.imageUrl);
    setExistingGallery(soc.gallery || []);
    setActiveTab("societies");
    window.scrollTo(0, 0);
  };
  const handleDeleteSociety = async (id) => {
    if (!window.confirm("Delete this society?")) return;
    try {
      await api.delete(`/student-life/societies/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchSocieties();
    } catch (err) { console.error(err); }
  };

  return (
    <div className="min-h-screen flex bg-[#f8fafc] font-sans">
      {/* Sidebar */}
      <div className="w-72 bg-[#133b5c] text-white fixed h-full shadow-2xl z-30">
        <div className="p-8 border-b border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-[#c6b677] rounded-lg flex items-center justify-center text-[#133b5c] shadow-lg">
              <Calendar size={24} />
            </div>
            <h2 className="text-xl font-serif font-bold tracking-tight">Coordinator</h2>
          </div>
          <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Student Life Portal</p>
        </div>

        <nav className="p-6">
          <ul className="space-y-2">
            {[
              { id: 'dashboard', label: 'Overview', icon: <LayoutDashboard size={20} /> },
              { id: 'fest', label: 'Fests & Events', icon: <Film size={20} /> },
              { id: 'societies', label: 'Student Societies', icon: <Users size={20} /> },
            ].map((item) => (
              <li
                key={item.id}
                onClick={() => { setActiveTab(item.id); setMessage(""); }}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-xl cursor-pointer transition-all duration-200 ${activeTab === item.id ? 'bg-[#c6b677] text-[#133b5c] shadow-lg font-bold' : 'hover:bg-white/5 text-white/70 hover:text-white'
                  }`}
              >
                {item.icon} {item.label}
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-0 w-full p-6 border-t border-white/10 bg-[#0d2a42]">
          <div
            onClick={() => { localStorage.removeItem('coordinatorInfo'); navigate('/coordinator-login'); }}
            className="flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer text-red-300 hover:bg-red-500/10 transition-all font-bold uppercase text-sm"
          >
            <LogOut size={20} /> Sign Out
          </div>
        </div>
      </div>

      {/* Main Section */}
      <div className="flex-1 ml-72">
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 h-20 sticky top-0 z-20 px-10 flex text-2xl font-serif font-bold text-[#133b5c] items-center capitalize">
          {activeTab} Management
        </header>

        <main className="p-10 max-w-7xl mx-auto">
          {message && (
            <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${message.includes("success") ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>
              <CheckCircle2 size={18} /> <span className="text-sm font-bold">{message}</span>
            </div>
          )}

          {activeTab === "dashboard" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6">
                <div className="bg-blue-50 p-4 rounded-2xl text-blue-500">
                  <Film size={32} />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-[#133b5c]">{stats.fests}</h3>
                  <p className="text-gray-400 font-medium">Fest Events</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6">
                <div className="bg-amber-50 p-4 rounded-2xl text-amber-500">
                  <Users size={32} />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-[#133b5c]">{stats.societies}</h3>
                  <p className="text-gray-400 font-medium">Active Societies</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "fest" && (
            <div className="space-y-8 animate-fade-in">
              <form onSubmit={handleFestUpload} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Fest / Event Title</label>
                  <input type="text" required value={festTitle} onChange={e => setFestTitle(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#c6b677] outline-none" placeholder="e.g. DCE TechFest 2024" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Event Description</label>
                  <textarea required value={festDescription} onChange={e => setFestDescription(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl min-h-[100px] focus:ring-2 focus:ring-[#c6b677] outline-none" placeholder="Describe the highlights of the fest..."></textarea>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">YouTube Video Link (Optional)</label>
                  <input type="text" value={festYoutubeLink} onChange={e => setFestYoutubeLink(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#c6b677] outline-none" placeholder="https://youtube.com/watch?v=..." />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block">Event Images (Multiple allowed)</label>
                    {festFiles.length > 0 && (
                      <button type="button" onClick={() => setFestFiles([])} className="text-[10px] text-red-500 hover:text-red-700 font-bold uppercase tracking-widest bg-red-50 px-2 py-1 rounded-md transition-colors">Clear Selection</button>
                    )}
                  </div>
                  <input type="file" multiple onChange={e => setFestFiles(prev => [...prev, ...Array.from(e.target.files)])} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer p-1" />
                  {festFiles.length > 0 && <p className="text-xs text-emerald-600 mt-2 font-bold">{festFiles.length} file(s) currently staged for upload</p>}
                </div>

                <div className="md:col-span-2">
                  <button type="submit" disabled={loading} className="w-full bg-[#133b5c] text-white py-3 rounded-xl font-bold hover:bg-[#1a4b73] transition-all flex justify-center items-center gap-2">
                    <Upload size={18} /> {loading ? "Uploading Event data... this may take a moment" : "Upload Event Package"}
                  </button>
                </div>
              </form>

              <div className="space-y-6">
                <h3 className="text-xl font-bold text-[#133b5c] border-b pb-2">Uploaded Events</h3>
                {fests.length === 0 && <p className="text-gray-400 italic">No events uploaded yet.</p>}
                {fests.map(fest => (
                  <div key={fest._id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-xl font-bold text-[#133b5c]">{fest.title}</h4>
                        <button onClick={() => handleDeleteFest(fest._id)} className="text-gray-400 hover:text-red-500 transition-colors bg-red-50 p-2 rounded-lg">
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <p className="text-sm text-gray-500 mb-4">{fest.description}</p>
                      {fest.youtubeLink && (
                        <a href={fest.youtubeLink} target="_blank" rel="noreferrer" className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 inline-block mb-4 hover:bg-blue-100 transition-colors">
                          Video Link Attached
                        </a>
                      )}
                      <div className="flex gap-2 overflow-x-auto pb-2">
                        {fest.images.map((img, idx) => (
                          <img key={idx} src={img.imageUrl} alt="fest" className="w-20 h-20 object-cover rounded-lg border border-gray-200 shrink-0" />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "societies" && (
            <div className="space-y-8 animate-fade-in">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-serif font-bold text-[#133b5c]">{editMode ? "Edit Society" : "Add New Society"}</h3>
                {editMode && (
                  <button onClick={resetSocForm} className="text-gray-500 hover:text-red-500 flex items-center gap-2 font-bold uppercase text-xs">
                    <X size={16} /> Cancel Edit
                  </button>
                )}
              </div>
              <form onSubmit={handleAddSociety} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Society Name</label>
                  <input type="text" required value={socName} onChange={e => setSocName(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl" placeholder="e.g. Symphony" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Icon Name (Lucide string)</label>
                  <input type="text" value={socIcon} onChange={e => setSocIcon(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl" placeholder="e.g. Music, Theater, Users" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Short Tagline / Description</label>
                  <textarea required value={socDesc} onChange={e => setSocDesc(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl min-h-[60px]" placeholder="Brief tagline for the society cards..."></textarea>
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Detailed About Section (Long Description)</label>
                  <textarea required value={socLongDesc} onChange={e => setSocLongDesc(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl min-h-[150px]" placeholder="Detailed information about the society, its history, mission, etc."></textarea>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Hero Image (Cover Photo)</label>
                  {existingHero && !socHeroImage && (
                    <div className="mb-2 relative w-32 h-20 rounded-lg overflow-hidden border border-gray-200">
                      <img src={existingHero} alt="existing hero" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center text-white text-[10px] font-bold">CURRENT</div>
                    </div>
                  )}
                  <input type="file" onChange={e => setSocHeroImage(e.target.files[0])} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer p-1" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Gallery Images (Adds to existing)</label>
                  {existingGallery.length > 0 && (
                    <div className="flex gap-2 mb-2 overflow-x-auto pb-2">
                      {existingGallery.map((img, idx) => (
                        <div key={idx} className="w-12 h-12 rounded border border-gray-200 overflow-hidden shrink-0">
                          <img src={img.imageUrl} alt="gallery" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                  <input type="file" multiple onChange={e => setSocGallery(prev => [...Array.from(e.target.files)])} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer p-1" />
                </div>
                <div className="md:col-span-2">
                  <button type="submit" disabled={loading} className="w-full bg-[#133b5c] text-white py-3 rounded-xl font-bold hover:bg-[#1a4b73] transition-all">
                    {loading ? (editMode ? "Updating..." : "Creating...") : (editMode ? "Save Changes" : "Add Universal Society")}
                  </button>
                </div>
              </form>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {societies.map(soc => (
                  <div key={soc._id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-lg font-bold text-[#133b5c]">{soc.name}</h4>
                      <div className="flex gap-2">
                        <button onClick={() => handleEditSociety(soc)} className="text-gray-400 hover:text-blue-500 transition-colors bg-blue-50 p-2 rounded-lg"><Edit size={16} /></button>
                        <button onClick={() => handleDeleteSociety(soc._id)} className="text-gray-400 hover:text-red-500 transition-colors bg-red-50 p-2 rounded-lg"><Trash2 size={16} /></button>
                      </div>
                    </div>
                    {soc.heroImage?.imageUrl && (
                      <img src={soc.heroImage.imageUrl} alt="hero" className="w-full h-24 object-cover rounded-xl mb-4 grayscale hover:grayscale-0 transition-all" />
                    )}
                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{soc.description}</p>
                    <div className="flex justify-between items-center mt-4">
                      <p className="text-xs text-[#c6b677] font-bold uppercase tracking-widest">Icon: {soc.iconName}</p>
                      {soc.gallery?.length > 0 && <span className="text-[10px] bg-gray-100 px-2 py-1 rounded-full font-bold text-gray-400">{soc.gallery.length} Photos</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};

export default CoordinatorDashboard;
