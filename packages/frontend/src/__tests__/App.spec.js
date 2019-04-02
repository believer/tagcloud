import React from 'react'
import { fireEvent, render } from 'react-testing-library'
import App from '../App'
import { useTweets } from '../useTweets'

jest.mock('../useTweets')

test('should render', () => {
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
