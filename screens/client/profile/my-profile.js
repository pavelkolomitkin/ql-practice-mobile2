import React, { Component } from 'react';
import {Image, Text, View} from 'react-native';
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
import DefaultAvatar from '../../../assets/default_avatar.png';
import LanguageSkillItem from '../../../components/client/language-skill-item';
import UserAvatar from '../../../components/client/profile/avatar';
import FullNameEditForm from '../../../components/client/profile/fullname-edit-form';
import AboutMeEditForm from '../../../components/client/profile/about-me-edit-form';

class MyProfile extends Component {

  state = {

    isEditingFullName: false,

    isEditingAboutMe: false,

    profile: {
      avatar: DefaultAvatar,
      fullName: 'Pavel Kolomitkin',
      about: 'BBC News is an operational business division[2] of the British Broadcasting Corporation (BBC) responsible for the gathering and broadcasting of news and current affairs. The department is the world\'s largest broadcast news organisation and generates about 120 hours of radio and television output each day, as well as online news coverage.[3][4] The service maintains 50 foreign news bureaux with more than 250 correspondents around the world.[5] Fran Unsworth has been Director of News and Current Affairs since January 2018.[6][7]',
      skills: [
        {
          id: 1,
          language: {
            id: 1,
            title: 'English'
          },
          level: {
            id: 3,
            title: 'Intermediate',
            code: 'intermediate',
            level: 2
          },
          tags: []
        },
        {
          id: 2,
          language: {
            id: 2,
            title: 'Russian'
          },
          level: {
            id: 3,
            title: 'Native',
            code: 'native',
            level: 4
          },
          tags: []
        },
        {
          id: 4,
          language: {
            id: 10,
            title: 'German'
          },
          level: {
            id: 2,
            title: 'Elementary',
            code: 'elementary',
            level: 1
          },
          tags: []
        },
      ]
    }
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

    const { user, theme: { colors } } = this.props;
    const { profile, isEditingFullName, isEditingAboutMe } = this.state;

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

                  {
                    profile.skills.map(skill => <LanguageSkillItem
                        key={skill.id}
                        skill={skill}
                    />)
                  }

                  <List.Item>
                    <Button icon="plus-circle" color={colors.accent}>Add</Button>
                  </List.Item>

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