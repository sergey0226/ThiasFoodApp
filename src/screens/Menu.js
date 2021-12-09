import React, { useState, useEffect } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, Alert } from 'react-native';
import { Overlay, Button, Input, Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { getMenus } from '../aips/restaurants';

export default function Menu({ cart, customF, restaurants, route }) {
  const imgWidth = Dimensions.get('window').width;
  const [visible, setVisible] = useState(false);
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(false);
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState(0);
  const [itemDeliverDay, setItemDeliverDay] = useState(0);
  const [items, setItems] = useState(0);


  useEffect(async() => {
    console.log(restaurants, route);
    try{
      setLoading(true);
      const data = await getMenus();
      setLoading(false);
      if(data.status === 'failed') {
        Alert.alert('Server Error', data.msg);
      } else {
        setMenus(data);
      }
    } catch(err) {
      console.log(err);
    }
  }, []);

  const toggleOverlay = () => {
    setItems(0);
    setItemDeliverDay(0);
    setItemPrice(0);
    setVisible(!visible);
  };

  const handleAddCart = () => {
    if(items === 0) {
      Alert.alert('Warning', 'Amount must bigger than 0');
      return;
    }
    try {
      let temp= [], itemBusiness = route.params&&route.params.business?route.params.business:restaurants[0];
      cart.map(item=>{
        if(item.itemName !== itemName || (item.itemBusiness !== itemBusiness) )
          temp.push(item);
      });
      temp.push({
        itemBusiness: route.params&&route.params.business?route.params.business:restaurants[0],
        itemName: itemName,
        itemPrice: itemPrice!==0?itemPrice: 1,
        itemDeliverDay: itemDeliverDay!==0?itemDeliverDay: 1,
        amount: items
      });
      customF(temp);
    } catch (err) {
      console.log(err);
    }
    setVisible(false);
  }

  if(loading)
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color="white" />
        <Text style={{ marginLeft: 10, color: 'white', fontSize: 25 }}>{'Loading...'}</Text>
      </View>
    );

  return (
    <View style={{ backgroundColor: 'black' }}>
      <Text style={{ marginVertical: 10, textTransform: 'capitalize', color: 'white', textAlign: 'center', paddingTop: 40, fontSize: 25 }}>{route.params&&route.params.business?route.params.business:restaurants[0]}</Text>
      <ScrollView contentContainerStyle={{ width: '100%', backgroundColor: 'darkgrey', paddingTop: 20, alignItems: 'center' }}>
        {
          menus.map((item, index)=>{
            return (
              <View key={index} style={{ width: '95%', backgroundColor: 'black', borderRadius: 10, alignItems: 'center', marginVertical: 10 }} key={index}>
                {/* {item.images.length&&
                  <View style={{ height: 250, margin: 10 }}> */}
                    <ScrollView
                      horizontal
                      pagingEnabled>
                      {/* {
                        item.images.map((image, idex) => {
                          return ( */}
                            <Image 
                              // key={idex}
                              resizeMode="stretch" 
                              style={{ 
                                margin: imgWidth*0.05, 
                                width: imgWidth*0.8, 
                                height: 250 
                              }} 
                              source={{ uri: item.images[0] }}/>
                            <Image 
                              // key={idex}
                              resizeMode="stretch" 
                              style={{ 
                                margin: imgWidth*0.05, 
                                width: imgWidth*0.8, 
                                height: 250 
                              }} 
                              source={{ uri: item.images[1] }}/>
                            <Image 
                              // key={idex}
                              resizeMode="stretch" 
                              style={{ 
                                margin: imgWidth*0.05, 
                                width: imgWidth*0.8, 
                                height: 250 
                              }} 
                              source={{ uri: item.images[2] }}/>
                          {/* )
                        })
                      } */}
                    </ScrollView>
                  {/* </View>
                } */}
                <Text style={{ marginVertical: 10, color: 'white', fontSize: 25 }}>{item.menuname}</Text>
                <View style={{ height: 150, paddingHorizontal: 10 }}>
                  <ScrollView>
                    <Text style={{ marginVertical: 10, color: 'white', fontSize: 20 }}>{item.description}</Text>
                  </ScrollView>
                </View>
                <TouchableOpacity
                  style={styles.addcart}
                  onPress={()=>{
                    setItemName(item.menuname); 
                    toggleOverlay();
                  }}
                  >
                  <LinearGradient 
                    start={{ x:0, y:0 }}
                    end={{ x:1, y:0 }}
                    colors={['#b716dc', '#c51fc1', '#d428a8']} style={styles.linearGradient}>
                      <Text style={{ fontSize: 20, color: 'white', textAlign: 'center' }}>Add to Cart</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            )
          })
        }
        <View style={{ height: 100 }} />
      </ScrollView>
      <Overlay 
        isVisible={visible}
        onBackdropPress={toggleOverlay}>
          <View style={{ width: imgWidth*0.8 }}>
            <Text style={{ fontSize: 20, textAlign: 'center', marginVertical: 10 }}>Add to cart</Text>
            <Input 
              inputStyle={{ textAlign: 'right', marginRight: 10 }}
              value={items.toString()}
              label="Item Amount"
              onChangeText={(e)=>{if(!isNaN(Number(e)))setItems(Number(e))}}
              keyboardType="number-pad"
              rightIcon={()=>{if(Number(items)>0) return <Icon name="check" />}}
              />
            <Input 
              inputStyle={{ textAlign: 'right', marginRight: 10 }}
              value={itemPrice.toString()}
              onChangeText={(e)=>{if(!isNaN(Number(e)))setItemPrice(Number(e))}}
              label="Item Price"
              keyboardType="number-pad"
              rightIcon={()=>{if(Number(itemPrice)>0) return <Icon name="check" />}}
              />
            <Input 
              inputStyle={{ textAlign: 'right', marginRight: 10 }}
              value={itemDeliverDay.toString()}
              onChangeText={(e)=>{if(!isNaN(Number(e)))setItemDeliverDay(Number(e))}}
              label="Item Max DeliveryDay"
              keyboardType="number-pad"
              rightIcon={()=>{if(Number(itemDeliverDay)>0) return <Icon name="check" />}}
              />
            <Button
              icon={{
                type: "material-community",
                name: "cart-plus",
                size: 20,
                color: "white"
              }}
              title="Add to cart"
              onPress={handleAddCart}
            />
          </View>
      </Overlay>

    </View>
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
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    // paddingTop: 40,
    justifyContent: 'center',
  },
  linearGradient: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems:'center',
    borderRadius: 15
  },
  addcart: {
    backgroundColor: 'white',
    width: "90%",
    height: 50, 
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20
  }
});
