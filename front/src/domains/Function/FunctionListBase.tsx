import React, { useState } from 'react'
import styled from 'styled-components'

import { MenuItem } from '../../components/MenuItem'
import { MenuListItemsProps } from '../../utilities/types'

export const FunctionListBase = () => {

  const functionItems: MenuListItemsProps[] = [
    {name:'新規資産の登録', link_to:'/function/new'},
    {name:'既存資産の引き継ぎ', link_to:'/function/transfer'},
    {name:'資産一覧と検索', link_to:'/function/list'},
    {name:'減価償却の実行', link_to:'/function/depreciate'}
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

const FunctionItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

