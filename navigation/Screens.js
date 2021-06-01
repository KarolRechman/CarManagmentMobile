import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { Text } from "galio-framework";

import Dashboard from '../screens/Home';
import SpendingsScreen from '../screens/Spendings';
import SpendingsTable from '../screens/SpendingsTable';
import OnboardingScreen from '../screens/Onboarding';
import ProfileScreen from '../screens/Profile';
import CarAvialable from "../screens/CarAvialable";
import Car from "../screens/Car";
import CustomDrawerContent from './Menu';
import { Icon, Header } from '../components';
import { materialTheme } from "../constants/";
import * as SecureStore from 'expo-secure-store';
import CarList from '../screens/CarList';

const { width } = Dimensions.get("screen");

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// const profile = {
//   avatar: require("../assets/images/Benz.jpg"),
//   name: await SecureStore.getItemAsync("userId"),
//   type: "Kierowca",
//   plan: "Pro",
// };

function SplashScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}

function ProfileStack(props) {
  return (
    <Stack.Navigator initialRouteName="Profile" mode="card" headerMode="screen">
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              white
              transparent
              title="Profile"
              scene={scene}
              navigation={navigation}
            />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}

function SpendingsStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Spendings"
        component={SpendingsScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Spendings" scene={scene} navigation={navigation} />
          )
        }}
      />
    </Stack.Navigator>
  );
}

function SpendingsTableStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Spendings Table"
        component={SpendingsTable}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Spendings Table" scene={scene} navigation={navigation} />
          )
        }}
      />
    </Stack.Navigator>
  );
}

function AvialableCars(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Avialable Cars"
        component={CarAvialable}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Avialable Cars" scene={scene} navigation={navigation} />
          )
        }}
      />
    </Stack.Navigator>
  );
}

function CarListAdmin(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Car list"
        component={CarList}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Car list" scene={scene} navigation={navigation} />
          )
        }}
      />
    </Stack.Navigator>
  );
}


function CarAddEdit(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Car"
        component={Car}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              white
              transparent
              title="Car"
              scene={scene}
              navigation={navigation}
            />
          ),
          headerTransparent: true
        }}
      />
    </Stack.Navigator>
  );
}


function HomeStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              search
              tabs
              title="Dashboard"
              navigation={navigation}
              scene={scene}
            />
          )
        }}
      />
    </Stack.Navigator>
  );
}

function AppAdminStack(props) {
  const [profile, setProfile] = useState({})

  useEffect(() => {
    const setProfileData = async () => {
      setProfile({
        avatar: require("../assets/images/Benz.jpg"),
        name: await SecureStore.getItemAsync("user"),
        type: "Admin",
        plan: "Pro",
      })
    }

    setProfileData();
  }, [profile])




  return (
    <Drawer.Navigator
      style={{ flex: 1 }}
      drawerContent={props => (
        <CustomDrawerContent {...props} profile={profile} />
      )}
      drawerStyle={{
        backgroundColor: "white",
        width: width * 0.8
      }}
      drawerContentOptions={{
        activeTintColor: "white",
        inactiveTintColor: "#000",
        activeBackgroundColor: materialTheme.COLORS.ACTIVE,
        inactiveBackgroundColor: "transparent",
        itemStyle: {
          width: width * 0.74,
          paddingHorizontal: 12,
          justifyContent: "center",
          alignContent: "center",
          overflow: "hidden"
        },
        labelStyle: {
          fontSize: 18,
          fontWeight: "normal"
        }
      }}
      initialRouteName="Home"
    >
      <Drawer.Screen
        name="Dashboard"
        component={HomeStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="home"
              family="GalioExtra"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          )
        }}
      />
      <Drawer.Screen
        name="Car"
        component={CarAddEdit}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="car"
              family="GalioExtra"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          )
        }}
      />

<Drawer.Screen
        name="Car list"
        component={CarListAdmin}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="car"
              family="GalioExtra"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          )
        }}
      />
      <Drawer.Screen
        name="Spendings"
        component={SpendingsStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="gears"
              family="font-awesome"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
              style={{ marginRight: 2, marginLeft: 2 }}
            />
          )
        }}
      />
      <Drawer.Screen
        name="Spendings Table"
        component={SpendingsTableStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="table"
              family="font-awesome"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
              style={{ marginRight: 2, marginLeft: 2 }}
            />
          )
        }}
      />
      <Drawer.Screen
        name="Avialable Cars"
        component={AvialableCars}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="table"
              family="font-awesome"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
              style={{ marginRight: 2, marginLeft: 2 }}
            />
          )
        }}
      />
    </Drawer.Navigator>
  );
}

function AppStack(props) {
  const [profile, setProfile] = useState({})

  useEffect(() => {
    const setProfileData = async () => {
      setProfile({
        avatar: require("../assets/images/Benz.jpg"),
        name: await SecureStore.getItemAsync("user"),
        type: "Kierowca",
        plan: "Pro",
      })
    }

    setProfileData();
  }, [profile])

  return (
    <Drawer.Navigator
      style={{ flex: 1 }}
      drawerContent={props => (
        <CustomDrawerContent {...props} profile={profile} />
      )}
      drawerStyle={{
        backgroundColor: "white",
        width: width * 0.8
      }}
      drawerContentOptions={{
        activeTintColor: "white",
        inactiveTintColor: "#000",
        activeBackgroundColor: materialTheme.COLORS.ACTIVE,
        inactiveBackgroundColor: "transparent",
        itemStyle: {
          width: width * 0.74,
          paddingHorizontal: 12,
          justifyContent: "center",
          alignContent: "center",
          overflow: "hidden"
        },
        labelStyle: {
          fontSize: 18,
          fontWeight: "normal"
        }
      }}
      initialRouteName="Home"
    >
      <Drawer.Screen
        name="Dashboard"
        component={HomeStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="home"
              family="GalioExtra"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          )
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="car"
              family="GalioExtra"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
            />
          )
        }}
      />
      <Drawer.Screen
        name="Spendings"
        component={SpendingsStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="gears"
              family="font-awesome"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
              style={{ marginRight: 2, marginLeft: 2 }}
            />
          )
        }}
      />
      <Drawer.Screen
        name="Spendings Table"
        component={SpendingsTableStack}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="table"
              family="font-awesome"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
              style={{ marginRight: 2, marginLeft: 2 }}
            />
          )
        }}
      />
      <Drawer.Screen
        name="Avialable Cars"
        component={AvialableCars}
        options={{
          drawerIcon: ({ focused }) => (
            <Icon
              size={16}
              name="table"
              family="font-awesome"
              color={focused ? "white" : materialTheme.COLORS.MUTED}
              style={{ marginRight: 2, marginLeft: 2 }}
            />
          )
        }}
      />
    </Drawer.Navigator>
  );
}

export default function OnboardingStack(props) {
  const state = props.value;
  return (

    <Stack.Navigator mode="card" headerMode="none">

      {state.userToken == null ? (
        // No token found, user isn't signed in
        <Stack.Screen
          name="SignIn"
          component={OnboardingScreen}
          options={{
            title: 'Sign in',
            // When logging out, a pop animation feels intuitive
            animationTypeForReplace: state.isSignout ? 'pop' : 'push',
          }}
        />
      ) : state.userRole === "Admin" ? (<Stack.Screen name="Home" component={AppAdminStack} />) : (
        // User is signed in
        <Stack.Screen name="Home" component={AppStack} />
      )}
    </Stack.Navigator>
  );
}
