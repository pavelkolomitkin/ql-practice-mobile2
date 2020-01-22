import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { View, Alert} from 'react-native';
import {
  withTheme,
    Button
} from 'react-native-paper';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as skillActions from '../../../../redux/actions/client/language-skill';
import * as securityActions from '../../../../redux/actions/security/security';
import CreateLanguageSkillForm from './create-language-skill-form';
import LanguageSkillItem from './language-skill-item';
import Toast from 'react-native-root-toast';
import EditLanguageSkillForm from './edit-language-skill-form';

class SkillList extends Component {

  state = {
    isCreateFormVisible: false,
    isEditFormVisible: false,
    editingSkill: null
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

  onEditFormCloseHandler = () => {
    this.setState({
      isEditFormVisible: false
    });
  };

  onEditSkill = async (skill) => {
    this.setState({
      isEditFormVisible: true,
      editingSkill: skill
    });
  };

  onRemoveSkill = async (skill) => {

    //debugger
    const { authUser } = this.props;

    Alert.alert('Remove Skill?', 'Are you sure?', [
      {
        text: 'Remove',
        onPress: async () => {

          try
          {
            await this.props.skillActions.remove(skill);
            const index = authUser.skills.findIndex(item => item.id === skill.id);
            authUser.skills.splice(index, 1);

            await this.props.securityActions.updateUser({...authUser});
          }
          catch (errors) {
            Toast.show('Cannot remove this skill');
          }
        },
      },
      {
        text: 'Cancel',
        onPress: () => {}
      }
    ])

  };

  getSkillList = () => {

    const { user, authUser } = this.props;

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

    //debugger

    return (skills.length > 0) ? skills.map(skill => <LanguageSkillItem
        key={skill.id}
        skill={skill}
        onEdit={user.id === authUser.id ? this.onEditSkill : null}
        onRemove={user.id === authUser.id ? this.onRemoveSkill : null}
    />) : null

  };

  render() {

    const { isCreateFormVisible, isEditFormVisible, editingSkill } = this.state;
    const { user } = this.props;

    return (
      <>
        { this.getSkillList() }
        <Button onPress={this.onAddButtonPressHandler}>Add</Button>
        <CreateLanguageSkillForm isVisible={isCreateFormVisible} onClose={this.onCreateFormCloseHandler} />
        <EditLanguageSkillForm isVisible={isEditFormVisible} skill={editingSkill} onClose={this.onEditFormCloseHandler} />
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
    securityActions: bindActionCreators(securityActions, dispatch),
    skillActions: bindActionCreators(skillActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(SkillList));