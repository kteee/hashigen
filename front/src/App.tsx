import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'

import Header from './components/Header'
import FunctionList from './components/FunctionList'
import NewAsset from './domains/NewAsset/NewAsset'
import SettingList from './components/SettingList'
import UsefulLife from './components/UsefulLife'

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
          <Route exact path='/setting/useful-life' component={UsefulLife}/>
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
