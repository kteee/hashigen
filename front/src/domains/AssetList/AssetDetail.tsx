import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import { Container } from '../../materials/Container'
import { StyledDl, StyledDt, StyledDd } from '../../materials/Definition'
import { GET_ASSET_RETRIEVE_URL } from '../../utilities/urls'
import { AssetDetailResponse, DepSimulationResponse } from '../../utilities/types'

export const AssetDetail = () => {
  
  const [asset, setAsset] = useState<AssetDetailResponse | undefined>(undefined)
  const [depSimulation, setDepSimulation] = useState<DepSimulationResponse[] | undefined>(undefined)
  
  const { id } = useParams()

  const getAsset = async () => {
    const url = `${GET_ASSET_RETRIEVE_URL}?id=${id}`
    const { data: { data: { asset, depreciation } } } = await axios.get(url)
    setAsset(asset)
    setDepSimulation(depreciation)
  }
  
  useEffect(() => {
    getAsset()
  }, [])

  const showAssetInfo = () => {
    if(depSimulation != undefined) {
      const DepSimulation = depSimulation.map((item: DepSimulationResponse) => {
        return (
          <div>
            <StyledDt>{item.year}</StyledDt>
            <StyledDd>{item.amount}</StyledDd>
          </div>
        )
      })
      return DepSimulation
    } else {
      return (
        <p>通信中...</p>
      )
    }
  }

  const Asset = showAssetInfo()

  return (
    <Container>
      <StyledDl>
        {Asset}
      </StyledDl>
    </Container>
  )
}