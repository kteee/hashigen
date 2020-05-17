import React, {useEffect} from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { H1 } from '../materials/Text'
import { setHeaders } from '../utilities/auth'
import { SESSION_URL } from '../utilities/urls'
import { LoginReducerState } from '../utilities/types'
import { loginAction } from '../reducer/action'
import { bg, text } from '../utilities/colors'

interface ListItemProps {
  color?: string
}

const StyledHeader = styled.header`
  display: flex;
  height: 4em;
  align-items: center;
  background-color: ${bg.teal};
  color: ${text.white};
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
  color: ${(props:ListItemProps) => (props.color ? props.color : text.white)};
  height: 100%;
  padding: 0 1em;
  &:hover {
    background-color: ${bg.aqua};
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

interface StoreState {
  loginReducer: LoginReducerState
}

const loginSelector = (state: StoreState) => state.loginReducer.loggedIn

export const Header = () => {

  const isLoggedin = useSelector(loginSelector) 
  const dispatch = useDispatch()

  const validateToken = async () => {
    const tokenExpDateStr = localStorage.getItem('exp')
    if(typeof tokenExpDateStr === 'string') {
      const tokenExpDate = new Date(tokenExpDateStr)
      const currentDate = new Date()
      if(tokenExpDate > currentDate) {
        const headers = setHeaders()
        const { status, data: { account_id } } = await axios.post(SESSION_URL, {}, headers)
        if(status===200) {
          dispatch(loginAction(account_id))
        }
      }
    }
  }    
  
  useEffect(() => {
    validateToken() 
  }, [])

  const setMenuList = () => {
    if(isLoggedin){
      return (
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
      </List>
      )
    } else {
      return (
        <List>
          <ListItem>
            <CustomLink to='/login'>ログイン</CustomLink>
          </ListItem>
        </List>
      )
    }
  }

  const MenuList = setMenuList()

  return (
    <StyledHeader>
      <FlexGrow1>
        <CustomLink to='/'><HeaderH1 color={text.white}>Hashigen</HeaderH1></CustomLink>
      </FlexGrow1>
      <Nav>
        {MenuList}
      </Nav>
    </StyledHeader>
  )
}