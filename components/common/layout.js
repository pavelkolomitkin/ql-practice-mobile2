import React, {Component} from 'react';
import { View } from 'react-native';
import { DefaultTheme, DarkTheme, Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SafeAreaView from 'react-native-safe-area-view';

export default ({children}) => {
    return (
        <PaperProvider theme={DefaultTheme}>
            { children }
        </PaperProvider>
    )
}
