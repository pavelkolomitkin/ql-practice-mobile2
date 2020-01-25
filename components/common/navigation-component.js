import React, { Component } from 'react';
import { Text, View } from 'react-native';

import {Navigation} from 'react-native-navigation';

class NavigationComponent extends Component {

  static BUTTON_BACK = 'back';

  static BUTTON_PUBLIC_RIGHT_MENU = 'button-public-right-menu';

  state = {

  };

  constructor(props) {
      super(props);

      Navigation.events().bindComponent(this);
  }

  navigationButtonPressed = ({ buttonId }) => {
    const { componentId } = this.props;
    if (buttonId === NavigationComponent.BUTTON_BACK) {
        Navigation.dismissModal(componentId);
    }
  };

  async dismissWindow() {
    const { componentId } = this.props;
    await Navigation.dismissModal(componentId);
  }

  render() {
    return (
        <></>
    )
  }
}

NavigationComponent.propTypes = {

};

export default NavigationComponent;