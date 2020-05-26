import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'

import { H2 } from '../../../materials/Text'
import { STable, STr, STh, STd } from '../../../materials/Table'
import { TXNS_URL } from '../../../utilities/urls'
import { setHeaders } from '../../../utilities/auth'
import { TransactionResponse } from '../../../utilities/types'
import { digitComma } from '../../../utilities/digitComma'


export const TxnReportBase = () => {

  const [monthlyTxns, setMonthlyTxns] = useState<TransactionResponse[]>([])

  let bookValue = 0

  const getTxns = async () => {
    const headers = setHeaders()
    const { data } = await axios.get(
      TXNS_URL,
      headers
    )
    console.log(data)
    setMonthlyTxns(data)
  }

  useEffect(() => {
    getTxns()
  }, [])

  const Txns = monthlyTxns.map((txnWrapper, index: number) => {
    const propName = Object.getOwnPropertyNames(txnWrapper)[0]
    const data = {
      acquisition: 0,
      depreciation: 0,
      impairment: 0,
      retirement: 0,
      sales: 0
    }
    
    txnWrapper[propName].forEach(fetchedData => {
      switch (fetchedData.type) {
        case 'acquisition':
          data['acquisition'] = fetchedData.value
          break
        case 'depreciation':
          data['depreciation'] = fetchedData.value
          break
        case 'impairment':
          data['impairment'] = fetchedData.value
          break
        case 'retirement':
          data['retirement'] = fetchedData.value
          break
        case 'sales':
          data['sales'] = fetchedData.value
          break
      }
    })
    
    bookValue = bookValue + data.acquisition + data.depreciation + 
      data.impairment + data.retirement + data.sales
    
      return (
      <STr key={index.toString()}>
        <STd>{propName}</STd>
        <STd align='right'>{digitComma(data.acquisition)}</STd>
        <STd align='right'>{digitComma(data.depreciation)}</STd>
        <STd align='right'>{digitComma(data.impairment)}</STd>
        <STd align='right'>{digitComma(data.retirement)}</STd>
        <STd align='right'>{digitComma(data.sales)}</STd>
        <STd align='right'>{digitComma(bookValue)}</STd>
      </STr>
    )
  })


  return (
    <Fragment>
      <H2>固定資産台帳</H2>
      <STable>
        <thead>
          <STr>
            <STh>期間</STh>
            <STh>取得</STh>
            <STh>減価償却</STh>
            <STh>減損</STh>
            <STh>除却</STh>
            <STh>売却</STh>
            <STh>簿価</STh>
          </STr>
        </thead>
        <tbody>
          {Txns}
        </tbody>
      </STable>
    </Fragment>
  )
}