import React, {Component} from 'react';

import {Text, View} from 'react-native';
import Layout from './layout';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux/actions/security';
import { Button } from 'native-base';

class FacebookAuth extends Component {
    render() {
        return (
            <Layout title="FaceBook Login">
                <View style={{ flex: 1, flexDirection: 'column', alignContent: 'center', justifyContent: 'center' }}>
                    <Button
                        style={{ justifyContent: 'center' }}
                        active
                        info>
                        <Text style={{ color: '#fff', textTransform: 'uppercase'  }}>FB Login</Text>
                    </Button>
                </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(FacebookAuth);
