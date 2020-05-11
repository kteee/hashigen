import React, {useState} from 'react'

import { FunctionListBase } from '../FunctionListBase'
import NewAssetStepOne from './NewAssetStepOne'
import { NewAssetStepTwo } from './NewAssetStepTwo'
import { Container } from '../../../materials/Container'
import { H2 } from '../../../materials/Text'
import { ScreenWrapper, ScreenLeft, ScreenRight } from '../../../materials/ScreenDivider'
import { AssetItemsResponse } from '../../../utilities/types'

export const NewAsset = () => {

  const [selectedItem, setSelectedItem] = useState<AssetItemsResponse>()

  const getDisplayComponent = () => {
    console.log(selectedItem)
    if(selectedItem) {
      return <NewAssetStepTwo selectedItem={selectedItem} />
    } else {
      return <NewAssetStepOne setSelectedItem={setSelectedItem} />
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
          <H2>新規登録</H2>
          {DisplayComponent}
        </ScreenRight>
      </ScreenWrapper>
    </Container>
  )
}