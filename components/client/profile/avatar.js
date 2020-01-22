import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    withTheme,
    Headline,
    Button,
    Avatar,
    List,
    Subheading,
    Caption,
    Paragraph,
    Title,
    Colors,
    ActivityIndicator
} from 'react-native-paper';
import DefaultAvatar from '../../../assets/default_avatar.png';
import * as navigation from '../../../navigation/index';
import * as securityActions from '../../../redux/actions/security/security';
import * as photoActions from '../../../redux/actions/client/photo';
import Toast from 'react-native-root-toast';

class UserAvatar extends Component {

  state = {
      isLoading: false
  };

  hasUserPhoto(user) {
      return !!(user.photo && user.photo.filename);
  };

  onPressHandler = async () => {

      const { authUser, user } = this.props;

      if (this.hasUserPhoto(user))
      {
          await navigation.showFullScreenPhoto(user);
      }
      else if (authUser.id === user.id)
      {
          // open upload dialog

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
      }
  };

    onLoadStartHandler = () => {

    };

    onLoadEndHandler = () => {

    };

    render() {

      const { user, isLoading } = this.props;

      const avatar = !this.hasUserPhoto(user) ? DefaultAvatar : {
          uri: user.photo.thumbs['medium']
      };


        return (
          <View style={{ width: 150, height: 150 }}>
              <TouchableOpacity
                  onPress={this.onPressHandler}
              >
                  <ImageBackground
                      style={{width: '100%', height: '100%'}}
                      imageStyle={{ borderRadius: 150 }}
                      source={avatar}
                      onLoadStart={this.onLoadStartHandler}
                      onLoadEnd={this.onLoadEndHandler}
                  >
                      { isLoading && <ActivityIndicator /> }

                  </ImageBackground>
              </TouchableOpacity>
          </View>
        );
  }
}

UserAvatar.propTypes = {
    user: PropTypes.object
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

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(UserAvatar));