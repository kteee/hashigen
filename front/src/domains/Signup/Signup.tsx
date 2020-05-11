import React, { useState, ChangeEvent } from 'react'
import axios from 'axios'

import { Container } from '../../materials/Container'
import { H2 }  from '../../materials/Text'
import { SInput } from '../../materials/Input'
import { SButton } from '../../materials/Button'
import { SDiv } from '../../materials/Div'
import { USERS_URL } from '../../utilities/urls'
import { UseState } from '../../utilities/types'

export const Signup = () => {

  const [email, setEmail] = useState<UseState<string>>(undefined)
  const [password, setPassword] = useState<UseState<string>>(undefined)
  const [passwordConf, setPasswordConf] = useState<UseState<string>>(undefined)

  const createUser = async () => {
    const response = await axios.post(USERS_URL, {
      email: email,
      password: password,
      password_confirmation: passwordConf,
      role_id: 1
    })
    console.log(response)
  }

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case 'email':
        setEmail(e.target.value)
        break
      case 'password':
        setPassword(e.target.value)
        break;
      case 'password-confirmation':
        setPasswordConf(e.target.value)
        break;
    }
  }

  const clickHandler = () => {
    createUser()
  }

  return (
    <Container>
      <H2>新規作成</H2>
      <SDiv>
        <SInput type='email' name='email' placeholder='E-mail' onChange={changeHandler}/>
      </SDiv>
      <SDiv>
        <SInput type='password' name='password' placeholder='Password' onChange={changeHandler}/>
      </SDiv>
      <SDiv>
        <SInput type='password' name='password-confirmation' placeholder='Password確認用' onChange={changeHandler}/>
      </SDiv>
      <SDiv>
        <SButton onClick={clickHandler}>新規登録</SButton>
      </SDiv>
    </Container>
  )
}