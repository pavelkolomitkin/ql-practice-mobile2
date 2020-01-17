import React, {Component} from 'react';

import { KeyboardAvoidingView } from 'react-native';
import Layout from '../../components/security/layout';
import { withTheme, TextInput, Button, Snackbar} from 'react-native-paper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux/actions/security/security';
import { Navigation } from 'react-native-navigation';
import * as navigation from '../../navigation/index'
import validator from 'validator/es';
import FormGroup from '../../components/common/form-group';

class SignIn extends Component {

    state = {
        email: '',
        password: '',
        isLoading: false,
        error: null
    };

    constructor(props) {
        super(props);
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
            <Layout title="Sign In">

                    <KeyboardAvoidingView>

                        <FormGroup>
                            <TextInput
                                label="Your Email"
                                style={{ backgroundColor: 'transparent', paddingHorizontal: 0 }}
                                value={email}
                                onChangeText={
                                    (value) => this.onFieldChange('email', value)
                                }
                            />
                        </FormGroup>

                        <FormGroup>
                            <TextInput
                                label="Password"
                                style={{ backgroundColor: 'transparent', paddingHorizontal: 0 }}
                                value={password}
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

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(SignIn));