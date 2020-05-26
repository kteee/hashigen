import React, { useState, useEffect, Fragment } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'

import { Container } from '../../../materials/Container'
import { ScreenWrapper, ScreenLeft, ScreenRight } from '../../../materials/ScreenDivider'
import { SButton } from '../../../materials/Button'
import { FlexWrapper } from '../../../materials/Flex'
import { FunctionListBase } from '../FunctionListBase'
import { Detail } from './Info/Detail'
import { Accounting } from './Info/Accounting'
import { Transactions } from './Info/Transactions'
import { ASSETS_URL } from '../../../utilities/urls'
import { AssetDetailResponse } from '../../../utilities/types'
import { bg, text, border } from '../../../utilities/colors'
import { setHeaders } from '../../../utilities/auth'
import { showMessage } from '../../../reducer/action'

export const AssetDetail = () => {

  const initialObject = {
    detail: {
      account_id: 0,
      acquisition_date: '',
      acquisition_value: 0,
      asset_item_id: 0,
      created_at: '',
      depreciation_method_id: 0,
      depreciation_start_date: '',
      id: 0,
      prefecture: '',
      city: '',
      name: '',
      updated_at: '',
      year_start_book_value: 0
    },
    accounting: {
      asset_group: {
        asset_type_id: 0,
        created_at: '',
        id: 0,
        name: '',
        updated_at: ''
      },
      asset_item: {
        asset_group_id: 0,
        created_at: '',
        id: 0,
        item: '',
        updated_at: '',
        useful_life_id: 0
      },
      asset_type: null,
      dep_method: {
        created_at: '',
        display_name: '',
        id: 0,
        name: '',
        updated_at: ''
      }
    },
    transactions: []
  }
  
  const [assetDetail, setAssetDetail] = useState<AssetDetailResponse>(initialObject)
  
  const { id: assetId } = useParams()
  const history = useHistory()
  const dispatch = useDispatch()

  const getAsset = async () => {
    const url = `${ASSETS_URL}/${assetId}`
    const headers = setHeaders()
    const { data } = await axios.get(url, headers)
    setAssetDetail(data)
  }
  
  useEffect(() => {
    getAsset()
  }, [])

  const deleteAsset = async () => {
    const url = `${ASSETS_URL}/${assetId}`
    const headers = setHeaders()
    const { status } = await axios.delete(
      url,
      headers
    )
    if(status === 201) {
      history.push({pathname: '/function/list'})
      dispatch(showMessage('削除しました'))
    } else {
      alert('処理に失敗したかもしれません')
    }
  }

  const execDeleteAsset = () => {
    if(window.confirm('現時点では復元機能はありませんが、本当に削除してよろしいですか？')){
      deleteAsset()
    }
  }

  return (
    <Container>
      <ScreenWrapper>
        <ScreenLeft>
          <FunctionListBase />
        </ScreenLeft>
        <ScreenRight>
          <FlexWrapper justifyContent='flex-end' padding='1em 0'>
            <SButton onClick={execDeleteAsset} backgroundColor={bg.red} color={text.silver}>削除する</SButton>
          </FlexWrapper>
          <Detail detail={assetDetail.detail}/>
          <Accounting  accounting={assetDetail.accounting}/>
          <Transactions  transactions={assetDetail.transactions}/>
        </ScreenRight>
      </ScreenWrapper>
    </Container>
  )
}