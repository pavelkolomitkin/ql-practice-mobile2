import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Text, View, FlatList } from 'react-native';
import {bindActionCreators} from 'redux';
import * as securityActions from '../../../redux/actions/security/security';
import * as conversationActions from '../../../redux/actions/client/public-conversation';
import * as messageActions from '../../../redux/actions/client/public-conversation-message';
import {connect} from 'react-redux';
import {withTheme} from 'react-native-paper';
import {TextMessage} from '../../../services/model/message/text-message';
import TextMessageComponent from '../conversation/message/text-message';
import PictureMessageComponent from '../conversation/message/picture-message';
import VoiceMessageComponent from '../conversation/message/voice-message';
import {PictureMessage} from '../../../services/model/message/picture-message';
import {VoiceMessage} from '../../../services/model/message/voice-message';
import DeletedMessageComponent from '../conversation/message/deleted-message';

class MessageList extends Component {

  state = {
    list: []
  };

  componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {

    const { lastCreatedMessage } = this.props;

    if (!!lastCreatedMessage && (lastCreatedMessage !== prevProps.lastCreatedMessage))
    {
      this.setState({
        list: [...this.state.list, lastCreatedMessage]
      });
    }
  }

  componentDidMount(): void {

    //

  }

  itemKeyExtractor = (item) => {
    if (!item.id)
    {
      return +new Date();
    }
    else
    {
      return item.id;
    }
  };

  getItemComponent = ({item}) => {

    if (item.isRemoved)
    {
      return (
          <DeletedMessageComponent message={item} />
      );
    }
    else if (item instanceof TextMessage)
    {
      return (
          <TextMessageComponent message={item}/>
      );
    }
    else if (item instanceof PictureMessage)
    {
      return (<PictureMessageComponent message={item} />);
    }
    else if (item instanceof VoiceMessage)
    {
      return (<VoiceMessageComponent message={item} />);
    }

    return (<></>);
  };

  render() {

    const { list } = this.state;

    return (
      <View style={{
        flex: 1,
        backgroundColor: '#ccc'
      }}>
        <FlatList
            data={list}
            keyExtractor={this.itemKeyExtractor}
            renderItem={this.getItemComponent}
            inverted={true}
        />
      </View>
    )
  }
}

MessageList.propTypes = {
    
};

const mapStateToProps = (state) => {
  return {
    user: state.security.user,
    lastCreatedMessage: state.publicConversationMessage.lastCreatedMessage
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    securityActions: bindActionCreators(securityActions, dispatch),
    conversationActions: bindActionCreators(conversationActions, dispatch),
    messageActions: bindActionCreators(messageActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(MessageList));