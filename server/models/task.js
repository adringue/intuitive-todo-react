const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const taskSchema=new Schema({
  bgColor:String,
  color:String,
  key:Object,
  end_time:Date,
  start_time:Date,
  idTask:Number,
  stask_int:Boolean,
  sub:Boolean,
  sub_display:Boolean,
  id:Number,
  task_int:Boolean,
  title:String,
  timeStart_Hours: {type: Number, required:"timesStart_Hours is required!"},
  taskDescription: {type: String, required:"description is required!"},
  timeStart_Min: {type: Number, required:"timesStart_Min is required!"},
  timeEnd_Hours: {type: Number, required:"timeEnd_Hours is required!"},
  timeEnd_Min: {type: Number, required:"timeEnd_Min is required!"},
  timeStart_Hours_interv_one:{type: Number, required:"timeStart_Hours_interv_one is required!"},
  timeStart_Mins_interv_one: {type: Number, required:"timeStart_Mins_interv_one is required!"},
  timeEnd_Hours_interv_one: {type: Number, required:"timeEnd_Hours_interv_one is required!"},
  timeEnd_Mins_interv_one: {type: Number, required:"timeStart_Mins_interv_one is required!"},
  timeStart_Hours_interv_two: {type: Number, required:"timeStart_Hours_interv_two is required!"},
  timeStart_Mins_interv_two: {type: Number, required:"timeStart_Mins_interv_two is required!"},
  timeEnd_Hours_interv_two: {type: Number, required:"timeEnd_Hours_interv_two is required!"},
  timeEnd_Mins_interv_two: {type: Number, required:"timeStart_Mins_interv_two is required!"},
  subTasks_Count: {type: Number, required:"SubsTaskCount is required!"},
  owner:{
    type: Schema.Types.ObjectId, ref: 'User'
  },
  subTasks: [],
  group:{type: Number, required:"subtask group is required!"},
  date_Start: {type: Date, required:"subtask date start is required!"},
  date_End: {type: Date, required:"subtask date end is required!"},
  createAt:{type:Date, default: Date.now}
})
module.exports=mongoose.model('Task',taskSchema);
