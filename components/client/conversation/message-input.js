import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Text, View, StyleSheet, TextInput, ScrollView, Keyboard} from 'react-native';
import {IconButton, Portal, withTheme} from 'react-native-paper';
import EmojiSelector, { Categories } from 'react-native-emoji-selector';
import {bindActionCreators} from 'redux';
import * as securityActions from '../../../redux/actions/security/security';
import * as conversationActions from '../../../redux/actions/client/public-conversation';
import * as messageActions from '../../../redux/actions/client/public-conversation-message';
import {connect} from 'react-redux';
import {TextMessage} from '../../../services/model/message/text-message';

class MessageInput extends Component {

  state = {
      text: '',
      isSmileSelectorVisible: false
  };

  onSmileButtonPressHandler = () => {

      const isSmileSelectorVisible = !this.state.isSmileSelectorVisible;
      if (!isSmileSelectorVisible)
      {
          this.textInput.focus();
      }
      else
      {
          this.textInput.blur();
          Keyboard.dismiss();
      }

      this.setState({
          isSmileSelectorVisible: isSmileSelectorVisible
      });
  };

    onTextInputFocusHandler = () => {
        this.setState({
            isSmileSelectorVisible: false
        });
    };

  onTextChangeHandler = (value) => {
      this.setState({
          text: value
      });
  };

  onSendButtonPressHandler = async () => {

      let { text } = this.state;
      const { conversation, user } = this.props;

      text = text.trim();
      if (text !== '')
      {
          const message = new TextMessage();
          message.text = text;
          message.conversation = conversation;
          message.user = user;

          await this.props.messageActions.create(message);

          this.setState({
              text: ''
          });
      }
  };

  onSmileSelectHandler = (emoji) => {

      let { text } = this.state;

      if (!!this.textInput._lastNativeSelection)
      {
          const { start, end } = this.textInput._lastNativeSelection;
          text = text.substring(0, start) + emoji + text.substring(end);
      }
      else
      {
          text += emoji;
      }

      this.setState({
          text
      });
  };


  render() {
      const { text, isSmileSelectorVisible } = this.state;

    return (
      <>

          <View style={styles.row}>
              <View style={styles.textInputContainer}>
                  <View style={styles.smileButtonContainer}>
                      <IconButton
                          icon={ isSmileSelectorVisible ? 'keyboard' : 'emoticon'}
                          onPress={this.onSmileButtonPressHandler}
                      />
                  </View>
                  <TextInput
                      ref={(input) => this.textInput = input}
                      style={styles.textInput}
                      value={text}
                      onChangeText={this.onTextChangeHandler}
                      onFocus={this.onTextInputFocusHandler}
                  />
              </View>
              <View style={styles.submitButtonContainer}>
                  <IconButton icon="chevron-right" onPress={this.onSendButtonPressHandler} />
                  {/*<IconButton icon="microphone" />*/}
              </View>
          </View>
          <View style={ isSmileSelectorVisible ? {
              flex: 3
          } : {
              height: 0
          } }>
              <ScrollView showsVerticalScrollIndicator={true}>
                  <EmojiSelector
                      onEmojiSelected={(emoji) => this.onSmileSelectHandler(emoji)}
                      showSearchBar={false}
                      showTabs={true}
                      showHistory={true}
                      showSectionTitles={true}
                      columns={10}
                      category={Categories.people}
                  />
              </ScrollView>
          </View>
      </>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column'
    },

    row: {

        flexDirection: 'row',
        paddingLeft: 4,
        paddingRight: 4,
        height: 50
    },
    textInputContainer: {
        flex: 1,
        position: 'relative',
        paddingLeft: 50,
        borderRadius: 30,
        backgroundColor: '#ccc'
    },

    textInput: {
        backgroundColor: 'transparent',
        paddingHorizontal: 0,
        paddingVertical: 0,
        height: '100%'
    },

    smileButtonContainer: {
        position: 'absolute',
        left: 0,
        top: 0
    },

    submitButtonContainer: {

    }
});

MessageInput.propTypes = {

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

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(MessageInput));