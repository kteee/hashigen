import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { RightArrowAlt } from '@styled-icons/boxicons-regular/RightArrowAlt'

import {functionItemProps} from './FunctionListBase';

const FunctionItem = (props: functionItemProps) => {

  return (
    <FunctionItemOuter>
      <StyledLink to={props.link_to}>
        <FunctionItemInner>
          <FunctionItemName>{props.name}</FunctionItemName>
          <FunctionItemArrow><RightArrowAlt size='20'/></FunctionItemArrow>
        </FunctionItemInner>
      </StyledLink>
    </FunctionItemOuter>
  )

}

const FunctionItemOuter = styled.div`
 width: 15em;
  padding: 1em;
  border: 1px solid #e6e2d3;
  cursor: pointer;
`

const StyledLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: inherit;
`

const FunctionItemInner = styled.div`
  display: flex;
  align-items: center;
`

const FunctionItemName = styled.div`
  flex-grow: 1;
`

const FunctionItemArrow = styled.div`
`


export default FunctionItem