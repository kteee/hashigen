import styled from 'styled-components'

interface FlexWrapperProps {
  margin?: string
  padding?: string
  justifyContent?: string
}

export const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: ${(props: FlexWrapperProps) => props.margin ? props.margin : '0 0 0 0'};
  margin: ${(props: FlexWrapperProps) => props.padding ? props.padding : '0 0 0 0'};
  justify-content: ${(props: FlexWrapperProps) => props.justifyContent ? props.justifyContent : 'flex-start'};
`