import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity, Text, View, Alert } from 'react-native';
import { Input } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { userLogin } from '../aips/users';

export default function Login({ navigation }) {
    const [fUserNameChecked, setFUserNameChecked] = useState(false);
    const [fPasswordChecked, setFPasswordChecked] = useState(false);
    const [fLogin, setFLogin] = useState(false);
    const [strUserName, setStrUserName] = useState('');
    const [strPassword, setStrPassword] = useState('');

    useEffect(() => {
        setFUserNameChecked(false);
        setFPasswordChecked(false);
        setFLogin(false);
        setStrUserName('');
        setStrPassword('');
    }, []);

    // const validateEmail = (email) => {
    //     return String(email)
    //         .toLowerCase()
    //         .match(
    //             /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    //     );
    // };

    useEffect(() => {
        if(strUserName.length>4)
            setFUserNameChecked(true);
        else {
            setFUserNameChecked(false);
        }
    }, [strUserName]);
    
    useEffect(() => {
        if(strPassword.length>=8)
            setFPasswordChecked(true);
        else {
            setFPasswordChecked(false);
        }
    }, [strPassword]);

    const handleLogin = async() => {
        if(fUserNameChecked&&fPasswordChecked) {
            setFLogin(true);
            const data = await userLogin({
                username: strUserName,
                password: strPassword
            });
            setFLogin(false);
            if(data.status === 'failed') {
                Alert.alert('Login Failed.', data.msg);
            } else {
                if(data.username === strUserName)
                    navigation.push('home')
            }
        } else {
            Alert.alert('Confirm', 'All Fields are required.');
        }
    }

    if(fLogin)
        return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator color="white" />
            <Text style={{ marginLeft: 10, color: 'white', fontSize: 25 }}>{'Logging in...'}</Text>
        </View>
        );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Log In</Text>
            <Input
                value={strUserName}
                style={styles.row}
                inputStyle={{ color: 'white' }}
                errorStyle={{ color: fUserNameChecked?'pink':null }}
                onChangeText={(e)=>setStrUserName(e)}
                placeholder='Enter user name'
                leftIcon={{ type: 'font-awesome', name: 'user', color: 'white' }}
                rightIcon={fUserNameChecked?{ type: 'font-awesome', name: 'check', color: 'green' }:null}
                />
            <Input
                value={strPassword}
                style={styles.row}
                onChangeText={(e)=>setStrPassword(e)}
                inputStyle={{ color: 'white' }}
                errorStyle={{ color: fPasswordChecked?'pink':null }}
                secureTextEntry={true}
                placeholder='Enter your password'
                leftIcon={{ type: 'font-awesome', name: 'key', color: 'white' }}
                rightIcon={fPasswordChecked?{ type: 'font-awesome', name: 'check', color: 'green' }:null}
                />
            <TouchableOpacity
                activeOpacity={0.5}
                style={styles.singin}
                onPress={handleLogin}
                >
                <LinearGradient 
                    start={{ x:0, y:0 }}
                    end={{ x:1, y:0 }}
                    colors={['#b716dc', '#c51fc1', '#d428a8']} style={styles.linearGradient}>
                    <Text style={{ fontSize: 20, color: 'white' }}>Log In</Text>
                </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
                style={{ marginTop: 15 }}
                onPress={handleLogin}
                onPress={()=>navigation.push('signup')}
                >
                <Text style={{ fontSize: 16, color: 'white' }}>Don't have an account? Sign up</Text>
            </TouchableOpacity>
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
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  header:{
    fontSize: 40,
    color: 'white',
    marginBottom: 50
  },
  row: {
      marginVertical: 10
  },
  linearGradient: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems:'center',
    borderRadius: 15
  },
  singin: {
      backgroundColor: 'white',
      width: "100%",
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20
  }
});
