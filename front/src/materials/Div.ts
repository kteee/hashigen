import styled from 'styled-components'

export const SDiv = styled.div`
  margin-top: 1em;
`

interface CardProps {
  overflow?: string
}

export const Card = styled.div`
  padding: 1em;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  overflow: ${(props: CardProps) => props.overflow ? props.overflow : 'scroll' };
  overflow-y: hidden;
`