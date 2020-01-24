import React, { Component } from 'react';
import { Text, View } from 'react-native';
import CommonForm from './common-form';
import {PropTypes} from 'prop-types';

class DialogForm extends CommonForm {

  onDismissHandler = () => {
      this.dismiss();
  };

  dismiss = () => {
      const { onClose } = this.props;

      if (onClose)
      {
          onClose();
      }
  };

    async processSubmit() {
        this.dismiss();
    };

  render() {
    return (
        <></>
    )
   }
}

DialogForm.propTypes = {
    onClose: PropTypes.func,
    isVisible: PropTypes.bool
};

export default DialogForm;