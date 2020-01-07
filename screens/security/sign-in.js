import React, {Component} from 'react';

import {View, StyleSheet, KeyboardAvoidingView} from 'react-native';
import Layout from '../../components/common/layout';
import theme from '../../theme/index';
import {
    Container,
    Header,
    Content,
    Title,
    Body,
    Item,
    Input,
    Button,
    Text,
    Row,
    Col,
    Form,
    Label,
    Subtitle,
    Left
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class SignIn extends Component {

    render() {
        return (
                <Container>
                    <Header>
                        <Body>
                            <Title>Sign In</Title>
                        </Body>
                    </Header>
                    <Content style={{ padding: 10 }} contentContainerStyle={{ flex: 1 }}>

                        <KeyboardAvoidingView >

                            <Item style={{ paddingBottom: 10 }}>

                                <Icon active name='envelope' size={theme.form.icon.defaultSize * 0.7} style={{ marginRight: 5 }}  />
                                <Input placeholder='Your Email'/>

                            </Item>

                            <Item last style={{ paddingBottom: 10 }}>
                                <Icon active name='lock' size={theme.form.icon.defaultSize} style={{ marginRight: 5 }} />
                                <Input placeholder='Password' secureTextEntry/>
                            </Item>


                            <Button style={{ justifyContent: 'center' }}>
                                <Text>Sign In</Text>
                            </Button>

                        </KeyboardAvoidingView>

                    </Content>
                </Container>
        );
    }
}

const styles = StyleSheet.create({

});