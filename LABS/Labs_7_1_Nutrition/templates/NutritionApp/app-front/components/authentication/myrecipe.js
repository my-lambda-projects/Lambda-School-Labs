import React from 'react';
import { 
  StyleSheet,
  Text,
  FlatList,
  Linking,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';

//URL Holds API endpoint
const URL = 'https://www.themealdb.com/api/json/v1/1/latest.php';

export default class Myrecipe extends React.Component {
    constructor(props) {
        super(props);
    this.state = {
        isLoading: true
        }
    }

componentDidMount() {
    return fetch(URL)
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                isLoading: false,
                meals: responseJson.meals,
            });
        })
        .catch((error) => {
            console.log(error);
        });
}
    
    render() {
        if (this.state.isLoading) {
            return (
                <View style={{flex:1, paddingTop: 20}}> 
                <ActivityIndicator color = '#bc2b78'
                size = 'large'
                style = {styles.activityIndicator}/>
                
                </View>
    
            );
        } // isLoading ends

        return (
            <View style={{flex: 1, paddingTop:20}}>
                <FlatList data={this.state.meals}
                    keyExtractor={(item, index) => index}
                    renderItem={({item}) =>     
                        <View key={item.idMeal}>
                            <Image 
                            style={{width: '100%', height: 250 }}
                            source={{uri: item.strMealThumb}}
                            />
                            <Text style={styles.title}
                                onPress={() => Linking.openURL(item.strSource)}
                                >
                                {item.strMeal}
                            </Text>
                        </View>}
                />  
            </View>
        );
    }
}

const styles = StyleSheet.create({
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        height: 35,
        marginBottom: 10
    }
});
