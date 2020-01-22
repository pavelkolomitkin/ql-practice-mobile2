import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { View, Picker, ScrollView } from 'react-native';
import {Paragraph, Button, Portal, Dialog, Colors, TextInput, withTheme, Caption} from 'react-native-paper';
import FormGroup from '../../../common/form-group';
import {bindActionCreators} from 'redux';
import * as securityActions from '../../../../redux/actions/security/security';
import * as skillActions from '../../../../redux/actions/client/language-skill';
import {connect} from 'react-redux';
import FormFieldError from '../../../common/form-field-error';

class CreateLanguageSkillForm extends Component {

  state = {
      selectedLanguage: null,
      selectedLanguageLevel: null,
      errors: {},
      isLoading: false,
      languages: []
  };

    onDismissHandler = () => {
        const { onClose } = this.props;
        if (onClose)
        {
            onClose()
        }
    };

    onSubmitHandler = async () => {

        this.setState({
            isLoading: true,
            errors: {},
        });

        const { selectedLanguage, selectedLanguageLevel, user } = this.state;
        const { onClose } = this.props;
        try
        {
            const skill = await this.props.skillActions.create(selectedLanguage, selectedLanguageLevel, []);
            user.skills.push(skill);

            await this.props.securityActions.updateUser(user);
            if (onClose)
            {
                onClose();
            }

            this.exceptExistingLanguageSkills();
            this.setState({
                selectedLanguage: null,
                selectedLanguageLevel: null,
            });
        }
        catch (errors) {
            this.setState({
                errors
            });
        }

        this.setState({
            isLoading: false,
        });
    };

    onFieldChangeHandler = (name, value) => {

        this.setState({
            [name]: value
        });
    };

    exceptExistingLanguageSkills()
    {
        const { languages, user } = this.props;

        const availableLanguages = languages.filter(language => {
            return (user.skills.findIndex(skill => skill.language.id === language.id) === -1);
        });

        this.setState({
            languages: availableLanguages
        });
    }

    componentDidUpdate(prevProps): void {

        const { user } = this.state;

        if (user !== prevProps.user)
        {
            this.setState({
                user: prevProps.user
            });

            this.exceptExistingLanguageSkills();
        }
    }

    componentDidMount(): void {

        this.exceptExistingLanguageSkills();

        const { user } = this.props;

        this.setState({
            user,
        });
    }

    render() {

      const { languageLevels, isVisible, theme } = this.props;
      const { languages, selectedLanguage, selectedLanguageLevel, isLoading, errors } = this.state;

    return (
      <Portal>
          <Dialog visible={isVisible} onDismiss={this.onDismissHandler}>
              <Dialog.Title>Add Skill</Dialog.Title>
              <Dialog.ScrollArea style={{ paddingHorizontal: 0 }}>
                  <ScrollView contentContainerStyle={{ paddingHorizontal: 24 }}>
                      <FormGroup>
                          <Caption>Language</Caption>
                          <Picker
                              mode="dialog"
                              prompt="Language"
                              placeholder="Language"
                              selectedValue={selectedLanguage}
                              onValueChange={
                                  (value) => this.onFieldChangeHandler('selectedLanguage', value)
                              }
                          >
                              <Picker.Item key={0} label="Select Language" value={null}/>
                              {
                                  languages.map((language) => {
                                      return (<Picker.Item key={language.id} label={language.title} value={language} />);
                                  })
                              }
                          </Picker>
                          <FormFieldError name="language" errors={errors} />
                      </FormGroup>

                      <FormGroup>
                          <Caption>Level</Caption>
                          <Picker
                              mode="dialog"
                              prompt="Level"
                              placeholder="Level"
                              selectedValue={selectedLanguageLevel}
                              onValueChange={
                                  (value) => this.onFieldChangeHandler('selectedLanguageLevel', value)
                              }
                          >
                              <Picker.Item key={0} label="Select Level" value={null}/>
                              {
                                  languageLevels.map((level) => {
                                      return (<Picker.Item key={level.id} label={level.title} value={level} />);
                                  })
                              }
                          </Picker>
                          <FormFieldError name="level" errors={errors} />
                      </FormGroup>
                  </ScrollView>
              </Dialog.ScrollArea>
              <Dialog.Actions>
                  <Button
                      onPress={this.onDismissHandler}
                  >Cancel</Button>
                  <Button
                      color={theme.colors.primary}
                      loading={isLoading}
                      disabled={isLoading || (selectedLanguage === null) || (selectedLanguageLevel === null)}
                      onPress={this.onSubmitHandler}
                  >
                      OK
                  </Button>
              </Dialog.Actions>
          </Dialog>
      </Portal>
    )
  }
}

CreateLanguageSkillForm.propTypes = {
    onClose: PropTypes.func,
    isVisible: PropTypes.bool
};

const mapStateToProps = (state) => {
    return {
        languages: state.language.languages,
        languageLevels: state.language.levels,
        user: state.security.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        skillActions: bindActionCreators(skillActions, dispatch),
        securityActions: bindActionCreators(securityActions, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(CreateLanguageSkillForm));