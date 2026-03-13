const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');

// Define routes
router.get('/', departmentController.getAllDepartments);
router.post('/seed', departmentController.seedDepartments); // Temporary route to seed initial data
router.get('/:slug', departmentController.getDepartmentBySlug);
router.post('/', departmentController.createDepartment);
router.put('/:id', departmentController.updateDepartment);
router.delete('/:id', departmentController.deleteDepartment);

module.exports = router;
