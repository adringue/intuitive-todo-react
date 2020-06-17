import React, {useState} from "react";
import Table from "react-bootstrap/Table";
import "./controller.scss"
import {Container, Col, Row} from "react-bootstrap";
import StatusController from "./status-controller";
import SelectTime from "./selectTime";
import SelectTimeEnd from "./selectTimeEnd";
import Button from "react-bootstrap/Button";
import {Calendar, DatePicker} from "rsuite";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {
  addSubmittedTask,
  addSubtask,
  createTask, createTaskServer, removeTaskWhenSubmitted, saveStateToServer, taskEndDate,
  taskEndHours, taskEndMinute,
  taskStartDate,
  taskStartHours,
  taskStartMinute, updateState
} from "../../redux";
import moment from "moment";
import {useAuth} from "../../providers/AuthProvider";


let CurrentTodoList = (props) => {
  let newtask = {};
  const authService=useAuth();
  const [removeTodo, setRemoveToDo] = useState(false);
  const [display, setDisplay] = useState(true);
  const [subTasks, setSubTasks] = useState([]);
  const [addSubtaskCount, setAddSubtaskCount] = useState(0);
//////////////////////////////////

  const [subtaskDescription, setSubTaskDescription] = useState("hallo!");
  const [timeStart_Hours, setTimeStart_Hours] = useState(6);
  const [timeStart_Mins, setTimeStart_Mins] = useState(1);
  const [timeEnd_Hours, setTimeEnd_Hours] = useState(3);
  const [timeEnd_Mins, setTimeEnd_Mins] = useState(1);
  const [day, setDay] = useState(null);
  const [dateStart, setDateStart] = useState(moment(new Date(),"YYYY-MM-DD HH:mm:ss").toDate());
  const [dateEnd, setDateEnd] = useState(moment(new Date(),"YYYY-MM-DD HH:mm:ss").toDate());
////////////////////////

  /////////////////
  const  timeStartHours =  (data) => {
     setTimeStart_Hours(data);
    props.taskStartHours(props.id,data);


  }
  const timeStartMns = (data) => {
    setTimeStart_Mins(data);
    props.taskStartMinute(props.id,data);
  }

  const timeEndHours = (data) => {
    setTimeEnd_Hours(data);
    props.taskEndHours(props.id,data);
  }
  const timeEndMints = (data) => {
    setTimeEnd_Mins(data);
    console.log(data);
    props.taskEndMinute(props.id,data);
  }
  const getDateStart =  (data) => {
    setDateStart(data);
    console.log(data);
    props.taskStartDate(props.id, moment(data,"YYYY-MM-DD HH:mm:ss"));
  }
  const getDateEnd = (data) => {
    setDateEnd(data);
    props.taskEndDate(props.id, moment(data,"YYYY-MM-DD HH:mm:ss"));
  }
  ///////////////
  let count = 0;
  const getTask = () => {
    return newtask;
  }

  const handleAddSubtask = (data) => {

    console.log(props);
    const init_Subtask = {
      ownerID:authService.getUserId(),
      taskId:data,
      timeStart_Hours: timeStart_Hours,
      subtaskDescription: subtaskDescription,
      timeStart_Mins: timeStart_Mins,
      timeEnd_Hours: timeEnd_Hours,
      timeEnd_Mins: timeEnd_Mins,
      timeStart_Hours_interv_one: 0,
      timeStart_Mins_interv_one: 0,
      timeEnd_Hours_interv_one: 0,
      timeEnd_Mins_interv_one: 0,
      timeStart_Hours_interv_two: 0,
      timeStart_Mins_interv_two: 0,
      timeEnd_Hours_interv_two: 0,
      timeEnd_Mins_interv_two: 0,
      group:props.initTaskID,
      subTask_ID:null,
      sub:"sub",
      start:null,
      end:null,
      date_Start: moment(new Date(),"YYYY-MM-DD HH:mm:ss"),
      date_End: moment(new Date(),"YYYY-MM-DD HH:mm:ss"),
    }
   //  console.log( moment('Mon 03-Jul-2017, 11:00 AM', 'ddd DD-MMM-YYYY, hh:mm A').format('hh:mm A') );
   //  console.log("unix:",moment.unix(1454521239279/1000).format("DD MMM YYYY hh:mm a"));
   // console.log("integer",moment(1454521239279).format("DD MMM YYYY hh:mm a")) //parse integer
   //   console.log("string",moment("1454521239279", "x").format("DD MMM YYYY hh:mm a"))//parse string
   //   console.log("recent",moment("Wed Apr 08 2020 03:07:39 GMT-0700 (Pacific Daylight Time)").format("DD MMM YYYY hh:mm a"));
   //  console.log("recent-2",moment("Wed Apr 08 2020 03:07:39 GMT-0700 (Pacific Daylight Time)").format("x"));
   //  console.log("recent-3",moment("Wed Apr 08 2020 03:07:39 GMT-0700 (Pacific Daylight Time)").format('LLLL'));
   // let myTime= moment("Wed Apr 08 2020 03:07:39 GMT-0700 (Pacific Daylight Time)").format('LLLL');
   // let b= moment(myTime).format("x");
   //  console.log("result",moment(b).format("DD MMM YYYY hh:mm a")) //parse integer
    let dateString = 'Tue May 16 2017 15:34:23 GMT+0300 (FLE Daylight Time)';
    let m = moment(dateString, 'ddd MMM D YYYY HH:mm:ss ZZ');
    console.log("formt",m);
// Use moment(Date) if your input is a JS Date
//var m = moment(date);
    m.set({h: 0, m: 11});
    console.log(m.format());
    console.log(m.toDate().toString());
    console.log(m.format("LLLL"));
    // moment().format("X"); // lowercase 'x' for milliseconds

    // if(newtask.id===props.currentSubtask?.taskID){
    //     newtask.subTasks.push(props.currentSubtask);
    // }

///////////////////////////////////////////
    props.addSubtask(init_Subtask);
    setAddSubtaskCount(addSubtaskCount + 1);
    setSubTasks([...subTasks, `sub${addSubtaskCount}`]);
    //////////////////////////////////////////////
  }
  const handleSubmit = (event,taskObj) => {
    event.preventDefault();
    // props.createTask(newtask);
    // createTaskServer(props.currentTask);
      props.addSubmittedTask(taskObj);
      props.removeTaskWhenSubmitted(taskObj.id)
    console.log(taskObj);
     createTaskServer(taskObj).then(()=>{
     });
    props.updateState(props.myState);


  }
  let subtasks_Arr = [];
  return (

    <div className="my_list">
      <Table striped bordered variant="dark">
        <thead>
        <tr>
          <th>Task Key</th>
          <th>Task description</th>
          <th>Subtasks</th>
          <th>Start-Time</th>
          <th>End-Time</th>
          <th>Calendar</th>
          <th>Action</th>
          {/*<th>Status</th>*/}
          {/*<th>Edit Task</th>*/}
        </tr>
        </thead>
        <tbody>
        {
          props.tasks.map((task, index) => {

              return <tr key={index}>
              <td className="td-padd">{task.id}</td>
              <td className="td-padd">{task.taskDescription}</td>
              <td className="td-padd">

                <Container>
                  <Row>
                    <Col><Button onClick={()=>handleAddSubtask(task.id)} className="adj-button-sub">+</Button></Col>
                    {/*<Col><Button onClick={handleAddSubtask} className="adj-button-sub" >+</Button></Col>*/}

                  </Row>
                  <Row>
                    <Col>

                      <ul>
                        {
                          task.subTasks.map((sub, index) => {
                            return (
                              <li key={index}>
                                <Container>
                                  <Row>
                                    <Col md={8}><div style={{ textAlign:"center",margin:"auto",backgroundColor:'rgba(255,0,0,0.54)',color:"black",padding:"10px"}}>
                                      <span>Subtask</span><span style={{border:"1px solid black",marginLeft:"2px", padding:"2px",backgroundColor: "green"}} >{sub.subTask_ID}</span></div></Col>
                                    <Col md={4}><Link to={`/subtask/${task.id}/${sub.subTask_ID}`}><Button style={{padding:"10px"}}>Edit</Button></Link></Col>
                                  </Row>
                                  <Row>
                                    <Col>
                                      <div style={{width:"150px",textAlign:"center",overflow:"scroll",margin:"auto",height:"70px" }}>
                                       <p style={{marginTop:"7px"}}>
                                         {sub.taskDescription}
                                       </p>
                                      </div>
                                    </Col>
                                  </Row>
                                </Container>
                                <hr/>
                              </li>
                            )
                          })
                        }
                      </ul>

                    </Col>
                  </Row>
                </Container>
              </td>
              <td className="td-padd">
                <Container>
                  <Row>
                    <Col><SelectTime
                      sendTimeStartHours={timeStartHours}
                      sendTimeStartMins={timeStartMns}
                      defaultTimeStartHours={task.timeStart_Hours}
                      defaultTimeStartMins={task.timeStart_Min}
                    /></Col>
                  </Row>
                </Container>
              </td>
              <td className="td-padd">
                <Container>
                  <Row>
                    <Col><SelectTimeEnd
                      sendTimeEndHours={timeEndHours}
                      sendTimeEndMins={timeEndMints}
                      defaultTimeEndHours={task.timeEnd_Hours}
                      defaultTimeEndtMins={task.timeEnd_Min}
                    /></Col>
                  </Row>
                </Container>
              </td>
              <td className="td-padd" style={{padding: "2%"}}>
                <Container>
                  <Row>
                    <Col>
                      <div className="text-center">Start-Date</div>
                      <DatePicker
                         defaultValue={task.date_Start.toDate()}
                        onChange={(date) => {

                          getDateStart(date)
                        }}
                        style={{width: "99%"}}/>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="text-center">End-Date</div>
                      <DatePicker
                        defaultValue={task.date_End.toDate()}
                        onChange={(date) => {
                          getDateEnd(date)
                        }}
                        style={{width: "99%"}}/>
                    </Col>
                  </Row>
                </Container>
              </td>
              <td className="td-padd">
                <Container>
                  <Row>
                    <Col>
                      <Button onClick={(event)=>{handleSubmit(event,task)}}>
                        Add Task To Calendar TimeLine
                      </Button>
                    </Col>
                  </Row>
                </Container>
              </td>

            </tr>
          })

        }

        </tbody>
      </Table>
      <div>
        <Link to={"/time-line"}><Button  className="adj-button-sub">View Calendar Timeline</Button></Link>
      </div>

    </div>

  );
}

const mapStateToProps = (state) => (
  {
    tasks: state.createTaskDetails.task,
    id: state.createTaskDetails.tasksCount,
    currentSubtask: state.currentSubTask,
    currentTask:state.createTaskDetails.currentAddedTask,
    myState:state

  });

export default withRouter(
  connect(
  mapStateToProps,
  {createTask,addSubtask,removeTaskWhenSubmitted ,taskStartHours,addSubmittedTask,updateState,taskStartMinute,taskEndHours,taskEndMinute,taskStartDate,taskEndDate}
)(CurrentTodoList)
);


