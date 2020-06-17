const express = require('express');
const router = express.Router();
const User= require('../controllers/user');
const Task= require('../controllers/task');




router.post('/register', User.register);
router.post('/login', User.login);
router.post('/verify_google_token',User.google_login);
router.post('/create-a-task',User.onlyAuthUser,Task.createTask);
router.post('/:task-property-numb/:user_id',User.onlyAuthUser,Task.setProperties);
router.delete('/:taskId', User.onlyAuthUser, Task.deleteTask);
router.post('/state',User.onlyAuthUser,User.saveState);
router.patch('/update-state', User.onlyAuthUser, User.updateState);



// User.onlyAuthUser --> only authenticated user can create a task
// now we have access to res.locals in the response header

module.exports = router;
