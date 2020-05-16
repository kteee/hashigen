import React, {Fragment, useState, useEffect, ChangeEvent} from 'react'
import axios from 'axios'

import { H3, H4 } from '../../../materials/Text'
import { SInput } from '../../../materials/Input'
import { SButton } from '../../../materials/Button'
import { SDiv, Card } from '../../../materials/Div'
import { STable, STr, STh, STd } from '../../../materials/Table'
import { GET_DEP_METHOD_URL, LOCATIONS_URL } from '../../../utilities/urls'
import { UseState, NumberOrString, DepreciationMethodsProps, NewAssetProcessProps, LocationsResponse } from '../../../utilities/types'
import { DateInput } from '../../../components/DateInput'
import { dateToYYYYMMDDStr } from '../../../utilities/dateManipulate'

interface NewAssetSteTwoProps {
  selectedItem: NewAssetProcessProps
  setSelectedItem: any
}

export const NewAssetStepTwo = (props: NewAssetSteTwoProps) => {

  const ASSET_NAME = 'asset-name'
  const DEPRECIATION_METHOD = 'depreciation-method'
  const ACQUISITION_VALUE = 'acquisition-value'

  const [methods, setMethods] = useState<DepreciationMethodsProps[]>([])
  const [assetName, setAssetName] = useState<UseState<string>>(undefined)
  const [acquisitionDate, setAcquisitionDate] = useState<Date>(new Date())
  const [depreciationStartDate, setDepreciationStartDate] = useState<Date>(new Date())
  const [depreciationMethod, setDepreciationMethod] = useState<UseState<NumberOrString>>(undefined)
  const [acquisitionValue, setAcquisitionValue] = useState<UseState<string>>(undefined)
  const [locations, setLocations] = useState<LocationsResponse[]>([])
  const [location, setLocation] = useState('') 
  const [queryWrod, setQueryWord] = useState('')

  const [depreciationStartDateInput, setDepreciationStartDateInput] = useState(true)
  
  const getDepMethods = async () => {
    const { data : { methods }} = await axios.get(GET_DEP_METHOD_URL)
    setMethods(methods)
    setDepreciationMethod(methods[0].id)
  }

  const getLocations = async () => {
    const url = `${LOCATIONS_URL}?q=${queryWrod}`
    const { data } = await axios.get(url)
    setLocations(data)
  }

  useEffect( () => {
    getDepMethods()
  }, [])

  useEffect(() => {
    getLocations()
  }, [queryWrod])

  const setPreviousStepHandler = () => {
    props.setSelectedItem((prevState: NewAssetProcessProps) => ({
      ...prevState,
      stepOne: {
        id: 0,
        group: '',
        item: [],
        useful_life: 0
      }
    }))
  }

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
      props.setSelectedItem((prevState:NewAssetProcessProps) => ({
        ...prevState,
        stepTwo: {
          asset_item_id: props.selectedItem.stepOne.id,
          name: assetName,
          acquisition_date: dateToYYYYMMDDStr(acquisitionDate),
          depreciation_start_date: ( depreciationStartDateInput ? dateToYYYYMMDDStr(acquisitionDate) : dateToYYYYMMDDStr(depreciationStartDate)),
          depreciation_method_id: depreciationMethod,
          acquisition_value: acquisitionValue,
          year_start_book_value: acquisitionValue,
          location_id: location
        }
      }))
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

  const queryWordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setQueryWord(e.target.value)
  }

  const LocationsList = locations.map((location, index: number) => {
    return (
      <option key={index} value={location.id}>{location.code} | {location.prefecture} {location.city}</option>
    )
  })

  const locationSelectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setLocation(e.target.value)
  }

  return (
    <Fragment>
      <H3>STEP2. 固定資産情報を登録</H3>
      <button onClick={setPreviousStepHandler}>STEP1の選択に戻る</button>
      <SDiv>
        <Card>
          <H4>[選択した資産区分]</H4>
          <STable>
            <thead>
              <STr>
                <STh>ID</STh>
                <STh>構造</STh>
                <STh colSpan={7}>細目等</STh>
                <STh>耐用年数</STh>
              </STr>
            </thead>
            <tbody>
              <STr >
                <STd align='right'>{props.selectedItem.stepOne.id}</STd>
                <STd>{props.selectedItem.stepOne.group}</STd>
                <STd>{props.selectedItem.stepOne.item[0]}</STd>
                <STd>{props.selectedItem.stepOne.item[1]}</STd>
                <STd>{props.selectedItem.stepOne.item[2]}</STd>
                <STd>{props.selectedItem.stepOne.item[3]}</STd>
                <STd>{props.selectedItem.stepOne.item[4]}</STd>
                <STd>{props.selectedItem.stepOne.item[5]}</STd>
                <STd>{props.selectedItem.stepOne.item[6]}</STd>
                <STd align='right'>{props.selectedItem.stepOne.useful_life}</STd>
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
          <select name={DEPRECIATION_METHOD} onChange={onChangeHandler} size={3}>
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
          <SInput
            type='text'
            width='5em'
            placeholder='所在地候補検索'
            onChange={queryWordHandler}
          />
          <select size={3} onChange={locationSelectHandler}>
            {LocationsList}
          </select>
        </label>
      </SDiv>
      <SDiv>
        <SButton onClick={onClickHandler}>プレビュー確認</SButton>
      </SDiv>
    </Fragment>
  )
}