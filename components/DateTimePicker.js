import React, {useState} from 'react';
import {View, Button, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function Picker(props){
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState(props.mode);
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    props.onChange(props.mode, selectedDate, props.keyName)
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showPicker = () => {
    showMode(props.mode);
  };

  return (
    <View>
      <View>
        <Button onPress={showPicker} title={props.title} />
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};