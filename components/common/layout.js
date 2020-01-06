import React, {Component} from 'react';

import { ThemeProvider } from 'react-native-elements';

export default ({children}) => {
    return (
        <ThemeProvider>
            { children }
        </ThemeProvider>
    )
}
