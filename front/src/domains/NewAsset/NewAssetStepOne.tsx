import React, {Fragment, useState, useEffect, ChangeEvent} from 'react';
import axios from 'axios'
import Pagination from '@material-ui/lab/Pagination';
import styled from 'styled-components'

import {H3} from '../../materials/Text'
import {StyledInput} from '../../materials/Input'
import {GET_ASSET_ITEM_URL} from '../../utilities/urls'
import {FlexWrapper} from '../../materials/Flex'

interface NewAssetStepOneProps {
  setItemSelected: any
}

const NewAssetStepOne = (props: NewAssetStepOneProps) => {

  const [assetItems, setAssetItems] = useState([])
  const [currentPage, setCurrentPange] = useState(1)
  const [perPageCount, setPerPageCount] = useState(10)
  const [totalPages, setTotalPages] = useState()
  const [queryWrod, setQueryWordl] = useState('')
  

  const getData = async () => {
    const url = `${GET_ASSET_ITEM_URL}?per=${perPageCount}&page=${currentPage}&q=${queryWrod}`
    const { data: { items, pages } } = await axios.get(url)
    setAssetItems(items)
    setTotalPages(parseInt(pages))
  }

  useEffect(() => {    
    getData()
  }, [currentPage, perPageCount, queryWrod])

  const itemSelector = (assetItemId: string | number) => {
    props.setItemSelected(assetItemId)
  }
  
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
      <tr key={index} onClick={() => itemSelector(value.id)}>
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
    <Fragment>
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
    </Fragment>
  );
};

export default NewAssetStepOne;

const StyledDiv = styled.div`
  margin-top: 1em;
`

const StyledTable = styled.table`
  margin-top: 1em;
`