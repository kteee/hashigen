import styled from 'styled-components'

interface StyledInputProps{
  type?: string
  name?: string
  placeholder?: string
}

export const StyledInput = styled.input.attrs((props: StyledInputProps) => ({
  type: props.type ? props.type : undefined,
  name: props.name ? props.name : undefined,
  placeholder: props.placeholder ? props.placeholder : undefined
}))`
  width: 20em;
  font-size: 1.2em;
`