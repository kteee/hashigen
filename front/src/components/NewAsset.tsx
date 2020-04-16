import React, {useState, useEffect, ChangeEvent} from 'react'
import axios from 'axios'
import styled from 'styled-components'

import {Container} from '../materials/Container'
import {H2} from '../materials/Text'
import {StyledButton} from '../materials/Button'
import {GET_ASSET_ITEM_URL} from '../utilities/urls'

const NewAsset = () => {

  const [assetItems, setAssetItems] = useState([])
  const [currentPage, setCurrentPage] = useState('1')
  const [perPageCount, setPerPageCount] = useState('10')
  const [totalPages, setTotalPages] = useState()
  

  const getData = async () => {
    const url = `${GET_ASSET_ITEM_URL}?per=${perPageCount}&page=${currentPage}`
    const { data: { items, pages } } = await axios.get(url)
    setAssetItems(items)
    setTotalPages(pages)
    console.log(items)
    console.log(pages)
  }

  useEffect(() => {    
    getData()
  }, [])

  const onSelectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setPerPageCount(e.target.value)
  }

  const onClickHandler = () => {
    getData()
  }

  let AssetItems = assetItems.map((value: any, index: number) => {
    return (
      <tr key={index}>
        <td>{value.id}</td>
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
        <label>表示数</label>
        <select id='disp-num' onChange={onSelectHandler}>
          <option></option>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
      </StyledDiv>
      <StyledDiv>
        <StyledButton onClick={onClickHandler}>検索する</StyledButton>
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