import axios from 'axios'; 

export async function getImagesByQuery(query, page = 1) {
  const API_KEY = '56484901-001e7e85bfee9cf80da113fbf';
  const apiUrl = 'https://pixabay.com/api/';

  const response = await axios.get(apiUrl, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: page,        
      per_page: 15        
    }
  });

  return response.data; 
}
