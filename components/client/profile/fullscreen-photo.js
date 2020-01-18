import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableWithoutFeedback, ImageBackground, Dimensions } from 'react-native';
import { withTheme, Headline, Button, Avatar, IconButton, List, Subheading, Caption, Paragraph, Title, Colors } from 'react-native-paper';
import {connect} from 'react-redux';

class FullscreenPhoto extends Component {

  state = {

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
                              <IconButton icon="pencil" />
                              <IconButton icon="delete" />
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