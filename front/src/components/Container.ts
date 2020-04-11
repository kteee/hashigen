import styled from 'styled-components';

interface ContainerProps {
  width?: string
}

export const Container = styled.div`
  width: ${(props: ContainerProps) => (props.width ? props.width : '85vw')};
  margin: auto;  
`;