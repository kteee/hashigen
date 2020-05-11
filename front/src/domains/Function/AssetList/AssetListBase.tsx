import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'

import { DepreciationProjection } from '../../../components/DepreciationProjection'
import { STable, STr, STh, STd } from '../../../materials/Table'
import { ASSETS_URL } from '../../../utilities/urls'
import { setHeaders } from '../../../utilities/auth'
import { TableHeaderCell, AssetDetailResponse } from '../../../utilities/types'

const SLink = styled(Link)`
`

export const AssetListBase = () => {

  const [assetList, setAssetList] = useState([])
  const [tableHeaderCells, setTableHeaderCells] = useState<TableHeaderCell[]>([])
  const { pathname } = useLocation()

  const getAssets = async () => {
    const headers = setHeaders()
    const { data: { assets } } = await axios.get(ASSETS_URL, headers)
    setAssetList(assets)
  }

  useEffect(() => {
    getAssets()
  }, [])

  const AssetList = assetList.map((asset: AssetDetailResponse) => {
    console.log(asset)
    return (
      <STr>
        <STd>{asset.id}</STd>
        <STd>{asset.name}</STd>
        <STd>{asset.acquisition_date}</STd>
        <STd align='right'>{asset.acquisition_value}</STd>
        <STd align='right'>{asset.useful_life}</STd>
        <STd>{asset.depreciation_method}</STd>
        <STd>{asset.updated_at}</STd>
        <STd><SLink to={ pathname + `/${asset.id}`} >詳細</SLink></STd>
        <DepreciationProjection key={asset.id} assetId={asset.id} tableHeaderCells={tableHeaderCells} setTableHeaderCells={setTableHeaderCells}/>
      </STr>
    )
  })

  const AssetProjectionHeaderFirstRow = tableHeaderCells.map((cell:TableHeaderCell) => {
    return (
      <STh>{cell.fiscal_year}</STh>
    )
  })

  const AssetProjectionHeaderSecondRow = tableHeaderCells.map((cell:TableHeaderCell) => {
    return (
      <STh>{cell.fiscal_year_month}</STh>
    )
  })

  return (
    <STable>
      <thead>
        <STr>
          <STh rowSpan={2}>ID</STh>
          <STh rowSpan={2}>名称</STh>
          <STh rowSpan={2}>取得日</STh>
          <STh rowSpan={2}>取得価格</STh>
          <STh rowSpan={2}>耐用年数</STh>
          <STh rowSpan={2}>償却方法</STh>
          <STh rowSpan={2}>作成日</STh>
          <STh rowSpan={2}>詳細</STh>
          {AssetProjectionHeaderFirstRow}
        </STr>
        <STr>
          {AssetProjectionHeaderSecondRow}
        </STr>
      </thead>
      <tbody>
        {AssetList}
      </tbody>
    </STable>
  )
}