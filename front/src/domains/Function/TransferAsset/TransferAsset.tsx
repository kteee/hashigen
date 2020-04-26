import React from 'react'
import { Container } from '../../../materials/Container'
import { ScreenWrapper, ScreenLeft, ScreenRight } from '../../../materials/ScreenDivider'
import { FunctionListBase } from '../../Function/FunctionListBase'

export const TransferAsset = () => {
  return (
    <Container>
      <ScreenWrapper>
        <ScreenLeft>
          <FunctionListBase />
        </ScreenLeft>
        <ScreenRight>
          <div>hogehoge</div>
        </ScreenRight>
      </ScreenWrapper>
    </Container>
  )
}
