import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { RightArrowAlt } from '@styled-icons/boxicons-regular/RightArrowAlt'

import {functionItemProps} from './FunctionList';

const FunctionItem = (props: functionItemProps) => {

  return (
    <StyledLink to={props.link_to}>
      <FunctionItemOuter>
        <FunctionItemName>{props.name}</FunctionItemName>
        <FunctionItemArrow><RightArrowAlt size='20'/></FunctionItemArrow>
      </FunctionItemOuter>
    </StyledLink>
  )

}

const StyledLink = styled(Link)`
  display: inline-block;
  text-decoration: none;
  color: inherit;
`

const FunctionItemOuter = styled.div`
  display: flex;
  align-items: center;
  width: 20em;
  padding: 1em;
  border: 1px solid #e6e2d3;
  cursor: pointer;
`

const FunctionItemName = styled.div`
  flex-grow: 1;
`

const FunctionItemArrow = styled.div`
`


export default FunctionItem