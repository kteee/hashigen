import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { RightArrowAlt } from '@styled-icons/boxicons-regular/RightArrowAlt'

import { MenuListItemsProps } from '../utilities/types';

interface MenuItemOuterProps {
  backgroundColor?: string
  color?: string
}

const MenuItemOuter = styled.div`
  background-color: ${(props: MenuItemOuterProps) => props.backgroundColor ? props.backgroundColor : ''};
  color: ${(props: MenuItemOuterProps) => props.color ? props.color : ''};
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

const MenuItemInner = styled.div`
  display: flex;
  align-items: center;
`

const MenuItemName = styled.div`
  flex-grow: 1;
`

const MenuItemArrow = styled.div`
`

export const MenuItem = (props: MenuListItemsProps) => {

  return (
    <MenuItemOuter>
      <StyledLink to={props.link_to}>
        <MenuItemInner>
          <MenuItemName>{props.name}</MenuItemName>
          <MenuItemArrow><RightArrowAlt size='20'/></MenuItemArrow>
        </MenuItemInner>
      </StyledLink>
    </MenuItemOuter>
  )

}