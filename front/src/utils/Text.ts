import styled from 'styled-components';

interface TextProps {
  color: string
}

export const H1 = styled.h1`
  color: ${(props: TextProps) => (props.color ? props.color : 'black')};
  margin: 0;
`;

export const H2 = styled.h2`
  color: ${(props: TextProps) => (props.color ? props.color : 'black')};
`;

export const H3 = styled.h3`
  color: ${(props: TextProps) => (props.color ? props.color : 'black')};
`;