import axios from 'axios';
import { url } from '../constants/constants';

export const getProducts = () => {
    return axios.get(`${url}?available=true`);
};
