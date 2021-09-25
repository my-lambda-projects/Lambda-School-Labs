import React, { useState } from "react";
import { TextInput, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";
import Spacer from "./Spacer";

const LocField = ({ errorMessage, onSubmit, submitButtonText }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // const initialState = { name: "", description: "" };
  // const clearState = () => {};

  return (
    <>
      <Text style={styles.inputLabels}>Location Name</Text>
      <TextInput
        placeholder="Name"
        clearTextOnFocus={true}
        value={name}
        onChangeText={setName}
        autoCapitalize="none"
        autoCorrect={false}
        np
        style={styles.inputField}
      />
      <TouchableOpacity>
        <Text style={styles.clearFields} onPress={() => setName("")}>
          Clear Name Field
        </Text>
      </TouchableOpacity>
      <Spacer />

      <Text style={styles.inputLabels}>Description</Text>
      <TextInput
        placeholder="Describe Location"
        clearTextOnFocus={true}
        value={description}
        onChangeText={setDescription}
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.inputField}
      />
      <TouchableOpacity>
        <Text style={styles.clearFields} onPress={() => setDescription("")}>
          Clear Description Field
        </Text>
      </TouchableOpacity>
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
      <Spacer>
        <Button
          title={submitButtonText}
          iconRight={true}
          onPress={() => {
            console.log("im pressed");
            onSubmit({ name, description });
            setName("");
            setDescription("");
          }}
          style={{ marginTop: 80 }}
          //   onPress={() => setName("")}
          //   onPress={() => setDescription("")}
        />
      </Spacer>
    </>
  );
};

const styles = StyleSheet.create({
  errorMessage: {
    fontSize: 16,
    color: "red",
    marginLeft: 15,
    marginTop: 15
  },
  inputField: {
    height: 40,
    width: "91%",
    borderColor: "gray",
    borderRadius: 5,
    borderWidth: 1,
    alignSelf: "center",
    paddingLeft: 10,
    marginTop: 20
  },
  inputLabels: {
    width: "91%",
    alignSelf: "center",
    fontSize: 17
  },
  clearFields: {
    fontSize: 12,
    color: "teal",
    alignSelf: "center"
  }
});

export default LocField;
