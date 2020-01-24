import React, { Component } from 'react';
import { Text, View } from 'react-native';
import ConversationForm from './conversation-form';
import DialogForm from '../../../common/dialog-form';
import {bindActionCreators} from 'redux';
import * as conversationActions from '../../../../redux/actions/client/public-conversation';
import * as securityActions from '../../../../redux/actions/security/security';
import {connect} from 'react-redux';
import {withTheme} from 'react-native-paper';

class CreateConversationForm extends DialogForm {

  constructor(props) {
    super(props);

    this.state.title = '';
    this.state.selectedLanguage = null
  }

  async processSubmit() {

    const { title, selectedLanguage } = this.state;
    await this.props.conversationActions.create(title, selectedLanguage);

    super.processSubmit();
  };

  componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
    if (this.props.isVisible && !prevProps.isVisible)
    {
      this.setState({
        title: '',
        selectedLanguage: null
      });
    }
  }

  render() {

    const { errors, isLoading, title, selectedLanguage } = this.state;
    const { user, isVisible } = this.props;

    return (
      <ConversationForm
        isVisible={isVisible}
        onDismiss={this.onDismissHandler}
        errors={errors}
        isLoading={isLoading}
        title={title}
        header="Add Public"
        languages={ user.skills.map(skill => skill.language) }
        onFieldChange={this.onFieldChangeHandler}
        selectedLanguage={selectedLanguage}
        onSubmit={this.onSubmit}
      />
    )
  }
}

CreateConversationForm.propTypes = {

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

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(CreateConversationForm));