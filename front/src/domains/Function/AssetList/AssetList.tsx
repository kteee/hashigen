import React, { useState, useEffect } from 'react'
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
import { TableHeaderCell } from '../../../utilities/types'

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

  const AssetList = assetList.map((asset: any) => {
    return (
      <StyledTr>
        <StyledTd>{asset.id}</StyledTd>
        <StyledTd>{asset.name}</StyledTd>
        <StyledTd>{asset.acquisition_date}</StyledTd>
        <StyledTd>{asset.acquisition_value}</StyledTd>
        <StyledTd>{asset.useful_life}</StyledTd>
        <StyledTd>{asset.depreciation_method}</StyledTd>
        <StyledTd>{asset.created_at}</StyledTd>
        <StyledTd>{asset.updated_at}</StyledTd>
        <StyledTd><StyledLink to={ pathname + `/${asset.id}`} >詳細</StyledLink></StyledTd>
        <AssetProjectionData key={asset.id} assetId={asset.id} tableHeaderCells={tableHeaderCells} setTableHeaderCells={setTableHeaderCells}/>
      </StyledTr>
    )
  })

  const AssetProjectionHeader = tableHeaderCells.map((cell:TableHeaderCell) => {
    return (
      <StyledTh>{cell.fiscal_year}</StyledTh>
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
                <StyledTh>ID</StyledTh>
                <StyledTh>名称</StyledTh>
                <StyledTh>取得日</StyledTh>
                <StyledTh>取得価格</StyledTh>
                <StyledTh>耐用年数</StyledTh>
                <StyledTh>償却方法</StyledTh>
                <StyledTh>作成日</StyledTh>
                <StyledTh>更新日</StyledTh>
                <StyledTh>詳細</StyledTh>
                {AssetProjectionHeader}
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