import * as React from "react";
import { Text, View, StyleSheet, Button, Image } from "react-native";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { Alert } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import BarcodeMask from "react-native-barcode-mask";
import axios from "axios";

export default class LocationScanner extends React.Component {
    state = {
        hasCameraPermission: null,
        scanned: false,
        assetBarcode: null,
        assetID: null
    };


    async componentDidMount() {
        this.getPermissionsAsync();
    }

    getPermissionsAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === "granted" });
    };

    handleBarCodeScanned = ({ type, data }) => {
        console.log("Inside HandleBarcodeScanner", data);
        this.setState({ scanned: true });
        // Alert.alert(
        //   `Bar code with type ${type} and data ${data} has been scanned!`,
        //   "time to leave",

        // );
        const { navigate } = this.props.navigation;
        // Axios call to fetch assets
        axios
            .get("https://net-giver-asset-mngr.herokuapp.com/api/assets")
            .then(response => {
                var storedAssets = response.data;
                storedAssets.map(asset => this.setState({ asset: asset.barcode }));
                // Conditional logic handling the routing -- pages aren't correct, just wanted
                // an example
                console.log("this.state.asset", this.state.asset);
                if (this.state.asset === data) {
                    this.props.navigation.navigate("AssetHistory");
                } else {
                    this.props.navigation.navigate("AssetsAdd", { data });
                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    handleBarCodeScanned2 = ({ type, data }) => {
        console.log("barcode start:", type, data);
        this.setState({ scanned: true });
        Alert.alert(
            `Bar code with type ${type} and data ${data} has been scanned!`,
            "time to leave",
            [
                {
                    text: "Check in",
                    onPress: () => {
                        this.props.navigation.navigate("AssetsAdd", { data });
                    }
                }
            ]
        );
    };

    render() {
        const { navigate } = this.props.navigation;
        const { hasCameraPermission, scanned } = this.state;

        if (hasCameraPermission === null) {
            return <Text>Requesting for camera permission</Text>;
        }
        if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        }

        return (
            <View style={styles.container}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                >
                    <BarcodeMask
                        width={300}
                        height={300}
                        transparency={0.8}
                        animatedLineColor="red"
                    />
                </BarCodeScanner>

                {scanned && (
                    <Button
                        title={"Tap to Scan Again"}
                        onPress={() => this.setState({ scanned: false })}
                    />
                )}
            </View>
        );
    }

    handleBarCodeScanned = ({ type, data }) => {
        var dataArray = [data]

        this.setState({ scanned: true });
        // Alert.alert(
        //   `Your QR Code # is ${[data]}`);

        // Axios call to fetch assets
        axios
            .get("https://net-giver-asset-mngr.herokuapp.com/api/location")
            .then(response => {
                var storedLocation = response.data;

                var barcode = storedLocation.map(function (e) {
                    return e.location_qrcode
                });

                let intersection = barcode.filter(x => dataArray.includes(x));

                var dataString2 = dataArray.toString()
                var intersectionString = intersection.toString()

                console.log("filtered: ", intersectionString)
                console.log("Scanned: ", dataString2)

                const { navigate } = this.props.navigation;
                if (intersectionString === dataString2) {
                    var correctID = storedLocation.map(function (theID) {

                        if (theID.barcode == intersectionString) {
                            console.log("Correct ID", theID.id)
                            var returnedID = theID.id

                        }
                        console.log("returned id", returnedID)
                        return returnedID;
                    });


                    var correctID2 = correctID.filter(Boolean);

                    var id = correctID2
                    console.log('ID getting sent', id)

                    navigate("SingleAssetScreen", { id });

                } else {

                    navigate("LocationScreen", { dataString2 });

                    console.log('after scanned', dataString2)
                }
            })
            .catch(error => {
                console.log(error);
            });
    };




}

const smoky = "rgba(0, 0, 0, .6)";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center"
    },
    smoky: {
        flex: 1,
        backgroundColor: smoky,
        zIndex: 0
    }
});
