import React, {Component} from 'react';

import {View, ActivityIndicator, Text} from 'react-native';


export default class Initialization extends Component {

    state = {
        isLoaded: false
    };

    componentDidMount(): void {

        // setTimeout(() => {
        //
        //     this.setState({
        //         isLoaded: true
        //     });
        //
        //     this.props.navigation.navigate('Security');
        // }, 5000);
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
