import React, {useState} from "react";
import {Container, Form, Row, Col, Button} from "react-bootstrap";
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
import {useForm} from "react-hook-form";
import {sameAs} from "../../helpers/validators";
import {createTask, registeredUsername, taskObjectHasBeenInitiated} from "../../redux";


const RegistrationForm = ({onSubmit,myState}) => {
  const {register, handleSubmit, errors,getValues} = useForm();
  const EMAIL_PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return (
    <div style={{padding: "30px"}}>
      {
        myState.currentRegisteredUsername ?
          <div>

            <div className="btn-success" style={{padding:"2%",textAlign:"center",color:"azure"}}>
              <div>Congratulations!!!!</div>
              <div> You are registered as {`${myState.currentRegisteredUsername}`}</div>
              <div>
                Login with email and password!
              </div>
            </div>
          </div>
          : <div></div>
      }
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/*1*/}
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control ref={register({
            required: true
          })} name="username" type="text" placeholder="Enter Username"/>

        </Form.Group>
        {errors.username &&
        <div className="alert alert-danger">
          {errors.username.type === "required" &&
          <span>
               Username  is required!
             </span>
          }
          {errors.email.type === "pattern" &&
          <span>
               Not valid email format!
             </span>
          }
        </div>
        }
        {/*1*/}
        {/*2*/}
        <Form.Group controlId="formBasicEmail2">
          <Form.Label>Email address</Form.Label>
          <Form.Control ref={register({
            required: true, pattern: EMAIL_PATTERN
          })} name="email" placeholder="Enter email"/>
          {/*on a pad besoin de mettre type=email car ref with pattern covered it already!!!*/}
          <Form.Text className="" style={{color:"#ffffff82"}}>
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        {errors.email &&
        <div className="alert alert-danger">
          {errors.email.type === "required" &&
          <span>
               Email  is required!
             </span>
          }

          {errors.email.type === "pattern" &&
          <span>
               Not valid email format!
             </span>
          }
        </div>
        }
        {/*2*/}
        {/*3*/}
        <Form.Group controlId="formBasicPassword2">
          <Form.Label>Password</Form.Label>
          <Form.Control name="password" ref={register({required: true, minLength: 4})} type="password"
                        placeholder="Password"/>
        </Form.Group>
        {errors.password &&
        <div className="alert alert-danger">
          {errors.password.type === "required" &&
          <span>
               Password is required!
             </span>
          }
          {errors.password.type === "minLength" &&
          <span>
               Minimum password's length is 8 characters!
             </span>
          }
        </div>
        }
        {/*3*/}
        {/*4*/}
        <Form.Group controlId="formBasicConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control name="confirm_password" ref={register({required: true,
            minLength: 4,validate:{sameAs:sameAs('password',getValues)}})} type="password"
           placeholder="Confirm  Password"/>
        </Form.Group>
        {errors.confirm_password &&
        <div className="alert alert-danger">
          {errors.confirm_password.type === "required" &&
          <span>
               Password Confirmation is required!
             </span>
          }
          {errors.confirm_password.type === "minLength" &&
          <span>
               Minimum password Confirmation length is 8 characters!
             </span>
          }
          {errors.confirm_password.type === "sameAs" &&
          <span>
               Password confirmation has to be the same as password!
             </span>
          }
        </div>
        }
        {/*4*/}
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>

    </div>
  )
}

const mapStateToProps = (state) => ({
  taskID: state.createTaskDetails.tasksCount,
  myState: state
});

export default connect(
  mapStateToProps,
  {registeredUsername}
)(RegistrationForm);
