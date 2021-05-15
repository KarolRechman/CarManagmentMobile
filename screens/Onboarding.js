import React, { useEffect, useState } from 'react';
import {
  ImageBackground, StyleSheet, StatusBar, Dimensions,
  View, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard
} from 'react-native';
import { Block, Button, Text, theme, Input } from 'galio-framework';
import { Icon } from '../components/';


const { height, width } = Dimensions.get('screen');

import materialTheme from '../constants/Theme';
import { AuthContext } from "../navigation/Container";




export default function Onboarding({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = React.useContext(AuthContext);
//test3@gamil.com

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>

          <StatusBar barStyle="light-content" />
          <Block flex center>
            <ImageBackground
              source={require("../assets/images/Benz.jpg")}
              style={{ height: '100%', width: width, zIndex: 1 }}
            />
          </Block>
          <Block flex>
            <Block flex space="around" style={{ zIndex: 2 }}>
              <Block style={styles.inputs}>
                <Block>
                  <Text color="white" size={40}>Car</Text>
                </Block>
                <Block row>
                  <Text color="white" size={40}>Management</Text>
                </Block>
                <Block >
                  <Input
                    right
                    placeholder="Email"
                    placeholderTextColor={materialTheme.COLORS.DEFAULT}
                    style={{ borderRadius: 3, borderColor: materialTheme.COLORS.INPUT }}
                    onChangeText={setEmail}
                    value={email}
                    iconContent={<Icon size={16} color={theme.COLORS.ICON} name="email" family="MaterialIcons" />}
                  />
                </Block>
                <Block >
                  <Input
                    right
                    placeholder="Password"
                    placeholderTextColor={materialTheme.COLORS.DEFAULT}
                    style={{ borderRadius: 3, borderColor: materialTheme.COLORS.INPUT }}
                    onChangeText={setPassword}
                    value={password}
                    iconContent={<Icon size={16} color={theme.COLORS.ICON} name="key" family="Entypo" />}
                  />
                </Block>
                <Block>
                  <Button
                    shadowless
                    style={styles.button}
                    color={materialTheme.COLORS.BUTTON_COLOR}
                    onPress={() => signIn({ email, password })}>
                    LOGIN
              </Button>
                </Block>
              </Block>

            </Block>
          </Block>

          {/* <Text style={styles.header}>Header</Text>

            <TextInput placeholder="Username" style={styles.textInput} />
            <View style={styles.btnContainer}>
              <Button title="Submit" onPress={() => null} />
            </View> */}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around"
  },
  inputs: {
    paddingBottom: '50%'
  }
});
