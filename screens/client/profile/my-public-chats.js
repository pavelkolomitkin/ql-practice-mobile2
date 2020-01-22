import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Headline } from 'react-native-paper';
import Layout from '../../../components/client/layout';

class MyPublicChats extends Component {

  state = {

  };

  render() {
    return (
        <Layout>
          <View style={{ flex: 1 }}>
            <Headline>My Public Chats</Headline>
          </View>
        </Layout>

    )
  }
}

MyPublicChats.propTypes = {

};

export default MyPublicChats;