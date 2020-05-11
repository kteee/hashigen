import styled from 'styled-components'

interface STdProps {
  align?: string
}

export const STable = styled.table`
  table-layout: auto;
  margin-top: 1em;
  border-collapse: collapse;
`

export const STr = styled.tr`
  border-bottom: 1px dotted lightgray;
`

export const STh = styled.th`
  white-space: nowrap;
  border-bottom: 2px solid darkgray;
`

export const STd = styled.td`
  text-align: ${(props: STdProps) => props.align ? props.align : 'left'};
  white-space: nowrap;
  padding: 0.5em 1em;
`