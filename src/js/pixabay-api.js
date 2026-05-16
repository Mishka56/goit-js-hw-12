import axios from 'axios';

const API_KEY = '55762105-53f0d60783cc05dbb5c3cf186';
const pixabayApi = axios.create({
  baseURL: 'https://pixabay.com/api/',
});

export async function getImagesByQuery(query, page = 1) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page: page,
  };

  const response = await pixabayApi.get('', { params: params });
   return response.data; 
}


