import React, {useState, useEffect, ChangeEvent} from 'react'
import axios from 'axios'
import styled from 'styled-components'
import DatePicker, { registerLocale } from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import ja from "date-fns/locale/ja";

import { SettingListBase } from '../SettingListBase'
import { Container } from '../../../materials/Container'
import { ScreenWrapper, ScreenLeft, ScreenRight } from '../../../materials/ScreenDivider'
import { H2, H3 } from '../../../materials/Text'
import { StyledTable, StyledTr, StyledTh, StyledTd } from '../../../materials/Table'
import { StyledButton } from '../../../materials/Button'
import { ACCOUNTING_PERIODS_URL } from '../../../utilities/urls'
import { UseState, MonthlyTablePeriodProps } from '../../../utilities/types'
import { setHeaders } from '../../../utilities/auth'
import { getLastDayOfOneYearLater, getFirstDateOfNextMonth, dateToYYYYMMDDStr } from '../../../utilities/dateManipulate'
import { MonthlyTable } from '../../../components/MonthlyTable'
import { getLastDateOfMonth } from '../../../utilities/dateManipulate'


interface AccountingPeriodApiResponse {
  id: number
  start: string
  end: string
  status: number
}

const StyledDiv = styled.div`
  margin-top: 1em;
`

registerLocale('ja', ja)

export const AccountingPeriod = () => {

  const [accountingPeriods, setAccountingPeriods] = useState<AccountingPeriodApiResponse[]>([])
  const [currentAccountingPeriodStart, setCurrentAccountingPeriodStart] = useState<UseState<Date>>(undefined)
  const [currentAccountingPeriodEnd, setCurrentAccountingPeriodEnd] = useState<UseState<Date>>(undefined)
  const [periodIsOneYear, setPeriodIsOneYear] = useState(true)
  const [monthlyTablePeriod, setMonthlyTablePeriod] = useState<MonthlyTablePeriodProps[]>([])

  const getCurrentAccountingPeriod = async () => {
    const headers = setHeaders()
    const { data } = await axios.get(ACCOUNTING_PERIODS_URL, headers)
    setAccountingPeriods(data)
    data.map((period: AccountingPeriodApiResponse) => {
      if(period.status===0){
        setCurrentAccountingPeriodStart(new Date(period.start))
        setCurrentAccountingPeriodEnd(new Date(period.end))
      }
    })
  }

  const createAccount = async () => {
    // const headers = setHeaders()
    // const response = await axios.post(ACCOUNTS_URL, {
    //   account_name: accountName,
    //   account_period_start: accountPeriodStart,
    //   account_period_end: accountPeriodEnd
    // }, headers)
    // console.log(response)
  }

  const updateAccount = async () => {
    let id = 0
    accountingPeriods.forEach((period) => {
      if(period.status===0) {
        id = period.id
        return
      }
    })
    const url = `${ACCOUNTING_PERIODS_URL}/${id}`
    const headers = setHeaders()
    const response = await axios.patch(
      url, 
      { monthly_periods: monthlyTablePeriod }, 
      headers
    )
    console.log(response)
  }

  useEffect(() => {
    getCurrentAccountingPeriod()
  }, [])

  useEffect(() => {
    if(currentAccountingPeriodStart && currentAccountingPeriodEnd) {
      // 0~11で月数を計算する
      const months = (currentAccountingPeriodEnd.getFullYear() - currentAccountingPeriodStart.getFullYear()) * 12 + (currentAccountingPeriodEnd.getMonth() - currentAccountingPeriodStart.getMonth())
      const arrayToBeSet: MonthlyTablePeriodProps[] = []
      let monthStartDate = currentAccountingPeriodStart
      let monthEndDate = getLastDateOfMonth(monthStartDate)
      for (let index = 0; index <= months; index++) {
        arrayToBeSet.push({
          month: index + 1,
          monthStartDate: dateToYYYYMMDDStr(monthStartDate),
          monthEndDate: dateToYYYYMMDDStr(monthEndDate),
        })
        monthStartDate = getFirstDateOfNextMonth(monthEndDate)
        monthEndDate = getLastDateOfMonth(monthStartDate)
      }
      setMonthlyTablePeriod(arrayToBeSet)
    }
  }, [currentAccountingPeriodStart, currentAccountingPeriodEnd])

  const createHandler = () => {
    createAccount()
  }

  const updateHandler = () => {
    updateAccount()
  }

  const checkHandler = () => {
    setPeriodIsOneYear(!periodIsOneYear)
  }

  const startDatePickerHandler = (date: Date) => {
    setCurrentAccountingPeriodStart(date)
    const dateOfOneYearLater = getLastDayOfOneYearLater(date)
    setCurrentAccountingPeriodEnd(dateOfOneYearLater)
  }

  const endDatePickerHandler = (date: Date) => {
    setCurrentAccountingPeriodEnd(date)
  }

  const AccountingPeriods = accountingPeriods.map((period) => {
    return (
      <StyledTr>
        <StyledTd>{period.status}</StyledTd>
        <StyledTd>{period.start}</StyledTd>
        <StyledTd>{period.end}</StyledTd>
      </StyledTr>
    )
  })

  const getAccountPeriodEnd = () => {
    if(!periodIsOneYear) {
      return(
        <StyledDiv>
          <label>
            終了日：
            <DatePicker
              selected={currentAccountingPeriodEnd}
              onChange={endDatePickerHandler}
              locale="ja"
              dateFormat='yyyy-MM-dd'
            />
          </label>
        </StyledDiv>
      )
    }
  }

  const AccountPeriodEnd = getAccountPeriodEnd()

  const getActionButton = () => {
    if(accountingPeriods){
      return (
        <StyledDiv>
          <StyledButton onClick={updateHandler}>更新する</StyledButton>
        </StyledDiv>
      )
    } else {
      return (
        <StyledDiv>
          <StyledButton onClick={createHandler}>設定する</StyledButton>
        </StyledDiv>
      )
    }
  }

  const ActionButton = getActionButton()

  return (
    <Container>
      <ScreenWrapper>
        <ScreenLeft>
          <SettingListBase />
        </ScreenLeft>
        <ScreenRight>
          <H2>当期会計期間設定</H2>
          <StyledDiv>
            <label>
              開始日：
              <DatePicker
                selected={currentAccountingPeriodStart}
                onChange={startDatePickerHandler}
                locale="ja"
                dateFormat='yyyy-MM-dd'
              />
            </label>
            <StyledDiv>
              <input type='checkbox' checked={periodIsOneYear} onChange={checkHandler} />
              会計期間を1年で設定する（1日以外の日付が選択された場合も1日が選択されたと想定して1年間を計算します）
            </StyledDiv>
          </StyledDiv>
          {AccountPeriodEnd}
          <StyledDiv>
            <H3>月次期間プレビュー</H3>
            <MonthlyTable
              periods={monthlyTablePeriod}
            />
          </StyledDiv>
          {ActionButton}
          <StyledDiv>
            <H3>設定会計期間</H3>
            <StyledTable>
              <thead>
                <StyledTr>
                  <StyledTh>ステータス</StyledTh>
                  <StyledTh>開始日</StyledTh>
                  <StyledTh>終了日</StyledTh>
                </StyledTr>
              </thead>
              <tbody>
                {AccountingPeriods}
              </tbody>
            </StyledTable>
          </StyledDiv>
        </ScreenRight>
      </ScreenWrapper>
    </Container>
  )
}