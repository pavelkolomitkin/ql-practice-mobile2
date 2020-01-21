import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { View } from 'react-native';
import {
  withTheme,
    Button
} from 'react-native-paper';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as securityActions from '../../../../redux/actions/security/security';
import CreateLanguageSkillForm from './create-language-skill-form';

class SkillList extends Component {

  state = {
    isCreateFormVisible: false
  };

  onAddButtonPressHandler = () => {
    this.setState({
      isCreateFormVisible: true
    });
  };

  onCreateFormCloseHandler = () => {
    this.setState({
      isCreateFormVisible: false
    });
  };

  render() {

    const { isCreateFormVisible } = this.state;

    return (
      <View>
        <Button onPress={this.onAddButtonPressHandler}>Add</Button>
        <CreateLanguageSkillForm isVisible={isCreateFormVisible} onClose={this.onCreateFormCloseHandler} />
      </View>
    )
  }
}

SkillList.propTypes = {
  user: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    authUser: state.security.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    securityActions: bindActionCreators(securityActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(SkillList));