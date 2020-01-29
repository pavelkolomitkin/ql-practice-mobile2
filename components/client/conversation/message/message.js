import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';
import moment from 'moment';
import {bindActionCreators} from 'redux';
import * as securityActions from '../../../../redux/actions/security/security';
import * as conversationActions from '../../../../redux/actions/client/public-conversation';
import * as messageActions from '../../../../redux/actions/client/public-conversation-message';
import {connect} from 'react-redux';
import {withTheme, Paragraph} from 'react-native-paper';

class Message extends Component {

  static MESSAGE_STATUS_PENDING = 'pending';
  static MESSAGE_STATUS_SENT = 'sent';
  static MESSAGE_STATUS_ERROR = 'error';

  state = {
      status: null
  };

  getSentTime()
  {
      const { message: { createdAt } } = this.props;

      const createTime = moment.utc(createdAt);
      let currentTime = moment();

      if (currentTime.format('YYYY MM DD') === createTime.format('YYYY MM DD'))
      {
          return createTime.format('HH:mm');
      }

      const dayBack = currentTime.subtract(1, 'day');
      if (dayBack.format('YYYY MM DD') === createTime.format('YYYY MM DD'))
      {
          return 'Yesterday ' + createTime.format('HH:mm');
      }

      return createTime.format('DD.MM.YYYY HH:mm');

      // if it was today
        // show just hours and minutes like 18:31
      // if it was yesterday
        // show it as 'Yesterday 5:43'
      // in other cases
        // show it as 12.09.2020 15:46
  }

  getMyMessage()
  {
      const { theme }  = this.props;

      return (
          <View style={styles.mine}>
              <View style={[styles.cloud, {backgroundColor: theme.colors.accent } ]}>
                  { this.getContent() }
              </View>
          </View>
      );
  }

  getOtherUserMessage()
  {
      const { theme }  = this.props;

      return (
          <View style={styles.other}>
              <View style={[styles.cloud, {backgroundColor: theme.colors.surface } ]}>
                  { this.getContent() }
              </View>
          </View>
      );
  }

    /**
     * Override this method in subclasses
     * @returns {null}
     */
  async getContent()
  {
      return null;
  }

    /**
     * Override this method in subclasses in order to send it on the server
     */
  async sendMessage()
  {

  }

  isMessageMine()
  {
      const { message, user } = this.props;

      return message.user.id === user.id;
  }

  async componentDidMount(): void {

      const { message } = this.props;

      if (message.isNew())
      {
          this.setState({
              status: Message.MESSAGE_STATUS_PENDING
          });

          await this.sendMessage();
      }
  }

  render() {

    if (this.isMessageMine())
    {
        return this.getMyMessage();
    }
    else
    {
        return this.getOtherUserMessage();
    }
  }
}

const styles = StyleSheet.create({
    mine: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },

    cloud: {
        borderRadius: 5,
        padding: 4
    },


    other: {

    }
});

Message.propTypes = {
    message: PropTypes.object
};

export default Message;