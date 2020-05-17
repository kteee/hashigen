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

const SLink = styled(Link)`
`

export const AssetListBase = () => {

  const [assetList, setAssetList] = useState<AssetListItem[]>([])
  const { pathname } = useLocation()

  const getAssets = async () => {
    const headers = setHeaders()
    const { data } = await axios.get(ASSETS_URL, headers)
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

  return (
    <Fragment>
      <H2>固定資産一覧</H2>
      <AssetSearch />
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