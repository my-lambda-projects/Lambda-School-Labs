import React, { useState } from "react";
import { TextInput, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import Spacer from "./Spacer";

const LoginForm = ({ errorMessage, onSubmit, submitButtonText }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");

  return (
    <>
      <Text style={styles.inputLabels}>Username</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUserName}
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.inputField}
      />
      <Spacer />

      <Text style={styles.inputLabels}>Email</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.inputField}
      />
      <Spacer />

      <Text style={styles.inputLabels}>Password</Text>
      <TextInput
        secureTextEntry
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.inputField}
      />
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
      <Spacer>
        <Button
          buttonStyle={styles.btn}
          title={submitButtonText}
          iconRight={true}
          // onPress={() => onSubmit({ email, password, username })}
          onPress={() => onSubmit({ email, username, password })}
        />
      </Spacer>
    </>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: 343,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#3366FF",
    paddingBottom: 8,
    marginTop: 20,
    width: "100%"
  },
  errorMessage: {
    fontSize: 16,
    color: "red",
    marginLeft: 15,
    marginTop: 15
  },
  inputField: {
    height: 40,
    width: "91%",
    borderColor: "#BFBFBF",
    borderRadius: 5,
    borderWidth: 1,
    alignSelf: "center",
    paddingLeft: 10,
    marginTop: 10,
    marginBottom: 0
  },
  inputLabels: {
    width: "91%",
    alignSelf: "center",
    fontSize: 17
  }
});

export default LoginForm;
