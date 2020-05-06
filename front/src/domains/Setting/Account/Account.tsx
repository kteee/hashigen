import React, {useState, useEffect, ChangeEvent} from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import "react-datepicker/dist/react-datepicker.css";

import { SettingListBase } from '../SettingListBase'
import { Container } from '../../../materials/Container'
import { ScreenWrapper, ScreenLeft, ScreenRight } from '../../../materials/ScreenDivider'
import { H2 } from '../../../materials/Text'
import { StyledInput } from '../../../materials/Input'
import { StyledButton } from '../../../materials/Button'
import { ACCOUNTS_URL } from '../../../utilities/urls'
import { UseState, LoginReducerState } from '../../../utilities/types'
import { setHeaders } from '../../../utilities/auth'

const StyledDiv = styled.div`
  margin-top: 1em;
`

interface StoreState {
  loginReducer: LoginReducerState
}

const loginAccountIdSelector = (state: StoreState) => state.loginReducer.accountId

export const Account = () => {

  const accountId = useSelector(loginAccountIdSelector)

  const [accountName, setAccountName] = useState<UseState<string>>(undefined)

  const getAccountName = async () => {
    const url = `${ACCOUNTS_URL}/${accountId}`
    const headers = setHeaders()
    const { data: { name }} = await axios.get(url, headers)
    setAccountName(name)
  }

  const createAccount = async () => {
    const headers = setHeaders()
    const response = await axios.post(ACCOUNTS_URL, {
      account_name: accountName
    }, headers)
    console.log(response)
  }

  useEffect(() => {
    getAccountName()
  }, [accountId])

  const clickHandler = () => {
    createAccount()
  }
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setAccountName(e.target.value)
  }

  return (
    <Container>
      <ScreenWrapper>
        <ScreenLeft>
          <SettingListBase />
        </ScreenLeft>
        <ScreenRight>
          <H2>アカウント設定</H2>
          <StyledDiv>
            <p>事業所番号：{accountId}</p>
          </StyledDiv>
          <StyledDiv>
            <label>
              事業所名：
              <StyledInput type='text' placeholder='事業所名' onChange={changeHandler} value={accountName} />
            </label>
          </StyledDiv>
          <StyledDiv>
            <StyledButton onClick={clickHandler}>更新する</StyledButton>
          </StyledDiv>
        </ScreenRight>
      </ScreenWrapper>
    </Container>
  )
}