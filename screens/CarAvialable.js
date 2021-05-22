import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, ScrollView, View, Alert } from 'react-native';
import { Button, Text } from 'galio-framework';
import api, { API_TYPES } from "../actions/api";
import { DataTable } from 'react-native-paper';
import DateTimePicker from '../components/DateTimePicker';
import * as SecureStore from 'expo-secure-store';

const { width } = Dimensions.get('screen');

export default function CarAvialable(props) {
    const [selectionModel, setSelectionModel] = useState([]);
    const [carList, setData] = useState([]);
    const [dateTimePicker, showDateTimePicker] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [show, showButton] = useState(false);
    const [carId, setCarId] = useState(0);
    const [date, setDate] = useState({
        startDate: null,
        endDate: null,
        startTime: null,
        endTime: null,
    });

    const setCarAndCell = (cell, id) => {
        setCarId(id)
    }

    useEffect(() => {
        const fetchData = async () => {
            const request = await api.request(API_TYPES.CAR).fetchAll();
            setData(request.data.filter((x) => x.isAvailable == 1))
        };

        fetchData();
    }, [refresh]);

    useEffect(() => {
        const checkDateTime = () => {
            if (checkProperties(date)) {
                showButton(true)
            }
        }

        checkDateTime();
    }, [date]);

    async function sendTransaction() {
        console.log(date)
        if (carId) {
            const id = await SecureStore.getItemAsync("userId");
            let car = carList.filter(x => x.idCar == carId);

            let startDate = new Date(date.startDate.getFullYear(), date.startDate.getMonth(), date.startDate.getDate(),
                date.startTime.getHours(), date.startTime.getMinutes(), date.startTime.getSeconds());

            let endDate = new Date(date.endDate.getFullYear(), date.endDate.getMonth(), date.endDate.getDate(),
                date.endTime.getHours(), date.endTime.getMinutes(), date.endTime.getSeconds());

            console.log(car)
            let newTransaction = {
                Transaction: 0,
                User: id,
                Car: parseInt(carId),
                Price: parseInt(car[0].priceDay),
                IsEnd: false,
                IsReturned: false,
                StartDate: startDate,
                EndDate: endDate
            }
            console.log(newTransaction)
            await api.request(API_TYPES.TRANSACTIONS).create("", newTransaction).then(response => {
                console.log(response)
                if (response.data == "OK") {
                    setRefresh(!refresh)
                   Alert.alert("Zarezerwano samochód")
                }
            })
        }

    }

    const handlePickerChange = (mode, selectedDate, key) => {
        if (selectedDate) {
            setDate((prevState) => ({
                ...prevState,
                [key]: selectedDate
            }))
        }
    };

    const checkProperties = (obj) => {
        for (var key in obj) {
            if (obj[key] == null || obj[key] == "")
                return false;
        }
        return true;
    }
    //  console.log(carList)

    const startDateProps = {
        title: "Data wynajmu",
        mode: "date",
        keyName: "startDate",
        onChange: handlePickerChange,
    }

    const endDateProps = {
        title: "Data zwrotu",
        mode: "date",
        keyName: "endDate",
        onChange: handlePickerChange,
    }

    const startTimeProps = {
        title: "Godzina wynajmu",
        mode: "time",
        keyName: "startTime",
        onChange: handlePickerChange,
    }

    const endTimeProps = {
        title: "Godzina zwrotu",
        mode: "time",
        keyName: "endTime",
        onChange: handlePickerChange,
    }

    return (
        <View style={styles.home}>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Manufacturer</DataTable.Title>
                    <DataTable.Title numeric>Model</DataTable.Title>
                    <DataTable.Title numeric>Color</DataTable.Title>
                    <DataTable.Title numeric >Year</DataTable.Title>
                    <DataTable.Title numeric >Price</DataTable.Title>
                </DataTable.Header>
                <ScrollView >
                    {carList ? carList.map((car, index) =>

                        <DataTable.Row key={index}>
                            <DataTable.Cell >{car.manufacturer}</DataTable.Cell>
                            <DataTable.Cell numeric onPress={cell => setCarAndCell(cell, car.idCar)} >{car.model}</DataTable.Cell>
                            <DataTable.Cell numeric>{car.color}</DataTable.Cell>
                            <DataTable.Cell numeric>{car.yofProd}</DataTable.Cell>
                            <DataTable.Cell numeric>{car.priceDay}</DataTable.Cell>
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
            <View style={styles.pickerContainer}>
                <Text>Wznajem</Text>
                <DateTimePicker {...startDateProps} />
                <DateTimePicker {...startTimeProps} />

            </View>
            <View style={styles.pickerContainer}>
                <Text>Zwrot</Text>
                <DateTimePicker {...endDateProps} />
                <DateTimePicker {...endTimeProps} />
            </View>
            {
                show ? (<View style={styles.pickerContainer}>
                    <Button color="success" onPress={sendTransaction}>Zarezerwuj</Button>
                </View>) : null
            }


        </View >
    )
}

const styles = StyleSheet.create({
    root: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        overflow: "hidden",
        // backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 500,
        height: 450,
    },
    icon: {
        color: "rgba(255, 255, 255, 0.54)",
    },
    pickerContainer: {
        padding: 15,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    }
});