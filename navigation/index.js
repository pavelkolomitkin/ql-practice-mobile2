import React from 'react';
import { Navigation } from 'react-native-navigation';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import titles from '../screens/titles';
import theme from '../theme/index';
import Initialization from '../screens/initialization';
import SecurityIndex from '../screens/security';
import SignUp from '../screens/security/sign-up';
import SignIn from '../screens/security/sign-in';
import RestorePassword from '../screens/security/restore-password';
import FacebookAuth from '../screens/security/facebook-auth';

import MyProfileIndex from '../screens/client/profile/index';
import MyProfile from '../screens/client/profile/my-profile';
import MyPublicChats from '../screens/client/profile/my-public-chats';
import RecentPublicChats from '../screens/client/profile/recent-public-chats';
import FullscreenPhoto from '../components/client/profile/fullscreen-photo';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Provider } from 'react-redux';
import store from '../redux/store';
import PartnerSearch from '../screens/client/partner-search';
import PrivateChats from '../screens/client/private-chats';
import PublicChats from '../screens/client/public-chats';

const registerComponents = () => {

    //================================ SECURITY =======================================

    Navigation.registerComponentWithRedux(titles.initialization, () => Initialization, Provider, store);
    Navigation.registerComponentWithRedux(titles.security, () => SecurityIndex, Provider, store);
    Navigation.registerComponentWithRedux(titles.securitySignUp, () => SignUp, Provider, store);
    Navigation.registerComponentWithRedux(titles.securitySignIn, () => SignIn, Provider, store);
    Navigation.registerComponentWithRedux(titles.securityRestorePassword, () => RestorePassword, Provider, store);
    Navigation.registerComponentWithRedux(titles.securityFacebookAuth, () => FacebookAuth, Provider, store);

    //==============================// SECURITY =======================================

    //================================ PROFILE ========================================

    Navigation.registerComponentWithRedux(titles.profile.my, () => gestureHandlerRootHOC(MyProfileIndex), Provider, store);
    Navigation.registerComponentWithRedux(titles.profile.myProfile, () => gestureHandlerRootHOC(MyProfile), Provider, store);
    Navigation.registerComponent(titles.profile.myPublicChats, () => gestureHandlerRootHOC(MyPublicChats), Provider, store);
    Navigation.registerComponent(titles.profile.recentPublicChats, () => gestureHandlerRootHOC(RecentPublicChats), Provider, store);
    Navigation.registerComponentWithRedux(titles.profile.fullScreenPhoto, () => FullscreenPhoto, Provider, store);


    Navigation.registerComponentWithRedux(titles.partner.search, () => PartnerSearch, Provider, store);
    Navigation.registerComponentWithRedux(titles.chats.private, () => PrivateChats, Provider, store);
    Navigation.registerComponentWithRedux(titles.chats.public, () => PublicChats, Provider, store);



    //==============================// PROFILE ========================================


};

export const showFullScreenPhoto = async (user) => {

    return await Navigation.showModal({
        component: {
            name: titles.profile.fullScreenPhoto,
            passProps: {
                user
            },
            options: {
                topBar: {
                    visible: true,
                    title: {
                        text: 'User Photo'
                    }
                }
            }
        }
    })
};

export const setClientNavigation = async () => {


    const myProfileIcon = await Icon.getImageSource('account', 30, theme.colors.icon.defaultColor);
    const partnerSearchIcon = await Icon.getImageSource('account-search', 30, theme.colors.icon.defaultColor);
    const privateChatsIcon = await Icon.getImageSource('chat', 30, theme.colors.icon.defaultColor);
    const publicChatsIcon = await Icon.getImageSource('forum', 30, theme.colors.icon.defaultColor);


    await Navigation.setRoot({
        root: {
            bottomTabs: {
                children: [
                    {
                        stack: {
                            children: [
                                {
                                    component: {
                                        name: titles.chats.public,
                                        options: {
                                            bottomTab: {
                                                text: 'Channels',
                                                icon: publicChatsIcon
                                            },
                                        }
                                    }
                                }
                            ]
                        }
                    },
                    {
                        stack: {
                            children: [
                                {
                                    component: {
                                        name: titles.partner.search,
                                        options: {
                                            bottomTab: {
                                                text: 'Partners',
                                                icon: partnerSearchIcon
                                            },
                                        }
                                    }
                                }
                            ]
                        }
                    },
                    {
                        stack: {
                            children: [
                                {
                                    component: {
                                        name: titles.chats.private,
                                        options: {
                                            bottomTab: {
                                                text: 'My Chats',
                                                icon: privateChatsIcon
                                            },
                                        }
                                    }
                                }
                            ]
                        }
                    },
                    {
                        stack: {
                            children: [
                                {
                                    component: {
                                        name: titles.profile.my,
                                        options: {
                                            bottomTab: {
                                                text: 'Profile',
                                                icon: myProfileIcon
                                            },
                                        }
                                    }
                                }
                            ],

                            // options: {
                            //     topBar: {
                            //         visible: false
                            //     }
                            // }

                        },
                    },
                ]
            }
        }
    });
};

export const setSecurityView = async () => {

    const signInIcon = await Icon.getImageSource('login', 30, theme.colors.icon.defaultColor);
    const signInUpIcon = await Icon.getImageSource('account-plus', 30, theme.colors.icon.defaultColor);
    const restorePasswordIcon = await Icon.getImageSource('restore', 30, theme.colors.icon.defaultColor);
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
             }
         }
     });
};

export const start = () => {


    registerComponents();


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
