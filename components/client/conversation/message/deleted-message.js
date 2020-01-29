import React, { Component } from 'react';
import { Text, View } from 'react-native';
import {bindActionCreators} from 'redux';
import * as securityActions from '../../../../redux/actions/security/security';
import * as conversationActions from '../../../../redux/actions/client/public-conversation';
import * as messageActions from '../../../../redux/actions/client/public-conversation-message';
import {connect} from 'react-redux';
import {withTheme} from 'react-native-paper';
import Message from './message';

class DeletedMessage extends Message {

  state = {

  };

  getContent() {

      return (
          <View>
              <Text>Deleted</Text>
          </View>
      );
  }
}

DeletedMessage.propTypes = {

};

const mapStateToProps = (state) => {
    return {
        user: state.security.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        securityActions: bindActionCreators(securityActions, dispatch),
        conversationActions: bindActionCreators(conversationActions, dispatch),
        messageActions: bindActionCreators(messageActions, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(DeletedMessage));