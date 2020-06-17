import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import uuid from 'uuid/v4';
import * as _ from "lodash";
import moment from "moment";
import axios from "axios";
import axiosService from "./services/axiosService";
import thunk from "redux-thunk";


const {todoAxios} = axiosService;


// allowed actions
const allowed_action = {
  ADD_TODO: 'ADD_TODO',
  TOGGLE_TODO: 'TOGGLE_TODO',
  DELETE_TODO: 'DELETE_TODO',
}

export const extractApiErrors = (resError) => {
  console.log(resError);
  let errors = [{title: 'Error', detail: 'Ooops, something went wrong!'}];
  if (resError && resError.data && resError.data.errors) {
    errors = resError.data.errors;
  }
  return errors;
}


const allowed_action_taskCreation = {
  ADD_TASK: 'ADD_TASK',
  CREATE_TASK: 'CREATE_TASK',
  CALENDAR_VIEW_ACTIVATED: 'CALENDAR_VIEW_ACTIVATED',
  GET_TASK_SUBTASKS: 'GET_TASK_SUBTASKS',
  ADD_SUBTASK: 'ADD_SUBTASK',
  REMOVE_TASK: "REMOVE_TASK",
  REMOVE_SUBTASK: "REMOVE_SUBTASK",
  TASK_COUNT: "TASK_COUNT",
  SUBTASK_COUNT: "SUBTASK_COUNT",
  NEW_TASK_OBJECT_INITIATED: "NEW_TASK_OBJECT_INITIATED",
  TASK_START_HOURS: "TASK_START_HOURS",
  TASK_START_MIN: "TASK_START_MIN",
  TASK_END_HOURS: "TASK_END_HOURS",
  TASK_END_MIN: "TASK_END_MIN",
  TASK_START_DATE: "TASK_START_DATE",
  TASK_END_DATE: "TASK_END_DATE",
  SUBTASK_START_HOURS: "SUBTASK_START_HOURS",
  SUBTASK_START_MIN: "SUBTASK_START_MIN",
  SUBTASK_END_HOURS: "SUBTASK_END_HOURS",
  SUBTASK_END_MIN: "SUBTASK_END_MIN",
  SUBTASK_START_DATE: "SUBTASK_START_DATE",
  SUBTASK_END_DATE: "SUBTASK_END_DATE",
  NEW_SUBTASK_OBJECT_INITIATED: " NEW_SUBTASK_OBJECT_INITIATED",
  SUB_TASK_DESCRIPTION: "SUB_TASK_DESCRIPTION",
  SET_TIME_INTERVALS: "SET_TIME_INTERVALS",
  A_NEW_TASK_HAS_BEEN_ADDED: "A_NEW_TASK_HAS_BEEN_ADDED",
  ADD_SUBMITTED_TASK: "ADD_SUBMITTED_TASK",
  REMOVE_TASK_FROM_LIST_WHEN_SUBMITTED: "REMOVE_TASK_FROM_LIST_WHEN_SUBMITTED",
  DELETE_A_TASK: "DELETE_A_TASK",
  EDIT_A_TASK: "EDIT_A_TASK",
  DELETE_A_SUBTASK: "DELETE_A_SUBTASK",
  EDIT_A_SUBTASK: "EDIT_A_SUBTASK",
  SET_CURRENT_TASK_TO_EDIT: "SET_CURRENT_TASK_TO_EDIT",

}
//////////////////////////////////
const user_auth = {
  NEW_USER_REGISTRATION: "NEW_USER_REGISTRATION",
  USER_AUTHENTICATED: "USER_AUTHENTICATED",
  USER_SIGNED_OUT: "USER_SIGNED_OUT",
  CURRENT_REGISTERED_USERNAME: "CURRENT_REGISTERED_USERNAME",
  CURRENT_REGISTERED_USERNAME_TO_EMPTY: "CURRENT_REGISTERED_USERNAME_TO_EMPTY",
  USER_ID: "USER_ID",
  STATE_TO_SERVER:"STATE_TO_SERVER",
  UPDATE_STATE:"UPDATE_STATE"
}
// initial state raj
const initialState = {
  todos: [
    {
      id: uuid(),
      name: 'Read a bit',
      complete: true
    },
    {
      id: uuid(),
      name: 'Do laundry',
      complete: false
    }
  ]
};
// initial state task creation
const initialState_task = {
  task: [],
  tasksCount: 0,
  currentAddedTask: null,
  currentSubTask: null,
  notificationTaskAdded: "",
  addSubmittedTasks: [],
  setCurrentTaskToEdit: null
};
// Reducer
// reducer raj
function reducer(state = initialState, action) {
  switch (action.type) {
    case allowed_action.ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    case allowed_action.TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? {...todo, complete: !todo.complete}
            : todo
        )
      };
    case allowed_action.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload)
      };
    default:
      return state;
  }
}

