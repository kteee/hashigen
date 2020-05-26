import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'

import { H2 } from '../../../materials/Text'
import { STable, STr, STh, STd } from '../../../materials/Table'
import { AssetSearch } from './AssetSearch'
import { ASSETS_URL } from '../../../utilities/urls'
import { setHeaders } from '../../../utilities/auth'
import { AssetListItem } from '../../../utilities/types'
import { digitComma } from '../../../utilities/digitComma'
import { makeQueryStr } from '../../../utilities/queryStr'
import { SButton } from '../../../materials/Button'

const SLink = styled(Link)`
`

export const AssetListBase = () => {

  const [depMethodId, setDepMethodId] = useState('')
  const [assetGroupId, setAssetGroupId] = useState('')
  const [assetList, setAssetList] = useState<AssetListItem[]>([])
  const { pathname } = useLocation()

  const getAssets = async () => {
    const queryString = makeQueryStr({
      // オブジェクトを渡すとget用のqueryStringを作って返してくれる
      asset_group_id: assetGroupId,
      depreciation_method_id: depMethodId
    })
    const url = `${ASSETS_URL}${queryString}`
    const headers = setHeaders()
    const { data } = await axios.get(url, headers)
    console.log(url)
    console.log(data)
    setAssetList(data)
  }

  useEffect(() => {
    getAssets()
  }, [])

  const AssetList = assetList.map((asset: AssetListItem, index: number) => {
    return (
      <STr key={index}>
        <STd>{asset.id}</STd>
        <STd>{asset.name}</STd>
        <STd>{asset.acquisition_date}</STd>
        <STd align='right'>{digitComma(asset.acquisition_value)}</STd>
        <STd align='right'>{digitComma(asset.useful_life)}</STd>
        <STd>{asset.depreciation_method}</STd>
        <STd>{asset.updated_at}</STd>
        <STd><SLink to={ pathname + `/${asset.id}`} >詳細</SLink></STd>
      </STr>
    )
  })

  const ConditionalBtn = () => {
    if(depMethodId || assetGroupId) {
      return (
        <SButton onClick={getAssets}>検索する</SButton>
      )
    } else {
      return null
    }
  }

  return (
    <Fragment>
      <H2>固定資産一覧</H2>
      <AssetSearch
        setDepMethodId={setDepMethodId}
        setAssetGroupId={setAssetGroupId}
        getAssets={getAssets}
      />
      <ConditionalBtn />
      <hr/>
      <STable>
        <thead>
          <STr>
            <STh>ID</STh>
            <STh>名称</STh>
            <STh>取得日</STh>
            <STh>取得価格</STh>
            <STh>耐用年数</STh>
            <STh>償却方法</STh>
            <STh>作成日</STh>
            <STh>詳細</STh>
          </STr>
        </thead>
        <tbody>
          {AssetList}
        </tbody>
      </STable>
    </Fragment>
  )
}