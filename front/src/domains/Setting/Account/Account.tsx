import React, {useState, useEffect, ChangeEvent} from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'

import { SettingListBase } from '../SettingListBase'
import { Container } from '../../../materials/Container'
import { ScreenWrapper, ScreenLeft, ScreenRight } from '../../../materials/ScreenDivider'
import { H2 } from '../../../materials/Text'
import { SInput } from '../../../materials/Input'
import { SButton } from '../../../materials/Button'
import { SDiv } from '../../../materials/Div'
import { ACCOUNTS_URL } from '../../../utilities/urls'
import { storeState } from '../../../utilities/types'
import { setHeaders } from '../../../utilities/auth'


const loginAccountIdSelector = (state: storeState) => state.login.accountId

export const Account = () => {

  const accountId = useSelector(loginAccountIdSelector)

  const [accountName, setAccountName] = useState('')
  const [roundConfig, setRoundConfig] = useState('')

  const getAccountName = async () => {
    const url = `${ACCOUNTS_URL}/${accountId}`
    const headers = setHeaders()
    const { data: { name, round_config }} = await axios.get(url, headers)
    setAccountName(name)
    setRoundConfig(round_config)
  }

  // const createAccount = async () => {
  //   const headers = setHeaders()
  //   const response = await axios.post(ACCOUNTS_URL, {
  //     account_name: accountName,
  //     round_config: roundConfig
  //   }, headers)
  //   console.log(response)
  // }

  const changeAccount = async () => {
    const url = `${ACCOUNTS_URL}/${accountId}`
    const headers = setHeaders()
    const response = await axios.patch(
      url,
      {
        name: accountName,
        round_config: roundConfig
      },
      headers)
    console.log(response)
  }

  useEffect(() => {
    getAccountName()
  }, [accountId])

  const clickHandler = () => {
    changeAccount()
  }

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setAccountName(e.target.value)
  }

  const selectChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setRoundConfig(e.target.value)
  }

  const roundConfigs = [
    {val: 'rounddown', name: '切り捨て'},
    {val: 'roundup', name: '切り上げ'},
    {val: 'roundoff', name: '四捨五入'}
  ]

  const RoundConfigs = roundConfigs.map((item, index: number) => {
    if(item.val === roundConfig){
      return (
        <option key={index} value={item.val} selected>{item.name}</option>
      )
    } else {
      return (
        <option key={index} value={item.val}>{item.name}</option>
      )
    }
  })

  return (
    <Container>
      <ScreenWrapper>
        <ScreenLeft>
          <SettingListBase />
        </ScreenLeft>
        <ScreenRight>
          <H2>アカウント設定</H2>
          <SDiv>
            <p>事業所番号：{accountId}</p>
          </SDiv>
          <SDiv>
            <label>
              事業所名：
              <SInput type='text' placeholder='事業所名' onChange={changeHandler} value={accountName} />
            </label>
          </SDiv>
          <SDiv>
            <label>
              端数処理設定：
              <select onChange={selectChangeHandler} size={3}>
                {RoundConfigs}
              </select>
            </label>
          </SDiv>
          <SDiv>
            <SButton onClick={clickHandler}>更新する</SButton>
          </SDiv>
        </ScreenRight>
      </ScreenWrapper>
    </Container>
  )
}