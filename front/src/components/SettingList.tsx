import React from 'react';
import styled from 'styled-components'

import FunctionItem from './FunctionItem'
import { Container } from '../materials/Container'

export interface functionItemProps {
  name: string
  link_to: string
}

const FunctionItemsWrapper = styled.div`
`

export const SettingList = () => {
  const functionItems: functionItemProps[] = [
    {name:'資産登録', link_to:'/setting/new'},
    {name:'資産一覧', link_to:'/setting/list'},
    {name:'PL分析', link_to:'/setting/pl'},
    {name:'BS分析', link_to:'/setting/bs'},
    {name:'耐用年数', link_to:'/setting/useful-life'}
  ];

  const FunctionItems = functionItems.map((item, index) => {
    return (
      <FunctionItem key={index} name={item.name} link_to={item.link_to}/>
    )
  })

  return (
    <Container>
      <FunctionItemsWrapper>
        {FunctionItems}
      </FunctionItemsWrapper>
    </Container>
  )

}