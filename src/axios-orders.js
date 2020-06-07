import axios from 'axios';

const instance = axios.create({
    baseURL: "Your Burger Builder Database URL in Firebase"
});

export default instance;
