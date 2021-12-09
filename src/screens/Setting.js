import React, { useState, useEffect } from 'react';
import { Icon, ListItem } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Setting({ cart, customF }) {
  const [carts, setCarts] = useState(null);
  const [userName, setUserName] = useState('');
  const [total, setTotal] = useState(0);

  useEffect(async()=>{
    try {
      const info = JSON.parse(await AsyncStorage.getItem('userInfo'));
      if(info&&info.username) setUserName(info.username);
    } catch(err) {
      console.log(err);
    }
  }, [])

  useEffect(() => {
    let calc = 0;
    cart.map(item=>calc += item.amount*item.itemPrice);
    setTotal(calc);
    setCarts(cart);
  }, [cart]);

  const handleButtonClick = (item, button) => {
    let temp = [];
    carts.map(item=>temp.push(item));
    switch(button) {
      case 0: 
        temp[item].amount+=1;
        break;
      case 1:
        temp[item].amount-=1;
        break;
      case 2:
        temp.splice(item, 1);
        break;
      default:
        break;
    }
    customF(temp);
  }

  const handleCreatePDF = () => {
    console.log('need to create pdf.')
  }

  return (
    <View style={styles.container}>
      <Text style={{ color: 'white', fontSize: 25 }}>Hello {userName?userName:'there'}!</Text>
      <Text style={{ color: 'white', fontSize: 20 }}>You just purchased these items.</Text>

      <View style={{ width: '100%', height: 400, padding: 10 }}>
        <ScrollView>
        {
          carts&&carts.map((l, i) => (
            <ListItem key={i} bottomDivider>
              <ListItem.Content>
                <ListItem.Title>{l.itemName}</ListItem.Title>
                <ListItem.Subtitle>{l.itemBusiness}</ListItem.Subtitle>
                <ListItem.Subtitle>$ {l.itemPrice}</ListItem.Subtitle>
                <ListItem.Subtitle>deliver within {l.itemDeliverDay} days</ListItem.Subtitle>
                <ListItem.Subtitle>{l.amount}</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.ButtonGroup
                buttons = {[
                  {element: ()=><Icon type="material-community" name="cart-plus"/>},
                  {element: ()=><Icon type="material-community" name="cart-minus" />},
                  {element: ()=><Icon type="material-community" name="cart-remove" />},
                ]} 
                onPress={(selected)=>handleButtonClick(i, selected)}
                />
            </ListItem>
          ))
        }
        </ScrollView>
      </View>
      <Text style={{ color: 'white', fontSize: 20 }}>Total Price ${total}</Text>
      <TouchableOpacity
        style={styles.checkout}
        onPress={handleCreatePDF}
        >
        <LinearGradient 
          start={{ x:0, y:0 }}
          end={{ x:1, y:0 }}
          colors={['#b716dc', '#c51fc1', '#d428a8']} style={styles.linearGradient}>
            <Text style={{ fontSize: 20, color: 'white', textAlign: 'center' }}>Report Order</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    // paddingTop: 40,
  },
  linearGradient: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems:'center',
    borderRadius: 15
  },
  checkout: {
    backgroundColor: 'white',
    width: "90%",
    height: 50, 
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20
  }
});
