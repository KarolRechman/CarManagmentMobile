import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, ScrollView, Image, ImageBackground, Platform, View, Alert } from 'react-native';
import { Block, Text, theme, Input, Button } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';
import api, { API_TYPES } from "../actions/api";
import { Icon } from '../components';
import { Images, materialTheme } from '../constants';
import { HeaderHeight } from "../constants/utils";
import * as SecureStore from 'expo-secure-store';

const { width, height } = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3;

export default function Car(props) {
  const [car, setCar] = useState({ idCar: 0 });
  const selectedCarId = props.match.params.id;

  const handleChange = (event) => {
    // const name = event.target.id;
    setCar({
      ...car,
      // [name]: event.target.value,
    });
  };

  async function SendData() {
    car.idCar = parseInt(car.idCar);
    car.yofProd = parseInt(car.yofProd);
    car.kilometers = parseInt(car.kilometers);
    car.priceDay = parseFloat(car.priceDay);
    car.isAvailable = parseInt(car.isAvailable);
    car.segment = parseInt(car.segment);
    car.insurance = new Date(car.insurance);
    car.techRev = new Date(car.techRev);

    if (car.idCar != 0) {
      await api.request(API_TYPES.CAR).update(car.id, car, );
    } else {
      await api.request(API_TYPES.CAR).create("/", car);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      if (selectedCarId != 0) {
        const request = await api
          .request(API_TYPES.CAR)
          .fetchById("/" + selectedCarId);

        setCar(request.data);
      }
    };

    fetchData();
  }, []);

  return (
    <View>
      <Block flex style={styles.profile}>
        <Block flex>
          <ImageBackground
            source={require("../assets/images/Benz.jpg")}
            style={styles.profileContainer}
            imageStyle={styles.profileImage}>
            <Block flex style={styles.profileDetails}>
              <Block style={styles.profileTexts}>
                <Block row space="between">
                  <Block row>
                  </Block>
                  <Block>
                    <Text color={theme.COLORS.MUTED} size={16}>
                      <Icon name="map-marker" family="font-awesome" color={theme.COLORS.MUTED} size={16} />
                      {` `} Los Angeles, CA
                      </Text>
                  </Block>
                </Block>
              </Block>
              <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']} style={styles.gradient} />
            </Block>
          </ImageBackground>
        </Block>
      </Block>
      <ScrollView style={styles.inputsView}>
        <Input
          type="text"
          style={styles.inputPrice}
          placeholderTextColor= "grey"
          placeholder="Username"
          color="black"
          right
          icon="attach-money"
          family="FontAwesome5"
          iconSize={20}
          iconColor="black"
          value={user.UserName}
          help="Username"
          onChangeText={(value) => handleChange(value,"UserName")}
        />
        <Input
          type="text"
          style={styles.inputPrice}
          placeholder="Email address"
          placeholderTextColor="grey"
          color="black"
          right
          icon="attach-money"
          family="FontAwesome5"
          iconSize={20}
          iconColor="black"
          value={user.Email}
          help="Email address"
          onChangeText={value => handleChange(value,"Email")}
        />
        <Input
          type="numeric"
          style={styles.inputPrice}
          placeholder="Phone number"
          placeholderTextColor="grey"
          color="black"
          right
          icon="attach-money"
          family="FontAwesome5"
          iconSize={20}
          iconColor="black"
          value={user.PhoneNumber}
          help="Phone number"
          onChangeText={value => handleChange(value,"PhoneNumber")}
        />
        <Input
          type="text"
          style={styles.inputPrice}
          placeholder="First Name"
          placeholderTextColor="grey"
          color="black"
          right
          icon="attach-money"
          family="FontAwesome5"
          iconSize={20}
          iconColor="black"
          value={user.FirstName}
          help="First Name"
          onChangeText={value => handleChange(value,"FirstName")}
        />
        <Input
          type="text"
          style={styles.inputPrice}
          placeholder="Last Name"
          placeholderTextColor="grey"
          color="black"
          right
          icon="attach-money"
          family="FontAwesome5"
          iconSize={20}
          iconColor="black"
          value={user.LastName}
          help="Last Name"
          onChangeText={value => handleChange(value,"LastName")}
        />
        <Input
          type="text"
          style={styles.inputPrice}
          placeholder="City"
          placeholderTextColor="grey"
          color="black"
          right
          icon="attach-money"
          family="FontAwesome5"
          iconSize={20}
          iconColor="black"
          value={user.City}
          help="City"
          onChangeText={value => handleChange(value,"City")}
        />
        <Input
          type="text"
          style={styles.inputPrice}
          placeholder="Country"
          placeholderTextColor="grey"
          color="black"
          right
          icon="attach-money"
          family="FontAwesome5"
          iconSize={20}
          iconColor="black"
          value={user.Country}
          help="Country"
          onChangeText={value => handleChange(value,"Country")}
        />
        <Input
          type="text"
          style={styles.PostalCode}
          placeholder="Post Code"
          placeholderTextColor="grey"
          color="black"
          right
          icon="attach-money"
          family="FontAwesome5"
          iconSize={20}
          iconColor="black"
          value={user.PostCode}
          help="Postal Code"
          onChangeText={value => handleChange(value,"PostCode")}
        />
              <Button style={styles.buttonSubmit} color="success" onPress={SendData}>Aktualizuj</Button>
      </ScrollView>
    </View>

  );
}


const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
    marginBottom: -HeaderHeight * 2,
  },
  profileImage: {
    width: width * 1.1,
    height: 'auto',
  },
  profileContainer: {
    width: width,
    height: height / 3,
  },
  profileDetails: {
    paddingTop: theme.SIZES.BASE * 2,
    justifyContent: 'flex-end',
    position: 'relative',
  },
  profileTexts: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
    zIndex: 2
  },
  pro: {
    backgroundColor: materialTheme.COLORS.LABEL,
    paddingHorizontal: 6,
    marginRight: theme.SIZES.BASE / 2,
    borderRadius: 4,
    height: 19,
    width: 38,
  },
  seller: {
    marginRight: theme.SIZES.BASE / 2,
  },
  inputsView: {
    marginTop: 400,
    padding: theme.SIZES.BASE,
    //  paddingTop: -theme.SIZES.BASE * 7,
    marginHorizontal: theme.SIZES.BASE,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    borderBottomLeftRadius: 13,
    borderBottomRightRadius: 13,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    height: "75%",
    // paddingBottom: 50,
  },
  options: {
    // position: 'relative',
    // padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    // paddingTop: -theme.SIZES.BASE * 2,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure
  },
  gradient: {
    zIndex: 1,
    left: 0,
    right: 0,
    bottom: 0,
    height: '30%',
    position: 'absolute',
  },
  PostalCode: {
    marginBottom:20,
  },
  buttonSubmit: {
    marginBottom:40,
  },
});
