import React, {Component} from 'react';

import {View, Text} from 'react-native';
import { Button } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux/actions/security/security';

// import styles from './styles';

class Profile extends Component {

    onLogoutPressHandler = async () => {

         await this.props.actions.logout();
    };

    render() {
        return (
            <View>
                <Button onPress={this.onLogoutPressHandler}>
                    <Text>Logout</Text>
                </Button>
            </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
