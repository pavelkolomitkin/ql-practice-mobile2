import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import {Picker, ScrollView, Text, View} from 'react-native';
import {Paragraph, Button, Portal, Dialog, Colors, TextInput, withTheme, Caption} from 'react-native-paper';
import {bindActionCreators} from 'redux';
import * as skillActions from '../../../../redux/actions/client/language-skill';
import * as securityActions from '../../../../redux/actions/security/security';
import {connect} from 'react-redux';
import FormGroup from '../../../common/form-group';
import FormFieldError from '../../../common/form-field-error';

class EditLanguageSkillForm extends Component {

  state = {
      selectedLanguageLevel: null,
      isLoading: false,
      errors: {}
  };

    onDismissHandler = () => {
        const { onClose } = this.props;
        if (onClose)
        {
            onClose()
        }
    };

    onFieldChangeHandler = (name, value) => {

        this.setState({
            [name]: value
        });
    };

    onSubmitHandler = async () => {

        this.setState({
            isLoading: false,
            errors: {}
        });

        const { skill, onClose, user } = this.props;
        const { selectedLanguageLevel } = this.state;

        try
        {
            const updatedSkill = await this.props.skillActions.update(skill, selectedLanguageLevel, []);
            const index = user.skills.findIndex(item => item.id === updatedSkill.id);
            user.skills[index] = updatedSkill;

            await this.props.securityActions.updateUser({...user});

            if (onClose)
            {
                onClose();
            }
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

    componentDidUpdate(prevProps): void {

        const { skill } = this.state;
        const { languageLevels } = this.props;

        if (this.props.skill)
        {
            if (!skill || (skill.id !== this.props.skill.id))
            {
                this.setState({
                    skill: this.props.skill,
                    selectedLanguageLevel: languageLevels.find(item => item.id === this.props.skill.level.id)
                });
            }
        }

    }

    componentDidMount(): void {

        const { skill, languageLevels } = this.props;

        if (skill)
        {
            this.setState({
                skill: skill,
                selectedLanguageLevel: languageLevels.find(item => item.id === skill.level.id)
            });
        }
    }

    render() {

      const { skill, isVisible, languageLevels, theme } = this.props;
      const { selectedLanguageLevel, errors, isLoading } = this.state;

      if (!skill)
      {
          return null;
      }

    return (
        <Portal>
            <Dialog visible={isVisible} onDismiss={this.onDismissHandler}>
                <Dialog.Title>{ skill.language.title }</Dialog.Title>
                <Dialog.ScrollArea style={{ paddingHorizontal: 0 }}>
                    <ScrollView contentContainerStyle={{ paddingHorizontal: 24 }}>

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
                        disabled={isLoading || (selectedLanguageLevel === null)}
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

EditLanguageSkillForm.propTypes = {
    skill: PropTypes.object,
    onClose: PropTypes.func,
    isVisible: PropTypes.bool
};

const mapStateToProps = (state) => {
    return {
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

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(EditLanguageSkillForm));