import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Picker,
  ActivityIndicator,
  KeyboardAvoidingView,
  TextInput,
  ScrollView
} from "react-native";
import { Tile, Button, Input, Text, Icon, Image } from "react-native-elements";
import Spacer from "../components/Spacer";
import HeadBar from "../components/HeaderBar";
import LocField from "../components/LocField";
import { Context } from "../context/LocationContext";
import KeyboardShift from "../constants/KeyboardShift";
import OrderUpc from "../components/OrderUpc";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import * as yup from 'yup'
import { Formik } from "formik";
import axios from "axios";

const LocationForm = (props) => {
  const { state, addLocation, clearErrorMessage } = useContext(Context);

  if (props.navigation.state.params) {
    var barkode = props.navigation.state.params.dataString2;
  }
  console.log("Barcode Scanned", barkode);


  return (
    <KeyboardShift>
      <ScrollView>
        <View style={styles.assetSection}>
          <Text style={styles.activeText}>ADD LOCATION</Text>
          <View style={styles.activeTab} />
        </View>

        <View style={styles.locationBody}>
          <Text style={styles.locationStyle}>You can lose a lot of things.</Text>
          <Text style={styles.locationStyle}>Asset Tracker is here to help.</Text>
          <Text style={styles.locationStyle}>Don't forget to add the location!</Text>
        </View>

        <View style={styles.qrArrowContainer}>
          <Entypo style={styles.arrowDotFirst} name="dots-three-vertical" color="#3366FF" size={15} />
          <Entypo style={styles.arrowDot} name="dots-three-horizontal" color="#3366FF" size={15} />
          <Entypo style={styles.arrowDot} name="dots-three-horizontal" color="#3366FF" size={15} />
          <Entypo style={styles.arrowDot} name="dots-three-horizontal" color="#3366FF" size={15} />
          <Entypo style={styles.arrowDot} name="dots-three-horizontal" color="#3366FF" size={15} />
          <Entypo style={styles.arrowDot} name="dots-three-horizontal" color="#3366FF" size={15} />
          <Entypo style={styles.arrowDot} name="dots-three-horizontal" color="#3366FF" size={15} />
          <Entypo style={styles.arrowRight} name="chevron-small-right" color="#3366FF" size={30} />

          <TouchableOpacity
            onPress={() => props.navigation.navigate("LocationScannerStack")}
          >
            <MaterialCommunityIcons
              style={styles.upc}
              name="qrcode-scan"
              size={25}
            />
          </TouchableOpacity>
        </View>

        <Formik

          initialValues={{
            name: "",
            location_qrcode: barkode,
            container: '',
            address: '',
            description: ''
          }}

          onSubmit={(values) => axios
            .post("https://net-giver-asset-mngr.herokuapp.com/api/location", values)
            .then(res => {
              Alert.alert(
                'Message',
                'Successfuly Added Item!',
                [
                  { text: 'Ok', onPress: () => props.navigation.navigate("AssetsList") }
                ],
                { cancelable: false }
              );
            })
            .catch(err => {
              "Can not add"
            })
          }

        // validationSchema={yup.object().shape({
        //   qrCode: yup
        //     .string()
        //     .required(),
        //   container: yup
        //     .string()
        //     .required(),
        //   description: yup
        //     .string()
        //     .required()
        // })}
        >

          {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
            <View style={styles.container}>
              <Text style={styles.assetTitle}>QR Code</Text>
              <TextInput
                placeholder="95893830"
                value={values.location_qrcode}
                onChangeText={handleChange("location_qrcode")}
                onBlur={() => setFieldTouched("location_qrcode")}
                clearButtonMode="while-editing"
                style={styles.textInputField}
              />
              {touched.location_qrcode && errors.location_qrcode && (
                <Text style={{
                  fontSize: 10, color: "red", paddingLeft: 20, marginTop: 5
                }}>
                  {errors.location_qrcode}
                </Text>
              )}

              <Text style={styles.assetTitle}>Container</Text>
              <TextInput
                placeholder="Where the item is stored"
                value={values.container}
                onChangeText={handleChange("container")}
                onBlur={() => setFieldTouched("container")}
                clearButtonMode="while-editing"
                style={styles.textInputField}
              />
              {touched.container && errors.container && (
                <Text style={{
                  fontSize: 10, color: "red", paddingLeft: 20, marginTop: 5
                }}>
                  {errors.container}
                </Text>
              )}

              <Text style={styles.assetTitle}>Address</Text>
              <TextInput
                placeholder="Optional"
                value={values.address}
                onChangeText={handleChange("address")}
                onBlur={() => setFieldTouched("address")}
                clearButtonMode="while-editing"
                style={styles.textInputField}
              />

              <Text style={styles.assetTitle}>Description</Text>
              <TextInput
                value={values.description}
                onChangeText={handleChange("description")}
                onBlur={() => setFieldTouched("description")}
                clearButtonMode="while-editing"
                style={styles.textInputFieldDesc}
              />
              {touched.description && errors.description && (
                <Text style={{
                  fontSize: 10, color: "red", paddingLeft: 20, marginTop: 5
                }}>
                  {errors.description}
                </Text>
              )}

              <Button
                iconRight={false}
                title="Add New Storage Location"
                type="solid"
                color="blue"
                onPress={handleSubmit}
                buttonStyle={styles.button}
              />
            </View>
          )}
        </Formik>
        <OrderUpc />
      </ScrollView>
    </KeyboardShift>
  );
};

