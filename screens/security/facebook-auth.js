import React, {Component} from 'react';

import {Text, View} from 'react-native';
import Layout from './layout';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux/actions/security';
import { Button } from 'native-base';
import { LoginButton, AccessToken } from 'react-native-fbsdk';

class FacebookAuth extends Component {
    render() {
        return (
            <Layout title="FaceBook Login">
                <View>
                    <LoginButton
                        onLoginFinished={
                            (error, result) => {
                                if (error) {
                                    console.log("login has error: " + result.error);
                                } else if (result.isCancelled) {
                                    console.log("login is cancelled.");
                                } else {
                                    AccessToken.getCurrentAccessToken().then(
                                        (data) => {
                                            console.log(data.accessToken.toString())
                                        }
                                    )
                                }
                            }
                        }
                        onLogoutFinished={() => console.log("logout.")}/>
                </View>
            </Layout>
        );
    }
}

const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FacebookAuth);
