import React from 'react'
import { Global } from '@emotion/core'
import styled from '@emotion/styled'
import Input from './components/Input'
import TagCloud from './components/TagCloud'
import { useDebounce } from '@iteam/hooks'
import { globalStyles } from './globalStyles'

const Wrap = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100vh;
`

const Header = styled.header`
  background-color: #24292e;
  color: #fff;
  font-family: 'Fjalla One', sans-serif;
  font-size: 21px;
  padding: 20px;
  text-align: center;
`

const Main = styled.main`
  display: grid;
  grid-template-columns: 20px 1fr 20px;
  padding: 20px;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 800px 1fr;
  }
`

const MainInner = styled.div`
  grid-column: 2;
`

const Footer = styled.footer`
  background-color: #24292e;
  color: #fff;
  padding: 20px;
  text-align: center;
`

const ListItem = styled.li`
  &:not(:last-child) {
    margin-bottom: 5px;
  }
`

const App = () => {
  const [hashtag, setHashTag] = React.useState('')
  const debouncedHashtag = useDebounce(hashtag, 300)

  return (
    <Wrap>
      <Global styles={globalStyles} />
      <Header>Tag Cloud by Rickard Laurin</Header>

      <Main>
        <MainInner>
          <Input onChange={setHashTag} value={hashtag} />
          <TagCloud hashtag={debouncedHashtag} />
        </MainInner>
      </Main>

      <Footer>
        <ul>
          <ListItem>
            E-mail:{' '}
            <a href="mailto:rickard.laurin@gmail.com">
              rickard.laurin@gmail.com
            </a>
          </ListItem>
          <ListItem>
            GitHub:{' '}
            <a href="https://github.com/believer">
              https://github.com/believer
            </a>
          </ListItem>
          <ListItem>
            Website:{' '}
            <a href="https://rickardlaurin.se/">https://rickardlaurin.se/</a>
          </ListItem>
        </ul>
      </Footer>
    </Wrap>
  )
}

export default App
