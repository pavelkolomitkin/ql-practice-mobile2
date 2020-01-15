import React, {Component} from 'react';

import {View, StyleSheet, KeyboardAvoidingView, ScrollView} from 'react-native';
import Layout from './layout';
import theme from '../../theme/index';
import { withTheme, TextInput, HelperText, Button, Snackbar} from 'react-native-paper';
import styled from 'styled-components';
// import {
//     Item,
//     Input,
//     Button,
//     Text,
//     Spinner,
//     Toast
// } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux/actions/security/security';
import { Navigation } from 'react-native-navigation';
import * as navigation from '../../navigation/index'
import validator from 'validator/es';

class SignIn extends Component {

    state = {
        email: '',
        password: '',
        isLoading: false,
        error: null
    };

    /**
     * @type EventSubscription
     */
    navigationSubscription = null;

    constructor(props) {
        super(props);

        this.navigationSubscription = Navigation.events().bindComponent(this);
    }


    componentDidAppear() {
        //this.setState({ text: 'componentDidAppear' });
        //console.log('Login Screen appeared');
    }

    componentDidDisappear() {
        //alert('componentDidDisappear');
        //console.log('Login Screen disappeared');
    }

    componentWillUnmount(): void {
        this.navigationSubscription.remove();
    }


    onSubmit = async () => {
        this.setState({
            isLoading: true
        });

        const { email, password } = this.state;

        await this
            .props
            .actions
            .login(email, password)
            .then(async (data) => {
                // console.log('LOGIN SUCCESS', data);
                //alert('USER LOGGED IN');
                // switch to the authorized user navigation
                await navigation.setClientNavigation();
            })
            .catch(({ message }) => {
                this.setState({
                    isLoading: false,
                    error: message
                });
                //console.log('LOGIN ERROR', message);
                // Toast.show({
                //     text: message,
                //     duration: 1500,
                // })
            });
    };

    onFieldChange = (name, value) => {
        this.setState({
            [name]: value
        });
    };

    isFormValid = () => {
        const { email, password } = this.state;

        return validator.isEmail(email) && (password.trim() !== '');
    };


    render() {

        const { email, password, isLoading, error } = this.state;
        const { theme } = this.props;

        return (
            <Layout>
                <ScrollView contentContainerStyle={[ styles.container ]}>
                    <KeyboardAvoidingView>

                        <FormGroup>
                            <TextInput
                                label="Your Email"
                                style={{ backgroundColor: 'transparent', paddingHorizontal: 0 }}
                                //placeholder="Your Email"
                                value={email}
                                // error={!this._isUsernameValid(this.state.nameNoPadding)}
                                onChangeText={
                                    (value) => this.onFieldChange('email', value)
                                }
                            />
                        </FormGroup>

                        <FormGroup>
                            <TextInput
                                label="Password"
                                style={{ backgroundColor: 'transparent', paddingHorizontal: 0 }}
                                //placeholder="Password"
                                value={password}
                                // error={!this._isUsernameValid(this.state.nameNoPadding)}
                                onChangeText={
                                    (value) => this.onFieldChange('password', value)
                                }
                                secureTextEntry
                            />
                        </FormGroup>

                        <FormGroup>
                            <Button
                                mode="outlined"
                                onPress={this.onSubmit}
                                loading={isLoading}
                                disabled={isLoading || !this.isFormValid()}
                            >Sign In</Button>
                        </FormGroup>
                        <FormGroup>
                            <Snackbar
                                duration={3000}
                                visible={!!error}
                                onDismiss={() => this.setState({ error: false })}
                            >
                                { error }
                            </Snackbar>
                        </FormGroup>

                    </KeyboardAvoidingView>

                </ScrollView>

            </Layout>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 4
    }
});

const FormGroup = styled.View`
  margin: 8px
`;

const mapStateToProps = (state) => {
    return {
        errors: state.security.loginErrors
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(SignIn));