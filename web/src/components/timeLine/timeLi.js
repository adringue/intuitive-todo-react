import React, {useEffect, useReducer, useState} from "react";
import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader,
  TimelineMarkers,
  CustomMarker,
  TodayMarker,
  CursorMarker
} from "react-calendar-timeline/lib";
import 'react-calendar-timeline/lib/Timeline.css';
import moment from 'moment';
import "./timeLi.scss";
import {Container, Col, Row} from "react-bootstrap";
import EditTask from "../edit-task/EditTask";
import {Link, useHistory, withRouter} from "react-router-dom";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLongArrowAltRight} from "@fortawesome/free-solid-svg-icons";
import {faCalendar} from "@fortawesome/free-regular-svg-icons";
import {connect} from "react-redux";
import {
  createTask,
  deleteTask,
  deleteTaskServer, newTaskHasBeenAdded,
  saveStateToServer,
  setCurrentTaskToEdit, taskObjectHasBeenInitiated,
  updateState
} from "../../redux";
import {black} from "color-name";
import {Calendar, Checkbox, Slider} from "rsuite";
import {faSync} from "@fortawesome/free-solid-svg-icons/faSync";
import Table from "react-bootstrap/Table";


const TimeLin = props => {
  const history = useHistory();

  const [item, setItem] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [groups, setGroups] = useState([{id: 2, title: "group1"}]);
  const [defaultTimeStart, setDefaultTimeStart] = useState(moment().add(-12, 'hour')
  );
  const [defaultTimeEnd, setDefaultTimeEnd] = useState(moment().add(12, 'hour')
  );
  const [draggedItem, setDragged] = useState(
    null
  );
  const [displayEdit, setDisplayEdit] = useState(
    false
  );

  ///////////
  const dateString = 'Tue April 14 2020 15:34:23 GMT+0300 (FLE Daylight Time)';
  const dateString2 = 'Sa Apr 11 2020 12:00:34 GMT-0700 (Pacific Daylight Time)';
  const g = moment('Sa Apr 11 2020 09:00:34 GMT-0700 (Pacific Daylight Time)', 'ddd MMM D YYYY HH:mm:ss ZZ').hour(4).minute(54);

  // const g= moment('Sa Apr 11 2020 09:45:34 GMT-0700 (Pacific Daylight Time)','ddd MMM D YYYY HH:mm:ss ZZ').hour(10).minute(56).format()
// const m=moment( dateString).format("X");
//  const n = moment(dateString2).format("X");
  console.log(g);
  const m = moment(dateString);
  const n = moment(dateString2);

  ////////

  // [
  //   {id: 1, group: 2, title: 'item 1', width: "70px", bgColor: "blue", color: "green", start_time: g, end_time: n},
  //   {
  //     id: 2,
  //     group: 2,
  //     title: 'item 2',
  //     selectedBgColor: "blue",
  //     bgColor: "red",
  //     start_time: moment().add(2, 'hour'),
  //     end_time: moment().add(4, 'hour')
  //   },
  //   {
  //     id: 3,
  //     group: 2,
  //     title: 'item 3',
  //     selectedBgColor: "blue",
  //     bgColor: "red",
  //     start_time: moment().add(2, 'hour'),
  //     end_time: moment().add(3, 'hour')
  //   }
  // ]
  /////////

  // const [items, setItems] = useState([]);

///////////////////////////////instead of above////////
  const INITIAL_STATE = {

    items: [],
    timelineSelectedItem: []
  }

  const setItems = items => ({
    type: 'SET_ITEMS',
    payload: items
  })
  const setTimeLineGroupItems = items => ({
    type: 'SET_GROUP_ITEMS',
    payload: items
  })
  const reducer = (state, action) => {

    switch (action.type) {
      case 'SET_ITEMS':
        return {...state, items: action.payload};
      case 'SET_GROUP_ITEMS':
        console.log(900000000);
        return {...state, timelineSelectedItem: action.payload};
      default:
        return state;
    }
  }
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const {items, timelineSelectedItem} = state;


  const [keys, setKeys] = useState({
    groupIdKey: 'id',
    groupTitleKey: 'title',
    groupRightTitleKey: 'rightTitle',
    itemIdKey: 'id',
    itemTitleKey: 'title',    // key for item div content
    itemDivTitleKey: 'title', // key for item div title (<div title="text"/>)
    itemGroupKey: 'group',
    itemTimeStartKey: 'start_time',
    itemTimeEndKey: 'end_time',
  });
  const handleTaskDelete=(event,task)=>{
    props.deleteTask(task.id);
    deleteTaskServer(task.id);
    props.updateState(props.myState);

  }
  const handleTaskEdit=(event,task)=>{
    props.setCurrentTaskToEdit(task);
    props.updateState(props.myState);
    history.push(`/enter-todo`);


  }
  const adjustedDate = (calendarDate, minute, hour, is_stask_int, is_task_int, task) => {

  console.log(moment(calendarDate,"YYYY-MM-DD HH:mm:ss"));
    return is_task_int ? moment(calendarDate,"YYYY-MM-DD HH:mm:ss").hour((
        task.timeEnd_Hours_interv_one === 0) ? hour : task.timeEnd_Hours_interv_one)
      .minute((task.timeEnd_Mins_interv_one === 0) ? minute : task.timeEnd_Mins_interv_one)
      .toDate() :
      moment(calendarDate,"YYYY-MM-DD HH:mm:ss").hour(
        (task.timeStart_Hours_interv_one === 0) ? hour : task.timeStart_Hours_interv_one)
        .minute( (task.timeStart_Mins_interv_one === 0) ? minute : task.timeStart_Mins_interv_one)
      .toDate()
  }
  const adjustedDateEnd = (calendarDate, minute, hour, startHours, startMin, is_stask_int, is_task_int, task) => {
    console.log(moment(calendarDate,"YYYY-MM-DD HH:mm:ss"));

    const hours_set = hour - startHours;
    const mins_final = minute - startMin;

    return ( is_task_int ? moment(calendarDate,"YYYY-MM-DD HH:mm:ss").hour(
        (task.timeStart_Hours_interv_two === 0) ? ( hour) : task.timeStart_Hours_interv_two)
      .minute((task.timeStart_Mins_interv_two === 0) ? ( minute) : task.timeStart_Mins_interv_two)
      .toDate():
        moment(calendarDate,"YYYY-MM-DD HH:mm:ss").hour(
         (task.timeEnd_Hours_interv_two === 0) ? (hour) : task.timeEnd_Hours_interv_two)
          .minute((task.timeEnd_Mins_interv_two === 0) ? (minute) : task.timeEnd_Mins_interv_two)
      .toDate()
    );
  }

  useEffect(() => {
    const currentSubTaskItems = [];
    const currentTaskItems = [];
    const currentGroup = [];
    // updateState(props.myState)();


    const getItemsAndSubItems = () => {
      let pushed_item = {};
      let pushed_item_inter = {};
      let pushed_sub_item = {};
      let pushed_sub_item_inter = {};
      (props.submittedTasks.length==0) ? dispatch(setItems([])):
      props.submittedTasks.map((tempTask, index) => {
          /////////////////////////////////////////////////TASK//////////////////////////////////////////
          pushed_item = {
            key: `group${index}`,
            id: tempTask.id,
            task_int: false,
            stask_int: false,
            sub_display: true,
            group: tempTask.group,
            sub: false,
            title: `Main Task ${tempTask.id} : ${tempTask.taskDescription}`,
            bgColor: "#337ab729",
            color: "green",
            date_Start:tempTask.date_Start,
            date_End:tempTask.date_End,
            timeStart_Min:tempTask.timeStart_Min,
            timeStart_Hours:tempTask.timeStart_Hours,
            timeEnd_Min:tempTask.timeStart_Min,
            timeEnd_Hours:tempTask.timeEnd_Hours,
            taskDescription:tempTask.taskDescription,
            subTasks:tempTask.subTasks,
            subTasks_Count:tempTask.subTasks_Count,
            timeStart_Hours_interv_one: tempTask.timeEnd_Hours_interv_one,
            timeStart_Mins_interv_one: tempTask.timeEnd_Mins_interv_one,
            timeEnd_Hours_interv_one: tempTask.timeEnd_Hours_interv_one,
            timeEnd_Mins_interv_one: tempTask.timeStart_Mins_interv_one,
            timeStart_Hours_interv_two: tempTask.timeStart_Hours_interv_two,
            timeStart_Mins_interv_two: tempTask.timeStart_Mins_interv_two,
            timeEnd_Hours_interv_two: tempTask.timeEnd_Hours_interv_two,
            timeEnd_Mins_interv_two: tempTask.timeEnd_Mins_interv_two,

          }
          console.log("tempTask:",tempTask.date_End.toDate());
        pushed_item['start_time'] = adjustedDate(tempTask.date_Start.toDate(), tempTask.timeStart_Min, tempTask.timeStart_Hours, pushed_item.stask_int,
            pushed_item.task_int, tempTask);
          pushed_item['end_time'] = adjustedDateEnd(tempTask.date_End.toDate(), tempTask.timeEnd_Min, tempTask.timeEnd_Hours,
            tempTask.timeStart_Hours, tempTask.timeStart_Min, pushed_item.stask_int, pushed_item.task_int, tempTask);


          //////////////
          currentGroup.push({key: tempTask.group, id: tempTask.group, title: `group ${tempTask.group}`});
          currentTaskItems.push(pushed_item);

          /////////////// represent task interval ////////////////////
          pushed_item_inter = {
            key: `group_int_t${index}`,
            id: tempTask.id + (Math.floor(Math.random() * 10000000) + 200000),
            group: tempTask.group,
            sub: false,
            sub_display: false,
            task_int: true,
            stask_int: false,
            title: `Main Task_ub ${tempTask.id} : ${tempTask.taskDescription}`,
            bgColor: "green",
            color: "green",

          }
          pushed_item_inter['start_time'] = adjustedDate(tempTask.date_Start.toDate(), tempTask.timeStart_Min, tempTask.timeStart_Hours,
            pushed_item_inter.stask_int, pushed_item_inter.task_int, tempTask);
          pushed_item_inter['end_time'] = adjustedDateEnd(tempTask.date_End.toDate(), tempTask.timeEnd_Min, tempTask.timeEnd_Hours, tempTask.timeStart_Hours
            , tempTask.timeStart_Min, pushed_item_inter.stask_int, pushed_item_inter.task_int, tempTask);


          currentTaskItems.push(pushed_item_inter);
////////////////////////////////////////////////////////SUBTASK///////////////////////////////////////////////////////////
          tempTask.subTasks.map((stask, index) => {
            pushed_sub_item = {
              key: `subGroup${index}`,
              id: stask.subTask_ID + (Math.floor(Math.random() * 10000000) + 70000),
              group: stask.group,
              sub: true,
              show_sub: true,
              task_int: false,
              stask_int: false,
              title: `Subtask :${stask.subtaskDescription}`,
              bgColor: "blue",
              color: "green"
            }

            pushed_sub_item['start_time'] = adjustedDate(stask.date_Start.toDate(), stask.timeStart_Mins, stask.timeStart_Hours,
              pushed_sub_item.stask_int, pushed_sub_item.task_int, stask);
            pushed_sub_item['end_time'] = adjustedDateEnd(stask.date_End.toDate(), stask.timeEnd_Mins, stask.timeEnd_Hours,
              stask.timeStart_Hours, stask.timeStart_Mins, pushed_sub_item.stask_int, pushed_sub_item.task_int, stask);


            currentTaskItems.push(pushed_sub_item);
            ////////////////represent subtask interval ///////////////////////////
            pushed_item_inter = {
              key: `subGroup_int_s${index}`,
              id: stask.subTask_ID + (Math.floor(Math.random() * 1000000000) + 100000),
              group: stask.group,
              sub: true,
              task_int: false,
              show_sub: false,
              stask_int: true,
              title: `Subtask :${stask.subtaskDescription}`,
              bgColor: "blue",
              color: "green",

            }
            pushed_item_inter['start_time'] = adjustedDate(stask.date_Start.toDate(), stask.timeStart_Mins, stask.timeStart_Hours,
              pushed_sub_item_inter.stask_int, pushed_sub_item_inter.task_int, stask);
            pushed_item_inter['end_time'] = adjustedDateEnd(stask.date_End.toDate(), stask.timeEnd_Mins, stask.timeEnd_Hours,
              stask.timeStart_Hours, stask.timeStart_Mins, pushed_sub_item_inter.stask_int, pushed_sub_item_inter.task_int, stask)
            currentTaskItems.push(pushed_item_inter);
          })
          setGroups(currentGroup);
          // setItems([currentTaskItems]);

          dispatch(setItems(currentTaskItems));
        })

    }
    getItemsAndSubItems();
  }, [props.submittedTasks]);


  const editTask = (maintask) => {
    setItem(maintask);
    let tskAndSub = [];
    let subtsk = [];
    if ((items.length > 0)) {
      items.map((tempTask) => {
        if (maintask.group === tempTask.group) {
          subtsk.push(tempTask);

        }
      })
    }
    ;
    tskAndSub = subtsk;
    dispatch(setTimeLineGroupItems(tskAndSub));
    //  setDisplayEdit(true);


  }


  const handleTimeChangeFirst = (visibleTimeStart, visibleTimeEnd, updateScrollCanvas) => {
    // console.log("first", visibleTimeStart, visibleTimeEnd);
    // this.setState({visibleTimeStart, visibleTimeEnd});
  };


  const handleTimeChangeSecond = (visibleTimeStart, visibleTimeEnd, updateScrollCanvas) => {
    // console.log("second", visibleTimeStart, visibleTimeEnd);
    // this.setState({visibleTimeStart, visibleTimeEnd});
  };


  const itemRenderer2 = ({item, timelineContext, itemContext, getItemProps, getResizeProps}) => {

    const {left: leftResizeProps, right: rightResizeProps} = getResizeProps();
    // const backgroundColor = itemContext.selected ? (itemContext.dragging ? "red" : (getItemProps().sub === true) ? "yellow" : item.selectedBgColor)
    //   : item.bgColor;
    console.log(item);
    const backgroundColor = itemContext.selected ? "rgba(255,0,0,0.21)" : item.sub ? "yellow" : item.bgColor;
    const borderColor = itemContext.resizing ? "red" : item.color;
    const color = !item.sub ? "black" : black;
    const zIndex = item.task_int ? 10 : 30;
    const padding = item.task_int ? "0 7px 0 7px" : "0 0 0 0";
    // const onItemSelect= itemContext.selected ? (itemId, e, time) => {
    //   console.log(353535);
    //   editTask(item);
    // } :editTask(null);
    return (
      <div
        {...getItemProps({
          style: {
            // width:item.width,
            backgroundColor,
            color,
            zIndex,
            padding,
            // borderColor,
            // borderStyle: "solid",
            // borderWidth: 1,
            fontWeight: "bold",
            fontSize: "15px",
            // borderRadius: "50%",
            textAlign: "center"
            // borderLeftWidth: itemContext.selected ? 3 : 1,
            // borderRightWidth: itemContext.selected ? 3 : 1
          },
          onMouseDown: (itemId, e, time) => {
            // console.log(selectItem);
            console.log(444444);
            editTask(item);
          },


        })}
      >
        {itemContext.useResizeHandle ? <div {...leftResizeProps} /> : null}

        <div
          style={{
            height: itemContext.dimensions.height,
            overflow: "hidden",
            paddingLeft: 3,
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
          }}
        >
          {
            item.task_int ? <div style={{marginTop: "7px"}}></div> :
              <div style={{fontSize: "10px"}}>{itemContext.title}</div>

          }
          {/*  */}

          {/*<div className="reservation">*/}
          {/*  <div className="reservation__shift">*/}
          {/*    <span className="reservation__title">{item.title}</span>*/}
          {/*    <span*/}
          {/*      className="task__shift__time"*/}
          {/*    >*/}
          {/*      klo {moment(item.start).format('HH:MM')} - {moment(item.end).format('HH:MM')}*/}
          {/*    </span>*/}
          {/*  </div>*/}
          {/*  <div className="task__settings">*/}
          {/*    <span className="task__settings__icon">*/}
          {/*      <Icon*/}
          {/*        size={30} icon={cog} data-id={item.id}*/}
          {/*        data-taskname={item.title}*/}
          {/*        onClick={() => this.setState({show: true})}*/}
          {/*      />*/}
          {/*    </span>*/}
          {/*  </div>*/}
          {/*</div>*/}


          {/**/}

        </div>

        {itemContext.useResizeHandle ? <div {...rightResizeProps} /> : null}
      </div>
    );
  };


  const handlerFunc = (data) => {
    console.log(data);
  }

  return (
    <Container>
      <Row>
        <Col md={1}>
          <div className="aside-icons">
            <Row>
              <Col className="adj-icon-asi">
                <Link to="/todo-coming-soon">
                  <div>
                    <FontAwesomeIcon icon={faCalendar}/>
                  </div>
                </Link>

              </Col>
            </Row>
            <Row>
              <Col className="adj-icon-asi">
                <Link to="/todo-coming-soon">
                  <div>
                    <FontAwesomeIcon icon={faCalendar}/>
                  </div>
                </Link>
              </Col>
            </Row>
            <Row>
              <Col className="adj-icon-asi">
                <Link to="/todo-coming-soon">
                  <div>
                    <FontAwesomeIcon icon={faCalendar}/>
                  </div>
                </Link>
              </Col>
            </Row>
            <Row>
              <Col className="adj-icon-asi">
                <Link to="/todo-coming-soon">
                  <div>
                    <FontAwesomeIcon icon={faCalendar}/>
                  </div>
                </Link>
              </Col>
            </Row>
            <Row>
              <Col className="adj-icon-asi">
                <Link to="/todo-coming-soon">
                  <div>
                    <FontAwesomeIcon icon={faCalendar}/>
                  </div>
                </Link>
              </Col>
            </Row>
          </div>
        </Col>
        <Col md={11}>
          <Row>
            <Col>

              <Timeline groups={groups}
                        items={items}
                        className="adj-timeline"

                        keys={keys}
                        fullUpdate
                //         itemTouchSendsClick={false}
                        stackItems
                        itemHeightRatio={0.75}
                        showCursorLine
                        canMove={false}
                        canResize={false}
                        traditionalZoom={true}
                // itemHeightRatio={0.75}
                // canMove={true}
                // canResize={"both"}
                // defaultTimeStart={moment().add(-12, 'hour')}
                // defaultTimeEnd={moment().add(12, 'hour')}
                        itemTouchSendsClick={false}
                        fixedHeader='sticky'
                        defaultTimeStart={defaultTimeStart}
                        defaultTimeEnd={defaultTimeEnd}
                        itemRenderer={itemRenderer2}
                // onItemSelect={(itemId) => {
                //   console.log(5555);
                //   const selectItem=items.filter(item=>item.id=itemId);
                //   // console.log(selectItem);
                //    editTask(selectItem[0]);
                // }}

                // itemsSorted
                // stackItems
                // itemHeightRatio={0.75}
                // visibleTimeStart={visibleTimeStart}
                // visibleTimeEnd={visibleTimeEnd}
                // onTimeChange={this.handleTimeChangeSecond}
                // onItemMove={this.handleItemMove}
                // onItemResize={this.handleItemResize}
                // onItemDrag={this.handleItemDrag}
              >
                <TimelineHeaders className="sticky">
                  <SidebarHeader style={{padding: "14px"}}>
                    {({getRootProps}) => {
                      return <div {...getRootProps()} style={{
                        textAlign: "center",
                        padding: "18px",
                        color: "black"
                      }}>Main Task
                      </div>;
                    }}
                  </SidebarHeader>
                  <DateHeader unit="primaryHeader"/>
                  <DateHeader/>
                </TimelineHeaders>
              </Timeline>
            </Col>

          </Row>
          <Row>
            <div style={{marginTop: "60px", width: "100%"}}>
              <Col>
                <Link to="/enter-todo"><Button className="adj-task-create">Enter A New Task</Button></Link>
              </Col>
            </div>
          </Row>
          <Row>
            <div style={{marginTop: "60px"}}>
              {
                (timelineSelectedItem.length > 0) ?
                  (<Col>
                    {/*<EditTask item={item} {...props} selectedMaintask={timelineSelectedItem}/>*/}
                  {/*start*/}
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
                                    <Link to={`/time-range/${item.id}`}><Button className="tr-button">Time Ranges</Button></Link>

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
                                                    timelineSelectedItem ?.map((ite, index) =>

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

                                                                              <Button className="adju-button-2" onClick={(event)=>{handleTaskEdit(event,ite)}}>
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
                                                    timelineSelectedItem ?.map((ite, index) =>

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

                                                                              <Button className="adju-button">
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
                                      <Button className="adj-confirm-edit" >
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
                  {/*end*/}
                  </Col>)
                  :
                  (<Col>
                  </Col>)
              }
            </div>
          </Row>
        </Col>
      </Row>
    </Container>

  );
}


const mapStateToProps = (state) => (
  {
    tasks: state.createTaskDetails.task,
    submittedTasks: state.createTaskDetails.addSubmittedTasks,
    currentToEditTask: state.createTaskDetails.setCurrentTaskToEdit,
    // id: state.createTaskDetails.tasksCount,
    // currentSubtask: state.currentSubTask
    myState:state

  });
const mapDispatchToProps = dispatch => {
  return {

    createTask: (task) => dispatch(createTask(task)),

    saveStateToServer: (newState) => dispatch(saveStateToServer(newState)),
    taskObjectHasBeenInitiated:()=>dispatch(taskObjectHasBeenInitiated()),
    newTaskHasBeenAdded:()=>dispatch(newTaskHasBeenAdded()),
    updateState: (newState) => dispatch(updateState(newState)),
    deleteTask: (taskId) => dispatch(deleteTask(taskId)),
    setCurrentTaskToEdit:(task) => dispatch(setCurrentTaskToEdit(task))

  } //note the dispatch call
}
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(TimeLin));


