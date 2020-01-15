import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import CommonLayout from '../../components/common/layout';

const Layout = ({ children }) => {
 return (
  <CommonLayout>
   <ScrollView contentContainerStyle={[ styles.container ]}>
    { children }
   </ScrollView>
  </CommonLayout>
 );
};

const styles = StyleSheet.create({
 container: {
  padding: 4
 }
});

export default Layout;