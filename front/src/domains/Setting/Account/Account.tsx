import React, {useState, ChangeEvent} from 'react'
import axios from 'axios'
import styled from 'styled-components'

import { SettingListBase } from '../SettingListBase'
import { Container } from '../../../materials/Container'
import { ScreenWrapper, ScreenLeft, ScreenRight } from '../../../materials/ScreenDivider'
import { H2 } from '../../../materials/Text'
import { StyledInput } from '../../../materials/Input'
import { StyledButton } from '../../../materials/Button'
import { ACCOUNTS_URL } from '../../../utilities/urls'
import { UseState } from '../../../utilities/types'
import { setHeaders } from '../../../utilities/auth'

const StyledDiv = styled.div`
  margin-top: 1em;
`

export const Account = () => {

  const ACCOUNT_NAME = 'account-name'
  const ACCOUNT_PERIOD_START = 'account-period-start'
  const ACCOUNT_PERIOD_END = 'account-period-end'

  const [accountName, setAccountName] = useState<UseState<string>>(undefined)
  const [accountPeriodStart, setAccountPeriodStart] = useState<UseState<string>>(undefined)
  const [accountPeriodEnd, setAccountPeriodEnd] = useState<UseState<string>>(undefined)

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    switch(e.target.name) {
      case ACCOUNT_NAME:
        setAccountName(val)
      case ACCOUNT_PERIOD_START:
        setAccountPeriodStart(val)
      case ACCOUNT_PERIOD_END:
        setAccountPeriodEnd(val)
    }
  }

  const createAccount = async () => {
    const headers = setHeaders()
    const response = await axios.post(ACCOUNTS_URL, {
      account_name: accountName,
      account_period_start: accountPeriodStart,
      account_period_end: accountPeriodEnd
    }, headers)
    console.log(response)
  }

  const clickHandler = () => {
    createAccount()
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
            <StyledInput type='text' name={ACCOUNT_NAME} placeholder='事業所名' onChange={changeHandler}/>
          </StyledDiv>
          <StyledDiv>
            <StyledInput type='date' name={ACCOUNT_PERIOD_START} placeholder='開始日' onChange={changeHandler}/>
          </StyledDiv>
          <StyledDiv>
            <StyledInput type='date' name={ACCOUNT_PERIOD_END} placeholder='終了日' onChange={changeHandler}/>
          </StyledDiv>
          <StyledDiv>
            <StyledButton onClick={clickHandler}>更新する</StyledButton>
          </StyledDiv>
        </ScreenRight>
      </ScreenWrapper>
    </Container>
  )
}