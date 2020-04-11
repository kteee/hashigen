import React from 'react';
import styled from 'styled-components';
import { Link, LinkProps } from 'react-router-dom';

import { H1 } from '../utils/Text';

const Header = () => {
  return (
    <header>
      <HeaderWrapper>
      <FlexGrow1>
        <CustomLink to='/'><HeaderH1 color='white'>Hashigen</HeaderH1></CustomLink>
      </FlexGrow1>
      <nav>
        <List>
          <CustomLink to='/function'><ListItem >機能</ListItem></CustomLink>
          <CustomLink to='/setting'><ListItem >設定</ListItem></CustomLink>
          <CustomLink to='/login'><ListItem >ログイン</ListItem></CustomLink>
        </List>
      </nav>
      </HeaderWrapper>
    </header>
  )
}

interface ListItemProps {
  color?: string
}

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #db7093;
`;

const FlexGrow1 = styled.div`
  flex-grow: 1;
`;

const HeaderH1 = styled(H1)`
  margin-left: 0.5em;
`;

const List = styled.ul`
  display: flex;
  list-style: none;
`;

const CustomLink = styled(Link)`
  text-decoration: none;
`;

const ListItem = styled.li`
  color: ${(props:ListItemProps) => (props.color ? props.color : 'white')};
  margin-right: 0.5em;
  padding: 0.3em 1em;
  border-radius: 0.3em;
  &:hover {
    background-color: #eea29a;
  }
`;

export default Header;