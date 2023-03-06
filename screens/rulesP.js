import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Provider as PaperProvider,
  Button,
  TextInput,
  Text,
  Provider,
} from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
// import provider

export default function RulesP() {
    const genderList = [
        {
        label: "Male",
        value: "male",
        },
        {
        label: "Female",
        value: "female",
        },
        {
        label: "Others",
        value: "others",
        },
    ];

    const colorsList = [
        {
        label: "Red",
        value: "red",
        },
        {
        label: "Green",
        value: "green",
        },
        {
        label: "Blue",
        value: "blue",
        },
    ];

    const DropDownComponent = ({label, list}) => {
        const [showDropDown, setShowDropDown] = useState(false);
        const [Value, setValue] = useState(list[0].value);
        return (
            <DropDown
            label={label}
            mode={"contained"}
            visible={showDropDown}
            showDropDown={() => setShowDropDown(true)}
            onDismiss={() => setShowDropDown(false)}
            value={Value}
            setValue={setValue}
            list={list}
          />
        );
    };

  return (
    <Provider>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View style={styles.condition}>
          <Text>If</Text>
          <DropDownComponent label={"Gender"} list={genderList} />
          <DropDownComponent label={"Colors"} list={colorsList} />
        </View>
      </View>
    </Provider>
  );
}
const styles = StyleSheet.create({
  button: {
    width: 300,
    marginTop: 10,
  },
  condition: {
    width: 300,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});
