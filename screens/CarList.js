import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Button } from 'galio-framework';
import api, { API_TYPES } from "../actions/api";
import { DataTable } from 'react-native-paper';

export default function CarList(props) {
    const { navigation } = props;
    const [carList, setData] = useState([]);
    const [show, showButton] = useState(false);
    const [carId, setCarId] = useState(0);

    const setCarAndCell = (cell, id) => {
        console.log(id)
        setCarId(id)
        showButton(true)
    }

    useEffect(() => {
        const fetchData = async () => {
            const request = await api.request(API_TYPES.CAR).fetchAll();
            setData(request.data)
        };
        showButton(false)
        fetchData();
    }, []);

    const setDateCell = (date) => {
        return date.substring(0, date.lastIndexOf("T"))
    }

    return (
        <View style={styles.home}>
            <ScrollView horizontal>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title style={styles.cell}>Manufacturer</DataTable.Title>
                        <DataTable.Title style={styles.cell} numeric>Model</DataTable.Title>
                        <DataTable.Title style={styles.cell} numeric >Year</DataTable.Title>
                        <DataTable.Title style={styles.cell} numeric >Price</DataTable.Title>

                        <DataTable.Title style={styles.cell} numeric>Insurance</DataTable.Title>
                        <DataTable.Title style={styles.cell} numeric>Available</DataTable.Title>
                        <DataTable.Title style={styles.cell} numeric >KM</DataTable.Title>
                        <DataTable.Title style={styles.cell} numeric >Rev</DataTable.Title>
                    </DataTable.Header>
                    <ScrollView >
                        {carList ? carList.map((car, index) =>
                            <DataTable.Row key={index}>
                                <DataTable.Cell style={styles.cell} >{car.manufacturer}</DataTable.Cell>
                                <DataTable.Cell style={styles.cell} numeric onPress={cell => setCarAndCell(cell, car.idCar)} >{car.model}</DataTable.Cell>
                                <DataTable.Cell style={styles.cell} numeric>{car.yofProd}</DataTable.Cell>
                                <DataTable.Cell style={styles.cell} numeric>{car.priceDay}</DataTable.Cell>
                                <DataTable.Cell style={styles.cell} numeric>{setDateCell(car.insurance)}</DataTable.Cell>
                                <DataTable.Cell style={styles.cell} numeric>{car.isAvailable}</DataTable.Cell>
                                <DataTable.Cell style={styles.cell} numeric>{car.kilometers}</DataTable.Cell>
                                <DataTable.Cell style={styles.cell} numeric>{setDateCell(car.techRev)}</DataTable.Cell>
                            </DataTable.Row>
                        ) : null}
                    </ScrollView>
                </DataTable>
            </ScrollView>
            {
                show ? (<View style={styles.pickerContainer}>
                    <Button style={styles.button} color="success" onPress={() =>
                        navigation.push('Home', {
                            screen: 'Add / Edit car',
                            params: {
                                id: carId,
                                edit: true,
                            }
                        })}>
                        Edytuj
                        </Button>
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
        minWidth: "80%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        minWidth: "80%",
        padding: 5,
    }
    ,
    cell: {
        minWidth: 70,
        marginHorizontal: 5,
    }
});