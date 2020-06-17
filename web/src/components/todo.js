// import React from 'react'

// const Todo = (props) => {
//   const { todo } = props;
//   const toggleComplete = (todoId) => {
//     props.toggleTodoComplete(todoId);
//   };

//   const deleteTodo = (todoId) => {
//     props.deleteTodoAction(todoId);
//   };

//   return (
//     <div className="card">
//       <div className="card-content">
//         <div className="level">
//           <div className="level-left">
//             <div className="level-item">
//               <p className={`title ${props.todo.done ? "has-text-grey-light" : ""}`}>{props.todo.value}</p>
//             </div>
//           </div>
//           <div className="level-right">
//             <div className="level-item buttons">
//               <button className={`button has-text-weight-bold ${props.todo.done ? "is-warning" : "is-primary"}`}>{props.todo.done ? "Undo" : "Done"}</button>
//               <button className="button is-danger has-text-weight-bold" onClick={deleteTodo.bind(null, todo.id)}>Delete</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Todo;