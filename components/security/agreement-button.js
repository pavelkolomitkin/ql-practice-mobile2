import React, { Component } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { Text } from 'native-base';
import { Button, withTheme, Dialog, Portal, Provider, ActivityIndicator, Title, Paragraph } from 'react-native-paper';
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
      const { colors } = this.props.theme;
      const { isAccepted } = this.state;

      if (isAccepted)
      {
          return (
              <Button
                  icon="check-bold"
                  color={colors.accent} onPress={this.onButtonPressHandler}>
                  Agreement
              </Button>
          );
      }

      return (
          <Button color={colors.primary} onPress={this.onButtonPressHandler}>
              Agreement
          </Button>
      );
  }

  render() {

      const { colors } = this.props.theme;
      const { isTextShown, agreement } = this.state;


      return (
          <View>
              { this.getButton() }

              <Portal>
                  <Dialog
                      onDismiss={this.onModalRequestClose}
                      visible={isTextShown}
                      style={{ maxHeight: 0.6 * Dimensions.get('window').height }}
                  >
                      <Dialog.Title>Agreement</Dialog.Title>
                      { !!agreement ?
                          <>
                              <Dialog.ScrollArea style={{ paddingHorizontal: 0 }}>
                                  <ScrollView contentContainerStyle={{ paddingHorizontal: 24 }}>
                                      <Paragraph>
                                          { agreement }
                                      </Paragraph>
                                  </ScrollView>
                              </Dialog.ScrollArea>
                              <Dialog.Actions>
                                  <Button onPress={this.onAcceptClickHandler}>Accept</Button>
                              </Dialog.Actions>
                          </>
                              : <ActivityIndicator />
                      }
                  </Dialog>
              </Portal>



              {/*<Modal*/}
              {/*  animationType="slide"*/}
              {/*  transparent={false}*/}
              {/*  visible={isTextShown}*/}
              {/*  onRequestClose={this.onModalRequestClose}*/}
              {/*>*/}
              {/*    {*/}
              {/*        !!agreement ?*/}
              {/*            <View>*/}
              {/*                <View>*/}
              {/*                    <Text h2>Agreement</Text>*/}
              {/*                </View>*/}
              {/*                <View>*/}
              {/*                    <Text>{ agreement }</Text>*/}
              {/*                </View>*/}
              {/*                <View>*/}
              {/*                    <Button primary onPress={this.onAcceptClickHandler}>*/}
              {/*                        <Text>Accept</Text>*/}
              {/*                    </Button>*/}
              {/*                </View>*/}
              {/*            </View>*/}
              {/*            : <ActivityIndicator size="large" color="primary" />*/}
              {/*    }*/}

              {/*</Modal>*/}
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

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(AgreementButton));