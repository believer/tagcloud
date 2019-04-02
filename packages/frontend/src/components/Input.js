import React from 'react'
import styled from '@emotion/styled'

const Wrap = styled.div`
  margin-top: 40px;
`

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 10px;
`

const TextField = styled.input`
  border: 1px solid hsl(210, 12%, 75%);
  border-radius: 3px;
  font-size: 18px;
  padding: 10px 20px;
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
        type="text"
        value={value || ''}
      />
    </Wrap>
  )
}

export default Input
