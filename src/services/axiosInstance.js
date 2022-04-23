import axios from 'axios';

const axiosInstance = axios.create({
    // baseURL: 'http://localhost:5000/',
    baseURL: 'https://caliper-assignment.herokuapp.com/',
});

export default axiosInstance;
