import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, ScrollView, View } from 'react-native';
import { Button, Block, Text, Input, theme } from 'galio-framework';
import api, { API_TYPES } from "../actions/api";
import * as SecureStore from 'expo-secure-store';
import Item from '../components/Item';
import { DataTable } from 'react-native-paper';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

const { width } = Dimensions.get('screen');
import infos from '../constants/products';

export default Dashboard = () => {
  const [cars, setData] = useState();
  const [carsInfos, setCarInfos] = useState(infos);
  const [spendings, setSpendings] = useState();
  const [sumValues, setSumValues] = useState();



  useEffect(() => {
    const fetchData = async () => {
      const userId = await SecureStore.getItemAsync("userId");
      const userCars = await api.request(API_TYPES.SPENDINGS).fetchUserCars("/" + userId);
      const userSpendings = await api.request(API_TYPES.SPENDINGS).fetchSpendings("/" + userId);

      setData(userCars.data);
      setSpendings(userSpendings.data);

      await updateInfos(setSumExpanses(userSpendings.data), userCars.data.length)
    };

    const updateInfos = async (sumValues, carsLength) => {
      if (sumValues && carsLength) {
        infos[0].desc = sumValues;
        infos[1].desc = carsLength;
        setCarInfos(infos)
      }
    }

    fetchData();

  }, [carsInfos]);

  useEffect(() => {
    const fetchData = async () => {
      const userId = await SecureStore.getItemAsync("userId");
      const userCars = await api.request(API_TYPES.SPENDINGS).fetchUserCars("/" + userId);
      const userSpendings = await api.request(API_TYPES.SPENDINGS).fetchSpendings("/" + userId);

      setData(userCars.data);
      setSpendings(userSpendings.data);

      await updateInfos(setSumExpanses(userSpendings.data), userCars.data.length)
    };

    const updateInfos = async (sumValues, carsLength) => {
      if (sumValues && carsLength) {
        infos[0].desc = sumValues;
        infos[1].desc = carsLength;
        infos[2].chart = <Chart />;
        setCarInfos(infos)
      }
    }

    const Chart = () => {
      return (
        <View>
          <LineChart
            data={{
              labels: ["January", "February", "March", "April", "May", "June"],
              datasets: [
                {
                  data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100
                  ]
                }
              ]
            }}
            width={Dimensions.get("window").width} // from react-native
            height={220}
            yAxisLabel="PLN"
            // yAxisSuffix="k"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726"
              }
            }}
            bezier
            style={{
              flex:1,
              marginVertical: 8,
              borderRadius: 8,
              padding:15,
              margin:5,
            }}
          />
        </View>)
    }

    fetchData();

  }, [carsInfos, sumValues]);


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

  // products[1].desc = cars.length;

  return (
    <Block flex center style={styles.home}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.products}>
        <Block flex>
          <Item item={carsInfos[0]} horizontal />
          <Block flex row>
            <Item item={carsInfos[1]} full style={{ marginRight: theme.SIZES.BASE }} />
            {/* <Item item={carsInfos[2]} /> */}
          </Block>
          {/* <Item item={carsInfos[3]} horizontal /> */}

          <Item item={carsInfos[2]} full />

        </Block>

        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Producent</DataTable.Title>
            <DataTable.Title>Model</DataTable.Title>
            <DataTable.Title>Kolor</DataTable.Title>
            <DataTable.Title numeric>Rok prod</DataTable.Title>
          </DataTable.Header>
          {cars ? cars.map(car =>
            <DataTable.Row key={car.id}>
              <DataTable.Cell >{car.manufacturer}</DataTable.Cell>
              <DataTable.Cell >{car.model}</DataTable.Cell>
              <DataTable.Cell >{car.color}</DataTable.Cell>
              <DataTable.Cell numeric>{car.yofProd}</DataTable.Cell>
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
