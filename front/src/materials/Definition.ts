import styled from 'styled-components'

interface SDprops {
  borderBottom?: string
  width?: string
  padding?: string
}

export const SDl = styled.dl``

export const SDWrapper = styled.div`
  display: flex;
  border-bottom: ${(props: SDprops) => props.borderBottom ? props.borderBottom : '1px solid lightgray'};
  padding: ${(props: SDprops) => props.padding ? props.padding : '0.5em 0'};
  align-items: center;
`

export const SDt = styled.dt`
  width: ${(props: SDprops) => props.width ? props.width : '8em'};
  padding: 0.1em 1em;  
`

export const SDd = styled.dd`
  width: ${(props: SDprops) => props.width ? props.width : '8em'};
  padding: 0.1em 1em;
`