// reducer AD
function reducer_task_creation(state = initialState_task, action) {
  switch (action.type) {
    case allowed_action_taskCreation.CREATE_TASK:

      const taskRefrac = {
        ...action.payload,
        id: _.pick(state, ['tasksCount']).tasksCount,
        idTask: _.pick(state, ['tasksCount']).tasksCount,
        group: _.pick(state, ['tasksCount']).tasksCount
      };
      return {
        ...state,
        task: [...state.task, taskRefrac],
        currentAddedTask: taskRefrac
      };
    ////////
    case allowed_action_taskCreation.ADD_SUBMITTED_TASK:

      // const taskRefrac2 = {
      //   ...action.payload, id: _.pick(state, ['tasksCount']).tasksCount,
      //   group: _.pick(state, ['tasksCount']).tasksCount
      // };
      return {
        ...state,
        addSubmittedTasks: (state.addSubmittedTasks.filter(task => task.id === action.payload.id).length > 0) ?
          [...state.addSubmittedTasks.filter(task => task.id !== action.payload.id), action.payload] :
          [...state.addSubmittedTasks, action.payload],
        // task:[action.payload]
      };
    ////////

    case allowed_action_taskCreation.NEW_TASK_OBJECT_INITIATED:
      return {
        ...state,
        tasksCount: _.pick(state, ['tasksCount']).tasksCount + 1,
      };
    case user_auth.STATE_TO_SERVER:
      return {
        ...state,
      };
    case user_auth.UPDATE_STATE:
      return {
        ...state,
      };

    case allowed_action_taskCreation.ADD_SUBTASK:

      return {
        ...state,
        task: state.task.map((task) =>
          task.id === action.payload.taskId ? {
            ...task, subTasks_Count: _.pick(task, ['subTasks_Count'])
              .subTasks_Count + 1, subTasks: [...task.subTasks, {
              ...action.payload, subTask_ID: _.pick(task, ['subTasks_Count'])
                .subTasks_Count + 1, group: task.id
            }]
          } : task),
        currentSubTask: action.payload,
      };
    case allowed_action_taskCreation.DELETE_A_TASK:

      return {
        ...state,
        addSubmittedTasks: state.addSubmittedTasks.filter((task) =>
          task.id !== action.payload.taskId
        )
      };
    case allowed_action_taskCreation.DELETE_A_SUBTASK:

      return {
        ...state,
        addSubmittedTasks: state.addSubmittedTasks.map((task) => {
          if (task.id === action.payload.taskId) {
            task.subTasks.filter((subT) => subT.subTask_ID !== action.payload.subTaskId);
          }
        })
      };
    case allowed_action_taskCreation.SET_CURRENT_TASK_TO_EDIT:

      return {
        ...state,
        task: [
          action.payload.task
        ]
      };
    case allowed_action_taskCreation.EDIT_A_SUBTASK:

      return {
        ...state,
        addSubmittedTasks: state.addSubmittedTasks.map((task) => {
          if (task.id === action.payload.taskId) {
            task.subTasks.map((subT) => {

              if (subT.subTask_ID === action.payload.subTaskId) {
                subT = action.payload.subtask;
              }

            });
          }
        })
      };
    case allowed_action_taskCreation.EDIT_A_TASK:

      return {
        ...state,
        addSubmittedTasks: [...state.addSubmittedTasks.filter((task) => task.id === action.payload.taskId)]
      };
    case allowed_action_taskCreation.REMOVE_TASK_FROM_LIST_WHEN_SUBMITTED:
      return {
        ...state,
        task: state.task.filter((task) =>
          task.id !== action.payload
        ),
      };
    case allowed_action_taskCreation.TASK_COUNT:
      return {
        ...state,
        taskCount: _.pick(state, ['taskCount']).taskCount + 1
      };
    case allowed_action_taskCreation.REMOVE_SUBTASK:
      return {
        ...state,
        currentAddedTask: action.payload,
      };

    /////////////task hours and dates/////////////////////


    case allowed_action_taskCreation.TASK_START_HOURS:
      return {
        ...state,
        task: state.task.map((task) =>

          task.id === action.payload.taskId ? {
            ...task, timeStart_Hours: action.payload.hour
          } : task
        )
      }
    case allowed_action_taskCreation.TASK_START_MIN:
      return {
        ...state,
        task: state.task.map((task) =>
          task.id === action.payload.taskId ? {
            ...task, timeStart_Min: action.payload.minutes
          } : task
        )
      }
    case allowed_action_taskCreation.TASK_END_HOURS:
      return {
        ...state,
        task: state.task.map((task) =>
          task.id === action.payload.taskId ? {
            ...task, timeEnd_Hours: action.payload.hour
          } : task
        )
      }
    case allowed_action_taskCreation.TASK_END_MIN:
      return {
        ...state,
        task: state.task.map((task) =>
          task.id === action.payload.taskId ? {
            ...task, timeEnd_Min: action.payload.minutes
          } : task
        )
      }

    case allowed_action_taskCreation.TASK_START_DATE:
      return {
        ...state,
        task: state.task.map((task) =>
          task.id === action.payload.taskId ? {
            ...task, date_Start: action.payload.date
          } : task
        )
      }
    case allowed_action_taskCreation.TASK_END_DATE:
      return {
        ...state,
        task: state.task.map((task) =>
          task.id === action.payload.taskId ? {
            ...task, date_End: action.payload.date
          } : task
        )
      }
///////////////////subtask hour and dates////////////////


    case allowed_action_taskCreation.SUBTASK_START_HOURS:
      console.log(action.payload);
      return {
        ...state,
        task: state.task.map((task) =>
          task.id == action.payload.taskId ? {
              ...task, subTasks: task.subTasks?.map(stask =>
                stask.subTask_ID == action.payload.subtaskId ?
                  {...stask, timeStart_Hours: action.payload.hour}
                  :
                  stask
              )
            }
            : task
        )
      }

    case allowed_action_taskCreation.SUBTASK_START_MIN:
      return {
        ...state,
        task: state.task.map((task) =>
          task.id == action.payload.taskId ? {
              ...task, subTasks: task.subTasks?.map(stask =>
                stask.subTask_ID == action.payload.subtaskId ?
                  {...stask, timeStart_Mins: action.payload.minutes}
                  :
                  stask
              )
            }
            : task
        )
      }
    case allowed_action_taskCreation.SUBTASK_END_HOURS:
      return {
        ...state,
        task: state.task.map((task) =>
          task.id == action.payload.taskId ? {
              ...task, subTasks: task.subTasks?.map(stask =>
                stask.subTask_ID == action.payload.subtaskId ?
                  {...stask, timeEnd_Hours: action.payload.hour}
                  :
                  stask
              )
            }
            : task
        )
      }


    case allowed_action_taskCreation.SUBTASK_END_MIN:
      return {
        ...state,
        task: state.task.map((task) =>
          task.id == action.payload.taskId ? {
              ...task, subTasks: task.subTasks?.map(stask =>
                stask.subTask_ID == action.payload.subtaskId ?
                  {...stask, timeEnd_Mins: action.payload.minutes}
                  :
                  stask
              )
            }
            : task
        )
      }

    case allowed_action_taskCreation.SUBTASK_START_DATE:
      return {
        ...state,
        task: state.task.map((task) =>
          task.id == action.payload.taskId ? {
              ...task, subTasks: task.subTasks?.map(stask =>
                stask.subTask_ID == action.payload.subtaskId ?
                  {...stask, date_Start: action.payload.date}
                  :
                  stask
              )
            }
            : task
        )
      }
    case allowed_action_taskCreation.SET_TIME_INTERVALS:
      console.log(action.payload);
      return {
        ...state,
        addSubmittedTasks: state.addSubmittedTasks.map((task) =>
          task.id == action.payload.taskId ? {
              ...task,
              timeStart_Hours_interv_one: action.payload.timeStart_Hours_interv_one,
              timeStart_Mins_interv_one: action.payload.timeStart_Mins_interv_one,
              timeEnd_Hours_interv_one: action.payload.timeEnd_Hours_interv_one,
              timeEnd_Mins_interv_one: action.payload.timeStart_Mins_interv_one,
              timeStart_Hours_interv_two: action.payload.timeStart_Hours_interv_two,
              timeStart_Mins_interv_two: action.payload.timeStart_Mins_interv_two,
              timeEnd_Hours_interv_two: action.payload.timeEnd_Hours_interv_two,
              timeEnd_Mins_interv_two: action.payload.timeStart_Mins_interv_two,
            }
            : task
        )
      }
    case allowed_action_taskCreation.SUBTASK_END_DATE:
      return {
        ...state,
        task: state.task.map((task) =>
          task.id == action.payload.taskId ? {
              ...task, subTasks: task.subTasks?.map(stask =>
                stask.subTask_ID == action.payload.subtaskId ?
                  {...stask, date_End: action.payload.date}
                  :
                  stask
              )
            }
            : task
        )
      }
    case allowed_action_taskCreation.A_NEW_TASK_HAS_BEEN_ADDED:
      return {
        ...state,
        notificationTaskAdded: "success! A new task has been added"
      }
    case allowed_action_taskCreation.SUB_TASK_DESCRIPTION:
      return {
        ...state,
        task: state.task.map((task) =>
          task.id == action.payload.taskId ? {
              ...task, subTasks: task.subTasks?.map(stask =>
                stask.subTask_ID == action.payload.subtaskId ?
                  {...stask, subtaskDescription: action.payload.description}
                  :
                  stask
              )
            }
            : task
        )
      }

    default:
      return state;
  }
}

