import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Plus, Edit2, Trash2, Save, X, ChevronDown, ChevronUp } from 'lucide-react';

const ManageDepartments = () => {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState(null);

    const [expandedDept, setExpandedDept] = useState(null);

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo?.token;

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        setLoading(true);
        try {
            const res = await api.get('/departments');
            setDepartments(res.data);
        } catch (err) {
            setError("Failed to fetch departments.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchFullDepartment = async (slug) => {
        try {
            const res = await api.get(`/departments/${slug}`);
            return res.data;
        } catch (err) {
            console.error(err);
            return null;
        }
    };

    const handleEdit = async (dept) => {
        const fullDept = await fetchFullDepartment(dept.slug);
        if (fullDept) {
            setFormData(fullDept);
            setEditingId(fullDept._id);
        }
    };

    const handleCancel = () => {
        setEditingId(null);
        setFormData(null);
    };

    const handleSave = async () => {
        try {
            if (editingId === "new") {
                await api.post('/departments', formData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else {
                await api.put(`/departments/${editingId}`, formData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
            fetchDepartments();
            handleCancel();
        } catch (err) {
            alert("Error saving department: " + (err.response?.data?.message || err.message));
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this department?")) return;
        try {
            await api.delete(`/departments/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchDepartments();
        } catch (err) {
            alert("Error deleting department.");
        }
    };

    const handleAddNew = () => {
        setEditingId("new");
        setFormData({
            name: "",
            slug: "",
            tagline: "",
            intake: 60,
            heroImage: "",
            description: [""],
            hod: { name: "", designation: "", qualification: "", image: "", message: "", email: "" },
            faculty: [],
            labs: []
        });
    };

    const updateFormData = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const updateHod = (field, value) => {
        setFormData(prev => ({
            ...prev,
            hod: { ...prev.hod, [field]: value }
        }));
    };

    const updateFaculty = (index, field, value) => {
        const newFaculty = [...formData.faculty];
        newFaculty[index][field] = value;
        updateFormData('faculty', newFaculty);
    };

    const addFaculty = () => {
        updateFormData('faculty', [...formData.faculty, { name: "", designation: "", specialization: "", image: "" }]);
    };

    const removeFaculty = (index) => {
        const newFaculty = formData.faculty.filter((_, i) => i !== index);
        updateFormData('faculty', newFaculty);
    };


    if (loading && !departments.length) return <div className="p-8 text-center text-gray-500">Loading departments...</div>;

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-serif font-bold text-[#133b5c]">Manage Departments</h2>
                        <p className="text-gray-400 text-sm mt-1">Add, edit, or remove academic departments and their details.</p>
                    </div>
                    {editingId === null && (
                        <button
                            onClick={handleAddNew}
                            className="bg-[#133b5c] text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-[#1a4b73] transition-colors"
                        >
                            <Plus size={18} /> Add Department
                        </button>
                    )}
                </div>

                {editingId !== null ? (
                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 space-y-6">
                        <div className="flex justify-between items-center border-b pb-4">
                            <h3 className="text-xl font-bold text-[#133b5c]">{editingId === "new" ? "Add New Department" : "Edit Department"}</h3>
                            <button onClick={handleCancel} className="text-gray-500 hover:text-red-500"><X size={24} /></button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase">Department Name</label>
                                <input type="text" value={formData.name || ""} onChange={e => updateFormData('name', e.target.value)} className="w-full p-3 border rounded-xl" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase">Slug (URL Path)</label>
                                <input type="text" value={formData.slug || ""} onChange={e => updateFormData('slug', e.target.value)} className="w-full p-3 border rounded-xl" disabled={editingId !== "new"} />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-xs font-bold text-gray-500 uppercase">Tagline</label>
                                <input type="text" value={formData.tagline || ""} onChange={e => updateFormData('tagline', e.target.value)} className="w-full p-3 border rounded-xl" />
                            </div>
                        </div>

                        {/* HOD Details */}
                        <div className="mt-8">
                            <h4 className="font-bold text-lg text-[#133b5c] mb-4">HOD Details</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input type="text" placeholder="HOD Name" value={formData.hod?.name || ""} onChange={e => updateHod('name', e.target.value)} className="w-full p-3 border rounded-xl" />
                                <input type="text" placeholder="Designation" value={formData.hod?.designation || ""} onChange={e => updateHod('designation', e.target.value)} className="w-full p-3 border rounded-xl" />
                                <input type="text" placeholder="Email" value={formData.hod?.email || ""} onChange={e => updateHod('email', e.target.value)} className="w-full p-3 border rounded-xl" />
                                <input type="text" placeholder="Image URL" value={formData.hod?.image || ""} onChange={e => updateHod('image', e.target.value)} className="w-full p-3 border rounded-xl" />
                                <textarea placeholder="HOD Message" value={formData.hod?.message || ""} onChange={e => updateHod('message', e.target.value)} className="w-full p-3 border rounded-xl md:col-span-2" rows="3"></textarea>
                            </div>
                        </div>

                        {/* Faculty Details */}
                        <div className="mt-8">
                            <div className="flex justify-between items-center mb-4">
                                <h4 className="font-bold text-lg text-[#133b5c]">Faculty Members</h4>
                                <button onClick={addFaculty} className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-lg flex items-center gap-1"><Plus size={14} /> Add Faculty</button>
                            </div>
                            <div className="space-y-4">
                                {formData.faculty?.map((fac, idx) => (
                                    <div key={idx} className="flex gap-4 items-center bg-white p-4 border rounded-xl shadow-sm">
                                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
                                            <input type="text" placeholder="Name" value={fac.name} onChange={e => updateFaculty(idx, 'name', e.target.value)} className="w-full p-2 border rounded-lg text-sm" />
                                            <input type="text" placeholder="Designation" value={fac.designation} onChange={e => updateFaculty(idx, 'designation', e.target.value)} className="w-full p-2 border rounded-lg text-sm" />
                                            <input type="text" placeholder="Specialization" value={fac.specialization} onChange={e => updateFaculty(idx, 'specialization', e.target.value)} className="w-full p-2 border rounded-lg text-sm" />
                                            <input type="text" placeholder="Image URL" value={fac.image || ""} onChange={e => updateFaculty(idx, 'image', e.target.value)} className="w-full p-2 border rounded-lg text-sm" />
                                        </div>
                                        <button onClick={() => removeFaculty(idx)} className="text-red-500 p-2 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-end gap-4 mt-8 pt-6 border-t">
                            <button onClick={handleCancel} className="px-6 py-2 border rounded-xl text-gray-600 hover:bg-gray-50">Cancel</button>
                            <button onClick={handleSave} className="px-6 py-2 bg-[#133b5c] text-white rounded-xl flex items-center gap-2 hover:bg-[#1a4b73]"><Save size={18} /> Save Department</button>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {departments.map(dept => (
                            <div key={dept._id || dept.slug} className="bg-gray-50 border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all group relative">
                                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => handleEdit(dept)} className="p-2 bg-white text-blue-600 rounded-lg shadow hover:bg-blue-50"><Edit2 size={16} /></button>
                                    <button onClick={() => handleDelete(dept._id)} disabled={!dept._id} className="p-2 bg-white text-red-600 rounded-lg shadow hover:bg-red-50 disabled:opacity-50"><Trash2 size={16} /></button>
                                </div>
                                <h3 className="font-bold text-lg text-[#133b5c] pr-16">{dept.name}</h3>
                                <p className="text-xs text-gray-500 uppercase tracking-widest mt-1 mb-4">/{dept.slug}</p>
                                <p className="text-sm text-gray-600 line-clamp-2">{dept.tagline}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageDepartments;
