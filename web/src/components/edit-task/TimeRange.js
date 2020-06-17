import React, {useState} from "react";
import {Container, Form, Row, Col, Button} from "react-bootstrap";
import "./timeRange.scss";
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
import {
  createTask, deleteTask,
  newTaskHasBeenAdded,
  saveStateToServer,
  set_time_intervals,
  taskObjectHasBeenInitiated, updateState
} from "../../redux";


const TimeRange=props=> {

//////////////////////////////////
  const [timeStart_Hours_interv_one, setTimeStart_Hours_interv_one] = useState(0);
  const [timeStart_Mins_interv_one, setTimeStart_Mins_interv_one] = useState(0);
  const [timeEnd_Hours_interv_one, setTimeEnd_Hours_interv_one] = useState(0);
  const [timeEnd_Mins_interv_one, setTimeEnd_Mins_interv_one] = useState(0);
////////////////////////

//////////////////////////////////
  const [timeStart_Hours_interv_two, setTimeStart_Hours_interv_two] = useState(0);
  const [timeStart_Mins_interv_two, setTimeStart_Mins_interv_two] = useState(0);
  const [timeEnd_Hours_interv_two, setTimeEnd_Hours_interv_two] = useState(0);
  const [timeEnd_Mins_interv_two, setTimeEnd_Mins_interv_two] = useState(0);
////////////////////////


/////////////////////////////intev one//////////////////////////

  const timeStartHoursIntevOne = (data) => {
    setTimeStart_Hours_interv_one(data);
  }
  const timeStartMnsIntevOne = (data) => {
    setTimeStart_Mins_interv_one(data);
  }

  const timeEndHoursIntevOne = (data) => {
    setTimeEnd_Hours_interv_one(data);
  }
  const timeEndMintsIntevOne = (data) => {
    setTimeEnd_Mins_interv_one(data);
  }

//////////////////////////////intev two/////////////////////////
  const timeStartHoursIntevTwo = (data) => {
    setTimeStart_Hours_interv_two(data);

  }
  const timeStartMnsIntevTwo = (data) => {
    setTimeStart_Mins_interv_two(data);
  }

  const timeEndHoursIntevTwo = (data) => {
    setTimeEnd_Hours_interv_two(data);
  }
  const timeEndMintsIntevTwo = (data) => {
    setTimeEnd_Mins_interv_two(data);
  }
//////////////////////////////////////////////////////////////
///////////////////////////////////////////
  const handleSubmitChanges = () => {
    console.log(props.match.params.taskid);
    if ((timeStart_Hours_interv_one <= timeEnd_Hours_interv_one) && (timeEnd_Hours_interv_one <= timeStart_Hours_interv_two) &&
      (timeStart_Hours_interv_two <= timeEnd_Hours_interv_two)) {
      const intervTime = {
        taskId: parseInt(props.match.params.taskid),
        timeStart_Hours_interv_one: timeStart_Hours_interv_one,
        timeStart_Mins_interv_one: timeStart_Mins_interv_one,
        timeEnd_Hours_interv_one: timeEnd_Hours_interv_one,
        timeEnd_Mins_interv_one: timeEnd_Mins_interv_one,
        timeStart_Hours_interv_two: timeStart_Hours_interv_two,
        timeStart_Mins_interv_two: timeStart_Mins_interv_two,
        timeEnd_Hours_interv_two: timeEnd_Hours_interv_two,
        timeEnd_Mins_interv_two: timeEnd_Mins_interv_two
      }

    console.log(intervTime);

    props.set_time_intervals(intervTime);
     props.updateState(props.myState);
      props.history.push(`/time-line`);
  } else {

      alert("Please make sure t1 <= t2 <= t3 <= t4");
    }
}
/////////////////////////////////////////

        return (
            <Container>
                <Row>
                    <Col>
                        <div className="time-background-rge">
                            <Row>
                                <Col>
                                    {/**/}
                                    <Row>
                                        <Col>
                                            <Row>
                                                <Col>
                                                    <div className="adj_top_separat text-center">
                                                        Monday
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row className="adj-bgd-co-rge">
                                                <Col>

                                                    <Row>
                                                        <Col md={1} className="adj-am-fm">

                                                            <div style={{marginRight:"50px",width:"100%",textAlign:"center",color:"black",fontWeight:"bold"}}>T1</div>

                                                        </Col>
                                                        <Col md={11}>

                                                            <Row>
                                                                <Col>
                                                                    <Slider
                                                                         onChange={
                                                                           (value)=>
                                                                             timeStartHoursIntevOne(value)
                                                                         }
                                                                        min={1}
                                                                        max={24}
                                                                        step={1}
                                                                        graduated
                                                                        progress
                                                                        renderMark={mark => {
                                                                          if (mark % 8 === 0) {
                                                                            return mark;
                                                                          }
                                                                        }}
                                                                        handleTitle="Hours"/>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col>
                                                                    <Slider
                                                                      onChange={
                                                                        (value)=>
                                                                          timeStartMnsIntevOne(value)
                                                                      }
                                                                        className="handleMinutes"
                                                                        min={1}
                                                                        max={60}
                                                                        step={1}
                                                                        graduated
                                                                        progress
                                                                        renderMark={mark => {
                                                                          if (mark % 20 === 0) {
                                                                            return mark;
                                                                          }
                                                                        }}
                                                                        handleTitle="Minutes"/>
                                                                </Col>
                                                            </Row>

                                                        </Col>
                                                    </Row>
                                                  <Row>
                                                    <Col md={12}>
                                                      <div className="adj-intersec text-center">TO</div>
                                                    </Col>
                                                  </Row>
                                                </Col>

                                                <Col>
                                                    <Row>
                                                      <Col md={1} className="adj-am-fm">

                                                        <div style={{marginRight:"50px",width:"100%",textAlign:"center",color:"black",fontWeight:"bold"}}>T2</div>

                                                      </Col>
                                                        <Col md={11}>
                                                            <Row>

                                                                <Col>

                                                                    <Slider
                                                                      onChange={
                                                                        (value)=>
                                                                          timeEndHoursIntevOne(value)
                                                                      }
                                                                        defaultValue={5}
                                                                        handleClassName="adj-handle"
                                                                        min={1}
                                                                        max={24}
                                                                        step={1}
                                                                        graduated
                                                                        progress
                                                                        renderMark={mark => {
                                                                          if (mark % 8 === 0) {
                                                                            return mark;
                                                                          }
                                                                        }}
                                                                        handleTitle="Hours"/>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col>
                                                                    <Slider
                                                                      onChange={
                                                                        (value)=>
                                                                          timeEndMintsIntevOne(value)
                                                                      }
                                                                        defaultValue={5}
                                                                        className="handleMinutes"
                                                                        min={1}
                                                                        max={60}
                                                                        step={1}
                                                                        graduated
                                                                        progress
                                                                        renderMark={mark => {
                                                                          if (mark % 20 === 0) {
                                                                            return mark;
                                                                          }
                                                                        }}
                                                                        handleTitle="Minutes"/>
                                                                </Col>
                                                            </Row>

                                                        </Col>

                                                        <Col md={2} className="adj-am-fm">
                                                        {/*    <Row>*/}
                                                        {/*        <Col>*/}
                                                        {/*            /!*<Checkbox defaultChecked> AM</Checkbox>*!/*/}
                                                        {/*        </Col>*/}
                                                        {/*        <Col>*/}
                                                        {/*            /!*<Checkbox defaultChecked> PM</Checkbox>*!/*/}
                                                        {/*        </Col>*/}

                                                        {/*    </Row>*/}

                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Col>

                                    </Row>

                                     <Row>
                                       <Col>
                                         <div className="text-center">
                                           AND
                                         </div>
                                       </Col>
                                     </Row>

                                    {/**/}

                                    <Row>
                                        <Col>
                                            <Row>
                                                <Col>
                                                    <hr/>
                                                    <div className=" adj_top_separat text-center">
                                                        Tuesday
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row className="adj-bgd-co-rge">
                                                <Col>

                                                    <Row>
                                                      <Col md={1} className="adj-am-fm">

                                                        <div style={{marginRight:"50px",width:"100%",textAlign:"center",color:"black",fontWeight:"bold"}}>T3</div>

                                                      </Col>
                                                        <Col md={11}>

                                                            <Row>
                                                                <Col>
                                                                    <Slider
                                                                      onChange={
                                                                        (value)=>
                                                                          timeStartHoursIntevTwo(value)
                                                                      }
                                                                        min={1}
                                                                        max={24}
                                                                        step={1}
                                                                        graduated
                                                                        progress
                                                                        renderMark={mark => {
                                                                          if (mark % 8 === 0) {
                                                                            return mark;
                                                                          }
                                                                        }}
                                                                        handleTitle="Hours"/>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col>
                                                                    <Slider
                                                                      onChange={
                                                                        (value)=>
                                                                          timeStartMnsIntevTwo(value)
                                                                      }
                                                                        className="handleMinutes"
                                                                        min={1}
                                                                        max={60}
                                                                        step={1}
                                                                        graduated
                                                                        progress
                                                                        renderMark={mark => {
                                                                          if (mark % 20 === 0) {
                                                                            return mark;
                                                                          }
                                                                        }}
                                                                        handleTitle="Minutes"/>
                                                                </Col>
                                                            </Row>

                                                        </Col>
                                                    </Row>
                                                  <Row>
                                                    <Col md={12}>
                                                      <div className="adj-intersec text-center">TO</div>
                                                    </Col>
                                                  </Row>
                                                </Col>

                                                <Col>
                                                    <Row>
                                                      <Col md={1} className="adj-am-fm">

                                                        <div style={{marginRight:"50px",width:"100%",textAlign:"center",color:"black",fontWeight:"bold"}}>T4</div>

                                                      </Col>
                                                        <Col  md={11}>
                                                            <Row>

                                                                <Col>
                                                                    <Slider
                                                                      onChange={
                                                                        (value)=>
                                                                          timeEndHoursIntevTwo(value)
                                                                      }
                                                                        defaultValue={5}
                                                                        min={1}
                                                                        max={24}
                                                                        step={1}
                                                                        graduated
                                                                        progress
                                                                        renderMark={mark => {
                                                                          if (mark % 8 === 0) {
                                                                            return mark;
                                                                          }
                                                                        }}
                                                                        handleTitle="Hours"/>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col>
                                                                    <Slider
                                                                      onChange={
                                                                        (value)=>
                                                                          timeEndMintsIntevTwo(value)
                                                                      }
                                                                        defaultValue={5}
                                                                        className="handleMinutes"
                                                                        min={1}
                                                                        max={60}
                                                                        step={1}
                                                                        graduated
                                                                        progress
                                                                        renderMark={mark => {
                                                                          if (mark % 20 === 0) {
                                                                            return mark;
                                                                          }
                                                                        }}
                                                                        handleTitle="Minutes"/>
                                                                </Col>
                                                            </Row>

                                                        </Col>

                                                        <Col md={2} className="adj-am-fm">
                                                            {/*<Row>*/}
                                                            {/*    <Col>*/}
                                                            {/*        /!*<Checkbox defaultChecked> AM</Checkbox>*!/*/}
                                                            {/*    </Col>*/}
                                                            {/*    <Col>*/}
                                                            {/*        /!*<Checkbox defaultChecked> PM</Checkbox>*!/*/}
                                                            {/*    </Col>*/}

                                                            {/*</Row>*/}

                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Col>


                                    </Row>

                                    {/**/}
                                    {/*<Row>*/}
                                    {/*    <Col>*/}
                                    {/*        <Row>*/}
                                    {/*            <Col>*/}
                                    {/*                <hr/>*/}
                                    {/*                <div className="adj_top_separat text-center">*/}
                                    {/*                    Wednesday*/}
                                    {/*                </div>*/}
                                    {/*            </Col>*/}
                                    {/*        </Row>*/}
                                    {/*        <Row className="adj-bgd-co-rge">*/}
                                    {/*            <Col>*/}

                                    {/*                <Row>*/}
                                    {/*                    <Col md={2} className="adj-am-fm">*/}
                                    {/*                        /!*<Row>*!/*/}
                                    {/*                        /!*    <Col>*!/*/}
                                    {/*                        /!*        /!*<Checkbox defaultChecked> AM</Checkbox>*!/*!/*/}
                                    {/*                        /!*    </Col>*!/*/}
                                    {/*                        /!*    <Col>*!/*/}
                                    {/*                        /!*        /!*<Checkbox defaultChecked> PM</Checkbox>*!/*!/*/}
                                    {/*                        /!*    </Col>*!/*/}

                                    {/*                        /!*</Row>*!/*/}

                                    {/*                    </Col>*/}
                                    {/*                    <Col>*/}

                                    {/*                      <Row>*/}
                                    {/*                        <Col>*/}
                                    {/*                          <Slider*/}
                                    {/*                            defaultValue={5}*/}
                                    {/*                            min={1}*/}
                                    {/*                            max={24}*/}
                                    {/*                            step={1}*/}
                                    {/*                            graduated*/}
                                    {/*                            progress*/}
                                    {/*                            renderMark={mark => {*/}
                                    {/*                              if (mark % 8 === 0) {*/}
                                    {/*                                return mark;*/}
                                    {/*                              }*/}
                                    {/*                            }}*/}
                                    {/*                            handleTitle="Hours"/>*/}
                                    {/*                        </Col>*/}
                                    {/*                      </Row>*/}
                                    {/*                      <Row>*/}
                                    {/*                        <Col>*/}
                                    {/*                          <Slider*/}
                                    {/*                            defaultValue={5}*/}
                                    {/*                            className="handleMinutes"*/}
                                    {/*                            min={1}*/}
                                    {/*                            max={60}*/}
                                    {/*                            step={1}*/}
                                    {/*                            graduated*/}
                                    {/*                            progress*/}
                                    {/*                            renderMark={mark => {*/}
                                    {/*                              if (mark % 20 === 0) {*/}
                                    {/*                                return mark;*/}
                                    {/*                              }*/}
                                    {/*                            }}*/}
                                    {/*                            handleTitle="Minutes"/>*/}
                                    {/*                        </Col>*/}
                                    {/*                      </Row>*/}

                                    {/*                    </Col>*/}
                                    {/*                </Row>*/}
                                    {/*              <Row>*/}
                                    {/*                <Col md={12}>*/}
                                    {/*                  <div className="adj-intersec text-center">TO</div>*/}
                                    {/*                </Col>*/}
                                    {/*              </Row>*/}
                                    {/*            </Col>*/}

                                    {/*            <Col>*/}
                                    {/*                <Row>*/}
                                    {/*                    <Col>*/}
                                    {/*                      <Row>*/}
                                    {/*                        <Col>*/}
                                    {/*                          <Slider*/}
                                    {/*                            defaultValue={5}*/}
                                    {/*                            min={1}*/}
                                    {/*                            max={24}*/}
                                    {/*                            step={1}*/}
                                    {/*                            graduated*/}
                                    {/*                            progress*/}
                                    {/*                            renderMark={mark => {*/}
                                    {/*                              if (mark % 8 === 0) {*/}
                                    {/*                                return mark;*/}
                                    {/*                              }*/}
                                    {/*                            }}*/}
                                    {/*                            handleTitle="Hours"/>*/}
                                    {/*                        </Col>*/}
                                    {/*                      </Row>*/}
                                    {/*                      <Row>*/}
                                    {/*                        <Col>*/}
                                    {/*                          <Slider*/}
                                    {/*                            defaultValue={5}*/}
                                    {/*                            className="handleMinutes"*/}
                                    {/*                            min={1}*/}
                                    {/*                            max={60}*/}
                                    {/*                            step={1}*/}
                                    {/*                            graduated*/}
                                    {/*                            progress*/}
                                    {/*                            renderMark={mark => {*/}
                                    {/*                              if (mark % 20 === 0) {*/}
                                    {/*                                return mark;*/}
                                    {/*                              }*/}
                                    {/*                            }}*/}
                                    {/*                            handleTitle="Minutes"/>*/}
                                    {/*                        </Col>*/}
                                    {/*                      </Row>*/}

                                    {/*                    </Col>*/}

                                    {/*                    <Col md={2} className="adj-am-fm">*/}
                                    {/*                        /!*<Row>*!/*/}
                                    {/*                        /!*    <Col>*!/*/}
                                    {/*                        /!*        /!*<Checkbox defaultChecked> AM</Checkbox>*!/*!/*/}
                                    {/*                        /!*    </Col>*!/*/}
                                    {/*                        /!*    <Col>*!/*/}
                                    {/*                        /!*        /!*<Checkbox defaultChecked> PM</Checkbox>*!/*!/*/}
                                    {/*                        /!*    </Col>*!/*/}

                                    {/*                        /!*</Row>*!/*/}

                                    {/*                    </Col>*/}
                                    {/*                </Row>*/}
                                    {/*            </Col>*/}
                                    {/*        </Row>*/}
                                    {/*    </Col>*/}


                                    {/*</Row>*/}

                                    {/**/}
                                    {/*<Row>*/}
                                    {/*    <Col>*/}
                                    {/*        <Row>*/}
                                    {/*            <Col>*/}
                                    {/*                <hr/>*/}
                                    {/*                <div className="adj_top_separat text-center">*/}
                                    {/*                    Thursday*/}
                                    {/*                </div>*/}
                                    {/*            </Col>*/}
                                    {/*        </Row>*/}
                                    {/*        <Row className="adj-bgd-co-rge">*/}
                                    {/*            <Col>*/}

                                    {/*                <Row>*/}
                                    {/*                    <Col md={2} className="adj-am-fm">*/}
                                    {/*                        /!*<Row>*!/*/}
                                    {/*                        /!*    <Col>*!/*/}
                                    {/*                        /!*        /!*<Checkbox defaultChecked> AM</Checkbox>*!/*!/*/}
                                    {/*                        /!*    </Col>*!/*/}
                                    {/*                        /!*    <Col>*!/*/}
                                    {/*                        /!*        /!*<Checkbox defaultChecked> PM</Checkbox>*!/*!/*/}
                                    {/*                        /!*    </Col>*!/*/}

                                    {/*                        /!*</Row>*!/*/}

                                    {/*                    </Col>*/}
                                    {/*                    <Col>*/}

                                    {/*                      <Row>*/}
                                    {/*                        <Col>*/}
                                    {/*                          <Slider*/}
                                    {/*                            defaultValue={5}*/}
                                    {/*                            min={1}*/}
                                    {/*                            max={24}*/}
                                    {/*                            step={1}*/}
                                    {/*                            graduated*/}
                                    {/*                            progress*/}
                                    {/*                            renderMark={mark => {*/}
                                    {/*                              if (mark % 8 === 0) {*/}
                                    {/*                                return mark;*/}
                                    {/*                              }*/}
                                    {/*                            }}*/}
                                    {/*                            handleTitle="Hours"/>*/}
                                    {/*                        </Col>*/}
                                    {/*                      </Row>*/}
                                    {/*                      <Row>*/}
                                    {/*                        <Col>*/}
                                    {/*                          <Slider*/}
                                    {/*                            defaultValue={5}*/}
                                    {/*                            className="handleMinutes"*/}
                                    {/*                            min={1}*/}
                                    {/*                            max={60}*/}
                                    {/*                            step={1}*/}
                                    {/*                            graduated*/}
                                    {/*                            progress*/}
                                    {/*                            renderMark={mark => {*/}
                                    {/*                              if (mark % 20 === 0) {*/}
                                    {/*                                return mark;*/}
                                    {/*                              }*/}
                                    {/*                            }}*/}
                                    {/*                            handleTitle="Minutes"/>*/}
                                    {/*                        </Col>*/}
                                    {/*                      </Row>*/}

                                    {/*                    </Col>*/}
                                    {/*                </Row>*/}
                                    {/*              <Row>*/}
                                    {/*                <Col md={12}>*/}
                                    {/*                  <div className="adj-intersec text-center">TO</div>*/}
                                    {/*                </Col>*/}
                                    {/*              </Row>*/}
                                    {/*            </Col>*/}

                                    {/*            <Col>*/}
                                    {/*                <Row>*/}
                                    {/*                    <Col>*/}
                                    {/*                      <Row>*/}
                                    {/*                        <Col>*/}
                                    {/*                          <Slider*/}
                                    {/*                            defaultValue={5}*/}
                                    {/*                            min={1}*/}
                                    {/*                            max={24}*/}
                                    {/*                            step={1}*/}
                                    {/*                            graduated*/}
                                    {/*                            progress*/}
                                    {/*                            renderMark={mark => {*/}
                                    {/*                              if (mark % 8 === 0) {*/}
                                    {/*                                return mark;*/}
                                    {/*                              }*/}
                                    {/*                            }}*/}
                                    {/*                            handleTitle="Hours"/>*/}
                                    {/*                        </Col>*/}
                                    {/*                      </Row>*/}
                                    {/*                      <Row>*/}
                                    {/*                        <Col>*/}
                                    {/*                          <Slider*/}
                                    {/*                            defaultValue={5}*/}
                                    {/*                            className="handleMinutes"*/}
                                    {/*                            min={1}*/}
                                    {/*                            max={60}*/}
                                    {/*                            step={1}*/}
                                    {/*                            graduated*/}
                                    {/*                            progress*/}
                                    {/*                            renderMark={mark => {*/}
                                    {/*                              if (mark % 20 === 0) {*/}
                                    {/*                                return mark;*/}
                                    {/*                              }*/}
                                    {/*                            }}*/}
                                    {/*                            handleTitle="Minutes"/>*/}
                                    {/*                        </Col>*/}
                                    {/*                      </Row>*/}

                                    {/*                    </Col>*/}

                                    {/*                    <Col md={2} className="adj-am-fm">*/}
                                    {/*                        /!*<Row>*!/*/}
                                    {/*                        /!*    <Col>*!/*/}
                                    {/*                        /!*        /!*<Checkbox defaultChecked> AM</Checkbox>*!/*!/*/}
                                    {/*                        /!*    </Col>*!/*/}
                                    {/*                        /!*    <Col>*!/*/}
                                    {/*                        /!*        /!*<Checkbox defaultChecked> PM</Checkbox>*!/*!/*/}
                                    {/*                        /!*    </Col>*!/*/}

                                    {/*                        /!*</Row>*!/*/}

                                    {/*                    </Col>*/}
                                    {/*                </Row>*/}
                                    {/*            </Col>*/}
                                    {/*        </Row>*/}
                                    {/*    </Col>*/}


                                    {/*</Row>*/}
                                    {/**/}
                                    {/*<Row>*/}
                                    {/*    <Col>*/}
                                    {/*        <Row>*/}
                                    {/*            <Col>*/}
                                    {/*                <hr/>*/}
                                    {/*                <div className=" adj_top_separat text-center">*/}
                                    {/*                    Friday*/}
                                    {/*                </div>*/}
                                    {/*            </Col>*/}
                                    {/*        </Row>*/}
                                    {/*        <Row className="adj-bgd-co-rge">*/}
                                    {/*            <Col>*/}

                                    {/*                <Row>*/}
                                    {/*                    <Col md={2} className="adj-am-fm">*/}
                                    {/*                        /!*<Row>*!/*/}
                                    {/*                        /!*    <Col>*!/*/}
                                    {/*                        /!*        /!*<Checkbox defaultChecked> AM</Checkbox>*!/*!/*/}
                                    {/*                        /!*    </Col>*!/*/}
                                    {/*                        /!*    <Col>*!/*/}
                                    {/*                        /!*        /!*<Checkbox defaultChecked> PM</Checkbox>*!/*!/*/}
                                    {/*                        /!*    </Col>*!/*/}

                                    {/*                        /!*</Row>*!/*/}

                                    {/*                    </Col>*/}
                                    {/*                    <Col>*/}

                                    {/*                      <Row>*/}
                                    {/*                        <Col>*/}
                                    {/*                          <Slider*/}
                                    {/*                            defaultValue={5}*/}
                                    {/*                            min={1}*/}
                                    {/*                            max={24}*/}
                                    {/*                            step={1}*/}
                                    {/*                            graduated*/}
                                    {/*                            progress*/}
                                    {/*                            renderMark={mark => {*/}
                                    {/*                              if (mark % 8 === 0) {*/}
                                    {/*                                return mark;*/}
                                    {/*                              }*/}
                                    {/*                            }}*/}
                                    {/*                            handleTitle="Hours"/>*/}
                                    {/*                        </Col>*/}
                                    {/*                      </Row>*/}
                                    {/*                      <Row>*/}
                                    {/*                        <Col>*/}
                                    {/*                          <Slider*/}
                                    {/*                            defaultValue={5}*/}
                                    {/*                            className="handleMinutes"*/}
                                    {/*                            min={1}*/}
                                    {/*                            max={60}*/}
                                    {/*                            step={1}*/}
                                    {/*                            graduated*/}
                                    {/*                            progress*/}
                                    {/*                            renderMark={mark => {*/}
                                    {/*                              if (mark % 20 === 0) {*/}
                                    {/*                                return mark;*/}
                                    {/*                              }*/}
                                    {/*                            }}*/}
                                    {/*                            handleTitle="Minutes"/>*/}
                                    {/*                        </Col>*/}
                                    {/*                      </Row>*/}

                                    {/*                    </Col>*/}
                                    {/*                </Row>*/}
                                    {/*              <Row>*/}
                                    {/*                <Col md={12}>*/}
                                    {/*                  <div className="adj-intersec text-center">TO</div>*/}
                                    {/*                </Col>*/}
                                    {/*              </Row>*/}
                                    {/*            </Col>*/}

                                    {/*            <Col>*/}
                                    {/*                <Row>*/}
                                    {/*                    <Col>*/}
                                    {/*                      <Row>*/}
                                    {/*                        <Col>*/}
                                    {/*                          <Slider*/}
                                    {/*                            defaultValue={5}*/}
                                    {/*                            min={1}*/}
                                    {/*                            max={24}*/}
                                    {/*                            step={1}*/}
                                    {/*                            graduated*/}
                                    {/*                            progress*/}
                                    {/*                            renderMark={mark => {*/}
                                    {/*                              if (mark % 8 === 0) {*/}
                                    {/*                                return mark;*/}
                                    {/*                              }*/}
                                    {/*                            }}*/}
                                    {/*                            handleTitle="Hours"/>*/}
                                    {/*                        </Col>*/}
                                    {/*                      </Row>*/}
                                    {/*                      <Row>*/}
                                    {/*                        <Col>*/}
                                    {/*                          <Slider*/}
                                    {/*                            defaultValue={5}*/}
                                    {/*                            className="handleMinutes"*/}
                                    {/*                            min={1}*/}
                                    {/*                            max={60}*/}
                                    {/*                            step={1}*/}
                                    {/*                            graduated*/}
                                    {/*                            progress*/}
                                    {/*                            renderMark={mark => {*/}
                                    {/*                              if (mark % 20 === 0) {*/}
                                    {/*                                return mark;*/}
                                    {/*                              }*/}
                                    {/*                            }}*/}
                                    {/*                            handleTitle="Minutes"/>*/}
                                    {/*                        </Col>*/}
                                    {/*                      </Row>*/}

                                    {/*                    </Col>*/}

                                    {/*                    <Col md={2} className="adj-am-fm">*/}
                                    {/*                        /!*<Row>*!/*/}
                                    {/*                        /!*    <Col>*!/*/}
                                    {/*                        /!*        /!*<Checkbox defaultChecked> AM</Checkbox>*!/*!/*/}
                                    {/*                        /!*    </Col>*!/*/}
                                    {/*                        /!*    <Col>*!/*/}
                                    {/*                        /!*        /!*<Checkbox defaultChecked> PM</Checkbox>*!/*!/*/}
                                    {/*                        /!*    </Col>*!/*/}

                                    {/*                        /!*</Row>*!/*/}

                                    {/*                    </Col>*/}
                                    {/*                </Row>*/}
                                    {/*            </Col>*/}
                                    {/*        </Row>*/}
                                    {/*    </Col>*/}


                                    {/*</Row>*/}
                                    {/**/}
                                    {/*<Row>*/}
                                    {/*    <Col>*/}
                                    {/*        <Row>*/}
                                    {/*            <Col>*/}
                                    {/*                <hr/>*/}
                                    {/*                <div className=" adj_top_separat text-center">*/}
                                    {/*                    Saturday*/}
                                    {/*                </div>*/}
                                    {/*            </Col>*/}
                                    {/*        </Row>*/}
                                    {/*        <Row className="adj-bgd-co-rge">*/}
                                    {/*            <Col>*/}

                                    {/*                <Row>*/}
                                    {/*                    <Col md={2} className="adj-am-fm">*/}
                                    {/*                        /!*<Row>*!/*/}
                                    {/*                        /!*    <Col>*!/*/}
                                    {/*                        /!*        /!*<Checkbox defaultChecked> AM</Checkbox>*!/*!/*/}
                                    {/*                        /!*    </Col>*!/*/}
                                    {/*                        /!*    <Col>*!/*/}
                                    {/*                        /!*        /!*<Checkbox defaultChecked> PM</Checkbox>*!/*!/*/}
                                    {/*                        /!*    </Col>*!/*/}

                                    {/*                        /!*</Row>*!/*/}

                                    {/*                    </Col>*/}
                                    {/*                    <Col>*/}

                                    {/*                      <Row>*/}
                                    {/*                        <Col>*/}
                                    {/*                          <Slider*/}
                                    {/*                            defaultValue={5}*/}
                                    {/*                            min={1}*/}
                                    {/*                            max={24}*/}
                                    {/*                            step={1}*/}
                                    {/*                            graduated*/}
                                    {/*                            progress*/}
                                    {/*                            renderMark={mark => {*/}
                                    {/*                              if (mark % 8 === 0) {*/}
                                    {/*                                return mark;*/}
                                    {/*                              }*/}
                                    {/*                            }}*/}
                                    {/*                            handleTitle="Hours"/>*/}
                                    {/*                        </Col>*/}
                                    {/*                      </Row>*/}
                                    {/*                      <Row>*/}
                                    {/*                        <Col>*/}
                                    {/*                          <Slider*/}
                                    {/*                            defaultValue={5}*/}
                                    {/*                            className="handleMinutes"*/}
                                    {/*                            min={1}*/}
                                    {/*                            max={60}*/}
                                    {/*                            step={1}*/}
                                    {/*                            graduated*/}
                                    {/*                            progress*/}
                                    {/*                            renderMark={mark => {*/}
                                    {/*                              if (mark % 20 === 0) {*/}
                                    {/*                                return mark;*/}
                                    {/*                              }*/}
                                    {/*                            }}*/}
                                    {/*                            handleTitle="Minutes"/>*/}
                                    {/*                        </Col>*/}
                                    {/*                      </Row>*/}
                                    {/*                    </Col>*/}
                                    {/*                </Row>*/}
                                    {/*              <Row>*/}
                                    {/*                <Col md={12}>*/}
                                    {/*                  <div className="adj-intersec text-center">TO</div>*/}
                                    {/*                </Col>*/}
                                    {/*              </Row>*/}
                                    {/*            </Col>*/}

                                    {/*            <Col>*/}
                                    {/*                <Row>*/}
                                    {/*                    <Col>*/}
                                    {/*                      <Row>*/}
                                    {/*                        <Col>*/}
                                    {/*                          <Slider*/}
                                    {/*                            defaultValue={5}*/}
                                    {/*                            min={1}*/}
                                    {/*                            max={24}*/}
                                    {/*                            step={1}*/}
                                    {/*                            graduated*/}
                                    {/*                            progress*/}
                                    {/*                            renderMark={mark => {*/}
                                    {/*                              if (mark % 8 === 0) {*/}
                                    {/*                                return mark;*/}
                                    {/*                              }*/}
                                    {/*                            }}*/}
                                    {/*                            handleTitle="Hours"/>*/}
                                    {/*                        </Col>*/}
                                    {/*                      </Row>*/}
                                    {/*                      <Row>*/}
                                    {/*                        <Col>*/}
                                    {/*                          <Slider*/}
                                    {/*                            defaultValue={5}*/}
                                    {/*                            className="handleMinutes"*/}
                                    {/*                            min={1}*/}
                                    {/*                            max={60}*/}
                                    {/*                            step={1}*/}
                                    {/*                            graduated*/}
                                    {/*                            progress*/}
                                    {/*                            renderMark={mark => {*/}
                                    {/*                              if (mark % 20 === 0) {*/}
                                    {/*                                return mark;*/}
                                    {/*                              }*/}
                                    {/*                            }}*/}
                                    {/*                            handleTitle="Minutes"/>*/}
                                    {/*                        </Col>*/}
                                    {/*                      </Row>*/}

                                    {/*                    </Col>*/}

                                    {/*                    <Col md={2} className="adj-am-fm">*/}
                                    {/*                        /!*<Row>*!/*/}
                                    {/*                        /!*    <Col>*!/*/}
                                    {/*                        /!*        /!*<Checkbox defaultChecked> AM</Checkbox>*!/*!/*/}
                                    {/*                        /!*    </Col>*!/*/}
                                    {/*                        /!*    <Col>*!/*/}
                                    {/*                        /!*        /!*<Checkbox defaultChecked> PM</Checkbox>*!/*!/*/}
                                    {/*                        /!*    </Col>*!/*/}

                                    {/*                        /!*</Row>*!/*/}

                                    {/*                    </Col>*/}
                                    {/*                </Row>*/}
                                    {/*            </Col>*/}
                                    {/*        </Row>*/}
                                    {/*    </Col>*/}


                                    {/*</Row>*/}
                                    {/**/}
                                    {/*<Row>*/}
                                    {/*    <Col>*/}
                                    {/*        <Row>*/}
                                    {/*            <Col>*/}
                                    {/*                <hr/>*/}
                                    {/*                <div className=" adj_top_separat text-center">*/}
                                    {/*                    Sunday*/}
                                    {/*                </div>*/}
                                    {/*            </Col>*/}
                                    {/*        </Row>*/}
                                    {/*        <Row className="adj-bgd-co-rge">*/}
                                    {/*            <Col>*/}

                                    {/*                <Row>*/}
                                    {/*                    <Col md={2} className="adj-am-fm">*/}
                                    {/*                        /!*<Row>*!/*/}
                                    {/*                        /!*    <Col>*!/*/}
                                    {/*                        /!*        /!*<Checkbox defaultChecked> AM</Checkbox>*!/*!/*/}
                                    {/*                        /!*    </Col>*!/*/}
                                    {/*                        /!*    <Col>*!/*/}
                                    {/*                        /!*        /!*<Checkbox defaultChecked> PM</Checkbox>*!/*!/*/}
                                    {/*                        /!*    </Col>*!/*/}

                                    {/*                        /!*</Row>*!/*/}

                                    {/*                    </Col>*/}
                                    {/*                    <Col>*/}
                                    {/*                      <Row>*/}
                                    {/*                        <Col>*/}
                                    {/*                          <Slider*/}
                                    {/*                            defaultValue={5}*/}
                                    {/*                            min={1}*/}
                                    {/*                            max={24}*/}
                                    {/*                            step={1}*/}
                                    {/*                            graduated*/}
                                    {/*                            progress*/}
                                    {/*                            renderMark={mark => {*/}
                                    {/*                              if (mark % 8 === 0) {*/}
                                    {/*                                return mark;*/}
                                    {/*                              }*/}
                                    {/*                            }}*/}
                                    {/*                            handleTitle="Hours"/>*/}
                                    {/*                        </Col>*/}
                                    {/*                      </Row>*/}
                                    {/*                      <Row>*/}
                                    {/*                        <Col>*/}
                                    {/*                          <Slider*/}
                                    {/*                            defaultValue={5}*/}
                                    {/*                            className="handleMinutes"*/}
                                    {/*                            min={1}*/}
                                    {/*                            max={60}*/}
                                    {/*                            step={1}*/}
                                    {/*                            graduated*/}
                                    {/*                            progress*/}
                                    {/*                            renderMark={mark => {*/}
                                    {/*                              if (mark % 20 === 0) {*/}
                                    {/*                                return mark;*/}
                                    {/*                              }*/}
                                    {/*                            }}*/}
                                    {/*                            handleTitle="Minutes"/>*/}
                                    {/*                        </Col>*/}
                                    {/*                      </Row>*/}

                                    {/*                    </Col>*/}
                                    {/*                </Row>*/}
                                    {/*              <Row>*/}
                                    {/*                <Col md={12}>*/}
                                    {/*                  <div className="adj-intersec text-center">TO</div>*/}
                                    {/*                </Col>*/}
                                    {/*              </Row>*/}
                                    {/*            </Col>*/}

                                    {/*            <Col>*/}
                                    {/*                <Row>*/}
                                    {/*                    <Col>*/}
                                    {/*                      <Row>*/}
                                    {/*                        <Col>*/}
                                    {/*                          <Slider*/}
                                    {/*                            defaultValue={5}*/}
                                    {/*                            min={1}*/}
                                    {/*                            max={24}*/}
                                    {/*                            step={1}*/}
                                    {/*                            graduated*/}
                                    {/*                            progress*/}
                                    {/*                            renderMark={mark => {*/}
                                    {/*                              if (mark % 8 === 0) {*/}
                                    {/*                                return mark;*/}
                                    {/*                              }*/}
                                    {/*                            }}*/}
                                    {/*                            handleTitle="Hours"/>*/}
                                    {/*                        </Col>*/}
                                    {/*                      </Row>*/}
                                    {/*                      <Row>*/}
                                    {/*                        <Col>*/}
                                    {/*                          <Slider*/}
                                    {/*                            defaultValue={5}*/}
                                    {/*                            className="handleMinutes"*/}
                                    {/*                            min={1}*/}
                                    {/*                            max={60}*/}
                                    {/*                            step={1}*/}
                                    {/*                            graduated*/}
                                    {/*                            progress*/}
                                    {/*                            renderMark={mark => {*/}
                                    {/*                              if (mark % 20 === 0) {*/}
                                    {/*                                return mark;*/}
                                    {/*                              }*/}
                                    {/*                            }}*/}
                                    {/*                            handleTitle="Minutes"/>*/}
                                    {/*                        </Col>*/}
                                    {/*                      </Row>*/}
                                    {/*                    </Col>*/}

                                    {/*                    <Col md={2} className="adj-am-fm">*/}
                                    {/*                        /!*<Row>*!/*/}
                                    {/*                        /!*    <Col>*!/*/}
                                    {/*                        /!*        /!*<Checkbox defaultChecked> AM</Checkbox>*!/*!/*/}
                                    {/*                        /!*    </Col>*!/*/}
                                    {/*                        /!*    <Col>*!/*/}
                                    {/*                        /!*        /!*<Checkbox defaultChecked> PM</Checkbox>*!/*!/*/}
                                    {/*                        /!*    </Col>*!/*/}

                                    {/*                        /!*</Row>*!/*/}

                                    {/*                    </Col>*/}
                                    {/*                </Row>*/}
                                    {/*            </Col>*/}
                                    {/*        </Row>*/}
                                    {/*    </Col>*/}


                                    {/*</Row>*/}
                                    {/**/}
                                    <Row>

                                        <Col md={4}>
                                            <Row style={{marginTop: "77%"}}>
                                                <Col md={2}>
                                                    <div className="adj-sync">
                                                        <FontAwesomeIcon icon={faSync}></FontAwesomeIcon>

                                                    </div>
                                                </Col>
                                                <Col md={2} className="text-center">
                                                    <FontAwesomeIcon icon={faLongArrowAltRight}></FontAwesomeIcon>

                                                </Col>
                                                <Col md={8}>
                                                    <div>Recurring</div>
                                                </Col>

                                            </Row>

                                        </Col>

                                        <Col md={4}>
                                            <Row>
                                                <Col >
                                                    <Row>
                                                        <Col>
                                                            <div style={{marginTop: "43%"}}>
                                                                <Checkbox defaultChecked> Monthly</Checkbox>
                                                            </div>

                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            <Checkbox defaultChecked> Daily</Checkbox>

                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col sm={1}>
                                                    <Row>
                                                        <Col>
                                                            <Row>
                                                                <Col sm>
                                                                    <Checkbox defaultChecked></Checkbox>

                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col sm>
                                                                    Mon
                                                                </Col>
                                                            </Row>

                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col sm={1}>
                                                    <Row>
                                                        <Col>
                                                            <Row>
                                                                <Col sm>
                                                                    <Checkbox defaultChecked></Checkbox>

                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col>
                                                                    Tue
                                                                </Col>
                                                            </Row>

                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col sm={1}>
                                                    <Row>
                                                        <Col>
                                                            <Row>
                                                                <Col sm>
                                                                    <Checkbox defaultChecked></Checkbox>

                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col sm>
                                                                    Wed
                                                                </Col>
                                                            </Row>

                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col sm={1}>
                                                    <Row>
                                                        <Col>
                                                            <Row>
                                                                <Col sm>
                                                                    <Checkbox defaultChecked></Checkbox>

                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col sm>
                                                                    Thur
                                                                </Col>
                                                            </Row>

                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col sm={1}>
                                                    <Row>
                                                        <Col>
                                                            <Row>
                                                                <Col sm>
                                                                    <Checkbox defaultChecked></Checkbox>

                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col sm>
                                                                    Fri
                                                                </Col>
                                                            </Row>

                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col sm={1}>
                                                    <Row>
                                                        <Col>
                                                            <Row>
                                                                <Col sm>
                                                                    <Checkbox defaultChecked></Checkbox>

                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col sm>
                                                                    Sat
                                                                </Col>
                                                            </Row>

                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col sm={1}>
                                                    <Row>
                                                        <Col>
                                                            <Row>
                                                                <Col sm>
                                                                    <Checkbox defaultChecked></Checkbox>

                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col sm>
                                                                    Sun
                                                                </Col>
                                                            </Row>

                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
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
                                    {/*<Link to="/time-line">*/}
                                    <Button onClick={()=>handleSubmitChanges()} className="adj-confirm-edit">
                                        Confirm Changes
                                    </Button>
                                    {/*</Link>*/}
                                </Col>
                            </Row>

                        </div>

                    </Col>
                </Row>
            </Container>
        );
}

const mapStateToProps = (state) => ({
  taskID: state.createTaskDetails.tasksCount,
  myState: state,
  tasks:state.task
});
const mapDispatchToProps = dispatch => {
  return {

    createTask: (task) => dispatch(createTask(task)),

    saveStateToServer: (newState) => dispatch(saveStateToServer(newState)),
    taskObjectHasBeenInitiated:()=>dispatch(taskObjectHasBeenInitiated()),
    newTaskHasBeenAdded:()=>dispatch(newTaskHasBeenAdded()),
    updateState: (newState) => dispatch(updateState(newState)),
    deleteTask: (taskId) => dispatch(deleteTask(taskId)),
    set_time_intervals:(intervObj) => dispatch(set_time_intervals(intervObj))


  } //note the dispatch call
}
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(TimeRange));

