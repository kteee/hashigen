import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container } from '../../../materials/Container'
import { H2 } from '../../../materials/Text'
import { STable, STr, STh, STd } from '../../../materials/Table'
import { UsefulLifeResponse } from '../../../utilities/types'

const url = 'http://localhost:5000/api/masters/useful-life'

export const UsefulLife = () => {

  const [usefulLife, setUsefulLife] = useState([])

  const getUsefuLife = async () => {
    const response = await axios.get(url)
    console.log(response)
    setUsefulLife(response.data)
  }

  useEffect((): void => {
    getUsefuLife()
  }, [])

  let usefulLifeList = usefulLife.map((item: UsefulLifeResponse) => {
    return (
      <STr>
        <STd align='right'>{item.year}</STd>
        <STd align='right'>{item.old_same_amount}</STd>
        <STd align='right'>{item.old_same_ratio}</STd>
        <STd align='right'>{item.new_same_amount}</STd>
        <STd align='right'>{item.two_five_zero_same_ratio_base}</STd>
        <STd align='right'>{item.two_five_zero_same_ratio_guaranteed}</STd>
        <STd align='right'>{item.two_five_zero_same_ratio_revised}</STd>
        <STd align='right'>{item.two_zero_zero_same_ratio_base}</STd>
        <STd align='right'>{item.two_zero_zero_same_ratio_guaranteed}</STd>
        <STd align='right'>{item.two_zero_zero_same_ratio_revised}</STd>
      </STr>
    )
  })

  return (
    <Container>
      <H2>耐用年数表</H2>
      <STable>
        <thead>
          <STr>
            <STh>年数</STh>
            <STh>旧定額法</STh>
            <STh>旧定率法</STh>
            <STh>新定額法</STh>
            <STh>250%<br></br>定率法</STh>
            <STh>250%<br></br>定率法保証価格</STh>
            <STh>250%<br></br>定率法改定償却率</STh>
            <STh>200%<br></br>定率法</STh>
            <STh>200%<br></br>定率法保証価格</STh>
            <STh>200%<br></br>定率法改定償却率</STh>
          </STr>
        </thead>
        <tbody>      
          {usefulLifeList}
        </tbody>
      </STable>
    </Container>
  )
}