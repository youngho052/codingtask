import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useHistory } from 'react-router'
import { useDispatch } from 'react-redux'
import { LOGIN_DATA } from '../Components/Input/Data/loginInputData'
import { LoginInputForm } from '../Components/Input/LoginInput'
import { LOGIN } from '../../Config'
import { userToken } from '../../store/action'

function Login() {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  })
  const history = useHistory()
  const dispatch = useDispatch()

  // 로그인 인풋 값 핸들러
  const loginValueHandle = (e) => {
    const { name, value } = e.target

    setLoginData({ ...loginData, [name]: value })
  }

  //로그인 핸들러
  const loginHandle = () => {
    const { email, password } = loginData

    axios
      .post(LOGIN, {
        email,
        password,
      })
      .then((res) => {
        history.push('./')
        dispatch(userToken(res.data.token))
      })
      .catch((error) =>
        error.response.status === 401 ? alert('비밀번호 확인해주세요') : error,
      )
  }

  return (
    <LoginContanier>
      <LoginInputContainer>
        {LOGIN_DATA.map((item, index) => {
          const { type, name, placeholder } = item
          return (
            <LoginInputForm
              type={type}
              name={name}
              value={loginData[name]}
              placeholder={placeholder}
              onChange={(e) => loginValueHandle(e)}
              key={index}
            />
          )
        })}
        <LoginButton type="button" onClick={(e) => loginHandle(e)}>
          로그인
        </LoginButton>
      </LoginInputContainer>
    </LoginContanier>
  )
}

export default Login

const LoginContanier = styled.div`
  ${(props) => props.theme.flexStyle};
  margin-top: 50px;
`

const LoginInputContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const LoginButton = styled.button`
  width: 200px;
  height: 38px;
  margin: 15px auto;
  border: 1px solid black;
`
