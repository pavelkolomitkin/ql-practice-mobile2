import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Image } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withTheme, Headline, Button,  Avatar, List, Subheading, Caption, Paragraph, Title, Colors } from 'react-native-paper';
import DefaultAvatar from '../../../assets/default_avatar.png';

class UserAvatar extends Component {

  state = {

  };

  render() {

      const { user } = this.props;

      //const avatar = DefaultAvatar;

      const avatar = !(user.photo && user.photo.filename) ? DefaultAvatar : {
          uri: user.photo.thumbs['medium']
      };


        return (
          <View>

              <Avatar.Image
                  style={{
                      border: 1
                  }}
                  source={avatar}
                  size={150}
              />
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