/////////////////////////////////////Auth Reducer////////////////////////////////
// isAuth will be true or false depending of the authentication state
const isAuth = (state = false, action) => {
  switch (action.type) {
    case user_auth.USER_AUTHENTICATED:
      return true;
    case user_auth.USER_SIGNED_OUT:
      return false;
    default:
      return state;
  }
}

const username_as_registered = (state = "", action) => {
  switch (action.type) {
    case user_auth.CURRENT_REGISTERED_USERNAME:
      return action.username
    case user_auth.CURRENT_REGISTERED_USERNAME_TO_EMPTY:
      return action.username
    default:
      return state;
  }

}
const username = (state = "", action) => {
  switch (action.type) {
    case user_auth.USER_AUTHENTICATED:
      return action.username
    case user_auth.USER_SIGNED_OUT:
      return ""
    default:
      return state;
  }
}

export const userId = (state = "", action) => {
  switch (action.type) {
    case user_auth.USER_ID:
      return action.payload
    default:
      return state;
  }
}

/////////////////////////////////////////////////////////////////////

// combine reducers
const allReducers = combineReducers({
  reducer: reducer,
  createTaskDetails: reducer_task_creation,
  isAuth,
  username,
  currentRegisteredUsername: username_as_registered,
  userId
});
// const storeOpt=()=>{
//   window.devToolsExtension && window.devToolsExtension();
//   applyMiddleware(thunk);
// }

