import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../services/api';
import DepartmentTemplate from './DepartmentTemplate';

const DepartmentPage = () => {
    const { slug } = useParams();
    const [departmentData, setDepartmentData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDepartment = async () => {
            setLoading(true);
            try {
                const response = await api.get(`/departments/${slug}`);
                setDepartmentData(response.data);
                setError(null);
            } catch (err) {
                console.error("Error fetching department:", err);
                setError("Failed to load department data.");
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchDepartment();
        }
    }, [slug]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#133b5c]"></div>
            </div>
        );
    }

    if (error || !departmentData) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <h2 className="text-2xl font-semibold text-gray-400">{error || "Department not found"}</h2>
            </div>
        );
    }

    return <DepartmentTemplate data={departmentData} />;
};

export default DepartmentPage;
