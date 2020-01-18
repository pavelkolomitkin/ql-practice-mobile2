import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableWithoutFeedback, ImageBackground, Dimensions } from 'react-native';
import { withTheme, Headline, Button, Avatar, IconButton, List, Subheading, Caption, Paragraph, Title, Colors } from 'react-native-paper';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-picker';

class FullscreenPhoto extends Component {

  state = {

  };

    onEditPressHandler = async () => {

        await ImagePicker.showImagePicker({
            title: 'Select Photo'
        }, (response) => {

            debugger
            console.log(response);

        });

    };

    onDeletePressHandler = () => {

    };

  render() {

   const { user, authUser } = this.props;

   const isOwnPhoto = user.id === authUser.id;


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

export default connect(mapStateToProps)(withTheme(FullscreenPhoto));