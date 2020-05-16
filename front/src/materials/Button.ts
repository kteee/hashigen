import styled from 'styled-components'

enum FontSize {
  S = 'S',
  M = 'M'
}

interface SButtonProps {
  backgroundColor?: string
  color?: string
  size?: FontSize
  margin?: string
}

export const SButton = styled.button`
  border: none;
  text-decoration: none;
  color: ${(props: SButtonProps) => props.color ? props.color : '#272343'};
  background-color: ${(props: SButtonProps) => props.backgroundColor ? props.backgroundColor : '#ffd803'};
  padding: ${(props: SButtonProps) => props.size ? ((props.size === 'S') ? '0.3em 1em' : '0.6em 2em') : '0.6em 2em'};
  text-align: center;
  display: inline-block;
  font-size: ${(props: SButtonProps) => props.size ? ((props.size === 'S') ? '0.5em' : '1em') : '1em'};
  margin: ${(props: SButtonProps) => props.margin ? props.margin : '0'};
  border-radius: 0.3em;
  cursor: pointer;
`