import React, {useState} from 'react'

import {FunctionListBase} from '../FunctionListBase'
import NewAssetStepOne from './NewAssetStepOne'
import {NewAssetStepTwo} from './NewAssetStepTwo'
import {Container} from '../../../materials/Container'
import {H2} from '../../../materials/Text'
import {ScreenWrapper, ScreenLeft, ScreenRight} from '../../../materials/ScreenDivider'

export const NewAsset = () => {

  const [itemSelected, setItemSelected] = useState(null)

  const getDisplayComponent = () => {
    if(itemSelected) {
      return <NewAssetStepTwo itemSelected={itemSelected} />
    } else {
      return <NewAssetStepOne setItemSelected={setItemSelected} />
    }
  }
  
  let DisplayComponent = getDisplayComponent()

  return (
    <Container>
      <ScreenWrapper>
        <ScreenLeft>
          <FunctionListBase />
        </ScreenLeft>
        <ScreenRight>
          <H2>新規登録</H2>
          {DisplayComponent}
        </ScreenRight>
      </ScreenWrapper>
    </Container>
  )
}