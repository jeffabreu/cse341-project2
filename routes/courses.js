const express = require('express');
const { validationResult } = require('express-validator');
const router = express.Router();
const { isAuthenticated } = require('../middleware/authentication');

const coursesController = require('../controllers/courses');
const { courseValidators, idValidator } = require('../middleware/validators/courses');

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

router.get('/', coursesController.getAllcourses);

router.get('/:id', idValidator, validate, coursesController.getSinglecourses);

router.post('/', isAuthenticated, courseValidators, validate, coursesController.createCourse);

router.put('/:id', isAuthenticated, idValidator.concat(courseValidators), validate, coursesController.updateCourse);

router.delete('/:id', isAuthenticated, idValidator, validate, coursesController.deleteCourse);

// Apply error handling middleware
router.use(errorHandler);

module.exports = router;
