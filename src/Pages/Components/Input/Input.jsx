import React from 'react'
import styled from 'styled-components'

function Input(props) {
  return <InputForm {...props} />
}

export default Input

export const InputForm = styled.input.attrs((props) => ({
  type: props.type === 'text' ? 'text' : 'password',
}))`
  padding: 8px 12px;
  width: 268px;
  height: 38px;
  margin-top: 10px;
  background: #fafafa;
  border: 1px solid
    ${(props) =>
      props.value.length === 0
        ? 'gray'
        : (props) =>
            props.userValidation[`${props.name}Validation`] ? 'blue' : 'red'};
  border-radius: 5px;
`
