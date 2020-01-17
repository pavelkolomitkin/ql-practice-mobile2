import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withTheme, Headline, Button,  Avatar, List, Subheading, Caption } from 'react-native-paper';
import Layout from '../../../components/client/layout';
import * as actions from '../../../redux/actions/security/security';
import DefaultAvatar from '../../../assets/default_avatar.png';
import LanguageSkillItem from '../../../components/client/language-skill-item';

class MyProfile extends Component {

  state = {
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

  render() {

    const { colors } = this.props.theme;
    const { profile } = this.state;

    return (

        <Layout>
          <View>
            <Button onPress={this.onLogoutPressHandler}>Logout</Button>

            {/* The picture and name */}
            <List.Section>
              <View>
                <Avatar.Image
                    style={{}}
                    source={profile.avatar}
                    size={80}
                />
              </View>
              <View>
                <Subheading>{ profile.fullName }</Subheading>
              </View>
            </List.Section>
            {/*// The picture and name */}

            <List.Section title="About me">
              <Caption>{ profile.about }</Caption>
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
        </Layout>
    )
  }
}

MyProfile.propTypes = {

};

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(MyProfile));