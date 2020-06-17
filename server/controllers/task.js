const User = require('../models/user');
const {normalizeErrors} = require('../helpers/mongoose');
const config = require('../config');
const jwt = require('jsonwebtoken');
const Task=require('../models/task');

exports.createTask = function (req, res) {
  const taskData=req.body;
  //attaching user to a new task
  taskData.owner=res.locals.user;
   console.log("task:",taskData);
 Task.create(taskData,(error,createdTask)=>{
   if(error){
     console.log("creError",error);
     return res.mongoError(error);}
   return res.json({message: `Task with id: ${createdTask._id} was created!`})
   }
 )
};
exports.setProperties=async function(req,res) {
  const propertyNumber = req.params.task - property - numb;
  const userId = req.params.user_id;

  if (propertyNumber === 1) {
    Task.updateOne({owner: userId}, {$set: {taskDescription: req.body.taskDescription}}).then(
      (err, result) => {
        if (err) {
          return res.mongoError(err);
        }
        return result.save().then(
          (err, result) => {
            if (err) {
              return res.mongoError(err);
            }
            return res.json({message: `Task with id: was created!`})
          }
        )
      }
    )
  }

  if (propertyNumber === 1) {

  }
  if (propertyNumber === 1) {

  }
  if (propertyNumber === 1) {

  }
  if (propertyNumber === 1) {

  }
  if (propertyNumber === 1) {

  }
  if (propertyNumber === 1) {

  }
  if (propertyNumber === 1) {

  }
  if (propertyNumber === 1) {

  }
  if (propertyNumber === 1) {

  }
  if (propertyNumber === 1) {

  }
  if (propertyNumber === 1) {

  }
  if (propertyNumber === 1) {

  }
  if (propertyNumber === 1) {

  }
  if (propertyNumber === 1) {

  }
  if (propertyNumber === 1) {

  }
  if (propertyNumber === 1) {

  }
}
  exports.deleteTask= async (req, res) => {
    const { taskId } = req.params;
    const { user } = res.locals;

    try {
      const task = await Task.findOne({id:taskId}).populate('owner');
      if (user.id !== task.owner.id) {
        return res.sendApiError(
          { title: 'Invalid User',
            detail: 'You are not owner of this task!'});
      }
      await task.remove();
      return res.json({id: taskId,message:`a task with id: ${taskId} has been deleted!`});
    } catch(error) {
      return res.mongoError(error);

  }
}
