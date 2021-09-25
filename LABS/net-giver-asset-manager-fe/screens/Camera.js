import React from "react";
import { Text, View, TouchableOpacity, SafeAreaView } from "react-native";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import uploadPhoto from "../utils/UploadPhoto";
import { AuthSession } from "expo";
import { CameraRoll } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default class CameraExample extends React.Component {
  // ref = null;
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    previewUri: undefined
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }
  //------
  snap = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
    }
  };

  setCamera = ref => {
    console.log("set ref");
    this.camera = ref;
  };

  // TakePhoto = async () => {
  //     console.log('taking photo');
  //     if (!this.camera)
  //         return;

  //     let photo = await this.camera.takePictureAsync();

  //     console.log(photo);

  //     uploadPhoto(photo).then(
  //         response => {
  //             console.log(response);
  //             this.props.navigation.navigate('Previewer', {
  //                 music: response
  //             });
  //         }
  //     );
  // };

  TakePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowEditing: false,
      exif: true
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
    CameraRoll.saveToCameraRoll(this.state.image);
  };

  ///---

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            ref={ref => {
              this.camera = ref;
            }}
            style={{ flex: 1 }}
            type={this.state.type}
            // aspect={Camera.constants.Aspect.fill}
            setCamera={this.setCamera}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row"
              }}
            ></View>

            <SafeAreaView
              style={{
                color: "white",
                alignItems: "center",
                flex: 0,
                alignItems: "center",
                // marginBottom: 95,
                justifyContent: "center",
                paddingBottom: 80,
                flexDirection: "row",
                padding: 20,
                backgroundColor: "rgba(0, 0, 0, .6)"
              }}
            >
              {/* <View style={{ justifyContent: 'flex-start' }}><Text>Touchable stuff</Text></View> */}
              <View style={{ backgroundColor: "turqoise" }}>
                <TouchableOpacity
                  style={{
                    // flex: 0.1,
                    alignSelf: "flex-start",
                    // alignItems: 'center',
                    left: -45
                  }}
                  onPress={() => {
                    this.setState({
                      type:
                        this.state.type === Camera.Constants.Type.back
                          ? Camera.Constants.Type.front
                          : Camera.Constants.Type.back
                    });
                  }}
                >
                  <Text style={{ fontSize: 18, padding: 15, color: "white" }}>
                    <FontAwesome
                      style={{
                        color: "white",
                        alignItems: "center"
                      }}
                      name="undo"
                      size={25}
                    />
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity>
                  <Text
                    style={{
                      backgroundColor: "#3366FF",
                      borderRadius: 50,
                      padding: 15,
                      left: -25
                    }}
                    // onPress={this.takePicture.bind(this)}

                    onPress={this.TakePhoto}
                  >
                    <FontAwesome
                      style={{
                        color: "white",
                        alignItems: "center"
                      }}
                      name="check"
                      size={40}
                    />
                  </Text>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </Camera>
        </View>
      );
    }
  }

  takePicture() {
    const options = {};
    this.camera
      .capture({ metadata: options })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
  }
}
