import * as React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  FlatList,
  Form,
  Alert
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
import CustomTabBar from "../components/CustomTabBar";

export default class EditProfile extends React.Component {
  constructor(props) {
    console.log("navPropsTest:", props);
    super(props);

    this.state = {
      image: null,
      userId: 0,
      email: "",
      username: "",
      avatar: ""
    };
  }

  // const updatedProfile = {
  //   email: this.state.email,
  //   username: this.state.username
  // };

  onLogin() {
    const { username, email } = this.state;
    Alert.alert(
      `username changed to: ${username}, and email changed to: ${email} `,
      "Look Good?",
      [
        {
          text: "Confirm changes",
          onPress: () => {
            this.updateUser();
          }
        }
      ]
    );

    // Alert.alert(
    //   "Here Are Your Changes:",
    //   `${username} + ${password}`
    //   "Press Ok to Submit"
    //    [{ text: "commit changes", onPress(updateUser)}]
    // );
  }

  getUserImage = () => {
    axios
      .get(
        `https://net-giver-asset-mngr.herokuapp.com/api/user-images/${this.state.userId}`
      )
      .then(res => {
        console.log("usertestForImage:", res.data);
        this.setState({ avatar: res.data.location });
      })
      .catch(err => {
        console.log("failed to get user:", err);
      });
  };

  updateUser = async () => {
    const updatedProfile = {
      email: this.state.email,
      username: this.state.username
    };
    axios
      .put(
        `https://net-giver-asset-mngr.herokuapp.com/api/auth/users/${this.state.userId}`,
        updatedProfile
      )
      .then(res => {
        console.log("put test:", res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  fetchUserPhoto = async () => {
    let location = "";
    try {
      location = await AsyncStorage.getItem("location");
      console.log("got the location", location);
      this.setState({ avatar: location });
    } catch (err) {
      console.log(err);
    }
    return location;
  };

  fetchUserId = () => {
    AsyncStorage.getItem("user_id")
      .then(response => {
        const user_id = JSON.parse(response);
        this.setState({ userId: user_id });
        console.log("User ID fetched! on editprofile", user_id);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    let { image } = this.state;
    let { avatar } = this.state;
    let { userId } = this.state;

    console.log("got the location", this.location);

    // console.log("anotherStateTestforavatar:", this.fetchUserPhoto());
    // console.log("anotherStateTestforuser:", userId);

    const leftBtnTxt = "Edit Profile";
    return (
      <SafeAreaView style={styles.mainWrapper}>
        <CustomTabBar leftBtn={leftBtnTxt} />
        <View style={styles.welcomeWrapper}>
          <Text style={styles.welcome}>Edit Profile</Text>
          {/* <Text style={styles.directions}>
            You're Here go On and Edit yourself!
          </Text> */}
          <Avatar
            PlaceholderContent={<ActivityIndicator />}
            source={
              avatar
                ? { uri: avatar }
                : { uri: "https://i.imgur.com/ltNMlnA.png" }
            }
            rounded
            size="xlarge"
          />
          <TouchableOpacity onPress={this.chooseImage} style={{ marginTop: 5 }}>
            {/* <Entypo name="camera" size={30} color="#3366FF" /> */}
            <Text color="#3366FF" style={{ color: "#3366FF" }}>
              Change Photo
            </Text>
          </TouchableOpacity>
          {/* <Text style={[styles.inputLabels, { fontWeight: "500" }]}>Add Photo</Text> */}
        </View>
        <Spacer />
        <View style={styles.contain}>
          <Text style={styles.inputLabels}>Username</Text>
          <TextInput
            placeholder="username"
            value={this.state.username}
            onChangeText={username => this.setState({ username })}
            // autoCorrect={false}
            style={styles.inputField}
          />
          <Text style={styles.inputLabels}>Email</Text>
          <TextInput
            placeholder="email"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
            style={styles.inputField}
          />
        </View>
        <View style={styles.btnWrapper}>
          <Button
            buttonStyle={styles.btn}
            containerStyle={styles.btnContainer}
            title="Update Profile"
            onPress={this.onLogin.bind(this)}
          />

          <Button onPress={this.getUserImage} />
        </View>
      </SafeAreaView>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
    this.fetchUserId();
    this.fetchUserPhoto();
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

    const folderLocation = Date.now();

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
      const secondField = user_id(Math.floor);
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
            console.log("post to backend test was a success!");
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
  contain: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "left",
    // backgroundColor: "green",
    width: "90%"
  },
  mainWrapper: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  welcomeWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "91%",
    marginTop: 48
  },
  step2: {
    position: "absolute",
    top: 8,
    left: 8,
    fontSize: 13
  },
  welcome: {
    fontSize: 33,
    textAlign: "center"
  },
  directions: {
    textAlign: "center",
    fontSize: 17,
    color: "#BFBFBF",
    width: "91%",
    marginBottom: 48
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
    flex: 1,
    alignContent: "center",
    justifyContent: "center"
  },
  btn: {
    width: 343,
    height: 40,
    borderRadius: 15,
    backgroundColor: "#3366FF",
    paddingBottom: 8
  },
  toLoginLink: {
    color: "#3366FF",
    paddingTop: 20,
    marginTop: 20
  },
  inputField: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderRadius: 5,
    borderWidth: 1,
    alignSelf: "center",
    paddingLeft: 10,
    marginTop: 5
  },
  inputLabels: {
    width: "91%",
    // alignSelf: "center",
    fontSize: 17,
    marginTop: 20
  }
});