import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Todo from './Todo'


test('Todo component is rendered', () => {
  const title = "Test Todo"
  const todo = { text: title }

  render(<Todo
    todo={todo}
    onClickCompleteTodo={() => {}}
    onClickDeleteTodo={() => {}} />)

  const el = screen.getByText(title)
  expect(el).toBeDefined()
})
