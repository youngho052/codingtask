import React from 'react'
import styled from 'styled-components'

function Service() {
  return (
    <ServiceContainer>
      <img src="./Image/backgroundImg.png" alt="배경이미지" />
      <OrderButton>주문하기</OrderButton>
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
  border: 1px solid red;
`
