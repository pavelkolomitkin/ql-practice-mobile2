import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, VirtualizedList} from 'react-native';
import {
  FAB,
  withTheme,
  Portal,
  ActivityIndicator,
  Paragraph,
  Menu
} from 'react-native-paper';
import {bindActionCreators} from 'redux';
import * as conversationActions from '../../../../redux/actions/client/public-conversation';
import {connect} from 'react-redux';
import PublicConversationService from '../../../../services/client/public-conversation-service';
import PublicConversationItem from './public-conversation-item';
import UpdateConversationForm from './update-conversation-form';


class PublicConversationList extends Component {

  static ITEMS_PER_PAGE = 10;

  state = {
    itemContextMenu: null,
    contextMenuAnchor: { x: 0, y: 0},

    updatingConversation: null,

    list: null,
    isUpdateFormVisible: false,

    noMoreItems: false,
    isLoading: false
  };

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
      const index = list.findIndex(item => item.id === updatedPublic.id);
      if (index !== -1)
      {
        list[index] = updatedPublic;

        this.setState({
          list: [...list]
        });
      }
    }
  }

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

  onContextMenuHandler = (conversation, event) => {

    //debugger
    const { nativeEvent } = event;
    this.setState({
      itemContextMenu: conversation,
      contextMenuAnchor: {
        x: nativeEvent.pageX,
        y: nativeEvent.pageY - 40, // TODO fix it later
      }
    });
  };

  onHideContextMenuHandler = () => {
    this.setState({
      itemContextMenu: null,
      contextMenuAnchor: {}
    });
  };

  onEditConversationHandler = (conversation) => {
    this.setState({
      isUpdateFormVisible: true,
      updatingConversation: conversation,
      itemContextMenu: null
    });
  };

  render() {

    const {
      isUpdateFormVisible,
      list,
      isLoading,
      itemContextMenu,
      contextMenuAnchor,
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

        <Portal>
          <Menu
              visible={!!itemContextMenu}
              onDismiss={this.onHideContextMenuHandler}
              anchor={contextMenuAnchor}
          >
            <Menu.Item onPress={() => { this.onEditConversationHandler(itemContextMenu) }} title="Edit" />
            <Menu.Item onPress={() => {}} title="Change Topics" />
            <Menu.Item onPress={() => {}} title="Archive" />
            {/*<Divider />*/}
            {/*<Menu.Item onPress={() => {}} title="Item 3" disabled />*/}
          </Menu>
        </Portal>

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