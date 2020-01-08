import React, {Component} from 'react';

import {View, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import Layout from './layout';
import {
    Item,
    Input,
    Button,
    Text,
    Spinner,
    Toast,
    Body,
    Picker,
    CheckBox,
    ListItem
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../../theme';

export default class SignUp extends Component {

    state = {
        email: '',
        password: '',
        name: '',
        nativeLanguage: null,
        practiceLanguage: null,
        isAgreementAccepted: false,

        isLoading: false
    };


    onFieldChangeHandler = (name, value) => {
        console.log(name, value);
        this.setState({
            [name]: value
        })
    };

    onSubmit = () => {

        this.setState({
            isLoading: true,
        });

    };

    render() {

        const {
            email,
            password,
            name,
            nativeLanguage,
            practiceLanguage,
            isAgreementAccepted,

            isLoading
        } = this.state;

        return (
            <Layout title="Sign Up">
                <KeyboardAvoidingView>
                    <Item style={{ paddingBottom: 10 }}>

                        <Icon active name='envelope' size={theme.form.icon.defaultSize * 0.7} style={{ marginRight: 5 }}  />
                        <Input placeholder='Your Email'
                               onChange={
                                   (value) => this.onFieldChangeHandler('email', value)
                               }
                        />

                    </Item>

                    <Item style={{ paddingBottom: 10 }}>
                        <Icon active name='lock' size={theme.form.icon.defaultSize} style={{ marginRight: 5 }} />
                        <Input placeholder='Password' secureTextEntry
                               onChange={
                                   (value) => this.onFieldChangeHandler('password', value)
                               }
                        />
                    </Item>

                    <Item style={{ paddingBottom: 10 }}>
                        <Icon active name='user' size={theme.form.icon.defaultSize} style={{ marginRight: 5 }} />
                        <Input placeholder='Your Name'
                               onChange={
                                   (value) => this.onFieldChangeHandler('name', value)
                               }
                        />
                    </Item>

                    <Item style={{ paddingBottom: 10 }}>
                        <Picker
                            mode="dropdown"
                            placeHolder="Your Native Language"
                            selectedValue={nativeLanguage}
                            onValueChange={(value) => this.onFieldChangeHandler('nativeLanguage', value)}
                        />
                    </Item>

                    <Item style={{ paddingBottom: 10 }}>
                        <Picker
                            mode="dropdown"
                            placeHolder="Language you practice"
                            selectedValue={practiceLanguage}
                            onValueChange={(value) => this.onFieldChangeHandler('practiceLanguage', value)}
                        />
                    </Item>



                    <ListItem style={{ paddingTop: 20, paddingBottom: 20, marginLeft: 0 }}  onPress={
                        () => this.onFieldChangeHandler('isAgreementAccepted', !isAgreementAccepted)
                    }>
                        <CheckBox checked={isAgreementAccepted} />
                        <Body>
                            <Text style={{ textAlign: 'left' }}>Accept the agreement</Text>
                        </Body>
                    </ListItem>



                    <Button
                        style={{ justifyContent: 'center' }}
                        onPress={this.onSubmit}
                        disabled={isLoading}
                        active={true}
                        info
                    >
                        { !isLoading ? <Text>Sign Up</Text>:
                            <Spinner color='#fff'/>
                        }
                    </Button>


                </KeyboardAvoidingView>
            </Layout>
        );
    }
}
