import React from 'react';
import styled from 'styled-components'

import { MenuItem } from '../../components/MenuItem'
import {MenuListItemsProps } from '../../utilities/types'

const FunctionItemsWrapper = styled.div`
`

export const SettingListBase = () => {
  const functionItems: MenuListItemsProps[] = [
    {name:'アカウント', link_to:'/setting/account'},
    {name:'会計期間', link_to:'/setting/accounting-period'},
    {name:'ユーザー', link_to:'/setting/user'},
    {name:'耐用年数', link_to:'/setting/useful-life'}
  ];

  const FunctionItems = functionItems.map((item, index) => {
    return (
      <MenuItem key={index} name={item.name} link_to={item.link_to} />
    )
  })

  return (
    <FunctionItemsWrapper>
      {FunctionItems}
    </FunctionItemsWrapper>
  )

}