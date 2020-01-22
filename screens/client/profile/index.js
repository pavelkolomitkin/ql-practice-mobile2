import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Text, withTheme} from 'react-native-paper';
import Layout from '../../../components/client/layout';
import * as actions from '../../../redux/actions/security/security';
import { TabView, SceneMap } from 'react-native-tab-view';

import MyProfile from './my-profile';
import MyPublicChats from './my-public-chats';
import RecentPublicChats from './recent-public-chats';

class Index extends Component {

  state = {
      tabIndex: 0,
      routes: [
          { key: 'profile', title: 'Profile' },
          { key: 'myPublicChats', title: 'My Public' },
          { key: 'recentPublicChats', title: 'Recent Public' },
      ],

      // scenes: SceneMap({
      //     profile: MyProfile,
      //     myPublicChats: MyPublicChats,
      //     recentPublicChats: RecentPublicChats
      // }),
  };

  tabIndexChangeHandler = (index) => {
      this.setState({
          tabIndex: index
      });
  };

  render() {

    const initialLayout = { width: Dimensions.get('window').width };
    const { tabIndex, routes } = this.state;

      const renderScene = SceneMap({
          profile: MyProfile,
          myPublicChats: MyPublicChats,
          recentPublicChats: RecentPublicChats
      });


      return (
        <TabView
            navigationState={{ index: tabIndex, routes }}
            renderScene={renderScene}
            onIndexChange={this.tabIndexChangeHandler}
            initialLayout={initialLayout}
        />

    )
  }
}

Index.propTypes = {

};


export default withTheme(Index);