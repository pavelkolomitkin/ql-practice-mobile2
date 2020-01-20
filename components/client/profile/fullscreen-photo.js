import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableWithoutFeedback, ImageBackground, Dimensions, Alert } from 'react-native';
import { withTheme, Headline, Button, Avatar, IconButton, List, Subheading, Caption, Paragraph, Title, Colors } from 'react-native-paper';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as securityActions from '../../../redux/actions/security/security';
import * as photoActions from '../../../redux/actions/client/photo';
import { Navigation } from 'react-native-navigation';
import Toast from 'react-native-root-toast';

class FullscreenPhoto extends Component {

  state = {

  };


    onEditPressHandler = async () => {

        try {
            const user = await this.props.photoActions.upload();

            await this.props.securityActions.updateUser(user);
            this.setState({
                user
            });
        }
        catch (error) {
            console.log(error);
            Toast.show('Cannot upload this photo');
        }

    };

    onDeletePressHandler = async () => {

        Alert.alert('Remove Picture?', 'Are you sure you wanna remove it?', [
            {
                text: 'Remove',
                onPress: async () => {

                    try
                    {
                        const user = await this.props.photoActions.remove();

                        await this.props.securityActions.updateUser(user);
                        await Navigation.dismissModal(this.props.componentId);
                    }
                    catch (e) {
                        Toast.show('Cannot delete the photo. Try it later');
                    }

                }
            },
            {
                text: 'Cancel',
                onPress: () => {}
            }
        ]);
    };

    componentDidMount(): void {
        const { user } = this.props;

        this.setState({
            user
        });
    }

    render() {

        const { user } = this.state;
        if (!user)
        {
            return null;
        }

        const { authUser } = this.props;

        const isOwnPhoto = user.id === authUser.id;
        console.log('RENDER PICTURE', user.photo.thumbs['large']);

        return (
          <>
              {
                  !!user &&
                  <ImageBackground
                      source={{
                          uri: user.photo.thumbs['large']
                      }}
                      resizeMode='contain'
                      style={{
                          width: '100%',
                          height: '100%',
                          backgroundColor: 'black'
                      }}
                  >

                      { isOwnPhoto &&
                          <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                              <View style={{ flex: 1, justifyContent: 'center' }}>
                                  <IconButton icon="pencil" onPress={this.onEditPressHandler} />
                                  <IconButton icon="delete" onPress={this.onDeletePressHandler} />
                              </View>
                          </View>
                      }


                  </ImageBackground>
              }
          </>
        )
  }
}

FullscreenPhoto.propTypes = {
    user: PropTypes.object,
};

const mapStateToProps = (state) => {
    return {
        authUser: state.security.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        securityActions: bindActionCreators(securityActions, dispatch),
        photoActions: bindActionCreators(photoActions, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(FullscreenPhoto));