// create store
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  allReducers,composeEnhancer(compose(applyMiddleware(thunk)))
);
// Actions
// 1 raj action
export const addTodoAction = (todo) => ({
  type: allowed_action.ADD_TODO,
  payload: todo
});
export const toggleTodoComplete = (todoId) => ({
  type: allowed_action.TOGGLE_TODO,
  payload: todoId
});
export const deleteTodoAction = (todoId) => ({
  type: allowed_action.DELETE_TODO,
  payload: todoId
});
// 2 adrien create a task/actions
// export const userIsAddingATask=(taskDescription)=>({
//       type: allowed_action_taskCreation.ADD_TASK,
//       payload:taskDescription
//    })
export const createTask = (task) => ({
  type: allowed_action_taskCreation.CREATE_TASK,
  payload: task
})
export const addSubmittedTask = (task) => {
  return {
    type: allowed_action_taskCreation.ADD_SUBMITTED_TASK,
    payload: task

  }
}
export const taskObjectHasBeenInitiated = () => ({
  type: allowed_action_taskCreation.NEW_TASK_OBJECT_INITIATED,
})
export const subtaskObjectHasBeenInitiated = () => ({
  type: allowed_action_taskCreation.NEW_SUBTASK_OBJECT_INITIATED,
})
export const taskSubtasks = (subtasks) => ({
  type: allowed_action_taskCreation.GET_TASK_SUBTASKS,
  payload: subtasks
})
export const addSubtask = (subTask) => ({
  type: allowed_action_taskCreation.ADD_SUBTASK,
  payload: subTask
})
export const removeSubtask = (subTask) => ({
  type: allowed_action_taskCreation.REMOVE_SUBTASK,
  payload: subTask
})
export const subtaskCount = (taskID) => ({
  type: allowed_action_taskCreation.SUBTASK_COUNT,
})
export const taskCount = () => ({
  type: allowed_action_taskCreation.TASK_COUNT,
})


