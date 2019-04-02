import React from 'react'
import { act, fireEvent, render } from 'react-testing-library'
import App from '../App'
import { useTweets } from '../useTweets'

jest.mock('../useTweets')

test('handles loading state', () => {
  useTweets.mockReturnValue({
    isLoading: true,
    words: [],
  })

  const { getByText } = render(<App />)

  expect(getByText(/loading words/i)).toBeInTheDocument()
})

test('handles empty state', () => {
  jest.useFakeTimers()

  useTweets.mockReturnValue({
    isLoading: false,
    words: [],
  })

  const { getByText, getByLabelText } = render(<App />)

  fireEvent.change(getByLabelText(/search by hashtag/i), {
    target: { value: 'test' },
  })

  act(() => {
    jest.runAllTimers()
  })

  expect(getByText(/your search for/i)).toBeInTheDocument()
})

test('should render words', () => {
  useTweets.mockReturnValue({
    isLoading: false,
    words: [
      {
        word: 'cookiemonster',
        count: 12,
        style: {
          color: 'hsl(0, 0%, 0%)',
          fontSize: '48px',
        },
      },
    ],
  })

  const { container } = render(<App />)

  expect(container).toMatchSnapshot()
})
