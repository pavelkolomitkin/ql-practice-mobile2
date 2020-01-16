import React from 'react';
import { HelperText } from 'react-native-paper';

const FormFieldError = ({ errors, name }) => {

    const items = !!errors[name] ?
        (Array.isArray(errors[name]) ? errors[name] : [errors[name]])
        : null;

    return (

        items &&
        <HelperText
            type="error"
            visible={!!items}
        >{ items.join(', ') }</HelperText>
    );
};

export default FormFieldError;