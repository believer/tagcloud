import React from 'react'
import styled from '@emotion/styled'
import searchIcon from '../images/i_search.svg'

const Wrap = styled.div`
  margin-top: 40px;
`

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 10px;
`

const TextField = styled.input`
  background-color: hsl(244, 17%, 89%);
  background-image: url(${searchIcon});
  background-repeat: no-repeat;
  background-position: 15px center;
  border: 0;
  border-radius: 3px;
  color: hsl(244, 17%, 19%);
  font-size: 18px;
  padding: 15px 20px 15px 50px;
  width: 100%;
`

const Input = ({ onChange, value }) => {
  const handleChange = e => {
    onChange(e.currentTarget.value)
  }

  return (
    <Wrap>
      <Label htmlFor="search">Search by hashtag</Label>
      <TextField
        id="search"
        onChange={handleChange}
        placeholder="Search"
        type="text"
        value={value || ''}
      />
    </Wrap>
  )
}

export default Input
