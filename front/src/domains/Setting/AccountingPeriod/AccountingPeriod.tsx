import React, {useState, useEffect, ChangeEvent, Fragment} from 'react'
import axios from 'axios'
import styled from 'styled-components'


import { SettingListBase } from '../SettingListBase'
import { Container } from '../../../materials/Container'
import { ScreenWrapper, ScreenLeft, ScreenRight } from '../../../materials/ScreenDivider'
import { H2, H3 } from '../../../materials/Text'
import { STable, STr, STh, STd } from '../../../materials/Table'
import { SButton } from '../../../materials/Button'
import { SDiv } from '../../../materials/Div'
import { ACCOUNTING_PERIODS_URL } from '../../../utilities/urls'
import { UseState, MonthlyTablePeriodProps, AccountingPeriodResponse } from '../../../utilities/types'
import { setHeaders } from '../../../utilities/auth'
import { getLastDayOfOneYearLater, getFirstDateOfNextMonth } from '../../../utilities/dateManipulate'
import { MonthlyTable } from '../../../components/MonthlyTable'
import { createMonthlyTable } from '../../../utilities/dateManipulate'
import { DateInput } from '../../../components/DateInput'


enum FontSize {
  S = 'S',
  M = 'M'
}

export const AccountingPeriod = () => {

  const [accountingPeriods, setAccountingPeriods] = useState<AccountingPeriodResponse[]>([])
  const [currentAccountingPeriodStart, setCurrentAccountingPeriodStart] = useState<UseState<Date>>(undefined)
  const [currentAccountingPeriodEnd, setCurrentAccountingPeriodEnd] = useState<UseState<Date>>(undefined)
  const [periodIsOneYear, setPeriodIsOneYear] = useState(true)
  const [monthlyTablePeriod, setMonthlyTablePeriod] = useState<MonthlyTablePeriodProps[]>([])
  const [nextYearMonthlyTablePeriod, setNextYearMonthlyTablePeriod] = useState<MonthlyTablePeriodProps[]>([])

  const getCurrentAccountingPeriod = async () => {
    const headers = setHeaders()
    const { data } = await axios.get(ACCOUNTING_PERIODS_URL, headers)
    setAccountingPeriods(data)
    data.map((period: AccountingPeriodResponse) => {
      if(period.status===0){
        setCurrentAccountingPeriodStart(new Date(period.start))
        setCurrentAccountingPeriodEnd(new Date(period.end))
      }
    })
  }

  const createNewYear = async (monthlyPeriod: MonthlyTablePeriodProps[]) => {
    const headers = setHeaders()
    const response = await axios.post(
      ACCOUNTING_PERIODS_URL,
      { monthly_periods: monthlyPeriod },
      headers
    )
    console.log(response)
  }

  const updateYear = async () => {
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

  const reOpenPreviousYear = async () => {
    let id = 0
    accountingPeriods.forEach((period) => {
      if(period.status===0) {
        id = period.id
        return
      }
    })
    const url = `${ACCOUNTING_PERIODS_URL}/${id}`
    const headers = setHeaders()
    const response = await axios.delete(url, headers)
    console.log(response)
  }

  useEffect(() => {
    getCurrentAccountingPeriod()
  }, [])

  useEffect(() => {
    if(currentAccountingPeriodStart && currentAccountingPeriodEnd) {
      // 0~11で月数を計算する
      const currentYear = createMonthlyTable(
        currentAccountingPeriodStart,
        currentAccountingPeriodEnd
      )
      const nextYear = createMonthlyTable(getFirstDateOfNextMonth(currentAccountingPeriodEnd))
      setMonthlyTablePeriod(currentYear)
      setNextYearMonthlyTablePeriod(nextYear)
    }
  }, [currentAccountingPeriodStart, currentAccountingPeriodEnd])

  const closeYearHandler = () => {
    createNewYear(nextYearMonthlyTablePeriod)
  }
  
  const createHandler = () => {
    createNewYear(monthlyTablePeriod)
  }

  const updateHandler = () => {
    updateYear()
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

  const reOpenPreviousYearHandler = () => {
    reOpenPreviousYear()
  }

  const AccountingPeriods = accountingPeriods.map(period => {
    if(accountingPeriods.length > 1 && period.status===0) {
      return (
        <STr>
          <STd>{period.status}</STd>
          <STd>{period.start}</STd>
          <STd>{period.end}</STd>
          <STd><SButton backgroundColor='#e3f6f5' size={FontSize.S} onClick={reOpenPreviousYearHandler}>昨年度に戻る</SButton></STd>
        </STr>
      )
    } else {
      return (
        <STr>
          <STd>{period.status}</STd>
          <STd>{period.start}</STd>
          <STd>{period.end}</STd>
          <STd></STd>
        </STr>
      )
    }
  })

  const getAccountPeriodEnd = () => {
    if(!periodIsOneYear) {
      return(
        <SDiv>
          <label>
            終了日：
            <DateInput
              selectedState={currentAccountingPeriodEnd}
              selectHandler={endDatePickerHandler}
            />
          </label>
        </SDiv>
      )
    }
  }

  const AccountPeriodEnd = getAccountPeriodEnd()

  const getActionButton = () => {
    if(accountingPeriods.length > 0){
      return (
        <Fragment>
          <SDiv>
            <SButton onClick={updateHandler}>更新する</SButton>
          </SDiv>
          <hr/>
          <H2>年度繰越</H2>
          <SDiv>
            <p>当会計年度を繰越ます。翌期の期間変更は繰越後に当会計期間設定から実行してください</p>
            <SDiv>
              <H3>次年度月次期間プレビュー</H3>
              <MonthlyTable
                periods={nextYearMonthlyTablePeriod}
              />
            </SDiv>
            <SDiv>
              <SButton onClick={closeYearHandler}>実行する</SButton>
            </SDiv>
          </SDiv>
        </Fragment>
      )
    } else {
      return (
        <SDiv>
          <SButton onClick={createHandler}>設定する</SButton>
        </SDiv>
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
          <SDiv>
            <label>
              開始日：
              <DateInput
                selectedState={currentAccountingPeriodStart}
                selectHandler={startDatePickerHandler}
              />
            </label>
            <SDiv>
              <input type='checkbox' checked={periodIsOneYear} onChange={checkHandler} />
              会計期間を1年で設定する（1日以外の日付が選択された場合も1日が選択されたと想定して1年間を計算します）
            </SDiv>
          </SDiv>
          {AccountPeriodEnd}
          <SDiv>
            <H3>月次期間プレビュー</H3>
            <MonthlyTable
              periods={monthlyTablePeriod}
            />
          </SDiv>
          {ActionButton}
          <hr/>
          <SDiv>
            <H3>設定会計期間</H3>
            <STable>
              <thead>
                <STr>
                  <STh>ステータス</STh>
                  <STh>開始日</STh>
                  <STh>終了日</STh>
                  <STh>アクション</STh>
                </STr>
              </thead>
              <tbody>
                {AccountingPeriods}
              </tbody>
            </STable>
          </SDiv>
        </ScreenRight>
      </ScreenWrapper>
    </Container>
  )
}