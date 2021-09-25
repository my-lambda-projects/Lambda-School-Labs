import React from "react";
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Platform
} from "react-native";
import { Icon } from "react-native-elements";
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
  screenProps
} from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import { Provider as AuthProvider } from "../context/AuthContext";
import { Provider as LocationProvider } from "../context/LocationContext";
import { setNavigator } from "../navigationRef";
import RegisterNameText from "../screens/Register";
import LoginText from "../screens/LoginText";
import AssetHistory from "../screens/AssetHistory";
import Landing from "../screens/Landing";
import BarcodeScanner from "../screens/BarcodeScanner";
import HomeScreen from "../screens/HomeScreen";
import AssetsAdd from "../screens/assets/AssetsAdd";
import LocationForm from "../screens/LocationForm";
import Camera from "../screens/Camera";
import Previewer from "../screens/PictureCapturePreview";
import AssetsList from "../screens/assets/AssetsList";
import getImage from "../screens/getImage";
import ImageUpload from "../screens/ImageUpload";
import Splash from "../screens/Splash";
import CustomDrawer from "../components/CustomDrawer";
import SingleAssetCard from "../screens/assets/singleAsset/SingleAssetCard";
import AssetsCard from "../screens/assets/AssetsCard";
import Cameron from "../screens/Cameron";
import Contact from "../screens/Contact";
import Legal from "../screens/Legal";
import About from "../screens/About";
import TextMsg from "../screens/TextMsg";
import SmsLogin from "../screens/SmsLogin";
import EditProfile from "../screens/EditProfile";
import OneAsset from "../screens/assets/singleAsset/OneAsset";
import SignOut from "../screens/SignOut";
import Hidden from "../components/Hidden";

console.disableYellowBox = true;

const DevStack = createStackNavigator(
  {
    Home: HomeScreen,
    AssetsAdd: AssetsAdd,
    BarcodeScanner: BarcodeScanner,
    Location: LocationForm,
    AssetHistory: AssetHistory,
    AssetList: AssetsList,
    Camera: Camera,
    Previewer: Previewer,
    Avatar: getImage,
    Upload: ImageUpload,
    AssetsCard: AssetsCard,
    Ipick: Cameron,
    Contact: Contact,
    Legal: Legal,
    About: About,
    Text: TextMsg,
    SmsLogin: SmsLogin,
    EditP: EditProfile,
    SignOut: SignOut,
    // SingleAssetCard: SingleAssetCard,
    // OneAsset: OneAsset,
    SingleAssetCard: SingleAssetCard,
    OneAsset: OneAsset
  },
  {
    initialRouteName: "Home"
  }
);

const DashboardScreen = createStackNavigator({
  DashboardScreen: {
    screen: AssetHistory,
    navigationOptions: props => ({
      title: "Simple Asset Tracker",
      headerStyle: {
        backgroundColor: "#EFEFF4"
      },
      headerTitleStyle: {
        color: "black",
        fontSize: 20,
        fontWeight: "500"
      },
      headerRight: (
        <SafeAreaView>
          <View style={{ marginRight: 10 }}>
            <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
              <Icon name="menu" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      )
    })
  }
});

const SingleAssetScreen = createStackNavigator({
  SingleAssetScreen: {
    screen: SingleAssetCard,
    navigationOptions: props => ({
      title: "Simple Asset Tracker",
      headerStyle: {
        backgroundColor: "#EFEFF4"
      },
      headerTitleStyle: {
        color: "black",
        fontSize: 20,
        fontWeight: "500",
      },
      headerRight: (
        <SafeAreaView>
          <View style={{ marginRight: 10 }}>
            <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
              <Icon name="menu" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      ),
      headerLeft: (
        <SafeAreaView>
          <View style={{ marginLeft: 10 }}>
            <TouchableOpacity onPress={() => props.navigation.navigate("Dashboard")}>
              <Icon name="arrow-back" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      )
    })
  }
});

const ScannerScreen = createStackNavigator({
  DashboardScreen: {
    screen: BarcodeScanner,
    navigationOptions: props => ({
      title: "Asset Scanner",
      headerTitleStyle: {
        color: "white"
      },
      headerTransparent: true,
      headerRight: (
        <SafeAreaView>
          <View style={{ marginRight: 10 }}>
            <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
              <Icon name="menu" size={30} color="white" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      ),
      headerLeft: (
        <SafeAreaView>
          <View style={{ marginLeft: 10 }}>
            <TouchableOpacity onPress={() => props.navigation.goBack(null)}>
              <Icon name="arrow-back" size={30} color="white" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      )
    })
  }
});

