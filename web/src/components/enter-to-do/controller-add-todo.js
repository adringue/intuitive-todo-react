import React, {useState} from "react";
import {Container, Form, Row, Col, Button} from "react-bootstrap";
import {connect} from "react-redux";
import {
  createTask,
  createTaskServer,
  newTaskHasBeenAdded,
  saveState, saveStateToServer,
  taskObjectHasBeenInitiated,
  updateState
} from "../../redux";
import {Link, useHistory} from "react-router-dom";
import moment from "moment";

let ControllerAddTodo = (props) => {

  const [taskDescription, setTaskDescription] = useState("mainTask");
  let init_task = {};
  // const history=useHistory();
  const setTaskIdInRedux = (event) => {
    event.preventDefault();
    props.taskObjectHasBeenInitiated();

    init_task =
      {
        bgColor:null,
        color:null,
        key:null,
        end_time:null,
        start_time:null,
        stask_int:null,
        sub:null,
        sub_display:null,
        task_int:null,
        title:null,
        timeStart_Hours: 5,
        taskDescription: taskDescription,
        timeStart_Min: 1,
        timeEnd_Hours: 20,
        timeEnd_Min: 1,
        timeStart_Hours_interv_one: 0,
        timeStart_Mins_interv_one: 0,
        timeEnd_Hours_interv_one: 0,
        timeEnd_Mins_interv_one: 0,
        timeStart_Hours_interv_two: 0,
        timeStart_Mins_interv_two: 0,
        timeEnd_Hours_interv_two: 0,
        timeEnd_Mins_interv_two: 0,
        subTasks_Count: 0,
        subTasks: [],
        group: 0,
        start: null,
        end: null,
        date_Start: moment(new Date(), "YYYY-MM-DD HH:mm:ss"),
        date_End: moment(new Date(), "YYYY-MM-DD HH:mm:ss")

      }

    const b=  props.createTask(init_task);
     // await props.newTaskHasBeenAdded();
     props.updateState(props.myState);

    // createTaskServer(props.myState.createTaskDetails.currentAddedTask);


    // history.push(`/${props.taskID+1}`);

  }
  const handleSubmit = (data) => {
    setTaskDescription(data.target.value);

  }
  return (
    <Container>
      <Row>
        <Col>
          <Form>

            <Row>
              <Col md={10}>

                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    value={props.inputVal}
                    onChange={(event) => {
                      props.handleNewTask(event);
                      handleSubmit(event);

                    }
                    }
                    type="text"/>
                </Form.Group>
              </Col>
              <Col md={2}>
                <Button style={{width: "100%"}} variant="primary" type="submit" onClick={(event) => {
                  setTaskIdInRedux(event);
                  props.handleSubmit(event, init_task);
                }
                }>
                  Add A Todo to the list
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );

}
const mapStateToProps = (state) => ({
  taskID: state.createTaskDetails.tasksCount,
  myState: state,
  currentTask:state.createTaskDetails.currentAddedTask
});
const mapDispatchToProps = dispatch => {
  return {

    createTask: (task) => dispatch(createTask(task)),

    saveStateToServer: (newState) => dispatch(saveStateToServer(newState)),
    taskObjectHasBeenInitiated:()=>dispatch(taskObjectHasBeenInitiated()),
    newTaskHasBeenAdded:()=>dispatch(newTaskHasBeenAdded()),
    updateState: (newState) => dispatch(updateState(newState)),



  } //note the dispatch call
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ControllerAddTodo);

