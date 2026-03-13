const Department = require('../models/Department');
const { departmentData } = require('../../client/src/data/departmentData');

// Get all departments (summary for menus/lists)
exports.getAllDepartments = async (req, res) => {
    try {
        const departments = await Department.find({}, 'name slug tagline intake heroImage');
        res.status(200).json(departments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching departments', error: error.message });
    }
};

// Get department by slug
exports.getDepartmentBySlug = async (req, res) => {
    try {
        const department = await Department.findOne({ slug: req.params.slug });
        if (!department) {
            return res.status(404).json({ message: 'Department not found' });
        }
        res.status(200).json(department);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching department', error: error.message });
    }
};

// Create new department
exports.createDepartment = async (req, res) => {
    try {
        const newDepartment = new Department(req.body);
        await newDepartment.save();
        res.status(201).json({ message: 'Department created successfully', department: newDepartment });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Department slug already exists' });
        }
        res.status(500).json({ message: 'Error creating department', error: error.message });
    }
};

// Update department
exports.updateDepartment = async (req, res) => {
    try {
        const updatedDepartment = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedDepartment) {
            return res.status(404).json({ message: 'Department not found' });
        }
        res.status(200).json({ message: 'Department updated successfully', department: updatedDepartment });
    } catch (error) {
        res.status(500).json({ message: 'Error updating department', error: error.message });
    }
};

// Delete department
exports.deleteDepartment = async (req, res) => {
    try {
        const department = await Department.findByIdAndDelete(req.params.id);
        if (!department) {
            return res.status(404).json({ message: 'Department not found' });
        }
        res.status(200).json({ message: 'Department deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting department', error: error.message });
    }
};

// Seed initial data from static file (Optional helper for setup)
exports.seedDepartments = async (req, res) => {
    try {
        await Department.deleteMany({});
        const departmentsToSeed = Object.keys(departmentData).map(key => ({
            slug: key,
            ...departmentData[key]
        }));
        await Department.insertMany(departmentsToSeed);
        res.status(200).json({ message: 'Departments seeded successfully', count: departmentsToSeed.length });
    } catch (error) {
        res.status(500).json({ message: 'Error seeding departments', error: error.message });
    }
};
