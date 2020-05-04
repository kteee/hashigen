import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import { Container } from '../../../materials/Container'
import { ScreenWrapper, ScreenLeft, ScreenRight } from '../../../materials/ScreenDivider'
import { FunctionListBase } from '../FunctionListBase'
import { StyledTable } from '../../../materials/Table'
import { ASSETS_URL } from '../../../utilities/urls'
import { AssetDetailResponse, DepSimulationResponse } from '../../../utilities/types'
import { setHeaders } from '../../../utilities/auth'

export const AssetDetail = () => {
  
  const [depSimulation, setDepSimulation] = useState<DepSimulationResponse[] | undefined>(undefined)
  
  const { id } = useParams()

  const getAsset = async () => {
    const url = `${ASSETS_URL}/${id}`
    const headers = setHeaders()
    const { data } = await axios.get(url, headers)
    console.log(data)
    setDepSimulation(data)
  }
  
  useEffect(() => {
    getAsset()
  }, [])

  const showAssetInfo = () => {
    if(depSimulation != undefined) {
      const DepSimulation = depSimulation.map((item: DepSimulationResponse) => {
        return (
          <tr>
            <td>{item.fiscal_year}</td>
            <td>{item.fiscal_year_month}</td>
            <td>{item.amount}</td>
          </tr>
        )
      })
      return DepSimulation
    } else {
      return (
        <p>通信中..</p>
      )
    }
  }

  const Asset = showAssetInfo()

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
                <th>年</th>
                <th>月</th>
                <th>金額</th>
              </tr>
            </thead>
            <tbody>
              {Asset}
            </tbody>
          </StyledTable>
        </ScreenRight>
      </ScreenWrapper>
    </Container>
  )
}