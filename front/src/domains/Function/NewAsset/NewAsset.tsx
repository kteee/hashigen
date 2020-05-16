import React, {useState} from 'react'

import { FunctionListBase } from '../FunctionListBase'
import NewAssetStepOne from './NewAssetStepOne'
import { NewAssetStepTwo } from './NewAssetStepTwo'
import { NewAssetStepThree } from './NewAssetStepThree'
import { Container } from '../../../materials/Container'
import { H2 } from '../../../materials/Text'
import { ScreenWrapper, ScreenLeft, ScreenRight } from '../../../materials/ScreenDivider'
import { NewAssetProcessProps } from '../../../utilities/types'

export const NewAsset = () => {

  const initialState: NewAssetProcessProps = {
    stepOne: {
      id: 0,
      group: '',
      item: [],
      useful_life: 0
    },
    stepTwo: { 
      asset_item_id: 0,
      name: '',
      acquisition_date: '',
      depreciation_start_date: '',
      depreciation_method_id: 0,
      acquisition_value: 0,
      year_start_book_value: 0,
      location_id: 0
    }
  }
  const [selectedItem, setSelectedItem] = useState<NewAssetProcessProps>(initialState)

  const getDisplayComponent = () => {
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
  
  const DisplayComponent = getDisplayComponent()

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