import React, { useState } from 'react'

import { TransferAssetStepOne } from './TransferAssetStepOne'
import { TransferAssetStepTwo } from './TransferAssetStepTwo'
import { Container } from '../../../materials/Container'
import { ScreenWrapper, ScreenLeft, ScreenRight } from '../../../materials/ScreenDivider'
import { FunctionListBase } from '../../Function/FunctionListBase'
import { H2 } from '../../../materials/Text'


export const TransferAsset = () => {

  const [itemSelected, setItemSelected] = useState(null)

  const getDisplayComponent = () => {
    if(itemSelected) {
      return <TransferAssetStepTwo itemSelected={itemSelected} />
    } else {
      return <TransferAssetStepOne setItemSelected={setItemSelected} />
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
          <H2>引き継ぎ登録</H2>
          {DisplayComponent}
        </ScreenRight>
      </ScreenWrapper>
    </Container>
  )
}
