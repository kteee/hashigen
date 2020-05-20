import React, { useState, ChangeEvent } from 'react'

import { AssetGroup } from './SearchField/AssetGroup'
import { DepMethod } from './SearchField/DepMethod'
import { H3 } from '../../../materials/Text'
import { STable, STr, STh, STd } from '../../../materials/Table'
import { SDl } from '../../../materials/Definition'
import { MyModal } from '../../../components/Modal'
import { SButton } from '../../../materials/Button'
import { FlexWrapper } from '../../../materials/Flex'
import { SInput } from '../../../materials/Input'
import { AssetListToSearchProps } from '../../../utilities/types'

interface SearchField {
  id: string
  fieldName: string
  display: boolean
  render(): JSX.Element
}

export const AssetSearch = (props: AssetListToSearchProps) => {

  const initialValue: SearchField[] = [
    {
      id: '1',
      fieldName: '資産グループ',
      display: false,
      render:() => <AssetGroup onChangeFunc={props.setAssetGroupId} />
    },
    {
      id: '2',
      fieldName: '償却方法',
      display: false,
      render:() => <DepMethod onChangeFunc={props.setDepMethodId} />
    }
  ]

  let currentValue = initialValue
  const [modalOpen, setModalOpen] = useState(false)
  const [searchFields, setSearchFields] = useState(initialValue)
  
  const showModal = () => {
    setModalOpen(true)
  }
  
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const nextValue = searchFields.map(field => {
      if(field.id === e.target.name) {
        field.display = !field.display
        return (
          field
        )
      } else {
        return (
          field
        )
      }
    })
    currentValue = nextValue
  }

  const execModalClose = () => {
    setModalOpen(false)
    setSearchFields(currentValue)
  }

  const SearchableFields = searchFields.map((field, index: number) => {
    return (
      <STr key={index}>
        <STd>
          {field.fieldName}
        </STd>
        <STd align='center'>
          <SInput
            type='checkbox'
            name={field.id}
            defaultChecked={field.display}
            onChange={onChangeHandler}
          />
        </STd>
      </STr>
    )
  })

  const modalBody = (
    <>
      <H3>検索項目を追加</H3>
      <STable>
        <thead>
          <STr>
            <STh>項目名</STh>
            <STh>検索項目に指定する</STh>
          </STr>
        </thead>
        <tbody>
          {SearchableFields}
        </tbody>
      </STable>
      <SButton margin='1em 0 0 0' onClick={execModalClose}>設定する</SButton>
    </>
  )

  const SearchBoxes = searchFields.map(item => {
    if(item.display){
      return item.render()
    } else {
      return null
    }
  })

  return (
    <>
      <FlexWrapper justifyContent='space-between'>
        <H3>検索項目</H3>
        <SButton onClick={showModal}>検索項目設定</SButton>
      </FlexWrapper>
      <SDl>
        {SearchBoxes}
      </SDl>
      <MyModal
        open={modalOpen}
        onClose={execModalClose}
        body={modalBody}
      />
    </>
  );
}