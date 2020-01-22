import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableWithoutFeedback, ImageBackground, Dimensions, Alert } from 'react-native';
import { withTheme, Headline, Button, Avatar, IconButton, List, Subheading, Caption, Paragraph, Title, Colors, ActivityIndicator } from 'react-native-paper';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as securityActions from '../../../redux/actions/security/security';
import * as photoActions from '../../../redux/actions/client/photo';
import { Navigation } from 'react-native-navigation';
import Toast from 'react-native-root-toast';

class FullscreenPhoto extends Component {

  state = {
      isLoading: false
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
            if (!!error)
            {
                Toast.show('Cannot upload this photo');
                this.setState({
                    isLoading: false
                });
            }
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

    onCloseClickHandler = async () => {
        await Navigation.dismissModal(this.props.componentId);
    };

    componentDidUpdate(prevProps): void {
        if (!!this.props.startedUploadPhoto && (this.props.startedUploadPhoto !== prevProps.startedUploadPhoto))
        {
            this.setState({
                isLoading: true
            });
        }
    }

    componentDidMount(): void {
        const { user } = this.props;

        this.setState({
            user
        });
    }

    onLoadImageStartHandler = () => {
        this.setState({
            isLoading: true
        });
    };

    onLoadImageEndHandler = () => {
        this.setState({
            isLoading: false
        });
    };

    render() {

        const { user, isLoading } = this.state;
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
                      onLoadStart={this.onLoadImageStartHandler}
                      onLoadEnd={this.onLoadImageEndHandler}
                  >
                      { isLoading && <ActivityIndicator/>}

                      { isOwnPhoto &&
                          <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                  <IconButton icon="pencil" color={Colors.white} onPress={this.onEditPressHandler} />
                                  <IconButton icon="delete" color={Colors.white} onPress={this.onDeletePressHandler} />
                                  <IconButton icon="close" color={Colors.white} onPress={this.onCloseClickHandler} />
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
        authUser: state.security.user,
        startedUploadPhoto: state.photo.startedUploadPhoto
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        securityActions: bindActionCreators(securityActions, dispatch),
        photoActions: bindActionCreators(photoActions, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(FullscreenPhoto));