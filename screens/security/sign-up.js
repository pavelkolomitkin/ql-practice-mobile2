import React, {Component} from 'react';

import validator from 'validator/es';
import {View, KeyboardAvoidingView, TouchableOpacity, ScrollView, Picker, StyleSheet} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styled from 'styled-components';
import Layout from './layout';
import FormFieldError from '../../components/common/form-field-error';
import AgreementButton from '../../components/security/agreement-button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux/actions/security/security';
import {Navigation} from 'react-native-navigation';
import FormGroup from '../../components/common/form-group';
import {TextInput, Paragraph, Caption, Button, Text, Title, Subheading, Avatar, Surface, withTheme} from 'react-native-paper';

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

    formGroupMargin = 8;

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
        const { colors } = this.props.theme;

        return (

            <Surface style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', elevation: 2, margin: 5}}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end' }}>
                    <Avatar.Icon size={100} icon="check" color="white" style={{ backgroundColor: colors.accent }} />
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignContent: 'center' }}>
                    <Paragraph >Check you email to confirm your account!</Paragraph>
                </View>
            </Surface>


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

            <Layout>
                <KeyboardAwareScrollView>

                    <FormGroup margin={this.formGroupMargin}>
                        <TextInput
                            label="Your Email"
                            style={{ backgroundColor: 'transparent', paddingHorizontal: 0 }}
                            value={email}
                            onChangeText={
                                (value) => this.onFieldChangeHandler('email', value)
                            }
                        />
                        <FormFieldError name="email" errors={errors} />
                    </FormGroup>

                    <FormGroup margin={this.formGroupMargin}>
                        <TextInput
                            label="Password"
                            style={{ backgroundColor: 'transparent', paddingHorizontal: 0 }}
                            value={password}
                            onChangeText={
                                (value) => this.onFieldChangeHandler('password', value)
                            }
                            secureTextEntry
                        />
                        <FormFieldError name="password" errors={errors} />
                    </FormGroup>

                    <FormGroup margin={this.formGroupMargin}>
                        <TextInput
                            label="Your Name"
                            style={{ backgroundColor: 'transparent', paddingHorizontal: 0 }}
                            value={name}
                            onChangeText={
                                (value) => this.onFieldChangeHandler('name', value)
                            }
                        />
                        <FormFieldError name="name" errors={errors} />
                    </FormGroup>

                    <FormGroup margin={this.formGroupMargin}>
                        <Caption>Your Native Language</Caption>

                        <Picker
                            style={styles.picker}
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


                    </FormGroup>

                    <FormGroup margin={this.formGroupMargin}>
                        <Caption>Language you practice</Caption>
                        <Picker
                            style={styles.picker}
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
                    </FormGroup>

                    <FormGroup margin={this.formGroupMargin}>
                        <Caption>Your practice language level</Caption>

                        <Picker
                            style={styles.picker}
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
                    </FormGroup>

                    <FormGroup margin={this.formGroupMargin}>
                        <AgreementButton onAcceptHandler={this.onAgreementAcceptHandler} />
                    </FormGroup>

                    <FormGroup margin={this.formGroupMargin}>
                        <Button
                            mode="outlined"
                            onPress={this.onSubmit}
                            loading={isLoading}
                            disabled={isLoading || !this.isFormValid()}
                        >Sign Up</Button>
                    </FormGroup>

                </KeyboardAwareScrollView>
            </Layout>
        );
    }
}

const FieldLabel = styled.Text`
  font-size: 13px;
  color: #9c9c9c
`;

const AccountCreatedContainer = styled.View`
  flex: 1;
`;

const styles = StyleSheet.create({
    picker: {
        height: 35,
        marginLeft: -8
    },
});

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

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(SignUp));