import React, { Component } from 'react';
import { Text, View, Platform, StyleSheet } from 'react-native';
import NavigationComponent from '../../../components/common/navigation-component';
import {bindActionCreators} from 'redux';
import * as securityActions from '../../../redux/actions/security/security';
import * as conversationActions from '../../../redux/actions/client/public-conversation';
import {connect} from 'react-redux';
import {withTheme, Appbar, Menu} from 'react-native-paper';
import PublicConversationService from '../../../services/client/public-conversation-service';
import Toast from 'react-native-root-toast';
import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Layout from '../../../components/client/layout';
import MessageInput from '../../../components/client/conversation/message-input';

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

class Conversation extends NavigationComponent {

  state = {
    conversation: null,


    isTopBarMenuVisible: false,
  };

  service = new PublicConversationService();

  constructor(props) {
    super(props);
  }

  closeTopBarMenu = () => {
    this.setState({
      isTopBarMenuVisible: false
    });
  };

  openTopBarMenu = () => {
    this.setState({
      isTopBarMenuVisible: true
    });
  };

  getHeader() {

    const { theme, conversation, user } = this.props;
    const { isTopBarMenuVisible } = this.state;

    const isUserOwner = user.id === conversation.owner.id;


    return (
        <Appbar.Header>
          <Appbar.BackAction onPress={async () => {this.dismissWindow()}} />
          <Appbar.Content
              title={conversation.title}
              subtitle={"Public Chat" + (conversation.isArchived ? ' (archived)' : '')}
          />

          {/*<Appbar.Action icon="magnify" onPress={() => {}} />*/}
          <Menu
              visible={isTopBarMenuVisible}
              onDismiss={this.closeTopBarMenu}
              anchor={
                <Appbar.Action
                    icon={MORE_ICON}
                    color="white"
                    onPress={this.openTopBarMenu}
                />
              }
          >
            {
              isUserOwner ?
                  <>
                    <Menu.Item onPress={() => {}} title="Edit" />
                    <Menu.Item onPress={() => {}} title="Change Topics" />
                    <Menu.Item onPress={() => {}} title={!!conversation && conversation.isArchived ? 'UnArchive' : 'Archive'} />
                  </>

                  : <>
                    <Menu.Item onPress={() => {}} title="Leave" />
                  </>
            }
          </Menu>
        </Appbar.Header>
    );

  }

  render() {

    const { theme, conversation } = this.props;
    const { isTopBarMenuVisible } = this.state;

    return (
        <Layout appBar={this.getHeader()}>

          <View style={styles.messageListContainer}>

          </View>


          <MessageInput />


        </Layout>
    )
  }
}

const styles = StyleSheet.create({
  messageListContainer: {
    flex: 2,
    backgroundColor: '#00cc31'
  },
});

Conversation.propTypes = {

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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Conversation));