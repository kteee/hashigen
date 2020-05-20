import React, { useState, useEffect, Fragment } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios'

import { NewAssetProcessProps, DepreciationPreviewResponse } from '../../../utilities/types'
import { H3 } from '../../../materials/Text'
import { SDiv } from '../../../materials/Div'
import { FlexWrapper, FlexDiv } from '../../../materials/Flex'
import { SButton } from '../../../materials/Button'
import { STable, STr, STh, STd } from '../../../materials/Table'
import { setHeaders } from '../../../utilities/auth'
import { ASSETS_URL, ASSET_PREVIEW_URL } from '../../../utilities/urls'
import { digitComma } from '../../../utilities/digitComma'
import { bg } from '../../../utilities/colors'

interface NewAssetStepThreeProps {
  selectedItem: NewAssetProcessProps
  setSelectedItem: any
}

export const NewAssetStepThree = (props: NewAssetStepThreeProps) => {

  const newAssetInfo = props.selectedItem.stepTwo

  const [depreciationProjection, setDepreciationProjection] = useState<DepreciationPreviewResponse[]>([])

  const getNewAssetPreview = async () => {
    const headers = setHeaders()
    const url = `${ASSET_PREVIEW_URL}?`
     + `asset_item_id=${newAssetInfo.asset_item_id}&`
     + `name=${newAssetInfo.name}&`
     + `acquisition_date=${newAssetInfo.acquisition_date}&`
     + `depreciation_start_date=${newAssetInfo.depreciation_start_date}&`
     + `depreciation_method_id=${newAssetInfo.depreciation_method_id}&`
     + `acquisition_value=${newAssetInfo.acquisition_value}&`
     + `year_start_book_value=${newAssetInfo.year_start_book_value}&`
     + `location_id=${newAssetInfo.location_id}`
    const { data } = await axios.get(
      url,
      headers
    )
    setDepreciationProjection(data)
  }

  const createNewAsset = async () => {
    const headers = setHeaders()
    const response = await axios.post(
      ASSETS_URL,
      newAssetInfo,
      headers
    )
    console.log(response)
  }

  useEffect(() => {
    getNewAssetPreview()
  }, [])

  const setPreviousStepHandler = () => {
    props.setSelectedItem((prevState: NewAssetProcessProps) => ({
      ...prevState,
      stepTwo: { 
        asset_item_id: 0,
        name: '',
        acquisition_date: '',
        depreciation_start_date: '',
        depreciation_method_id: 0,
        acquisition_value: 0,
        year_start_book_value: 0,
        location_id: 0
      }
    }))
  }

  const clickHandler = () => {
    createNewAsset()
  }

  const TableHead = depreciationProjection.map((item, index:number) => {
    if(item.fy ===0) {
      return (
        <STh key={index}>取得時</STh>
      )      
    } else {
      return (
        <STh key={index}>{item.fy}</STh>
      )
    }
  })

  const TableBody1 = depreciationProjection.map((item, index:number) => {
    if(item.dep) {
      return (
        <STd align='right' key={index}>{digitComma(item.dep)}</STd>
      )     
    } else {
      return (
        <STd align='right' key={index}>-</STd>
      ) 
    }
  })

  const TableBody2 = depreciationProjection.map((item, index:number) => {
    return (
      <STd align='right' key={index}>{digitComma(item.book_val)}</STd>
    )     
  })

  return (
    <Fragment>
      <FlexWrapper>
        <FlexDiv>
          <H3>STEP3. 減価償却プレビューを確認して登録</H3>
        </FlexDiv>
        <SDiv>
          <SButton
            backgroundColor={bg.maroon}
            color={bg.white}
            onClick={setPreviousStepHandler}
          >STEP２の選択に戻る</SButton>
        </SDiv>
      </FlexWrapper>
      <LineChart
        width={depreciationProjection.length * 80}
        height={400}
        data={depreciationProjection}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="fy" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="book_val" stroke="#82ca9d" />
      </LineChart>
      <STable>
        <thead>
          <STr>
            <STh>会計年度</STh>
            {TableHead}
          </STr>
        </thead>
        <tbody>
          <STr>
            <STd>減価償却費</STd>
            {TableBody1}
          </STr>
          <STr>
            <STd>残存簿価</STd>
            {TableBody2}
          </STr>
        </tbody>
      </STable>
      <SDiv>
        <SButton onClick={clickHandler}>登録する</SButton>
      </SDiv>
    </Fragment>
  )
}