import React, {Component} from 'react';

import {View, ActivityIndicator, Text} from 'react-native';
// import { Navigation } from 'react-native-navigation';
// import screenTitles from './titles';
import * as Navigation from '../navigation/index';


export default class Initialization extends Component {

    state = {
        isLoaded: false
    };

    componentDidMount(): void {

        setTimeout( async () => {

            this.setState({
                isLoaded: true
            });

            await Navigation.setSecurityView();

            //this.props.navigation.navigate('Security');
        }, 1);
    }

    render() {

        const { isLoaded } = this.state;

        return (
            <View>
                <Text>Hello</Text>
                { !isLoaded &&
                    <ActivityIndicator size="large" color="#0000ff" />
                }
            </View>
        );
    }
}
