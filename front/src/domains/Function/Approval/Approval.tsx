import React, {useState} from 'react';

import { FunctionListBase } from '../FunctionListBase'
import { Container } from '../../../materials/Container'
import { H2 } from '../../../materials/Text'
import { ScreenWrapper, ScreenLeft, ScreenRight } from '../../../materials/ScreenDivider'
import { ApprovalStepOne } from './ApprovalStepOne'
import { ApprovalStepTwo } from './ApprovalStepTwo'
import {  } from '../../../utilities/types'


export const Approval = () => {

  const [selectedMonths, setSelectedMonths] = useState([])

  const Depreciation = () => {
    // if(selectedMonths.length > 0){
    //   return (
    //     <ApprovalStepTwo
    //       selectedMonths={selectedMonths}
    //       setSelectedMonths={setSelectedMonths}
    //     />
    //   )
    // } else {
    //   return (
    //     <ApprovalStepOne
    //       selectedMonths={selectedMonths}
    //       setSelectedMonths={setSelectedMonths}
    //     />
    //   )
    // }
    return (
      <ApprovalStepOne/>
      // <ApprovalStepOne
      //   selectedMonths={selectedMonths}
      //   setSelectedMonths={setSelectedMonths}
      // />
    )
  }

  return (
    <Container>
      <ScreenWrapper>
        <ScreenLeft>
          <FunctionListBase />
        </ScreenLeft>
        <ScreenRight>
          <H2>取引承認</H2>
          <Depreciation />
        </ScreenRight>
      </ScreenWrapper>
    </Container>
  )
}