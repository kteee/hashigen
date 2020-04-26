import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'

import { Container } from '../../../materials/Container'
import { ScreenWrapper, ScreenLeft, ScreenRight } from '../../../materials/ScreenDivider'
import { FunctionListBase } from '../FunctionListBase'
import { StyledTable } from '../../../materials/Table'
import { ASSETS_URL } from '../../../utilities/urls'

const StyledLink = styled(Link)`

`

export const AssetList = () => {

  const [assetList, setAssetList] = useState([])
  const { pathname } = useLocation()

  const getAssets = async () => {
    const { data: { data } } = await axios.get(ASSETS_URL)
    setAssetList(data)
  }

  useEffect(() => {
    getAssets()
  }, [])

  const AssetList = assetList.map((asset: any) => {
    return (
      <tr>
        <td>{asset.id}</td>
        <td>{asset.name}</td>
        <td>{asset.acquisition_date}</td>
        <td>{asset.acquisition_value}</td>
        <td>{asset.useful_life}</td>
        <td>{asset.depreciation_method}</td>
        <td>{asset.created_at}</td>
        <td>{asset.updated_at}</td>
        <td><StyledLink to={ pathname + `/${asset.id}`} >詳細</StyledLink></td>
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
          <StyledTable>
            <thead>
              <tr>
                <th>ID</th>
                <th>名称</th>
                <th>取得日</th>
                <th>取得価格</th>
                <th>耐用年数</th>
                <th>償却方法</th>
                <th>作成日</th>
                <th>更新日</th>
                <th>詳細</th>
              </tr>
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