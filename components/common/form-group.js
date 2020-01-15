import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components';

const FormGroup = ({ children }) => {
 return (
  <Container>
      { children }
  </Container>
 );
};

const Container = styled.View`
  margin: 8px
`;

export default FormGroup;