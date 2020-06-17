import React, {useEffect} from "react";
import {Container, Form, Row, Col, Button} from "react-bootstrap";
import "./timeRange.scss";
import {Slider, RangeSlider, Checkbox, DatePicker, Calendar} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimesCircle} from "@fortawesome/free-regular-svg-icons";
import {faSync} from "@fortawesome/free-solid-svg-icons/faSync";
import {faArrowAltCircleRight} from "@fortawesome/free-solid-svg-icons/faArrowAltCircleRight";
import {faLongArrowAltRight} from "@fortawesome/free-solid-svg-icons";
import {faLongArrowAltLeft} from "@fortawesome/free-solid-svg-icons/faLongArrowAltLeft";
import {Link, withRouter} from "react-router-dom";
import Table from "react-bootstrap/Table";
import {connect} from "react-redux";
import {createTask, deleteTask, deleteTaskServer, set_time_intervals, taskObjectHasBeenInitiated} from "../../redux";


const EditTask = props => {


  useEffect(() => {
    console.log(props);

  }, []);

  const handleTaskDelete=(event,task)=>{
    // console.log(props);
    // props.deleteTask(task.id);
    // deleteTaskServer(task.id);
  }


  return (
    <Container>
      <Row>
        <Col>
          <Col className="time-background">
            <Row>
              <Col>
                <Row>
                  <Col md={7}>

                    <Row className="adj-bgd-co">

                      <Col>
                        <Row>
                          <Col>
                            <div className="adj-task-linear">
                              <Row>
                                <Col>
                                  <Slider
                                    defaultValue={5}
                                    handleClassName="adj-handle"
                                    min={1}
                                    max={12}
                                    step={1}
                                    graduated
                                    progress
                                    renderMark={mark => {
                                      return mark;
                                    }}
                                    handleTitle="Hours"/>
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <Slider
                                    defaultValue={5}
                                    className="handleMinutes"
                                    min={1}
                                    max={60}
                                    step={1}
                                    graduated
                                    progress
                                    renderMark={mark => {
                                      if (mark % 3 === 0) {
                                        return mark;
                                      }
                                    }}
                                    handleTitle="Minutes"/>
                                </Col>
                              </Row>
                            </div>
                          </Col>

                          <Col md={2}>
                            <Row>
                              <Col>
                                {/*<Checkbox defaultChecked> AM</Checkbox>*/}
                              </Col>
                              <Col>
                                {/*<Checkbox defaultChecked> PM</Checkbox>*/}
                              </Col>

                            </Row>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                  <Col md={5}>
                    <Link to={`/time-range/${props.item.id}`}><Button className="tr-button">Time Ranges</Button></Link>

                  </Col>

                </Row>


                <Row>


                  <Col>
                    <Row>
                      <Col md={8}>
                        <div className="adj-priority">

                          <Row>
                            <Col>
                              <Slider
                                barClassName="adj-bar"
                                defaultValue={12}
                                style={{marginTop: "15px"}}
                                min={1}
                                max={12}
                                step={1}
                                graduated
                                progress

                                handleTitle="Priority"/>
                            </Col>

                          </Row>
                          <Row>
                            <Col md={1}>
                              <div className="adj-sync-2">
                                <FontAwesomeIcon icon={faSync}></FontAwesomeIcon>

                              </div>
                            </Col>
                            <Col md={11}>
                              <Checkbox defaultChecked>
                                <Row>
                                  {/*<Col md={1}>*/}
                                  {/*    <FontAwesomeIcon icon={faLongArrowAltLeft}></FontAwesomeIcon>*/}

                                  {/*</Col>*/}
                                  <Col md={12}>
                                    <div className="adj-must">Must do task!</div>

                                  </Col>

                                </Row>

                              </Checkbox>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              {/*<div className="list-container">*/}
                                <Row>
                                  <Col>
                                    {/*<Row style={{fontWeight: 'bolder'}}>*/}
                                    {/*  <div className="adj-list">*/}
                                    {/*    Sub Tasks*/}
                                    {/*  </div>*/}
                                    {/*</Row>*/}
                                    {
                                      props.selectedMaintask?.map((ite, index) =>

                                        (

                                            ite.sub_display ?

                                              (
                                                <Row key={index} style={{fontWeight: 'bolder'}}>
                                                <Table className="adju-ttable-1" striped bordered hover variant="dark">
                                                  <thead>
                                                  {/*{*/}
                                                  {/*  ite.sub_display ?*/}
                                                  <tr>
                                                    <th>Maintask #ID</th>
                                                    <th>Maintask Description</th>
                                                    <th>Maintask Start Date</th>
                                                    <th>Maintask End Date</th>
                                                    <th>Action</th>
                                                  </tr>
                                                  {/*}*/}
                                                  </thead>
                                                  <tbody>
                                                  {/*{*/}
                                                  {/*  ite.sub_display ?*/}

                                                      {/*(*/}
                                                  <tr>

                                                        <td>{
                                                          ite.id
                                                        }</td>
                                                        <td>
                                                          {ite.title}
                                                        </td>
                                                        <td>{`${ite.start_time}`}</td>
                                                        <td>{`${ite.end_time}`}</td>
                                                        <td>

                                                          <Container>
                                                            <Row>
                                                              <Col>
                                                                <Row>
                                                                  <Col>

                                                                    <Button className="adju-button" onClick={(event)=>{handleTaskDelete(event,ite)}}>
                                                                      DELETE
                                                                    </Button>
                                                                  </Col>
                                                                </Row>

                                                                <Row>
                                                                  <Col>

                                                                    <Button className="adju-button-2">
                                                                      Edit
                                                                    </Button>
                                                                  </Col>
                                                                </Row>
                                                              </Col>
                                                            </Row>
                                                          </Container>

                                                        </td>

                                                      </tr>
                                                  {/*)*/}
                                                  {/*    : <tr style={{display: "none"}}></tr>*/}
                                                  {/*}*/}
                                                  </tbody>
                                                </Table>
                                              </Row>) : <Row key={`${index}init`} style={{display: "none"}}></Row>
                                        )
                                      )
                                    }
                                  {/*{*/}
                                  <hr/>
                                  {
                                      props.selectedMaintask?.map((ite, index) =>

                                        (
                                          ite.show_sub ?
                                            (
                                            <Row key={index} style={{fontWeight: 'bolder'}}>

                                            <Table className="adju-ttable-2" striped bordered hover variant="dark">
                                              <thead>
                                              {/*{*/}
                                              {/*  ite.show_sub ?*/}
                                                <tr>
                                                  <th>subtask #ID</th>
                                                  <th>subtask Description</th>
                                                  <th>subtask Start Date</th>
                                                  <th>subtask End Date</th>
                                                  <th>Action</th>

                                                </tr>
                                              {/*: <tr style={{display:"none"}}></tr>*/}
                                              {/*}*/}
                                              </thead>
                                              <tbody>
                                              {/*{*/}
                                              {/*  ite.show_sub ?*/}
                                              {/*    (*/}
                                                    <tr>

                                                    <td>{
                                                      ite.id
                                                    }</td>
                                                    <td>
                                                      {ite.title}
                                                    </td>
                                                    <td>{`${ite.start_time}`}</td>
                                                    <td>{`${ite.end_time}`}</td>
                                                    <td>

                                                      <Container>
                                                        <Row>
                                                          <Col>
                                                            <Row>
                                                              <Col>

                                                                <Button className="adju-button" >
                                                                  DELETE
                                                                </Button>
                                                              </Col>
                                                            </Row>

                                                            <Row>
                                                              <Col>

                                                                <Button className="adju-button-2">
                                                                  Edit
                                                                </Button>
                                                              </Col>
                                                            </Row>
                                                          </Col>
                                                        </Row>
                                                      </Container>


                                                    </td>

                                                  </tr>
                                              {/*)*/}
                                              {/*    : <tr style={{display:"none"}}></tr>*/}
                                              {/*}*/}
                                              </tbody>
                                            </Table>
                                          </Row>) : <Row key={`${index}init2`} style={{display:"none"}}></Row>

                                        )
                                      )
                                    }

                                   {/*}*/}

                                  </Col>
                                </Row>

                              {/*</div>*/}
                            </Col>
                          </Row>
                        </div>
                      </Col>
                      <Col md={4}>
                        {/*<DatePicker preventOverflow open value={new Date()} style={{ width: 280 }} />*/}
                        <div style={{padding: "14px"}}>
                          <Calendar compact bordered/>
                        </div>
                      </Col>
                    </Row>
                  </Col>

                </Row>
                <Row>
                  <Col>
                    <Link to="/time-line">
                      <Button className="adj-confirm-edit">
                        Confirm Changes
                      </Button>
                    </Link>
                  </Col>
                </Row>

              </Col>
            </Row>
          </Col>
        </Col>
      </Row>
    </Container>
  );

}


export default EditTask;

// const mapStateToProps = (state) => ({
//   taskID: state.createTaskDetails.tasksCount,
//   myState: state,
//   tasks:state.task
// });
//
// export default withRouter(connect(
//   mapStateToProps,
//   {taskObjectHasBeenInitiated, createTask,set_time_intervals,deleteTask}
// )(EditTask));
