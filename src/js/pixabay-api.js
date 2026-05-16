import axios from 'axios';

const API_KEY = '55762105-53f0d60783cc05dbb5c3cf186';
const BASE_URL = 'https://pixabay.com/api/';

export function getImagesByQuery(query) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };

  return axios.get(BASE_URL, { params })
    .then(response => response.data); 
}


