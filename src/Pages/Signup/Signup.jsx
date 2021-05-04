import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { userToken } from '../../store/action'
import { SIGNUP_DATA } from '../Components/Input/InputData'
import InputForm from '../Components/Input/Input'
import { SIGN_UP } from '../../Config'
import { useHistory } from 'react-router'

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
    repasswordValidation: false,
    phoneValidation: false,
  })
  const [token, setToken] = useState('')

  const dispatch = useDispatch()
  const history = useHistory()

  // 인풋 값 핸들러

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

  // 비밀번호 유효성 검사

  const passwordValidation = (e) => {
    const { password, repassword, phone } = userData
    console.log(password, repassword)

    const checkPw = password.match(/^[A-Za-z0-9]{7,15}$/i)

    // const checkPw = password.length >= 8 && 15 >= password.length

    const checkRepw = password === repassword

    const checkPhone = phone.match(/^[0-9]{2,3}[0-9]{4}[0-9]{4}/)

    if (checkPw) {
      setUserValidation({ ...userValidation, passwordValidation: checkPw })
    } else {
      setUserValidation({ ...userValidation, passwordValidation: checkPw })
    }
    if (checkRepw) {
      setUserValidation({ ...userValidation, repasswordValidation: checkRepw })
    }
    if (checkPhone) {
      setUserValidation({ ...userValidation, phoneValidation: checkPhone })
    } else {
      setUserValidation({ ...userValidation, phoneValidation: checkPhone })
    }
  }
  console.log(userValidation)

  //전역 토큰값 설정

  useEffect(() => {
    token && dispatch(userToken(token))
  }, [token])

  // 회원가입 핸들러

  const signupHandle = () => {
    const { email, password, phone } = userData
    const {
      emailValidation,
      passwordValidation,
      repasswordValidation,
      phoneValidation,
    } = userValidation

    if (
      emailValidation &&
      passwordValidation &&
      repasswordValidation &&
      phoneValidation
    ) {
      axios
        .post(SIGN_UP, {
          email,
          password,
          phone,
        })
        .then((res) => {
          setToken(res.data.token)
          history.push('/')
        })
        .catch((error) => console.log(error))
    } else {
      !emailValidation && alert('이메일 잘못입력')
      !passwordValidation && alert('비밀번호 잘못입력')
      !repasswordValidation && alert('비밀번호2 잘못입력')
      !phoneValidation && alert('폰번호 잘못입력')
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
            onInput={(e) => passwordValidation(e)}
            onChange={(e) => signupValueHandle(e)}
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