const styles = StyleSheet.create({
  assetSection: {
    flexDirection: "row",
    color: "white",
    backgroundColor: "#EFEFF4",
    height: 50,
    width: "100%",
  },
  activeText: {
    color: "#3366FF",
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
    alignSelf: "center",
    flexDirection: "column",
    justifyContent: "center",
    width: "50%",
  },
  activeTab: {
    width: "50%",
    height: 1,
    position: "absolute",
    bottom: 0,
    backgroundColor: "#3366FF",
  },
  locationBody: {
    marginLeft: 45,
    marginRight: 45,
    marginTop: 20,
    marginBottom: 20,
    alignItems: "center"
  },
  locationStyle: {
    fontSize: 17
  },
  qrArrowContainer: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
    marginBottom: -20
  },
  upc: {
    marginBottom: 20,
    marginRight: "32%"
  },
  arrowDotFirst: {
    marginTop: -0.3,
    marginLeft: 10,
    marginRight: -4.2,
    justifyContent: "center"
  },
  arrowDot: {
    marginTop: 5.1,
    justifyContent: "center"
  },
  arrowRight: {
    marginTop: -2.5,
    marginLeft: -13
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    width: "90%",
    alignSelf: "center",
    marginTop: 32,
    borderRadius: 5
  },
  textInputField: {
    height: 40,
    width: "90%",
    borderColor: "gray",
    borderRadius: 5,
    borderWidth: 1,
    fontSize: 15,
    alignSelf: "center",
    paddingLeft: 10,
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10
  },
  textInputFieldDesc: {
    height: 60,
    width: "90%",
    borderColor: "gray",
    borderRadius: 5,
    borderWidth: 1,
    fontSize: 15,
    alignSelf: "center",
    paddingLeft: 10,
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10
  },
  assetTitle: {
    marginLeft: 20,
    fontSize: 17,
    marginTop: 20
  }

  // header: {
  //   alignSelf: "center",
  //   padding: 5
  // },
  // picker: {
  //   alignSelf: "center",
  //   width: 200,
  //   backgroundColor: "#155fd6",
  //   borderColor: "black",
  //   borderWidth: 5
  // },
  // pickerItem: {
  //   color: "blue"
  // },
  // button: {
  //   width: "80%",
  //   alignSelf: "center"
  // },
  // container: {
  //   backgroundColor: "#76e3d4",
  //   flex: 1,
  //   alignItems: "center",
  //   justifyContent: "center"
  // },
  // inputField: {
  //   height: 40,
  //   width: "91%",
  //   borderColor: "gray",
  //   borderRadius: 5,
  //   borderWidth: 1,
  //   alignSelf: "center",
  //   paddingLeft: 10,
  //   marginTop: 20
  // },
  // inputLabels: {
  //   width: "91%",
  //   alignSelf: "center",
  //   fontSize: 17
  // },
  // scrollView: {
  //   marginHorizontal: 20
  // }
});

export default LocationForm;
