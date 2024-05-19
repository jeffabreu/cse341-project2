const express = require('express');
const passport = require('passport'); // Import passport
const router = express.Router();

// Import routes
const swaggerRoutes = require('./swagger');
const coursesRoutes = require('./courses');
const studentsRoutes = require('./students');

// Use routes
router.use('/', swaggerRoutes);
router.use('/courses', coursesRoutes);
router.use('/students', studentsRoutes);

// GitHub authentication routes
router.get('/login', passport.authenticate('github'));

// GitHub callback route
router.get('/auth/github/callback', 
    passport.authenticate('github', { failureRedirect: '/login' }),
    (req, res) => {
        // Successful authentication, redirect home.
        res.redirect('/');
    }
);

// Logout route
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = router;
