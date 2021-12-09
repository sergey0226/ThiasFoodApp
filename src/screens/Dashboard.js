import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, Image, View, ScrollView, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { getRestaurants } from '../aips/restaurants'
import { Ionicons } from '@expo/vector-icons';

export default function Dashboard(props) {

  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(async() => {
    setLoading(true);
    const data = await getRestaurants();
    setLoading(false);
    if(data.status === 'failed') {
      Alert.alert('Server Error', data.msg);
    } else {
      setRestaurants(data);
      let temp = [];
      data.map(item=>temp.push(item.businessname));
      props.setRestaurants(temp);
    }
  }, []);

  if(loading)
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color="white" />
        <Text style={{ marginLeft: 10, color: 'white', fontSize: 25 }}>{'Loading...'}</Text>
      </View>
    );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        {
          restaurants.length>0?restaurants.map(item=>{
            // console.log(item.image)
            return (
              <View style={styles.cardContainer} key={item.id}>
                {/* <View style={styles.row}> */}
                <Text style={{ color: 'white', fontSize: 25, textAlign: 'center', textTransform: 'capitalize', marginVertical: 20 }}>{item.businessname}</Text>
                {/* </View> */}
                <Image resizeMode="stretch" style={{ width: '100%', height: 200 }} source={{ uri: item.image }}/>
                <View style={styles.row}>
                  <Ionicons name="ios-location" size={20} color="white" />
                  <Text style={{ marginLeft: 10, color: 'white', fontSize: 20, textTransform: 'lowercase' }}>{item.location}</Text>
                </View>
                <View style={styles.row}>
                  <Ionicons name="phone-portrait" size={20} color="white" />
                  <Text style={{ marginLeft: 10, color: 'white', fontSize: 20 }}>{item.phone}</Text>
                </View>
                <View style={styles.row}>
                  <Ionicons name="ios-home" size={20} color="white" />
                  <Text style={{ marginLeft: 10, color: 'white', fontSize: 20, flexWrap: 'wrap' }}>{item.address.length>30?(item.address.slice(0, 30)+'...'):item.addresss}</Text>
                </View>
                <TouchableOpacity 
                  style={styles.visitButton}
                  onPress={()=>{props.navigation.navigate('Menu', {business: item.businessname})}}
                  >
                  <Text style={{ marginLeft: 10, color: 'white', fontSize: 20, textAlign: 'center' }}>{'VISIT'}</Text>
                </TouchableOpacity>
              </View>
            )
          }):
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: 'white', fontSize: 25 }}>{'No Restaurant available.'}</Text>
          </View>
        }
        <View style={{ height: 50 }}/>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 30
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 30
  },
  cardContainer: {
    flex: 1,
    backgroundColor: 'darkgrey',
    margin: 10,
    paddingHorizontal: 10,
    borderRadius: 5
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 5
  },
  visitButton: {
    flex: 1,
    width: '100%',
    marginVertical: 10,
    borderRadius: 5,
    paddingVertical: 5,
    backgroundColor: 'green'
  }
});
