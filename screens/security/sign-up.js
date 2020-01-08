import React, {Component} from 'react';

import {View, KeyboardAvoidingView, TouchableOpacity, ScrollView} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styled from 'styled-components';
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
    ListItem,
    Label
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../../theme';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux/actions/security';

class SignUp extends Component {

    state = {
        email: '',
        password: '',
        name: '',
        nativeLanguage: null,
        practiceLanguage: null,
        practiceLanguageLevel: null,
        isAgreementAccepted: false,

        isLoading: false
    };


    onFieldChangeHandler = (name, value) => {
        //console.log(name, value);
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
            practiceLanguageLevel,
            isAgreementAccepted,
            isLoading
        } = this.state;

        const { languages, languageLevels } = this.props;

        return (
            <Layout title="Sign Up">
                <KeyboardAwareScrollView>
                    <Item style={{ paddingBottom: 10 }}>

                        <Icon active name='envelope' size={theme.form.icon.defaultSize * 0.7} style={{ marginRight: 5 }}  />
                        <Input placeholder='Your Email' value={email}
                               onChangeText={
                                   (value) => this.onFieldChangeHandler('email', value)
                               }
                        />

                    </Item>

                    <Item style={{ paddingBottom: 10 }}>
                        <Icon active name='lock' size={theme.form.icon.defaultSize} style={{ marginRight: 5 }} />
                        <Input placeholder='Password' secureTextEntry value={password}
                               onChangeText={
                                   (value) => this.onFieldChangeHandler('password', value)
                               }
                        />
                    </Item>

                    <Item style={{ paddingBottom: 10 }}>
                        <Icon active name='user' size={theme.form.icon.defaultSize} style={{ marginRight: 5 }} />
                        <Input placeholder='Your Name' value={name}
                               onChangeText={
                                   (value) => this.onFieldChangeHandler('name', value)
                               }
                        />
                    </Item>

                    <View style={{ paddingTop: 10 }}>
                        <FieldLabel>Your Native Language</FieldLabel>
                    </View>

                    <Item style={{ paddingBottom: 10 }}>

                        <Picker

                            mode="dialog"
                            prompt="Your Native Language"
                            placeholder="Your Native Language"
                            selectedValue={nativeLanguage}
                            onValueChange={(value) => this.onFieldChangeHandler('nativeLanguage', value)}
                        >
                            { languages.map((language) => {
                               return (<Picker.Item key={language.id} label={language.title} value={language} />);
                            }) }

                        </Picker>
                    </Item>

                    <View style={{ paddingTop: 10 }}>
                        <FieldLabel>Language you practice</FieldLabel>
                    </View>

                    <Item style={{ paddingBottom: 10 }}>
                        <Picker
                            mode="dialog"
                            placeHolder="Language you practice"
                            prompt="Language you practice"
                            selectedValue={practiceLanguage}
                            onValueChange={(value) => this.onFieldChangeHandler('practiceLanguage', value)}
                        >
                            { languages.map((language) => {
                                return (<Picker.Item key={language.id} label={language.title} value={language} />);
                            }) }
                        </Picker>
                    </Item>

                    <View style={{ paddingTop: 10 }}>
                        <FieldLabel>Your practice language level</FieldLabel>
                    </View>

                    <Item style={{ paddingBottom: 10 }}>
                        <Picker
                            mode="dialog"
                            prompt="Your practice language level"
                            placeHolder="Your practice language level"
                            selectedValue={practiceLanguageLevel}
                            onValueChange={(value) => this.onFieldChangeHandler('practiceLanguageLevel', value)}
                        >
                            { languageLevels.map((level) => {
                                return (<Picker.Item key={level.id} label={level.title} value={level} />);
                            }) }
                        </Picker>
                    </Item>



                    <ListItem style={{ paddingTop: 20, paddingBottom: 20, marginLeft: 0 }}  onPress={
                        (event) =>
                        {
                            this.onFieldChangeHandler('isAgreementAccepted', !isAgreementAccepted);
                            event.preventDefault();
                        }
                    }>
                        <CheckBox checked={isAgreementAccepted} disabled={true} />
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


                </KeyboardAwareScrollView>
            </Layout>
        );
    }
}

const FieldLabel = styled.Text`
  font-size: 13px;
  color: #9c9c9c
`;

const mapStateToProps = (state) => {
    return {
        languages: state.language.languages,
        languageLevels: state.language.levels
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        //actions: bindActionCreators(actions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);