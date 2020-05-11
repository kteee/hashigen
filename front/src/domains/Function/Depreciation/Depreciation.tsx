import React from 'react';

import { FunctionListBase } from '../FunctionListBase'
import { Container } from '../../../materials/Container'
import { H2 } from '../../../materials/Text'
import { ScreenWrapper, ScreenLeft, ScreenRight } from '../../../materials/ScreenDivider'
import { DepreciationBase } from './DepreciationBase'

export const Depreciation = () => {
  return (
    <Container>
      <ScreenWrapper>
        <ScreenLeft>
          <FunctionListBase />
        </ScreenLeft>
        <ScreenRight>
          <H2>減価償却実行</H2>
          <DepreciationBase />
        </ScreenRight>
      </ScreenWrapper>
    </Container>
  )
}