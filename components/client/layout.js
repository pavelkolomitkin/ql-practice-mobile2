
import React, { Component } from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';
import CommonLayout from '../common/layout';

const Layout = ({ children }) => {
 return (
     <CommonLayout>
          <ScrollView contentContainerStyle={[ styles.container]}>
           { children }
          </ScrollView>
     </CommonLayout>
 );
};

const styles = StyleSheet.create({
    container: {
        padding: 8,
         // flex: 1,
        // flexDirection: 'column'
    }
});

export default Layout;