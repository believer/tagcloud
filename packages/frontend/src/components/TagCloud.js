import * as React from 'react'
import { useTweets } from '../useTweets'
import styled from '@emotion/styled'

const Cloud = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const Tag = styled.div`
  display: inline-block;
  padding: 10px;
`

const TagCloud = ({ hashtag } ) => {
  const { isLoading, words } = useTweets(hashtag)

  if (isLoading) {
    return <div>Loading</div>
  }

  return (
    <Cloud>
      {words.map(word => (
        <Tag key={word.word} style={word.style}>
          {word.word}
        </Tag>
      ))}
    </Cloud>
  )
}

export default TagCloud
