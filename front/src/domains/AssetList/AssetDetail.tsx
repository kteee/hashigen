import React from 'react'
import { useParams } from 'react-router-dom'

export const AssetDetail = (props: any) => {
  
  return ( 
    <div>{props.match.params.id}</div>
  )
}