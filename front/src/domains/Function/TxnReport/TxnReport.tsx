import React, { useState } from 'react'

import { TxnReportBase } from './TxnReportBase'
import { Container } from '../../../materials/Container'
import { ScreenWrapper, ScreenLeft, ScreenRight } from '../../../materials/ScreenDivider'
import { FunctionListBase } from '../../Function/FunctionListBase'


export const TxnReport = () => {
  
  return (
    <Container>
      <ScreenWrapper>
        <ScreenLeft>
          <FunctionListBase />
        </ScreenLeft>
        <ScreenRight>
          <TxnReportBase />
        </ScreenRight>
      </ScreenWrapper>
    </Container>
  )
}
