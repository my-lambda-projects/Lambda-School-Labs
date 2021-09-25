import * as React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  FlatList
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { RNS3 } from "react-native-aws3";
import { ActivityIndicator } from "react-native";
import { Button, Image, Avatar, Text } from "react-native-elements";
import { AWS_SECRET_ACCESS_KEY, AWS_ACCESS_KEY } from "react-native-dotenv";
import Spacer from "../components/Spacer";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import NavLink from "../navigation/NavLink";
// import { UsernameContext } from "../context/UsernameContext";
// import { useContext } from "react";
// import { username } from "../context/AuthContext";
// import AuthContext from "../context/AuthContext";

export default class Cameron extends React.Component {
  constructor(props) {
    super(props);
    // console.log("cameron:", props);
    this.state = {
      image: null,
      userName: "",
      name: "",
      userId: 0,
      avatar: ""
    };
  }

  // getUserImage = () => {
  //   axios
  //     .get(
  //       `https://net-giver-asset-mngr.herokuapp.com/api/user-images/${this.state.userId}`
  //     )
  //     .then(res => {
  //       console.log("usertestForImage:", res.data);
  //       this.setState({ avatar: res.data.location });
  //     })
  //     .catch(err => {
  //       console.log("failed to get user:", err);
  //     });
  // };

  fetchUserId = () => {
    AsyncStorage.getItem("user_id")
      .then(response => {
        const user_id = JSON.parse(response);
        this.setState({ userId: user_id });
        console.log("User ID fetched! on cameron", user_id);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    let { image } = this.state;
    let { avatar } = this.state;
    let { userId } = this.state;

    console.log("anotherStateTestforavatar:", avatar);
    console.log("anotherStateTestforuser:", userId);

    return (
      <SafeAreaView style={styles.mainWrapper}>
        <Text style={styles.step2}>Step 2 of 2</Text>
        <View style={styles.welcomeWrapper}>
          <Text style={styles.welcome}>Welcome!</Text>
          <Text style={styles.directions}>
            You're almost there. The final step is to add your picture to
            complete your profile.
          </Text>
          {/* {!userId ? (
            <Avatar
              PlaceholderContent={<ActivityIndicator />}
              source={
                image
                  ? { uri: image }
                  : { uri: "https://i.imgur.com/ltNMlnA.png" }
              }
              rounded
              size="xlarge"
            />
          ) : (
            <Avatar
              PlaceholderContent={<ActivityIndicator />}
              source={avatar}
              rounded
              size="xlarge"
            />
          )} */}

          <Avatar
            PlaceholderContent={<ActivityIndicator />}
            source={
              image
                ? { uri: image }
                : { uri: "https://i.imgur.com/ltNMlnA.png" }
            }
            rounded
            size="xlarge"
          />

          <TouchableOpacity onPress={this.chooseImage} style={{ marginTop: 5 }}>
            <Entypo name="camera" size={30} color="#3366FF" />
          </TouchableOpacity>
          <Text style={{ fontWeight: "500" }}>Add Photo</Text>
        </View>
        <View style={styles.btnWrapper}>
          <Button
            buttonStyle={styles.btn}
            // containerStyle={styles.btnContainer}
            title="Next"
            onPress={() => this.props.navigation.navigate("Dashboard")}
          />
          {/* <NavLink
            text="Already have an account? Log in here."
            route="Login"
            style={styles.toLoginLink}
          /> */}
        </View>
      </SafeAreaView>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
    this.fetchUserId();
    // this.getUserImage();
  }

  componentDidUpdate(avatar) {
    if (avatar === null) {
      this.getUserImage();
      // this.setState();
    }
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  chooseImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3]
    });

    // console.log("image test:", result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }

    const file = {
      uri: result.uri,
      name: "image.png",
      type: "image/png"
    };

    const options = {
      keyPrefix: `${this.state.userId}/`,
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
      // console.log("local test:", location);
      const name = res.body.postResponse.key;
      // const user_id = JSON.stringify(name.replace(/\D/g, ""));
      const user_id = JSON.parse(name.replace(/\D/g, ""));
      // console.log("rename", user_id);
      // const newerName = JSON.parse(newName);
      // console.log("herewegoagain", newerName);
      const data = {
        // user_id,
        user_id,
        location
      };
      console.log("dataTest:", data);

      // console.log("nametest:", name);
      if (res.status === 201) {
        axios
          .post(
            "https://net-giver-asset-mngr.herokuapp.com/api/user-images",
            data
          )
          .then(res => {
            console.log("post to backend test was a success!", res.data);
            AsyncStorage.setItem("location", res.data.location);

            // fixed this stuff

            // console.log("asynchTest:", res.data.locataion);
            // console.log("post to backend test was a success!", res);
            // res
            //   .status(201)
            //   .json({ message: "congraulations post is a success" });
          })
          .catch(err => {
            console.log("that didnt work", err.data);
          });
      }
    });
  };
}
//

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1
  },
  welcomeWrapper: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // width: "91%",
    marginTop: 48
  },
  step2: {
    marginTop: 10,
    marginLeft: 20,
    fontSize: 13,
    fontWeight: "500"
  },
  welcome: {
    fontSize: 33,
    textAlign: "center",
    marginBottom: 10
  },
  directions: {
    textAlign: "center",
    fontSize: 17,
    color: "#BFBFBF",
    width: "91%",
    marginBottom: 50
  },
  avatarWrapper: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  label: {
    fontSize: 16
  },
  btnWrapper: {
    // flex: 1,
    marginTop: 100,
    alignContent: "center",
    justifyContent: "center"
  },
  btn: {
    height: 40,
    borderRadius: 20,
    backgroundColor: "#3366FF",
    paddingBottom: 8,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    marginLeft: 20,
    marginRight: 20
  }
  // toLoginLink: {
  //   color: "#3366FF",
  //   paddingTop: 20,
  //   marginTop: 20
  // }
});

// ({
//   method: "post",
//   url: "https://net-giver-asset-mngr.herokuapp.com/api/user-images",
//   headers: {
//     "Content-Type": "application/x-www-form-urlencoded",
//     Accept: "application/json"
//   },
//   data
// });
