import React, {useState} from "react";
import Table from "react-bootstrap/Table";
import "./controller.scss"
import {Container, Col, Row} from "react-bootstrap";

 const StatusController=(props)=>{

     const [boxIsChecked,setBoxIsChecked]=useState(true);


        return (
            <form>
                <Container>
                    <Row>
                        <Col>
                            <div className="form-group">
                                <div className="form-check">
                                    <input className="form-check-input"
                                           onChange=
                                               {
                                               (event)=>{
                                                   setBoxIsChecked(event.target.checked);
                                               }

                                           }
                                           type="checkbox"
                                           id="gridCheck"/>
                                </div>
                            </div>


                        </Col>
                        <Col>
                            <button type="submit"
                                    onClick=
                                        {
                                            (event)=>{
                                                event.preventDefault();
                                                props.handleRemoveTodo(boxIsChecked);
                                            }
                                        }
                                    className="btn btn-primary">Done</button>

                        </Col>

                    </Row>
                </Container>

            </form>
        );
}

export default StatusController;
