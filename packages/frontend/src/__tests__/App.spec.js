import React from 'react'
import { act, fireEvent, render } from 'react-testing-library'
import App from '../App'
import { useTweets } from '../useTweets'

jest.mock('../useTweets')

test('handles error state', () => {
  useTweets.mockReturnValue({
    error: {
      message: 'Something broke',
    },
    isLoading: false,
    words: [],
  })

  const { getByText } = render(<App />)

  expect(
    getByText(/something went wrong while fetching data/i)
  ).toBeInTheDocument()
})

test('handles loading state', () => {
  useTweets.mockReturnValue({
    error: null,
    isLoading: true,
    words: [],
  })

  const { getByText } = render(<App />)

  expect(getByText(/loading words/i)).toBeInTheDocument()
})

test('handles empty state', () => {
  jest.useFakeTimers()

  useTweets.mockReturnValue({
    error: null,
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
    error: null,
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

  const { getByText } = render(<App />)

  expect(getByText(/cookiemonster/i)).toBeInTheDocument()
})
