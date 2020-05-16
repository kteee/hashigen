import React, {useState} from 'react';

import { FunctionListBase } from '../FunctionListBase'
import { Container } from '../../../materials/Container'
import { H2 } from '../../../materials/Text'
import { ScreenWrapper, ScreenLeft, ScreenRight } from '../../../materials/ScreenDivider'
import { DepreciationStepOne } from './DepreciationStepOne'
import { DepreciationStepTwo } from './DepreciationStepTwo'
import { DepreciationMonth } from '../../../utilities/types'


export const Depreciation = () => {

  const [selectedMonths, setSelectedMonths] = useState<DepreciationMonth[]>([])

  const setDepreciation = () => {
    if(selectedMonths.length > 0){
      return (
        <DepreciationStepTwo
          selectedMonths={selectedMonths}
          setSelectedMonths={setSelectedMonths}
        />
      )
    } else {
      return (
        <DepreciationStepOne
          selectedMonths={selectedMonths}
          setSelectedMonths={setSelectedMonths}
        />
      )
    }
  }

  const Depreciation = setDepreciation()

  return (
    <Container>
      <ScreenWrapper>
        <ScreenLeft>
          <FunctionListBase />
        </ScreenLeft>
        <ScreenRight>
          <H2>減価償却実行</H2>
          {Depreciation}
        </ScreenRight>
      </ScreenWrapper>
    </Container>
  )
}