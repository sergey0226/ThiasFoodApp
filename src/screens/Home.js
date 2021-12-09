import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, View, Alert, Text } from 'react-native';
import { 
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Dashboard from './Dashboard';
import Setting from './Setting';
import Menu from './Menu';

import Logo from '../../assets/Logo.png'
import { Icon } from 'react-native-elements';

const Drawer = createDrawerNavigator();

function CustomDrawer(props) {
  let username = '';
  useEffect(async() => {
    try {
      const data = await AsyncStorage.getItem('userInfo');
      if(data) username = JSON.parse(data).username;
    } catch(err) {
      console.log(err);
    }
  }, []);

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.logoContainer}>
        <Image source={Logo} style={styles.logo} resizeMode="contain" />
        <Text style={{ fontSize: 20, marginTop: 20  }}>Hello {username}</Text>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem 
        label="Log Out" 
        icon={({color})=>
          <Icon name="logout" color={color}/>
        }
        onPress={() => Alert.alert(
          'Confirm',
          'Are you sure to logout?',
          [
            {
              text: "Yes",
              onPress: async() => {
                try{
                  await AsyncStorage.removeItem('userInfo');
                  props.navigation.push('login')
                } catch(err) {
                  console.log(err);
                }
              },
              style: "cancel",
            },
            {
              text: "No",
              style: "cancel",
            },
          ])} />
    </DrawerContentScrollView>
  );
}

export default function Home({ navigation }) {
  const [myCarts, setMyCarts] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} navigation={navigation} />}
      >
      <Drawer.Screen 
        name="Restaurant" 
        options={{ 
          drawerIcon: ({color})=>{
            return <Icon name='home' color={color}/>
          }
        }}>
        {
          (props) => <Dashboard setRestaurants={setRestaurants} {...props}/>
        }
      </Drawer.Screen>
      <Drawer.Screen 
        name="Menu"  
        options={{ 
          drawerIcon: ({color})=>{
            return <Icon name='receipt' color={color}/>
          }
        }}>
          {
            (props) => <Menu restaurants={restaurants} cart={myCarts} customF={setMyCarts} {...props}/>
          }
      </Drawer.Screen>
      <Drawer.Screen 
        name="My Cart" 
        options={{ 
          drawerIcon: ({color})=>{
            return <Icon name='shopping-cart' color={color}/>
          }
        }}>
        {
          (props) => <Setting cart={myCarts} customF={setMyCarts} {...props}/>
        }
      </Drawer.Screen>
      {/* <StatusBar style="auto" /> */}
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    flex: 1,
    alignItems:'center',
    marginVertical: 20
  },
  logo: {
    width: "80%",
    height: 100
  }
});