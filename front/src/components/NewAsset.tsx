import React, {useEffect} from 'react'
import styled from 'styled-components'

import {Container} from '../materials/Container'
import {H2} from '../materials/Text'
import {StyledButton} from '../materials/Button'
import {getApiData} from '../utilities/getApiData'
import {GET_ASSET_ITEM_URL} from '../utilities/urls'

const NewAsset = () => {

  useEffect(() => {
    const getData = async () => {
      const data = await getApiData(GET_ASSET_ITEM_URL)
      console.log(data)
    } 
    getData()
  }, [])
  

  return (
    <Container>
      <H2>新規登録</H2>
      <StyledDiv>
        <StyledInput type='text' name='asset-name' placeholder='資産名'/>
      </StyledDiv>
      <StyledDiv>
        <StyledButton>登録する</StyledButton>
      </StyledDiv>
    </Container>
  );
};

interface StyledInputProps{
  type?: string
  name?: string
  placeholder?: string
}

const StyledDiv = styled.div`
  margin-top: 1em;
`

const StyledInput = styled.input.attrs((props: StyledInputProps) => ({
  type: props.type ? props.type : undefined,
  name: props.name ? props.name : undefined,
  placeholder: props.placeholder ? props.placeholder : undefined
}))`
  width: 20em;
  font-size: 1.2em;
`

export default NewAsset;