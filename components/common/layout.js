import React, {Component} from 'react';
import { View } from 'react-native';
import { Root } from 'native-base';

export default ({children}) => {
    return (
        <Root>
            { children }
        </Root>
    )
}
