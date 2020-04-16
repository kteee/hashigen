import React, {useState, useEffect} from 'react'
import axios from 'axios'
import styled from 'styled-components'

import {Container} from '../materials/Container'
import {H2} from '../materials/Text'
import {StyledButton} from '../materials/Button'
import {GET_ASSET_ITEM_URL} from '../utilities/urls'

const NewAsset = () => {

  const [assetItems, setAssetItems] = useState([])

  useEffect(() => {
    const getData = async () => {
      const { data: { items } } = await axios.get(GET_ASSET_ITEM_URL)
      setAssetItems(items)
    }
    getData()
  }, [])

  let AssetItems = assetItems.map((value: any, index: number) => {
    return (
      <tr key={index}>
        <td>{value.group}</td>
        <td>{value.item[0]}</td>
        <td>{value.item[1]}</td>
        <td>{value.item[2]}</td>
        <td>{value.item[3]}</td>
        <td>{value.item[4]}</td>
        <td>{value.item[5]}</td>
        <td>{value.item[6]}</td>
        <td>{value.useful_life}</td>
      </tr>
    )
  })

  return (
    <Container>
      <H2>新規登録</H2>
      <StyledDiv>
        <StyledInput type='text' name='asset-name' placeholder='資産名'/>
      </StyledDiv>
      <StyledDiv>
        <StyledButton>登録する</StyledButton>
      </StyledDiv>
      <table>
        <tbody>
          {AssetItems}
        </tbody>
      </table>
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