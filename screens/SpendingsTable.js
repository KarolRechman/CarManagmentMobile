import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, ScrollView, View } from 'react-native';
import { Button, Block, Text, Input, theme } from 'galio-framework';
import api, { API_TYPES } from "../actions/api";
import Select from "../components/Select";
import * as SecureStore from 'expo-secure-store';
import { DataTable } from 'react-native-paper';

const { width } = Dimensions.get('screen');


export default function SpendingsTable(props) {
    const [spendings, setUpdatedSpendings] = useState([]);
    const [oldSpendings, setOldSpendings] = useState([]);
    const [filterSpendings, setFilterSpendings] = useState([]);
    const [cars, setCars] = useState([]);
    const [carsForSelect, setCarsForSelect] = useState([]);
    const [costs, setCosts] = useState([]);
    const [state, setState] = React.useState({
        carId: 0,
        costId: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            const idUser = await SecureStore.getItemAsync("userId");

            const request = await api
                .request(API_TYPES.SPENDINGS)
                .fetchSpendings("/" + idUser);

            const costsResponse = await api.request(API_TYPES.COSTS).fetchAll();
            const userCars = await api
                .request(API_TYPES.SPENDINGS)
                .fetchUserCars("/" + idUser);

            setCars(userCars.data);

            setCosts(costsResponse.data);
            let mapSpendings = await setSpendings(request.data, userCars.data, costsResponse.data)
            setOldSpendings(mapSpendings);
            setUpdatedSpendings(mapSpendings);
            setCarsForSelect(userCars.data.map(v => v.model));
        };

        fetchData();
    }, []);

    useEffect(() => {
        const updateData = async () => {
            setUpdatedSpendings(filterSpendings ? filterSpendings : spendings);
        };

        updateData();
    }, [filterSpendings]);

    async function setSpendings(spendings, cars, costs) {

        let newSpendings = spendings.map((spending) => {

            spending.date = spending.date.substring(0, spending.date.indexOf("T"));
            let carDesc = cars.find((car) => car.idCar === spending.carID);

            spending.carID = carDesc.model;
            let costDesc = costs.find((cost) => cost.idCosts === spending.costID);

            spending.costID = costDesc.description;
            delete spending.idSpendings;
            delete spending.idUser;

            return spending;
        });
        return newSpendings;
    }

    const handleChangeCars = (index, value) => {
        let car = cars.filter(x => x.model == value);

        if (car[0].idCar != 0) {
            let carSpendings = oldSpendings.filter((x) => x.carID == event.target.value);
            setFilterSpendings(carSpendings);
        } else {
            setFilterSpendings(oldSpendings);
        }
    };
    // console.log(cars)
    // console.log(carsForSelect)

    return (
        <View style={styles.home}>
            <Text style={styles.text}>
                Samochód
            </Text>
            <Select
                 defaultIndex={"Cars"}
                options={carsForSelect}
                style={styles.select}

            />
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Date</DataTable.Title>
                    <DataTable.Title>Model</DataTable.Title>
                    <DataTable.Title>Wydatek</DataTable.Title>
                    <DataTable.Title numeric >Price</DataTable.Title>
                </DataTable.Header>
                <ScrollView >
                    {spendings ? spendings.map((spending, index) =>

                        <DataTable.Row key={index}>
                            <DataTable.Cell >{spending.date}</DataTable.Cell>
                            <DataTable.Cell >{spending.carID}</DataTable.Cell>
                            <DataTable.Cell >{spending.costID}</DataTable.Cell>
                            <DataTable.Cell numeric>{spending.price}</DataTable.Cell>
                        </DataTable.Row>
                    ) : null}
                </ScrollView>

                {/* <DataTable.Pagination
                page={1}
                numberOfPages={3}
                onPageChange={page => {
                    console.log(page);
                }}
                label="1-2 of 6"
            /> */}
            </DataTable>
        </View>
    )
}

const styles = StyleSheet.create({
    select: {
        width: "90%",
        paddingBottom: 10,
        marginBottom: 20,
    },
    home: {
        width: width,
        padding: 15,
        marginBottom:15,
    },
    inputPrice: {

    },
    text: {
        marginTop: 20,
    }
});