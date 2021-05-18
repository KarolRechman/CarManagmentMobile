import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, ScrollView, View } from 'react-native';
import { Text } from 'galio-framework';
import api, { API_TYPES } from "../actions/api";
import DropDownPicker from 'react-native-dropdown-picker';
import * as SecureStore from 'expo-secure-store';
import { DataTable } from 'react-native-paper';
import DateTimePicker from '../components/DateTimePicker';

const { width } = Dimensions.get('screen');

export default function CarAvialable(props) {
    const [selectionModel, setSelectionModel] = useState([]);
    const [carList, setData] = useState([]);
    const [dateTimePicker, showDateTimePicker] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [state, setState] = useState({
        startDate: null,
        endDate: null,
    });
    const [reservationTime, setReservation] = useState({
        startTime: null,
        endTime: null,
    });

    useEffect(() => {
        const fetchData = async () => {
            const request = await api.request(API_TYPES.CAR).fetchAll();
            setData(request.data.filter((x) => x.isAvailable == 1))
        };

        fetchData();
    }, [refresh]);

    const reserveCar = async () => {
        sendTransaction();
    };

    async function sendTransaction() {

        let car = carList.filter(x => x.id == selectionModel);
        console.log(car)
        let newTransaction = {
            Transaction: 0,
            User: props.match.params.id,
            Car: parseInt(selectionModel),
            Price: parseInt(car[0].priceDay),
            IsEnd: false,
            IsReturned: false,
            StartDate: new Date(state.startDate),
            EndDate: new Date(state.endDate),
        }
        console.log(newTransaction)
        await api.request(API_TYPES.TRANSACTIONS).create("", newTransaction).then(response => {
            console.log(response)
            if (response.data == "OK") {
                setRefresh(!refresh)
                // Modal(response.data);
            }
        })
    }

    const handlePickerChange = (type, mode, selectedDate) => {
        if (mode === "date") {
            if (type === "zwrotu") {
                setState((prevState) => ({
                    ...prevState,
                    endDate: selectedDate.substring(0, selectedDate.indexOf("T"))
                }))
            } else {
                setState((prevState) => ({
                    ...prevState,
                    startDate: selectedDate.substring(0, selectedDate.indexOf("T"))
                }))
            }
        } else {
            if (type === "zwrotu") {
                setReservation((prevState) => ({
                    ...prevState,
                    startTime: selectedDate.substring(0, selectedDate.indexOf("T"))
                }))
            } else {
                setReservation((prevState) => ({
                    ...prevState,
                    endTime: selectedDate.substring(0, selectedDate.indexOf("T"))
                }))
            }
        }
    };
    // console.log(carList)

    const startDateProps = {
        title: "Data wynajmu",
        mode: "date",
        onChange: handlePickerChange,
    }

    const endDateProps = {
        title: "Data zwrotu",
        mode: "date",
        onChange: handlePickerChange,
    }

    const startTimeProps = {
        title: "Godzina wynajmu",
        mode: "time",
        onChange: handlePickerChange,
    }

    const endTimeProps = {
        title: "Godzina zwrotu",
        mode: "time",
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
                            <DataTable.Cell numeric>{car.model}</DataTable.Cell>
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

        </View>
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