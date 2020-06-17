import React, {useState} from "react";
import {Container, Form, Row, Col, Button, Alert} from "react-bootstrap";
import {Slider, RangeSlider, Checkbox, DatePicker, Calendar} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimesCircle} from "@fortawesome/free-regular-svg-icons";
import {faSync} from "@fortawesome/free-solid-svg-icons/faSync";
import {faArrowAltCircleRight} from "@fortawesome/free-solid-svg-icons/faArrowAltCircleRight";
import {faLongArrowAltRight} from "@fortawesome/free-solid-svg-icons";
import {Link, withRouter} from "react-router-dom";
import moment from "moment";
import {connect} from "react-redux";
import LoginForm from "../forms/loginForm";
import RegistrationForm from "../forms/registrationForm";
import login from "../login";
import axios from 'axios';
import {registeredUsername, registration, removeRegisteredUsername, saveStateToServer, userLogin} from "../../redux";
import {ApiErrorsReg,ApiErrorsLog} from "../forms/ApiErrors";
import {withAuth} from "../../providers/AuthProvider";
import GooLog from "../loginGoogle/google_login";
import "./loginAndRegistration.scss";

const LoginAndRegistration = props => {
  const [shouldRedirectReg, setShouldRedirectReg] = useState(false);
  const [shouldRedirectLog, setShouldRedirectLog] = useState(false);
  const [registeredUsername, setRegisteredUsername] = useState("");

  const [errorsReg, setErrorsReg]=useState([]);
  const [errorsLog, setErrorsLog]=useState([]);


  ///////////////////login//////////////
  const signIn = (loginData) => {

    //we will decode the token before sending it to the user!9
    props.auth.signIn(loginData)
      .then(token=>{
        console.log(token);
        // saveStateToServer(props.myState)();
        setShouldRedirectLog(true);
        props.history.push(`/enter-todo`);

      })
      .catch(errors=>setErrorsLog(errors))
  };
///////////////////////////////////////
  ////////////// signup///////////////
  const signUp = (registerData) => {
    registration(registerData)
      .then(result => {
        console.log(result);
        props.registeredUsername(result.data.username);
        console.log(props.myState);
        // setRegisteredUsername(result.data.username);
        setShouldRedirectReg(true)})
      .catch(errors => setErrorsReg(errors))
  };
///////////////////////////////////////

  const loginHover=()=>{
    console.log(props.myState);
    // removeRegisteredUsername("test");
    console.log(props.myState);
    }


  ///////////////////////////////
  return (

    <div style={{width:"100%"}}>
      <Container style={{maxWidth:"100%"}}>

        <Row>
          <Col>
            <div className="v-header">

            {/*  ggg*/}
              <Row>
                <Col>
                  <div className="fullscreen-video-wrap">
                    <video autoPlay loop muted src="https://assets.mixkit.co/videos/preview/mixkit-people-in-the-subway-hall-in-tokyo-4454-large.mp4" >
                    </video>
                  </div>
                  <div className="header-overlay">

                  </div>
                  <div className="header-content">
                    <h1>Hello!</h1>

                  </div>
                </Col>
              </Row>
            {/* ggg */}
            <Row>

              <Col md={6}>
                <Row>
                  <Col style={{zIndex:"3"}}>
                    <LoginForm className="loginTest" onSubmit={signIn} onLoginHover={loginHover} />
                    <ApiErrorsLog errors={errorsLog}></ApiErrorsLog>
                  </Col>
                </Row>
                  <Row>
                    <Col style={{zIndex:"3"}}>
                      <div  style={{padding:"30px"}}>
                       <GooLog/>
                      </div>

                    </Col>
                  </Row>

              </Col>
              <Col md={6} style={{zIndex:"3"}}>

                <RegistrationForm  onSubmit={signUp}/>
                <ApiErrorsReg errors={errorsReg}></ApiErrorsReg>
              </Col>

            </Row>


            </div>
          </Col>
        </Row>

      </Container>
    </div>
  )
}
const mapStateToProps = (state) => ({
  taskID: state.createTaskDetails.tasksCount,
  myState: state,
  tasks:state.task
});
export default withRouter(withAuth(connect(mapStateToProps,{registeredUsername,saveStateToServer,removeRegisteredUsername})(LoginAndRegistration)));
