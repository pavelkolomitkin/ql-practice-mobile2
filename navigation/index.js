import React from 'react';
import { Navigation } from 'react-native-navigation';

import titles from '../screens/titles';
import theme from '../theme/index';
import Initialization from '../screens/initialization';
import SignUp from '../screens/security/sign-up';
import SignIn from '../screens/security/sign-in';
import RestorePassword from '../screens/security/restore-password';
import FacebookAuth from '../screens/security/facebook-auth';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Provider } from 'react-redux';
import store from '../redux/store';
import Profile from '../screens/client/profile';

export const setClientNavigation = async () => {

    await Navigation.setRoot({
        root: {
            stack: {
                children: [
                    {
                        component: {
                            name: titles.profile
                        }
                    }
                ]
            }
        }
    });
};

export const setSecurityView = async () => {

    const signInIcon = await Icon.getImageSource('sign-in', 30, theme.colors.icon.defaultColor);
    const signInUpIcon = await Icon.getImageSource('user-plus', 30, theme.colors.icon.defaultColor);
    const restorePasswordIcon = await Icon.getImageSource('unlock', 30, theme.colors.icon.defaultColor);
    const facebookIcon = await Icon.getImageSource('facebook', 30, theme.colors.icon.defaultColor);

     await Navigation.setRoot({
         root: {
             bottomTabs: {
                 children: [
                     {
                         component: {
                             name: titles.securitySignIn,
                             options: {
                                 bottomTab: {
                                     text: 'SignIn',
                                     icon: signInIcon
                                 },
                             }
                         },

                     },
                     {
                         component: {
                             name: titles.securitySignUp,
                             options: {
                                 bottomTab: {
                                     text: 'SignUp',
                                     icon: signInUpIcon
                                 },
                             }
                         },
                     },
                     {
                         component: {
                             name: titles.securityRestorePassword,
                             options: {
                                 bottomTab: {
                                     text: 'Restore',
                                     icon: restorePasswordIcon
                                 },
                             }
                         }
                     },
                     {
                         component: {
                             name: titles.securityFacebookAuth,
                             options: {
                                 bottomTab: {
                                     text: 'FB',
                                     icon: facebookIcon
                                 },
                             }
                         },
                     }
                 ],
                 options: {

                 }
             }
         }
     });
};

export const start = () => {


    Navigation.registerComponentWithRedux(titles.initialization, () => Initialization, Provider, store);
    Navigation.registerComponentWithRedux(titles.securitySignUp, () => SignUp, Provider, store);
    Navigation.registerComponentWithRedux(titles.securitySignIn, () => SignIn, Provider, store);
    Navigation.registerComponentWithRedux(titles.securityRestorePassword, () => RestorePassword, Provider, store);
    Navigation.registerComponentWithRedux(titles.securityFacebookAuth, () => FacebookAuth, Provider, store);
    Navigation.registerComponentWithRedux(titles.profile, () => Profile, Provider, store);


    Navigation.events().registerAppLaunchedListener(async () => {

        await Navigation.setRoot({
            root: {
                component: {
                    name: titles.initialization
                }
            }
        });
    });
};
