import React from 'react'
import Todo from './Todo'


const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  const onClickDelete = (todo) => () => {
    deleteTodo(todo)
  }

  const onClickComplete = (todo) => () => {
    completeTodo(todo)
  }

  const elements = []
  todos.forEach(todo => {
    elements.push(<hr key={`hr-${todo._id}-top`} />)
    elements.push(
      <Todo key={todo._id}
        todo={todo}
        onClickDeleteTodo={onClickDelete}
        onClickCompleteTodo={onClickComplete} />)
  })
  elements.push(<hr key="hr-final" />)

  return <>{elements}</>
}

export default TodoList
