import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { userToken } from '../../store/action'
import { SIGNUP_DATA } from '../Components/Input/Data/InputData'
import InputForm from '../Components/Input/SignupInput'
import { SIGN_UP } from '../../Config'
import { useHistory } from 'react-router'
import { debounce } from 'lodash'

const debounceSomethingFunc = debounce(() => {
  console.log('dsdsd')
}, 2500)

function Signup() {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    repassword: '',
    phone: '',
  })
  const [userValidation, setUserValidation] = useState({
    emailValidation: null,
    passwordValidation: false,
    phoneValidation: false,
  })

  const emailInput = useRef()
  const dispatch = useDispatch()
  const history = useHistory()

  // 회원가입 인풋 값 핸들러
  const signupValueHandle = (e) => {
    const { name, value } = e.target

    setUserData({ ...userData, [name]: value })
  }

  // 이메일 유효성 검사
  const emailValidation = (e) => {
    const checkEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{3}$/i.test(
      e.target.value,
    )
    checkEmail
      ? setUserValidation({ ...userValidation, emailValidation: checkEmail })
      : setUserValidation({ ...userValidation, emailValidation: checkEmail })

    if (!userData.email) {
      setUserValidation({ ...userValidation, emailValidation: null })
    }
  }

  // 이메일 cursor 이동 함수
  const focusHandle = () => {
    emailInput.current.focus()
  }

  // 비밀번호 유효성 검사
  const passwordValidation = (e) => {
    signupValueHandle(e)
    debounceSomethingFunc()

    const { name } = e.target

    const { password, phone } = userData

    const checkPw = /^[A-Za-z0-9]{8,15}$/i.test(password)
    const checkPhone = /^[0-9]{2,3}[0-9]{4}[0-9]{4}/.test(phone)

    switch (name) {
      case 'password':
        return setUserValidation({
          ...userValidation,
          [`${name}Validation`]: checkPw,
        })
      case 'phone':
        return setUserValidation({
          ...userValidation,
          [`${name}Validation`]: checkPhone,
        })
      default:
        return
    }
  }

  // 회원가입 핸들러
  const signupHandle = () => {
    const { email, password, repassword, phone } = userData
    const {
      emailValidation,
      passwordValidation,
      phoneValidation,
    } = userValidation

    const checkRepassword = password === repassword

    if (
      emailValidation &&
      passwordValidation &&
      checkRepassword &&
      phoneValidation
    ) {
      axios
        .post(SIGN_UP, {
          email,
          password,
          phone,
        })
        .then((res) => {
          dispatch(userToken(res.data.token))
          history.push('/')
        })
        .catch((error) => console.log(error))
    } else {
      if (!emailValidation) {
        alert('이메일형식이 잘못 입력했습니다.')
        return focusHandle()
      }
      !passwordValidation && alert('비밀번호를 잘못입력했습니다.')
      !checkRepassword && alert('비밀번호가 다릅니다.')
      !phoneValidation && alert('핸드폰 번호형식이 아닙니다.')
    }
  }

  return (
    <SignupForm>
      <EmailInput
        type="email"
        name="email"
        placeholder="이메일을 입력해주세요."
        userValidation={userValidation}
        onChange={(e) => signupValueHandle(e)}
        onBlur={(e) => emailValidation(e)}
        onFocus={(e) => focusHandle(e)}
        ref={emailInput}
      />
      {SIGNUP_DATA.map((item, index) => {
        const { type, name, placeholder } = item
        return (
          <InputForm
            type={type}
            name={name}
            value={userData[name]}
            placeholder={placeholder}
            userValidation={userValidation}
            onChange={(e) => passwordValidation(e)}
            key={index}
          />
        )
      })}
      <SignupButton type="button" onClick={signupHandle}>
        회원가입
      </SignupButton>
    </SignupForm>
  )
}

export default Signup

const SignupForm = styled.div`
  ${(props) => props.theme.flexStyle};
  flex-direction: column;
  margin-top: 50px;
`

const SignupButton = styled.button`
  width: 200px;
  height: 38px;
  margin-top: 15px;
  border: 1px solid black;
`

const EmailInput = styled.input`
  padding: 8px 12px;
  width: 268px;
  height: 38px;
  margin-top: 10px;
  background: #fafafa;
  border-radius: 5px;
  border: 1px solid
    ${(props) =>
      props.userValidation.emailValidation === null
        ? 'gray'
        : (props) => (props.userValidation.emailValidation ? 'blue' : 'red')};
`
