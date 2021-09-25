import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from 'react-native';
import axios from "axios";

const OneAsset = props => {
    console.log("ONE ASSET PROPS:", props.data.name);

    return (
        <View style={styles.assetWrapper}>
            <Image
                style={styles.img}
                source={require('../../../assets/images/camera.jpg')}
            />
            <View style={styles.textWrapper}>
                <Text style={styles.assetID}>QR #{props.data.barcode}</Text>
                <Text style={styles.assetHeader}>Name</Text>
                <Text style={styles.assetStatus}>{props.data.name}</Text>

                <Text style={styles.assetHeader}>Description</Text>
                <Text style={styles.assetStatus}>{props.data.description}</Text>

                <Text style={styles.assetHeader}>Location</Text>
                <View>
                    {props.data.check_in_status == true ?
                        (<View>
                            <Text>Checked-In</Text>
                        </View>)
                        :
                        (<View>
                            <Text>Checked-Out</Text>
                        </View>)
                    }
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    assetWrapper: {
        flexDirection: "column",
        alignItems: "center",
    },
    img: {
        alignItems: "center",
        alignSelf: "center",
        width: "95%",
        height: 200,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
    },
    textWrapper: {
        flex: 2,
        width: "95%",
        marginTop: 10,
        alignItems: "flex-start",
    },
    assetHeader: {
        fontSize: 17,
        color: "#BFBFBF",
        marginBottom: 5,
    },
    assetStatus: {
        fontSize: 14,
        marginBottom: 21,
    },
    assetID: {
        fontSize: 14,
        color: "#7C7777",
        fontStyle: "italic",
        marginBottom: 21,
    }
});

export default OneAsset;