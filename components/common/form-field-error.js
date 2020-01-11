import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components';

const FormFieldError = ({ errors, name }) => {

    const items = !!errors[name] ?
        (Array.isArray(errors[name]) ? errors[name] : [errors[name]])
        : null;

 return (


      items ?
          <View>
              {
                  items.map((item, index) =>
                      <Error key={'error_' + name + '_' + index}>
                          <ErrorText>{item}</ErrorText>
                      </Error>
                  )
              }
          </View>
          : null

 );
};


FormFieldError.defaultProps = {
    name: '',
    errors: {}
};

const Error = styled.View`
  padding-top: 5px;
  padding-bottom: 5px;
`;

const ErrorText = styled.Text`
  font-size: 11px;
  color: red;
`;

export default FormFieldError;