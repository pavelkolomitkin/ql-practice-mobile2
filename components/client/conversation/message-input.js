import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Text, View, StyleSheet, TextInput, ScrollView} from 'react-native';
import { IconButton } from 'react-native-paper';
import EmojiSelector, { Categories } from 'react-native-emoji-selector';

class MessageInput extends Component {

  state = {
      text: '',
  };



  onSmileButtonPressHandler = () => {

  };

  onTextChangeHandler = (value) => {
      this.setState({
          text: value
      });
  };

  onSendButtonPressHandler = () => {

  };

  onSmileSelectHandler = (emoji) => {
      console.log(emoji);
  };

  render() {
      const { text } = this.state;

    return (
      <View style={styles.container}>

          <View style={styles.row}>
              <View style={styles.textInputContainer}>
                  <View style={styles.smileButtonContainer}>
                      <IconButton icon="emoticon" onPress={this.onSmileButtonPressHandler}/>
                  </View>
                  <TextInput
                      style={styles.textInput}
                      value={text}
                      onChangeText={this.onTextChangeHandler} />
              </View>
              <View style={styles.submitButtonContainer}>
                  <IconButton icon="chevron-right" onPress={this.onSendButtonPressHandler} />
                  {/*<IconButton icon="microphone" />*/}
              </View>
          </View>
          <View>
              <ScrollView>
                  <EmojiSelector
                      onEmojiSelected={emoji => this.setState({ emoji })}
                      showSearchBar={true}
                      showTabs={true}
                      showHistory={true}
                      showSectionTitles={true}
                      columns={10}
                      category={Categories.all}
                  />
              </ScrollView>

          </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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

export default MessageInput;