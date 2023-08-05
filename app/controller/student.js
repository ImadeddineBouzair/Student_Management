const Student = require('../model/studentModel');

exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find();

    res.status(200).json({
      status: 'Success',
      results: students.length,
      data: students,
    });
  } catch (err) {
    res.status(404).send(err.message);
  }
};

exports.getOneStudent = async (req, res) => {
  try {
    const id = req.params.id;

    const student = await Student.findById(id);
    console.log(student);
    if (!student) return res.status(400).send('No data found');

    res.status(200).json({
      status: 'Success',
      data: student,
    });
  } catch (err) {
    res.status(404).send(err.message);
  }
};

exports.addStudent = async (req, res) => {
  try {
    const { studentName, birthDate, email, academicYear, teachingRoomNumber } =
      req.body;

    if (
      !(studentName && birthDate && email && academicYear && teachingRoomNumber)
    ) {
      return res.status(400).send('All the fields are required');
    }

    const existingStudent = await Student.findOne({ email });
    if (existingStudent) return res.status(400).send('Email already exist');

    const student = new Student({
      studentName: studentName
        .split(' ')
        .filter((el) => el !== '')
        .join(' '),
      birthDate,
      email,
      academicYear,
      teachingRoomNumber,
    });
    const newStudent = await student.save();

    res.status(201).json({
      status: 'Created with success',
      data: newStudent,
    });
  } catch (err) {
    res.status(404).send(err.message);
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedStudent) return res.status(400).send('Not found');

    res.status(200).json({
      status: 'Updated with success',
      data: updatedStudent,
    });
  } catch (err) {
    res.status(404).send(err.message);
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);

    if (!deletedStudent) return res.status(400).send('Not found');

    res.status(204).json({
      status: 'Deleted with success',
      data: null,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
};
