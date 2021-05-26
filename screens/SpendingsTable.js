import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, ScrollView, View } from 'react-native';
import { Text } from 'galio-framework';
import api, { API_TYPES } from "../actions/api";
import DropDownPicker from 'react-native-dropdown-picker';
import * as SecureStore from 'expo-secure-store';
import { DataTable } from 'react-native-paper';

const { width } = Dimensions.get('screen');


export default function SpendingsTable(props) {
    const [spendings, setUpdatedSpendings] = useState([]);
    const [oldSpendings, setOldSpendings] = useState([]);
    const [filterSpendings, setFilterSpendings] = useState([]);
    const [cars, setCars] = useState([]);
    const [carsForSelect, setCarsForSelect] = useState([{
        label: "All", value: 0
    }]);
    const [costs, setCosts] = useState([]);
    const [state, setState] = useState({
        carId: 0,
        costId: 0,
    });


    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);

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
            setCarsForSelect((prevState)=>{
              return  [...prevState,...userCars.data.map(v => ({ label: v.model, value: v.idCar }))];
            });
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
        let userSpendings = spendings.filter((s) =>
        cars.find((c) => c.idCar == s.carID)
      );

        let newSpendings = userSpendings.map((spending) => {

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

    const handleChangeCars = (value) => {
        if (value != 0) {
            let car = cars.filter(x => x.idCar == value);
            let carSpendings = oldSpendings.filter((x) => x.carID == car[0].model);
            setFilterSpendings(carSpendings);
        } else {
            setFilterSpendings(oldSpendings);
        }
    };

    return (
        <View style={styles.home}>
            <Text style={styles.text}>
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
        marginBottom: 15,
    },
    inputPrice: {

    },
    text: {
        marginTop: 20,
    }
});