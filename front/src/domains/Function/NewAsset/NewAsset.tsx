import React, {useState} from 'react'

import { FunctionListBase } from '../FunctionListBase'
import NewAssetStepOne from './NewAssetStepOne'
import { NewAssetStepTwo } from './NewAssetStepTwo'
import { NewAssetStepThree } from './NewAssetStepThree'
import { Container } from '../../../materials/Container'
import { H2 } from '../../../materials/Text'
import { ScreenWrapper, ScreenLeft, ScreenRight } from '../../../materials/ScreenDivider'
import { NewAssetProcessProps } from '../../../utilities/types'
import { NewAssetInitialState } from '../../../utilities/initialValue'

export const NewAsset = () => {

  const [selectedItem, setSelectedItem] = useState<NewAssetProcessProps>(NewAssetInitialState)

  const CurrentStep = () => {
    if(selectedItem.stepOne.id) {
      if(selectedItem.stepTwo.asset_item_id){
        return (
          <NewAssetStepThree selectedItem={selectedItem} setSelectedItem={setSelectedItem}/>
        )
      } else {
        return (
          <NewAssetStepTwo selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
        )
      }
    } else {
      return (
        <NewAssetStepOne selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
      )
    }
  }
  
  return (
    <Container>
      <ScreenWrapper>
        <ScreenLeft>
          <FunctionListBase />
        </ScreenLeft>
        <ScreenRight>
          <H2>新規登録</H2>
          <CurrentStep />
        </ScreenRight>
      </ScreenWrapper>
    </Container>
  )
}