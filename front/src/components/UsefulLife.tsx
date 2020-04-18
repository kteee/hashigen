import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Container} from '../materials/Container'
import {H2} from '../materials/Text'

interface usefulLifeProps {
  id: number
  year: number
  old_same_amount: number
  old_same_ratio: number
  new_same_amount: number
  two_five_zero_same_ratio: number
  two_five_zero_same_ratio_point: number
  two_five_zero_same_ratio_after_point: number
  two_zero_zero_same_ratio: number
  two_zero_zero_same_ratio_point: number
  two_zero_zero_same_ratio_after_point: number

}

const url = 'http://localhost:5000/api/masters/useful-life'

export const UsefulLife = () => {

  const [usefulLife, setUsefulLife] = useState([])

  const getUsefuLife = async () => {
    const response = await axios.get(url)
    setUsefulLife(response.data.data)
  }

  useEffect((): void => {
    getUsefuLife()
  }, [])

  let usefulLifeList = usefulLife.map((item: usefulLifeProps) => {
    return (
      <tr>
        <td>{item.year}</td>
        <td>{item.old_same_amount}</td>
        <td>{item.old_same_ratio}</td>
        <td>{item.new_same_amount}</td>
        <td>{item.two_five_zero_same_ratio}</td>
        <td>{item.two_five_zero_same_ratio_point}</td>
        <td>{item.two_five_zero_same_ratio_after_point}</td>
        <td>{item.two_zero_zero_same_ratio}</td>
        <td>{item.two_zero_zero_same_ratio_point}</td>
        <td>{item.two_zero_zero_same_ratio_after_point}</td>
      </tr>
    )
  })

  return (
    <Container>
      <H2>耐用年数表</H2>
      <table>
        <thead>
          <tr>
            <th>年数</th>
            <th>旧定額法</th>
            <th>旧定率法</th>
            <th>新定額法</th>
            <th>250%定率法</th>
            <th>250%定率法保証価格</th>
            <th>250%定率法改定償却率</th>
            <th>200%定率法</th>
            <th>200%定率法保証価格</th>
            <th>200%定率法改定償却率</th>
          </tr>
        </thead>
        <tbody>      
          {usefulLifeList}
        </tbody>
      </table>
    </Container>
  )
}