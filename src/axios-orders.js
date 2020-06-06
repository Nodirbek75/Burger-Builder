import axios from 'axios';

const instance = axios.create({
    baseURL: "https://burger-builder-c2f9c.firebaseio.com/"
});

export default instance;