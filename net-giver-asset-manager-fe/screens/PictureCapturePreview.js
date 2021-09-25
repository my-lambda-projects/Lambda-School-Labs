import React from 'react';
import { Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import uploadPhoto from '../utils/UploadPhoto'
import { AuthSession } from 'expo';

export default class PictureCapturePreview extends React.Component {
    // ref = null;
    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
        previewUri: undefined
    };

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }
    //------
    snap = async () => {
        if (this.camera) {
            let photo = await this.camera.takePictureAsync();
        }
    };

    setCamera = ref => {
        console.log('set ref');
        this.camera = ref;
    };

    AcceptPhoto = async () => {
        this.props.navigation.navigate('AssetsAdd');
    };

    DenyPhoto = async () => {
        this.props.navigation.navigate('Camera');
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
                        setCamera={this.setCamera}
                    >
                        <View
                            style={{
                                flex: 0.5,
                                flexDirection: 'row',
                            }}><Text style={{ color: 'white' }} h1>This is supposed to show the snapshot</Text></View>

                    </Camera>
                    <View style={{
                        flex: .3,
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: 'grey',
                        paddingLeft: 20

                    }}>
                        {/* <Text h3>Navigation Area</Text> */}
                        <Text style={{
                            backgroundColor: 'red',
                            borderRadius: 50,
                            padding: 15,
                            margin: 25,

                            alignItems: 'center',
                        }}
                            onPress={this.DenyPhoto}
                        >
                            <FontAwesome style={{
                                color: 'white', alignItems: 'center'
                            }} name="ban" size={35}
                            />
                        </Text>
                        <Text style={{
                            backgroundColor: 'green',
                            borderRadius: 50,
                            padding: 15,
                        }}
                            onPress={this.AcceptPhoto}
                        >
                            <FontAwesome style={{
                                color: 'white', alignItems: 'center'
                            }} name="check" size={35}
                            />
                        </Text>

                    </View>
                </View>
            );
        }


    }
}