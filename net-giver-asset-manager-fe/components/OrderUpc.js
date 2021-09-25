import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking
} from "react-native";

const OrderUpc = () => {
  return (
    <View>
      <TouchableOpacity
        onPress={() =>
          Linking.openURL(
            "https://www.orderbarcodes.com/serial_label_pricing.aspx"
          )
        }
      >
        <Text style={{ fontSize: 12, alignSelf: "center", marginTop: 8 }}>
          Out of UPC stickers? Order more 
          <Text style={{ color: "#3366FF"}}> here</Text>!
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default OrderUpc;
