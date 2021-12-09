import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Alert, ActivityIndicator, Text, View } from 'react-native';
import { Input } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { userSignUp } from '../aips/users';

export default function Login({ navigation }) {
    const [fNameChecked, setFNameChecked] = useState(false);
    const [fPasswordChecked, setFPasswordChecked] = useState(false);
    const [fConfrimPChecked, setFConfrimPChecked] = useState(false);
    // const [fEmailChecked, setFEmailChecked] = useState(false);
    // const [fPhoneNumberChecked, setFPhoneNumberChecked] = useState(false);
    // const [strEmail, setStrEmail] = useState('');
    // const [strPhoneNumber, setStrPhoneNumber] = useState('');
    const [strName, setStrName] = useState('');
    const [strPassword, setStrPassword] = useState('');
    const [strConfirmPassword, setStrConfirmPassword] = useState('');
    const [fSignUp, setFSignUp] = useState(false);

    // const validateEmail = (email) => {
    //     return String(email)
    //         .toLowerCase()
    //         .match(
    //             /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    //     );
    // };


    // useEffect(() => {
    //     if(validateEmail(strEmail))
    //         setFEmailChecked(true);
    //     else {
    //         setFEmailChecked(false);
    //     }
    // }, [strEmail]);

    // useEffect(() => {
    //     if(!isNaN(Number(strPhoneNumber))&&strPhoneNumber.length>10&&strPhoneNumber.length<15)
    //         setFPhoneNumberChecked(true);
    //     else {
    //         setFPhoneNumberChecked(false);
    //     }
    // }, [strPhoneNumber]);
    
    useEffect(() => {
        if(strName.length>0)
            setFNameChecked(true);
        else {
            setFNameChecked(false);
        }
    }, [strName]);

    useEffect(() => {
        if(strPassword.length>=8)
            setFPasswordChecked(true);
        else {
            setFPasswordChecked(false);
        }
    }, [strPassword]);

    useEffect(() => {
        if(strPassword===strConfirmPassword&&strConfirmPassword.length>=8)
            setFConfrimPChecked(true);
        else {
            setFConfrimPChecked(false);
        }
    }, [strConfirmPassword]);
    
    const handleSignUp = async() => {
        if(fNameChecked&&fPasswordChecked&&fConfrimPChecked) {
            setFSignUp(true);
            const data = await userSignUp({
                username: strName,
                password: strPassword
            });
            setFSignUp(false);
            if(data.status === 'failed') {
                Alert.alert('SignUp Failed.', data.msg);
            } else {
                if(data.msg&&data.msg.includes(strName))
                    navigation.push('login')
            }
        } else {
            Alert.alert('Confirm', 'All Fields are required.');
        }
    }

    if(fSignUp)
        return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator color="white" />
            <Text style={{ marginLeft: 10, color: 'white', fontSize: 25 }}>{'Signing up...'}</Text>
        </View>
        );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Sign Up</Text>
            <Input
                style={styles.row}
                inputStyle={{ color: 'white' }}
                inputContainerStyle={{ borderStyle: 'solid' }}
                errorStyle={{ color: fNameChecked?'pink':null }}
                value={strName}
                onChangeText={(e)=>setStrName(e)}
                placeholder='Enter your name'
                leftIcon={{ type: 'font-awesome', name: 'user', color: 'white' }}
                rightIcon={fNameChecked?{ type: 'font-awesome', name: 'check', color: 'green' }:null}
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
            <Input
                value={strConfirmPassword}
                style={styles.row}
                onChangeText={(e)=>setStrConfirmPassword(e)}
                inputStyle={{ color: 'white' }}
                errorStyle={{ color: fConfrimPChecked?'pink':null }}
                secureTextEntry={true}
                placeholder='Confirm your password'
                leftIcon={{ type: 'material', name: 'done-all', color: 'white' }}
                rightIcon={fConfrimPChecked?{ type: 'font-awesome', name: 'check', color: 'green' }:null}
                />
                {/* <Input
                    style={styles.row}
                    inputStyle={{ color: 'white' }}
                    inputContainerStyle={{ borderStyle: 'solid' }}
                    errorStyle={{ color: fEmailChecked?'pink':null }}
                    value={strEmail}
                    onChangeText={(e)=>setStrEmail(e)}
                    placeholder='Enter your email address'
                    leftIcon={{ type: 'font-awesome', name: 'at', color: 'white' }}
                    rightIcon={fEmailChecked?{ type: 'font-awesome', name: 'check', color: 'green' }:null}
                    /> */}
                {/* <Input
                    value={strPhoneNumber}
                    style={styles.row}
                    onChangeText={(e)=>setStrPhoneNumber(e)}
                    inputStyle={{ color: 'white' }}
                    keyboardType={'phone-pad'}
                    errorStyle={{ color: fPhoneNumberChecked?'pink':null }}
                    placeholder='Enter your PhoneNumber'
                    leftIcon={{ type: 'font-awesome', name: 'mobile', color: 'white' }}
                    rightIcon={fPhoneNumberChecked?{ type: 'font-awesome', name: 'check', color: 'green' }:null}
                    /> */}
            <TouchableOpacity
                activeOpacity={0.5}
                style={styles.singin}
                onPress={handleSignUp}
                >
                <LinearGradient 
                    start={{ x:0, y:0 }}
                    end={{ x:1, y:0 }}
                    colors={['#b716dc', '#c51fc1', '#d428a8']} style={styles.linearGradient}>
                    <Text style={{ fontSize: 20, color: 'white' }}>Create Account</Text>
                </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
                style={{ marginTop: 15 }}
                onPress={()=>navigation.push('login')}
                >
                <Text style={{ fontSize: 16, color: 'white' }}>Already have an account? Sign in</Text>
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
      marginVertical: 5
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
