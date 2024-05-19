const express = require('express');
const { validationResult } = require('express-validator');
const router = express.Router();
const { isAuthenticated } = require('../middleware/authentication');

const studentsController = require('../controllers/students');
const { studentValidators, idValidator } = require('../middleware/validators/students');

// Middleware for validation error handling
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Error handling middleware
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message });
};

router.get('/', studentsController.getAll);

router.get('/:id', idValidator, validate, studentsController.getSingle);

router.post('/', isAuthenticated, studentValidators, validate, studentsController.createStudent);

router.put('/:id', isAuthenticated, idValidator.concat(studentValidators), validate, studentsController.updateStudent);

router.delete('/:id', isAuthenticated, idValidator, validate, studentsController.deleteStudent);

// Apply error handling middleware
router.use(errorHandler);

module.exports = router;
