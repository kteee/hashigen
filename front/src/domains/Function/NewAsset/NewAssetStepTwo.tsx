import React, {Fragment, useState, useEffect, ChangeEvent} from 'react'
import axios from 'axios'
import Select from 'react-select'
import AsyncSelect from 'react-select/async'

import { H3, H4 } from '../../../materials/Text'
import { SInput } from '../../../materials/Input'
import { SButton } from '../../../materials/Button'
import { SDiv, Card,  } from '../../../materials/Div'
import { FlexWrapper, FlexDiv } from '../../../materials/Flex'
import { STable, STr, STh, STd } from '../../../materials/Table'
import { SDl, SDWrapper, SDt, SDd } from '../../../materials/Definition'
import { GET_DEP_METHODS_URL, LOCATIONS_URL } from '../../../utilities/urls'
import { DepreciationMethodsProps, NewAssetProcessProps, ReactSelect, NewAssetItem, NewAssetStepProps } from '../../../utilities/types'
import { DateInput } from '../../../components/DateInput'
import { dateToYYYYMMDDStr } from '../../../utilities/dateManipulate'
import { bg } from '../../../utilities/colors'
import { digitComma } from '../../../utilities/digitComma'


export const NewAssetStepTwo = (props: NewAssetStepProps) => {

  const ASSET_NAME = 'asset-name'
  const DEPRECIATION_METHOD = 'depreciation-method'
  const UNIT_VALUE = 'unit-value'
  const AMOUNT = 'amount'

  const [methods, setMethods] = useState<DepreciationMethodsProps[]>([])
  const [assetName, setAssetName] = useState('')
  const [acquisitionDate, setAcquisitionDate] = useState(new Date())
  const [depreciationStartDate, setDepreciationStartDate] = useState(new Date())
  const [depreciationMethod, setDepreciationMethod] = useState(0)
  const [unitValue, setUnitValue] = useState(0)
  const [amount, setAmount] = useState(1)
  const [acquisitionValue, setAcquisitionValue] = useState(0)
  const [location, setLocation] = useState(0) 
  const [depreciationStartDateInput, setDepreciationStartDateInput] = useState(true)

  
  const getDepMethods = async () => {
    const { data } = await axios.get(GET_DEP_METHODS_URL)
    setMethods(data)
    setDepreciationMethod(data[0].id)
  }

  const getLocations = async (inputValue: string) => {
    const url = `${LOCATIONS_URL}?q=${inputValue}`
    const { data } = await axios.get(url)
    return data
  }

  useEffect(() => {
    getDepMethods()
  }, [])

  useEffect(() => {
    const val = unitValue * amount
    setAcquisitionValue(val)
  }, [unitValue, amount])

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
        setDepreciationMethod(parseInt(e.target.value))
        break
      case UNIT_VALUE:
        setUnitValue(parseInt(e.target.value))
        break
      case AMOUNT:
        setAmount(parseInt(e.target.value))
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
      const stepTwoItem: NewAssetItem = {
        asset_item_id: props.selectedItem.stepOne.id,
        name: assetName,
        acquisition_date: dateToYYYYMMDDStr(acquisitionDate),
        depreciation_start_date: ( depreciationStartDateInput ? dateToYYYYMMDDStr(acquisitionDate) : dateToYYYYMMDDStr(depreciationStartDate)),
        depreciation_method_id: depreciationMethod,
        location_id: location,
        unit_value: unitValue,
        amount: amount,
        acquisition_value: acquisitionValue,
        year_start_book_value: acquisitionValue
      }
      props.setSelectedItem((prevState: NewAssetProcessProps) => ({
        ...prevState,
        stepTwo: stepTwoItem
      }))
    } else {
      alert('必須項目の入力がすべて行われていません')
    }
  }

  const checkHandler = () => {
    setDepreciationStartDateInput(!depreciationStartDateInput)
  }

  const DepreciationStartDate = () => {
    if(!depreciationStartDateInput) {
      return (
        <SDWrapper>
          <SDt>償却開始日</SDt>
          <SDd>
            <DateInput
              selectedState={depreciationStartDate}
              selectHandler={depreciationDateHandler}
            />
          </SDd>
        </SDWrapper>
      )
    } else {
      return null
    }
  }
  
  const promiseOptions = (inputValue: string) =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(getLocations(inputValue));
      }, 100);
    });
  
  const depMethodHandler = (option: any) => {
    setDepreciationMethod(option.value.toString())
  }

  const locationHandler = (option: any) => {
    setLocation(option.value)
  }

  return (
    <Fragment>
      <FlexWrapper>
        <FlexDiv>
          <H3>STEP2. 固定資産情報を登録</H3>
        </FlexDiv>
        <SDiv>
          <SButton
            backgroundColor={bg.maroon}
            color={bg.white}
            onClick={setPreviousStepHandler}
          >STEP1の選択に戻る</SButton>
        </SDiv>
      </FlexWrapper>
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
      <SDl>
        <SDWrapper>
          <SDt>資産名称</SDt>
          <SDd>
            <SInput
              type='text'
              name={ASSET_NAME}
              placeholder='資産名称'
              onChange={onChangeHandler}
            />
          </SDd>
        </SDWrapper>
        <SDWrapper>
          <SDt>取得年月日</SDt>
          <SDd>
            <DateInput
              selectedState={acquisitionDate}
              selectHandler={acquisitionDateHandler}
            />
          </SDd>
        </SDWrapper>
        <SDWrapper>
          <SDt>取得日と同じ日をセットする</SDt>
          <SDd>
            <SInput
              type='checkbox'
              checked={depreciationStartDateInput}
              onChange={checkHandler}
            />
          </SDd>
        </SDWrapper>
          <DepreciationStartDate />
        <SDWrapper>
          <SDt>償却方法</SDt>
          <SDd width='20em'>
            <Select
              options={methods} 
              onChange={depMethodHandler}
            />
          </SDd>
        </SDWrapper>
        <SDWrapper>
          <SDt>所在地</SDt>
          <SDd width='20em'>
            <AsyncSelect
              cacheOptions
              defaultOptions
              loadOptions={promiseOptions}
              onChange={locationHandler}
            />
          </SDd>
        </SDWrapper>
        <SDWrapper>
          <SDt>取得単価</SDt>
          <SDd>
            <SInput
              type='number'
              min='0'
              name={UNIT_VALUE}
              placeholder='取得単価'
              onChange={onChangeHandler}
            />
          </SDd>
        </SDWrapper>
        <SDWrapper>
          <SDt>数量</SDt>
          <SDd>
            <SInput
              type='number'
              min='0'
              name={AMOUNT}
              defaultValue={amount}
              placeholder='数量'
              onChange={onChangeHandler}
            />
          </SDd>
        </SDWrapper>
        <SDWrapper>
          <SDt>取得合計</SDt>
          <SDd>
            {digitComma(acquisitionValue)}
          </SDd>
        </SDWrapper>
  
      </SDl>
      <SDiv>
        <SButton onClick={onClickHandler}>プレビュー確認</SButton>
      </SDiv>
    </Fragment>
  )
}