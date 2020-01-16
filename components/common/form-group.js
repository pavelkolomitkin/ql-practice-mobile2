import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

const FormGroup = ({ children, margin }) => {
 return (
  <View style={{ margin }}>
      { children }
  </View>
 );
};

FormGroup.propTypes = {
 margin: PropTypes.number
};

FormGroup.defaultProps = {
 margin: 8
};


export default FormGroup;