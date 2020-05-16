import React, { useState, useEffect, Fragment, ChangeEvent } from 'react'
import axios from 'axios'

import { STable, STr, STh, STd } from '../../../materials/Table'
import { SDiv } from '../../../materials/Div'
import { SButton } from '../../../materials/Button'
import { SInput } from '../../../materials/Input'
import { CURRENT_ACCOUNTING_PERIOD_MONTHLY_PERIODS_URL } from '../../../utilities/urls'
import { setHeaders } from '../../../utilities/auth'
import { DepreciationMonth, MonthlyPeriodResponse, DepreciationProcessProps } from '../../../utilities/types'

export const DepreciationStepOne = (props: DepreciationProcessProps) => {

  const [monthlyPeriods, setMonthlyPeriods] = useState<DepreciationMonth[]>([])

  const getAccountingPeriod = async () => {
    const headers = setHeaders()
    const { data } = await axios.get(
      CURRENT_ACCOUNTING_PERIOD_MONTHLY_PERIODS_URL,
      headers
    )
    const monthlyPeriodResponseWithCheckedStatus = data.map((item: MonthlyPeriodResponse): DepreciationMonth => {
      return ({
        ...item,
        checked: false
      })
    })
    setMonthlyPeriods(monthlyPeriodResponseWithCheckedStatus)
  }

  useEffect(() => {
    getAccountingPeriod()
  }, [])

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newArray = monthlyPeriods.map(period => {
      if(String(period.id)===e.currentTarget.name){
        period.checked = !period.checked
      }
      return period
    })
    setMonthlyPeriods(newArray)
  }

  const changeAllHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const checkedStatus = e.currentTarget.checked
    const newArray = monthlyPeriods.map(period => {
      period.checked = checkedStatus
      return period
    })
    setMonthlyPeriods(newArray)
  }

  const setDepreciationPreview = () => {
    const checkedPeriods = monthlyPeriods.filter(period => period.checked)
    if(checkedPeriods.length > 0){
      props.setSelectedMonths(checkedPeriods)
    } else {
      alert('期間が1件も選択されていません')
    }
  }

  const Assets = monthlyPeriods.map((period, index: number) => {
    return (
      <STr key={index}>
        <STd><SInput type='checkbox' name={String(period.id)} checked={period.checked} onChange={changeHandler}/></STd>
        <STd>{period.start}</STd>
        <STd>{period.end}</STd>
        <STd></STd>
        <STd></STd>
      </STr>
    )
  })

  return (
    <Fragment>
      <STable>
        <thead>
          <STr>
            <STh><SInput type='checkbox' onChange={changeAllHandler}/></STh>
            <STh>開始日</STh>
            <STh>終了日</STh>
            <STh>ステータス</STh>
            <STh>内訳確認</STh>
          </STr>
        </thead>
        <tbody>
          {Assets}
        </tbody>
      </STable>
      <SDiv>
        <SButton onClick={setDepreciationPreview}>プレビュー</SButton>
      </SDiv>
    </Fragment>
  )
}