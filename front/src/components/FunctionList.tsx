import React from 'react';
import styled from 'styled-components';

import FunctionItem from './FunctionItem';
import { Container } from '../materials/Container';

export interface functionItemProps {
  name: string
  link_to: string
}

const FunctionList = () => {

  const functionItems: functionItemProps[] = [
    {name:'資産登録', link_to:'/function/new'},
    {name:'資産一覧', link_to:'/function/list'},
    {name:'PL分析', link_to:'/function/pl'},
    {name:'BS分析', link_to:'/function/bs'},
    {name:'税務分析', link_to:'/function/tax'}
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
  );
};

const FunctionItemsWrapper = styled.div`
`;

export default FunctionList;