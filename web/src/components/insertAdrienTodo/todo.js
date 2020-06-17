import React, { useState, useEffect } from 'react';


import "./todo.scss";

import ControllerAddTodo from "../enter-to-do/controller-add-todo";
import CurrentTodoList from "../enter-to-do/current-todo-list";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import {createTask, saveStateToServer} from "../../redux";
import {connect} from "react-redux";
// import TimeRange from "./components/TimeRange";
// import EditTask from "./components/EditTask";


const TodoAD=props=> {


    const [newTask, setNewTask] = useState({content: "", key: 0});
    const [taskArray, setTaskArray] = useState([]);
    const [newTaskDetail, setNewTaskDetails] = useState({});
    const [initTaskID, setInitTaskID] = useState(null);

  useEffect(()=>{
    props.saveStateToServer(props.myState);

    if(props.currentTaskToEdit!==null){

      setTaskArray([props.currentTaskToEdit]);
    }

  },[props.currentTaskToEdit])


    const addNewTask = (evt,initTask) => {
        // let taskArray=taskArray;
        evt.preventDefault();
         setInitTaskID(initTask.id)
        let setId = newTask.key;
        taskArray.push(newTask);
        setNewTask({content: "", key: setId += 1});
        setTaskArray(taskArray);
    }

    const setANewTask = (newTask) => {
        let setId = newTask.key;
        setNewTask({content: newTask.target.value, key: setId});

    }


    const handleNewTask=(event,data)=>{
    event.preventDefault();
        setNewTaskDetails(data);
    }
    const handleSubmit=()=>{

    }

    return (
        <div className="App">
            <div className="adj-main-marg">
                <Container>
                    <Row>
                        <Col>
                            <ControllerAddTodo
                                inputVal={newTask.content}
                                handleNewTask={setANewTask}
                                handleSubmit={(event,data)=>{addNewTask(event,data)}}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                           <div>{taskArray.group}</div>
                            <CurrentTodoList initTaskID={initTaskID} taskDesc={newTask.content} sendNewTask={handleNewTask} taskArray={taskArray}/>

                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );

}

const mapStateToProps = (state) => ({
    myState:state,
  currentTaskToEdit:state.createTaskDetails.setCurrentTaskToEdit
});
const mapDispatchToProps = dispatch => {
  return {

    createTask: (task) => dispatch(createTask(task)),

    saveStateToServer: (newState) => dispatch(saveStateToServer(newState))

  } //note the dispatch call
}

export default connect(
    mapStateToProps,
  mapDispatchToProps,
)(TodoAD);

