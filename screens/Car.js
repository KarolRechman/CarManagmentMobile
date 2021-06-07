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
  const [car, setCar] = useState();

  const handleChange = (event) => {
    // const name = event.target.id;
    // setCar({
    //   ...car,
    //   // [name]: event.target.value,
    // });
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
      await api.request(API_TYPES.CAR).update(car.id, car,);
    } else {
      await api.request(API_TYPES.CAR).create("/", car);
    }
    props.navigation.push('Home', {
      screen: 'Add / Edit car',
      params: {
        id: 0,
        edit: false,
      }
    })
  }

  useEffect(() => {
    console.log(props.route.params, "params")
    const fetchData = async () => {
      if (props.route.params.id != 0) {
        console.log(props.route.params, "params")
        const request = await api
          .request(API_TYPES.CAR)
          .fetchById("/" + props.route.params.id);
        setCar(request.data);
      } else {
        setCar({
          idCar: 0
        })
      }
    };

    fetchData();
  }, []);

  console.log(car, "Car")

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
          type="numeric"
          placeholderTextColor="grey"
          placeholder="Car id"
          color="black"
          right
          icon="attach-money"
          family="FontAwesome5"
          iconSize={20}
          iconColor="black"
          value={car?.idCar?.toString()}
          help="Username"
        // onChangeText={(value) => handleChange(value, "UserName")}
        />
        <Input
          type="default"
          placeholder="Manufacturer"
          placeholderTextColor="grey"
          color="black"
          right
          icon="attach-money"
          family="FontAwesome5"
          iconSize={20}
          iconColor="black"
          value={car?.manufacturer}
          help="Manufacturer"
          onChangeText={value => handleChange(value, "manufacturer")}
        />
        <Input
          type="default"
          placeholder="Model"
          placeholderTextColor="grey"
          color="black"
          right
          icon="attach-money"
          family="FontAwesome5"
          iconSize={20}
          iconColor="black"
          value={car?.model}
          help="Model"
          onChangeText={value => handleChange(value, "model")}
        />
        <Input
          type="default"
          placeholder="Color"
          placeholderTextColor="grey"
          color="black"
          right
          icon="attach-money"
          family="FontAwesome5"
          iconSize={20}
          iconColor="black"
          value={car?.color}
          help="Color"
          onChangeText={value => handleChange(value, "color")}
        />
        <Input
          type="numeric"
          placeholder="Available"
          placeholderTextColor="grey"
          color="black"
          right
          icon="attach-money"
          family="FontAwesome5"
          iconSize={20}
          iconColor="black"
          value={car?.isAvailable?.toString()}
          help="Available"
          onChangeText={value => handleChange(value, "isAvailable")}
        />
        <Input
          type="numeric"
          placeholder="Kilometers"
          placeholderTextColor="grey"
          color="black"
          right
          icon="attach-money"
          family="FontAwesome5"
          iconSize={20}
          iconColor="black"
          value={car?.kilometers?.toString()}
          help="Kilometers"
          onChangeText={value => handleChange(value, "kilometers")}
        />
        <Input
          type="numeric"
          placeholder="Price for day"
          placeholderTextColor="grey"
          color="black"
          right
          icon="attach-money"
          family="FontAwesome5"
          iconSize={20}
          iconColor="black"
          value={car?.priceDay?.toString()}
          help="Price for day"
          onChangeText={value => handleChange(value, "priceDay")}
        />
        <Input
          type="default"
          placeholder="Regestration Nr."
          placeholderTextColor="grey"
          color="black"
          right
          icon="attach-money"
          family="FontAwesome5"
          iconSize={20}
          iconColor="black"
          value={car?.regNumbers?.toString()}
          help="Regestration Nr."
          onChangeText={value => handleChange(value, "regNumbers")}
        />
        <Input
          type="numeric"
          placeholder="Segment"
          placeholderTextColor="grey"
          color="black"
          right
          icon="attach-money"
          family="FontAwesome5"
          iconSize={20}
          iconColor="black"
          value={car?.segment?.toString()}
          help="Segment"
          onChangeText={value => handleChange(value, "segment")}
        />
        <Input
          type="numeric"
          placeholder="Year of production"
          placeholderTextColor="grey"
          color="black"
          right
          icon="attach-money"
          family="FontAwesome5"
          iconSize={20}
          iconColor="black"
          value={car?.yofProd?.toString()}
          help="Year of production"
          onChangeText={value => handleChange(value, "yofProd")}
        />
        <Input
          type="default"
          placeholder="Format 2015-11-10"
          placeholderTextColor="grey"
          color="black"
          right
          icon="attach-money"
          family="FontAwesome5"
          iconSize={20}
          iconColor="black"
          value={car?.insurance?.toString()}
          help="Insurance"
          onChangeText={value => handleChange(value, "insurance")}
        />
        <Input
          type="default"
          placeholder="Format 2015-11-10"
          placeholderTextColor="grey"
          color="black"
          right
          icon="attach-money"
          family="FontAwesome5"
          iconSize={20}
          iconColor="black"
          value={car?.techRev?.toString()}
          help="Technical rev."
          onChangeText={value => handleChange(value, "techRev")}
        />
        <Input
          type="default"
          style={styles.PostalCode}
          placeholder="File path"
          placeholderTextColor="grey"
          color="black"
          right
          icon="attach-money"
          family="FontAwesome5"
          iconSize={20}
          iconColor="black"
          value={car?.filePath?.toString()}
          help="File path"
          onChangeText={value => handleChange(value, "filePath")}
        />
        <Button style={styles.buttonSubmit} color="success" onPress={SendData}>{props.route.params.edit ? "Aktualizuj" : "Dodaj"}</Button>
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
    marginHorizontal: theme.SIZES.BASE,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    borderBottomLeftRadius: 13,
    borderBottomRightRadius: 13,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    height: "75%",
  },
  options: {
    marginHorizontal: theme.SIZES.BASE,
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
    marginBottom: 20,
  },
  buttonSubmit: {
    marginBottom: 40,
  },
});
