// import React, { useState, useEffect } from "react";
// import {
//   Text,
//   View,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity
// } from "react-native";
// import { Button, Image, Avatar } from "react-native-elements";
// import axios from "axios";
// import { ActivityIndicator } from "react-native";
// import Spacer from "../components/Spacer";
// import { RNS3 } from "react-native-aws3";

// const avatarPicture = ({ navigation }) => {
//   const [photo, setPhoto] = useState("");

//   return (
//     <View style={styles.container}>
//       <Spacer />
//       <Text>I'm a user profile form</Text>
//       <Spacer />

//       {/* <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
//         <Avatar
//           rounded
//           showEditButton
//           source={{
//             uri: "https://i.imgur.com/ltNMlnA.png"
//           }}
//           style={{ width: 200, height: 200 }}
//           PlaceholderContent={<ActivityIndicator />}
//         />
//       </TouchableOpacity> */}
//       <Avatar
//         rounded
//         showEditButton
//         source={{
//           uri: "https://i.imgur.com/ltNMlnA.png"
//         }}
//         onPress={() => navigation.navigate("Camera")}
//         size="xlarge"
//         // style={{ width: 200, height: 200 }}
//         PlaceholderContent={<ActivityIndicator />}
//       />
//       <Spacer />
//       <Text>Please Take or add an Avatar Photo</Text>

//       <TextInput
//         style={styles.inputField}
//         placeholder="email"
//         // onChangeText={e => setPhoto(e.target.value)}
//       />
//       <TextInput style={styles.inputField} placeholder="username" />
//       <Spacer />
//       <Button title="Submit Profile" />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   inputField: {
//     height: 40,
//     width: "91%",
//     borderColor: "gray",
//     borderRadius: 5,
//     borderWidth: 1,
//     alignSelf: "center",
//     paddingLeft: 10,
//     marginTop: 20
//   },
//   imageLoc: {
//     alignSelf: "center"
//   },
//   container: {
//     justifyContent: "center",
//     alignItems: "center"
//   }
// });

// export default avatarPicture;

//  source={{ uri: "https://i.imgur.com/ltNMlnA.png" }}

import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import axios from "axios";
// import AuthContext from "../context/AuthContext";

const getImage = () => {
  const [photo, setPhoto] = useState([]);
  // const username = useContext(AuthContext);
  // console.log("testContext:", username);

  // useEffect(() => {
  //   axios
  //     .get("https://netgiver.s3.us-east-2.amazonaws.com/Jim22/image.png")
  //     .then(res => {
  //       console.log("axios test:", res.data);
  //       setPhoto(res.data);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }, []);

  return (
    <View>
      <Text>Username Form</Text>

      {/* {photo && (
        <Image
          style={styles.image}
          source={{
            uri: "https://netgiver.s3.us-east-2.amazonaws.com/Jim22/image.png"
          }}
          style={{ width: 300, height: 300 }}
        />
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    borderColor: "red",
    borderWidth: 10
  }
});

export default getImage;
