import React, {Fragment, useState, useEffect, ChangeEvent} from 'react';
import Select from 'react-select'
import axios from 'axios'
import Pagination from '@material-ui/lab/Pagination';

import { H3 } from '../../../materials/Text'
import { SDl, SDWrapper, SDt, SDd } from '../../../materials/Definition'
import { STable, STr, STh, STd } from '../../../materials/Table'
import { SInput } from '../../../materials/Input'
import { SDiv } from '../../../materials/Div'
import { GET_ASSET_ITEMS_URL, GET_ASSET_GROUPS_URL } from '../../../utilities/urls'
import { FlexWrapper } from '../../../materials/Flex'
import { AssetListItemResponse, NewAssetProcessProps, ReactSelect, NewAssetStepProps } from '../../../utilities/types'


const NewAssetStepOne = (props: NewAssetStepProps) => {

  const [assetItems, setAssetItems] = useState<AssetListItemResponse[]>([])
  const [assetGroups, setAssetGroups] = useState<ReactSelect[]>([])
  const [assetGroup, setAssetGroup] = useState('')
  const [currentPage, setCurrentPange] = useState(1)
  const [perPageCount, setPerPageCount] = useState(10)
  const [totalPages, setTotalPages] = useState<number>()
  const [queryWord, setQueryWord] = useState('')
  
  const getAssetItems = async () => {
    const url = `${GET_ASSET_ITEMS_URL}?per=${perPageCount}&page=${currentPage}&q=${queryWord}&group=${assetGroup}`
    const { data: { items, pages } } = await axios.get(url)
    setAssetItems(items)
    setTotalPages(parseInt(pages))
  }

  const getAssetGroups = async () => {
    const { data } = await axios.get(GET_ASSET_GROUPS_URL)
    setAssetGroups(data)
  }

  useEffect(() => {
    getAssetGroups()
  }, [])

  useEffect(() => {    
    getAssetItems()
  }, [currentPage, perPageCount, queryWord, assetGroup])

  const itemSelector = (item: AssetListItemResponse) => {
    props.setSelectedItem((prevState: NewAssetProcessProps) => ({
      ...prevState,
      stepOne: item
    }))
  }
  
  const onSelectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setPerPageCount(parseInt(e.target.value))
  }

  const onInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setQueryWord(e.target.value)
  }

  const pageChanger = (e: ChangeEvent<any>, page: number) => {
    setCurrentPange(page)
  }

  const setAssetGroupId = (option: any) => {
    setAssetGroup(option.value.toString())
  }

  const AssetItems = assetItems.map((value, index: number) => {
    return (
      <STr key={index} onClick={() => itemSelector(value)}>
        <STd align='right'>{value.id}</STd>
        <STd>{value.group}</STd>
        <STd>{value.item[0]}</STd>
        <STd>{value.item[1]}</STd>
        <STd>{value.item[2]}</STd>
        <STd>{value.item[3]}</STd>
        <STd>{value.item[4]}</STd>
        <STd>{value.item[5]}</STd>
        <STd>{value.item[6]}</STd>
        <STd align='right'>{value.useful_life}</STd>
      </STr>
    )
  })

  return (
    <Fragment>
      <H3>STEP1. 登録資産区分を選択</H3>
      <SDl>
        <SDWrapper>
          <SDt>構造<br/>資産グループ</SDt>
          <SDd width='25em'>
            <Select
              options={assetGroups}
              onChange={setAssetGroupId}
            />
          </SDd>
        </SDWrapper>
      </SDl>
      <SDl>
        <SDWrapper>
          <SDt>キーワード<br/>絞り込み</SDt>
          <SDd>
            <SInput
              type='text'
              name='asset-name'
              placeholder='検索ワード'
              onInput={onInputHandler}
            />
          </SDd>
        </SDWrapper>
      </SDl>
      <FlexWrapper>
        <SDiv>            
          <Pagination
            count={totalPages}
            onChange={pageChanger}
            page={currentPage}
          />
        </SDiv>
        <SDiv>
          <label>表示数</label>
          <select onChange={onSelectHandler}>
            <option></option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </SDiv>
      </FlexWrapper>
      <STable>
        <thead>
          <STr>
            <STh>ID</STh>
            <STh>構造</STh>
            <STh colSpan={7}>細目等</STh>
            <STh>耐用年数</STh>
          </STr>
        </thead>
        <tbody>
          {AssetItems}
        </tbody>
      </STable>
    </Fragment>
  );
};

export default NewAssetStepOne;