import React from 'react';
import { Navigation } from 'react-native-navigation';

import titles from '../screens/titles';

import Initialization from '../screens/initialization';
import SignUp from '../screens/security/sign-up';
import SignIn from '../screens/security/sign-in';
import RestorePassword from '../screens/security/restore-password';
import FacebookAuth from '../screens/security/facebook-auth';

import Icon from 'react-native-vector-icons/FontAwesome';


export const setSecurityView = async () => {

    const icon = await Icon.getImageSource('rocket', 30, '#0000ff');

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
                                     icon: icon
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
                                     icon: icon
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
                                     icon: icon
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
                                     icon: icon
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

    Navigation.registerComponent(titles.initialization, () => Initialization);
    Navigation.registerComponent(titles.securitySignUp, () => SignUp);
    Navigation.registerComponent(titles.securitySignIn, () => SignIn);
    Navigation.registerComponent(titles.securityRestorePassword, () => RestorePassword);
    Navigation.registerComponent(titles.securityFacebookAuth, () => FacebookAuth);

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
