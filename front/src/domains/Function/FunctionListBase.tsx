import React, { useState } from 'react'
import styled from 'styled-components'

import { MenuItem } from '../../components/MenuItem'
import { MenuListItemsProps } from '../../utilities/types'

export const FunctionListBase = () => {

  const functionItems: MenuListItemsProps[] = [
    {name:'資産登録', link_to:'/function/new'},
    {name:'一覧検索', link_to:'/function/list'},
    {name:'処理承認', link_to:'/function/approval'},
    {name:'簿価増減', link_to:'/function/report'}
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

