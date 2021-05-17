import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, ScrollView, View } from 'react-native';
import { Text } from 'galio-framework';
import api, { API_TYPES } from "../actions/api";
import DropDownPicker from 'react-native-dropdown-picker';
import * as SecureStore from 'expo-secure-store';
import { DataTable } from 'react-native-paper';

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

    // const setCarList = (list) => {
    //     const updatedJson = list.map(
    //         ({
    //             idCar: id,
    //             manufacturer: manuf,
    //             model,
    //             color: color1,
    //             yofProd: yofProd1,
    //             kilometers: kilometers1,
    //             priceDay,
    //             isAvailable: isAvailable1,
    //             insurance: insurance1,
    //             segment: segment1,
    //             regNumbers: regNumbers1,
    //             filePath: filePath1,
    //             techRev: techRev1,
    //         }) => ({
    //             id,
    //             manuf,
    //             model,
    //             color1,
    //             yofProd1,
    //             kilometers1,
    //             priceDay,
    //             isAvailable1,
    //             insurance1,
    //             segment1,
    //             regNumbers1,
    //             filePath1,
    //             techRev1,
    //         })
    //     );

    //     setData(updatedJson.filter((x) => x.isAvailable1 == 1));
    // }

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

    // const handleChange = (e) => {

    //     setState((prevState) => ({
    //         ...prevState,
    //         [e.target.name]: e.target.value,
    //     }));
    // };
    console.log(carList)

    return (
        <View style={styles.home}>
            {/* <Text style={styles.text}>
                Samochód
            </Text>
            <DropDownPicker
                open={open}
                value={value}
                items={carsForSelect}
                setOpen={setOpen}
                setValue={setValue}
                onChangeValue={(value) => {
                    setValue(value);
                    handleChangeCars(value);
                }}
            /> */}

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
});