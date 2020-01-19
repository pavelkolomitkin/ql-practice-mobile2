import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableWithoutFeedback, ImageBackground, Dimensions } from 'react-native';
import { withTheme, Headline, Button, Avatar, IconButton, List, Subheading, Caption, Paragraph, Title, Colors } from 'react-native-paper';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import ImagePicker from 'react-native-image-picker';
import PhotoService from '../../../services/client/photo-service';
import * as securityActions from '../../../redux/actions/security/security';
import { Navigation } from 'react-native-navigation';

class FullscreenPhoto extends Component {

  state = {

  };


    onEditPressHandler = async () => {

        await ImagePicker.showImagePicker({
            title: 'Select Photo'
        }, (response) => {

            if (response.didCancel)
            {
                return;
            }

            console.log(response);

            const service = new PhotoService();

            service.upload({
                uri: response.uri,
                fileName: response.fileName,
                type: response.type
            }, (progress) => {

                console.log('UPLOAD PROGRESS', progress);

            })
                .then(async (user) => {
                    await this.props.securityActions.updateUser(user);
                    this.setState({
                        user
                    });
                })
                .catch((errors) => {
                    debugger
                })
            ;
        });

    };

    onDeletePressHandler = async () => {

        const service = new PhotoService();

        await service
            .remove()
            .then(async user => {
                await this.props.securityActions.updateUser(user);

                await Navigation.dismissModal(this.props.componentId);

                // this.setState({
                //     user
                // });
            })
            .catch(errors => {
                console.log('ERROR OF REMOVING THE PHOTO');
            })
        ;
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
        securityActions: bindActionCreators(securityActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(FullscreenPhoto));