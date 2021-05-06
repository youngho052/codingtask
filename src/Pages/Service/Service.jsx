import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import styled from 'styled-components'

function Service() {
  const globalToken = useSelector((store) => store.tokenReducer)
  const history = useHistory()

  const orderHandle = () => {
    if (globalToken) {
      alert('주문 성공')
    } else {
      alert('로그인 하세요')
      history.push('/sign-up')
    }
  }

  return (
    <ServiceContainer>
      <img src="./Image/backgroundImg.png" alt="배경이미지" />
      <OrderButton onClick={() => orderHandle()}>주문하기</OrderButton>
    </ServiceContainer>
  )
}

export default Service

const ServiceContainer = styled.div`
  ${(props) => props.theme.flexStyle};
  flex-direction: column;
`

const OrderButton = styled.button`
  width: 150px;
  height: 50px;
  margin-top: 15px;
  background-color: #f2f2f2;
`
