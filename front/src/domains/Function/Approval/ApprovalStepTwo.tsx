import React, { useState, useEffect, Fragment, ChangeEvent } from 'react'
import axios from 'axios'

import { STable, STr, STh, STd } from '../../../materials/Table'
import { SDiv } from '../../../materials/Div'
import { SButton } from '../../../materials/Button'
import { ASSETS_DEPRECIATION_URL } from '../../../utilities/urls'
import { setHeaders } from '../../../utilities/auth'
import { DepreciationProcessProps, AssetDepreciationResponse } from '../../../utilities/types'
import { digitComma } from '../../../utilities/digitComma'
import { bg, text } from '../../../utilities/colors'


export const ApprovalStepTwo = (props: DepreciationProcessProps) => {

  const [depreciateTransactions, setDepreciateTransactions] = useState<AssetDepreciationResponse[]>([])

  const getProjectedDepreciation = async () => {
    const queryStringArr = props.selectedMonths.map(month => {
      return (
        month.id
      )
    })
    const url = `${ASSETS_DEPRECIATION_URL}?q=${queryStringArr}`
    const headers = setHeaders()
    const {data} = await axios.get(
      url,
      headers
    )
    console.log(data)
    setDepreciateTransactions(data)
  }

  const createDepreciation = async () => {
    const headers = setHeaders()
    const response = await axios.post(
      ASSETS_DEPRECIATION_URL,
      depreciateTransactions,
      headers
    )
    console.log(response)
  }

  useEffect(() => {
    getProjectedDepreciation()
  }, [])

  const DepreciationList = depreciateTransactions.map((transaction, index: number) => {
    return (
      <STr key={index}>
        <STd>{transaction.date}</STd>
        <STd>{transaction.asset_name}</STd>
        <STd align='right'>{digitComma(transaction.amount)}</STd>
      </STr>
    )
  })

  const execCreateDepreciation = () => {
    createDepreciation()
  }

  const setPreviousStep = () => {
    props.setSelectedMonths([])
  }

  return (
    <Fragment>
            <STable>
        <thead>
          <STr>
            <STh>実行日</STh>
            <STh>資産名</STh>
            <STh>償却額</STh>
          </STr>
        </thead>
        <tbody>
          {DepreciationList}
        </tbody>
      </STable>
      <SDiv>
        <SButton
          backgroundColor={bg.aqua}
          color={text.navy}
          onClick={execCreateDepreciation}
        >実行する</SButton>
        <SButton
          backgroundColor={bg.red}
          color={text.silver}
          margin='0 0 0 1em'
          onClick={setPreviousStep}
        >戻る</SButton>
      </SDiv>
    </Fragment>
  )
}