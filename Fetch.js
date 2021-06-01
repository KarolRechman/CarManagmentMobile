import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Text, TextInput, View } from 'react-native'
import { act } from 'react-dom/test-utils';

const useAxios = (url, setData) => {
    useEffect(
        () => {
            let mounted = true;

            const loadData = async () => {
                const result = await axios.get(url);
                if (mounted) {
                    act(() => {
                        setData(result.data);
                    });
                }
            };
            loadData();

            return () => {
                mounted = false;
            };
        },
        [url]
    );
};

export default function Fetch({ url }) {
    const [data, setData] = useState(null);
    useAxios(url, setData);

    if (!data) {
        return (<View><Text testID="loading">Loading data...</Text></View>);
    } else {
        return (<View><Text testID="resolved">{data.model}</Text></View>);
    }
}