import React, {Component} from 'react';

import {View, ActivityIndicator, Text} from 'react-native';
// import { Navigation } from 'react-native-navigation';
// import screenTitles from './titles';
import * as Navigation from '../navigation/index';
import styled from 'styled-components';


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

        }, 1);
    }

    render() {

        const { isLoaded } = this.state;

        return (

            <Container>
                <Header>QL Practice</Header>
                { !isLoaded &&
                    <ActivityIndicator
                        size="large"
                        color="#fff"
                    />
                }
            </Container>

            // <View>
            //     <Text>Hello</Text>
            //     { !isLoaded &&
            //         <ActivityIndicator size="large" color="#0000ff" />
            //     }
            // </View>
        );
    }
}

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #1acfe8;
`;

const Header = styled.Text`
  font-size: 24px;
  font-weight: bold;
  line-height: 32px;
  color: #fff;
  margin-bottom: 15px;
`;