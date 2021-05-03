export const validationCheck = (
  userData,
  userValidation,
  name,
  setUserValidation,
) => {
  // 유효성 검사
  const checkEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(
    userData.email,
  )
  const checkPw = userData.password.length > 7 && 16 > userData.password.length

  const checkRepw = userData.password === userData.repassword

  const checkPhone = /^[0-9]{2,3}[0-9]{4}[0-9]{4}/.test(userData.phone)

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
    case 'phone':
      return setUserValidation({
        ...userValidation,
        [`${name}Validation`]: checkPhone,
      })
    default:
      return
  }
}
