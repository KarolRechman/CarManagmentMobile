import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, ScrollView, Alert } from 'react-native';
import { Button, Block, Text, Input, theme, Card } from 'galio-framework';
import api, { API_TYPES } from "../actions/api";
import { Icon, Product } from '../components';
import Select from "../components/Select";
import * as SecureStore from 'expo-secure-store';

const { width } = Dimensions.get('screen');
import products from '../constants/products';

export default function Spendings(props) {
  const [refresh, setRefresh] = useState(false);
  const [costs, setCosts] = useState([]);
  const [cars, setCars] = useState([]);
  const [costsForSelect, setCostsForSelect] = useState([]);
  const [carsForSelect, setCarsForSelect] = useState([]);
  const [state, setState] = React.useState({
    carId: 0, costId: 0, price: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      const id = await SecureStore.getItemAsync("userId");

      const costsResponse = await api.request(API_TYPES.COSTS).fetchAll();
      const userCars = await api.request(API_TYPES.SPENDINGS).fetchUserCars("/" + id);

      setCosts(costsResponse.data)
      setCostsForSelect(costsResponse.data.map(v => v.description));
      setCars(userCars.data)
      setCarsForSelect(userCars.data.map(v => v.model));
    };

    fetchData();
  }, [refresh]);

  const handleChangeCars = (index, value) => {
    let car = cars.filter(x=>x.model == value);
    setState({
      ...state,
      carId: car[0].idCar,
    });
  };

  const handleChangeCost = (index, value) => {
    let cost = costs.filter(x=>x.description == value)
    setState({
      ...state,
      costId: cost[0].idCosts,
    });
  };
  const handleChangePrice = (value) => {
    setState({
      ...state,
      price: value,
    });
  };

  async function SendData() {
    if (!state.carId == 0 && !state.costId == 0 && !state.price == 0) {
      state.idSpendings = 0;
      state.carId = parseInt(state.carId);
      state.costId = parseInt(state.costId);
      state.price = parseInt(state.price);
      state.Date = new Date().toISOString().slice(0, 10);
      state.idUser = await SecureStore.getItemAsync("userId");
     await api.request(API_TYPES.SPENDINGS).create("/AddSpending/", state).then(res=>{
       if(res.data=="OK"){
        setRefresh(!refresh)
        Alert.alert("Zaktualizowano Dane");
       }
     });
    }
  }
console.log(carsForSelect)
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.home}
    >
      <Text style={styles.text}>
        Koszt
</Text>
      <Select
        defaultIndex={"Costs"}
        options={costsForSelect}
        style={styles.select}
        onSelect={handleChangeCost}
      />
      <Text style={styles.text}>
        Samochód
</Text>
      <Select
        defaultIndex={"Cars"}
        options={carsForSelect}
        style={styles.select}
        onSelect={handleChangeCars}
      />
      <Text style={styles.text}>
        Kwota
</Text>
      <Input
        type="numeric"
        style={styles.inputPrice}
        placeholder="Kwota"
        right
        icon="attach-money"
        family="FontAwesome5"
        iconSize={20}
        iconColor="black"
        onChangeText={price => handleChangePrice(price)}
      />
      <Button color="success" onPress={SendData}>Dodaj wydatek</Button>

    </ScrollView>
  )
}


const styles = StyleSheet.create({
  select: {
    width: "100%",
  },
  home: {
    width: width,
    padding: 15,
  },
  inputPrice: {

  },
  text: {
    marginTop: 20,
  }
});
