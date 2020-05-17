import React, { useState, Fragment, ChangeEvent } from 'react'

import { H3 } from '../../../materials/Text'
import { STable, STr, STh, STd } from '../../../materials/Table'
import { MyModal } from '../../../components/Modal'
import { SButton } from '../../../materials/Button'
import { FlexWrapper } from '../../../materials/Flex'
import { SInput } from '../../../materials/Input'
import { SDiv } from '../../../materials/Div'


interface AssetSearchOptions {
  id: string
  field: string
  display: boolean
}

export const AssetSearch = () => {

  const initiaValue: AssetSearchOptions[] = [
    {id: '1', field: '名称', display: false},
    {id: '2', field: '償却方法', display: false},
    {id: '3', field: '資産グループ', display: false}
  ]

  const [modalOpen, setModalOpen] = useState(false)
  const [researchFields, setResearchFields] = useState(initiaValue)
  const [researchableFields, setResearchableFields] = useState(initiaValue)

  const showModal = () => {
    setModalOpen(true)
  }

  
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const nextFields = researchableFields.map(field => {
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
    console.log(nextFields)
    // setResearchableFields(nextFields)
  }

  const addFields = () => {
    setModalOpen(false)
  }

  const ResearchableFields = researchableFields.map((field, index: number) => {
    return (
      <STr key={index}>
        <STd>
          {field.field}
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

  const ResearchFields = researchFields.map((field, index: number) => {
    console.log(field)
    if(field.display) {
      return (
        <SDiv key={index}>
          <label>
            {field.field}
            <SInput type='text' />
          </label>
        </SDiv>
      )
    }
  })

  const modalBody = (
    <Fragment>
      <H3>検索項目を追加</H3>
      <STable>
        <thead>
          <STr>
            <STh>項目名</STh>
            <STh>検索項目に指定する</STh>
          </STr>
        </thead>
        <tbody>
          {ResearchableFields}
        </tbody>
      </STable>
      <SButton margin='1em 0 0 0' onClick={addFields}>追加する</SButton>
    </Fragment>
  )

  return (
    <Fragment>
      <FlexWrapper justifyContent='space-between'>
        <H3>検索項目</H3>
        <SButton onClick={showModal}>検索項目設定</SButton>
      </FlexWrapper>
      {ResearchFields}
      <hr/>
      <MyModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        body={modalBody}
      />
    </Fragment>
  );
}