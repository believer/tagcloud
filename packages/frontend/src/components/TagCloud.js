import * as React from 'react'
import { useTweets } from '../useTweets'
import styled from '@emotion/styled'

const Cloud = styled.div`
  align-items: flex-end;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 40px;
`

const Tag = styled.div`
  line-height: 1em;
  padding: 4px;
`

const Loading = styled.div`
  color: hsl(210, 12%, 30%);
  margin-top: 60px;
  text-align: center;
`

const TagCloud = ({ hashtag }) => {
  const { isLoading, words } = useTweets(hashtag)

  if (isLoading) {
    return (
      <Loading>
        Loading words for <strong>#{hashtag}</strong>
      </Loading>
    )
  }

  if (hashtag.length > 0 && words.length === 0) {
    return (
      <Loading>
        Your search for <strong>#{hashtag}</strong> returned no relevant results
      </Loading>
    )
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
