import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import CommonLayout from '../common/layout';
import {Appbar, Surface} from 'react-native-paper';

const Layout = ({ children, title }) => {
 return (
  <CommonLayout>
      <Appbar.Header>
          <Appbar.Content
              title="QL Practice"
              subtitle={title}
          />
      </Appbar.Header>

      <Surface style={{ margin: 5, elevation: 2, flex: 1 }}>
          <ScrollView contentContainerStyle={[ styles.container]}>
              { children }
          </ScrollView>
      </Surface>

  </CommonLayout>
 );
};

const styles = StyleSheet.create({
 container: {
     padding: 4,
     flex: 1,
     flexDirection: 'column'
 }
});

export default Layout;