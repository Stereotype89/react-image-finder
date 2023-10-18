import axios from 'axios';
import API_KEY from './api-key';

const fetchImages = async (query, page, key = API_KEY) => {
  const { data } = await axios.get(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`,
    { withCredentials: false }
  );

  return data;
};

export default fetchImages;
