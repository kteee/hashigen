import styled from 'styled-components'

interface SInputProps {
  type?: string
  name?: string
  placeholder?: string
  width?: string
}

export const SInput = styled.input.attrs((props: SInputProps) => ({
  type: props.type ? props.type : undefined,
  name: props.name ? props.name : undefined,
  placeholder: props.placeholder ? props.placeholder : undefined
}))`
  width: ${(props: SInputProps) => props.width ? props.width : ((props.type==='checkbox') ? '1em': '20em')};
  font-size: 1.2em;
`