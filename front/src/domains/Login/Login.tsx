import React, { useState, ChangeEvent } from 'react'
import axios from 'axios'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { Container } from '../../materials/Container'
import { H2 }  from '../../materials/Text'
import { StyledInput } from '../../materials/Input'
import { StyledButton } from '../../materials/Button'
import { LOGIN_URL } from '../../utilities/urls'
import { UseState } from '../../utilities/types'
import { ReduxProps, LoginReducerType } from '../../utilities/types'
import { actionType } from '../../reducer/actionTypes'
import { Messagebox } from '../../materials/Mesagebox'

const StyledDiv = styled.div`
  margin-bottom: 1em;
`

const Login = (props: ReduxProps) => {

  const [email, setEmail] = useState<UseState<string>>(undefined)
  const [password, setPassword] = useState<UseState<string>>(undefined)
  const [message, setMessage] = useState('ログインしました')
  const [open, setOpen] = useState(false)

  const history = useHistory()

  const loginUser = async () => {
    const { data: { token, user_id } } = await axios.post(LOGIN_URL, {
      email: email,
      password: password
    })
    if(token){
      setOpen(true)
      localStorage.setItem('token', token)
      localStorage.setItem('user_id', user_id)
      props.login()
      history.push({pathname: '/'})
    } else {
      setMessage('ログインに失敗しました')
      setOpen(true)
    }
  }

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case 'email':
        setEmail(e.target.value)
        break
      case 'password':
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
      <StyledDiv>
        <StyledInput type='email' name='email' placeholder='E-mail' onChange={changeHandler}/>
      </StyledDiv>
      <StyledDiv>
        <StyledInput type='password' name='password' placeholder='Password' onChange={changeHandler}/>
      </StyledDiv>
      <StyledDiv>
        <StyledButton onClick={clickHandler}>ログイン</StyledButton>
      </StyledDiv>
      <Messagebox 
        open={open}
        autoHideDuration={6000}
        onClose={messageClose}
        message={message}
      />
    </Container>
  )
}

const mapDispathToProps = (dispatch: Dispatch<LoginReducerType>) => {
  return({
    login: () => dispatch({ type: actionType.LOGIN })
  })
}

const connector = connect(null, mapDispathToProps)

export default connector(Login)