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
import { useForm } from 'react-hook-form'
import {removeRegisteredUsername} from "../../redux";


const LoginForm=({onSubmit,removeRegisteredUsername,onLoginHover})=>{

  const {register, handleSubmit,errors}=useForm();
  const EMAIL_PATTERN= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


  return (
    <div style={{padding:"30px"}} onMouseOver={(event)=>{removeRegisteredUsername("");}}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control ref={register({required:true,pattern:EMAIL_PATTERN
          })} name="email"  placeholder="Enter email" />
          {/*on a pad besoin de mettre type=emial car ref with pattern covered it already!!!*/}
          <Form.Text className="" style={{color:'#ffffff82'}}>
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


          <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control name="password"ref={register({required:true,minLength:8})} type="password" placeholder="Password" />
        </Form.Group>
        {errors.password &&
         <div className="alert alert-danger">
           {errors.password.type==="required" &&
             <span>
               Password is required!
             </span>
           }
           {errors.password.type==="minLength" &&
           <span>
               Minimum password's length ois 8 characters!
             </span>

           }
         </div>
        }


        <Button variant="primary" type="submit">
          Login
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
  {removeRegisteredUsername}
)(LoginForm);
