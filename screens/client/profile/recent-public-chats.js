import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Headline } from 'react-native-paper';
import Layout from '../../../components/client/layout';

class RecentPublicChats extends Component {

  state = {

  };

  render() {
    return (
        <Layout>
          <View style={{ flex: 1 }}>
            <Headline>Recent Public Chats</Headline>
          </View>
        </Layout>
    )
  }
}

RecentPublicChats.propTypes = {

};

export default RecentPublicChats;