///////////////////////////////tasks////////
export const taskStartHours = (taskId, hour) => ({
  type: allowed_action_taskCreation.TASK_START_HOURS,
  payload: {taskId: taskId, hour: hour}
});
export const removeTaskWhenSubmitted = (taskId) => {
  return {
    type: allowed_action_taskCreation.REMOVE_TASK_FROM_LIST_WHEN_SUBMITTED,
    payload: taskId
  }

};
export const taskStartMinute = (taskId, minutes) => ({
  type: allowed_action_taskCreation.TASK_START_MIN,
  payload: {taskId: taskId, minutes: minutes}
});
export const taskEndHours = (taskId, hour) => ({
  type: allowed_action_taskCreation.TASK_END_HOURS,
  payload: {taskId: taskId, hour: hour}
})
export const taskEndMinute = (taskId, minutes) => ({
  type: allowed_action_taskCreation.TASK_END_MIN,
  payload: {taskId: taskId, minutes: minutes}
});
export const taskStartDate = (taskId, date) => ({
  type: allowed_action_taskCreation.TASK_START_DATE,
  payload: {taskId: taskId, date: date}
});
export const taskEndDate = (taskId, date) => ({
  type: allowed_action_taskCreation.TASK_END_DATE,
  payload: {taskId: taskId, date: date}
});


///////////////////////////subtask//////////////
export const subtaskStartHours = (taskId, subtaskId, hour) => ({
  type: allowed_action_taskCreation.SUBTASK_START_HOURS,
  payload: {taskId: taskId, subtaskId: subtaskId, hour: hour}
});
export const subtaskStartMinute = (taskId, subtaskId, minutes) => ({
  type: allowed_action_taskCreation.SUBTASK_START_MIN,
  payload: {taskId: taskId, subtaskId: subtaskId, minutes: minutes}
});
export const subtaskEndHours = (taskId, subtaskId, hour) => ({
  type: allowed_action_taskCreation.SUBTASK_END_HOURS,
  payload: {taskId: taskId, subtaskId: subtaskId, hour: hour}
})
export const subtaskEndMinute = (taskId, subtaskId, minutes) => ({
  type: allowed_action_taskCreation.SUBTASK_END_MIN,
  payload: {taskId: taskId, subtaskId: subtaskId, minutes: minutes}
});
export const subtaskStartDate = (taskId, subtaskId, date) => ({
  type: allowed_action_taskCreation.SUBTASK_START_DATE,
  payload: {taskId: taskId, subtaskId: subtaskId, date: date}
});
export const subtaskEndDate = (taskId, subtaskId, date) => ({
  type: allowed_action_taskCreation.SUBTASK_END_DATE,
  payload: {taskId: taskId, subtaskId: subtaskId, date: date}
});
export const subtask_Description = (taskId, subtaskId, description) => ({
  type: allowed_action_taskCreation.SUB_TASK_DESCRIPTION,
  payload: {taskId: taskId, subtaskId: subtaskId, description: description}
});
//////////////////////////time intervals/////////////////////////////
export const set_time_intervals = (timeIntervalsOb) => {
  console.log(timeIntervalsOb);

  return {
    type: allowed_action_taskCreation.SET_TIME_INTERVALS,
      payload: {
    taskId: timeIntervalsOb.taskId,
      timeStart_Hours_interv_one: timeIntervalsOb.timeStart_Hours_interv_one,
      timeStart_Mins_interv_one: timeIntervalsOb.timeStart_Mins_interv_one,
      timeEnd_Hours_interv_one: timeIntervalsOb.timeEnd_Hours_interv_one,
      timeEnd_Mins_interv_one: timeIntervalsOb.timeEnd_Mins_interv_one,
      timeStart_Hours_interv_two: timeIntervalsOb.timeStart_Hours_interv_two,
      timeStart_Mins_interv_two: timeIntervalsOb.timeStart_Mins_interv_two,
      timeEnd_Hours_interv_two: timeIntervalsOb.timeEnd_Hours_interv_two,
      timeEnd_Mins_interv_two: timeIntervalsOb.timeEnd_Mins_interv_two,
  }
  }

};


