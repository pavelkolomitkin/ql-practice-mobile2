import React, { Component } from 'react';
import {Text, View} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  withTheme,
  Headline,
  Button,
  Avatar,
  List,
  Subheading,
  Caption,
  Paragraph,
  Title,
  Colors,
  IconButton
} from 'react-native-paper';
import Layout from '../../../components/client/layout';
import * as actions from '../../../redux/actions/security/security';
import UserAvatar from '../../../components/client/profile/avatar';
import FullNameEditForm from '../../../components/client/profile/fullname-edit-form';
import AboutMeEditForm from '../../../components/client/profile/about-me-edit-form';
import SkillList from '../../../components/client/profile/skills/skill-list';

class MyProfile extends Component {

  state = {

    isEditingFullName: false,

    isEditingAboutMe: false,

  };

  onLogoutPressHandler = async () => {

    await this.props.actions.logout();
  };

  onEditPropPressHandler = async (propName) => {

    const propStateName = 'isEditing' + propName;

    this.setState({
      [propStateName]: true
    });
  };

  onEditPropCloseHandler = (propName) => {

    const propStateName = 'isEditing' + propName;

    this.setState({
      [propStateName]: false
    });
  };

  render() {

    const { user } = this.props;
    const { isEditingFullName, isEditingAboutMe } = this.state;

    return (

        <Layout>
          {
            user &&
              <View style={{ flex: 1 }}>
                <Button onPress={this.onLogoutPressHandler}>Logout</Button>

                <List.Section>
                  <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    paddingTop: 20,
                    paddingBottom: 20,
                  }}>
                    <View style={{ flex: 1, alignItems: 'center' }}>

                      { user && <UserAvatar user={user} />}

                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                      <Text style={{ fontSize: 18, fontWeight: 'bold', color: Colors.grey600 }}>{ user.fullName }</Text>
                      <IconButton icon="pencil" onPress={() => this.onEditPropPressHandler('FullName')} />
                    </View>
                    <View>
                      <FullNameEditForm isVisible={isEditingFullName} onClose={() => this.onEditPropCloseHandler('FullName')} />
                    </View>
                  </View>

                </List.Section>


                <List.Section title="About Me">
                  <Caption>{ !!user.aboutMe ? user.aboutMe : 'None' }</Caption>
                  <IconButton icon="pencil" onPress={() => this.onEditPropPressHandler('AboutMe')}/>
                  <AboutMeEditForm isVisible={isEditingAboutMe} onClose={() => this.onEditPropCloseHandler('AboutMe')} />
                </List.Section>

                <List.Section title="Language Skills">

                  <SkillList user={user} />
                </List.Section>

              </View>
          }


        </Layout>
    )
  }
}

MyProfile.propTypes = {

};

const mapStateToProps = (state) => {
  return {
    user: state.security.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(MyProfile));