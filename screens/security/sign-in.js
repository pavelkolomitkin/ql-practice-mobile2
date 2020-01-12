import React, {Component} from 'react';

import {View, StyleSheet, KeyboardAvoidingView} from 'react-native';
import Layout from './layout';
import theme from '../../theme/index';
import {
    Item,
    Input,
    Button,
    Text,
    Spinner,
    Toast
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux/actions/security';
import { Navigation } from 'react-native-navigation';
import * as navigation from '../../navigation/index'
import validator from 'validator/es';

class SignIn extends Component {

    state = {
        email: '',
        password: '',
        isLoading: false
    };

    constructor(props) {
        super(props);

        Navigation.events().bindComponent(this);
    }


    componentDidAppear() {
        //this.setState({ text: 'componentDidAppear' });
        //console.log('Login Screen appeared');
    }

    componentDidDisappear() {
        //alert('componentDidDisappear');
        //console.log('Login Screen disappeared');
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
                //console.log('LOGIN ERROR', message);
                Toast.show({
                    text: message,
                    duration: 1500,
                })
            });


        this.setState({
            isLoading: false
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

        const { email, password, isLoading } = this.state;

        return (
            <Layout title="Sign In">
                <KeyboardAvoidingView >

                    <Item style={{ paddingBottom: 10 }}>

                        <Icon active name='envelope' size={theme.form.icon.defaultSize * 0.7} style={{ marginRight: 5 }}  />
                        <Input placeholder='Your Email' value={email} onChangeText={
                            (value) => this.onFieldChange('email', value)
                        }/>

                    </Item>

                    <Item last style={{ paddingBottom: 10 }}>
                        <Icon active name='lock' size={theme.form.icon.defaultSize} style={{ marginRight: 5 }} />
                        <Input placeholder='Password' secureTextEntry value={password}
                               onChangeText={
                                   (value) => this.onFieldChange('password', value)
                               }
                        />
                    </Item>


                    <Button
                        style={{ justifyContent: 'center' }}
                        onPress={this.onSubmit}
                        disabled={isLoading || !this.isFormValid()}
                        active={true}
                        info
                    >
                        { !isLoading ? <Text>Sign In</Text>:
                            <Spinner color='#fff'/>
                        }
                    </Button>

                </KeyboardAvoidingView>
            </Layout>
        );
    }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);