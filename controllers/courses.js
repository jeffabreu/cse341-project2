const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllcourses = async (req, res) => {
     //#swagger.tags=['courses']
    try {
        const result = await mongodb.getDatabase().db().collection('courses').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve courses', error });
    }
};

const getSinglecourses = async (req, res) => {
     //#swagger.tags=['courses']
    try {
        const courseId = new ObjectId(req.params.id);
        const course = await mongodb.getDatabase().db().collection('courses').findOne({ _id: courseId });
        if (course) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(course);
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve course', error });
    }
};

const createCourse = async (req, res) => {
     //#swagger.tags=['courses']
      try {
          const course = {
              name: req.body.name,
              instructor: req.body.instructor,
              description: req.body.description,
              schedule: req.body.schedule,
              location: req.body.location
          };
          /*
            name
            "Mathematics"
            instructor
            "Dr. Smith"
            description
            "Introduction to calculus and algebra"
            schedule
            "Mon/Wed/Fri 9:00 AM - 10:30 AM"
            location
            "Room 201"*/ 
          const response = await mongodb.getDatabase().db().collection('courses').insertOne(course);
          res.status(201).json({ message: 'Course created successfully', course });
      } catch (error) {
          res.status(500).json({ error: error.message });
      }
  };
  
  const updateCourse = async (req, res) => {
    //#swagger.tags=['courses']
      try {
          const courseId = new ObjectId(String(req.params.id));
          const courseUpdates = {
              $set: {
                name: req.body.name,
                instructor: req.body.instructor,
                description: req.body.description,
                schedule: req.body.schedule,
                location: req.body.location
              }
          };
          const response = await mongodb.getDatabase().db().collection('courses').updateOne({_id: courseId}, courseUpdates);
          if (response.modifiedCount > 0) {
              res.status(204).send();
          } else {
              res.status(404).json({ message: 'Course not found' });
          }
      } catch (error) {
          res.status(500).json({ error: error.message });
      }
  };
  
  const deleteCourse = async (req, res) => {
    //#swagger.tags=['courses']
      try {
          const courseId = new ObjectId(String(req.params.id));
          const response = await mongodb.getDatabase().db().collection('courses').deleteOne({_id: courseId});
          if (response.deletedCount > 0) {
              res.status(204).send();
          } else {
              res.status(404).json({ message: 'Course not found' });
          }
      } catch (error) {
          res.status(500).json({ error: error.message });
      }
  };

module.exports = {
    getAllcourses,
    getSinglecourses,
    createCourse,
    updateCourse,
    deleteCourse
};
