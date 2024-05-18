const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['students']
    try {
        const result = await mongodb.getDatabase().db().collection('students').find().toArray();
        res.setHeader('Content-Type', 'application/json'); // Ensure this is correct
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve students', error });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['students']
    try {
        const studentId = new ObjectId(req.params.id);
        const student = await mongodb.getDatabase().db().collection('students').findOne({ _id: studentId });
        if (student) {
            res.setHeader('Content-Type', 'application/json'); // Ensure this is correct
            res.status(200).json(student);
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve student', error });
    }
};

const createStudent = async (req, res) => {
    //#swagger.tags=['students']
      try {
          const student = {
              name: req.body.name,
              age: req.body.age,
              email: req.body.email,
              major: req.body.major,
              year: req.body.year,
              address: req.body.address,
              phone: req.body.phone
          };
          /*
            
    name
    Benjamin Martinez

    String
    age
    22

    Int32
    email
    benjamin@example.com

    String
    major
    Engineering

    String
    year
    Senior

    String
    address
    456 Elm St, Townsville

    String
    phone
    555-987-6543
    */ 
          const response = await mongodb.getDatabase().db().collection('students').insertOne(student);
          res.status(201).json({ message: 'Course created successfully', student });
      } catch (error) {
          res.status(500).json({ error: error.message });
      }
  };
  
  const updateStudent = async (req, res) => {
    //#swagger.tags=['students']
      try {
          const courseId = new ObjectId(String(req.params.id));
          const courseUpdates = {
              $set: {
                name: req.body.name,
              age: req.body.age,
              email: req.body.email,
              major: req.body.major,
              year: req.body.year,
              address: req.body.address,
              phone: req.body.phone
              }
          };
          const response = await mongodb.getDatabase().db().collection('students').updateOne({_id: studentId}, studentUpdates);
          if (response.modifiedCount > 0) {
              res.status(204).send();
          } else {
              res.status(404).json({ message: 'Student not found' });
          }
      } catch (error) {
          res.status(500).json({ error: error.message });
      }
  };
  
  const deleteStudent = async (req, res) => {
    //#swagger.tags=['students']
      try {
          const courseId = new ObjectId(String(req.params.id));
          const response = await mongodb.getDatabase().db().collection('students').deleteOne({_id: studentId});
          if (response.deletedCount > 0) {
              res.status(204).send();
          } else {
              res.status(404).json({ message: 'Student not found' });
          }
      } catch (error) {
          res.status(500).json({ error: error.message });
      }
  };
module.exports = {
    getAll,
    getSingle,
    createStudent,
    updateStudent,
    deleteStudent
};
