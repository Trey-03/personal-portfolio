
import axios from 'axios';

const API = axios.create({
    baseURL: 'https://portfoliobackend-1-9p28.onrender.com/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default API;
