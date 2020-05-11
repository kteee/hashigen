import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'

import { ASSETS_URL } from '../utilities/urls'
import { DepSimulationResponse } from '../utilities/types'
import { setHeaders } from '../utilities/auth'
import { TableHeaderCell, DepreciationProjectionProps } from '../utilities/types'
import { STd } from '../materials/Table'


export const DepreciationProjection = (props: DepreciationProjectionProps) => {
  
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
    const DepSimulation = depSimulation.map(item => {
      return (
        <STd align='right'>{item.amount}</STd>
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