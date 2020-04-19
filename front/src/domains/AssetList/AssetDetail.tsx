import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import { Container } from '../../materials/Container'
import { GET_ASSET_RETRIEVE_URL } from '../../utilities/urls'
import { AssetDetailResponse } from '../../utilities/types'

export const AssetDetail = () => {
  
  const [asset, setAsset] = useState<AssetDetailResponse | undefined>(undefined)
  
  const { id } = useParams()

  const getAsset = async () => {
    const url = `${GET_ASSET_RETRIEVE_URL}?id=${id}`
    const { data : { data } } = await axios.get(url)
    setAsset(data)
  }
  
  useEffect(() => {
    getAsset()
  }, [])

  const showAssetInfo = () => {
    if(asset) {
      return (
        <div>
          <p>{asset.id}</p>
          <p>{asset.name}</p>
          <p>{asset.acquisition_date}</p>
          <p>{asset.acquisition_value}</p>
          <p>{asset.useful_life}</p>
          <p>{asset.depreciation_method}</p>
          <p>{asset.created_at}</p>
          <p>{asset.updated_at}</p>
        </div>
      )
    } else {
      return (
        <p>通信中...</p>
      )
    }
  }

  const Asset = showAssetInfo()

  return (
    <Container>
      {Asset}
    </Container>
  )
}