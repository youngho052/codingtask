import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

function Navbar() {
  return (
    <Navbars>
      <LogoContainer>
        <img src="Image/mainlogo.png" alt="" />
      </LogoContainer>
      <MenuContainer>
        <Link to="/">서비스</Link>
        <Link to="/sign-up">회원가입</Link>
        <Link to="/login">로그인</Link>
      </MenuContainer>
    </Navbars>
  )
}

export default Navbar

const Navbars = styled.nav`
  display: flex;
  justify-content: space-between;
  height: 70px;
`

const LogoContainer = styled.div`
  ${(props) => props.theme.flexStyle};
  width: 200px;

  img {
    height: 60px;
  }
`

const MenuContainer = styled.div`
  ${(props) => props.theme.flexStyle};
  width: 300px;

  a {
    margin: 0 15px;
  }
`
