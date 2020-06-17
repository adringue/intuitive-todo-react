
import React from 'react';
import "./controller.scss";
import {Container, Col, Row} from "react-bootstrap";
import {Slider, RangeSlider, Checkbox, DatePicker, Calendar} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {faTimesCircle} from "@fortawesome/free-regular-svg-icons";
// import {faSync} from "@fortawesome/free-solid-svg-icons/faSync";
// import {faArrowAltCircleRight} from "@fortawesome/free-solid-svg-icons/faArrowAltCircleRight";
// import {faLongArrowAltRight} from "@fortawesome/free-solid-svg-icons";

const SelectTimeEnd=(props)=>{

    return(
        <Container>
            <Row className="adj-bgd-co">

                <Col>
                    <Row>
                        <Col>
                            <Row>
                                <Col>
                                    <Slider
                                        onChange={(value) => props.sendTimeEndHours(value)}
                                        handleClassName="adj-handle"
                                        min={1}
                                        max={24}
                                        step={1}
                                        defaultValue={props.defaultTimeEndHours}
                                        graduated
                                        progress
                                        renderMark={mark => {
                                            if (mark % 8 === 0) {
                                                return mark;
                                            }
                                        }}
                                        handleTitle="Hrs"/>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Slider
                                        onChange={(value) => props.sendTimeEndMins(value)}
                                        className="handleMinutes"
                                        min={1}
                                        max={60}
                                        step={1}
                                        defaultValue={props.defaultTimeEndtMins}
                                        graduated
                                        progress
                                        renderMark={mark => {
                                            if (mark % 20 === 0) {
                                                return mark;
                                            }
                                        }}
                                        handleTitle="Min"/>
                                </Col>
                            </Row>

                        </Col>
                    </Row>
                     <Row>
                        <Col>
                            <div style={{marginTop:"12px"}}>

                            <Row>
                                <Col>
                                    {/*<Checkbox onChange={(value,checked,event)=>{props.sendTimeEndAM(checked)}} defaultChecked> AM</Checkbox>*/}
                                </Col>
                                <Col>
                                    {/*<Checkbox onChange={(value,checked,event)=>{props.sendTimeEndPM(checked)}} defaultChecked> PM</Checkbox>*/}
                                </Col>

                            </Row>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default SelectTimeEnd;
