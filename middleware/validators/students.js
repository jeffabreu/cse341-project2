const { check } = require('express-validator');

const studentValidators = [
  check('name').not().isEmpty().withMessage('Name is required'),
  check('age').isInt({ min: 1 }).withMessage('Age must be a positive integer'),
  check('email').isEmail().withMessage('Invalid email format'),
  check('major').not().isEmpty().withMessage('Major is required'),
  check('year').not().isEmpty().withMessage('Year is required'),
  check('address').not().isEmpty().withMessage('Address is required'),
  check('phone').not().isEmpty().withMessage('Phone number is required')
];

const idValidator = [
  check('id').isMongoId().withMessage('Invalid ID format')
];

module.exports = {
  studentValidators,
  idValidator
};
