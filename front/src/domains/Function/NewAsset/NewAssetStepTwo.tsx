import React, {Fragment, useState, useEffect, ChangeEvent} from 'react'
import axios from 'axios'
import Autocomplete from '@material-ui/lab/Autocomplete'

import { H3, H4 } from '../../../materials/Text'
import { SInput } from '../../../materials/Input'
import { SButton } from '../../../materials/Button'
import { SDiv, Card } from '../../../materials/Div'
import { STable, STr, STh, STd } from '../../../materials/Table'
import { GET_DEP_METHOD_URL, ASSETS_URL, LOCATIONS_URL } from '../../../utilities/urls'
import { UseState, NumberOrString, DepreciationMethodsProps, NewAssetProcessProps } from '../../../utilities/types'
import { setHeaders } from '../../../utilities/auth'
import { Messagebox } from '../../../components/Mesagebox'
import { DateInput } from '../../../components/DateInput'

export const NewAssetStepTwo = (props: NewAssetProcessProps) => {

  const ASSET_NAME = 'asset-name'
  const DEPRECIATION_METHOD = 'depreciation-method'
  const ACQUISITION_VALUE = 'acquisition-value'
  const message = '登録しました'

  const [methods, setMethods] = useState<DepreciationMethodsProps[]>([])
  const [assetName, setAssetName] = useState<UseState<string>>(undefined)
  const [acquisitionDate, setAcquisitionDate] = useState<UseState<Date>>(undefined)
  const [depreciationStartDate, setDepreciationStartDate] = useState<UseState<Date>>(undefined)
  const [depreciationMethod, setDepreciationMethod] = useState<UseState<NumberOrString>>(undefined)
  const [acquisitionValue, setAcquisitionValue] = useState<UseState<string>>(undefined)
  const [open, setOpen] = useState(false)
  const [locations, setLocations] = useState()
  const [queryWrod, setQueryWord] = useState()

  const [depreciationStartDateInput, setDepreciationStartDateInput] = useState(true)
  
  const getDepMethods = async () => {
    const { data : { methods }} = await axios.get(GET_DEP_METHOD_URL)
    setMethods(methods)
    setDepreciationMethod(methods[0].id)
  }

  const getLocations = async () => {
    const url = `${LOCATIONS_URL}?q=${queryWrod}`
    const response = await axios.get(url)
    console.log(response)
  }

  const postNewAsset = async () => {
    const headers = setHeaders()
    const response = await axios.post(
      ASSETS_URL,
      {
        asset_item_id: props.selectedItem.id,
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

  useEffect(() => {
    getLocations()
  })

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    switch (e.target.name) {
      case ASSET_NAME:
        setAssetName(e.target.value)
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

  const acquisitionDateHandler = (date: Date) => {
    setAcquisitionDate(date)
    setDepreciationStartDate(date)
  }

  const depreciationDateHandler = (date: Date) => {
    setDepreciationStartDate(date)
  }

  const onClickHandler = () => {
    if(assetName && acquisitionDate && depreciationMethod && acquisitionValue) {
      postNewAsset()
    } else {
      alert('必須項目の入力がすべて行われていません')
    }
  }

  let Methods = methods.map((val, index: number) => {
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
    if(!depreciationStartDateInput) {
      return (
        <SDiv>
          <div>
            <label>
              償却開始日：
              <DateInput
                selectedState={depreciationStartDate}
                selectHandler={depreciationDateHandler}
              />
            </label>
          </div>
        </SDiv>
      )
    }
  }

  const DepreciationStartDate = getDepreciationStartDate()

  const messageClose = () => {
    setOpen(false)
  }

  const queryWordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setQueryWord(e.target.value)
  }

  return (
    <Fragment>
      <H3>STEP2. 固定資産情報を登録</H3>
      <SDiv>
        <Card>
          <H4>[選択した資産区分]</H4>
          <STable>
            <thead>
              <STh>ID</STh>
              <STh>構造</STh>
              <STh colSpan={7}>細目等</STh>
              <STh>耐用年数</STh>
            </thead>
            <tbody>
              <STr >
                <STd align='right'>{props.selectedItem.id}</STd>
                <STd>{props.selectedItem.group}</STd>
                <STd>{props.selectedItem.item[0]}</STd>
                <STd>{props.selectedItem.item[1]}</STd>
                <STd>{props.selectedItem.item[2]}</STd>
                <STd>{props.selectedItem.item[3]}</STd>
                <STd>{props.selectedItem.item[4]}</STd>
                <STd>{props.selectedItem.item[5]}</STd>
                <STd>{props.selectedItem.item[6]}</STd>
                <STd align='right'>{props.selectedItem.useful_life}</STd>
              </STr>
            </tbody>
          </STable>
        </Card>
      </SDiv>
      <SDiv>
        <label>
          資産名称：
          <SInput type='text' name={ASSET_NAME} placeholder='資産名称' onChange={onChangeHandler}/>
        </label>
      </SDiv>
      <SDiv>
        <label>
          取得年月日：
          <DateInput
            selectedState={acquisitionDate}
            selectHandler={acquisitionDateHandler}
          />
        </label>
      </SDiv>
      <SDiv>
        取得日と同じ日をセットする
        <input type='checkbox' checked={depreciationStartDateInput} onChange={checkHandler} />
      </SDiv>
      {DepreciationStartDate}
      <SDiv>
        <label>
          償却方法：
          <select name={DEPRECIATION_METHOD} onChange={onChangeHandler}>
            {Methods}
          </select>
        </label>
      </SDiv>
      <SDiv>
        <label>
          取得価格：
          <SInput type='number' name={ACQUISITION_VALUE} placeholder='取得価格'  onChange={onChangeHandler}/>
        </label>
      </SDiv>
      <SDiv>
        <label>
          所在地：
          <input onChange={queryWordHandler}/>
          {/* <Autocomplete
            options={top100Films}
            getOptionLabel={(option) => option.title}
            style={{ width: 300 }}
          /> */}
        </label>
      </SDiv>
      <SDiv>
        <SButton onClick={onClickHandler}>プレビュー確認</SButton>
      </SDiv>
      <Messagebox
        open={open}
        autoHideDuration={6000}
        onClose={messageClose}
        message={message}
      />
    </Fragment>
  )
}