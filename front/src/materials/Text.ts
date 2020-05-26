import styled from 'styled-components';
import { bg, text } from '../utilities/colors'

interface TextProps {
  color?: string
}

export const H1 = styled.h1`
  color: ${(props: TextProps) => (props.color ? props.color : text.navy )};
  margin: 0;
`

export const H2 = styled.h2`
  color: ${(props: TextProps) => (props.color ? props.color : text.navy )};
`

export const H3 = styled.h3`
  color: ${(props: TextProps) => (props.color ? props.color : text.navy )};
`

export const H4 = styled.h4`
  color: ${(props: TextProps) => (props.color ? props.color : text.navy )};
`