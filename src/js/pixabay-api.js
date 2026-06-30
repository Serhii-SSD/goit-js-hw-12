import axios from 'axios'; 

export async function getImagesByQuery(query) {
  const API_KEY = '56484901-001e7e85bfee9cf80da113fbf';
  const apiUrl = 'https://pixabay.com/api/';

  try {
    const response = await axios.get(apiUrl, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true'
      }
    });

    return response.data.hits;
  } catch (error) {
    throw error;
  }
}