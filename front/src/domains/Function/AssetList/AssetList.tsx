import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'

import { Container } from '../../../materials/Container'
import { ScreenWrapper, ScreenLeft, ScreenRight } from '../../../materials/ScreenDivider'
import { FunctionListBase } from '../FunctionListBase'
import { AssetProjectionData } from './AssetProjectionData'
import { StyledTable, StyledTr, StyledTh, StyledTd } from '../../../materials/Table'
import { ASSETS_URL } from '../../../utilities/urls'
import { setHeaders } from '../../../utilities/auth'
import { TableHeaderCell, AssetDetailResponse } from '../../../utilities/types'

const StyledLink = styled(Link)`
`

export const AssetList = () => {

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
      <StyledTr>
        <StyledTd>{asset.id}</StyledTd>
        <StyledTd>{asset.name}</StyledTd>
        <StyledTd align='right'>{asset.acquisition_value}</StyledTd>
        <StyledTd>{asset.useful_life}</StyledTd>
        <StyledTd>{asset.depreciation_method}</StyledTd>
        <StyledTd>{asset.acquisition_date}</StyledTd>
        <StyledTd>{asset.updated_at}</StyledTd>
        <StyledTd><StyledLink to={ pathname + `/${asset.id}`} >詳細</StyledLink></StyledTd>
        <AssetProjectionData key={asset.id} assetId={asset.id} tableHeaderCells={tableHeaderCells} setTableHeaderCells={setTableHeaderCells}/>
      </StyledTr>
    )
  })

  const AssetProjectionHeaderFirstRow = tableHeaderCells.map((cell:TableHeaderCell) => {
    return (
      <StyledTh>{cell.fiscal_year}</StyledTh>
    )
  })

  const AssetProjectionHeaderSecondRow = tableHeaderCells.map((cell:TableHeaderCell) => {
    return (
      <StyledTh>{cell.fiscal_year_month}</StyledTh>
    )
  })

  return (
    <Container>
      <ScreenWrapper>
        <ScreenLeft>
          <FunctionListBase />
        </ScreenLeft>
        <ScreenRight>
          <StyledTable>
            <thead>
              <StyledTr>
                <StyledTh rowSpan={2}>ID</StyledTh>
                <StyledTh rowSpan={2}>名称</StyledTh>
                <StyledTh rowSpan={2}>取得日</StyledTh>
                <StyledTh rowSpan={2}>取得価格</StyledTh>
                <StyledTh rowSpan={2}>耐用年数</StyledTh>
                <StyledTh rowSpan={2}>償却方法</StyledTh>
                <StyledTh rowSpan={2}>作成日</StyledTh>
                <StyledTh rowSpan={2}>更新日</StyledTh>
                <StyledTh rowSpan={2}>詳細</StyledTh>
                {AssetProjectionHeaderFirstRow}
              </StyledTr>
              <StyledTr>
                {AssetProjectionHeaderSecondRow}
              </StyledTr>
            </thead>
            <tbody>
              {AssetList}
            </tbody>
          </StyledTable>
        </ScreenRight>
      </ScreenWrapper>
    </Container>
  )
}