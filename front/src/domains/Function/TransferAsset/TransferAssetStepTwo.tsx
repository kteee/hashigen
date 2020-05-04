import React, {Fragment, useState, useEffect, ChangeEvent} from 'react'
import axios from 'axios'
import styled from 'styled-components'

import { H3 } from '../../../materials/Text'
import { StyledInput } from '../../../materials/Input'
import { StyledButton } from '../../../materials/Button'
import { GET_DEP_METHOD_URL, ASSETS_URL } from '../../../utilities/urls'
import { UseState } from '../../../utilities/types'
import { setHeaders } from '../../../utilities/auth'

const StyledDiv = styled.div`
  margin-top: 1em;
`

interface Props {
  itemSelected: string | number | null
}

interface methodsProps {
  id: string | number
  name: string
  display_name: string
}

export const TransferAssetStepTwo = (props: Props) => {

  const ASSET_NAME = 'asset-name'
  const ACQUISITION_DATE = 'acquisition-date'
  const DEPRECIATION_START_DATE = 'depreciation-start-date'
  const DEPRECIATION_METHOD = 'depreciation-method'
  const ACQUISITION_VALUE = 'acquisition-value'
  const YEAR_START_BOOK_VALUE = 'year-start-book-value'

  const [methods, setMethods] = useState([])
  const [assetName, setAssetName] = useState<UseState<string>>(undefined)
  const [acquisitionDate, setAcquisitionDate] = useState<UseState<string>>(undefined)
  const [depreciationStartDate, setDepreciationStartDate] = useState<UseState<string>>(undefined)
  const [depreciationMethod, setDepreciationMethod] = useState<UseState<string>>(undefined)
  const [acquisitionValue, setAcquisitionValue] = useState<UseState<string>>(undefined)
  const [yearStarBookValue, setYearStarBookValue] = useState<UseState<string>>(undefined)

  const [depreciationStartDateInput, setDepreciationStartDateInput] = useState(false)
  
  const getDepMethods = async () => {
    const { data : { methods }} = await axios.get(GET_DEP_METHOD_URL)
    setMethods(methods)
  }

  const postNewAsset = async () => {
    const headers = setHeaders()
    const response = await axios.post(
      ASSETS_URL,
      {
        asset_item_id: props.itemSelected,
        name: assetName,
        acquisition_date: acquisitionDate,
        depreciation_start_date: depreciationStartDate,
        depreciation_method_id: depreciationMethod,
        acquisition_value: acquisitionValue,
        year_start_book_value: yearStarBookValue
      },
      headers
    )
    console.log(response)
  }

  useEffect( () => {
    getDepMethods()
  }, [])

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    switch (e.target.name) {
      case ASSET_NAME:
        setAssetName(e.target.value)
        break
      case ACQUISITION_DATE:
        setAcquisitionDate(e.target.value)
        break
      case DEPRECIATION_START_DATE:
        setDepreciationStartDate(e.target.value)
        break
      case DEPRECIATION_METHOD:
        setDepreciationMethod(e.target.value)
        break
      case ACQUISITION_VALUE:
        setAcquisitionValue(e.target.value)
        break
      case YEAR_START_BOOK_VALUE:
        setYearStarBookValue(e.target.value)
        break
      default:
        console.log('nothing')
    }
  }

  const onClickHandler = () => {
    if(assetName && acquisitionDate && depreciationMethod && acquisitionValue) {
      postNewAsset()
    } else {
      alert('必須項目の入力がすべて行われていません')
    }
  }

  let Methods = methods.map((val: methodsProps, index: number) => {
    return (
      <option key={index} value={val.id}>
        {val.display_name}
      </option>
    )
  })

  return (
    <Fragment>
      <H3>STEP2. 固定資産情報を登録</H3>
      {/* 資産名称 */}
      <StyledDiv>
        <label>
          資産名称：
          <StyledInput type='text' name={ASSET_NAME} placeholder='資産名称' onChange={onChangeHandler}/>
        </label>
      </StyledDiv>
      {/* 取得年月日 */}
      <StyledDiv>
        <label>
          取得年月日：
          <StyledInput type='date' name={ACQUISITION_DATE} placeholder='取得年月日' onChange={onChangeHandler}/>
        </label>
      </StyledDiv>
      {/* 償却開始日 */}
      <StyledDiv>
        <label>
          償却開始日：
          <StyledInput type='date' name={DEPRECIATION_START_DATE} placeholder='償却開始日' onChange={onChangeHandler}/>
        </label>
      </StyledDiv>
      {/* 償却方法 */}
      <StyledDiv>
        <label>
          償却方法：
          <select name={DEPRECIATION_METHOD} onChange={onChangeHandler}>
            {Methods}
          </select>
        </label>
      </StyledDiv>
      {/* 取得価格 */}
      <StyledDiv>
        <label>
          取得価格：
          <StyledInput type='number' name={ACQUISITION_VALUE} placeholder='取得価格'  onChange={onChangeHandler}/>
        </label>
      </StyledDiv>
      {/* 期首簿価 */}
      <StyledDiv>
        <label>
          期首簿価：
          <StyledInput type='number' name={YEAR_START_BOOK_VALUE} placeholder='期首簿価'  onChange={onChangeHandler}/>
        </label>
      </StyledDiv>
      {/*ボタン */}
      <StyledDiv>
        <StyledButton color='#eea29a' onClick={onClickHandler}>登録する</StyledButton>
      </StyledDiv>
    </Fragment>
  )
}