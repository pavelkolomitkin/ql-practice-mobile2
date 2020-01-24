import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Text, View, Picker, Keyboard } from 'react-native';
import {Paragraph, Button, Portal, Dialog, Colors, TextInput, withTheme, Caption} from 'react-native-paper';
import FormGroup from '../../../common/form-group';
import FormFieldError from '../../../common/form-field-error';

const ConversationForm = ({
  isVisible,
  onDismiss,
  header,

  onFieldChange,
  onSubmit,

  selectedLanguage,
  title,
  isLoading,
  languages,
  errors,

  theme

}) => {
    return (
        <Portal>
            <Dialog visible={isVisible} onDismiss={onDismiss}>
                <Dialog.Title>{ header }</Dialog.Title>
                <Dialog.Content>

                    <FormGroup>
                        <Caption>Title</Caption>
                        <TextInput
                            label="Title"
                            style={{ backgroundColor: 'transparent', paddingHorizontal: 0 }}
                            value={title}
                            onChangeText={
                                (value) => onFieldChange('title', value)
                            }
                        />
                        <FormFieldError name="title" errors={errors} />
                    </FormGroup>

                    <FormGroup>
                        <Caption>Language</Caption>
                        <Picker
                            mode="dialog"
                            prompt="Language"
                            placeholder="Language"
                            selectedValue={selectedLanguage}
                            onValueChange={
                                (value) => {Keyboard.dismiss(); onFieldChange('selectedLanguage', value)}
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

                </Dialog.Content>
                <Dialog.Actions>
                    <Button
                        onPress={onDismiss}
                    >Cancel</Button>
                    <Button
                        color={theme.colors.primary}
                        loading={isLoading}
                        disabled={isLoading || (selectedLanguage === null)}
                        onPress={onSubmit}
                    >
                        OK
                    </Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};


ConversationForm.propTypes = {
    isVisible: PropTypes.bool,
    onDismiss: PropTypes.func,
    header: PropTypes.string,

    onFieldChange: PropTypes.func,
    onSubmit: PropTypes.func,

    selectedLanguage: PropTypes.object,
    title: PropTypes.string,
    isLoading: PropTypes.bool,
    languages: PropTypes.array,
    errors: PropTypes.object,
};

export default withTheme(ConversationForm);