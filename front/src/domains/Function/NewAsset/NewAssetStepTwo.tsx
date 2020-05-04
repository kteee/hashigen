import React, {Fragment, useState, useEffect, ChangeEvent} from 'react'
import axios from 'axios'
import styled from 'styled-components'

import { H3 } from '../../../materials/Text'
import { StyledInput } from '../../../materials/Input'
import { StyledButton } from '../../../materials/Button'
import { GET_DEP_METHOD_URL, ASSETS_URL } from '../../../utilities/urls'
import { UseState } from '../../../utilities/types'
import { NumberOrString } from '../../../utilities/types'
import { setHeaders } from '../../../utilities/auth'
import { Messagebox } from '../../../components/Mesagebox'

const StyledDiv = styled.div`
  margin-top: 1em;
`

interface Props {
  itemSelected: string | number | null
}

interface methodsProps {
  id: string
  name: string
  display_name: string
}

export const NewAssetStepTwo = (props: Props) => {

  const ASSET_NAME = 'asset-name'
  const ACQUISITION_DATE = 'acquisition-date'
  const DEPRECIATION_START_DATE = 'depreciation-start-date'
  const DEPRECIATION_METHOD = 'depreciation-method'
  const ACQUISITION_VALUE = 'acquisition-value'
  const message = '登録しました'

  const [methods, setMethods] = useState<methodsProps[]>([])
  const [assetName, setAssetName] = useState<UseState<string>>(undefined)
  const [acquisitionDate, setAcquisitionDate] = useState<UseState<string>>(undefined)
  const [depreciationStartDate, setDepreciationStartDate] = useState<UseState<string>>(undefined)
  const [depreciationMethod, setDepreciationMethod] = useState<UseState<NumberOrString>>(undefined)
  const [acquisitionValue, setAcquisitionValue] = useState<UseState<string>>(undefined)
  const [open, setOpen] = useState(false)

  const [depreciationStartDateInput, setDepreciationStartDateInput] = useState(true)
  
  const getDepMethods = async () => {
    const { data : { methods }} = await axios.get(GET_DEP_METHOD_URL)
    setMethods(methods)
    setDepreciationMethod(methods[0].id)
  }

  const postNewAsset = async () => {
    const headers = setHeaders()
    const response = await axios.post(
      ASSETS_URL,
      {
        asset_item_id: props.itemSelected,
        name: assetName,
        acquisition_date: acquisitionDate,
        depreciation_start_date: ( depreciationStartDateInput ? acquisitionDate : depreciationStartDate),
        depreciation_method_id: depreciationMethod,
        acquisition_value: acquisitionValue,
        year_start_book_value: acquisitionValue
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

  const checkHandler = () => {
    setDepreciationStartDateInput(!depreciationStartDateInput)
  }

  const getDepreciationStartDate = () => {
    if(depreciationStartDateInput) {
      return (
        <StyledDiv>
          <label>
            償却開始日：取得日と同じ日をセットする
            <input type='checkbox' checked={depreciationStartDateInput} onChange={checkHandler} />
          </label>
        </StyledDiv>
      )
    } else {
      return (
        <StyledDiv>
          <div>
            <label>
              償却開始日：
              <StyledInput type='date' name={DEPRECIATION_START_DATE} placeholder='償却開始日' onChange={onChangeHandler}/>
            </label>
          </div>
          <div>
            取得日と同じ日をセットする
            <input type='checkbox' checked={depreciationStartDateInput} onChange={checkHandler} />
          </div>
        </StyledDiv>
      )
    }
  }

  const DepreciationStartDate = getDepreciationStartDate()

  const messageClose = () => {
    setOpen(false)
  }

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
      {DepreciationStartDate}
      {/* 償却方法 */}
      <StyledDiv>
        <label>
          償却方法：
          <select name={DEPRECIATION_METHOD} onChange={onChangeHandler}>
            {Methods}
          </select>4
        </label>
      </StyledDiv>
      {/* 取得価格 */}
      <StyledDiv>
        <label>
          取得価格：
          <StyledInput type='number' name={ACQUISITION_VALUE} placeholder='取得価格'  onChange={onChangeHandler}/>
        </label>
      </StyledDiv>
      {/*ボタン */}
      <StyledDiv>
        <StyledButton color='#eea29a' onClick={onClickHandler}>登録する</StyledButton>
      </StyledDiv>
      <Messagebox
        open={open}
        autoHideDuration={6000}
        onClose={messageClose}
        message={message}
      />
    </Fragment>
  )
}