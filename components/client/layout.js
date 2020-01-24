import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {Text, View, ScrollView, StyleSheet} from 'react-native';
import CommonLayout from '../common/layout';

const Layout = ({ children, scrollEmbed }) => {

 return (
     <CommonLayout>
         <View style={styles.container}>
             { children }
         </View>
     </CommonLayout>
 );
};

const styles = StyleSheet.create({
    container: {
        padding: 8,
        flex: 1,
        // flexDirection: 'column'
    }
});

Layout.propTypes = {
    scrollEmbed: PropTypes.bool
};

Layout.defaultProps = {
    scrollEmbed: false
};

export default Layout;