import React from 'react';
import styled from 'styled-components';
import { Link, LinkProps } from 'react-router-dom';

import { H1 } from '../materials/Text';

interface ListItemProps {
  color?: string
}

const StyledHeader = styled.header`
  display: flex;
  height: 4em;
  align-items: center;
  background-color: #db7093;
`;

const FlexGrow1 = styled.div`
  flex-grow: 1;
`;

const HeaderH1 = styled(H1)`
  margin-left: 0.5em;
`;

const Nav = styled.nav`
  height: 100%;
`

const List = styled.ul`
  display: flex;
  list-style: none;
  height: 100%;
  margin: 0;
  align-items: center;
`;

const ListItem = styled.li`
  color: ${(props:ListItemProps) => (props.color ? props.color : 'white')};
  height: 100%;
  padding: 0 1em;
  &:hover {
    background-color: #eea29a;
  }
`;

const CustomLink = styled(Link)`
  display: block;
  width: 100%;
  height: 100%;
  text-decoration: none;
  color: inherit;
  padding: 0 1em;
  line-height: 4em;
`;

export const Header = () => {
  return (
    <StyledHeader>
      <FlexGrow1>
        <CustomLink to='/'><HeaderH1 color='white'>Hashigen</HeaderH1></CustomLink>
      </FlexGrow1>
      <Nav>
        <List>
          <ListItem>
            <CustomLink to='/function'>機能</CustomLink>
          </ListItem>
          <ListItem>
            <CustomLink to='/setting'>設定</CustomLink>
          </ListItem>
          <ListItem>
            <CustomLink to='/logout'>ログアウト</CustomLink>
          </ListItem>
          <ListItem>
            <CustomLink to='/signup'>新規登録</CustomLink>
          </ListItem>
        </List>
      </Nav>
    </StyledHeader>
  )
}