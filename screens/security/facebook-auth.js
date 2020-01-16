import React, {Component} from 'react';

import {Text, View} from 'react-native';
import Layout from './layout';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux/actions/security/facebook';
import { Spinner} from 'native-base';
import { IconButton, withTheme, Button, Caption } from 'react-native-paper';
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

        //LoginManager.logOut();

        await LoginManager
            .logInWithPermissions(['public_profile'])
            .then((result) => {

                const { isCancelled } = result;

                if (!isCancelled)
                {
                    AccessToken.getCurrentAccessToken().then((token) => {

                        this
                            .props
                            .actions
                            .login(token)
                            .then(async () => {
                                await navigation.setClientNavigation();
                            })
                            .catch((errors) => {
                                this.setState({
                                    isLoading: false,
                                    errors: 'Cannot authorize using facebook'
                                })
                            });
                    });
                }
                else
                {
                    this.setState({
                        isLoading: false,
                        errors: null
                    });
                }



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

        const { colors } = this.props.theme;
        const { isLoading, error } = this.state;

        return (
            <Layout title="Facebook Login">
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Button
                        icon="facebook"
                        mode="contained"
                        color={colors.primary}
                        onPress={this.onLoginPressHandler}
                        loading={isLoading}
                        disabled={isLoading}
                    >
                        Login
                    </Button>
                    { !!error &&  <Caption>{ error }</Caption> }
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

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(FacebookAuth));
