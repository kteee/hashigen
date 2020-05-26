import styled from 'styled-components'
import { bg, text } from '../utilities/colors'

interface SButtonProps {
  backgroundColor?: string
  color?: string
  size?: string
  margin?: string
}

export const SButton = styled.button`
  border: none;
  text-decoration: none;
  color: ${(props: SButtonProps) => props.color ? props.color : text.navy };
  background-color: ${(props: SButtonProps) => props.backgroundColor ? props.backgroundColor : bg.aqua};
  padding: ${(props: SButtonProps) => (props.size === 's') ? '0.3em 1em' : '0.6em 2em' };
  text-align: center;
  display: inline-block;
  font-size: ${(props: SButtonProps) => (props.size === 's') ? '0.5em' : '1em' };
  margin: ${(props: SButtonProps) => props.margin ? props.margin : '0'};
  border-radius: 0.3em;
  cursor: pointer;
`