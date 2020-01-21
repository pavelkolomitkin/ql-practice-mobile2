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
import LanguageSkillItem from '../../language-skill-item';

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

  getSkillList = () => {

    const { user } = this.props;

    const skills = user.skills.sort((a, b) => {

      if (a.level.level > b.level.level)
      {
        return -1;
      }
      else if (a.level.level < b.level.level)
      {
        return 1;
      }

      return 0;
    });

    return (skills.length > 0) ? skills.map(skill => <LanguageSkillItem key={skill.id} skill={skill} />) : null

  };

  render() {

    const { isCreateFormVisible } = this.state;
    const { user } = this.props;

    return (
      <>
        { this.getSkillList() }
        <Button onPress={this.onAddButtonPressHandler}>Add</Button>
        <CreateLanguageSkillForm isVisible={isCreateFormVisible} onClose={this.onCreateFormCloseHandler} />
      </>
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