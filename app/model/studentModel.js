const mongoose = require('mongoose');

const moduleValidation = {
  type: Number,
  min: [0, 'Student can have 0 or more points in the module'],
  max: [20, 'Student can have 20 or less points in the module'],
  default: 0,
};

const studentSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },

    birthDate: {
      type: Date,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    academicYear: {
      type: String,
      required: true,
      enum: {
        values: [
          'first year secondary',
          'second year secondary',
          'third year secondary',
        ],
        message:
          'You need to choose the following options: "first year secondary", "second year secondary" or "third year secondary"',
      },
    },

    teachingRoomNumber: {
      type: String,
      required: [true, 'Student most have a teaching room'],
    },

    modulePoints: {
      Math: moduleValidation,
      physycs: moduleValidation,
      science: moduleValidation,
      historyAndGeography: moduleValidation,
      law: moduleValidation,
      arabic: moduleValidation,
      french: moduleValidation,
      english: moduleValidation,
      sport: moduleValidation,
    },
  },
  {
    timestamps: true,
  }
);

const Student = new mongoose.model('Student', studentSchema);

module.exports = Student;
