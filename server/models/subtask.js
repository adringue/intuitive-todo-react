
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const subtaskSchema=new Schema({

  timeStart_Hours: {type: Number, required:" subtask timesStart_Hours is required!"},
  subtaskDescription: {type: String, required:"subtask description is required!"},
  timeStart_Mins: {type: Number, required:"subtask timesStart_Mins is required!"},
  timeEnd_Hours: {type: Number, required:"subtask timeEndHours is required!"},
  timeEnd_Mins: {type: Number, required:"subtask timeEndMins is required!"},
  group:{type: Number, required:"subtask group is required!"},
  subTask_ID:{type: Number, required:"subtask ID is required!"},
  sub:{type: String, required:"subtask sub is required!"},
  user:{
    type: Schema.Types.ObjectId, ref: 'User'
  },
  date_Start: {type: Date, required:"subtask date start is required!"},
  date_End: {type: Date, required:"subtask date end is required!"},
})

module.exports=mongoose.model('Subtask',subtaskSchema);







