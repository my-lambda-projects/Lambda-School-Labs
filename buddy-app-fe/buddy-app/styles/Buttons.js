import { StyleSheet } from "react-native";
import Colors from "./Colors.js";

const Buttons = StyleSheet.create({
  btn: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    width: 130,
    height: 40,
    borderRadius: 5
  },
  activityBtn: {
    width: "33%",
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    height: 40
  },

  editBtn: { borderColor: Colors.purple },

  text: {
    fontSize: 15,
    fontFamily: "Nunito-Regular",
    color: Colors.darkGray
  },

  textWhite: {
    fontSize: 15,
    fontFamily: "Nunito-Regular",
    color: "white"
  },

  primary: {
    backgroundColor: Colors.purple,
    color: "#FFFFFF",
    borderWidth: 1,
    borderColor: Colors.purple
  },
  secondary: {
    borderWidth: 1,
    borderColor: Colors.darkGray
  },
  textAuth: {
    fontSize: 18,
    fontFamily: "Nunito-Regular",
    color: Colors.darkGray
  },
  textPrimary: {
    color: "#FFF"
  },
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30
  },
  backButton: {
    fontSize: 20,
    fontFamily: "Nunito-Regular",
    color: Colors.darkGray
  }
});

export default Buttons;
