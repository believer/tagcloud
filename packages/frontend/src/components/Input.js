import React from 'react'
import styled from '@emotion/styled'

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
`

const Input = ({ onChange, value }) => {
  const handleChange = e => {
    onChange(e.currentTarget.value)
  }

  return (
    <div>
      <Label htmlFor="search">Search by hashtag</Label>
      <input id="search" onChange={handleChange} type="text" value={value} />
    </div>
  )
}

export default Input
