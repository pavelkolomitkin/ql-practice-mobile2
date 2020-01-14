import React, { Component } from 'react';
import { View, Modal, ActivityIndicator } from 'react-native';
import { Button, Text } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux/actions/security/security';

class AgreementButton extends Component {

  state = {
    isAccepted: false,
    isTextShown: false,
      agreement: null
  };

  onButtonPressHandler = () => {
      this.setState({
          isTextShown: true
      });
  };

  onAcceptClickHandler = () => {
    this.setState({
        isAccepted: true,
        isTextShown: false
    });

    const { onAcceptHandler } = this.props;

    onAcceptHandler();
  };

  onModalRequestClose = () => {
      this.setState({
          isTextShown: false
      });
  };

  componentDidMount() {

      const { agreement } = this.props;

      if (!agreement)
      {
          this
              .props
              .actions
              .getAgreement()
              .then(text => {
                  this.setState({
                      agreement: text
                  });
              })
          ;
      }
      else
      {
          this.setState({
              agreement
          });
      }
  };

  getButton()
  {
      const { isAccepted } = this.state;

      if (isAccepted)
      {
          return (
              <Button
                  active
                  success onPress={this.onButtonPressHandler}>
                  <Icon name="check" />
                  <Text>Agreement</Text>

              </Button>
          );
      }

      return (
          <Button primary onPress={this.onButtonPressHandler}>
              <Text>Agreement</Text>
          </Button>
      );
  }

  render() {

      const { isTextShown, agreement } = this.state;


      return (
          <View>
              { this.getButton() }
              <Modal
                animationType="slide"
                transparent={false}
                visible={isTextShown}
                onRequestClose={this.onModalRequestClose}
              >
                  {
                      !!agreement ?
                          <View>
                              <View>
                                  <Text h2>Agreement</Text>
                              </View>
                              <View>
                                  <Text>{ agreement }</Text>
                              </View>
                              <View>
                                  <Button primary onPress={this.onAcceptClickHandler}>
                                      <Text>Accept</Text>
                                  </Button>
                              </View>
                          </View>
                          : <ActivityIndicator size="large" color="primary" />
                  }

              </Modal>
          </View>
      );
  }
}

AgreementButton.propTypes = {
    onAcceptHandler: PropTypes.func
};


const mapStateToProps = (state) => {
    return {
        agreement: state.security.agreement
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AgreementButton);