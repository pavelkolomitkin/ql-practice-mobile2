
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Layout from './layout';
import {BottomNavigation, withTheme, DefaultTheme, Colors} from 'react-native-paper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SignIn from './sign-in';
import SignUp from './sign-up';
import RestorePassword from './restore-password';
import FacebookAuth from './facebook-auth';
import { Appbar } from 'react-native-paper';

class Index extends Component {

  state = {
      header: 'Sign In',
      index: 0,
      routes: [
          { key: 'signIn', title: 'Sign In', icon: 'login', header: 'Sign In'},
          { key: 'signUp', title: 'Sign Up', icon: 'account-plus', header: 'Sign Up' },
          { key: 'restorePassword', title: 'Restore', icon: 'restore', header: 'Restore Password'},
          { key: 'facebookAuth', title: 'FB', icon: 'facebook', header: 'Facebook Login'},
      ]
  };

  onTabIndexChange = (index) => {
      this.setState({
          index,
          header: this.state.routes[index].header
      });
  };

  render() {

      const { header } = this.state;

    return (
        <>
            <Appbar.Header>
                <Appbar.Content
                    title="QL Practice"
                    subtitle={header}
                />
            </Appbar.Header>


            <BottomNavigation
                shifting={true}
                navigationState={this.state}
                onIndexChange={this.onTabIndexChange}
                renderScene={BottomNavigation.SceneMap({
                    signIn: () => <SignIn componentId="signIn" />,
                    signUp: () => <SignUp componentId="signUp" />,
                    restorePassword: () => <RestorePassword componentId="restorePassword" />,
                    facebookAuth: () => <FacebookAuth componentId="facebookAuth" />,
                })}
            />
        </>
    )
  }
}

Index.propTypes = {

};

const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        //actions: bindActionCreators(actions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Index));