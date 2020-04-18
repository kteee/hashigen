import React, {useState, useEffect, ChangeEvent} from 'react'
import axios from 'axios'
import Pagination from '@material-ui/lab/Pagination';
import styled from 'styled-components'

import FunctionListBase from './FunctionListBase'
import {Container} from '../materials/Container'
import {H2, H3} from '../materials/Text'
import {StyledButton} from '../materials/Button'
import {FlexWrapper} from '../materials/Flex'
import {GET_ASSET_ITEM_URL} from '../utilities/urls'
import {ScreenWrapper, ScreenLeft, ScreenRight} from '../materials/ScreenDivider'

const NewAsset = () => {

  const [assetItems, setAssetItems] = useState([])
  const [currentPage, setCurrentPange] = useState(1)
  const [perPageCount, setPerPageCount] = useState(10)
  const [totalPages, setTotalPages] = useState()
  const [queryWrod, setQueryWordl] = useState('')
  

  const getData = async (page = 1) => {
    const url = `${GET_ASSET_ITEM_URL}?per=${perPageCount}&page=${page}&q=${queryWrod}`
    const { data: { items, pages } } = await axios.get(url)
    setAssetItems(items)
    setTotalPages(parseInt(pages))
  }

  useEffect(() => {    
    getData()
  }, [currentPage, perPageCount, queryWrod])

  const onSelectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setPerPageCount(parseInt(e.target.value))
  }

  const onInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setQueryWordl(e.target.value)
  }

  const pageChanger = (e: ChangeEvent<any>, page: number) => {
    setCurrentPange(page)
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
      <ScreenWrapper>
        <ScreenLeft>
          <FunctionListBase />
        </ScreenLeft>
        <ScreenRight>
          <H2>新規登録</H2>
          <H3>STEP1. 登録資産区分を選択</H3>
            <StyledDiv>
              <StyledInput type='text' name='asset-name' placeholder='検索ワード' onInput={onInputHandler}/>
            </StyledDiv>
            <FlexWrapper>
              <StyledDiv>            
                <Pagination
                  count={totalPages}
                  onChange={pageChanger}
                  page={currentPage}
                />
              </StyledDiv>
              <StyledDiv>
                <label>表示数</label>
                <select onChange={onSelectHandler}>
                  <option></option>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                  <option value={20}>20</option>
                </select>
              </StyledDiv>
            </FlexWrapper>
          <StyledTable>
            <tbody>
              {AssetItems}
            </tbody>
          </StyledTable>
        </ScreenRight>
      </ScreenWrapper>
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

const StyledTable = styled.table`
  margin-top: 1em;
`

export default NewAsset;