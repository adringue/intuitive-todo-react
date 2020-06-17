
import React, {useState} from 'react';
import "./controller.scss";
import {Container, Col, Row} from "react-bootstrap";
import {Slider, RangeSlider, Checkbox, DatePicker, Calendar} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {faTimesCircle} from "@fortawesome/free-regular-svg-icons";
// import {faSync} from "@fortawesome/free-solid-svg-icons/faSync";
// import {faArrowAltCircleRight} from "@fortawesome/free-solid-svg-icons/faArrowAltCircleRight";
// import {faLongArrowAltRight} from "@fortawesome/free-solid-svg-icons";

const SelectTime=(props)=>{



    return(
        <Container>
            <Row className="adj-bgd-co">
                <Col>

                    <Row>

                        <Col>

                            <Row>
                                <Col>
                                    <Slider
                                       onChange={(value) => props.sendTimeStartHours(value)}
                                        min={1}
                                        max={24}
                                        step={1}
                                        graduated
                                        progress
                                       defaultValue={props.defaultTimeStartHours}
                                        renderMark={mark => {
                                            if (mark % 8 === 0) {
                                                return mark;
                                            }
                                        }}
                                        handleTitle="Hrs"
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Slider
                                        onChange={(value) => props.sendTimeStartMins(value)}
                                        className="handleMinutes"
                                        min={1}
                                        max={60}
                                        step={1}
                                        graduated
                                        defaultValue={props.defaultTimeStartMins}
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
                                        {/*<Checkbox onChange={(value,checked,event)=>{props.sendTimeStartAM(checked)}} defaultChecked> AM</Checkbox>*/}
                                    </Col>
                                    <Col>
                                        {/*<Checkbox onChange={(value,checked,event)=>{props.sendTimeStartPM(checked)}} defaultChecked> PM</Checkbox>*/}
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

export default SelectTime;
