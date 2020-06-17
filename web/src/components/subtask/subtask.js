import React, {useState} from "react";
import Table from "react-bootstrap/Table";
import "./subtask.scss"
import {Container, Col, Row} from "react-bootstrap";
import StatusController from "../enter-to-do/status-controller";
import SelectTime from "../enter-to-do/selectTime";
import SelectTimeEnd from "../enter-to-do/selectTimeEnd";
import Button from "react-bootstrap/Button";
import {Calendar, DatePicker, Input} from "rsuite";
import {Redirect, withRouter} from "react-router-dom";
import {Link} from "react-router-dom";
import {
  addSubtask, subtask_Description,
  subtaskCount, subtaskDescription,
  subtaskEndDate,
  subtaskEndHours,
  subtaskEndMinute,
  subtaskStartDate,
  subtaskStartHours,
  subtaskStartMinute,
  taskEndDate,
  taskEndHours,
  taskEndMinute,
  taskStartDate,
  taskStartHours,
  taskStartMinute
} from "../../redux";
import {connect} from "react-redux";
import moment from "moment";


let SubTask = (props) => {
console.log(props);

  const [removeTodo, setRemoveToDo] = useState(false);
  ////////////////////////

  let count = 0;
  // let newSubtask = {};
  // let subtaskDesc="";
  ////////////////////////

//////////////////////////////////

  const [taskDescription, setTaskDescription] = useState(null);

  const [timeStart_Hours, setTimeStart_Hours] = useState(null);
  const [timeStart_Mins, setTimeStart_Mins] = useState(null);
  const [timeEnd_Hours, setTimeEnd_Hours] = useState(null);
  const [timeEnd_Mins, setTimeEnd_Mins] = useState(null);
  const [dateStart, setDateStart] = useState(null);
  const [dateEnd, setDateEnd] = useState(null);

  /////////////////
  const timeStartHours = (data) => {
    setTimeStart_Hours(data);
    props.subtaskStartHours(props.match.params.taskid,props.match.params.subtaskid,data);
  }
  const timeStartMins = (data) => {
    setTimeStart_Mins(data);
    props.subtaskStartMinute(props.match.params.taskid,props.match.params.subtaskid,data);
  }

  const timeEndHours = (data) => {
    setTimeEnd_Hours(data);
    props.subtaskEndHours(props.match.params.taskid,props.match.params.subtaskid,data);
  }
  const timeEndMins = (data) => {
    setTimeEnd_Mins(data);
    props.subtaskEndMinute(props.match.params.taskid,props.match.params.subtaskid,data);
  }
  const getDateStart = (data) => {
    setDateStart(data);
    props.subtaskStartDate(props.match.params.taskid,props.match.params.subtaskid,data);
  }
  const getDateEnd = (data) => {
    setDateEnd(data);
    props.subtaskEndDate(props.match.params.taskid,props.match.params.subtaskid,data);
  }
  ///////////////
  ////////////////////////
  const handleTaskDesc = (data, event) => {
    setTaskDescription(data);
    props.subtask_Description(props.match.params.taskid,props.match.params.subtaskid,data)

  }


  const handleSubmit = (event) => {
    // event.preventDefault();
    // console.log(props.match.params.par);
    // const dateString = 'Tue April 14 2020 15:34:23 GMT+0300 (FLE Daylight Time)';
    const dateString = dateStart;
    const dateString2 = dateStart;

// const m=moment( dateString).format("X");
//  const n = moment(dateString2).format("X");
//  console.log(moment());
    let m = moment('Tue April 14 2020 15:34:23 GMT+0300 (FLE Daylight Time)', 'ddd MMM D YYYY HH:mm:ss ZZ')
      .hour(15).minute(56).format("X");
    console.log(m);
    // let n = moment(day);


  //   newSubtask = {
  //     taskID: props.match.params.id,
  //     timeStart_Hours: timeStart_Hours,
  //     taskDescription: taskDescription,
  //     timeStart_Mins: timeStart_Mins,
  //     timeEnd_Hours: timeEnd_Hours,
  //     timeEnd_Mins: timeEnd_Mins,
  //     subTask_Date_Start: dateStart,
  //     subTask_Date_End: dateEnd,
  //     sub: "sub",
  //     group: props.match.params.id,
  //     start:null,
  //     end:null,
  //   }
  //   props.addSubtask(newSubtask);
     }


  return (

    <div className="my_subtask">
      <Container>
        <Row>
          <Col>
            <Row>
              <Col>
                <Table striped bordered hover variant="dark">
                  <thead>
                  <tr>
                    <th>Task ID</th>
                    <th>subtask description</th>
                    {/*<th>Subtasks</th>*/}
                    <th>Start-Time</th>
                    <th>End-Time</th>
                    <th>Calendar</th>
                  </tr>
                  </thead>
                  <tbody>

                  <tr>
                    <td className="td-padd">{props.match.params.taskid}</td>

                    <td className="td-padd"><Input defaultValue="Enter Description"
                                                   onChange={(value, event) => {
                                                     handleTaskDesc(value, event)
                                                   }} type="text"/></td>

                    <td className="td-padd">
                      <Container>
                        <Row>
                          <Col><SelectTime
                            sendTimeStartHours={timeStartHours}
                            sendTimeStartMins={timeStartMins}

                          /></Col>
                        </Row>
                      </Container>
                    </td>
                    <td className="td-padd">
                      <Container>
                        <Row>
                          <Col><SelectTimeEnd


                            sendTimeEndHours={timeEndHours}
                            sendTimeEndMins={timeEndMins}

                          /></Col>
                        </Row>
                      </Container>
                    </td>
                    <td className="td-padd">
                      <Container>
                        <Row>
                          <Col>
                            <div className="text-center">Start-date</div>
                            <DatePicker
                              defaultValue={moment(new Date(),"YYYY-MM-DD HH:mm:ss").toDate()}

                              onChange={(date) => {
                                getDateStart(date)
                              }}
                              style={{width: "99%"}}/>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <div className="text-center">End-date</div>
                            <DatePicker
                              defaultValue={moment(new Date(),"YYYY-MM-DD HH:mm:ss").toDate()}
                              onChange={(date) => {
                                getDateEnd(date)
                              }}
                              style={{width: "99%"}}/>
                          </Col>
                        </Row>
                      </Container>
                    </td>


                  </tr>


                  </tbody>
                </Table>
              </Col>
            </Row>
            <Row>
              <Col>
                <Link to={"/enter-todo"}> <Button onClick={handleSubmit} className="adj-sub-button">Enter Subtask</Button></Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
const mapStateToProps = (state) => ({
  subTask_InitID: state.subTask_InitID
});

export default withRouter(connect(
  mapStateToProps,{subtaskStartHours,subtaskStartMinute,subtask_Description,subtaskEndHours,subtaskEndMinute,subtaskStartDate,subtaskEndDate}
)(SubTask));

