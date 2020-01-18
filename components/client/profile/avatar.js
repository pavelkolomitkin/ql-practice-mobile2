import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withTheme, Headline, Button,  Avatar, List, Subheading, Caption, Paragraph, Title, Colors } from 'react-native-paper';
import DefaultAvatar from '../../../assets/default_avatar.png';
import * as navigation from '../../../navigation/index';

class UserAvatar extends Component {

  state = {

  };

  hasUserPhoto(user) {
      return !!(user.photo && user.photo.filename);
  };

  onPressHandler = async () => {

      const { authUser, user } = this.props;

      if (this.hasUserPhoto(user))
      {
          await navigation.showFullScreenPhoto(user);
          // show the fullscreen component
          // this.setState({
          //     isModalVisible: true
          // });
      }
      else if (authUser.id === user.id)
      {
          // open upload dialog
      }
  };

  render() {

      const { user } = this.props;

      const avatar = !this.hasUserPhoto(user) ? DefaultAvatar : {
          uri: user.photo.thumbs['medium']
      };


        return (
          <View>
              <TouchableOpacity
                  onPress={this.onPressHandler}
              >
                  <Avatar.Image

                      style={{
                          border: 1
                      }}
                      source={avatar}
                      size={150}
                  />
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

export default connect(mapStateToProps)(withTheme(UserAvatar));