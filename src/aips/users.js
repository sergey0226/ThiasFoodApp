import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function userLogin({username, password}) {
    let data = JSON.stringify({
        "username": username,
        "password": password
    });
      
    let config = {
        method: 'post',
        url: 'https://jenseninc.dk/Restaurant/api/login',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
    };
      
    try {
        const response = await axios(config);
        await AsyncStorage.setItem('userInfo', JSON.stringify(response.data));
        return response.data;
    } catch(err) {
        const response = {
            status: 'failed',
            msg: err.toString()
        };
        console.log(err);
        return response;
    }
};

export async function userSignUp({username, password}) {
    let data = JSON.stringify({
        "userName": username,
        "userPass": password
    });
      
    let config = {
        method: 'post',
        url: 'https://jenseninc.dk/Restaurant/api/info/newUser',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
    };
      
    try {
        const response = await axios(config);
        return response.data;
    } catch(err) {
        const response = {
            status: 'failed',
            msg: err.toString()
        };
        console.log(err);
        return response;
    }
};
