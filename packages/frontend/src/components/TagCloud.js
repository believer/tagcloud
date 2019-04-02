import * as React from 'react'
import { useTweets } from '../useTweets'
import styled from '@emotion/styled'
import { ReactComponent as ServerDown } from '../images/server_down.svg'
import { ReactComponent as NotFound } from '../images/not_found.svg'

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
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-top: 60px;
  text-align: center;
`

const LoadingInner = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 360px;
`

const LoadingText = styled.div`
  color: hsl(210, 12%, 30%);
  margin-top: 30px;
`

const TagCloud = ({ hashtag }) => {
  const { error, isLoading, words } = useTweets(hashtag)

  if (isLoading) {
    return (
      <Loading>
        <LoadingInner>
          <LoadingText>
            Loading words for <strong>#{hashtag}</strong>
          </LoadingText>
        </LoadingInner>
      </Loading>
    )
  }

  if (hashtag.length > 0 && words.length === 0) {
    return (
      <Loading>
        <LoadingInner>
          <NotFound height="200" width="300" />
          <LoadingText>
            Oh, your search for <strong>#{hashtag}</strong> returned no relevant
            results. Try another hashtag.
          </LoadingText>
        </LoadingInner>
      </Loading>
    )
  }

  if (isLoading === false && error) {
    return (
      <Loading>
        <LoadingInner>
          <ServerDown height="200" width="300" />
          <LoadingText>
            Sorry, something went wrong while fetching data. Please try again.
          </LoadingText>
        </LoadingInner>
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
