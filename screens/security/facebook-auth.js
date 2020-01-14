import React, {Component} from 'react';

import {Text, View} from 'react-native';
import Layout from './layout';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux/actions/security/facebook';
import {Button, Spinner} from 'native-base';
import { LoginButton, AccessToken, LoginManager} from 'react-native-fbsdk';
import * as navigation from '../../navigation/index';

class FacebookAuth extends Component {

    //tokenListener = null;

    state = {
        isLoading: false,
        error: null,
    };

    componentDidMount(): void {

        // this.tokenListener = AccessToken.addListener((token) => {
        //     console.log('ACCESS TOKEN HAS CHANGED', token);
        // });


        //
        // AccessToken.getCurrentAccessToken().then((result) => {
        //     console.log('CHECKING THE LOGIN TOKEN', result);
        // });
    }

    componentWillUnmount(): void {
        // if (!!this.tokenListener)
        // {
        //     this.tokenListener();
        // }
    }

    onLoginPressHandler = async () => {

        this.setState({
            isLoading: true
        });

        LoginManager.logOut();

        await LoginManager
            .logInWithPermissions(['public_profile'])
            .then((result) => {

                AccessToken.getCurrentAccessToken().then((token) => {

                    this
                        .props
                        .actions
                        .login(token)
                        .then(async () => {
                            await navigation.setClientNavigation();
                        })
                        .catch((errors) => {
                            debugger
                            this.setState({
                                isLoading: false,
                                errors: 'Cannot authorize using facebook'
                            })
                        });
                });

            })
            .catch((error) => {
                this.setState({
                    isLoading: false,
                    errors: 'Cannot authorize using facebook'
                });
            })
        ;
    };

    render() {

        const { isLoading, error } = this.state;

        return (
            <Layout title="FaceBook Login">
                <View>
                    <Button
                        primary
                        onPress={this.onLoginPressHandler}
                        disabled={isLoading}
                    >
                        { isLoading && <Spinner color='#fff'/>}
                        <Text>Log in</Text>
                    </Button>
                    { !!error &&  <Text>{ error }</Text> }
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
