import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

export const BASE_URL = 'https://pixabay.com/api/';
export const API_KEY = '28057343-75b2b1ade1dfa3d34d67b38a0';
 
export const api = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
  },
});

export const getImages = async params => {
  try {
    const { data } = await api.get('', {
      params: {
        ...params,
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 12,
      },
    });
    return data;
  } catch (e) {
    toast.error(`Sorry ${e}`);
  }
};