// const LocationScannerStack = createStackNavigator({
//   DashboardScreen: {
//     screen: LocationScanner,
//     navigationOptions: props => ({
//       title: "Location Scanner",
//       headerTitleStyle: {
//         color: "white"
//       },
//       headerTransparent: true,
//       headerRight: (
//         <SafeAreaView>
//           <View style={{ marginRight: 10 }}>
//             <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
//               <Icon name="menu" size={30} color="white" />
//             </TouchableOpacity>
//           </View>
//         </SafeAreaView>
//       ),
//       headerLeft: (
//         <SafeAreaView>
//           <View style={{ marginLeft: 10 }}>
//             <TouchableOpacity onPress={() => props.navigation.goBack(null)}>
//               <Icon name="arrow-back" size={30} color="white" />
//             </TouchableOpacity>
//           </View>
//         </SafeAreaView>
//       )
//     })
//   }
// });


const AssetsScreen = createStackNavigator({
  DashboardScreen: {
    screen: AssetsList,
    navigationOptions: props => ({
      title: "Simple Asset Tracker",
      headerStyle: {
        backgroundColor: "#EFEFF4"
      },
      headerTitleStyle: {
        color: "black",
        fontSize: 20,
        fontWeight: "500"
      },
      headerRight: (
        <SafeAreaView>
          <View style={{ marginRight: 10 }}>
            <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
              <Icon name="menu" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      ),
      headerLeft: (
        <SafeAreaView>
          <View style={{ marginLeft: 10 }}>
            <TouchableOpacity onPress={() => props.navigation.goBack(null)}>
              <Icon name="arrow-back" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      )
    })
  }
});

const AssetsAddScreen = createStackNavigator({
  AssetsAddScreen: {
    screen: AssetsAdd,
    navigationOptions: props => ({
      title: "Simple Asset Tracker",
      headerStyle: {
        backgroundColor: "#EFEFF4"
      },
      headerTitleStyle: {
        color: "black",
        fontSize: 20,
        fontWeight: "500"
      },
      headerRight: (
        <SafeAreaView>
          <View style={{ marginRight: 10 }}>
            <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
              <Icon name="menu" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      ),
      headerLeft: (
        <SafeAreaView>
          <View style={{ marginLeft: 10 }}>
            <TouchableOpacity onPress={() => props.navigation.goBack(null)}>
              <Icon name="arrow-back" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      )
    })
  }
});

const LocationScreen = createStackNavigator({
  DashboardScreen: {
    screen: LocationForm,
    navigationOptions: props => ({
      title: "Simple Asset Tracker",
      headerStyle: {
        backgroundColor: "#EFEFF4"
      },
      headerTitleStyle: {
        color: "black",
        fontSize: 20,
        fontWeight: "500"
      },
      headerRight: (
        <SafeAreaView>
          <View style={{ marginRight: 10 }}>
            <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
              <Icon name="menu" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      ),
      headerLeft: (
        <SafeAreaView>
          <View style={{ marginLeft: 10 }}>
            <TouchableOpacity onPress={() => props.navigation.goBack(null)}>
              <Icon name="arrow-back" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      )
    })
  }
});

const EditProfileScreen = createStackNavigator({
  EditProfileScreen: {
    screen: EditProfile,
    navigationOptions: props => ({
      title: "Simple Asset Tracker",
      headerStyle: {
        backgroundColor: "#EFEFF4"
      },
      headerTitleStyle: {
        color: "black",
        fontSize: 20,
        fontWeight: "500"
      },
      headerRight: (
        <SafeAreaView>
          <View style={{ marginRight: 10 }}>
            <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
              <Icon name="menu" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      ),
      headerLeft: (
        <SafeAreaView>
          <View style={{ marginLeft: 10 }}>
            <TouchableOpacity onPress={() => props.navigation.goBack(null)}>
              <Icon name="arrow-back" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      )
    })
  }
});

const SignOutScreen = createStackNavigator({
  SignOutScreen: {
    screen: SignOut,
    navigationOptions: props => ({
      title: "Simple Asset Tracker",
      headerStyle: {
        backgroundColor: "#EFEFF4"
      },
      headerTitleStyle: {
        color: "black",
        fontSize: 20,
        fontWeight: "500"
      },
      headerRight: (
        <SafeAreaView>
          <View style={{ marginRight: 10 }}>
            <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
              <Icon name="menu" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      ),
      headerLeft: (
        <SafeAreaView>
          <View style={{ marginLeft: 10 }}>
            <TouchableOpacity onPress={() => props.navigation.goBack(null)}>
              <Icon name="arrow-back" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      )
    })
  }
});

