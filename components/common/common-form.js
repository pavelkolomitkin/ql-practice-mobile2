import React, { Component } from 'react';
import { Text, View } from 'react-native';

class CommonForm extends Component {

  state = {
    isLoading: false,
    errors: {}
  };


  onFieldChangeHandler = (name, value) => {

    this.setState({
        [name]: value
    });
  };

  onSubmit = async () => {

    this.setState({
      isLoading: true
    });

    try
    {
      await this.processSubmit();
    }
    catch (errors) {
      this.setState({
        errors
      })
    }

    this.setState({
      isLoading: false
    });
  };

  /**
   * Override this method in the subclass
   * @returns {Promise<void>}
   */
  async processSubmit(){}

  render() {
    return (
      <></>
    )
  }
}

CommonForm.propTypes = {

};

export default CommonForm;