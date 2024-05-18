const router = require('express').Router();
router.use('/', require('./swagger'));
//router.get('/', (req,res) => {res.send('Project 2')});
router.use('/courses', require('./courses'));
router.use('/students', require('./students'));


module.exports = router;