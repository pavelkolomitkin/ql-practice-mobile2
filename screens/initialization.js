import React, {Component} from 'react';

import {View, ActivityIndicator, Text} from 'react-native';
import * as Navigation from '../navigation/index';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as securityActions from '../redux/actions/security';
import * as languageActions from '../redux/actions/language';


class Initialization extends Component {

    state = {
        isLoaded: false
    };

    async componentDidMount(): void {

        const userLoading = this
            .props
            .securityActions
            .getUserInfo();

        const languagesLoading = this
            .props
            .languageActions
            .loadLanguages();

        const languageLevelsLoading = this
            .props
            .languageActions
            .loadLanguageLevels();

        await languagesLoading;
        await languageLevelsLoading;
        const user = await userLoading;

        if (!user)
        {
            await Navigation.setSecurityView();
        }
        else
        {
            await Navigation.setClientNavigation();
        }
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

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        securityActions: bindActionCreators(securityActions, dispatch),
        languageActions: bindActionCreators(languageActions, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Initialization);