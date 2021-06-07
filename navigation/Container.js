import React from 'react';
import { Alert, Platform, StatusBar } from 'react-native';
import { Block, GalioProvider } from 'galio-framework';
import * as SecureStore from 'expo-secure-store';
import { materialTheme } from '../constants/';
import api, { API_TYPES } from "../actions/api";
import { NavigationContainer } from '@react-navigation/native';
import Screens from './Screens';

const AuthContext = React.createContext();

function Container() {
    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        userToken: action.token,
                        userRole: action.role,
                        isLoading: false,
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: action.token,
                        userRole: action.role,
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignout: true,
                        userToken: null,
                        userRole: null,
                    };
            }
        },
        {
            isLoading: true,
            isSignout: false,
            userToken: null,
            userRole: null,
        }
    );

    React.useEffect(() => {
        const bootstrapAsync = async () => {
            let userToken;

            try {

                userToken = await SecureStore.getItemAsync('userToken');
                userRole = await SecureStore.getItemAsync('role');
            } catch (e) {
                await AuthContext.signOut();
            }

            dispatch({ type: 'RESTORE_TOKEN', token: userToken, role: userRole });
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

                await api.request(API_TYPES.USER).userLogin(user).then(async (respose) => {
                    await SecureStore.setItemAsync("userToken", respose.data.token);
                    await SecureStore.setItemAsync("userId", respose.data.id);
                    await SecureStore.setItemAsync("user", data.email);
                    await SecureStore.setItemAsync("role", respose.data.role);
                    dispatch({ type: 'SIGN_IN', token: respose.data.token, role: respose.data.role });
                }).catch(error => {
                    if (error.response.data.title === "Unauthorized") {
                        Alert.alert(error.response.data.title)
                    }
                });


            },
            signOut: async () => {
                await SecureStore.deleteItemAsync("userToken");
                await SecureStore.deleteItemAsync("userId");
                await SecureStore.deleteItemAsync("user");
                await SecureStore.deleteItemAsync("role");
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