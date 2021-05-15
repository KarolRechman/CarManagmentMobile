import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { Block, GalioProvider } from 'galio-framework';
import * as SecureStore from 'expo-secure-store';
import { materialTheme } from '../constants/';
import api, { API_TYPES } from "../actions/api";
import { NavigationContainer } from '@react-navigation/native';
import Screens from './Screens';

const AuthContext = React.createContext();

function Container({ navigation }) {
    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        userToken: action.token,
                        isLoading: false,
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: action.token,
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignout: true,
                        userToken: null,
                    };
            }
        },
        {
            isLoading: true,
            isSignout: false,
            userToken: null,
        }
    );

    React.useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            let userToken;

            try {
                // Restore token stored in `SecureStore` or any other encrypted storage
                 userToken = await SecureStore.getItemAsync('userToken');
            } catch (e) {
                // Restoring token failed
                AuthContext.signOut();
            }

            // After restoring token, we may need to validate it in production apps

            // This will switch to the App screen or Auth screen and this loading
            // screen will be unmounted and thrown away.
            dispatch({ type: 'RESTORE_TOKEN', token: userToken });
        };

        bootstrapAsync();
    }, []);

    const authContext = React.useMemo(
        () => ({
            signIn: async (data) => {
                let user = {
                    Email: data.email,
                    Password: data.password
                }

                await api.request(API_TYPES.USER).userLogin(user).then(respose => {

                    SecureStore.setItemAsync("userToken", respose.data.token);
                    SecureStore.setItemAsync("userId", respose.data.id);
                    dispatch({ type: 'SIGN_IN', token: respose.data.token });
                    // localStorage.setItem('user', user.Email);
                    // localStorage.setItem('userId', respose.data.id);
                    // localStorage.setItem('token', respose.data.token);
                    // console.log(`/admin/dashboard/${respose.data.id}`)
                    // props.history.push(`/admin/dashboard/${respose.data.id}`);
                });

                
            },
            signOut: () =>{
                SecureStore.deleteItemAsync("userToken");
                SecureStore.deleteItemAsync("userId");
                dispatch({ type: 'SIGN_OUT' });
            } 
        }),
        []
    );

    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                <GalioProvider theme={materialTheme}>
                    <Block flex>
                        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
                        <Screens value={state} />
                    </Block>
                </GalioProvider>
            </NavigationContainer>
        </AuthContext.Provider>
    );
}
export { AuthContext, Container }