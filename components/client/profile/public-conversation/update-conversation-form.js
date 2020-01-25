import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Text, View } from 'react-native';
import ConversationForm from './conversation-form';
import DialogForm from '../../../common/dialog-form';
import {bindActionCreators} from 'redux';
import * as conversationActions from '../../../../redux/actions/client/public-conversation';
import * as securityActions from '../../../../redux/actions/security/security';
import {connect} from 'react-redux';
import {withTheme} from 'react-native-paper';

class UpdateConversationForm extends DialogForm {

  constructor(props) {
    super(props);

    this.state.title = '';
    this.state.selectedLanguage = null
  }

  async processSubmit() {

    const { title, selectedLanguage } = this.state;
    const { conversation } = this.props;

    if (!conversation)
    {
      await this.props.conversationActions.create(title, selectedLanguage);
    }
    else
    {
      const edited = {...conversation, title, language: selectedLanguage};
      await this.props.conversationActions.update(edited);
    }

    super.processSubmit();
  };

  componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {

    const { isVisible, conversation, user } = this.props;
    if (!user)
    {
      return;
    }

    if (isVisible && !prevProps.isVisible)
    {
      if (!conversation)
      {
        this.setState({
          title: '',
          selectedLanguage: null
        });
      }
      else
      {
        this.setState({
          title: conversation.title,
          selectedLanguage: user.skills.map(skill => skill.language).find(language => language.id === conversation.language.id)
        });
      }
    }
  }

  componentDidMount(): void {

    const { conversation, user } = this.props;
    if (!user)
    {
      return;
    }

    if (!!conversation)
    {
      this.setState({
        title: conversation.title,
        selectedLanguage: user.skills.map(skill => skill.language).find(language => language.id === conversation.language.id)
      })
    }
  }

  getHeader()
  {
    const { conversation } = this.props;

    return !conversation ? 'Add Public' : 'Edit Public';
  }

  render() {

    const { errors, isLoading, title, selectedLanguage } = this.state;
    const { user, isVisible } = this.props;
    if (!user)
    {
      return (<></>);
    }

    return (
      <ConversationForm
        isVisible={isVisible}
        onDismiss={this.onDismissHandler}
        errors={errors}
        isLoading={isLoading}
        title={title}
        header={this.getHeader()}
        languages={ user.skills.map(skill => skill.language) }
        onFieldChange={this.onFieldChangeHandler}
        selectedLanguage={selectedLanguage}
        onSubmit={this.onSubmit}
      />
    )
  }
}

UpdateConversationForm.propTypes = {
  conversation: PropTypes.object
};

UpdateConversationForm.defaultProps = {
  conversation: null
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

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(UpdateConversationForm));