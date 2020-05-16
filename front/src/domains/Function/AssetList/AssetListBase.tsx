import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'

import { STable, STr, STh, STd } from '../../../materials/Table'
import { ASSETS_URL } from '../../../utilities/urls'
import { setHeaders } from '../../../utilities/auth'
import { TableHeaderCell, AssetDetailResponse } from '../../../utilities/types'

const SLink = styled(Link)`
`

export const AssetListBase = () => {

  const [assetList, setAssetList] = useState([])
  const { pathname } = useLocation()

  const getAssets = async () => {
    const headers = setHeaders()
    const { data: { assets } } = await axios.get(ASSETS_URL, headers)
    setAssetList(assets)
  }

  useEffect(() => {
    getAssets()
  }, [])

  const AssetList = assetList.map((asset: AssetDetailResponse, index: number) => {
    return (
      <STr key={index}>
        <STd>{asset.id}</STd>
        <STd>{asset.name}</STd>
        <STd>{asset.acquisition_date}</STd>
        <STd align='right'>{asset.acquisition_value}</STd>
        <STd align='right'>{asset.useful_life}</STd>
        <STd>{asset.depreciation_method}</STd>
        <STd>{asset.updated_at}</STd>
        <STd><SLink to={ pathname + `/${asset.id}`} >詳細</SLink></STd>
      </STr>
    )
  })

  return (
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
  )
}