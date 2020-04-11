import React from 'react';
import styled from 'styled-components';
import { RightArrowAlt } from '@styled-icons/boxicons-regular/RightArrowAlt'

interface FunctionItemProp {
  name: string
}

const FunctionItem = (props: FunctionItemProp) => {
  
  const onClickHandler = (): void => {
    console.log('clicked')
  }

  return (
    <FunctionItemOuter onClick={onClickHandler}>
      <FunctionItemName>{props.name}</FunctionItemName>
      <FunctionItemArrow><RightArrowAlt size='20'/></FunctionItemArrow>
    </FunctionItemOuter>
  );
};

const FunctionItemOuter = styled.div`
  display: flex;
  align-items: center;
  width: 20em;
  padding: 1em;
  border: 1px solid #e6e2d3;
  cursor: pointer;
`;

const FunctionItemName = styled.div`
  flex-grow: 1;
`;

const FunctionItemArrow = styled.div`
`;


export default FunctionItem;