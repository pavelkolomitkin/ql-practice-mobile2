import React, {Component} from 'react';

import validator from 'validator/es';
import {View, KeyboardAvoidingView, TouchableOpacity, ScrollView} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styled from 'styled-components';
import Layout from './layout';
import FormFieldError from '../../components/common/form-field-error';
import AgreementButton from '../../components/security/agreement-button';
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
import * as actions from '../../redux/actions/security/security';
import {Navigation} from 'react-native-navigation';

class SignUp extends Component {

    state = {
        email: '',
        password: '',
        name: '',
        nativeLanguage: null,
        practiceLanguage: null,
        practiceLanguageLevel: null,
        isAgreementAccepted: false,

        errors: {},
        isAccountCreated: false,
        isLoading: false
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
        this.setState({ isAccountCreated: false, isAgreementAccepted: false });
    }

    componentDidDisappear() {
        this.setState({ isAccountCreated: false, isAgreementAccepted: false });
    }

    componentWillUnmount(): void {
        this.navigationSubscription.remove();
    }

    onFieldChangeHandler = (name, value) => {
        //console.log(name, value);
        this.setState({
            [name]: value
        })
    };


    onAgreementAcceptHandler = () => {
        this.setState({
            isAgreementAccepted: true
        });
    }

    onSubmit = async () => {

        this.setState({
            errors: {},
            isLoading: true,
        });

        const {
            email,
            name,
            password,
            nativeLanguage,
            practiceLanguage,
            practiceLanguageLevel
        } = this.state;

        await this.props.actions.register(
            email,
            name,
            password,
            password,
            nativeLanguage,
            practiceLanguage,
            practiceLanguageLevel
        )
            .then((result) => {
                // show the success interface
                console.log('USER REGISTER SUCCESS', result);
                this.setState({
                    isAccountCreated: true,
                    isLoading: false
                });
            })
            .catch((errors) => {
                // show validation errors
                console.log('USER REGISTER ERROR', errors);

                this.setState({
                    errors,
                    isLoading: false
                })
            });
    };

    isFormValid()
    {
        const { email, password, name, nativeLanguage, practiceLanguage, practiceLanguageLevel, isAgreementAccepted } = this.state;

        if (
            !validator.isEmail(email) ||
            validator.isEmpty(password, { ignore_whitespace:true }) ||
            validator.isEmpty(name, { ignore_whitespace:true }) ||
            !nativeLanguage ||
            !practiceLanguage ||
            !practiceLanguageLevel ||
            !isAgreementAccepted
        )
        {
            return false;
        }


        return true;
    }

    getDefaultPracticeLanguage()
    {
        const { languages } = this.props;

        return languages.find(item => item.code === 'EN');
    }

    getDefaultPracticeLanguageLevel()
    {
        const { languageLevels } = this.props;

        return languageLevels.find(item => item.code === 'beginner');
    }

    componentDidMount(): void {

        this.setState({
            practiceLanguage: this.getDefaultPracticeLanguage(),
            practiceLanguageLevel: this.getDefaultPracticeLanguageLevel()
        });
    }

    renderAccountCreated()
    {
        return (
            <Layout title="Account is Created">
                <Text h2>Check you email to confirm your account!</Text>
            </Layout>
        );
    }

    render() {

        const {
            email,
            password,
            name,
            nativeLanguage,
            practiceLanguage,
            practiceLanguageLevel,
            isAgreementAccepted,
            errors,
            isAccountCreated,
            isLoading
        } = this.state;

        if (isAccountCreated)
        {
            return this.renderAccountCreated();
        }


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
                        <FormFieldError name="email" errors={errors} />

                    </Item>

                    <Item style={{ paddingBottom: 10 }}>
                        <Icon active name='lock' size={theme.form.icon.defaultSize} style={{ marginRight: 5 }} />
                        <Input placeholder='Password' secureTextEntry value={password}
                               onChangeText={
                                   (value) => this.onFieldChangeHandler('password', value)
                               }
                        />
                        <FormFieldError name="password" errors={errors} />
                    </Item>

                    <Item style={{ paddingBottom: 10 }}>
                        <Icon active name='user' size={theme.form.icon.defaultSize} style={{ marginRight: 5 }} />
                        <Input placeholder='Your Name' value={name}
                               onChangeText={
                                   (value) => this.onFieldChangeHandler('name', value)
                               }
                        />
                        <FormFieldError name="name" errors={errors} />
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
                            <Picker.Item key={0} label="Select a language" value={null}/>
                            {
                                !!languages && languages.map((language) => {
                                    return (<Picker.Item key={language.id} label={language.title} value={language} />);
                                })
                            }

                        </Picker>
                        <FormFieldError name="nativeLanguage" errors={errors} />
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
                            { !!languages && languages.map((language) => {
                                return (<Picker.Item key={language.id} label={language.title} value={language} />);
                            }) }
                        </Picker>
                        <FormFieldError name="practiceLanguage" errors={errors} />
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
                            { !!languageLevels && languageLevels.map((level) => {
                                return (<Picker.Item key={level.id} label={level.title} value={level} />);
                            }) }
                        </Picker>

                        <FormFieldError name="practiceLanguageLevel" errors={errors} />
                    </Item>


                    <AgreementButton onAcceptHandler={this.onAgreementAcceptHandler} />



                    <Button
                        style={{ justifyContent: 'center' }}
                        onPress={this.onSubmit}
                        disabled={isLoading || !this.isFormValid()}
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
        actions: bindActionCreators(actions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);