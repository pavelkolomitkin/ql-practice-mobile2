import React, {Component} from 'react';

import {Text, View} from 'react-native';

import Layout from './layout';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../../theme';
import {Button, Input, Item, Spinner, Content} from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux/actions/security';


class RestorePassword extends Component {

    state = {
        email: '',
        isLoading: false
    };

    onFieldChangeHandler = (name, value) => {
        //console.log(name, value);
        this.setState({
            [name]: value
        });
    };

    onSubmit = () => {

        this.setState({
            isLoading: true,
        });

    };



    render() {

        const { email, isLoading } = this.state;

        return (
            <Layout title="Restore Password">
                <Content>
                    <Item style={{ paddingBottom: 10 }}>

                        <Icon active name='envelope' size={theme.form.icon.defaultSize * 0.7} style={{ marginRight: 5 }}  />
                        <Input placeholder='Your Email' value={email}
                               onChangeText={
                                   (value) => this.onFieldChangeHandler('email', value)
                               }
                        />

                    </Item>

                    <Button
                        style={{ justifyContent: 'center'}}
                        onPress={this.onSubmit}
                        disabled={isLoading}
                        active={true}
                        info
                    >
                        { !isLoading ? <Text style={{ color: '#fff', textTransform: 'uppercase'  }}>Restore</Text> :
                            <Spinner color='#fff'/>
                        }
                    </Button>


                </Content>
            </Layout>
        );
    }
}

const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RestorePassword);