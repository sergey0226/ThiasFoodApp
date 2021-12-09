import axios from "axios";

export async function getRestaurants() {
    var config = {
        method: 'get',
        url: 'https://jenseninc.dk/Restaurant/api/info',
        headers: { }
    };
    try {
        const response = await axios(config);
        return response.data;
    } catch(err) {
        const response = {
            status: 'failed',
            msg: err.toString()
        };
        return response;
    }
}

export async function getMenus() {
    var config = {
        method: 'get',
        url: 'https://jenseninc.dk/Restaurant/api/info/menu',
        headers: { }
    };
    try {
        const response = await axios(config);
        return response.data;
    } catch(err) {
        const response = {
            status: 'failed',
            msg: err.toString()
        };
        return response;
    }
}