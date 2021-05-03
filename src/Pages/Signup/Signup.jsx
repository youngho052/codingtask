import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { SIGNUP_DATA } from '../Components/Input/InputData'
import InputForm from '../Components/Input/Input'
import { validationCheck } from '../../util/ValidationCheck'
import { SIGN_UP } from '../../Config'

function Signup() {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    repassword: '',
    phone: '',
  })
  const [userValidation, setUserValidation] = useState({
    emailValidation: false,
    passwordValidation: false,
    repasswordValidation: false,
    phoneValidation: false,
  })

  const signupValueHandle = (e) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })

    const checkEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test(
      userData.email,
    )
    // let checkEmail
    // const emailregExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{3}$/i
    // if (userData.email.match(emailregExp) !== null) checkEmail = true
    // const checkEmail = userData.email.match(
    //   /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{3}$/i,
    // )
    const checkPw = /^[A-Za-z0-9]{8,15}$/i.test(userData.password)

    const checkRepw = userData.password === userData.repassword

    // const checkPhone = /^[0-9]{2,3}[0-9]{4}[0-9]{4}/.test(userData.phone)

    switch (name) {
      case 'email':
        return setUserValidation({
          ...userValidation,
          [`${name}Validation`]: checkEmail,
        })
      case 'password':
        return setUserValidation({
          ...userValidation,
          [`${name}Validation`]: checkPw,
        })
      case 'repassword':
        return setUserValidation({
          ...userValidation,
          [`${name}Validation`]: checkRepw,
        })
      // case 'phone':
      //   return setUserValidation({
      //     ...userValidation,
      //     [`${name}Validation`]: checkPhone,
      //   })
      default:
        return
    }
    // validationCheck(userData, userValidation, name, setUserValidation)
  }

  const signupHandle = () => {
    const { email, password, phone } = userData
    if (userValidation.emailValidation && userValidation.passwordValidation) {
      axios
        .post(SIGN_UP, {
          email,
          password,
          phone,
        })
        .then((res) => console.log(res))
        .catch((error) => console.log(error))
    } else {
      alert('이메일 잘못입력')
    }
  }

  console.log(userValidation, '<<<<<<부모')
  return (
    <SignupForm>
      {SIGNUP_DATA.map((item, index) => {
        const { type, name, placeholder } = item
        console.log(name, userData[name])
        return (
          <InputForm
            type={type}
            name={name}
            value={userData[name]}
            placeholder={placeholder}
            userValidation={userValidation}
            onChange={signupValueHandle}
            key={index}
          />
        )
      })}
      <input
        type="text"
        value={userValidation.repasswordValidation}
        style={{
          border: `1px solid ${
            userValidation.repasswordValidation ? 'red' : 'blue'
          }`,
        }}
      />
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
