import React from 'react'
import styled from 'styled-components'

function Input(props) {
  return <LoginInputForm {...props} />
}

export default Input

export const LoginInputForm = styled.input.attrs((props) => ({
  type: props.type === 'text' ? 'text' : 'password',
}))`
  padding: 8px 12px;
  width: 268px;
  height: 38px;
  margin-top: 10px;
  background: #fafafa;
  border: 1px solid gray;
  border-radius: 5px;
`
