import React from 'react';
import styled from 'styled-components';

const App = () => {
  return (
    <>
      <TextRed>Hello world!</TextRed>
    </>
  );
}

const TextRed = styled.p`
  color: red;
`;

export default App;
