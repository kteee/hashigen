import React from 'react'

import { Container } from '../../../materials/Container'
import { ScreenWrapper, ScreenLeft, ScreenRight } from '../../../materials/ScreenDivider'
import { FunctionListBase } from '../FunctionListBase'
import { AssetListBase } from './AssetListBase'

export const AssetList = () => {
  return (
    <Container>
      <ScreenWrapper>
        <ScreenLeft>
          <FunctionListBase />
        </ScreenLeft>
        <ScreenRight>
          <AssetListBase />
        </ScreenRight>
      </ScreenWrapper>
    </Container>
  )
}