/////////////////////////////////User Registration///////////////////////////
export const registration = (registerData) => {
  return axios.post("/api/todo/users/register", registerData)
    .catch((error) => {
      // if(error){
      //   console.log(error.response);
      // }
      return Promise.reject(extractApiErrors(error.response || {})); // to catch the error in the try catch block in signup
    })

}

//////////////////////////////////////////////////////////////////
/////////////////////////////////User Login///////////////////////////
export const userLogin = (loginData) => {
  return axios.post("/api/todo/users/login", loginData)
    .then(res => res.data)
    .catch((error) => {
      return Promise.reject(extractApiErrors(error.response || {})); // to catch the error in the try catch block in signup
    })

}
export const saveState=(myState)=> {
  return axios.post("/api/todo/users/state", myState)
    .then(res => res.data)
    .catch((error) => {
      return Promise.reject(extractApiErrors(error.response || {})); // to catch the error in the try catch block in signup
    })
}

export const userAuthenticated = (decodedToken) => {
  return {
    type: user_auth.USER_AUTHENTICATED,
    username: decodedToken.username || "",
    useremail: decodedToken.email
  }
}

export const registeredUsername = (username) => {
  console.log(username);
  return {
    type: user_auth.CURRENT_REGISTERED_USERNAME,
    username: username
  }
}
export const removeRegisteredUsername = (value) => {
  return {
    type: user_auth.CURRENT_REGISTERED_USERNAME_TO_EMPTY,
    username: value
  }
}
export const newTaskHasBeenAdded = () => {
  return {
    type: allowed_action_taskCreation.A_NEW_TASK_HAS_BEEN_ADDED,
  }
}

export const createTaskServer = task => {
  return todoAxios.post('/api/todo/users/create-a-task', task);
}
export const deleteTaskServer = taskId => {
  return todoAxios.delete(`/api/todo/users/${taskId}`);
}
export const saveStateToServer =(myState)=>{
  return async function(dispatch){
    console.log(dispatch);
    const response=await todoAxios.post('/api/todo/users/state',myState);
  // return {type:user_auth.STATE_TO_SERVER,payload:response};
    // localStorage.removeItem('todo_login_token');
    dispatch({type:user_auth.STATE_TO_SERVER,payload:response});


  };
}
export const updateState =(myNewState)=>{
  return async function(dispatch,getState){
    console.log(getState());
    const response=await todoAxios.patch(`/api/todo/users/update-state`,getState());
    dispatch({type:user_auth.UPDATE_STATE,payload:response});
    // localStorage.removeItem('todo_login_token');

  };
}
export const setUserID = (decodedToken) => {
  return {
    type: user_auth.USER_ID,
    payload: decodedToken.userId
  }
}

////////////////////////////////////////////////////////
export const setCurrentTaskToEdit = (task) => {
  console.log(task);
  return {
    type: allowed_action_taskCreation.SET_CURRENT_TASK_TO_EDIT,
    payload: {task: task}
  }
}

export const deleteTask = (taskId) => {
  return {
    type: allowed_action_taskCreation.DELETE_A_TASK,
    payload: {taskId: taskId}
  }
}
export const editTask = (task, taskId) => {
  return {
    type: allowed_action_taskCreation.EDIT_A_TASK,
    payload: {task: task, taskId: taskId}
  }
}
export const deleteSubtask = (taskId, subtaskId) => {
  return {
    type: allowed_action_taskCreation.DELETE_A_SUBTASK,
    payload: {taskId: taskId, substaskId: subtaskId}
  }
}
export const editSubtask = (subtask, taskId, subtaskId) => {
  return {
    type: allowed_action_taskCreation.EDIT_A_SUBTASK,
    payload: {subtask: subtask, taskId: taskId, subtaskId: subtaskId}
  }
}
