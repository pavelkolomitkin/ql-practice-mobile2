// import { createAppContainer, createSwitchNavigator } from 'react-navigation';
//
// import Initialization from '../screens/initialization';
//
// import SignIn from '../screens/security/sign-in';
// import SignUp from '../screens/security/sign-up';
// import RestorePassword from '../screens/security/restore-password';
// import FacebookAuth from '../screens/security/facebook-auth';
//
// import Profile from '../screens/client/profile';
//
// const SecurityStack = createStackNavigator({
//     SignIn: SignIn,
//     SignUp: SignUp,
//     RestorePassword: RestorePassword,
//     FacebookAuth: FacebookAuth
// }, {
//     initialRouteName: 'SignIn'
// });
//
// const Navigator = createAppContainer(createSwitchNavigator({
//     Initialization: Initialization,
//     Security: SecurityStack,
//     Client: Profile
// }, {
//     initialRouteName: 'Initialization'
// }));
//
// export default Navigator;

import Initialization from '../screens/initialization';

import { Navigation } from 'react-native-navigation';

export const start = () => {

    Navigation.registerComponent('app.Initialization', () => Initialization);

    Navigation.events().registerAppLaunchedListener(async () => {

        await Navigation.setRoot({
            root: {
                stack: {
                    children: [
                        {
                            component: {
                                name:'app.Initialization'
                            }
                        }
                    ]
                }
            }
        })
    });
};
