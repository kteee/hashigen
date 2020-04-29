import React from 'react'
import styled from 'styled-components'

import {FunctionListBase} from './FunctionListBase'
import {Container} from '../../materials/Container'
import { ScreenWrapper, ScreenLeft } from '../../materials/ScreenDivider'

export const FunctionList = () => {

  return (
    <Container>
      <ScreenWrapper>
        <ScreenLeft>
          <FunctionListBase />
        </ScreenLeft>
      </ScreenWrapper>
    </Container>
  )

}
