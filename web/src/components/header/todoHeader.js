import React, {useState, useEffect} from 'react';
import {Link, Redirect, Route, Switch, useHistory} from 'react-router-dom';

import "./todoHeader.scss";
import axios from 'axios';
// import {Provider} from 'react-redux';
// import {store} from './redux';

// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
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


const TodoHeader = ({logout, isAuth, username,myState}) => {
  const authService=useAuth();
  const history = useHistory()



  const handleNavItem=(event)=>{
      event.preventDefault();
      history.push("/todo-coming-soon");
    }
  const handleLogo=(event)=>{
    event.preventDefault();
    history.push("/enter-todo");
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand onClick={handleLogo}>Todo-App</Navbar.Brand>

      <Navbar.Toggle aria-controls="responsive-navbar-nav"/>

      {

        isAuth ?

          <Navbar.Collapse id="responsive-navbar-nav">

            <Nav className="mr-auto">

              <Nav.Link onClick={handleNavItem}>Features</Nav.Link>

              <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                  <NavDropdown.Item  onClick={handleNavItem} >Another action</NavDropdown.Item>

                  <NavDropdown.Item onClick={handleNavItem}>Something</NavDropdown.Item>

                <NavDropdown.Divider/>
                  <NavDropdown.Item onClick={handleNavItem} >Separated link</NavDropdown.Item>


              </NavDropdown>
            </Nav>
            <Nav>
              <div style={{color: "antiquewhite", marginRight: "100px"}}>
                {username}
              </div>
            </Nav>
            <Nav style={{marginRight: "44px", fontSize: "14px"}}>


              <Link to="/" style={{color: "aliceblue"}}>
                <div onClick={logout}>
                  Logout
                </div>

              </Link>


            </Nav>


          </Navbar.Collapse> : <div></div>

      }

    </Navbar>

  );
}
const mapStateToProps = (state) => {
  return {
    isAuth:state.isAuth,
    username:state.username,
    createTaskDetails:state.createTaskDetails,
    myState:state
  }
}


export default connect(mapStateToProps)(TodoHeader)
