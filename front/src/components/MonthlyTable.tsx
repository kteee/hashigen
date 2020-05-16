import React from 'react';
import styled from 'styled-components'

import { MonthlyTablePeriodProps } from '../utilities/types'
import { dateToYYYYMMDDStr } from '../utilities/dateManipulate'

interface MonthlyTableProps {
  periods: MonthlyTablePeriodProps[]
}

const Wrapper = styled.div`
  display: flex;
  font-size: 0.8em;
`

const Cell = styled.div`
  padding: 0.1em 0.5em;
  border-bottom: 1px solid gray;
`

export const MonthlyTable = (props: MonthlyTableProps) => {

  const Period = props.periods.map((period) => {
    return (
      <div key={period.month}>
        <Cell>{period.month}</Cell>
        <Cell>{period.monthStartDate}</Cell>
        <Cell>{period.monthEndDate}</Cell>
      </div>
    )
  })

  return (
    <Wrapper>
      {Period}
    </Wrapper>
  )
  
}