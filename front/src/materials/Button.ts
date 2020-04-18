import styled from 'styled-components'

interface StyledButtonProps {
  color? : string
}

export const StyledButton = styled.button`
  background-color: ${(props: StyledButtonProps) => props.color ? props.color : '#a2b9bc'};
  outline: none;
  appearance: none;
  padding: 0.1em 0.3em;
  font-size: 1em;
`