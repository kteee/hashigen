import React, { useState, ChangeEvent } from 'react'
import axios from 'axios'
import styled from 'styled-components'

import { Container } from '../../materials/Container'
import { H2 }  from '../../materials/Text'
import { StyledInput } from '../../materials/Input'
import { StyledButton } from '../../materials/Button'
import { LOGIN_URL } from '../../utilities/urls'
import { UseState } from '../../utilities/types'

const StyledDiv = styled.div`
  margin-bottom: 1em;
`

export const Login = () => {

  const [email, setEmail] = useState<UseState<string>>(undefined)
  const [password, setPassword] = useState<UseState<string>>(undefined)

  const loginUser = async () => {
    const response = await axios.post(LOGIN_URL, {
      email: email,
      password: password
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
    }
  }

  const clickHandler = () => {
    loginUser()
  }

  return (
    <Container>
      <H2>ログイン</H2>
      <StyledDiv>
        <StyledInput type='email' name='email' placeholder='E-mail' onChange={changeHandler}/>
      </StyledDiv>
      <StyledDiv>
        <StyledInput type='password' name='password' placeholder='Password' onChange={changeHandler}/>
      </StyledDiv>
      <StyledDiv>
        <StyledButton onClick={clickHandler}>ログイン</StyledButton>
      </StyledDiv>
    </Container>
  )
}