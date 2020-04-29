import React from 'react'
import styled from 'styled-components'

import { MenuItem } from '../../components/MenuItem'

export const FunctionListBase = () => {

  const functionItems: functionItemProps[] = [
    {name:'新規資産の登録', link_to:'/function/new'},
    {name:'既存資産の引き継ぎ', link_to:'/function/transfer'},
    {name:'資産一覧', link_to:'/function/list'}
  ];

  const FunctionItems = functionItems.map((item, index) => {
    return (
      <MenuItem key={index} name={item.name} link_to={item.link_to}/>
    )
  })

  return (
    <FunctionItemsWrapper>
      {FunctionItems}
    </FunctionItemsWrapper>
  )
}

export interface functionItemProps {
  name: string
  link_to: string
}

const FunctionItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

