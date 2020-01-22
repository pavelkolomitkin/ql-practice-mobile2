import React, {Component} from 'react';

import {Text, View} from 'react-native';

import Layout from '../../components/security/layout';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../../theme';
import { Input, Item, Spinner, Content} from 'native-base';
import { Button } from 'react-native-paper';
import validator from 'validator/es';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux/actions/security/security';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {TextInput, Paragraph, Caption} from 'react-native-paper';
import FormFieldError from '../../components/common/form-field-error';
import FormGroup from '../../components/common/form-group';


class RestorePassword extends Component {

    state = {
        email: '',
        isLoading: false,
        isSent: false,
        resendSecondsLeft: 0,
        errors: {}
    };

    /**
     * A number of seconds the user is able to resend the restore request
     * @returns {number}
     */
    getSendRestoreRequestInterval() {
        return 10;
    }

    onFieldChangeHandler = (name, value) => {
        //console.log(name, value);
        this.setState({
            [name]: value
        });
    };

    onSubmit = async () => {

        this.setState({
            isLoading: true,
            isSent: false,
            errors: {}
        });

        const { email } = this.state;

        await this
            .props
            .actions
            .restorePasswordRequest(email)
            .then(() => {

                this.setState({
                    isLoading: false,
                    resendSecondsLeft: this.getSendRestoreRequestInterval(),
                    isSent: true
                });

                let timer = setInterval(() => {

                    let {resendSecondsLeft} = this.state;
                    --resendSecondsLeft;

                    this.setState({
                        resendSecondsLeft
                    });

                    if (resendSecondsLeft <= 0)
                    {
                        clearInterval(timer);
                    }
                }, 1000);
            })
            .catch(({ message }) => {

                this.setState({
                    isLoading: false,
                    errors: {
                        email: [message]
                    }
                });
            });
    };

    isFormValid()
    {
        const { email } = this.state;

        return validator.isEmail(email);
    }

    render() {

        const { email, errors, isLoading, resendSecondsLeft, isSent } = this.state;

        return (
            <Layout title="Restore Password">

                <KeyboardAwareScrollView>

                    <FormGroup>
                        <TextInput
                            label="Your Email"
                            style={{ backgroundColor: 'transparent', paddingHorizontal: 0 }}
                            value={email}
                            onChangeText={
                                (value) => this.onFieldChangeHandler('email', value)
                            }
                        />
                        <FormFieldError name="email" errors={errors} />
                        {
                            isSent &&
                            <View>
                                <Caption>The restore password link was sent on your email</Caption>
                            </View>
                        }
                        {
                            (resendSecondsLeft > 0)
                                ?
                                <View>
                                    <Caption>You can request after : { resendSecondsLeft } second(s)</Caption>
                                </View>

                                :
                                <FormGroup>
                                    <Button
                                        mode="outlined"
                                        onPress={this.onSubmit}
                                        loading={isLoading}
                                        disabled={isLoading || !this.isFormValid()}
                                    >
                                        Restore
                                    </Button>
                                </FormGroup>

                        }
                    </FormGroup>

                </KeyboardAwareScrollView>

                {/*<Item style={{ paddingBottom: 10 }}>*/}

                {/*    <Icon active name='envelope' size={theme.form.icon.defaultSize * 0.7} style={{ marginRight: 5 }}  />*/}
                {/*    <Input placeholder='Your Email' value={email}*/}
                {/*           onChangeText={*/}
                {/*               (value) => this.onFieldChangeHandler('email', value)*/}
                {/*           }*/}
                {/*    />*/}

                {/*</Item>*/}


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

export default connect(mapStateToProps, mapDispatchToProps)(RestorePassword);