const AppStack = createDrawerNavigator(
  {
    Dashboard: {
      screen: DashboardScreen
    },
    Scanner: {
      screen: ScannerScreen
    },
    // If drawer label is hidden, we wanted to keep the
    // screen in the navigator but hide in the drawer
    SingleAssetDrawer: {
      screen: SingleAssetScreen,
      navigationOptions: {
        drawerLabel: <Hidden />
      },
    },
    AssetsCardDrawer: {
      screen: AssetsCard,
      navigationOptions: {
        drawerLabel: <Hidden />
      },
    },
    AssetsAdd: {
      screen: AssetsAddScreen,
      navigationOptions: {
        drawerLabel: <Hidden />
      },
    },
    Location: {
      screen: LocationScreen,
      navigationOptions: {
        drawerLabel: <Hidden />
      },
    },
    EditProfile: {
      screen: EditProfileScreen,
      navigationOptions: {
        title: "Edit Profile"
      },
    },
    SignOut: {
      screen: SignOutScreen,
      navigationOptions: {
        title: "Sign Out"
      }
    },
  },
  {
    contentComponent: CustomDrawer,
    drawerPosition: "right",
    contentOption: {
      activeTintColor: "grey"
    }
  }
);

const AuthStack = createStackNavigator(
  {
    Landing: {
      screen: Landing,
      navigationOptions: props => ({
        headerStyle: {
          borderBottomWidth: 0,
          ...Platform.select({
            android: {
              elevation: 0,
              shadowColor: "transparent",
              opacity: 0
            }
          })
        }
      })
    },
    SMS: {
      screen: SmsLogin,
      navigationOptions: props => ({
        title: "Sign In",
        headerStyle: {
          backgroundColor: "#FEFEFE"
        },
        headerTitleStyle: {
          color: "black",
          fontSize: 20,
          fontWeight: "500"
        },
        headerLeft: (
          <SafeAreaView>
            <View style={{ marginLeft: 10 }}>
              <TouchableOpacity onPress={() => props.navigation.goBack(null)}>
                <Icon name="arrow-back" size={30} color="black" />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        )
      })
    },
    Login: {
      screen: LoginText,
      navigationOptions: props => ({
        title: "Sign In",
        headerStyle: {
          backgroundColor: "#FEFEFE"
        },
        headerTitleStyle: {
          color: "black",
          fontSize: 20,
          fontWeight: "500"
        },
        headerLeft: (
          <SafeAreaView>
            <View style={{ marginLeft: 10 }}>
              <TouchableOpacity onPress={() => props.navigation.goBack(null)}>
                <Icon name="arrow-back" size={30} color="black" />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        )
      })
    },
    Register: {
      screen: RegisterNameText,
      navigationOptions: props => ({
        title: "Create Account",
        headerStyle: {
          backgroundColor: "#FEFEFE"
        },
        headerTitleStyle: {
          color: "black",
          fontSize: 20,
          fontWeight: "500"
        },
        headerLeft: (
          <SafeAreaView>
            <View style={{ marginLeft: 10 }}>
              <TouchableOpacity onPress={() => props.navigation.goBack(null)}>
                <Icon name="arrow-back" size={30} color="black" />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        )
      })
    },
    Cameron: {
      screen: Cameron,
      navigationOptions: props => ({
        title: "Create Account",
        headerStyle: {
          backgroundColor: "#FEFEFE"
        },
        headerTitleStyle: {
          color: "black",
          fontSize: 20,
          fontWeight: "500"
        },
        headerLeft: (
          <SafeAreaView>
            <View style={{ marginLeft: 10 }}>
              <TouchableOpacity onPress={() => props.navigation.goBack(null)}>
                <Icon name="arrow-back" size={30} color="black" />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        )
      })
    }
  },
  {
    initialRouteName: "Landing"
  }
);

const RootNavigation = createSwitchNavigator(
  {
    Splash: {
      screen: Splash
    },
    App: {
      screen: AppStack
    },
    Auth: {
      screen: AuthStack
    },
    Dev: {
      screen: DevStack
    }
  },
  {
    initialRouteName: "Splash"
  }
);

const AppContainer = createAppContainer(RootNavigation);

export default () => {
  return (
    <AuthProvider>
      <LocationProvider>
        <AppContainer
          ref={navigator => {
            setNavigator(navigator);
          }}
        />
      </LocationProvider>
    </AuthProvider>
  );
};
