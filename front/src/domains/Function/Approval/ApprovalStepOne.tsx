import React, { useState, useEffect, Fragment, ChangeEvent } from 'react'
import axios from 'axios'

import { STable, STr, STh, STd } from '../../../materials/Table'
import { SDiv } from '../../../materials/Div'
import { SButton } from '../../../materials/Button'
import { SInput } from '../../../materials/Input'
import { UNAPPROVED_TRANSACTIONS } from '../../../utilities/urls'
import { setHeaders } from '../../../utilities/auth'
import { UnapprovedTransactions } from '../../../utilities/types'
import { bg, text } from '../../../utilities/colors'

export const ApprovalStepOne = () => {

  const [unapprovedTransactions, setUnapprovedTransactions] = useState<UnapprovedTransactions[]>([])

  const getUnapprovedTransactions = async () => {
    const headers = setHeaders()
    const { data } = await axios.get(
      UNAPPROVED_TRANSACTIONS,
      headers
    )
    setUnapprovedTransactions(data)
  }

  useEffect(() => {
    getUnapprovedTransactions()
  }, [])

  // const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
  //   const newArray = monthlyPeriods.map(period => {
  //     if(String(period.id)===e.currentTarget.name){
  //       period.checked = !period.checked
  //     }
  //     return period
  //   })
  //   setMonthlyPeriods(newArray)
  // }

  // const changeAllHandler = (e: ChangeEvent<HTMLInputElement>) => {
  //   const checkedStatus = e.currentTarget.checked
  //   const newArray = monthlyPeriods.map(period => {
  //     period.checked = checkedStatus
  //     return period
  //   })
  //   setMonthlyPeriods(newArray)
  // }

  // const setDepreciationPreview = () => {
  //   const checkedPeriods = monthlyPeriods.filter(period => period.checked)
  //   if(checkedPeriods.length > 0){
  //     props.setSelectedMonths(checkedPeriods)
  //   } else {
  //     alert('期間が1件も選択されていません')
  //   }
  // }

  const TransactionList = unapprovedTransactions.map((period, index: number) => {
    const propName = Object.getOwnPropertyNames(period)[0]
    let [acquisition, depreciation, impairment, retirement, sales ] = [0, 0, 0, 0, 0]
    period[propName].forEach(txn => {
      switch(txn.type) {
        case 'acquisition':
          acquisition = txn.count
          break
        case 'depreciation':
          depreciation = txn.count
          break
        case 'impairment':
          impairment = txn.count
          break
        case 'retirement':
          retirement = txn.count
          break
        case 'sales':
          sales = txn.count
          break
      }
    })
    return (
      <STr key={index}>
        <STd>{propName}</STd>
        <STd>{acquisition}</STd>
        <STd>{depreciation}</STd>
        <STd>{impairment}</STd>
        <STd>{retirement}</STd>
        <STd>{sales}</STd>
      </STr>
    )
  })

  return (
    <Fragment>
      <STable>
        <thead>
          <STr>
            <STh><SInput type='checkbox' /></STh>
            <STh>取得</STh>
            <STh>減価償却</STh>
            <STh>減損</STh>
            <STh>除却</STh>
            <STh>売却</STh>
          </STr>
        </thead>
        <tbody>
          {TransactionList}
        </tbody>
      </STable>
      <SDiv>
        <SButton
          // onClick={setDepreciationPreview}
          backgroundColor={bg.aqua}
          color={text.navy}
        >プレビュー</SButton>
      </SDiv>
    </Fragment>
  )
}