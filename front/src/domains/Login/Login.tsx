import React, { useState, ChangeEvent } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import styled from 'styled-components'

import { Signup } from '../Signup/Signup'
import { Container } from '../../materials/Container'
import { H2 }  from '../../materials/Text'
import { SInput } from '../../materials/Input'
import { SButton } from '../../materials/Button'
import { SDiv } from '../../materials/Div'
import { LOGIN_URL } from '../../utilities/urls'
import { UseState } from '../../utilities/types'
import { loginAction } from '../../reducer/action'
import { Messagebox } from '../../components/Mesagebox'

const SLink = styled(Link)`
`

export const Login = () => {

  const EMAIL = 'email'
  const PASSWORD = 'password'

  const [email, setEmail] = useState<UseState<string>>(undefined)
  const [password, setPassword] = useState<UseState<string>>(undefined)
  const [message, setMessage] = useState('ログインしました')
  const [open, setOpen] = useState(false)

  const history = useHistory()

  const dispatch = useDispatch()

  const loginUser = async () => {
    const { data: { token, exp, account_id } } = await axios.post(LOGIN_URL, {
      email: email,
      password: password
    })
    if(token){
      setOpen(true)
      localStorage.setItem('token', token)
      localStorage.setItem('exp', exp)
      dispatch(loginAction(account_id))
      history.push({pathname: '/'})
    } else {
      setMessage('ログインに失敗しました')
      setOpen(true)
    }
  }

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case EMAIL:
        setEmail(e.target.value)
        break
      case PASSWORD:
        setPassword(e.target.value)
        break
    }
  }

  const clickHandler = () => {
    loginUser()
  }

  const messageClose = () => {
    setOpen(false)
  }

  return (
    <Container>
      <H2>ログイン</H2>
      <SDiv>
        <SInput type='email' name={EMAIL} placeholder='E-mail' onChange={changeHandler}/>
      </SDiv>
      <SDiv>
        <SInput type='password' name={PASSWORD} placeholder='Password' onChange={changeHandler}/>
      </SDiv>
      <SDiv>
        <SButton onClick={clickHandler}>ログイン</SButton>
      </SDiv>
      <SDiv>
        <SLink to='/signup'>アカウント未登録の場合</SLink>
      </SDiv>
      <Messagebox 
        open={open}
        autoHideDuration={6000}
        onClose={messageClose}
        message={message}
      />
    </Container>
  )
}