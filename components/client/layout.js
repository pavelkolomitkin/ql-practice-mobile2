
import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import CommonLayout from '../common/layout';

const Layout = ({ children }) => {
 return (
     <CommonLayout>
      <ScrollView>
       { children }
      </ScrollView>
     </CommonLayout>
 );
};

export default Layout;