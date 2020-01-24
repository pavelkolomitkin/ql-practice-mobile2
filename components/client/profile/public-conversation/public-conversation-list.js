import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, VirtualizedList} from 'react-native';
import {FAB, withTheme, Portal, ActivityIndicator, Paragraph} from 'react-native-paper';
import {bindActionCreators} from 'redux';
import * as conversationActions from '../../../../redux/actions/client/public-conversation';
import {connect} from 'react-redux';
import CreateConversationForm from './create-conversation-form';
import PublicConversationService from '../../../../services/client/public-conversation-service';
import PublicConversationItem from './public-conversation-item';


class PublicConversationList extends Component {

  static ITEMS_PER_PAGE = 10;

  state = {
    list: null,
    isCreateFormVisible: false,

    noMoreItems: false,
    isLoading: false
  };

  service = new PublicConversationService();

  onAddButtonPressHandler = () => {
    this.setState({
      isCreateFormVisible: true
    });
  };

  onCreateFormClose = () => {
    this.setState({
      isCreateFormVisible: false
    });
  };

  componentDidUpdate(prevProps): void {

    if (this.props.createdPublic !== prevProps.createdPublic)
    {
      // add the new one as the first one in the list
      const { list } = this.state;

      this.setState({
        list: [this.props.createdPublic, ...list]
      });
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

  render() {

    const { isCreateFormVisible, list, isLoading } = this.state;

    return (
      <View style={styles.container} >

        { list &&
          <>
            {
              list.length > 0 ?
                  <FlatList
                      data={list}
                      renderItem={({ item }) => <PublicConversationItem key={item.id} conversation={item}/> }
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

        <CreateConversationForm
          isVisible={isCreateFormVisible}
          onClose={this.onCreateFormClose}
        />
        <Portal>
          <FAB
              style={styles.fab}
              visible={!isCreateFormVisible}
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
    createdPublic: state.publicConversation.lastCreated
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    conversationActions: bindActionCreators(conversationActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(PublicConversationList));