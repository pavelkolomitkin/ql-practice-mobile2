import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import CommonLayout from '../../components/common/layout';
import { Surface } from 'react-native-paper';

const Layout = ({ children }) => {
 return (
  <CommonLayout>
      <Surface style={{ margin: 5, elevation: 2, flex: 1 }}>
          <ScrollView contentContainerStyle={[ styles.container ]}>
              { children }
          </ScrollView>
      </Surface>

  </CommonLayout>
 );
};

const styles = StyleSheet.create({
 container: {
  padding: 4
 }
});

export default Layout;