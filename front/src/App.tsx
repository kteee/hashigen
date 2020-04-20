import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'

import { Header } from './components/Header'
import { Signup } from './domains/Signup/Signup'
import { FunctionList } from './domains/Function/FunctionList'
import { NewAsset } from './domains/Function/NewAsset/NewAsset'
import { AssetList } from './domains/Function/AssetList/AssetList'
import { AssetDetail } from './domains/Function/AssetList/AssetDetail'
import { SettingList } from './domains/Setting/SettingList'
import { Account } from './domains/Setting/Account/Account'
import { UsefulLife } from './domains/Setting/UsefulLife/UsefulLife'

const App = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <GlobalStyle />
        <Header />
        <Switch>
          <Route exact path='/signup' component={Signup}/>
          <Route exact path='/function' component={FunctionList}/>
          <Route exact path='/function/new' component={NewAsset}/>
          <Route exact path='/function/list' component={AssetList}/>
          <Route exact path='/function/list/:id'><AssetDetail /></Route>
          <Route exact path='/setting' component={SettingList}/>
          <Route exact path='/setting/account' component={Account}/>
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
