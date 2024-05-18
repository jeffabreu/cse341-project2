const { check } = require('express-validator');

const courseValidators = [
  check('name').not().isEmpty().withMessage('Name is required'),
  check('instructor').not().isEmpty().withMessage('Instructor is required'),
  check('description').not().isEmpty().withMessage('Description is required'),
  check('schedule').not().isEmpty().withMessage('Schedule is required'),
  check('location').not().isEmpty().withMessage('Location is required')
];

const idValidator = [
  check('id').isMongoId().withMessage('Invalid ID format')
];

module.exports = {
  courseValidators,
  idValidator
};