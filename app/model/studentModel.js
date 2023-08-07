const mongoose = require('mongoose');
const validator = require('validator');

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
      minlength: 3,
    },

    birthDate: {
      type: Date,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (val) {
          return validator.isEmail(val);
        },
        message: 'Not valid email',
      },
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
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

studentSchema.virtual('age').get(function () {
  const age = Math.floor((Date.now() - this.birthDate) / 31556952000);
  return age;
});

const Student = new mongoose.model('Student', studentSchema);

module.exports = Student;
