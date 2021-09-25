import React, { useState, useEffect } from "react";
import { Button, Avatar } from "react-native-elements";
import axios from "axios";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  AsyncStorage,
  Alert,
  ActivityIndicator
} from "react-native";
import KeyboardShift from "../../constants/KeyboardShift";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { withNavigation } from "react-navigation";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { RNS3 } from "react-native-aws3";
import { AWS_SECRET_ACCESS_KEY, AWS_ACCESS_KEY } from "react-native-dotenv";

import * as yup from "yup";
import { Formik } from "formik";

import { Entypo } from "@expo/vector-icons";

const AssetsAdd = props => {
  //   console.log("state test:", props);
  const [userId, setUserId] = useState();
  const [image, setImage] = useState(null);
  const [imageAsset, setImageAsset] = useState({ id: "" });
  console.log("imageassettest:", imageAsset);

  // const fetchassetImgID = () => {
  //   var assetImgID = imageAsset.map(function(e) {
  //     return console.log(e.id);
  //   });
  // };


  // Fetches the logged in user's ID
  const fetchUserId = () => {
    AsyncStorage.getItem("user_id")
      .then(response => {
        const user_id = JSON.parse(response);
        setUserId(user_id);
        console.log("User ID fetched!", user_id)
      })
      .catch(error => {
        console.log(error)
      });
  };

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  useEffect(() => {
    fetchUserId();
    getPermissionAsync();
    // fetchassetImgID();
  }, []);

  const chooseImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3]
    });

    // console.log("image test:", result);

    if (!result.cancelled) {
      setImage(result.uri);
    }

    const asset_img_id = 626189;
    console.log("RNG test:", asset_img_id);

    const file = {
      uri: result.uri,
      name: "image.png",
      type: "image/png"
    };

    const options = {
      keyPrefix: `${userId}/${asset_img_id}`,
      bucket: "netgiver",
      region: "us-east-2",
      accessKey: AWS_ACCESS_KEY,
      secretKey: AWS_SECRET_ACCESS_KEY,
      successActionStatus: 201
    };
    // console.log("options test", options);

    RNS3.put(file, options).then(res => {
      if (res.status !== 201) throw new Error("Failed to upload image to S3");
      console.log("upload to aws test", res.body);
      const location = res.body.postResponse.location;
      console.log("local test:", location);
      //   const name = res.body.postResponse.key;
      // const user_id = JSON.stringify(name.replace(/\D/g, ""));
      //   const asset_id = JSON.parse(name.replace(/\D/g, ""));
      //   console.log("rename", asset_id);
      // const newerName = JSON.parse(newName);
      // console.log("herewegoagain", newerName);
      // console.log("userTest:", userId);
      const data = {
        asset_img_id,
        location
      };
      console.log("dataTest:", data);

      // console.log("nametest:", name);
      if (res.status === 201) {
        axios
          .post(
            "https://net-giver-asset-mngr.herokuapp.com/api/assets/img",
            data
          )
          .then(res => {
            console.log("post to backend test success!!!!!!!!!!!!", res.data);
            setImageAsset(res.data.id);
          })
          .catch(err => {
            console.log("that didnt work:", err.message);
          });
      }
    });
  };

  if (props.navigation.state.params) {
    var barkode = props.navigation.state.params.dataString;
  }
  console.log("Barcode Scanned", barkode);
  console.log('use id', userId)
  console.log("imageAssetID", imageAsset);
  // const redirect = () => {
  //     props.navigation.navigate("AssetsList");
  // }
  return (
    <KeyboardShift>
      <ScrollView>
        <View style={styles.assetSection}>
          <Text style={styles.activeText}>ASSET ENTRY</Text>
          <View style={styles.activeTab} />
        </View>

        {image === null ? (
          <View style={styles.photoContainer}>
            <View style={styles.photoIcon}>
              <TouchableOpacity onPress={chooseImage}>
                <Entypo name="camera" size={30} color="#3366FF" />
              </TouchableOpacity>
              <Text>Add Photo</Text>
            </View>
          </View>
        ) : (
            <Avatar
              PlaceholderContent={<ActivityIndicator />}
              source={
                image
                  ? { uri: image }
                  : { uri: "https://i.imgur.com/ltNMlnA.png" }
              }
              size="xlarge"
              containerStyle={{
                alignSelf: "center",
                width: "90%",
                marginTop: 20,
                height: 165
              }}
            />
          )}
        <Formik
          enableReinitialize
          initialValues={{
            name: "",
            description: "",
            barcode: barkode,
            check_in_status: 0,
            user_id: userId,
            pic_img_id: imageAsset
          }}
          onSubmit={values =>
            axios
              .post(
                "https://net-giver-asset-mngr.herokuapp.com/api/assets",
                values
              )
              .then(res => {
                console.log("assetAddTest:", res);
                Alert.alert(
                  "Message",
                  "Successfuly Added Item!",
                  [
                    {
                      text: "Ok",
                      onPress: () =>
                        props.navigation.navigate("Dashboard")
                    }
                  ],
                  { cancelable: false }
                );
              })
              .catch(err => {
                "Can not add";
              })
          }
          validationSchema={yup.object().shape({
            name: yup.string().required(),
            description: yup.string().required(),
            // category: yup.string().required(),
            // location_id: yup.string().required(),
            barcode: yup.string().required()
          })}
        >
          {({
            values,
            handleChange,
            errors,
            setFieldTouched,
            touched,
            isValid,
            handleSubmit
          }) => (
              <View style={styles.container}>
                {/* <KeyboardShift> */}
                <TouchableOpacity
                  style={styles.qrSection}
                  onPress={() => props.navigation.navigate("Scanner")}
                >
                  <MaterialCommunityIcons
                    style={styles.upc}
                    name="qrcode-scan"
                    size={25}
                  />
                  {!barkode ? (
                    <Text style={styles.noCode}>Scan Asset QR Code</Text>
                  ) : (
                      <Text style={styles.qrCode}>QR Code: {values.barcode}</Text>
                    )}
                </TouchableOpacity>

                <Text style={styles.assetTitle}>Name</Text>
                <TextInput
                  value={values.name}
                  onChangeText={handleChange("name")}
                  onBlur={() => setFieldTouched("name")}
                  clearButtonMode="while-editing"
                  style={styles.textInputField}
                />
                {touched.name && errors.name && (
                  <Text
                    style={{
                      fontSize: 10,
                      color: "red",
                      paddingLeft: 20,
                      marginTop: 5
                    }}
                  >
                    {errors.name}
                  </Text>
                )}

                <Text style={styles.assetTitle}>Description</Text>
                <TextInput
                  value={values.description}
                  onChangeText={handleChange("description")}
                  onBlur={() => setFieldTouched("description")}
                  clearButtonMode="while-editing"
                  style={styles.textInputField}
                />
                {touched.description && errors.description && (
                  <Text
                    style={{
                      fontSize: 10,
                      color: "red",
                      paddingLeft: 20,
                      marginTop: 5
                    }}
                  >
                    {errors.description}
                  </Text>
                )}

                <Button
                  iconRight={false}
                  title="Submit"
                  type="solid"
                  color="blue"
                  // onPress={() => {
                  //   image !== null
                  //     ? { handleSubmit }
                  //     : alert("Please Include a Photo");
                  // }}
                  onPress={handleSubmit}
                  buttonStyle={styles.button}
                />

                {/* </KeyboardShift> */}
              </View>
            )}
        </Formik>
      </ScrollView>
    </KeyboardShift>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  button: {
    width: "90%",
    alignSelf: "center",
    marginTop: 32,
    borderRadius: 20
  },
  qrSection: {
    flexDirection: "row",
    justifyContent: "center"
  },
  upc: {
    marginBottom: -20,
    marginTop: 20
  },
  noCode: {
    marginLeft: 8,
    marginTop: 25,
    color: "#3366FF"
  },
  qrCode: {
    marginLeft: 8,
    marginTop: 25,
    color: "#BFBFBF",
    fontStyle: "italic"
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
  activeText: {
    color: "#3366FF",
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
    alignSelf: "center",
    flexDirection: "column",
    justifyContent: "center",
    width: "50%"
  },
  activeTab: {
    width: "50%",
    height: 1,
    position: "absolute",
    bottom: 0,
    backgroundColor: "#3366FF"
  },
  assetSection: {
    flexDirection: "row",
    color: "white",
    backgroundColor: "#EFEFF4",
    height: 50,
    width: "100%"
  },
  photoContainer: {
    backgroundColor: "#EFEFF4",
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    height: 165
  },
  photoIcon: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  assetTitle: {
    marginLeft: 20,
    fontSize: 15,
    marginTop: 20
  }
});

export default withNavigation(AssetsAdd);
