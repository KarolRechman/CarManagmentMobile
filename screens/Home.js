import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Button, Block, Text, Input, theme } from 'galio-framework';
import api, { API_TYPES } from "../actions/api";
import * as SecureStore from 'expo-secure-store';
import Item from '../components/Item';
import { DataTable } from 'react-native-paper';

const { width } = Dimensions.get('screen');
import products from '../constants/products';

export default Dashboard = () => {
  const [carDesc, setData] = useState();
  const [spendings, setSpendings] = useState();
  const [sumValues, setSumValues] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const userId = await SecureStore.getItemAsync("userId");
      const userCars = await api.request(API_TYPES.SPENDINGS).fetchUserCars("/" + userId);
      const userSpendings = await api.request(API_TYPES.SPENDINGS).fetchSpendings("/" + userId);

      setData(userCars.data);
      setSpendings(userSpendings.data);
      setSumValues(setSumExpanses(userSpendings.data));
    };

    fetchData();
  }, []);

  function setSumExpanses(spendings) {
    var map = spendings.reduce(function (map, spending) {
      var date = spending.date;
      var price = +spending.price;
      map[date] = (map[date] || 0) + price;
      return map;
    }, {});

    var array = Object.keys(map).map(function (date) {
      return {
        date: date.substring(0, date.indexOf("T")),
        price: map[date],
      };
    });

    return array.reduce((total, obj) => obj.price + total, 0);
  }

  return (
    <Block flex center style={styles.home}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.products}>
        <Block flex>
          <Item item={products[0]} horizontal />
          <Block flex row>
            <Item item={products[1]} style={{ marginRight: theme.SIZES.BASE }} />
            <Item item={products[2]} />
          </Block>
          <Item item={products[3]} horizontal />
          <Item item={products[4]} full />
        </Block>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Producent</DataTable.Title>
            <DataTable.Title>Model</DataTable.Title>
            <DataTable.Title>Kolor</DataTable.Title>
            <DataTable.Title numeric>Rok prod</DataTable.Title>
          </DataTable.Header>
          {carDesc ? carDesc.map( car =>
            <DataTable.Row key={car.id}>
              <DataTable.Cell key={car.id}>{car.manufacturer}</DataTable.Cell>
              <DataTable.Cell key={car.id}>{car.model}</DataTable.Cell>
              <DataTable.Cell key={car.id}>{car.color}</DataTable.Cell>
              <DataTable.Cell key={car.id} numeric>{car.yofProd}</DataTable.Cell>
            </DataTable.Row>) : null}

          <DataTable.Pagination
            page={1}
            numberOfPages={3}
            onPageChange={page => {
              console.log(page);
            }}
            label="1-2 of 6"
          />
        </DataTable>
      </ScrollView>
    </Block>
  )
}





const styles = StyleSheet.create({
  home: {
    width: width,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 4,
    zIndex: 2,
  },
  tabs: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.50,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '300'
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.MUTED,
  },
  products: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
  },
});
