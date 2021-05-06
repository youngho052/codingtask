import React from 'react'
import { Link } from 'react-router-dom'
import { deleteToken } from '../../../store/action'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

function Navbar(props) {
  const { globalToken } = props
  const dispatch = useDispatch()

  const logoutHandle = () => {
    localStorage.removeItem('token')
    dispatch(deleteToken(null))
  }

  return (
    <Navbars>
      <LogoContainer>
        <Link to="/">
          <img src="./../../Image/mainlogo.png" alt="메인로고 이미지" />
        </Link>
      </LogoContainer>
      <MenuContainer>
        <Link to="/">서비스</Link>
        {globalToken ? (
          <>
            <Link to="/mypage/order">마이페이지</Link>
            <Link to="/logout" onClick={logoutHandle}>
              로그아웃
            </Link>
          </>
        ) : (
          <>
            <Link to="/sign-up">회원가입</Link>
            <Link to="/login">로그인</Link>
          </>
        )}
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
