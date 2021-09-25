import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';


class AssetsCard extends React.Component {
    render() {
        showDetails = () => {
            const id = this.props.data.id
            console.log('the asset ID', id)
            this.props.navigation.navigate("SingleAssetCard", { id });
        }

        return (
            <TouchableOpacity
                onPress={showDetails}
                style={styles.assetWrapper}>
                {/* Needs to be replaced with an image primitive component */}
                <Image
                    style={styles.imageWrapper}
                    source={require('../../assets/images/macbook100.jpg')}
                />
                <View style={styles.textWrapper}>
                    <Text style={styles.assetName}>{this.props.data.id}</Text>
                    <Text style={styles.assetName}>{this.props.data.name}</Text>
                    <Text style={styles.assetID}>Barcode # {this.props.data.barcode}</Text>
                    <Text>Category: {this.props.data.category}</Text>
                    <Text>Description: {this.props.data.description}</Text>
                    <View>
                        {this.props.data.check_in_status == true ?
                            (<View>
                                <Text>Status: Check-In</Text>
                            </View>)
                            :
                            (<View>
                                <Text>Status: Check-Out</Text>
                            </View>)
                        }
                    </View>

                </View>
            </TouchableOpacity>
        );
    }
};

const styles = StyleSheet.create({
  assetWrapper: {
    flexDirection: "row",
    marginLeft: 25
  },
  imageWrapper: {
    alignItems: "center",
    alignSelf: "center",
    width: 100,
    height: 100,
    marginLeft: 10
  },
  textWrapper: {
    flex: 3,
    marginLeft: 30,
    padding: 15,
  },
  assetName: {
    fontWeight: "bold"
  },
  assetID: {
    color: "#7C7777",
    fontStyle: "italic"
  },
  assetLocation: {
    color: "#82A0FD"
  }
});

export default withNavigation(AssetsCard);
