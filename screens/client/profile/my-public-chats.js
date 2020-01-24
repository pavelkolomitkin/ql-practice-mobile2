import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Headline } from 'react-native-paper';
import Layout from '../../../components/client/layout';
import PublicConversationList from '../../../components/client/profile/public-conversation/public-conversation-list';

class MyPublicChats extends Component {

  state = {

  };

  render() {
    return (
        <Layout>
            <PublicConversationList />
        </Layout>

    )
  }
}

MyPublicChats.propTypes = {

};

export default MyPublicChats;