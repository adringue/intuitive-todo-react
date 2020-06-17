import React, {useState, useEffect} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

import "./App.scss";
import axios from 'axios';
import {Provider} from 'react-redux';
import {store} from './redux';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {BrowserRouter} from "react-router-dom";
import TodoAD from "./components/insertAdrienTodo/todo";
import TodoRaj from "./components/raj-to-do/todo";
import SubTask from "./components/subtask/subtask";
import TimeRange from "./components/edit-task/TimeRange";
import TimeLin from "./components/timeLine/timeLi";
import LoginForm from "./components/forms/loginForm";
import LoginAndRegistration from "./components/authentication/logInAndRegistration";
import {AuthProvider, useAuth} from "./providers/AuthProvider";
import {Button, Form, FormControl, Nav, Navbar, NavDropdown} from "react-bootstrap";
import TodoHeader from "./components/header/todoHeader";
import AuthRoute from "./components/authProtected/authRoute";
import GuestRoute from "./components/authProtected/guessRoute";
import TodoComingSoon from "./components/coming/comingSoon";


const Providers = ({children}) =>
  <Provider store={store}>
    <AuthProvider>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </AuthProvider>
  </Provider>
//////////////////////////////////////////////

const Todo = () => {
  const authService = useAuth();
  console.log(authService);
  useEffect(() => {
      // befolre rendering any component this line will be executed!!!!!
      // authentication State will be checked
      // in the dependencies array--> every time authservice changes,
      // checkAuthState will be executed
      authService.checkAuthState();
    }, [authService]
  )

  const MyTodo=()=>{
    return (
      <Container>
        <Row>
          <Col>
            <TodoAD/>
          </Col>
        </Row>
        <Row>
          <Col>

          </Col>
        </Row>
      </Container>
    )
  }

  return (

    <Container style={{width:"100%",margin:"0",maxWidth:"100%",padding:"0"}}>
      <Row>
        <Col>


          <Row>
          {/* */}
            <Col>
             <TodoHeader logout={authService.signOut}/>
            </Col>
          {/**/}
          </Row>
          {/* fff*/}

          {/*ffffff*/}
          {/**/}
          <Row>

            <Switch>
              <AuthRoute exact path="/enter-todo" >
                  <MyTodo/>
              </AuthRoute>
              <AuthRoute exact path="/todo-coming-soon" >
                <TodoComingSoon/>
              </AuthRoute>
              <GuestRoute  exact path="/">
                <LoginAndRegistration/>
              </GuestRoute>

              <AuthRoute exact path="/subtask/:taskid/:subtaskid">
                <SubTask/>
              </AuthRoute>

              <AuthRoute exact path="/time-line">
                <TimeLin/>
              </AuthRoute>

              <AuthRoute exact path="/time-range/:taskid">
                <TimeRange/>
              </AuthRoute>
            </Switch>

          </Row>
        </Col>

      </Row>
    {/*  */}
    </Container>

  );
}
//////////////////////////////////////////////////////////
const App = () => {
  return (
    <Providers>
      <Todo/>
    </Providers>
  );
}

export default App
