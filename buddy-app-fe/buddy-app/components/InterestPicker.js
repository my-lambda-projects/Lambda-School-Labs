import React from "react";
import { View, StyleSheet, Picker, Platform } from "react-native";
import SelectInput from "react-native-select-input-ios";

function InterestPicker(props) {
  const updateActivityInterest = value => {
    props.setActivityInterest(value);
  };

  const options = props.interests.map(interest => {
    return { value: interest.name, label: `${interest.name}` };
  });

  //   console.log("Options", options);

  return (
    <View>
      {Platform.OS !== "ios" ? (
        // android selector for interest category
        <Picker
          selectedValue={props.activityInterest}
          onValueChange={itemValue => {
            updateActivityInterest(itemValue);
            //   console.log(activityInterest, "ai");
            //   console.log(itemValue);
          }}
          style={styles.androidPicker}
        >
          {props.interests.map(interest => {
            return (
              <Picker.Item
                label={`${interest.name}`}
                value={`${interest.name}`}
                key={interest.id}
              />
            );
          })}
        </Picker>
      ) : (
        // iOS selector for interest category
        <SelectInput
          value={`${props.activityInterest}`}
          options={options}
          onValueChange={selected => {
            console.log(selected);
            props.setActivityInterest(selected);
          }}
          style={styles.iosPicker}
          labelStyle={{
            fontSize: 15,
            fontFamily: "Nunito-Light",
            color: "#2E2F38",
            paddingVertical: 5,
            paddingLeft: 10
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  androidPicker: {
    height: 50,
    width: "100%"
  },
  iosPicker: {
    width: "100%",
    marginVertical: 20,
    borderWidth: 1,
    borderColor: "#B0B0B0"
  }
});

export default InterestPicker;
