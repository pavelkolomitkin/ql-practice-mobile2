import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, VirtualizedList} from 'react-native';
import {
  FAB,
  withTheme,
  Portal,
  ActivityIndicator,
  Paragraph,
  List,
    TouchableRipple
} from 'react-native-paper';
import {bindActionCreators} from 'redux';
import * as conversationActions from '../../../../redux/actions/client/public-conversation';
import {connect} from 'react-redux';
import PublicConversationService from '../../../../services/client/public-conversation-service';
import PublicConversationItem from './public-conversation-item';
import UpdateConversationForm from './update-conversation-form';
import Toast from 'react-native-root-toast';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers
} from 'react-native-popup-menu';

import * as navigation from '../../../../navigation/index';

class PublicConversationList extends Component {

  static ITEMS_PER_PAGE = 10;

  state = {
    itemContextMenu: null,

    updatingConversation: null,

    list: null,
    isUpdateFormVisible: false,

    noMoreItems: false,
    isLoading: false
  };

  constructor(props) {
    super(props);

    this.onPressConversationHandler = this.onPressConversationHandler.bind(this);
  }

  service = new PublicConversationService();

  onAddButtonPressHandler = () => {
    this.setState({
      isUpdateFormVisible: true
    });
  };

  onUpdateFormCloseHandler = () => {
    this.setState({
      isUpdateFormVisible: false,
      updatingConversation: null
    });
  };

  componentDidUpdate(prevProps): void {

    const {createdPublic, updatedPublic} = this.props;
    const { list } = this.state;

    if (!!createdPublic && (createdPublic !== prevProps.createdPublic))
    {
      // add the new one as the first one in the list
      this.setState({
        list: [createdPublic, ...list]
      });
    }
    if (!!updatedPublic && (updatedPublic !== prevProps.updatedPublic))
    {
      this.updateConversation(updatedPublic);
    }
  }

  updateConversation = (conversation) => {

    const { list } = this.state;

    const index = list.findIndex(item => item.id === conversation.id);
    if (index !== -1)
    {
      list[index] = conversation;

      this.setState({
        list: [...list]
      });
    }
  };

  async componentDidMount(): void {

    const list = await this.service.getMyList(null);
    this.setState({
      list
    });
  }

  onListEndReachedHandler = async (info) => {
    //
    const { noMoreItems, isLoading, list } = this.state;
    if (!list)
    {
      return;
    }

    if (!noMoreItems && !isLoading)
    {
      if (list.length === 0)
      {
        return;
      }

      this.setState({
        isLoading: true
      });

      const lastItem = list[list.length - 1];

      const items = await this.service.getMyList(lastItem.createdAt);

      this.setState({
        list: list.concat(items),
        noMoreItems: items.length < PublicConversationList.ITEMS_PER_PAGE,
        isLoading: false
      });
    }

    console.log('LIST END REACHED', info);
  };

  onContextMenuHandler = (conversation) => {

    this.setState({
      itemContextMenu: conversation,
    });
  };

  dismissContextMenu = () => {
    this.setState({
      itemContextMenu: null,
    });
  };

  onEditConversationHandler = (conversation) => {
    this.setState({
      isUpdateFormVisible: true,
      updatingConversation: conversation,
      itemContextMenu: null
    });
  };

  onToggleArchiveConversationHandler = async (conversation) => {

    this.setState({
      itemContextMenu: null
    });
    //debugger
    try
    {
      const updatedConversation = await this.props.conversationActions.setArchived(conversation, !conversation.isArchived);
      this.updateConversation(updatedConversation);
    }
    catch (error) {

      let message = 'Can not archive the public';
      if (!conversation.isArchived)
      {
        message = 'Can not unarchive the public';
      }

      Toast.show(message);
    }
  };

  onPressConversationHandler = async (conversation) => {
    //
    // debugger
    //
    await navigation.showPublicChat(conversation, this);
  };

  render() {

    const {
      isUpdateFormVisible,
      list,
      isLoading,
      itemContextMenu,
      updatingConversation
    } = this.state;

    return (
      <View style={styles.container} >

        { list &&
          <>
            {
              list.length > 0 ?
                  <FlatList
                      data={list}
                      renderItem={({ item }) => <PublicConversationItem
                          key={item.id}
                          conversation={item}
                          onContextMenu={this.onContextMenuHandler}
                          onPress={this.onPressConversationHandler}
                      /> }
                      keyExtractor={item => item.id.toString()}
                      onEndReached={this.onListEndReachedHandler}
                      onEndReachedThreshold={0.5}
                  />
                  :
                  <Paragraph>No Items</Paragraph>
            }
            {
              isLoading &&
              <Portal>
                <View style={styles.indicatorContainer}>
                  <ActivityIndicator
                      style={{ position: 'absolute' }}
                  />
                </View>
              </Portal>
            }
          </>
        }

        <UpdateConversationForm
          isVisible={isUpdateFormVisible}
          onClose={this.onUpdateFormCloseHandler}
          conversation={updatingConversation}
        />
        <Portal>
          <FAB
              style={styles.fab}
              visible={!isUpdateFormVisible}
              icon="plus"
              onPress={this.onAddButtonPressHandler}
          />
        </Portal>

        <Menu
            opened={!!itemContextMenu}
            renderer={ renderers.SlideInMenu}
            onBackdropPress={() => this.dismissContextMenu()}
        >
          <MenuTrigger />
          <MenuOptions>

            <MenuOption onSelect={() => {this.onEditConversationHandler(itemContextMenu)}}>
              <List.Item
                  title="Edit"
                  left={props => <List.Icon {...props} icon="pencil" />}
              />
            </MenuOption>

            <MenuOption>
              <List.Item
                  title="Change Topics"
                  left={props => <List.Icon {...props} icon="tag" />}
              />
            </MenuOption>

            <MenuOption onSelect={() => this.onToggleArchiveConversationHandler(itemContextMenu)}>
              <List.Item
                  title={(!!itemContextMenu && itemContextMenu.isArchived) ? 'UnArchive' : 'Archive'}
                  left={props => <List.Icon {...props} icon="delete" />}
              />
            </MenuOption>

            {/*<MenuOption onSelect={() => alert(`Save`)} text='Save' />*/}
            {/*<MenuOption onSelect={() => alert(`Delete`)} >*/}
            {/*  <Text style={{color: 'red'}}>Delete</Text>*/}
            {/*</MenuOption>*/}
            {/*<MenuOption onSelect={() => alert(`Not called`)} disabled={true} text='Disabled' />*/}
          </MenuOptions>
        </Menu>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  indicatorContainer: {
    position: 'absolute',
    bottom: 12,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },

  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

PublicConversationList.propTypes = {

};

const mapStateToProps = (state) => {
  return {
    createdPublic: state.publicConversation.lastCreated,
    updatedPublic: state.publicConversation.lastUpdated
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    conversationActions: bindActionCreators(conversationActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(PublicConversationList));