import React, {Component} from 'react';
import { View } from 'react-native';
import {ActivityIndicator, Text, Headline, Title} from 'react-native-paper';
import * as Navigation from '../navigation/index';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as securityActions from '../redux/actions/security/security';
import * as languageActions from '../redux/actions/language';


class Initialization extends Component {

    state = {
    };

    async componentDidMount(): void {



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

        try
        {
            const user = await this
                .props
                .securityActions
                .getUserInfo();

            if (!user)
            {
                throw new Error('User is not initialized');
            }

            await Navigation.setClientNavigation();
        }
        catch (error) {
            await Navigation.setSecurityView();
        }
    }

    render() {

        return (

            <Container>
                <Header>QL Practice</Header>

                <ActivityIndicator
                    size="large"
                    color="#fff"
                />

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