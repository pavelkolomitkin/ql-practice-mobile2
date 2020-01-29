import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { ActivityIndicator, Avatar } from 'react-native-paper';

class MessageLink extends Component {

  static STATUS_COMPLETE = 'complete';

  static STATUS_LOADING = 'loading';

  static STATUS_ERROR = 'error';

  state = {
    status: MessageLink.STATUS_LOADING
  };

  getContent()
  {
    const { status } = this.state;

    if (status === MessageLink.STATUS_LOADING)
    {
      return (<ActivityIndicator/>);
    }

    if (status === MessageLink.STATUS_ERROR)
    {
      return (<Avatar icon="alert" />);
    }

    return this.getPreparedContent();

  }

  getPreparedContent() {
    return null;
  }

  onPressHandler = async () => {
    const { link } = this.props;

    await Linking.openURL(link);
  };

  render() {

    const content = this.getContent();

    return (
      <TouchableOpacity onPress={this.onPressHandler}>
        <View style={styles.container}>
          { content }
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: '#ccc'
  }
});

MessageLink.propTypes = {

};

export default MessageLink;