import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'

import { ASSETS_URL } from '../../../utilities/urls'
import { DepSimulationResponse } from '../../../utilities/types'
import { setHeaders } from '../../../utilities/auth'
import { TableHeaderCell } from '../../../utilities/types'
import { StyledTd } from '../../../materials/Table'


interface Props {
  assetId: number | string
  tableHeaderCells: TableHeaderCell[]
  setTableHeaderCells: any
}

export const AssetProjectionData = (props: Props) => {
  
  const [depSimulation, setDepSimulation] = useState<DepSimulationResponse[]>([])

  const getProjection = async () => {
    const url = `${ASSETS_URL}/${props.assetId}`
    const headers = setHeaders()
    const { data } = await axios.get(url, headers)
    setDepSimulation(data)
    if(data.length > props.tableHeaderCells.length){
      props.setTableHeaderCells(data)
    }
  }
  
  useEffect(() => {
    getProjection()
  }, [])

  const showAssetInfo = () => {
    const DepSimulation = depSimulation.map((item: DepSimulationResponse) => {
      console.log(item)
      return (
        <StyledTd>{item.amount}</StyledTd>
      )
    })
    return DepSimulation
  }

  const Projection = showAssetInfo()

  return (
    <Fragment>
      {Projection}
    </Fragment>
  )
}