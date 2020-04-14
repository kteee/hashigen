import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'

import Header from './components/Header'
import FunctionList from './components/FunctionList'
import SettingList from './components/SettingList'
import NewAsset from './components/NewAsset'

const App = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <GlobalStyle />
        <Header />
        <Switch>
          <Route exact path='/function' component={FunctionList}/>
          <Route exact path='/function/new' component={NewAsset}/>
          <Route exact path='/setting' component={SettingList}/>
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  )
}

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

export default App
