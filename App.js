/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';


import {ThemeProvider } from 'react-native-elements';
// import Navigator from './navigation';

const App: () => React$Node = () => {
  return (
      <ThemeProvider>
          <View>
              <Text>Test</Text>
          </View>
      </ThemeProvider>
  );
};

const styles = StyleSheet.create({

});

export default App;
