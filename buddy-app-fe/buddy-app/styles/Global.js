import { StyleSheet } from "react-native";
import Colors from "./Colors.js";

const Global = StyleSheet.create({
  logo: {
    fontSize: 35,
    color: Colors.darkGray,
    fontFamily: "Nunito-Black",
    marginBottom: -5
  },
  logoContainer: {
    borderBottomWidth: 5,
    borderBottomColor: "black"
  },
  title: {
    marginTop: "5%",
    fontSize: 30,
    color: Colors.darkGray,
    fontFamily: "Nunito-Regular"
  },
  textNormal: {
    fontSize: 25,
    color: Colors.darkGray,
    fontFamily: "Nunito-Regular"
  },
  container: {
    flex: 1,
    paddingHorizontal: 30,
    width: "100%",
    marginTop: 55,
    alignItems: "flex-start"
  },
  formContainer: {
    width: "100%",
    marginTop: 30
  },
  input: {
    borderColor: Colors.lightGray,
    borderWidth: 1,
    width: "100%",
    height: 40,
    paddingLeft: 10,
    marginTop: 20,
    fontSize: 15,
    fontFamily: "Nunito-Regular",
    borderRadius: 5
  },
  error: {
    color: "#a80000",
    fontFamily: "Nunito-Light",
    fontSize: 14
  },
  bottomNav: {
    backgroundColor: "#6d6dff",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: "11%",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0
  }
});

export default Global;
