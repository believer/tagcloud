import React from 'react'
import { render } from 'react-testing-library'
import App from '../App'

test('should render', () => {
  const { getByText } = render(<App />)

  expect(getByText(/react/i)).toBeInTheDocument()
})
