import styled from 'styled-components'

interface StyledTdProps {
  align?: string
}

export const StyledTable = styled.table`
  table-layout: auto;
  margin-top: 1em;
  border-collapse: collapse;
`

export const StyledTr = styled.tr`
  padding: 10em 0;
  border-bottom: 1px solid darkgray;
`

export const StyledTh = styled.th`
  white-space: nowrap;
`

export const StyledTd = styled.td`
  text-align: ${(props: StyledTdProps) => props.align ? props.align : 'left'};
  white-space: nowrap;
  padding: 0 1em;
`