import React, {Component} from 'react';

import {Text, View} from 'react-native';

import Layout from './layout';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../../theme';
import {Button, Input, Item, Spinner, Content} from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux/actions/security';


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
        });

        const { email } = this.state;

        await this
            .props
            .actions
            .restorePasswordRequest(email)
            .then(() => {

                this.setState({
                    isLoading: false,
                    resendSecondsLeft: this.getSendRestoreRequestInterval()
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
            .catch((errors) => {

                this.setState({
                    isLoading: false,
                    errors
                });
            });
    };

    render() {

        const { email, isLoading, resendSecondsLeft, isSent } = this.state;

        return (
            <Layout title="Restore Password">
                <Content>
                    <Item style={{ paddingBottom: 10 }}>

                        <Icon active name='envelope' size={theme.form.icon.defaultSize * 0.7} style={{ marginRight: 5 }}  />
                        <Input placeholder='Your Email' value={email}
                               onChangeText={
                                   (value) => this.onFieldChangeHandler('email', value)
                               }
                        />

                    </Item>

                    {
                        (resendSecondsLeft > 0)
                            ?
                            <View>
                                {
                                    isSent &&
                                        <Text success>The restore password link was sent on your email</Text>
                                }
                                <Text>You can request after : { resendSecondsLeft } second(s)</Text>
                            </View>

                            :
                            <Button
                                style={{ justifyContent: 'center'}}
                                onPress={this.onSubmit}
                                disabled={isLoading}
                                active={true}
                                info
                            >
                                { !isLoading ? <Text style={{ color: '#fff', textTransform: 'uppercase'  }}>Restore</Text> :
                                    <Spinner color='#fff'/>
                                }
                            </Button>
                    }
                </Content>
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