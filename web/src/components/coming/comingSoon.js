import React, {useState, useEffect} from 'react';
import {Link, Redirect, Route, Switch} from 'react-router-dom';

import axios from 'axios';
// import {Provider} from 'react-redux';
// import {store} from './redux';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import {BrowserRouter} from "react-router-dom";
// import TodoAD from "./components/insertAdrienTodo/todo";
// import TodoRaj from "./components/raj-to-do/todo";
// import SubTask from "./components/subtask/subtask";
// import TimeRange from "./components/edit-task/TimeRange";
// import TimeLin from "./components/timeLine/timeLi";
// import LoginForm from "./components/forms/loginForm";
// import LoginAndRegistration from "./components/authentication/logInAndRegistration";
// import {AuthProvider, useAuth} from "./providers/AuthProvider";
import {Button, Form, FormControl, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {connect} from "react-redux";
import {useAuth} from "../../providers/AuthProvider";


const TodoComingSoon = ({logout, isAuth, username}) => {
  const authService=useAuth();


  return(
  <Container>
    <Row>
      <Col>
        <Row>
          <Col>
            <div>
              <p style={{marginTop:"15%",textAlign:"center",fontSize:"40px",fontWeight:"bold"}}>
                this feature will be available soon........
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col style={{marginTop:"10%"}}>
            <Link to="/enter-todo">
              <Button style={{margin:"auto",display:"block", fontWeight:"bold"}}>
                Enter A New Task
              </Button>
            </Link>
          </Col>
        </Row>

      </Col>

    </Row>

  </Container>

  )

}
const mapStateToProps = ({isAuth, username}) => {
  return {
    isAuth, username
  }
}


export default connect(mapStateToProps)(TodoComingSoon)
