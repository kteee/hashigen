import React from 'react';
import styled from 'styled-components';

import FunctionItem from './FunctionItem';
import { Container } from './Container';

const FunctionList = () => {

  const functionItems: string[] = [
    '資産登録',
    '資産一覧',
    'PL分析',
    'BS分析',
    '税務分析'
  ];

  const FunctionItems = functionItems.map(item => {
    return (
      <FunctionItem name={item} />
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