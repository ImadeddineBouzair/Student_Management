const router = require('express').Router();

const {
  getStudents,
  getOneStudent,
  addStudent,
  updateStudent,
  deleteStudent,
} = require('../controller/student');

router.route('/').get(getStudents).post(addStudent);
router
  .route('/:id')
  .get(getOneStudent)
  .patch(updateStudent)
  .delete(deleteStudent);

module.exports = router;
