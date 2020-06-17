import React, { useState } from 'react';
import uuid from 'uuid/v4';
import { connect } from 'react-redux';
import { addTodoAction } from '../redux';
import axios from 'axios'

//functional component
const TodoInput = (props) => {

  //hook 
  const [todo, setTodo] = useState('');

  //handling the actions 
  const onChange = (event) => {
    setTodo(event.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    const todo_to_insert = {
      id: uuid(),
      name: todo,
      complete: false
    };
    props.addTodoAction(todo_to_insert);
    setTodo('');
    putDataToDB(todo_to_insert);
  };

  const onDelete = (event) => {
    event.preventDefault();
    props.addTodoAction({
      id: uuid(),
      name: todo,
      complete: false
    });
    setTodo('');

  };

  const putDataToDB = (todo) => {
    axios.post('http://localhost:8080/items', todo);
  };

  return (
    <React.Fragment>
      <form onSubmit={onSubmit}>
        <div className="form-div">
          <input
            type="text"
            name="todo"
            placeholder="Add a todo"
            value={todo}
            onChange={onChange}
          />
          <button type="submit">Add</button>

        </div>
      </form>
    </React.Fragment>
  );
};


//called every time the store state changes.
//It receives the entire store state, and should return an object of data this component needs.
//note that the const initialState has todos that is tied up using createStore.
const mapStateToProps = (state) => ({
  todos: state.todo
});



//React Redux provides a connect function 
//for you to read values from the Redux store (and re-read the values 
//when the store updates).

//mapDispatchToProps: this parameter can either be a function, or an object.
//If it’s a function, it will be called once on component creation. It will receive dispatch as an argument, and should return an object full of functions that use dispatch to dispatch actions.
//If it’s an object full of action creators, each action creator will be turned into a prop function that automatically dispatches its action when called. Note: We recommend using this “object shorthand” form.
//here below addTodoAction is function.
export default connect(
  mapStateToProps,
  { addTodoAction }
)(TodoInput);
