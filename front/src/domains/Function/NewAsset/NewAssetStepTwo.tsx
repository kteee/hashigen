import React, {Fragment, useState, useEffect, ChangeEvent} from 'react'
import axios from 'axios'
import styled from 'styled-components'

import {H3} from '../../../materials/Text'
import {StyledInput} from '../../../materials/Input'
import {StyledButton} from '../../../materials/Button'
import {GET_DEP_METHOD_URL, POST_NEW_ASSET_URL} from '../../../utilities/urls'

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

export const NewAssetStepTwo = (props: Props) => {

  const [methods, setMethods] = useState([])
  const [assetName, setAssetName] = useState()
  const [acquisitionDate, setAcquisitionDate] = useState()
  const [depreciationMethod, setDepreciationMethod] = useState()
  const [acquisitionValue, setAcquisitionValue] = useState()
  
  const getDepMethods = async () => {
    const { data : { methods }} = await axios.get(GET_DEP_METHOD_URL)
    setMethods(methods)
  }

  const postNewAsset = async () => {
    const response = await axios.post(POST_NEW_ASSET_URL, {
      assetItemId: props.itemSelected,
      name: assetName,
      acquisitionDate: acquisitionDate,
      depreciationMethodId: depreciationMethod,
      acquisitionValue: acquisitionValue
    })
    console.log(response)
  }

  useEffect( () => {
    getDepMethods()
  }, [])

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    switch (e.target.name) {
      case 'asset-name':
        setAssetName(e.target.value)
        break
      case 'acquisition-date':
        setAcquisitionDate(e.target.value)
        break
      case 'depreciation-method':
        setDepreciationMethod(e.target.value)
        break
      case 'acquisition-value':
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

  return (
    <Fragment>
      <H3>STEP2. 固定資産情報を登録</H3>
      {/* 資産名称 */}
      <StyledDiv>
        <StyledInput type='text' name='asset-name' placeholder='資産名称' onChange={onChangeHandler}/>
      </StyledDiv>
      {/* 取得年月日 */}
      <StyledDiv>
        <StyledInput type='date' name='acquisition-date' placeholder='取得年月日' onChange={onChangeHandler}/>
      </StyledDiv>
      {/* 償却方法 */}
      <StyledDiv>
        <select name='depreciation-method' onChange={onChangeHandler}>
          {Methods}
        </select>
      </StyledDiv>
      {/* 償却方法 */}
      <StyledDiv>
        <StyledInput type='number' name='acquisition-value' placeholder='取得価格'  onChange={onChangeHandler}/>
      </StyledDiv>
      {/*ボタン */}
      <StyledDiv>
        <StyledButton color='#eea29a' onClick={onClickHandler}>登録する</StyledButton>
      </StyledDiv>
    </Fragment>
  )
}