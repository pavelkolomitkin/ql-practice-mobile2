import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import {Paragraph, Button, Portal, Dialog, Colors, TextInput, withTheme} from 'react-native-paper';
import FormGroup from '../../common/form-group';
import FormFieldError from '../../common/form-field-error';
import {bindActionCreators} from 'redux';
import * as securityActions from '../../../redux/actions/security/security';
import * as profileActions from '../../../redux/actions/client/profile';
import {connect} from 'react-redux';

class AboutMeEditForm extends Component {

    state = {
        user: null,
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

    componentDidMount(): void {

        const { user } = this.props;
        this.setState({
            user: {...user}
        });
    }

    onChange = (aboutMe) => {

        const { user } = this.state;
        user.aboutMe = aboutMe;

        this.setState({
            user
        });
    };

    onSubmitHandler = async () => {

        this.setState({
            isLoading: true,
            errors: {}
        });

        const { user } = this.state;
        const { onClose } = this.props;

        try
        {
            await this.props.profileActions.edit(user);
            await this.props.securityActions.updateUser(user);
            if (onClose)
            {
                onClose();
            }
        }
        catch (errors) {
            this.setState({
                errors,
            });
        }

        this.setState({
            isLoading: false
        });
    };

    componentDidUpdate(prevProps): void {

        const { user } = this.state;
        if (user !== this.props.user)
        {
            this.setState({
                user: this.props.user
            });
        }
    }

    render() {

        const { isVisible, theme } = this.props;
        const { user, errors, isLoading } = this.state;

        return (
            <Portal>
                <Dialog visible={isVisible} onDismiss={this.onDismissHandler}>
                    <Dialog.Title>Tell about you</Dialog.Title>
                    {
                        user &&
                        <>
                            <Dialog.Content>
                                <FormGroup>
                                    <TextInput
                                        label="Tell about you"
                                        style={{ backgroundColor: 'transparent', paddingHorizontal: 0 }}
                                        value={user.aboutMe}
                                        onChangeText={this.onChange}
                                        multiline={true}
                                        numberOfLines={4}
                                    />
                                    <FormFieldError name="aboutMe" errors={errors} />
                                </FormGroup>
                            </Dialog.Content>
                            <Dialog.Actions>
                                <Button
                                    onPress={this.onDismissHandler}
                                >Cancel</Button>
                                <Button
                                    color={theme.colors.primary}
                                    loading={isLoading}
                                    disabled={isLoading || (user.fullName.trim() === '')}
                                    onPress={this.onSubmitHandler}
                                >
                                    OK
                                </Button>
                            </Dialog.Actions>
                        </>
                    }
                </Dialog>
            </Portal>
        )
    }
}

AboutMeEditForm.propTypes = {
    isVisible: PropTypes.bool,
    onClose: PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        user: state.security.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        securityActions: bindActionCreators(securityActions, dispatch),
        profileActions: bindActionCreators(profileActions, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(AboutMeEditForm));